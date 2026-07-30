import ChartImp from '../src/Chart.ts'
import { registerIndicator } from '../src/index.ts'

const INDICATOR_NAME = 'DEBUG_RSI'
const PANE_ID = 'debug_rsi_pane'
const STORAGE_KEY = 'klinecharts.debug.rsi.v2'
const LEGACY_STORAGE_KEY = 'klinecharts.debug.rsi.v1'

const DEFAULTS = {
  visible: true,
  period: 14,
  overbought: 70,
  oversold: 30,
  trendEnabled: true,
  pivotLeft: 3,
  pivotRight: 3,
  minBarsBetweenPivots: 6,
  minRsiDifference: 4,
  lineTolerance: 1.5,
  minTouches: 2,
  lookbackBars: 300,
  breakoutConfirmationBars: 2,
  extendRight: true,
  showResistance: true,
  showSupport: true
}

const NUMBER_RULES = {
  period: [2, 500, true],
  overbought: [0, 100, false],
  oversold: [0, 100, false],
  pivotLeft: [1, 20, true],
  pivotRight: [1, 20, true],
  minBarsBetweenPivots: [2, 200, true],
  minRsiDifference: [0, 50, false],
  lineTolerance: [0, 20, false],
  minTouches: [2, 10, true],
  lookbackBars: [30, 5000, true],
  breakoutConfirmationBars: [1, 20, true]
}

const BOOLEAN_KEYS = [
  'visible',
  'trendEnabled',
  'extendRight',
  'showResistance',
  'showSupport'
]

function normalizeState (value = {}) {
  const state = { ...DEFAULTS }
  for (const [key, [min, max, integer]] of Object.entries(NUMBER_RULES)) {
    const number = Number(value[key])
    if (Number.isFinite(number) && number >= min && number <= max) {
      state[key] = integer ? Math.round(number) : number
    }
  }
  for (const key of BOOLEAN_KEYS) {
    if (typeof value[key] === 'boolean') {
      state[key] = value[key]
    }
  }
  if (state.oversold >= state.overbought) {
    state.overbought = DEFAULTS.overbought
    state.oversold = DEFAULTS.oversold
  }
  return state
}

function readState () {
  try {
    const stored = localStorage.getItem(STORAGE_KEY) ?? localStorage.getItem(LEGACY_STORAGE_KEY) ?? '{}'
    return normalizeState(JSON.parse(stored))
  } catch {
    return { ...DEFAULTS }
  }
}

