import {
  computeBacktestMetrics,
  endOfUtcDay,
  filterTradesByRange,
  getPresetRange,
  normalizeBacktestPayload,
  parseBacktestText,
  startOfUtcDay
} from './backtest-report-core.js'

const DATA_STORAGE_KEY = 'klinecharts.debug.backtest.data.v1'
const RANGE_STORAGE_KEY = 'klinecharts.debug.backtest.range.v1'
const DEFAULT_DATA_URL = './data/backtest-trades.json'
const MAX_TABLE_ROWS = 100

const state = {
  report: normalizeBacktestPayload([], 'Backtest report'),
  sourceText: null,
  range: readStoredRange(),
  isOpen: false,
  metrics: computeBacktestMetrics([], 0)
}

function readStoredRange () {
  try {
    const parsed = JSON.parse(window.localStorage.getItem(RANGE_STORAGE_KEY) ?? '{}')
    return {
      preset: typeof parsed.preset === 'string' ? parsed.preset : 'entire',
      startDate: typeof parsed.startDate === 'string' ? parsed.startDate : '',
      endDate: typeof parsed.endDate === 'string' ? parsed.endDate : ''
    }
  } catch {
    return { preset: 'entire', startDate: '', endDate: '' }
  }
}

function saveRange () {
  try {
    window.localStorage.setItem(RANGE_STORAGE_KEY, JSON.stringify(state.range))
  } catch {}
}

function getElement (id) {
  return document.getElementById(id)
}

function createElement (tagName, className, text) {
  const element = document.createElement(tagName)
  if (className !== undefined && className !== '') {
    element.className = className
  }
  if (text !== undefined) {
    element.textContent = text
  }
  return element
}

function createMetricCard (key, label) {
  const card = createElement('article', 'backtest-metric-card')
  card.dataset.metric = key
  card.append(
    createElement('span', 'backtest-metric-label', label),
    createElement('strong', 'backtest-metric-value', '--'),
    createElement('span', 'backtest-metric-subvalue', '')
  )
  return card
}

function createRangeMenu () {
  const wrapper = createElement('div', 'backtest-range-picker')
  const button = createElement('button', 'backtest-range-button')
  button.id = 'backtest-range-button'
  button.type = 'button'
  button.setAttribute('aria-haspopup', 'menu')
  button.setAttribute('aria-expanded', 'false')
  button.append(createElement('span', '', 'Entire history'), createElement('span', 'backtest-caret', '▾'))

  const menu = createElement('div', 'backtest-range-menu')
  menu.id = 'backtest-range-menu'
  menu.hidden = true
  menu.setAttribute('role', 'menu')

  const presets = [
    ['entire', 'Entire history'],
    ['last-7', 'Last 7 days'],
    ['last-30', 'Last 30 days'],
    ['last-90', 'Last 90 days'],
    ['last-365', 'Last 365 days']
  ]
  presets.forEach(([value, label]) => {
    const presetButton = createElement('button', 'backtest-range-option', label)
    presetButton.type = 'button'
    presetButton.dataset.rangePreset = value
    presetButton.setAttribute('role', 'menuitem')
    menu.appendChild(presetButton)
  })

  const custom = createElement('div', 'backtest-custom-range')
  custom.appendChild(createElement('span', 'backtest-custom-range-title', 'Custom date range (UTC)'))
  const fields = createElement('div', 'backtest-custom-range-fields')
  const startInput = document.createElement('input')
  startInput.id = 'backtest-range-start'
  startInput.type = 'date'
  startInput.setAttribute('aria-label', 'Backtest start date')
  const endInput = document.createElement('input')
  endInput.id = 'backtest-range-end'
  endInput.type = 'date'
  endInput.setAttribute('aria-label', 'Backtest end date')
  fields.append(startInput, endInput)
  const applyButton = createElement('button', 'backtest-custom-range-apply', 'Apply custom range')
  applyButton.id = 'backtest-custom-range-apply'
  applyButton.type = 'button'
  custom.append(fields, applyButton)
  menu.appendChild(custom)
  wrapper.append(button, menu)
  return wrapper
}

