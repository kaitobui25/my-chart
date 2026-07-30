import ChartImp from '../src/Chart.ts'
import { registerIndicator } from '../src/index.ts'

const RSI_INDICATOR_NAME = 'DEBUG_RSI'
const RSI_PANE_ID = 'debug_rsi_pane'
const RSI_STORAGE_KEY = 'klinecharts.debug.rsi.v1'
const DEFAULT_RSI_STATE = {
  visible: true,
  period: 14,
  overbought: 70,
  oversold: 30
}

const ICONS = {
  settings: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z"/><path d="M19.4 15a1.8 1.8 0 0 0 .36 1.98l.04.04a2.1 2.1 0 0 1-2.97 2.97l-.04-.04a1.8 1.8 0 0 0-1.98-.36 1.8 1.8 0 0 0-1.08 1.65V21.3a2.1 2.1 0 0 1-4.2 0v-.06a1.8 1.8 0 0 0-1.08-1.65 1.8 1.8 0 0 0-1.98.36l-.04.04a2.1 2.1 0 0 1-2.97-2.97l.04-.04A1.8 1.8 0 0 0 3.86 15a1.8 1.8 0 0 0-1.65-1.08h-.06a2.1 2.1 0 0 1 0-4.2h.06a1.8 1.8 0 0 0 1.65-1.08 1.8 1.8 0 0 0-.36-1.98l-.04-.04a2.1 2.1 0 0 1 2.97-2.97l.04.04a1.8 1.8 0 0 0 1.98.36 1.8 1.8 0 0 0 1.08-1.65v-.06a2.1 2.1 0 0 1 4.2 0v.06a1.8 1.8 0 0 0 1.08 1.65 1.8 1.8 0 0 0 1.98-.36l.04-.04a2.1 2.1 0 0 1 2.97 2.97l-.04.04a1.8 1.8 0 0 0-.36 1.98 1.8 1.8 0 0 0 1.65 1.08h.06a2.1 2.1 0 0 1 0 4.2h-.06A1.8 1.8 0 0 0 19.4 15Z"/></svg>',
  eye: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2.5 12s3.5-6.5 9.5-6.5 9.5 6.5 9.5 6.5-3.5 6.5-9.5 6.5S2.5 12 2.5 12Z"/><path d="M12 15.2a3.2 3.2 0 1 0 0-6.4 3.2 3.2 0 0 0 0 6.4Z"/></svg>',
  eyeOff: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 3l18 18"/><path d="M10.6 10.6a2.1 2.1 0 0 0 2.8 2.8"/><path d="M9.9 5.8A9.3 9.3 0 0 1 12 5.5c6 0 9.5 6.5 9.5 6.5a16.1 16.1 0 0 1-2.7 3.4"/><path d="M6.2 7.6A16 16 0 0 0 2.5 12s3.5 6.5 9.5 6.5a9.2 9.2 0 0 0 4.3-1.1"/></svg>',
  check: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m20 6-11 11-5-5"/></svg>'
}

function readState () {
  try {
    const value = JSON.parse(window.localStorage.getItem(RSI_STORAGE_KEY) ?? '{}')
    const period = Number(value.period)
    const overbought = Number(value.overbought)
    const oversold = Number(value.oversold)
    return {
      visible: typeof value.visible === 'boolean' ? value.visible : DEFAULT_RSI_STATE.visible,
      period: Number.isFinite(period) && period >= 2 ? Math.round(period) : DEFAULT_RSI_STATE.period,
      overbought: Number.isFinite(overbought) ? overbought : DEFAULT_RSI_STATE.overbought,
      oversold: Number.isFinite(oversold) ? oversold : DEFAULT_RSI_STATE.oversold
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

function calculateRsi (dataList, indicator) {
  const [period, overbought, oversold] = indicator.calcParams
  let gainSum = 0
  let lossSum = 0
  let averageGain
  let averageLoss

  return dataList.map((bar, index) => {
    const result = {
      overbought,
      midpoint: 50,
      oversold
    }

    if (index === 0) {
      return result
    }

    const change = bar.close - dataList[index - 1].close
    const gain = Math.max(change, 0)
    const loss = Math.max(-change, 0)

    if (index <= period) {
      gainSum += gain
      lossSum += loss
    }

    if (index < period) {
      return result
    }

    if (index === period) {
      averageGain = gainSum / period
      averageLoss = lossSum / period
    } else {
      averageGain = (averageGain * (period - 1) + gain) / period
      averageLoss = (averageLoss * (period - 1) + loss) / period
    }

    if (averageLoss === 0) {
      result.rsi = 100
    } else if (averageGain === 0) {
      result.rsi = 0
    } else {
      result.rsi = 100 - 100 / (1 + averageGain / averageLoss)
    }
    return result
  })
}

registerIndicator({
  name: RSI_INDICATOR_NAME,
  shortName: 'RSI',
  precision: 2,
  calcParams: [
    DEFAULT_RSI_STATE.period,
    DEFAULT_RSI_STATE.overbought,
    DEFAULT_RSI_STATE.oversold
  ],
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
    calcParams: [state.period, state.overbought, state.oversold]
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

function parseParams (text) {
  const params = text.split(',').map(item => Number(item.trim()))
  if (params.length !== 3 || params.some(item => !Number.isFinite(item))) {
    return null
  }
  const [rawPeriod, overbought, oversold] = params
  const period = Math.round(rawPeriod)
  if (period < 2 || period > 500 || oversold < 0 || overbought > 100 || oversold >= overbought) {
    return null
  }
  return { period, overbought, oversold }
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
  nameElement.textContent = 'RSI'
  itemElement.appendChild(nameElement)

  const settingsElement = document.createElement('details')
  settingsElement.className = 'indicator-settings'

  const summaryElement = document.createElement('summary')
  summaryElement.title = 'RSI settings'
  summaryElement.setAttribute('aria-label', 'RSI settings')
  summaryElement.appendChild(createIcon('settings'))
  settingsElement.appendChild(summaryElement)

  const formElement = document.createElement('form')
  formElement.className = 'indicator-settings-panel'

  const labelElement = document.createElement('label')
  labelElement.textContent = 'Period, OB, OS'

  const inputElement = document.createElement('input')
  inputElement.name = 'rsiParams'
  inputElement.value = `${state.period},${state.overbought},${state.oversold}`
  inputElement.placeholder = '14,70,30'
  inputElement.setAttribute('aria-label', 'RSI period, overbought, oversold')
  labelElement.appendChild(inputElement)
  formElement.appendChild(labelElement)

  const applyButton = document.createElement('button')
  applyButton.type = 'submit'
  applyButton.className = 'indicator-icon-button'
  applyButton.title = 'Apply RSI settings'
  applyButton.setAttribute('aria-label', 'Apply RSI settings')
  applyButton.appendChild(createIcon('check'))
  formElement.appendChild(applyButton)

  formElement.addEventListener('submit', event => {
    event.preventDefault()
    const params = parseParams(inputElement.value)
    if (params === null) {
      setStatus('Invalid RSI params. Use period, overbought, oversold; example 14,70,30.')
      return
    }
    Object.assign(state, params)
    if (state.visible && !createRsi()) {
      setStatus('Unable to update RSI pane.')
      return
    }
    saveState(state)
    settingsElement.open = false
    setStatus(`RSI updated: ${state.period}, ${state.overbought}/${state.oversold}.`)
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
