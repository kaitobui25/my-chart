const MAX_CANDLES = 300
const INDICATOR_TAIL = 120

function finiteOrNull (value) {
  return Number.isFinite(value) ? value : null
}

function normalizeBar (bar) {
  return {
    timestamp: finiteOrNull(bar?.timestamp),
    open: finiteOrNull(bar?.open),
    high: finiteOrNull(bar?.high),
    low: finiteOrNull(bar?.low),
    close: finiteOrNull(bar?.close),
    volume: finiteOrNull(bar?.volume) ?? 0,
    turnover: finiteOrNull(bar?.turnover),
    sourceOpen: finiteOrNull(bar?.sourceOpen),
    sourceHigh: finiteOrNull(bar?.sourceHigh),
    sourceLow: finiteOrNull(bar?.sourceLow),
    sourceClose: finiteOrNull(bar?.sourceClose)
  }
}

export function selectVisibleWindow (dataList, visibleRange, maxCandles = MAX_CANDLES) {
  if (!Array.isArray(dataList) || dataList.length === 0) {
    return { fromIndex: 0, toIndex: -1, data: [] }
  }

  const rangeFrom = Number.isFinite(visibleRange?.realFrom)
    ? visibleRange.realFrom
    : Number.isFinite(visibleRange?.from) ? visibleRange.from : dataList.length - maxCandles
  const rangeTo = Number.isFinite(visibleRange?.realTo)
    ? visibleRange.realTo
    : Number.isFinite(visibleRange?.to) ? visibleRange.to : dataList.length - 1

  const visibleFrom = Math.max(0, Math.floor(rangeFrom))
  const visibleTo = Math.min(dataList.length - 1, Math.ceil(rangeTo))
  const contextPadding = Math.max(20, Math.floor(maxCandles * 0.2))
  const paddedFrom = Math.max(0, visibleFrom - contextPadding)
  const paddedTo = Math.max(paddedFrom, visibleTo)
  const fromIndex = Math.max(paddedFrom, paddedTo - maxCandles + 1)
  const toIndex = Math.min(dataList.length - 1, paddedTo)

  return {
    fromIndex,
    toIndex,
    data: dataList.slice(fromIndex, toIndex + 1)
  }
}

function getActiveButtonValue (selector, dataKey, fallback) {
  const button = document.querySelector(`${selector} button.active`)
  return button?.dataset?.[dataKey] ?? fallback
}

function readReplayState (dataList) {
  const session = document.getElementById('replay-session-controls')
  const active = session !== null && session.hidden === false
  const currentBar = dataList.at(-1) ?? null
  return {
    active,
    currentTimestamp: finiteOrNull(currentBar?.timestamp),
    positionText: active ? document.getElementById('replay-position')?.textContent?.trim() ?? '' : ''
  }
}

function normalizeIndicatorValue (value) {
  if (value === null || typeof value !== 'object') return value
  const normalized = {}
  for (const [key, item] of Object.entries(value)) {
    if (Number.isFinite(item)) normalized[key] = item
    else if (typeof item === 'string' || typeof item === 'boolean' || item === null) normalized[key] = item
  }
  return normalized
}

function snapshotIndicators (chart, fromIndex, toIndex) {
  const indicators = chart.getIndicators?.() ?? []
  return indicators.map(indicator => {
    const result = Array.isArray(indicator.result) ? indicator.result : []
    const tailFrom = Math.max(fromIndex, toIndex - INDICATOR_TAIL + 1)
    const values = []
    for (let index = tailFrom; index <= toIndex; index++) {
      const value = result[index]
      if (value !== undefined) {
        values.push({ dataIndex: index, value: normalizeIndicatorValue(value) })
      }
    }
    return {
      name: indicator.name,
      shortName: indicator.shortName,
      paneId: indicator.paneId,
      calcParams: Array.isArray(indicator.calcParams) ? [...indicator.calcParams] : [],
      current: normalizeIndicatorValue(result[toIndex] ?? null),
      values
    }
  })
}

function createGeneratedAt () {
  return new Date().toISOString()
}

export function createChartContextApi (chart) {
  function getContext () {
    const dataList = chart.getDataList?.() ?? []
    const visibleRange = chart.getVisibleRange?.() ?? null
    const selected = selectVisibleWindow(dataList, visibleRange)
    const bars = selected.data.map(normalizeBar)
    const firstBar = bars[0] ?? null
    const lastBar = bars.at(-1) ?? null
    const symbol = chart.getSymbol?.() ?? null
    const period = chart.getPeriod?.() ?? null

    return {
      version: 1,
      generatedAt: createGeneratedAt(),
      symbol: symbol?.ticker ?? 'BTCUSDT',
      timeframe: getActiveButtonValue('#period-switcher', 'period', '1m'),
      period,
      candleMode: getActiveButtonValue('#candle-mode-switcher', 'candleMode', 'normal'),
      replay: readReplayState(dataList),
      visibleRange: {
        fromIndex: selected.fromIndex,
        toIndex: selected.toIndex,
        fromTimestamp: finiteOrNull(firstBar?.timestamp),
        toTimestamp: finiteOrNull(lastBar?.timestamp),
        raw: visibleRange
      },
      candleCount: bars.length,
      candles: bars,
      indicators: snapshotIndicators(chart, selected.fromIndex, selected.toIndex)
    }
  }

  function captureScreenshot () {
    try {
      return chart.getConvertPictureUrl?.(true, 'png', '#ffffff') ?? null
    } catch {
      return null
    }
  }

  return Object.freeze({ getContext, captureScreenshot })
}