function createReportPanel () {
  const panel = createElement('section', 'backtest-report')
  panel.id = 'backtest-report'
  panel.hidden = true
  panel.setAttribute('aria-label', 'Backtest report')

  const header = createElement('header', 'backtest-report-header')
  const heading = createElement('div', 'backtest-report-heading')
  heading.append(
    createElement('span', 'backtest-eyebrow', 'Strategy tester'),
    createElement('h2', '', 'Backtest report')
  )
  heading.querySelector('h2').id = 'backtest-report-title'

  const actions = createElement('div', 'backtest-report-actions')
  const importButton = createElement('button', 'backtest-secondary-button', 'Import trades')
  importButton.id = 'backtest-import-button'
  importButton.type = 'button'
  const clearButton = createElement('button', 'backtest-secondary-button', 'Clear data')
  clearButton.id = 'backtest-clear-button'
  clearButton.type = 'button'
  const closeButton = createElement('button', 'backtest-close-button', '×')
  closeButton.id = 'backtest-close-button'
  closeButton.type = 'button'
  closeButton.title = 'Close backtest report'
  closeButton.setAttribute('aria-label', 'Close backtest report')
  actions.append(createRangeMenu(), importButton, clearButton, closeButton)
  header.append(heading, actions)

  const status = createElement('div', 'backtest-report-status')
  status.id = 'backtest-report-status'
  status.setAttribute('aria-live', 'polite')

  const content = createElement('div', 'backtest-report-content')
  const metrics = createElement('div', 'backtest-metric-grid')
  metrics.append(
    createMetricCard('totalPnl', 'Total PnL'),
    createMetricCard('maxDrawdown', 'Max drawdown'),
    createMetricCard('profitableTrades', 'Profitable trades'),
    createMetricCard('profitFactor', 'Profit factor')
  )

  const charts = createElement('div', 'backtest-chart-grid')
  const pnlCard = createElement('article', 'backtest-chart-card')
  pnlCard.append(createElement('h3', '', 'Cumulative PnL'), createElement('div', 'backtest-chart', ''))
  pnlCard.querySelector('.backtest-chart').id = 'backtest-pnl-chart'
  const dailyCard = createElement('article', 'backtest-chart-card')
  dailyCard.append(createElement('h3', '', 'Daily PnL'), createElement('div', 'backtest-chart', ''))
  dailyCard.querySelector('.backtest-chart').id = 'backtest-daily-chart'
  charts.append(pnlCard, dailyCard)

  const details = createElement('div', 'backtest-detail-grid')
  const detailsCard = createElement('article', 'backtest-detail-card')
  detailsCard.appendChild(createElement('h3', '', 'Return details'))
  const detailList = createElement('dl', 'backtest-detail-list')
  ;[
    ['expectedPayoff', 'Expected payoff'],
    ['totalReturn', 'Total return'],
    ['payoffRatio', 'Average win / loss'],
    ['sharpeRatio', 'Sharpe ratio'],
    ['fees', 'Fees'],
    ['streaks', 'Max win / loss streak']
  ].forEach(([key, label]) => {
    const item = createElement('div', 'backtest-detail-item')
    const term = createElement('dt', '', label)
    const value = createElement('dd', '', '--')
    value.dataset.detail = key
    item.append(term, value)
    detailList.appendChild(item)
  })
  detailsCard.appendChild(detailList)

  const tableCard = createElement('article', 'backtest-detail-card backtest-trades-card')
  const tableHeading = createElement('div', 'backtest-trades-heading')
  tableHeading.append(createElement('h3', '', 'Closed trades'), createElement('span', 'backtest-table-count', '0 trades'))
  tableHeading.querySelector('.backtest-table-count').id = 'backtest-table-count'
  const tableWrapper = createElement('div', 'backtest-table-wrapper')
  const table = document.createElement('table')
  table.className = 'backtest-trades-table'
  table.innerHTML = '<thead><tr><th>Exit (UTC)</th><th>Side</th><th>PnL</th><th>Return</th></tr></thead><tbody id="backtest-trades-body"></tbody>'
  tableWrapper.appendChild(table)
  tableCard.append(tableHeading, tableWrapper)
  details.append(detailsCard, tableCard)

  const empty = createElement('div', 'backtest-empty-state')
  empty.id = 'backtest-empty-state'
  empty.innerHTML = '<strong>No backtest trades loaded</strong><span>Import JSON/CSV, add <code>debug/data/backtest-trades.json</code>, or call <code>window.__KLINECHARTS_BACKTEST_REPORT__.setData(payload)</code>.</span>'

  content.append(metrics, charts, details, empty)
  const fileInput = document.createElement('input')
  fileInput.id = 'backtest-file-input'
  fileInput.type = 'file'
  fileInput.accept = '.json,.csv,application/json,text/csv'
  fileInput.hidden = true
  panel.append(header, status, content, fileInput)
  return panel
}

