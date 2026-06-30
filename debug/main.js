import { dispose, init } from '../src/index.ts'

const LOAD_BAR_COUNT = 400
const CACHE_BASE_URL = './data'
const SYMBOL = 'BTCUSDT'
const CANDLE_MODES = [
  { key: 'normal', label: 'Normal' },
  { key: 'heikinashi', label: 'Heikin Ashi' }
]
const PERIODS = [
  { key: '1m', label: '1m', period: { span: 1, type: 'minute' }, file: 'BTCUSDT-1m.json' },
  { key: '5m', label: '5m', period: { span: 5, type: 'minute' }, file: 'BTCUSDT-5m.json' },
  { key: '15m', label: '15m', period: { span: 15, type: 'minute' }, file: 'BTCUSDT-15m.json' },
  { key: '1h', label: '1h', period: { span: 1, type: 'hour' }, file: 'BTCUSDT-1h.json' },
  { key: '1d', label: '1d', period: { span: 1, type: 'day' }, file: 'BTCUSDT-1d.json' },
  { key: '1w', label: '1w', period: { span: 1, type: 'week' }, file: 'BTCUSDT-1w.json' },
  { key: '1M', label: '1M', period: { span: 1, type: 'month' }, file: 'BTCUSDT-1mo.json' }
]
const INDICATORS = [
  { name: 'MA', label: 'MA', defaultCalcParams: [5, 10, 30, 60], options: { pane: { id: 'debug_ma_pane' } } },
  { name: 'EMA', label: 'EMA', defaultCalcParams: [6, 12, 20], options: { isStack: true, pane: { id: 'candle_pane' } } },
  { name: 'SAR', label: 'SAR', defaultCalcParams: [2, 2, 20], options: { isStack: true, pane: { id: 'candle_pane' } } }
]
const ICONS = {
  settings: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z"/><path d="M19.4 15a1.8 1.8 0 0 0 .36 1.98l.04.04a2.1 2.1 0 0 1-2.97 2.97l-.04-.04a1.8 1.8 0 0 0-1.98-.36 1.8 1.8 0 0 0-1.08 1.65V21.3a2.1 2.1 0 0 1-4.2 0v-.06a1.8 1.8 0 0 0-1.08-1.65 1.8 1.8 0 0 0-1.98.36l-.04.04a2.1 2.1 0 0 1-2.97-2.97l.04-.04A1.8 1.8 0 0 0 3.86 15a1.8 1.8 0 0 0-1.65-1.08h-.06a2.1 2.1 0 0 1 0-4.2h.06a1.8 1.8 0 0 0 1.65-1.08 1.8 1.8 0 0 0-.36-1.98l-.04-.04a2.1 2.1 0 0 1 2.97-2.97l.04.04a1.8 1.8 0 0 0 1.98.36 1.8 1.8 0 0 0 1.08-1.65v-.06a2.1 2.1 0 0 1 4.2 0v.06a1.8 1.8 0 0 0 1.08 1.65 1.8 1.8 0 0 0 1.98-.36l.04-.04a2.1 2.1 0 0 1 2.97 2.97l-.04.04a1.8 1.8 0 0 0-.36 1.98 1.8 1.8 0 0 0 1.65 1.08h.06a2.1 2.1 0 0 1 0 4.2h-.06A1.8 1.8 0 0 0 19.4 15Z"/></svg>',
  eye: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2.5 12s3.5-6.5 9.5-6.5 9.5 6.5 9.5 6.5-3.5 6.5-9.5 6.5S2.5 12 2.5 12Z"/><path d="M12 15.2a3.2 3.2 0 1 0 0-6.4 3.2 3.2 0 0 0 0 6.4Z"/></svg>',
  eyeOff: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 3l18 18"/><path d="M10.6 10.6a2.1 2.1 0 0 0 2.8 2.8"/><path d="M9.9 5.8A9.3 9.3 0 0 1 12 5.5c6 0 9.5 6.5 9.5 6.5a16.1 16.1 0 0 1-2.7 3.4"/><path d="M6.2 7.6A16 16 0 0 0 2.5 12s3.5 6.5 9.5 6.5a9.2 9.2 0 0 0 4.3-1.1"/></svg>',
  close: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18 6 6 18"/><path d="M6 6l12 12"/></svg>',
  check: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m20 6-11 11-5-5"/></svg>'
}
const DEBUG_STATE_STORAGE_KEY = 'klinecharts.debug.state.v1'
const savedDebugState = readDebugState()

