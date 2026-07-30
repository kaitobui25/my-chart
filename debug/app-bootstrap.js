import ChartImp from '../src/Chart.ts'
import ReplayController from './replay-controller.js'

const REPLAY_BATCH_SIZE = 400
const CACHE_BASE_URL = './data'
const PERIOD_FILES = {
  '1m': 'BTCUSDT-1m.json',
  '5m': 'BTCUSDT-5m.json',
  '15m': 'BTCUSDT-15m.json',
  '1h': 'BTCUSDT-1h.json',
  '1d': 'BTCUSDT-1d.json',
  '1w': 'BTCUSDT-1w.json',
  '1M': 'BTCUSDT-1mo.json'
}

const replayDataCache = new Map()
let chart = null
let normalDataLoader = null

const originalSetDataLoader = ChartImp.prototype.setDataLoader
ChartImp.prototype.setDataLoader = function (dataLoader) {
  chart = this
  normalDataLoader ??= dataLoader
  return originalSetDataLoader.call(this, dataLoader)
}

try {
  await import('./rsi-bootstrap.js')
} finally {
  ChartImp.prototype.setDataLoader = originalSetDataLoader
}

if (chart === null || normalDataLoader === null) {
  throw new Error('Replay bootstrap could not capture the chart data loader.')
}

installReplayStyles()
const ui = createReplayUi()
let selecting = false
let loading = false
let preparedData = null

const replayController = new ReplayController({
  chart,
  batchSize: REPLAY_BATCH_SIZE,
  restoreDataLoader: () => chart.setDataLoader(normalDataLoader),
  onStateChange: renderReplayState
})

function installReplayStyles () {
  if (document.querySelector('link[data-replay-style]') !== null) return
  const link = document.createElement('link')
  link.rel = 'stylesheet'
  link.href = './replay-style.css'
  link.dataset.replayStyle = 'true'
  document.head.appendChild(link)
}

function createReplayUi () {
  const host = document.createElement('div')
  host.id = 'replay-controls'
  host.className = 'replay-controls'
  host.setAttribute('aria-label', 'Bar replay')
  host.innerHTML = `
    <button id="replay-select-button" type="button">Replay</button>
    <div id="replay-session-controls" class="replay-session-controls" hidden>
      <button id="replay-restart-button" type="button" title="Restart from selected candle" aria-label="Restart replay">|◀</button>
      <button id="replay-previous-button" type="button" title="Previous candle" aria-label="Previous candle">◀</button>
      <button id="replay-play-button" type="button" title="Play replay" aria-label="Play replay">Play</button>
      <button id="replay-next-button" type="button" title="Next candle" aria-label="Next candle">▶</button>
      <select id="replay-speed-select" title="Replay speed" aria-label="Replay speed">
        <option value="0.5">0.5x</option>
        <option value="1" selected>1x</option>
        <option value="2">2x</option>
        <option value="5">5x</option>
        <option value="10">10x</option>
      </select>
      <span id="replay-position" aria-live="polite"></span>
      <button id="replay-exit-button" type="button" title="Exit replay">Exit</button>
    </div>
  `

  const indicatorControls = document.getElementById('indicator-controls')
  const toolbar = document.getElementById('toolbar')
  if (indicatorControls !== null) {
    indicatorControls.before(host)
  } else {
    toolbar?.appendChild(host)
  }

  return {
    host,
    selectButton: host.querySelector('#replay-select-button'),
    session: host.querySelector('#replay-session-controls'),
    restartButton: host.querySelector('#replay-restart-button'),
    previousButton: host.querySelector('#replay-previous-button'),
    playButton: host.querySelector('#replay-play-button'),
    nextButton: host.querySelector('#replay-next-button'),
    speedSelect: host.querySelector('#replay-speed-select'),
    position: host.querySelector('#replay-position'),
    exitButton: host.querySelector('#replay-exit-button')
  }
}

function setStatus (text) {
  let element = document.getElementById('load-status')
  if (element === null) {
    element = document.createElement('span')
    element.id = 'load-status'
    document.getElementById('toolbar')?.appendChild(element)
  }
  element.textContent = text
}

function normalizeBars (payload) {
  const source = Array.isArray(payload) ? payload : payload?.data
  if (!Array.isArray(source)) return []

  const deduped = new Map()
  source.forEach(item => {
    if (
      Number.isFinite(item?.timestamp) &&
      Number.isFinite(item?.open) &&
      Number.isFinite(item?.high) &&
      Number.isFinite(item?.low) &&
      Number.isFinite(item?.close)
    ) {
      deduped.set(item.timestamp, {
        timestamp: item.timestamp,
        open: item.open,
        high: item.high,
        low: item.low,
        close: item.close,
        volume: Number.isFinite(item.volume) ? item.volume : 0,
        turnover: Number.isFinite(item.turnover) ? item.turnover : undefined
      })
    }
  })
  return Array.from(deduped.values()).sort((first, second) => first.timestamp - second.timestamp)
}

function convertToHeikinAshi (dataList) {
  let previous = null
  return dataList.map(item => {
    const close = (item.open + item.high + item.low + item.close) / 4
    const open = previous === null ? (item.open + item.close) / 2 : (previous.open + previous.close) / 2
    const bar = {
      ...item,
      open,
      high: Math.max(item.high, open, close),
      low: Math.min(item.low, open, close),
      close,
      sourceOpen: item.open,
      sourceHigh: item.high,
      sourceLow: item.low,
      sourceClose: item.close
    }
    previous = bar
    return bar
  })
}