function mountReport () {
  const root = getElement('root')
  const chart = getElement('chart')
  const toolbar = getElement('toolbar')
  if (root === null || chart === null || toolbar === null || getElement('backtest-report') !== null) {
    return false
  }

  const toolbarGroup = createElement('div', 'debug-button-group')
  toolbarGroup.id = 'backtest-toolbar-group'
  const reportButton = createElement('button', '', 'Backtest')
  reportButton.id = 'backtest-report-button'
  reportButton.type = 'button'
  reportButton.setAttribute('aria-expanded', 'false')
  toolbarGroup.appendChild(reportButton)
  toolbar.appendChild(toolbarGroup)
  root.insertBefore(createReportPanel(), chart.nextSibling)
  bindEvents()
  updateRangeInputs()
  renderReport()
  return true
}

function bindEvents () {
  getElement('backtest-report-button')?.addEventListener('click', () => setReportOpen(!state.isOpen))
  getElement('backtest-close-button')?.addEventListener('click', () => setReportOpen(false))
  getElement('backtest-import-button')?.addEventListener('click', () => getElement('backtest-file-input')?.click())
  getElement('backtest-file-input')?.addEventListener('change', handleFileImport)
  getElement('backtest-clear-button')?.addEventListener('click', clearBacktestData)
  getElement('backtest-range-button')?.addEventListener('click', toggleRangeMenu)
  getElement('backtest-range-menu')?.addEventListener('click', event => {
    const target = event.target
    if (typeof target?.closest !== 'function') {
      return
    }
    const button = target.closest('button[data-range-preset]')
    if (button !== null) {
      setRangePreset(button.dataset.rangePreset)
    }
  })
  getElement('backtest-custom-range-apply')?.addEventListener('click', applyCustomRange)
  document.addEventListener('click', event => {
    const picker = event.target?.closest?.('.backtest-range-picker')
    if (picker == null) {
      closeRangeMenu()
    }
  })
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      closeRangeMenu()
    }
  })
  window.addEventListener('klinecharts:backtest-data', event => setBacktestData(event.detail, { sourceName: 'Runtime data' }))
}

function setReportOpen (open) {
  state.isOpen = open
  const panel = getElement('backtest-report')
  const button = getElement('backtest-report-button')
  if (panel !== null) {
    panel.hidden = !open
  }
  if (button !== null) {
    button.classList.toggle('active', open)
    button.setAttribute('aria-expanded', String(open))
  }
  if (!open) {
    closeRangeMenu()
  }
  window.dispatchEvent(new Event('resize'))
}

function toggleRangeMenu () {
  const menu = getElement('backtest-range-menu')
  const button = getElement('backtest-range-button')
  if (menu === null || button === null) {
    return
  }
  menu.hidden = !menu.hidden
  button.setAttribute('aria-expanded', String(!menu.hidden))
}

function closeRangeMenu () {
  const menu = getElement('backtest-range-menu')
  const button = getElement('backtest-range-button')
  if (menu !== null) {
    menu.hidden = true
  }
  button?.setAttribute('aria-expanded', 'false')
}

function updateRangeInputs () {
  const startInput = getElement('backtest-range-start')
  const endInput = getElement('backtest-range-end')
  if (startInput !== null) {
    startInput.value = state.range.startDate
  }
  if (endInput !== null) {
    endInput.value = state.range.endDate
  }
}

function setRangePreset (preset) {
  state.range.preset = preset
  state.range.startDate = ''
  state.range.endDate = ''
  saveRange()
  updateRangeInputs()
  closeRangeMenu()
  renderReport()
}

function applyCustomRange () {
  const startDate = getElement('backtest-range-start')?.value ?? ''
  const endDate = getElement('backtest-range-end')?.value ?? ''
  const startTimestamp = startOfUtcDay(startDate)
  const endTimestamp = endOfUtcDay(endDate)
  if (startTimestamp === null || endTimestamp === null) {
    setStatus('Choose both start and end dates.')
    return
  }
  if (startTimestamp > endTimestamp) {
    setStatus('Start date must be before end date.')
    return
  }
  state.range = { preset: 'custom', startDate, endDate }
  saveRange()
  closeRangeMenu()
  renderReport()
}

function getActiveRange () {
  if (state.range.preset === 'custom') {
    return {
      startTimestamp: startOfUtcDay(state.range.startDate),
      endTimestamp: endOfUtcDay(state.range.endDate)
    }
  }
  return getPresetRange(state.range.preset, state.report.trades)
}

