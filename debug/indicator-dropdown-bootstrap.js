const RSI_INDICATOR_NAME = 'DEBUG_RSI'
const RSI_CONTROL_ID = 'rsi-indicator-control'
const RSI_ENABLED_STORAGE_KEY = 'klinecharts.debug.rsi.enabled.v1'

let rsiEnabled = readRsiEnabled()
let rsiControl = null
let syncScheduled = false

function readRsiEnabled () {
  try {
    const stored = window.localStorage.getItem(RSI_ENABLED_STORAGE_KEY)
    return stored === null ? true : stored === 'true'
  } catch {
    return true
  }
}

function saveRsiEnabled () {
  try {
    window.localStorage.setItem(RSI_ENABLED_STORAGE_KEY, String(rsiEnabled))
  } catch {}
}

function scheduleSync () {
  if (syncScheduled) return
  syncScheduled = true
  window.queueMicrotask(() => {
    syncScheduled = false
    syncRsiIndicatorUi()
  })
}

function getRsiControl () {
  const liveControl = document.getElementById(RSI_CONTROL_ID)
  if (liveControl !== null) {
    rsiControl = liveControl
  }
  return rsiControl
}

function ensureRemoveButton (control) {
  if (control.querySelector('.rsi-remove-button') !== null) return

  const button = document.createElement('button')
  button.type = 'button'
  button.className = 'indicator-icon-button rsi-remove-button'
  button.dataset.action = 'remove'
  button.title = 'Remove RSI Auto TL'
  button.setAttribute('aria-label', 'Remove RSI Auto TL')
  button.textContent = '×'
  button.addEventListener('click', event => {
    event.preventDefault()
    event.stopPropagation()
    setRsiEnabled(false)
  })
  control.appendChild(button)
}

function syncRestoreDropdown (select) {
  let option = Array.from(select.options).find(item => item.value === RSI_INDICATOR_NAME) ?? null

  if (rsiEnabled) {
    option?.remove()
  } else if (option === null) {
    option = document.createElement('option')
    option.value = RSI_INDICATOR_NAME
    option.textContent = 'RSI Auto TL'
    select.appendChild(option)
  }

  if (select.value === RSI_INDICATOR_NAME) {
    select.value = ''
  }
  select.disabled = select.options.length === 1
}

function syncRsiIndicatorUi () {
  const indicatorList = document.getElementById('indicator-list')
  const restoreSelect = document.getElementById('restore-indicator-select')
  if (indicatorList === null || restoreSelect === null) return

  const control = getRsiControl()
  if (control !== null) {
    ensureRemoveButton(control)
    control.hidden = !rsiEnabled
    if (rsiEnabled && control.parentElement !== indicatorList) {
      indicatorList.appendChild(control)
    }
  }

  syncRestoreDropdown(restoreSelect)
}

function setRsiEnabled (enabled) {
  if (rsiEnabled === enabled) {
    scheduleSync()
    return
  }

  rsiEnabled = enabled
  saveRsiEnabled()

  const control = getRsiControl()
  const visibilityButton = control?.querySelector('.rsi-visibility-button')
  const indicatorIsVisible = control !== null && !control.classList.contains('hidden')

  if (visibilityButton !== null && visibilityButton !== undefined) {
    if ((enabled && !indicatorIsVisible) || (!enabled && indicatorIsVisible)) {
      visibilityButton.click()
    }
  }

  scheduleSync()
}

function bindRestoreDropdown () {
  const restoreSelect = document.getElementById('restore-indicator-select')
  if (restoreSelect === null || restoreSelect.dataset.rsiDropdownBound === 'true') return

  restoreSelect.dataset.rsiDropdownBound = 'true'
  restoreSelect.addEventListener('change', event => {
    if (event.target?.value !== RSI_INDICATOR_NAME) return

    event.stopImmediatePropagation()
    setRsiEnabled(true)
    event.target.value = ''
  }, true)
}

function startRsiIndicatorIntegration () {
  const indicatorControls = document.getElementById('indicator-controls')
  if (indicatorControls === null) {
    window.requestAnimationFrame(startRsiIndicatorIntegration)
    return
  }

  bindRestoreDropdown()
  syncRsiIndicatorUi()

  const observer = new MutationObserver(() => {
    bindRestoreDropdown()
    scheduleSync()
  })
  observer.observe(indicatorControls, { childList: true, subtree: true })
}

startRsiIndicatorIntegration()