function saveState () {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {}
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

function calculateRsiValues (dataList, period) {
  const values = new Array(dataList.length)
  let gainSum = 0
  let lossSum = 0
  let averageGain
  let averageLoss

  for (let index = 1; index < dataList.length; index++) {
    const change = dataList[index].close - dataList[index - 1].close
    const gain = Math.max(change, 0)
    const loss = Math.max(-change, 0)

    if (index <= period) {
      gainSum += gain
      lossSum += loss
    }
    if (index < period) {
      continue
    }

    if (index === period) {
      averageGain = gainSum / period
      averageLoss = lossSum / period
    } else {
      averageGain = (averageGain * (period - 1) + gain) / period
      averageLoss = (averageLoss * (period - 1) + loss) / period
    }

    values[index] = averageLoss === 0
      ? 100
      : averageGain === 0
        ? 0
        : 100 - 100 / (1 + averageGain / averageLoss)
  }
  return values
}

function findPivots (values, startIndex, left, right) {
  const highs = []
  const lows = []
  const firstIndex = Math.max(startIndex, left)
  const lastIndex = values.length - right - 1

  for (let index = firstIndex; index <= lastIndex; index++) {
    const value = values[index]
    if (!Number.isFinite(value)) {
      continue
    }

    let high = true
    let low = true
    for (let offset = 1; offset <= left && (high || low); offset++) {
      const neighbour = values[index - offset]
      high = high && Number.isFinite(neighbour) && value > neighbour
      low = low && Number.isFinite(neighbour) && value < neighbour
    }
    for (let offset = 1; offset <= right && (high || low); offset++) {
      const neighbour = values[index + offset]
      high = high && Number.isFinite(neighbour) && value > neighbour
      low = low && Number.isFinite(neighbour) && value < neighbour
    }

    if (high) highs.push({ index, value })
    if (low) lows.push({ index, value })
  }
  return { highs, lows }
}

function lineValueAt (line, index) {
  return line.first.value + line.slope * (index - line.first.index)
}

function isBroken (values, line, type, settings, validationLastIndex) {
  let consecutive = 0
  for (let index = line.first.index; index <= validationLastIndex; index++) {
    const value = values[index]
    if (!Number.isFinite(value)) {
      consecutive = 0
      continue
    }
    const projected = lineValueAt(line, index)
    const broken = type === 'resistance'
      ? value > projected + settings.lineTolerance
      : value < projected - settings.lineTolerance
    consecutive = broken ? consecutive + 1 : 0
    if (consecutive >= settings.breakoutConfirmationBars) {
      return true
    }
  }
  return false
}

function countTouches (pivots, line, lastIndex, tolerance) {
  return pivots.reduce((count, pivot) => {
    if (pivot.index < line.first.index || pivot.index > lastIndex) {
      return count
    }
    return Math.abs(pivot.value - lineValueAt(line, pivot.index)) <= tolerance
      ? count + 1
      : count
  }, 0)
}

function findBestLine (values, pivots, type, settings) {
  const currentIndex = values.length - 1
  let best = null

  for (let firstIndex = 0; firstIndex < pivots.length - 1; firstIndex++) {
    const first = pivots[firstIndex]
    for (let secondIndex = firstIndex + 1; secondIndex < pivots.length; secondIndex++) {
      const second = pivots[secondIndex]
      const span = second.index - first.index
      if (span < settings.minBarsBetweenPivots) continue

      const difference = second.value - first.value
      const directionIsValid = type === 'resistance'
        ? difference <= -settings.minRsiDifference
        : difference >= settings.minRsiDifference
      if (!directionIsValid) continue

      const line = { first, second, slope: difference / span }
      const validationLastIndex = settings.extendRight ? currentIndex : second.index
      const projectedLast = lineValueAt(line, validationLastIndex)
      if (projectedLast < 0 || projectedLast > 100) continue
      if (isBroken(values, line, type, settings, validationLastIndex)) continue

      const touches = countTouches(pivots, line, validationLastIndex, settings.lineTolerance)
      if (touches < settings.minTouches) continue

      const age = currentIndex - second.index
      const score = touches * 25 + Math.min(span, settings.lookbackBars) * 0.08 - age * 0.12
      if (best === null || score > best.score) {
        best = { ...line, touches, score }
      }
    }
  }
  return best
}

function applyLine (results, line, key, extendRight) {
  if (line === null) return
  const lastIndex = extendRight ? results.length - 1 : line.second.index
  for (let index = line.first.index; index <= lastIndex; index++) {
    const value = lineValueAt(line, index)
    if (value >= 0 && value <= 100) {
      results[index][key] = value
    }
  }
}

function stateToCalcParams (source) {
  return [
    source.period,
    source.overbought,
    source.oversold,
    source.trendEnabled,
    source.pivotLeft,
    source.pivotRight,
    source.minBarsBetweenPivots,
    source.minRsiDifference,
    source.lineTolerance,
    source.minTouches,
    source.lookbackBars,
    source.breakoutConfirmationBars,
    source.extendRight,
    source.showResistance,
    source.showSupport
  ]
}

function calculateIndicator (dataList, indicator) {
  const [
    period, overbought, oversold, trendEnabled,
    pivotLeft, pivotRight, minBarsBetweenPivots,
    minRsiDifference, lineTolerance, minTouches,
    lookbackBars, breakoutConfirmationBars, extendRight,
    showResistance, showSupport
  ] = indicator.calcParams

  const rsiValues = calculateRsiValues(dataList, period)
  const results = rsiValues.map(rsi => ({ rsi, overbought, midpoint: 50, oversold }))
  if (!trendEnabled || dataList.length < period + pivotLeft + pivotRight + 2) {
    return results
  }

  const settings = {
    minBarsBetweenPivots,
    minRsiDifference,
    lineTolerance,
    minTouches,
    lookbackBars,
    breakoutConfirmationBars,
    extendRight
  }
  const pivots = findPivots(
    rsiValues,
    Math.max(period, dataList.length - lookbackBars),
    pivotLeft,
    pivotRight
  )

  if (showResistance) {
    applyLine(results, findBestLine(rsiValues, pivots.highs, 'resistance', settings), 'trendResistance', extendRight)
  }
  if (showSupport) {
    applyLine(results, findBestLine(rsiValues, pivots.lows, 'support', settings), 'trendSupport', extendRight)
  }
  return results
}

registerIndicator({
  name: INDICATOR_NAME,
  shortName: 'RSI',
  precision: 2,
  calcParams: stateToCalcParams(DEFAULTS),
  minValue: 0,
  maxValue: 100,
  figures: [
    { key: 'rsi', title: 'RSI: ', type: 'line', styles: () => ({ color: '#7c3aed', size: 2, style: 'solid' }) },
    { key: 'trendResistance', title: 'R-TL: ', type: 'line', styles: () => ({ color: '#ef4444', size: 2, style: 'solid' }) },
    { key: 'trendSupport', title: 'S-TL: ', type: 'line', styles: () => ({ color: '#10b981', size: 2, style: 'solid' }) },
    { key: 'overbought', title: 'OB: ', type: 'line', styles: () => ({ color: 'rgba(242, 54, 69, 0.72)', size: 1, style: 'dashed', dashedValue: [4, 4] }) },
    { key: 'midpoint', title: 'MID: ', type: 'line', styles: () => ({ color: 'rgba(100, 116, 139, 0.50)', size: 1, style: 'dashed', dashedValue: [3, 4] }) },
    { key: 'oversold', title: 'OS: ', type: 'line', styles: () => ({ color: 'rgba(8, 153, 129, 0.72)', size: 1, style: 'dashed', dashedValue: [4, 4] }) }
  ],
  calc: calculateIndicator
})

let chart = null
const originalSetDataLoader = ChartImp.prototype.setDataLoader
ChartImp.prototype.setDataLoader = function (dataLoader) {
  chart = this
  return originalSetDataLoader.call(this, dataLoader)
}
try {
  await import('./main.js')
} finally {
  ChartImp.prototype.setDataLoader = originalSetDataLoader
}

const state = readState()

function recreateIndicator () {
  if (chart === null) return false
  chart.removeIndicator({ name: INDICATOR_NAME })
  return chart.createIndicator({
    name: INDICATOR_NAME,
    calcParams: stateToCalcParams(state)
  }, {
    pane: { id: PANE_ID }
  }) !== null
}

function setVisible (visible) {
  state.visible = visible
  if (visible) {
    if (!recreateIndicator()) {
      setStatus('Unable to create RSI pane.')
      return
    }
  } else {
    chart?.removeIndicator({ name: INDICATOR_NAME })
  }
  saveState()
  renderControl()
}

function numberField (key, label, step = 1) {
  const [min, max] = NUMBER_RULES[key]
  return `<label>${label}<input name="${key}" type="number" min="${min}" max="${max}" step="${step}" value="${state[key]}"></label>`
}

function checkboxField (key, label) {
  return `<label class="rsi-checkbox-field"><input name="${key}" type="checkbox"${state[key] ? ' checked' : ''}><span>${label}</span></label>`
}

function readForm (form) {
  const next = { ...state }
  for (const [key, [min, max, integer]] of Object.entries(NUMBER_RULES)) {
    const value = Number(form.elements[key].value)
    if (!Number.isFinite(value) || value < min || value > max) return null
    next[key] = integer ? Math.round(value) : value
  }
  for (const key of BOOLEAN_KEYS.filter(key => key !== 'visible')) {
    next[key] = form.elements[key].checked
  }
  return next.oversold < next.overbought ? next : null
}

function renderControl () {
  const host = document.getElementById('indicator-controls')
  if (host === null) return
  document.getElementById('rsi-indicator-control')?.remove()

  const item = document.createElement('div')
  item.id = 'rsi-indicator-control'
  item.className = `indicator-control${state.visible ? '' : ' hidden'}`
  item.innerHTML = `
    <span class="indicator-name">RSI Auto TL</span>
    <details class="indicator-settings rsi-indicator-settings">
      <summary title="RSI and auto trend line settings" aria-label="RSI and auto trend line settings">⚙</summary>
      <form class="indicator-settings-panel rsi-settings-panel">
        <div class="rsi-settings-grid">
          ${numberField('period', 'RSI period')}
          ${numberField('overbought', 'Overbought', 0.5)}
          ${numberField('oversold', 'Oversold', 0.5)}
          ${numberField('pivotLeft', 'Pivot left')}
          ${numberField('pivotRight', 'Pivot right')}
          ${numberField('minBarsBetweenPivots', 'Min pivot bars')}
          ${numberField('minRsiDifference', 'Min RSI move', 0.5)}
          ${numberField('lineTolerance', 'Line tolerance', 0.1)}
          ${numberField('minTouches', 'Min touches')}
          ${numberField('lookbackBars', 'Lookback bars')}
          ${numberField('breakoutConfirmationBars', 'Breakout bars')}
          ${checkboxField('trendEnabled', 'Auto trend lines')}
          ${checkboxField('extendRight', 'Extend right')}
          ${checkboxField('showResistance', 'Resistance line')}
          ${checkboxField('showSupport', 'Support line')}
        </div>
        <div class="rsi-settings-actions">
          <span class="rsi-settings-hint">Confirmed pivots only. No LLM. A pivot is final after the configured right-side bars close.</span>
          <button class="indicator-icon-button" type="submit" title="Apply RSI settings" aria-label="Apply RSI settings">✓</button>
        </div>
      </form>
    </details>
    <button class="indicator-icon-button rsi-visibility-button" type="button" title="${state.visible ? 'Hide RSI' : 'Show RSI'}" aria-label="${state.visible ? 'Hide RSI' : 'Show RSI'}">${state.visible ? '◉' : '○'}</button>
  `

  const details = item.querySelector('details')
  const form = item.querySelector('form')
  form.addEventListener('submit', event => {
    event.preventDefault()
    const next = readForm(form)
    if (next === null) {
      setStatus('Invalid RSI trend settings. Check limits and keep oversold below overbought.')
      return
    }
    Object.assign(state, next)
    if (state.visible && !recreateIndicator()) {
      setStatus('Unable to update RSI pane.')
      return
    }
    saveState()
    details.open = false
    setStatus(`RSI ${state.period}; auto trend ${state.trendEnabled ? 'on' : 'off'}; pivots ${state.pivotLeft}/${state.pivotRight}.`)
    renderControl()
  })
  item.querySelector('.rsi-visibility-button').addEventListener('click', () => setVisible(!state.visible))
  host.appendChild(item)
}

if (state.visible && !recreateIndicator()) {
  setStatus('Unable to create RSI pane.')
}
renderControl()
