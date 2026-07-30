import ChartImp from '../src/Chart.ts'
import { registerIndicator } from '../src/index.ts'

const RSI_INDICATOR_NAME = 'DEBUG_RSI'
const RSI_PANE_ID = 'debug_rsi_pane'
const RSI_STORAGE_KEY = 'klinecharts.debug.rsi.v2'
const LEGACY_RSI_STORAGE_KEY = 'klinecharts.debug.rsi.v1'

const DEFAULT_RSI_STATE = {
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

const ICONS = {
  settings: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z"/><path d="M19.4 15a1.8 1.8 0 0 0 .36 1.98l.04.04a2.1 2.1 0 0 1-2.97 2.97l-.04-.04a1.8 1.8 0 0 0-1.98-.36 1.8 1.8 0 0 0-1.08 1.65V21.3a2.1 2.1 0 0 1-4.2 0v-.06a1.8 1.8 0 0 0-1.08-1.65 1.8 1.8 0 0 0-1.98.36l-.04.04a2.1 2.1 0 0 1-2.97-2.97l.04-.04A1.8 1.8 0 0 0 3.86 15a1.8 1.8 0 0 0-1.65-1.08h-.06a2.1 2.1 0 0 1 0-4.2h.06a1.8 1.8 0 0 0 1.65-1.08 1.8 1.8 0 0 0-.36-1.98l-.04-.04a2.1 2.1 0 0 1 2.97-2.97l.04.04a1.8 1.8 0 0 0 1.98.36 1.8 1.8 0 0 0 1.08-1.65v-.06a2.1 2.1 0 0 1 4.2 0v.06a1.8 1.8 0 0 0 1.08 1.65 1.8 1.8 0 0 0 1.98-.36l.04-.04a2.1 2.1 0 0 1 2.97 2.97l-.04-.04a1.8 1.8 0 0 0-.36 1.98 1.8 1.8 0 0 0 1.65 1.08h.06a2.1 2.1 0 0 1 0 4.2h-.06A1.8 1.8 0 0 0 19.4 15Z"/></svg>',
  eye: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2.5 12s3.5-6.5 9.5-6.5 9.5 6.5 9.5 6.5-3.5 6.5-9.5 6.5S2.5 12 2.5 12Z"/><path d="M12 15.2a3.2 3.2 0 1 0 0-6.4 3.2 3.2 0 0 0 0 6.4Z"/></svg>',
  eyeOff: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 3l18 18"/><path d="M10.6 10.6a2.1 2.1 0 0 0 2.8 2.8"/><path d="M9.9 5.8A9.3 9.3 0 0 1 12 5.5c6 0 9.5 6.5 9.5 6.5a16.1 16.1 0 0 1-2.7 3.4"/><path d="M6.2 7.6A16 16 0 0 0 2.5 12s3.5 6.5 9.5 6.5a9.2 9.2 0 0 0 4.3-1.1"/></svg>',
  check: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m20 6-11 11-5-5"/></svg>'
}

function finiteNumber (value, fallback, min, max, integer = false) {
  const number = Number(value)
  if (!Number.isFinite(number) || number < min || number > max) {
    return fallback
  }
  return integer ? Math.round(number) : number
}

function booleanValue (value, fallback) {
  return typeof value === 'boolean' ? value : fallback
}

function readState () {
  try {
    const stored = window.localStorage.getItem(RSI_STORAGE_KEY) ?? window.localStorage.getItem(LEGACY_RSI_STORAGE_KEY) ?? '{}'
    const value = JSON.parse(stored)
    return {
      visible: booleanValue(value.visible, DEFAULT_RSI_STATE.visible),
      period: finiteNumber(value.period, DEFAULT_RSI_STATE.period, 2, 500, true),
      overbought: finiteNumber(value.overbought, DEFAULT_RSI_STATE.overbought, 0, 100),
      oversold: finiteNumber(value.oversold, DEFAULT_RSI_STATE.oversold, 0, 100),
      trendEnabled: booleanValue(value.trendEnabled, DEFAULT_RSI_STATE.trendEnabled),
      pivotLeft: finiteNumber(value.pivotLeft, DEFAULT_RSI_STATE.pivotLeft, 1, 20, true),
      pivotRight: finiteNumber(value.pivotRight, DEFAULT_RSI_STATE.pivotRight, 1, 20, true),
      minBarsBetweenPivots: finiteNumber(value.minBarsBetweenPivots, DEFAULT_RSI_STATE.minBarsBetweenPivots, 2, 200, true),
      minRsiDifference: finiteNumber(value.minRsiDifference, DEFAULT_RSI_STATE.minRsiDifference, 0, 50),
      lineTolerance: finiteNumber(value.lineTolerance, DEFAULT_RSI_STATE.lineTolerance, 0, 20),
      minTouches: finiteNumber(value.minTouches, DEFAULT_RSI_STATE.minTouches, 2, 10, true),
      lookbackBars: finiteNumber(value.lookbackBars, DEFAULT_RSI_STATE.lookbackBars, 30, 5000, true),
      breakoutConfirmationBars: finiteNumber(value.breakoutConfirmationBars, DEFAULT_RSI_STATE.breakoutConfirmationBars, 1, 20, true),
      extendRight: booleanValue(value.extendRight, DEFAULT_RSI_STATE.extendRight),
      showResistance: booleanValue(value.showResistance, DEFAULT_RSI_STATE.showResistance),
      showSupport: booleanValue(value.showSupport, DEFAULT_RSI_STATE.showSupport)
    }
  } catch {
    return { ...DEFAULT_RSI_STATE }
  }
}

function saveState (state) {
  try {
    window.localStorage.setItem(RSI_STORAGE_KEY, JSON.stringify(state))
  } catch {}
}

function setStatus (text) {
  let statusElement = document.getElementById('load-status')
  if (statusElement === null) {
    statusElement = document.createElement('span')
    statusElement.id = 'load-status'
    document.getElementById('toolbar')?.appendChild(statusElement)
  }
  statusElement.textContent = text
}

function createIcon (name) {
  const iconElement = document.createElement('span')
  iconElement.className = 'control-icon'
  iconElement.innerHTML = ICONS[name] ?? ''
  return iconElement
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

    if (averageLoss === 0) {
      values[index] = 100
    } else if (averageGain === 0) {
      values[index] = 0
    } else {
      values[index] = 100 - 100 / (1 + averageGain / averageLoss)
    }
  }

  return values
}