function getRangeLabel (filteredTrades) {
  const presetLabels = {
    entire: 'Entire history',
    'last-7': 'Last 7 days',
    'last-30': 'Last 30 days',
    'last-90': 'Last 90 days',
    'last-365': 'Last 365 days'
  }
  if (state.range.preset !== 'custom') {
    return presetLabels[state.range.preset] ?? 'Entire history'
  }
  if (filteredTrades.length === 0) {
    return `${state.range.startDate} — ${state.range.endDate}`
  }
  return `${formatDate(filteredTrades[0].exitTime)} — ${formatDate(filteredTrades.at(-1).exitTime)}`
}

function formatDate (timestamp) {
  return new Date(timestamp).toISOString().slice(0, 10)
}

function formatDateTime (timestamp) {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'UTC',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  }).format(new Date(timestamp)).replace(',', '')
}

function formatCurrency (value, currency, options = {}) {
  if (!Number.isFinite(value)) {
    return '--'
  }
  try {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      minimumFractionDigits: Math.abs(value) >= 1000 ? 0 : 2,
      maximumFractionDigits: Math.abs(value) >= 1000 ? 0 : 2,
      ...options
    }).format(value)
  } catch {
    return `${value.toFixed(2)} ${currency}`
  }
}

function formatPercent (value) {
  return Number.isFinite(value) ? `${value.toFixed(2)}%` : '--'
}

function formatRatio (value, digits = 3) {
  if (value === Number.POSITIVE_INFINITY) {
    return '∞'
  }
  return Number.isFinite(value) ? value.toFixed(digits) : '--'
}

function setStatus (message, type = '') {
  const status = getElement('backtest-report-status')
  if (status !== null) {
    status.textContent = message
    status.dataset.type = type
  }
}

function setMetric (key, value, subvalue = '', toneValue = null) {
  const card = document.querySelector(`[data-metric="${key}"]`)
  if (card === null) {
    return
  }
  card.querySelector('.backtest-metric-value').textContent = value
  card.querySelector('.backtest-metric-subvalue').textContent = subvalue
  card.classList.toggle('positive', Number.isFinite(toneValue) && toneValue > 0)
  card.classList.toggle('negative', Number.isFinite(toneValue) && toneValue < 0)
}

function setDetail (key, value, toneValue = null) {
  const element = document.querySelector(`[data-detail="${key}"]`)
  if (element === null) {
    return
  }
  element.textContent = value
  element.classList.toggle('positive', Number.isFinite(toneValue) && toneValue > 0)
  element.classList.toggle('negative', Number.isFinite(toneValue) && toneValue < 0)
}

function createSvgElement (name, attributes = {}) {
  const element = document.createElementNS('http://www.w3.org/2000/svg', name)
  Object.entries(attributes).forEach(([key, value]) => element.setAttribute(key, String(value)))
  return element
}

function renderLineChart (container, series, valueKey = 'value') {
  if (container === null) {
    return
  }
  container.replaceChildren()
  if (series.length === 0) {
    container.appendChild(createElement('span', 'backtest-chart-empty', 'No trades in this range'))
    return
  }
  const width = 1000
  const height = 190
  const padding = 18
  const values = series.map(item => item[valueKey])
  const minValue = Math.min(0, ...values)
  const maxValue = Math.max(0, ...values)
  const span = Math.max(1e-9, maxValue - minValue)
  const xAt = index => series.length === 1 ? width / 2 : padding + index / (series.length - 1) * (width - padding * 2)
  const yAt = value => height - padding - (value - minValue) / span * (height - padding * 2)
  const svg = createSvgElement('svg', { viewBox: `0 0 ${width} ${height}`, preserveAspectRatio: 'none', role: 'img' })
  const zeroY = yAt(0)
  svg.appendChild(createSvgElement('line', { x1: padding, x2: width - padding, y1: zeroY, y2: zeroY, class: 'backtest-zero-line' }))
  const points = series.map((item, index) => `${xAt(index)},${yAt(item[valueKey])}`).join(' ')
  const areaPoints = `${padding},${zeroY} ${points} ${width - padding},${zeroY}`
  const positive = values.at(-1) >= 0
  svg.appendChild(createSvgElement('polygon', { points: areaPoints, class: `backtest-line-area ${positive ? 'positive' : 'negative'}` }))
  svg.appendChild(createSvgElement('polyline', { points, class: `backtest-line ${positive ? 'positive' : 'negative'}` }))
  container.appendChild(svg)
}