let chart = null
let activePeriodKey = normalizePeriodKey(savedDebugState.periodKey)
let activeCandleModeKey = normalizeCandleModeKey(savedDebugState.candleModeKey)
let activeGridVisible = normalizeGridVisible(savedDebugState.gridVisible)
const dataCache = new Map()
const sourceDataByTimestampCache = new Map()
const displayDataCache = new Map()
const indicatorState = new Map(INDICATORS.map(({ name }) => [
  name,
  normalizeIndicatorState(savedDebugState.indicators?.[name], getIndicatorConfig(name))
]))

function readDebugState () {
  try {
    const raw = window.localStorage.getItem(DEBUG_STATE_STORAGE_KEY)
    if (raw === null) {
      return {}
    }
    const parsed = JSON.parse(raw)
    return typeof parsed === 'object' && parsed !== null ? parsed : {}
  } catch {
    return {}
  }
}

function normalizePeriodKey (value) {
  return PERIODS.some(({ key }) => key === value) ? value : PERIODS[0].key
}

function normalizeCandleModeKey (value) {
  return CANDLE_MODES.some(({ key }) => key === value) ? value : CANDLE_MODES[0].key
}

function normalizeGridVisible (value) {
  return typeof value === 'boolean' ? value : true
}

function normalizeCalcParams (value, fallback) {
  const params = Array.isArray(value) ? value : fallback
  const normalized = params
    .map(item => Number(item))
    .filter(item => Number.isFinite(item) && item > 0)
    .map(item => Math.round(item))
  return normalized.length > 0 ? normalized : [...fallback]
}

function normalizeIndicatorState (value, indicator) {
  const fallback = indicator?.defaultCalcParams ?? []
  return {
    enabled: typeof value?.enabled === 'boolean' ? value.enabled : true,
    visible: typeof value?.visible === 'boolean' ? value.visible : true,
    calcParams: normalizeCalcParams(value?.calcParams, fallback)
  }
}

function saveDebugState () {
  try {
    const indicators = {}
    INDICATORS.forEach(({ name }) => {
      const state = getIndicatorState(name)
      indicators[name] = {
        enabled: state.enabled,
        visible: state.visible,
        calcParams: state.calcParams
      }
    })
    window.localStorage.setItem(DEBUG_STATE_STORAGE_KEY, JSON.stringify({
      periodKey: activePeriodKey,
      candleModeKey: activeCandleModeKey,
      gridVisible: activeGridVisible,
      indicators
    }))
  } catch {}
}

function getActivePeriodConfig () {
  return PERIODS.find(({ key }) => key === activePeriodKey) ?? PERIODS[0]
}

function getPeriodKey (period) {
  const config = PERIODS.find(({ period: itemPeriod }) => (
    itemPeriod.span === period.span && itemPeriod.type === period.type
  ))
  return config?.key ?? activePeriodKey
}

function getStatusElement () {
  let statusElement = document.getElementById('load-status')
  if (statusElement === null) {
    statusElement = document.createElement('span')
    statusElement.id = 'load-status'
    document.getElementById('toolbar')?.appendChild(statusElement)
  }
  return statusElement
}

function setStatus (text) {
  getStatusElement().textContent = text
}

function clamp (value, min, max) {
  return Math.min(Math.max(value, min), max)
}

function setActivePeriodButton () {
  document.querySelectorAll('#period-switcher button').forEach(button => {
    button.classList.toggle('active', button.dataset.period === activePeriodKey)
  })
}

function setActiveCandleModeButton () {
  document.querySelectorAll('#candle-mode-switcher button').forEach(button => {
    button.classList.toggle('active', button.dataset.candleMode === activeCandleModeKey)
  })
}

function setGridVisibilityToggle () {
  const toggleElement = document.getElementById('grid-visibility-toggle')
  if (toggleElement !== null) {
    toggleElement.checked = activeGridVisible
  }
}

function applyGridVisibility () {
  chart?.setStyles({
    grid: {
      show: activeGridVisible
    }
  })
}

function setGridVisible (visible) {
  if (activeGridVisible === visible) {
    return
  }
  activeGridVisible = visible
  applyGridVisibility()
  hideRealCandleOverlay()
  saveDebugState()
  setGridVisibilityToggle()
}