function findPivots (values, startIndex, pivotLeft, pivotRight) {
  const highs = []
  const lows = []
  const firstIndex = Math.max(startIndex, pivotLeft)
  const lastIndex = values.length - pivotRight - 1

  for (let index = firstIndex; index <= lastIndex; index++) {
    const value = values[index]
    if (!Number.isFinite(value)) {
      continue
    }

    let isHigh = true
    let isLow = true
    for (let offset = 1; offset <= pivotLeft && (isHigh || isLow); offset++) {
      const neighbour = values[index - offset]
      if (!Number.isFinite(neighbour)) {
        isHigh = false
        isLow = false
        break
      }
      isHigh = isHigh && value > neighbour
      isLow = isLow && value < neighbour
    }
    for (let offset = 1; offset <= pivotRight && (isHigh || isLow); offset++) {
      const neighbour = values[index + offset]
      if (!Number.isFinite(neighbour)) {
        isHigh = false
        isLow = false
        break
      }
      isHigh = isHigh && value > neighbour
      isLow = isLow && value < neighbour
    }

    if (isHigh) {
      highs.push({ index, value })
    }
    if (isLow) {
      lows.push({ index, value })
    }
  }

  return { highs, lows }
}

function lineValueAt (line, index) {
  return line.first.value + line.slope * (index - line.first.index)
}

function countTouches (pivots, firstIndex, lastIndex, line, tolerance) {
  let touches = 0
  for (const pivot of pivots) {
    if (pivot.index < firstIndex || pivot.index > lastIndex) {
      continue
    }
    if (Math.abs(pivot.value - lineValueAt(line, pivot.index)) <= tolerance) {
      touches++
    }
  }
  return touches
}

function isLineBroken (values, line, type, tolerance, confirmationBars, lastIndex) {
  let consecutiveBreaks = 0
  for (let index = line.first.index; index <= lastIndex; index++) {
    const value = values[index]
    if (!Number.isFinite(value)) {
      consecutiveBreaks = 0
      continue
    }
    const projectedValue = lineValueAt(line, index)
    const broken = type === 'resistance'
      ? value > projectedValue + tolerance
      : value < projectedValue - tolerance

    consecutiveBreaks = broken ? consecutiveBreaks + 1 : 0
    if (consecutiveBreaks >= confirmationBars) {
      return true
    }
  }
  return false
}

