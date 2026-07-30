import { AiApiClient } from './ai-api-client.js'
import { createEvaluationStore } from './evaluation-store.js'

const STORAGE_KEY = 'my-chart.ai.panel.v1'

function readState () {
  try {
    const value = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{}')
    return typeof value === 'object' && value !== null ? value : {}
  } catch {
    return {}
  }
}

function writeState (state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {}
}

function createElement (tag, className, text = '') {
  const element = document.createElement(tag)
  if (className) element.className = className
  if (text) element.textContent = text
  return element
}

function formatPlan (plan) {
  if (plan === null || typeof plan !== 'object') return ''
  const parts = [`${plan.decision ?? 'WAIT'} · ${plan.marketRegime ?? 'unknown'} · ${plan.confidence ?? 0}%`]
  if (plan.entryZone?.from != null && plan.entryZone?.to != null) parts.push(`Entry ${plan.entryZone.from}–${plan.entryZone.to}`)
  if (plan.stopLoss != null) parts.push(`SL ${plan.stopLoss}`)
  if (Array.isArray(plan.targets) && plan.targets.length > 0) parts.push(`TP ${plan.targets.join(', ')}`)
  if (plan.riskReward != null) parts.push(`RR ${plan.riskReward}`)
  if (plan.invalidation) parts.push(`Invalidation: ${plan.invalidation}`)
  return parts.join('\n')
}

function appendMessage (messages, role, text, plan = null) {
  const item = createElement('article', `ai-message ai-message-${role}`)
  const label = createElement('div', 'ai-message-role', role === 'user' ? 'You' : 'AI')
  const body = createElement('div', 'ai-message-body', text)
  item.append(label, body)

  const planText = formatPlan(plan)
  if (planText) item.appendChild(createElement('pre', 'ai-plan-summary', planText))

  messages.appendChild(item)
  messages.scrollTop = messages.scrollHeight
}

function buildSessionKey (provider, context, nonce) {
  return `${provider}:${context.symbol}:${context.timeframe}:${nonce}`
}