function renderBarChart (container, series) {
  if (container === null) {
    return
  }
  container.replaceChildren()
  if (series.length === 0) {
    container.appendChild(createElement('span', 'backtest-chart-empty', 'No daily PnL in this range'))
    return
  }
  const width = 1000
  const height = 190
  const padding = 18
  const maxAbsolute = Math.max(1e-9, ...series.map(item => Math.abs(item.pnl)))
  const zeroY = height / 2
  const slot = (width - padding * 2) / series.length
  const barWidth = Math.max(1, Math.min(24, slot * 0.72))
  const svg = createSvgElement('svg', { viewBox: `0 0 ${width} ${height}`, preserveAspectRatio: 'none', role: 'img' })
  svg.appendChild(createSvgElement('line', { x1: padding, x2: width - padding, y1: zeroY, y2: zeroY, class: 'backtest-zero-line' }))
  series.forEach((item, index) => {
    const magnitude = Math.abs(item.pnl) / maxAbsolute * (height / 2 - padding)
    const x = padding + index * slot + (slot - barWidth) / 2
    const y = item.pnl >= 0 ? zeroY - magnitude : zeroY
    svg.appendChild(createSvgElement('rect', {
      x,
      y,
      width: barWidth,
      height: Math.max(1, magnitude),
      rx: 1,
      class: `backtest-bar ${item.pnl >= 0 ? 'positive' : 'negative'}`
    }))
  })
  container.appendChild(svg)
}

function renderTradesTable (trades, currency) {
  const body = getElement('backtest-trades-body')
  const count = getElement('backtest-table-count')
  if (body === null || count === null) {
    return
  }
  body.replaceChildren()
  count.textContent = `${trades.length} trade${trades.length === 1 ? '' : 's'}`
  const rows = [...trades].reverse().slice(0, MAX_TABLE_ROWS)
  rows.forEach(trade => {
    const row = document.createElement('tr')
    const timeCell = createElement('td', '', formatDateTime(trade.exitTime))
    const sideCell = createElement('td', `backtest-side ${trade.side}`, trade.side.toUpperCase())
    const pnlCell = createElement('td', trade.pnl >= 0 ? 'positive' : 'negative', formatCurrency(trade.pnl, currency))
    const returnTone = trade.returnPct === null ? '' : (trade.returnPct >= 0 ? 'positive' : 'negative')
    const returnCell = createElement('td', returnTone, formatPercent(trade.returnPct))
    row.append(timeCell, sideCell, pnlCell, returnCell)
    body.appendChild(row)
  })
}

function renderReport () {
  const panel = getElement('backtest-report')
  if (panel === null) {
    return
  }
  const { startTimestamp, endTimestamp } = getActiveRange()
  const filteredTrades = filterTradesByRange(state.report.trades, startTimestamp, endTimestamp)
  state.metrics = computeBacktestMetrics(filteredTrades, state.report.initialCapital)
  const metrics = state.metrics
  const currency = state.report.currency
  const empty = getElement('backtest-empty-state')
  const hasTrades = filteredTrades.length > 0
  panel.classList.toggle('is-empty', !hasTrades)
  if (empty !== null) {
    empty.hidden = state.report.trades.length > 0
  }

  const title = getElement('backtest-report-title')
  if (title !== null) {
    title.textContent = state.report.strategy
  }
  const rangeButtonLabel = getElement('backtest-range-button')?.firstElementChild
  if (rangeButtonLabel !== null && rangeButtonLabel !== undefined) {
    rangeButtonLabel.textContent = getRangeLabel(filteredTrades)
  }

  setMetric(
    'totalPnl',
    formatCurrency(metrics.totalPnl, currency),
    metrics.totalReturnPct === null ? '' : formatPercent(metrics.totalReturnPct),
    metrics.totalPnl
  )
  setMetric(
    'maxDrawdown',
    formatCurrency(metrics.maxDrawdown, currency),
    formatPercent(metrics.maxDrawdownPct),
    metrics.maxDrawdown > 0 ? -metrics.maxDrawdown : 0
  )
  setMetric(
    'profitableTrades',
    `${metrics.profitableTrades} / ${metrics.tradeCount}`,
    formatPercent(metrics.winRate),
    metrics.winRate - 50
  )
  setMetric('profitFactor', formatRatio(metrics.profitFactor), metrics.grossLoss > 0 ? `Gross loss ${formatCurrency(metrics.grossLoss, currency)}` : '', (metrics.profitFactor ?? 1) - 1)

  setDetail('expectedPayoff', formatCurrency(metrics.expectedPayoff, currency), metrics.expectedPayoff)
  setDetail('totalReturn', metrics.totalReturnPct === null ? '--' : formatPercent(metrics.totalReturnPct), metrics.totalReturnPct)
  setDetail('payoffRatio', formatRatio(metrics.payoffRatio), (metrics.payoffRatio ?? 1) - 1)
  setDetail('sharpeRatio', formatRatio(metrics.sharpeRatio), metrics.sharpeRatio)
  setDetail('fees', formatCurrency(metrics.totalFees, currency), -metrics.totalFees)
  setDetail('streaks', `${metrics.maxConsecutiveWins} / ${metrics.maxConsecutiveLosses}`)

  renderLineChart(getElement('backtest-pnl-chart'), metrics.equityCurve)
  renderBarChart(getElement('backtest-daily-chart'), metrics.dailyPnl)
  renderTradesTable(filteredTrades, currency)

  if (state.report.trades.length === 0) {
    setStatus('No backtest data loaded. Import a JSON or CSV file to begin.')
  } else {
    const rejected = state.report.rejectedTradeCount > 0 ? ` ${state.report.rejectedTradeCount} invalid row(s) skipped.` : ''
    setStatus(`${filteredTrades.length} of ${state.report.trades.length} trades in selected range.${rejected}`)
  }
}