function findBestTrendLine (values, pivots, type, settings) {
  if (pivots.length < 2) {
    return null
  }

  const lastIndex = values.length - 1
  let bestLine = null

  for (let firstPivotIndex = 0; firstPivotIndex < pivots.length - 1; firstPivotIndex++) {
    const first = pivots[firstPivotIndex]
    for (let secondPivotIndex = firstPivotIndex + 1; secondPivotIndex < pivots.length; secondPivotIndex++) {
      const second = pivots[secondPivotIndex]
      const span = second.index - first.index
      if (span < settings.minBarsBetweenPivots) {
        continue
      }

      const difference = second.value - first.value
      const correctDirection = type === 'resistance'
        ? difference <= -settings.minRsiDifference
        : difference >= settings.minRsiDifference
      if (!correctDirection) {
        continue
      }

      const line = {
        first,
        second,
        slope: difference / span
      }
      const projectedLastValue = lineValueAt(line, lastIndex)
      if (projectedLastValue < 0 || projectedLastValue > 100) {
        continue
      }
      if (isLineBroken(values, line, type, settings.lineTolerance, settings.breakoutConfirmationBars, lastIndex)) {
        continue
      }

      const touches = countTouches(pivots, first.index, lastIndex, line, settings.lineTolerance)
      if (touches < settings.minTouches) {
        continue
      }

      const barsSinceSecondPivot = lastIndex - second.index
      const score = touches * 25 + Math.min(span, settings.lookbackBars) * 0.08 - barsSinceSecondPivot * 0.12
      if (bestLine === null || score > bestLine.score) {
        bestLine = { ...line, score, touches }
      }
    }
  }

  return bestLine
}

function applyTrendLine (results, line, key, extendRight) {
  if (line === null) {
    return
  }
  const lastIndex = extendRight ? results.length - 1 : line.second.index
  for (let index = line.first.index; index <= lastIndex; index++) {
    const value = lineValueAt(line, index)
    if (value >= 0 && value <= 100) {
      results[index][key] = value
    }
  }
}

function calculateRsi (dataList, indicator) {
  const [
    period,
    overbought,
    oversold,
    trendEnabled,
    pivotLeft,
    pivotRight,
    minBarsBetweenPivots,
    minRsiDifference,
    lineTolerance,
    minTouches,
    lookbackBars,
    breakoutConfirmationBars,
    extendRight,
    showResistance,
    showSupport
  ] = indicator.calcParams

  const rsiValues = calculateRsiValues(dataList, period)
  const results = rsiValues.map(rsi => ({
    rsi,
    overbought,
    midpoint: 50,
    oversold
  }))

  if (!trendEnabled || dataList.length < period + pivotLeft + pivotRight + 2) {
    return results
  }

  const settings = {
    minBarsBetweenPivots,
    minRsiDifference,
    lineTolerance,
    minTouches,
    lookbackBars,
    breakoutConfirmationBars
  }
  const startIndex = Math.max(period, dataList.length - lookbackBars)
  const pivots = findPivots(rsiValues, startIndex, pivotLeft, pivotRight)

  if (showResistance) {
    const resistance = findBestTrendLine(rsiValues, pivots.highs, 'resistance', settings)
    applyTrendLine(results, resistance, 'trendResistance', extendRight)
  }
  if (showSupport) {
    const support = findBestTrendLine(rsiValues, pivots.lows, 'support', settings)
    applyTrendLine(results, support, 'trendSupport', extendRight)
  }

  return results
}

function stateToCalcParams (state) {
  return [
    state.period,
    state.overbought,
    state.oversold,
    state.trendEnabled,
    state.pivotLeft,
    state.pivotRight,
    state.minBarsBetweenPivots,
    state.minRsiDifference,
    state.lineTolerance,
    state.minTouches,
    state.lookbackBars,
    state.breakoutConfirmationBars,
    state.extendRight,
    state.showResistance,
    state.showSupport
  ]
}

