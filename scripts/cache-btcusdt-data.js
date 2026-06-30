import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(__dirname, '..')
const outputDir = path.join(rootDir, 'debug', 'data')

const symbol = 'BTCUSDT'
const limit = 1000
const endpoints = [
  'https://api.binance.com',
  'https://api-gcp.binance.com',
  'https://api1.binance.com',
  'https://api.binance.us'
]
const intervals = [
  { name: '1m', targetBars: 3000 },
  { name: '5m', targetBars: 3000 },
  { name: '15m', targetBars: 3000 },
  { name: '1h', targetBars: 3000 },
  { name: '1d', targetBars: 3000 },
  { name: '1w', targetBars: 1000 },
  { name: '1M', fileName: '1mo', targetBars: 1000 }
]

function isForceRefresh () {
  return process.argv.includes('--refresh') || process.env.FORCE_REFRESH === '1'
}

async function hasUsableCache (filePath, intervalName) {
  try {
    const raw = await fs.readFile(filePath, 'utf8')
    const payload = JSON.parse(raw)
    return payload.interval === intervalName && Array.isArray(payload.data) && payload.data.length > 0
  } catch {
    return false
  }
}

function normalizeKline (item) {
  const open = Number(item[1])
  const high = Number(item[2])
  const low = Number(item[3])
  const close = Number(item[4])
  const volume = Number(item[5])
  const closeTime = Number(item[6])
  const turnover = Number(item[7])
  return {
    timestamp: Number(item[0]),
    open,
    high,
    low,
    close,
    volume,
    turnover,
    closeTime
  }
}

async function fetchKlines (interval, endTime, requestLimit) {
  const params = new URLSearchParams({
    symbol,
    interval,
    limit: String(requestLimit),
    endTime: String(endTime)
  })
  let lastError = null

  for (const endpoint of endpoints) {
    const url = `${endpoint}/api/v3/klines?${params.toString()}`
    try {
      const response = await fetch(url)
      if (!response.ok) {
        lastError = new Error(`${endpoint} returned ${response.status}`)
        continue
      }
      const data = await response.json()
      if (Array.isArray(data)) {
        return { endpoint, data }
      }
      lastError = new Error(`${endpoint} returned an unexpected payload`)
    } catch (error) {
      lastError = error
    }
  }

  throw lastError ?? new Error('No market data endpoint responded')
}

async function fetchInterval (interval) {
  const bars = []
  const sources = new Set()
  let endTime = Date.now()

  while (bars.length < interval.targetBars) {
    const requestLimit = Math.min(limit, interval.targetBars - bars.length)
    const { endpoint, data } = await fetchKlines(interval.name, endTime, requestLimit)
    sources.add(endpoint)
    if (data.length === 0) {
      break
    }
    const normalized = data.map(normalizeKline)
    bars.unshift(...normalized)
    endTime = normalized[0].timestamp - 1
    if (data.length < requestLimit) {
      break
    }
  }

  const deduped = new Map()
  bars.forEach(bar => {
    if (
      Number.isFinite(bar.timestamp) &&
      Number.isFinite(bar.open) &&
      Number.isFinite(bar.high) &&
      Number.isFinite(bar.low) &&
      Number.isFinite(bar.close)
    ) {
      deduped.set(bar.timestamp, bar)
    }
  })

  return {
    symbol,
    interval: interval.name,
    source: Array.from(sources),
    generatedAt: new Date().toISOString(),
    data: Array.from(deduped.values()).sort((a, b) => a.timestamp - b.timestamp)
  }
}

async function main () {
  await fs.mkdir(outputDir, { recursive: true })
  const refresh = isForceRefresh()

  for (const interval of intervals) {
    const filePath = path.join(outputDir, `${symbol}-${interval.fileName ?? interval.name}.json`)
    if (!refresh && await hasUsableCache(filePath, interval.name)) {
      console.log(`Cache exists: ${path.relative(rootDir, filePath)}`)
      continue
    }

    console.log(`Fetching ${symbol} ${interval.name} from Binance public API...`)
    const payload = await fetchInterval(interval)
    if (payload.data.length === 0) {
      throw new Error(`No data returned for ${symbol} ${interval.name}`)
    }
    await fs.writeFile(filePath, `${JSON.stringify(payload, null, 2)}\n`, 'utf8')
    console.log(`Saved ${payload.data.length} bars: ${path.relative(rootDir, filePath)}`)
  }
}

main().catch(error => {
  console.error(error)
  process.exitCode = 1
})
