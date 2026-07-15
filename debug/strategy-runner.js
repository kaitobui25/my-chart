import {
  ATR_EXPANSION_BREAKOUT_DEFAULTS,
  aggregateBarsByMinutes,
  normalizeBars,
  runAtrExpansionBreakout
} from './strategies/atr-expansion-breakout.js'

const PERIOD_SOURCES = {
  '15m': { file: 'BTCUSDT-15m.json' },
  '30m': { file: 'BTCUSDT-15m.json', aggregateMinutes: 30 },
  '1h': { file: 'BTCUSDT-1h.json' },
  '1d': { file: 'BTCUSDT-1d.json' },
  '1w': { file: 'BTCUSDT-1w.json' },
  '1M': { file: 'BTCUSDT-1mo.json' }
}

let lastResult = null
const barCache = new Map()

function createNumberField (name, label, value, step = '1', min = '1') {
  return `
    <label class="strategy-field">
      <span>${label}</span>
      <input name="${name}" type="number" value="${value}" step="${step}" min="${min}">
    </label>
  `
}

function createStrategyMenu () {
  const menu = document.createElement('details')
  menu.id = 'strategy-runner'
  menu.className = 'strategy-menu'
  menu.innerHTML = `
    <summary title="Run strategy backtest">Strategy</summary>
    <form id="atr-expansion-form" class="strategy-panel">
      <div class="strategy-panel-heading">
        <div>
          <strong>ATR Expansion Breakout</strong>
          <span>ExactBT ATR21 · Stop3 · RR4</span>
        </div>
        <a href="./strategies/atr_expansion_breakout_atr21_stop3_rr4.pine" target="_blank" rel="noreferrer">Pine source</a>
      </div>

      <label class="strategy-field strategy-field-wide">
        <span>Backtest timeframe</span>
        <select name="timeframe">
          <option value="30m" selected>30m — aggregate cached 15m bars</option>
          <option value="15m">15m</option>
          <option value="1h">1h</option>
          <option value="1d">1d</option>
          <option value="1w">1w</option>
          <option value="1M">1M</option>
        </select>
      </label>

      <div class="strategy-grid">
        ${createNumberField('atrMeanWindow', 'ATR mean', ATR_EXPANSION_BREAKOUT_DEFAULTS.atrMeanWindow)}
        ${createNumberField('atrWindow', 'Signal ATR', ATR_EXPANSION_BREAKOUT_DEFAULTS.atrWindow)}
        ${createNumberField('atrStopWindow', 'Stop ATR', ATR_EXPANSION_BREAKOUT_DEFAULTS.atrStopWindow)}
        ${createNumberField('atrStopMultiplier', 'Stop multiplier', ATR_EXPANSION_BREAKOUT_DEFAULTS.atrStopMultiplier, '0.05', '0.1')}
        ${createNumberField('expansionMultiplier', 'Expansion', ATR_EXPANSION_BREAKOUT_DEFAULTS.expansionMultiplier, '0.05', '0.1')}
        ${createNumberField('breakoutLookback', 'Breakout lookback', ATR_EXPANSION_BREAKOUT_DEFAULTS.breakoutLookback)}
        ${createNumberField('maximumHoldBars', 'Maximum hold', ATR_EXPANSION_BREAKOUT_DEFAULTS.maximumHoldBars)}
        ${createNumberField('riskReward', 'Risk / reward', ATR_EXPANSION_BREAKOUT_DEFAULTS.riskReward, '0.05', '0.1')}
        ${createNumberField('initialCapital', 'Initial capital', ATR_EXPANSION_BREAKOUT_DEFAULTS.initialCapital, '1', '1')}
        ${createNumberField('positionSizePct', 'Equity per trade %', ATR_EXPANSION_BREAKOUT_DEFAULTS.positionSizePct, '0.01', '0.01')}
        ${createNumberField('commissionPct', 'Commission % / side', ATR_EXPANSION_BREAKOUT_DEFAULTS.commissionPct, '0.01', '0')}
        <label class="strategy-field">
          <span>Side</span>
          <select name="side">
            <option value="both">Both</option>
            <option value="long">Long only</option>
            <option value="short">Short only</option>
          </select>
        </label>
      </div>

      <label class="strategy-checkbox">
        <input name="cancelAcrossUtcDay" type="checkbox" checked>
        <span>Cancel next-open entry across a UTC day</span>
      </label>

      <div class="strategy-actions">
        <button type="submit">Run backtest</button>
        <button id="strategy-download" type="button" disabled>Download JSON</button>
      </div>
      <p id="strategy-status" class="strategy-status">Uses cached BTCUSDT OHLC data from the debug page.</p>
    </form>
  `
  return menu
}