registerIndicator({
  name: RSI_INDICATOR_NAME,
  shortName: 'RSI',
  precision: 2,
  calcParams: stateToCalcParams(DEFAULT_RSI_STATE),
  minValue: 0,
  maxValue: 100,
  figures: [
    {
      key: 'rsi',
      title: 'RSI: ',
      type: 'line',
      styles: () => ({ color: '#7c3aed', size: 2, style: 'solid' })
    },
    {
      key: 'trendResistance',
      title: 'R-TL: ',
      type: 'line',
      styles: () => ({ color: '#ef4444', size: 2, style: 'solid' })
    },
    {
      key: 'trendSupport',
      title: 'S-TL: ',
      type: 'line',
      styles: () => ({ color: '#10b981', size: 2, style: 'solid' })
    },
    {
      key: 'overbought',
      title: 'OB: ',
      type: 'line',
      styles: () => ({ color: 'rgba(242, 54, 69, 0.72)', size: 1, style: 'dashed', dashedValue: [4, 4] })
    },
    {
      key: 'midpoint',
      title: 'MID: ',
      type: 'line',
      styles: () => ({ color: 'rgba(100, 116, 139, 0.50)', size: 1, style: 'dashed', dashedValue: [3, 4] })
    },
    {
      key: 'oversold',
      title: 'OS: ',
      type: 'line',
      styles: () => ({ color: 'rgba(8, 153, 129, 0.72)', size: 1, style: 'dashed', dashedValue: [4, 4] })
    }
  ],
  calc: calculateRsi
})

let debugChart = null
const originalSetDataLoader = ChartImp.prototype.setDataLoader
ChartImp.prototype.setDataLoader = function (dataLoader) {
  debugChart = this
  return originalSetDataLoader.call(this, dataLoader)
}

try {
  await import('./main.js')
} finally {
  ChartImp.prototype.setDataLoader = originalSetDataLoader
}

const state = readState()

function removeRsi () {
  debugChart?.removeIndicator({ name: RSI_INDICATOR_NAME })
}

function createRsi () {
  if (debugChart === null) {
    return false
  }
  removeRsi()
  return debugChart.createIndicator({
    name: RSI_INDICATOR_NAME,
    calcParams: stateToCalcParams(state)
  }, {
    pane: { id: RSI_PANE_ID }
  }) !== null
}

function setRsiVisible (visible) {
  state.visible = visible
  if (visible) {
    if (!createRsi()) {
      setStatus('Unable to create RSI pane.')
      return
    }
  } else {
    removeRsi()
  }
  saveState(state)
  renderControl()
}

function addNumberField (container, controls, key, label, options) {
  const labelElement = document.createElement('label')
  labelElement.textContent = label

  const inputElement = document.createElement('input')
  inputElement.type = 'number'
  inputElement.name = key
  inputElement.value = String(state[key])
  inputElement.min = String(options.min)
  inputElement.max = String(options.max)
  inputElement.step = String(options.step ?? 1)
  inputElement.setAttribute('aria-label', label)
  labelElement.appendChild(inputElement)
  container.appendChild(labelElement)
  controls[key] = { element: inputElement, ...options }
}

function addCheckboxField (container, controls, key, label) {
  const labelElement = document.createElement('label')
  labelElement.className = 'rsi-checkbox-field'

  const inputElement = document.createElement('input')
  inputElement.type = 'checkbox'
  inputElement.name = key
  inputElement.checked = state[key]
  inputElement.setAttribute('aria-label', label)
  labelElement.appendChild(inputElement)

  const textElement = document.createElement('span')
  textElement.textContent = label
  labelElement.appendChild(textElement)

  container.appendChild(labelElement)
  controls[key] = { element: inputElement, checkbox: true }
}

function readFormSettings (controls) {
  const nextState = {}
  for (const [key, control] of Object.entries(controls)) {
    if (control.checkbox) {
      nextState[key] = control.element.checked
      continue
    }
    const value = Number(control.element.value)
    if (!Number.isFinite(value) || value < control.min || value > control.max) {
      return null
    }
    nextState[key] = control.integer ? Math.round(value) : value
  }
  if (nextState.oversold >= nextState.overbought) {
    return null
  }
  return nextState
}