export function mountAiChatPanel ({ contextApi, tradePlanOverlay }) {
  const root = document.getElementById('root')
  if (root === null) return

  const saved = readState()
  const state = {
    open: saved.open !== false,
    provider: typeof saved.provider === 'string' ? saved.provider : 'codex',
    nonce: Number.isInteger(saved.nonce) ? saved.nonce : 1,
    busy: false,
    sessionKey: null
  }

  const shell = createElement('div', 'ai-app-shell')
  root.before(shell)
  shell.appendChild(root)

  const panel = createElement('aside', 'ai-chat-panel')
  panel.innerHTML = `
    <header class="ai-panel-header">
      <div>
        <strong>AI Trading Assistant</strong>
        <div id="ai-connection-status" class="ai-connection-status">Checking bridge…</div>
      </div>
      <button id="ai-panel-close" type="button" aria-label="Close AI panel">×</button>
    </header>
    <div class="ai-panel-toolbar">
      <label>Provider
        <select id="ai-provider-select">
          <option value="codex">Codex</option>
          <option value="gemini">Gemini</option>
          <option value="fake">Offline test</option>
        </select>
      </label>
      <button id="ai-new-session" type="button">New</button>
      <button id="ai-clear-plan" type="button">Clear plan</button>
      <button id="ai-export-eval" type="button">Export eval</button>
    </div>
    <div id="ai-context-badge" class="ai-context-badge">No context</div>
    <div id="ai-messages" class="ai-messages" aria-live="polite"></div>
    <div class="ai-quick-actions">
      <button id="ai-analyze" type="button">Analyze current chart</button>
      <button id="ai-cancel" type="button" disabled>Cancel</button>
    </div>
    <form id="ai-chat-form" class="ai-chat-form">
      <textarea id="ai-chat-input" rows="3" placeholder="Ask about the chart…"></textarea>
      <button id="ai-send" type="submit">Send</button>
    </form>
    <div class="ai-disclaimer">Analysis only. No exchange order is sent.</div>
  `
  shell.appendChild(panel)

  const toggleButton = createElement('button', 'ai-panel-toggle', 'AI')
  toggleButton.type = 'button'
  document.getElementById('toolbar')?.appendChild(toggleButton)

  const providerSelect = panel.querySelector('#ai-provider-select')
  const status = panel.querySelector('#ai-connection-status')
  const badge = panel.querySelector('#ai-context-badge')
  const messages = panel.querySelector('#ai-messages')
  const input = panel.querySelector('#ai-chat-input')
  const sendButton = panel.querySelector('#ai-send')
  const analyzeButton = panel.querySelector('#ai-analyze')
  const cancelButton = panel.querySelector('#ai-cancel')
  const client = new AiApiClient()
  const evaluationStore = createEvaluationStore()

  providerSelect.value = state.provider

  function persist () {
    writeState({ open: state.open, provider: state.provider, nonce: state.nonce })
  }

  function setOpen (open) {
    state.open = open
    shell.classList.toggle('ai-panel-closed', !open)
    toggleButton.classList.toggle('active', open)
    persist()
  }

  function setBusy (busy) {
    state.busy = busy
    input.disabled = busy
    sendButton.disabled = busy
    analyzeButton.disabled = busy
    providerSelect.disabled = busy
    cancelButton.disabled = !busy
  }

  function refreshBadge () {
    const context = contextApi.getContext()
    evaluationStore.update(context)
    badge.textContent = `${context.symbol} · ${context.timeframe} · ${context.candleMode} · ${context.candleCount} candles${context.replay.active ? ' · REPLAY' : ''} · ${evaluationStore.count()} eval`
    return context
  }

  async function refreshHealth () {
    try {
      const [health, providers] = await Promise.all([client.health(), client.providers()])
      const selected = providers.providers?.find(item => item.id === state.provider)
      status.textContent = selected?.available
        ? `Connected · ${selected.label}`
        : `Bridge online · ${selected?.reason ?? 'provider unavailable'}`
      status.classList.toggle('error', !health.ok || selected?.available === false)
    } catch (error) {
      status.textContent = error.message
      status.classList.add('error')
    }
  }

  async function submitMessage (message, mode = 'chat') {
    const trimmed = message.trim()
    if (!trimmed || state.busy) return

    const context = refreshBadge()
    state.sessionKey = buildSessionKey(state.provider, context, state.nonce)
    appendMessage(messages, 'user', trimmed)
    input.value = ''
    setBusy(true)

    try {
      const response = await client.chat({
        provider: state.provider,
        sessionKey: state.sessionKey,
        mode,
        message: trimmed,
        context,
        screenshotDataUrl: contextApi.captureScreenshot()
      })
      appendMessage(messages, 'assistant', response.message ?? 'No response text.', response.tradePlan)
      if (mode === 'analyze' && response.tradePlan !== null) {
        evaluationStore.record({ provider: response.provider, mode, context, tradePlan: response.tradePlan })
        refreshBadge()
      }
      if (response.tradePlan?.decision === 'LONG' || response.tradePlan?.decision === 'SHORT') {
        tradePlanOverlay.render({ ...response.tradePlan, provider: response.provider })
      } else {
        tradePlanOverlay.clear()
      }
    } catch (error) {
      appendMessage(messages, 'assistant', `Error: ${error.message}`)
    } finally {
      setBusy(false)
      refreshHealth()
    }
  }

  toggleButton.addEventListener('click', () => setOpen(!state.open))
  panel.querySelector('#ai-panel-close').addEventListener('click', () => setOpen(false))
  panel.querySelector('#ai-clear-plan').addEventListener('click', () => tradePlanOverlay.clear())
  panel.querySelector('#ai-export-eval').addEventListener('click', () => evaluationStore.exportJson())
  panel.querySelector('#ai-new-session').addEventListener('click', async () => {
    const previousKey = state.sessionKey
    state.nonce += 1
    state.sessionKey = null
    persist()
    if (previousKey) await client.resetSession(previousKey).catch(() => {})
    appendMessage(messages, 'assistant', 'Started a new AI session for this chart.')
  })
  providerSelect.addEventListener('change', () => {
    state.provider = providerSelect.value
    state.nonce += 1
    state.sessionKey = null
    persist()
    refreshHealth()
  })
  panel.querySelector('#ai-chat-form').addEventListener('submit', event => {
    event.preventDefault()
    submitMessage(input.value, 'chat')
  })
  analyzeButton.addEventListener('click', () => submitMessage('Analyze the current chart and return a trade plan only when the setup is clear.', 'analyze'))
  cancelButton.addEventListener('click', async () => {
    if (!state.sessionKey) return
    await client.cancel(state.sessionKey).catch(() => {})
  })

  const observer = new MutationObserver(refreshBadge)
  observer.observe(document.getElementById('toolbar') ?? root, { subtree: true, attributes: true, attributeFilter: ['class', 'hidden'] })

  setOpen(state.open)
  refreshBadge()
  refreshHealth()
  appendMessage(messages, 'assistant', 'Ready. I will use exact chart data first and the screenshot as visual context.')
}