function getIndicatorConfig (name) {
  return INDICATORS.find(item => item.name === name)
}

function getIndicatorState (name) {
  let state = indicatorState.get(name)
  if (state === undefined) {
    state = {
      enabled: false,
      visible: true,
      calcParams: normalizeCalcParams(undefined, getIndicatorConfig(name)?.defaultCalcParams ?? [])
    }
    indicatorState.set(name, state)
  }
  return state
}

function calcParamsToText (calcParams) {
  return calcParams.join(',')
}

function parseCalcParamsText (text) {
  const params = text
    .split(',')
    .map(item => Number(item.trim()))
  if (params.length === 0 || params.some(item => !Number.isFinite(item) || item <= 0)) {
    return null
  }
  return params.map(item => Math.round(item))
}

function createIcon (name) {
  const iconElement = document.createElement('span')
  iconElement.className = 'control-icon'
  iconElement.innerHTML = ICONS[name] ?? ''
  return iconElement
}

function createIndicatorIconButton (action, indicatorName, iconName, label) {
  const button = document.createElement('button')
  button.type = 'button'
  button.className = 'indicator-icon-button'
  button.dataset.action = action
  button.dataset.indicator = indicatorName
  button.title = label
  button.setAttribute('aria-label', label)
  button.appendChild(createIcon(iconName))
  return button
}

function renderIndicatorControls () {
  const listElement = document.getElementById('indicator-list')
  const restoreSelectElement = document.getElementById('restore-indicator-select')
  if (listElement === null || restoreSelectElement === null) {
    return
  }

  listElement.replaceChildren()
  INDICATORS.forEach(indicator => {
    const state = getIndicatorState(indicator.name)
    if (!state.enabled) {
      return
    }

    const itemElement = document.createElement('div')
    itemElement.className = `indicator-control${state.visible ? '' : ' hidden'}`

    const nameElement = document.createElement('span')
    nameElement.className = 'indicator-name'
    nameElement.textContent = indicator.label
    itemElement.appendChild(nameElement)

    const settingsElement = document.createElement('details')
    settingsElement.className = 'indicator-settings'

    const settingsSummaryElement = document.createElement('summary')
    settingsSummaryElement.title = `${indicator.label} settings`
    settingsSummaryElement.setAttribute('aria-label', `${indicator.label} settings`)
    settingsSummaryElement.appendChild(createIcon('settings'))
    settingsElement.appendChild(settingsSummaryElement)

    const settingsFormElement = document.createElement('form')
    settingsFormElement.className = 'indicator-settings-panel'
    settingsFormElement.dataset.indicator = indicator.name

    const settingsLabelElement = document.createElement('label')
    settingsLabelElement.textContent = 'Params'

    const settingsInputElement = document.createElement('input')
    settingsInputElement.name = 'calcParams'
    settingsInputElement.inputMode = 'numeric'
    settingsInputElement.value = calcParamsToText(state.calcParams)
    settingsInputElement.placeholder = calcParamsToText(indicator.defaultCalcParams)
    settingsInputElement.setAttribute('aria-label', `${indicator.label} params`)
    settingsLabelElement.appendChild(settingsInputElement)
    settingsFormElement.appendChild(settingsLabelElement)

    const settingsApplyButton = document.createElement('button')
    settingsApplyButton.type = 'submit'
    settingsApplyButton.className = 'indicator-icon-button'
    settingsApplyButton.title = 'Apply params'
    settingsApplyButton.setAttribute('aria-label', 'Apply params')
    settingsApplyButton.appendChild(createIcon('check'))
    settingsFormElement.appendChild(settingsApplyButton)

    settingsElement.appendChild(settingsFormElement)
    itemElement.appendChild(settingsElement)

    itemElement.appendChild(createIndicatorIconButton(
      'visibility',
      indicator.name,
      state.visible ? 'eye' : 'eyeOff',
      state.visible ? `Hide ${indicator.label}` : `Show ${indicator.label}`
    ))
    itemElement.appendChild(createIndicatorIconButton('remove', indicator.name, 'close', `Turn off ${indicator.label}`))

    listElement.appendChild(itemElement)
  })

  restoreSelectElement.replaceChildren()
  const placeholderOption = document.createElement('option')
  placeholderOption.value = ''
  placeholderOption.textContent = 'Add indicator...'
  restoreSelectElement.appendChild(placeholderOption)

  INDICATORS.forEach(indicator => {
    if (!getIndicatorState(indicator.name).enabled) {
      const option = document.createElement('option')
      option.value = indicator.name
      option.textContent = indicator.label
      restoreSelectElement.appendChild(option)
    }
  })
  restoreSelectElement.value = ''
  restoreSelectElement.disabled = restoreSelectElement.options.length === 1
}

