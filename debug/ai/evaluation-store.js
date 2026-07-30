const STORAGE_KEY = 'my-chart.ai.evaluations.v1'
const HORIZONS = [4, 8, 16, 32]
const MAX_RECORDS = 500

function finiteNumber (value) {
  const number = Number(value)
  return Number.isFinite(number) ? number : null
}

function makeId () {
  if (typeof crypto?.randomUUID === 'function') return crypto.randomUUID()
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`
}

function fnv1a (text) {
  let hash = 0x811c9dc5
  for (let index = 0; index < text.length; index++) {
    hash ^= text.charCodeAt(index)
    hash = Math.imul(hash, 0x01000193)
  }
  return (hash >>> 0).toString(16).padStart(8, '0')
}

function contextHash (context) {
  const compact = {
    symbol: context.symbol,
    timeframe: context.timeframe,
    candleMode: context.candleMode,
    candles: (context.candles ?? []).map(bar => [bar.timestamp, bar.open, bar.high, bar.low, bar.close]),
    indicators: context.indicators
  }
  return fnv1a(JSON.stringify(compact))
}

function midpoint (zone) {
  const from = finiteNumber(zone?.from)
  const to = finiteNumber(zone?.to)
  if (from === null || to === null) return null
  return (from + to) / 2
}

function eventForBar (bar, plan) {
  const stop = finiteNumber(plan.stopLoss)
  const target = finiteNumber(plan.targets?.[0])
  if (stop === null || target === null) return null

  const isLong = plan.decision === 'LONG'
  const stopHit = isLong ? bar.low <= stop : bar.high >= stop
  const targetHit = isLong ? bar.high >= target : bar.low <= target
  if (stopHit && targetHit) return 'ambiguous'
  if (stopHit) return 'stop'
  if (targetHit) return 'target'
  return null
}

export function evaluateRecord (record, candles) {
  const startIndex = candles.findIndex(bar => bar.timestamp === record.contextTimestamp)
  if (startIndex < 0) return record

  const direction = record.tradePlan?.decision === 'SHORT' ? -1 : 1
  const entry = midpoint(record.tradePlan?.entryZone) ?? finiteNumber(record.referenceClose)
  if (entry === null || entry === 0) return record

  const evaluations = { ...(record.evaluations ?? {}) }
  for (const horizon of HORIZONS) {
    if (evaluations[horizon] !== undefined) continue
    const future = candles.slice(startIndex + 1, startIndex + 1 + horizon)
    if (future.length < horizon) continue

    let maxFavourable = 0
    let maxAdverse = 0
    let outcome = record.tradePlan?.decision === 'WAIT' ? 'no_trade' : 'open'
    let eventBar = null

    future.forEach((bar, index) => {
      const highMove = direction * (bar.high - entry)
      const lowMove = direction * (bar.low - entry)
      maxFavourable = Math.max(maxFavourable, highMove, lowMove)
      maxAdverse = Math.min(maxAdverse, highMove, lowMove)
      if (outcome === 'open') {
        const event = eventForBar(bar, record.tradePlan)
        if (event !== null) {
          outcome = event
          eventBar = index + 1
        }
      }
    })

    evaluations[horizon] = {
      horizonBars: horizon,
      outcome,
      eventBar,
      mfe: maxFavourable,
      mae: maxAdverse,
      mfePercent: maxFavourable / entry * 100,
      maePercent: maxAdverse / entry * 100,
      finalCloseMovePercent: direction * (future.at(-1).close - entry) / entry * 100
    }
  }
  return { ...record, evaluations }
}

function readRecords (storage) {
  try {
    const parsed = JSON.parse(storage.getItem(STORAGE_KEY) ?? '[]')
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function writeRecords (storage, records) {
  try {
    storage.setItem(STORAGE_KEY, JSON.stringify(records.slice(-MAX_RECORDS)))
  } catch {}
}

export function createEvaluationStore ({ storage = localStorage } = {}) {
  let records = readRecords(storage)

  function record ({ provider, mode, context, tradePlan }) {
    const lastBar = context.candles?.at(-1)
    if (lastBar === undefined || tradePlan === null || typeof tradePlan !== 'object') return null

    const item = {
      id: makeId(),
      createdAt: new Date().toISOString(),
      provider,
      mode,
      symbol: context.symbol,
      timeframe: context.timeframe,
      candleMode: context.candleMode,
      replay: context.replay?.active === true,
      contextTimestamp: lastBar.timestamp,
      referenceClose: lastBar.close,
      contextHash: contextHash(context),
      tradePlan,
      evaluations: {}
    }
    records.push(item)
    records = records.slice(-MAX_RECORDS)
    writeRecords(storage, records)
    return item
  }

  function update (context) {
    let changed = false
    records = records.map(item => {
      if (item.symbol !== context.symbol || item.timeframe !== context.timeframe) return item
      const updated = evaluateRecord(item, context.candles ?? [])
      if (JSON.stringify(updated.evaluations) !== JSON.stringify(item.evaluations)) changed = true
      return updated
    })
    if (changed) writeRecords(storage, records)
    return records
  }

  function exportJson () {
    const blob = new Blob([JSON.stringify({ version: 1, exportedAt: new Date().toISOString(), records }, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const anchor = document.createElement('a')
    anchor.href = url
    anchor.download = `my-chart-ai-evaluations-${new Date().toISOString().replace(/[:.]/g, '-')}.json`
    anchor.click()
    URL.revokeObjectURL(url)
  }

  return {
    record,
    update,
    exportJson,
    count: () => records.length,
    getAll: () => records.map(item => structuredClone(item))
  }
}