function getActivePeriodKey () {
  return document.querySelector('#period-switcher button.active')?.dataset.period ?? '1m'
}

function getActiveCandleMode () {
  return document.querySelector('#candle-mode-switcher button.active')?.dataset.candleMode ?? 'normal'
}

async function loadReplayData () {
  const periodKey = getActivePeriodKey()
  const candleMode = getActiveCandleMode()
  const cacheKey = `${periodKey}:${candleMode}`
  if (replayDataCache.has(cacheKey)) {
    return replayDataCache.get(cacheKey)
  }

  const file = PERIOD_FILES[periodKey]
  if (file === undefined) {
    throw new Error(`Replay does not support period ${periodKey}.`)
  }

  const response = await fetch(`${CACHE_BASE_URL}/${file}`, { cache: 'no-store' })
  if (!response.ok) {
    throw new Error(`Missing cache file ${file}.`)
  }

  const sourceData = normalizeBars(await response.json())
  if (sourceData.length < 2) {
    throw new Error(`${file} does not contain enough candles.`)
  }

  const displayData = candleMode === 'heikinashi' ? convertToHeikinAshi(sourceData) : sourceData
  replayDataCache.set(cacheKey, displayData)
  return displayData
}

function disableSourceControls (disabled) {
  document.querySelectorAll('#period-switcher button, #candle-mode-switcher button').forEach(button => {
    button.disabled = disabled
  })
}

function setSelecting (value) {
  selecting = value
  document.getElementById('chart')?.classList.toggle('replay-selecting', selecting)
  ui.selectButton.textContent = selecting ? 'Cancel' : 'Replay'
  ui.selectButton.classList.toggle('active', selecting)
  disableSourceControls(selecting || loading || replayController.getState().active)
}

async function beginSelection () {
  if (loading) return
  if (selecting) {
    preparedData = null
    setSelecting(false)
    setStatus('Replay selection cancelled.')
    return
  }

  loading = true
  ui.selectButton.disabled = true
  ui.selectButton.textContent = 'Loading...'
  disableSourceControls(true)
  setStatus('Replay: preparing historical candles...')

  try {
    preparedData = await loadReplayData()
    setSelecting(true)
    setStatus('Replay: click a candle on the chart to choose the starting point.')
  } catch (error) {
    preparedData = null
    setStatus(`Replay error: ${error.message}`)
    disableSourceControls(false)
  } finally {
    loading = false
    ui.selectButton.disabled = false
    if (!selecting) ui.selectButton.textContent = 'Replay'
  }
}

function getClickedCandle (event) {
  const chartDom = document.getElementById('chart')
  if (chartDom === null) return null

  const bounding = chartDom.getBoundingClientRect()
  const x = event.clientX - bounding.left
  const points = chart.convertFromPixel([{ x }], { paneId: 'candle_pane' })
  const point = Array.isArray(points) ? points[0] : null
  const dataIndex = Math.round(point?.dataIndex ?? -1)
  return chart.getDataList()[dataIndex] ?? null
}

function selectReplayStart (event) {
  if (!selecting || preparedData === null) return
  const candle = getClickedCandle(event)
  if (candle === null) {
    setStatus('Replay: click directly above a loaded candle.')
    return
  }

  try {
    replayController.enter({ dataList: preparedData, startTimestamp: candle.timestamp })
    preparedData = null
    setSelecting(false)
  } catch (error) {
    setStatus(`Replay error: ${error.message}`)
  }
}

function formatTimestamp (timestamp) {
  if (!Number.isFinite(timestamp)) return '--'
  return new Date(timestamp).toLocaleString()
}

function renderReplayState (state) {
  ui.selectButton.hidden = state.active
  ui.session.hidden = !state.active
  ui.previousButton.disabled = state.atStart
  ui.restartButton.disabled = state.atStart
  ui.nextButton.disabled = state.atEnd
  ui.playButton.disabled = state.atEnd
  ui.playButton.textContent = state.playing ? 'Pause' : 'Play'
  ui.playButton.title = state.playing ? 'Pause replay' : 'Play replay'
  ui.speedSelect.value = String(state.speed)

  if (state.active) {
    const revealed = state.currentIndex - state.startIndex + 1
    const remaining = state.totalBars - state.currentIndex - 1
    ui.position.textContent = `${formatTimestamp(state.currentBar?.timestamp)} · +${revealed - 1} · ${remaining} left`
    setStatus(`Replay ${state.playing ? 'playing' : 'paused'}: ${formatTimestamp(state.currentBar?.timestamp)}`)
  }

  disableSourceControls(selecting || loading || state.active)
}

ui.selectButton.addEventListener('click', beginSelection)
ui.restartButton.addEventListener('click', () => replayController.restart())
ui.previousButton.addEventListener('click', () => replayController.previous())
ui.playButton.addEventListener('click', () => replayController.togglePlay())
ui.nextButton.addEventListener('click', () => replayController.next())
ui.speedSelect.addEventListener('change', event => replayController.setSpeed(event.target.value))
ui.exitButton.addEventListener('click', () => {
  setSelecting(false)
  preparedData = null
  replayController.exit()
})
document.getElementById('chart')?.addEventListener('click', selectReplayStart)

window.addEventListener('beforeunload', () => replayController.dispose())
renderReplayState(replayController.getState())