function getFormConfig (form) {
  const data = new FormData(form)
  return {
    timeframe: String(data.get('timeframe')),
    atrMeanWindow: Number(data.get('atrMeanWindow')),
    atrWindow: Number(data.get('atrWindow')),
    atrStopWindow: Number(data.get('atrStopWindow')),
    atrStopMultiplier: Number(data.get('atrStopMultiplier')),
    expansionMultiplier: Number(data.get('expansionMultiplier')),
    breakoutLookback: Number(data.get('breakoutLookback')),
    maximumHoldBars: Number(data.get('maximumHoldBars')),
    riskReward: Number(data.get('riskReward')),
    initialCapital: Number(data.get('initialCapital')),
    positionSizePct: Number(data.get('positionSizePct')),
    commissionPct: Number(data.get('commissionPct')),
    side: String(data.get('side')),
    cancelAcrossUtcDay: data.get('cancelAcrossUtcDay') === 'on'
  }
}

async function loadBars (timeframe) {
  if (barCache.has(timeframe)) {
    return barCache.get(timeframe)
  }
  const source = PERIOD_SOURCES[timeframe]
  if (source === undefined) {
    throw new Error(`Unsupported timeframe: ${timeframe}`)
  }
  const response = await fetch(`./data/${source.file}`, { cache: 'no-store' })
  if (!response.ok) {
    throw new Error(`Missing cache file ${source.file}. Run open-btcusdt-chart.bat first.`)
  }
  const payload = await response.json()
  const sourceBars = normalizeBars(payload)
  const bars = source.aggregateMinutes === undefined
    ? sourceBars
    : aggregateBarsByMinutes(sourceBars, source.aggregateMinutes)
  if (bars.length === 0) {
    throw new Error(`${source.file} contains no valid bars.`)
  }
  barCache.set(timeframe, bars)
  return bars
}

function formatMoney (value) {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value)
}

function setStatus (message, state = '') {
  const element = document.getElementById('strategy-status')
  if (element !== null) {
    element.textContent = message
    element.dataset.state = state
  }
}

function publishResult (result, timeframe) {
  lastResult = {
    ...result,
    timeframe,
    generatedAt: new Date().toISOString()
  }
  const report = window.__KLINECHARTS_BACKTEST_REPORT__
  if (report === undefined) {
    throw new Error('Backtest report is not ready.')
  }
  report.setData(lastResult, { sourceName: `${result.strategy} · ${timeframe}` })
  report.open()
  const downloadButton = document.getElementById('strategy-download')
  if (downloadButton !== null) {
    downloadButton.disabled = false
  }
}

async function executeStrategy (rawConfig = {}) {
  const { timeframe = '30m', ...config } = rawConfig
  const bars = await loadBars(timeframe)
  const result = runAtrExpansionBreakout(bars, config)
  publishResult(result, timeframe)
  return lastResult
}

async function handleSubmit (event) {
  event.preventDefault()
  const form = event.currentTarget
  const submitButton = form.querySelector('button[type="submit"]')
  if (submitButton === null) {
    return
  }
  submitButton.disabled = true
  setStatus('Loading cached bars and running the strategy…', 'loading')
  try {
    const config = getFormConfig(form)
    const result = await executeStrategy(config)
    const openText = result.openPosition === null ? '' : ' · 1 position remains open'
    setStatus(
      `${result.timeframe}: ${result.barsProcessed.toLocaleString()} bars · ${result.trades.length} closed trades · ` +
      `net ${formatMoney(result.netPnl)} ${result.currency}${openText}`,
      'success'
    )
  } catch (error) {
    setStatus(error instanceof Error ? error.message : String(error), 'error')
  } finally {
    submitButton.disabled = false
  }
}

function downloadLastResult () {
  if (lastResult === null) {
    return
  }
  const blob = new Blob([JSON.stringify(lastResult, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `atr-expansion-breakout-${lastResult.timeframe}.json`
  link.click()
  URL.revokeObjectURL(url)
}

function mountStrategyRunner () {
  const toolbar = document.getElementById('toolbar')
  if (toolbar === null || document.getElementById('strategy-runner') !== null) {
    return
  }
  const menu = createStrategyMenu()
  const indicatorControls = document.getElementById('indicator-controls')
  toolbar.insertBefore(menu, indicatorControls)
  document.getElementById('atr-expansion-form')?.addEventListener('submit', handleSubmit)
  document.getElementById('strategy-download')?.addEventListener('click', downloadLastResult)

  window.__KLINECHARTS_STRATEGIES__ = Object.freeze({
    runAtrExpansionBreakout: executeStrategy,
    getLastResult: () => lastResult === null ? null : structuredClone(lastResult),
    clearCache: () => barCache.clear()
  })
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', mountStrategyRunner, { once: true })
} else {
  mountStrategyRunner()
}