function normalizeCachedBars (payload) {
  const list = Array.isArray(payload) ? payload : payload.data
  if (!Array.isArray(list)) {
    return []
  }
  const deduped = new Map()
  list.forEach(item => {
    if (
      Number.isFinite(item.timestamp) &&
      Number.isFinite(item.open) &&
      Number.isFinite(item.high) &&
      Number.isFinite(item.low) &&
      Number.isFinite(item.close)
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
  return Array.from(deduped.values()).sort((a, b) => a.timestamp - b.timestamp)
}

function cacheSourceDataLookup (periodKey, dataList) {
  if (!sourceDataByTimestampCache.has(periodKey)) {
    sourceDataByTimestampCache.set(periodKey, new Map(dataList.map(item => [item.timestamp, item])))
  }
}

async function loadCachedBars (periodKey) {
  if (dataCache.has(periodKey)) {
    const dataList = dataCache.get(periodKey)
    cacheSourceDataLookup(periodKey, dataList)
    return dataList
  }
  const config = PERIODS.find(({ key }) => key === periodKey) ?? PERIODS[0]
  const response = await fetch(`${CACHE_BASE_URL}/${config.file}`, { cache: 'no-store' })
  if (!response.ok) {
    throw new Error(`Missing cache file ${config.file}`)
  }
  const payload = await response.json()
  const dataList = normalizeCachedBars(payload)
  if (dataList.length === 0) {
    throw new Error(`Cache file ${config.file} has no bars`)
  }
  dataCache.set(periodKey, dataList)
  cacheSourceDataLookup(periodKey, dataList)
  return dataList
}

function convertToHeikinAshi (dataList) {
  let previousBar = null
  return dataList.map(item => {
    const close = (item.open + item.high + item.low + item.close) / 4
    const open = previousBar === null ? (item.open + item.close) / 2 : (previousBar.open + previousBar.close) / 2
    const high = Math.max(item.high, open, close)
    const low = Math.min(item.low, open, close)
    const bar = {
      ...item,
      open,
      high,
      low,
      close,
      sourceOpen: item.open,
      sourceHigh: item.high,
      sourceLow: item.low,
      sourceClose: item.close
    }
    previousBar = bar
    return bar
  })
}

function getDisplayBars (periodKey, dataList) {
  if (activeCandleModeKey === 'normal') {
    return dataList
  }
  const cacheKey = `${periodKey}:${activeCandleModeKey}`
  if (!displayDataCache.has(cacheKey)) {
    displayDataCache.set(cacheKey, convertToHeikinAshi(dataList))
  }
  return displayDataCache.get(cacheKey)
}

function findFirstIndexGreaterOrEqual (dataList, timestamp) {
  let low = 0
  let high = dataList.length
  while (low < high) {
    const mid = Math.floor((low + high) / 2)
    if (dataList[mid].timestamp < timestamp) {
      low = mid + 1
    } else {
      high = mid
    }
  }
  return low
}

function findFirstIndexGreater (dataList, timestamp) {
  let low = 0
  let high = dataList.length
  while (low < high) {
    const mid = Math.floor((low + high) / 2)
    if (dataList[mid].timestamp <= timestamp) {
      low = mid + 1
    } else {
      high = mid
    }
  }
  return low
}

function sliceBars (dataList, type, timestamp) {
  switch (type) {
    case 'forward': {
      const endIndex = findFirstIndexGreaterOrEqual(dataList, timestamp ?? dataList[0].timestamp)
      const startIndex = Math.max(0, endIndex - LOAD_BAR_COUNT)
      return {
        bars: dataList.slice(startIndex, endIndex),
        more: { forward: startIndex > 0, backward: false }
      }
    }
    case 'backward': {
      const startIndex = findFirstIndexGreater(dataList, timestamp ?? dataList[dataList.length - 1].timestamp)
      const endIndex = Math.min(dataList.length, startIndex + LOAD_BAR_COUNT)
      return {
        bars: dataList.slice(startIndex, endIndex),
        more: { forward: false, backward: endIndex < dataList.length }
      }
    }
    default: {
      const endIndex = dataList.length
      const startIndex = Math.max(0, endIndex - LOAD_BAR_COUNT)
      return {
        bars: dataList.slice(startIndex, endIndex),
        more: { forward: startIndex > 0, backward: false }
      }
    }
  }
}

function createDataLoader () {
  return {
    getBars: async ({ type, timestamp, period, callback }) => {
      const periodKey = getPeriodKey(period)
      try {
        setStatus(`Loading ${SYMBOL} ${periodKey} cache...`)
        const sourceDataList = await loadCachedBars(periodKey)
        const dataList = getDisplayBars(periodKey, sourceDataList)
        const { bars, more } = sliceBars(dataList, type, timestamp)
        const firstTime = new Date(dataList[0].timestamp).toLocaleString()
        const lastTime = new Date(dataList[dataList.length - 1].timestamp).toLocaleString()
        callback(bars, more)
        const modeLabel = CANDLE_MODES.find(({ key }) => key === activeCandleModeKey)?.label ?? activeCandleModeKey
        setStatus(`${SYMBOL} ${periodKey} ${modeLabel}: ${dataList.length} cached bars (${firstTime} - ${lastTime})`)
      } catch (error) {
        callback([], { forward: false, backward: false })
        setStatus(`Cache error: ${error.message}. Run open-btcusdt-chart.bat first.`)
      }
    },
    subscribeBar: () => {},
    unsubscribeBar: () => {}
  }
}

function getRealCandleOverlay () {
  let overlay = document.getElementById('real-candle-overlay')
  const chartDom = document.getElementById('chart')
  if (overlay !== null || chartDom === null) {
    return overlay
  }

  overlay = document.createElement('div')
  overlay.id = 'real-candle-overlay'
  ;['range', 'high-price', 'low-price'].forEach(name => {
    const element = document.createElement('div')
    element.className = `real-candle-${name}`
    if (name.endsWith('-price')) {
      const lineElement = document.createElement('span')
      lineElement.className = 'real-candle-price-line'
      const valueElement = document.createElement('span')
      valueElement.className = 'real-candle-price-value'
      element.append(lineElement, valueElement)
    }
    overlay.appendChild(element)
  })
  chartDom.appendChild(overlay)
  return overlay
}

function hideRealCandleOverlay () {
  getRealCandleOverlay()?.classList.remove('visible')
}

function getHoveredSourceBar (crosshair) {
  if (chart === null || activeCandleModeKey !== 'heikinashi') {
    return null
  }
  let timestamp = Number.isFinite(crosshair?.timestamp) ? crosshair.timestamp : null
  if (timestamp === null && Number.isFinite(crosshair?.x)) {
    const points = chart.convertFromPixel([{ x: crosshair.x }], { paneId: 'candle_pane' })
    const point = points[0]
    const dataIndex = Math.round(point?.dataIndex ?? -1)
    timestamp = chart.getDataList()[dataIndex]?.timestamp ?? point?.timestamp ?? null
  }
  if (!Number.isFinite(timestamp)) {
    return null
  }
  return sourceDataByTimestampCache.get(activePeriodKey)?.get(timestamp) ?? null
}

function getPriceCoordinate (timestamp, value) {
  if (chart === null) {
    return {}
  }
  return chart.convertToPixel({ timestamp, value }, { paneId: 'candle_pane', absolute: true })
}

function formatPrice (value) {
  return value.toFixed(2)
}

function updateRealCandleOverlay (crosshair) {
  const sourceBar = getHoveredSourceBar(crosshair)
  const overlay = getRealCandleOverlay()
  const chartDom = document.getElementById('chart')
  if (chart === null || overlay === null || chartDom === null || sourceBar === null) {
    hideRealCandleOverlay()
    return
  }

  const highCoordinate = getPriceCoordinate(sourceBar.timestamp, sourceBar.high)
  const lowCoordinate = getPriceCoordinate(sourceBar.timestamp, sourceBar.low)
  if (
    !Number.isFinite(highCoordinate.x) ||
    !Number.isFinite(highCoordinate.y) ||
    !Number.isFinite(lowCoordinate.y)
  ) {
    hideRealCandleOverlay()
    return
  }

  const barSpace = chart.getBarSpace()
  const bodyWidth = clamp(barSpace.gapBar, 6, 18)
  const rangeWidth = bodyWidth + 6
  const x = highCoordinate.x
  const highY = highCoordinate.y
  const lowY = lowCoordinate.y
  const rangeTop = Math.min(highY, lowY)
  const rangeHeight = Math.max(1, Math.abs(lowY - highY))

  const rangeElement = overlay.querySelector('.real-candle-range')
  const highPriceElement = overlay.querySelector('.real-candle-high-price')
  const lowPriceElement = overlay.querySelector('.real-candle-low-price')
  const highValueElement = highPriceElement?.querySelector('.real-candle-price-value')
  const lowValueElement = lowPriceElement?.querySelector('.real-candle-price-value')
  if (
    rangeElement == null ||
    highPriceElement == null ||
    lowPriceElement == null ||
    highValueElement == null ||
    lowValueElement == null
  ) {
    hideRealCandleOverlay()
    return
  }

  rangeElement.style.left = `${x - rangeWidth / 2}px`
  rangeElement.style.top = `${rangeTop}px`
  rangeElement.style.width = `${rangeWidth}px`
  rangeElement.style.height = `${rangeHeight}px`

  highValueElement.textContent = formatPrice(sourceBar.high)
  lowValueElement.textContent = formatPrice(sourceBar.low)

  const markerLeft = x + rangeWidth / 2
  highPriceElement.style.left = `${markerLeft}px`
  highPriceElement.style.top = `${highY}px`
  lowPriceElement.style.left = `${markerLeft}px`
  lowPriceElement.style.top = `${lowY}px`

  overlay.classList.add('visible')

  window.requestAnimationFrame(() => {
    const maxHighLeft = chartDom.clientWidth - highPriceElement.offsetWidth - 4
    const maxLowLeft = chartDom.clientWidth - lowPriceElement.offsetWidth - 4
    highPriceElement.style.left = `${clamp(markerLeft, 4, Math.max(4, maxHighLeft))}px`
    lowPriceElement.style.left = `${clamp(markerLeft, 4, Math.max(4, maxLowLeft))}px`
  })
}

function switchPeriod (periodKey) {
  const config = PERIODS.find(({ key }) => key === periodKey)
  if (chart === null || config === undefined || activePeriodKey === periodKey) {
    return
  }
  hideRealCandleOverlay()
  activePeriodKey = periodKey
  setActivePeriodButton()
  saveDebugState()
  chart.setPeriod(config.period)
}

function switchCandleMode (modeKey) {
  const config = CANDLE_MODES.find(({ key }) => key === modeKey)
  if (chart === null || config === undefined || activeCandleModeKey === modeKey) {
    return
  }
  hideRealCandleOverlay()
  activeCandleModeKey = modeKey
  setActiveCandleModeButton()
  saveDebugState()
  chart.resetData()
}

function createManagedIndicator (indicator) {
  if (chart === null) {
    return false
  }
  return chart.createIndicator({
    name: indicator.name,
    calcParams: getIndicatorState(indicator.name).calcParams
  }, indicator.options) !== null
}

function hasManagedIndicator (name) {
  return chart !== null && chart.getIndicators({ name }).length > 0
}

function createDefaultIndicators () {
  INDICATORS.forEach(indicator => {
    const state = getIndicatorState(indicator.name)
    if (state.enabled && state.visible) {
      createManagedIndicator(indicator)
    }
  })
  renderIndicatorControls()
}

function setIndicatorVisible (name, visible) {
  const indicator = INDICATORS.find(item => item.name === name)
  const state = getIndicatorState(name)
  if (chart === null || indicator === undefined || !state.enabled || state.visible === visible) {
    return
  }

  if (visible) {
    if (createManagedIndicator(indicator) || hasManagedIndicator(name)) {
      state.visible = true
      saveDebugState()
      renderIndicatorControls()
    }
  } else {
    const removed = chart.removeIndicator({ name })
    if (removed || !hasManagedIndicator(name)) {
      state.visible = false
      saveDebugState()
      renderIndicatorControls()
    }
  }
}

function setIndicatorCalcParams (name, text) {
  const indicator = getIndicatorConfig(name)
  const state = getIndicatorState(name)
  const calcParams = parseCalcParamsText(text)
  if (indicator === undefined || calcParams === null) {
    setStatus(`Invalid ${name} params. Use comma-separated positive numbers.`)
    return
  }

  state.calcParams = calcParams
  if (chart !== null && state.enabled && state.visible) {
    chart.removeIndicator({ name })
    createManagedIndicator(indicator)
  }
  hideRealCandleOverlay()
  saveDebugState()
  renderIndicatorControls()
}

function removeManagedIndicator (name) {
  const state = getIndicatorState(name)
  if (chart === null || !state.enabled) {
    return
  }
  const removed = chart.removeIndicator({ name })
  if (removed || !hasManagedIndicator(name)) {
    state.enabled = false
    state.visible = true
    saveDebugState()
    renderIndicatorControls()
  }
}

function restoreManagedIndicator (name) {
  const indicator = INDICATORS.find(item => item.name === name)
  const state = getIndicatorState(name)
  if (chart === null || indicator === undefined || state.enabled) {
    return
  }
  if (createManagedIndicator(indicator)) {
    state.enabled = true
    state.visible = true
    saveDebugState()
    renderIndicatorControls()
  }
}

function mountChart () {
  const chartDom = document.getElementById('chart')
  if (chartDom === null) {
    return
  }
  dispose(chartDom)
  chart = init(chartDom, {
    layout: {
      basicParams: {},
      panes: [{ type: 'candle' }]
    }
  })
  chart.setSymbol({ ticker: SYMBOL, pricePrecision: 2, volumePrecision: 4 })
  chart.setPeriod(getActivePeriodConfig().period)
  applyGridVisibility()
  chart.setDataLoader(createDataLoader())
  chart.subscribeAction('onCrosshairChange', updateRealCandleOverlay)
  chart.subscribeAction('onScroll', hideRealCandleOverlay)
  chart.subscribeAction('onZoom', hideRealCandleOverlay)
  chart.subscribeAction('onVisibleRangeChange', hideRealCandleOverlay)
  chartDom.addEventListener('mouseleave', hideRealCandleOverlay)
  createDefaultIndicators()
}

function bindToolbar () {
  document.querySelectorAll('#period-switcher button').forEach(periodButton => {
    periodButton.addEventListener('click', () => {
      switchPeriod(periodButton.dataset.period)
    })
  })
  document.querySelectorAll('#candle-mode-switcher button').forEach(modeButton => {
    modeButton.addEventListener('click', () => {
      switchCandleMode(modeButton.dataset.candleMode)
    })
  })
  document.getElementById('grid-visibility-toggle')?.addEventListener('change', event => {
    const target = event.target
    setGridVisible(target?.checked === true)
  })
  document.getElementById('indicator-list')?.addEventListener('click', event => {
    const target = event.target
    if (typeof target?.closest !== 'function') {
      return
    }
    const button = target.closest('button[data-indicator]')
    if (button === null) {
      return
    }
    const name = button.dataset.indicator
    if (button.dataset.action === 'visibility') {
      setIndicatorVisible(name, !getIndicatorState(name).visible)
    } else if (button.dataset.action === 'remove') {
      removeManagedIndicator(name)
    }
  })
  document.getElementById('indicator-list')?.addEventListener('submit', event => {
    event.preventDefault()
    const target = event.target
    if (typeof target?.matches !== 'function' || !target.matches('form[data-indicator]')) {
      return
    }
    const name = target.dataset.indicator
    const formData = new FormData(target)
    const calcParams = formData.get('calcParams')
    if (typeof name === 'string' && typeof calcParams === 'string') {
      setIndicatorCalcParams(name, calcParams)
    }
  })
  document.getElementById('restore-indicator-select')?.addEventListener('change', event => {
    const target = event.target
    if (typeof target?.value !== 'string') {
      return
    }
    const name = target.value
    if (name !== '') {
      restoreManagedIndicator(name)
    }
  })
  setActivePeriodButton()
  setActiveCandleModeButton()
  setGridVisibilityToggle()
  renderIndicatorControls()
}

window.addEventListener('beforeunload', () => {
  const chartDom = document.getElementById('chart')
  if (chartDom !== null) {
    dispose(chartDom)
  }
})

bindToolbar()
mountChart()