async function handleFileImport (event) {
  const file = event.target?.files?.[0]
  if (file === undefined) {
    return
  }
  try {
    const text = await file.text()
    const payload = parseBacktestText(text, file.name)
    setBacktestData(payload, { sourceName: file.name, sourceText: text, persist: true })
    setReportOpen(true)
  } catch (error) {
    setStatus(`Import failed: ${error.message}`, 'error')
  } finally {
    event.target.value = ''
  }
}

function persistSourceText (text, sourceName) {
  if (typeof text !== 'string') {
    return
  }
  try {
    window.localStorage.setItem(DATA_STORAGE_KEY, JSON.stringify({ text, sourceName }))
  } catch {
    setStatus('Data loaded, but it is too large to persist in localStorage.', 'warning')
  }
}

function setBacktestData (payload, options = {}) {
  const sourceName = options.sourceName ?? 'Runtime data'
  const report = normalizeBacktestPayload(payload, sourceName)
  state.report = report
  state.sourceText = options.sourceText ?? null
  if (options.persist === true && typeof options.sourceText === 'string') {
    persistSourceText(options.sourceText, sourceName)
  }
  if (state.range.preset === 'custom') {
    updateRangeInputs()
  }
  renderReport()
  return report
}

function clearBacktestData () {
  try {
    window.localStorage.removeItem(DATA_STORAGE_KEY)
  } catch {}
  state.report = normalizeBacktestPayload([], 'Backtest report')
  state.sourceText = null
  state.range = { preset: 'entire', startDate: '', endDate: '' }
  saveRange()
  updateRangeInputs()
  renderReport()
}

async function restoreBacktestData () {
  try {
    const stored = JSON.parse(window.localStorage.getItem(DATA_STORAGE_KEY) ?? 'null')
    if (typeof stored?.text === 'string') {
      const payload = parseBacktestText(stored.text, stored.sourceName ?? '')
      setBacktestData(payload, { sourceName: stored.sourceName ?? 'Saved import', sourceText: stored.text })
      return
    }
  } catch {
    try {
      window.localStorage.removeItem(DATA_STORAGE_KEY)
    } catch {}
  }

  try {
    const response = await fetch(DEFAULT_DATA_URL, { cache: 'no-store' })
    if (!response.ok) {
      return
    }
    const payload = await response.json()
    setBacktestData(payload, { sourceName: 'debug/data/backtest-trades.json' })
  } catch {}
}

function initialize () {
  if (!mountReport()) {
    return
  }
  window.__KLINECHARTS_BACKTEST_REPORT__ = Object.freeze({
    open: () => setReportOpen(true),
    close: () => setReportOpen(false),
    clear: clearBacktestData,
    setData: (payload, options = {}) => setBacktestData(payload, { sourceName: options.sourceName ?? 'Runtime data' }),
    getMetrics: () => ({ ...state.metrics }),
    getReport: () => ({ ...state.report, trades: [...state.report.trades] })
  })
  restoreBacktestData()
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initialize, { once: true })
} else {
  initialize()
}