function renderControl () {
  const controlsElement = document.getElementById('indicator-controls')
  if (controlsElement === null) {
    return
  }

  document.getElementById('rsi-indicator-control')?.remove()

  const itemElement = document.createElement('div')
  itemElement.id = 'rsi-indicator-control'
  itemElement.className = `indicator-control${state.visible ? '' : ' hidden'}`

  const nameElement = document.createElement('span')
  nameElement.className = 'indicator-name'
  nameElement.textContent = 'RSI Auto TL'
  itemElement.appendChild(nameElement)

  const settingsElement = document.createElement('details')
  settingsElement.className = 'indicator-settings rsi-indicator-settings'

  const summaryElement = document.createElement('summary')
  summaryElement.title = 'RSI and auto trend line settings'
  summaryElement.setAttribute('aria-label', summaryElement.title)
  summaryElement.appendChild(createIcon('settings'))
  settingsElement.appendChild(summaryElement)

  const formElement = document.createElement('form')
  formElement.className = 'indicator-settings-panel rsi-settings-panel'

  const fieldsElement = document.createElement('div')
  fieldsElement.className = 'rsi-settings-grid'
  const controls = {}

  addNumberField(fieldsElement, controls, 'period', 'RSI period', { min: 2, max: 500, integer: true })
  addNumberField(fieldsElement, controls, 'overbought', 'Overbought', { min: 0, max: 100, step: 0.5 })
  addNumberField(fieldsElement, controls, 'oversold', 'Oversold', { min: 0, max: 100, step: 0.5 })
  addNumberField(fieldsElement, controls, 'pivotLeft', 'Pivot left', { min: 1, max: 20, integer: true })
  addNumberField(fieldsElement, controls, 'pivotRight', 'Pivot right', { min: 1, max: 20, integer: true })
  addNumberField(fieldsElement, controls, 'minBarsBetweenPivots', 'Min pivot bars', { min: 2, max: 200, integer: true })
  addNumberField(fieldsElement, controls, 'minRsiDifference', 'Min RSI move', { min: 0, max: 50, step: 0.5 })
  addNumberField(fieldsElement, controls, 'lineTolerance', 'Line tolerance', { min: 0, max: 20, step: 0.1 })
  addNumberField(fieldsElement, controls, 'minTouches', 'Min touches', { min: 2, max: 10, integer: true })
  addNumberField(fieldsElement, controls, 'lookbackBars', 'Lookback bars', { min: 30, max: 5000, integer: true })
  addNumberField(fieldsElement, controls, 'breakoutConfirmationBars', 'Breakout bars', { min: 1, max: 20, integer: true })
  addCheckboxField(fieldsElement, controls, 'trendEnabled', 'Auto trend lines')
  addCheckboxField(fieldsElement, controls, 'extendRight', 'Extend right')
  addCheckboxField(fieldsElement, controls, 'showResistance', 'Resistance line')
  addCheckboxField(fieldsElement, controls, 'showSupport', 'Support line')

  formElement.appendChild(fieldsElement)

  const actionsElement = document.createElement('div')
  actionsElement.className = 'rsi-settings-actions'

  const hintElement = document.createElement('span')
  hintElement.className = 'rsi-settings-hint'
  hintElement.textContent = 'Confirmed pivots only; no LLM and no future-bar repaint after pivot confirmation.'
  actionsElement.appendChild(hintElement)

  const applyButton = document.createElement('button')
  applyButton.type = 'submit'
  applyButton.className = 'indicator-icon-button'
  applyButton.title = 'Apply RSI settings'
  applyButton.setAttribute('aria-label', applyButton.title)
  applyButton.appendChild(createIcon('check'))
  actionsElement.appendChild(applyButton)
  formElement.appendChild(actionsElement)

  formElement.addEventListener('submit', event => {
    event.preventDefault()
    const nextState = readFormSettings(controls)
    if (nextState === null) {
      setStatus('Invalid RSI trend settings. Check limits and keep oversold below overbought.')
      return
    }
    Object.assign(state, nextState)
    if (state.visible && !createRsi()) {
      setStatus('Unable to update RSI pane.')
      return
    }
    saveState(state)
    settingsElement.open = false
    setStatus(`RSI ${state.period}; auto trend ${state.trendEnabled ? 'on' : 'off'}; pivots ${state.pivotLeft}/${state.pivotRight}.`)
    renderControl()
  })

  settingsElement.appendChild(formElement)
  itemElement.appendChild(settingsElement)

  const visibilityButton = document.createElement('button')
  visibilityButton.type = 'button'
  visibilityButton.className = 'indicator-icon-button'
  visibilityButton.title = state.visible ? 'Hide RSI' : 'Show RSI'
  visibilityButton.setAttribute('aria-label', visibilityButton.title)
  visibilityButton.appendChild(createIcon(state.visible ? 'eye' : 'eyeOff'))
  visibilityButton.addEventListener('click', () => setRsiVisible(!state.visible))
  itemElement.appendChild(visibilityButton)

  controlsElement.appendChild(itemElement)
}

if (state.visible && !createRsi()) {
  setStatus('Unable to create RSI pane.')
}
renderControl()
