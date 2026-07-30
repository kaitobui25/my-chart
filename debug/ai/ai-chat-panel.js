import { AiApiClient } from './ai-api-client.js'
import { createEvaluationStore } from './evaluation-store.js'

const STORAGE_KEY = 'my-chart.ai.panel.v2'
const REASONING_EFFORTS = ['low', 'medium', 'high', 'xhigh']

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

function buildSessionKey (state, context) {
  const model = state.provider === 'codex' ? state.model || 'default' : 'default'
  const effort = state.provider === 'codex' ? state.reasoningEffort : 'default'
  return `${state.provider}:${model}:${effort}:${state.mode}:${context.symbol}:${context.timeframe}:${state.nonce}`
}

function formatResetTime (timestamp) {
  if (!Number.isFinite(timestamp)) return 'không rõ'
  return new Date(timestamp * 1000).toLocaleString()
}

function formatWindowName (bucket) {
  const minutes = bucket?.windowDurationMins
  if (minutes === 300) return '5 giờ'
  if (minutes === 10080) return 'Tuần'
  if (Number.isFinite(minutes)) {
    if (minutes % 1440 === 0) return `${minutes / 1440} ngày`
    if (minutes % 60 === 0) return `${minutes / 60} giờ`
    return `${minutes} phút`
  }
  return bucket?.slot === 'secondary' ? 'Giới hạn phụ' : 'Giới hạn chính'
}

function formatRateLimit (bucket) {
  if (bucket === null || typeof bucket !== 'object') return null
  const used = Number.isFinite(bucket.usedPercent) ? `${bucket.usedPercent}% đã dùng` : 'mức dùng không rõ'
  const remaining = Number.isFinite(bucket.remainingPercent) ? `còn ${bucket.remainingPercent}%` : null
  const reset = Number.isFinite(bucket.resetsAt) ? `reset ${formatResetTime(bucket.resetsAt)}` : null
  return `${formatWindowName(bucket)}: ${[used, remaining, reset].filter(Boolean).join(' · ')}`
}

function formatCodexStatus (payload) {
  const lines = ['Codex status']
  const account = payload?.account
  if (account !== null && typeof account === 'object') {
    const identity = account.email || account.type || 'đã đăng nhập'
    lines.push(`Tài khoản: ${identity}${account.planType ? ` · ${account.planType}` : ''}`)
  } else {
    lines.push('Tài khoản: không có thông tin đăng nhập')
  }

  lines.push(`Model: ${payload?.selected?.model || 'Default của Codex'}`)
  lines.push(`Reasoning: ${payload?.selected?.reasoningEffort || 'medium'}`)

  const buckets = [payload?.rateLimits?.primary, payload?.rateLimits?.secondary]
    .map(formatRateLimit)
    .filter(Boolean)
  lines.push(...(buckets.length > 0 ? buckets : ['Quota: Codex không trả về cửa sổ quota nào.']))

  if (payload?.rateLimits?.reachedType) lines.push(`Limit reached: ${payload.rateLimits.reachedType}`)
  if (payload?.rateLimits?.spendControlReached === true) lines.push('Spend control: đã chạm giới hạn')
  if (payload?.resetCredits !== null && payload?.resetCredits !== undefined) {
    lines.push(`Reset credits: ${payload.resetCredits.availableCount ?? 0}`)
  }
  return lines.join('\n')
}

export function mountAiChatPanel ({ contextApi, tradePlanOverlay }) {
  const root = document.getElementById('root')
  if (root === null) return

  const saved = readState()
  const state = {
    open: saved.open !== false,
    provider: typeof saved.provider === 'string' ? saved.provider : 'codex',
    mode: saved.mode === 'analyze' ? 'analyze' : 'chat',
    model: typeof saved.model === 'string' ? saved.model : '',
    reasoningEffort: REASONING_EFFORTS.includes(saved.reasoningEffort) ? saved.reasoningEffort : 'medium',
    nonce: Number.isInteger(saved.nonce) ? saved.nonce : 1,
    busy: false,
    sessionKey: null,
    codexOptionsLoaded: false
  }

  const shell = createElement('div', 'ai-app-shell')
  root.before(shell)
  shell.appendChild(root)

  const panel = createElement('aside', 'ai-chat-panel')
  panel.innerHTML = `
    <header class="ai-panel-header">
      <div>
        <strong>AI Chart Assistant</strong>
        <div id="ai-connection-status" class="ai-connection-status">Checking bridge…</div>
      </div>
      <button id="ai-panel-close" type="button" aria-label="Close AI panel">×</button>
    </header>
    <div class="ai-panel-toolbar ai-panel-toolbar-main">
      <label>Provider
        <select id="ai-provider-select">
          <option value="codex">Codex</option>
          <option value="gemini">Gemini</option>
          <option value="fake">Offline test</option>
        </select>
      </label>
      <label>Mode
        <select id="ai-mode-select">
          <option value="chat">Chat bình thường</option>
          <option value="analyze">Phân tích lệnh</option>
        </select>
      </label>
    </div>
    <div id="ai-codex-settings" class="ai-panel-toolbar ai-codex-settings">
      <label>Codex model
        <select id="ai-model-select">
          <option value="">Default</option>
        </select>
      </label>
      <label>Reasoning
        <select id="ai-reasoning-select">
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
          <option value="xhigh">Extra high</option>
        </select>
      </label>
    </div>
    <div class="ai-panel-actions">
      <button id="ai-new-session" type="button">New</button>
      <button id="ai-clear-plan" type="button">Clear plan</button>
      <button id="ai-export-eval" type="button">Export eval</button>
    </div>
    <div id="ai-context-badge" class="ai-context-badge">No context</div>
    <div id="ai-messages" class="ai-messages" aria-live="polite"></div>
    <form id="ai-chat-form" class="ai-chat-form">
      <textarea id="ai-chat-input" rows="3" placeholder="Hỏi về chart…"></textarea>
      <div class="ai-composer-actions">
        <button id="ai-cancel" type="button" disabled>Cancel</button>
        <button id="ai-send" type="submit">Send</button>
      </div>
    </form>
    <div class="ai-input-hint">Enter để gửi · Shift+Enter để xuống hàng · /status để xem quota Codex</div>
    <div class="ai-disclaimer">Analysis only. No exchange order is sent.</div>
  `
  shell.appendChild(panel)

  const toggleButton = createElement('button', 'ai-panel-toggle', 'AI')
  toggleButton.type = 'button'
  document.getElementById('toolbar')?.appendChild(toggleButton)

  const providerSelect = panel.querySelector('#ai-provider-select')
  const modeSelect = panel.querySelector('#ai-mode-select')
  const modelSelect = panel.querySelector('#ai-model-select')
  const reasoningSelect = panel.querySelector('#ai-reasoning-select')
  const codexSettings = panel.querySelector('#ai-codex-settings')
  const status = panel.querySelector('#ai-connection-status')
  const badge = panel.querySelector('#ai-context-badge')
  const messages = panel.querySelector('#ai-messages')
  const input = panel.querySelector('#ai-chat-input')
  const sendButton = panel.querySelector('#ai-send')
  const cancelButton = panel.querySelector('#ai-cancel')
  const form = panel.querySelector('#ai-chat-form')
  const client = new AiApiClient()
  const evaluationStore = createEvaluationStore()

  providerSelect.value = state.provider
  modeSelect.value = state.mode
  reasoningSelect.value = state.reasoningEffort

  function persist () {
    writeState({
      open: state.open,
      provider: state.provider,
      mode: state.mode,
      model: state.model,
      reasoningEffort: state.reasoningEffort,
      nonce: state.nonce
    })
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
    providerSelect.disabled = busy
    modeSelect.disabled = busy
    modelSelect.disabled = busy
    reasoningSelect.disabled = busy
    cancelButton.disabled = !busy
  }

  function syncModeUi () {
    const analyze = state.mode === 'analyze'
    sendButton.textContent = analyze ? 'Analyze' : 'Send'
    input.placeholder = analyze
      ? 'Mô tả yêu cầu phân tích lệnh…'
      : 'Hỏi tự nhiên về chart…'
    panel.classList.toggle('ai-trade-analysis-mode', analyze)
    if (!analyze) tradePlanOverlay.clear()
  }

  function syncProviderUi () {
    const codex = state.provider === 'codex'
    codexSettings.hidden = !codex
    if (codex) loadCodexOptions()
  }

  function refreshBadge () {
    const context = contextApi.getContext()
    evaluationStore.update(context)
    badge.textContent = `${context.symbol} · ${context.timeframe} · ${context.candleMode} · ${context.candleCount} candles${context.replay.active ? ' · REPLAY' : ''} · ${evaluationStore.count()} eval`
    return context
  }

  async function loadCodexOptions () {
    if (state.codexOptionsLoaded) return
    try {
      const options = await client.codexOptions()
      const models = Array.isArray(options.models) ? options.models : []
      modelSelect.replaceChildren(new Option('Default', ''))
      models.forEach(model => modelSelect.add(new Option(model.label || model.id, model.id)))
      if (state.model && !models.some(model => model.id === state.model)) {
        modelSelect.add(new Option(`${state.model} (saved)`, state.model))
      }
      modelSelect.value = state.model
      state.codexOptionsLoaded = true
    } catch (error) {
      status.textContent = `Codex options: ${error.message}`
      status.classList.add('error')
    }
  }

  async function refreshHealth () {
    try {
      const [health, providers] = await Promise.all([client.health(), client.providers()])
      const selected = providers.providers?.find(item => item.id === state.provider)
      const codexSuffix = state.provider === 'codex'
        ? ` · ${state.model || 'default'} · ${state.reasoningEffort}`
        : ''
      status.textContent = selected?.available
        ? `Connected · ${selected.label}${codexSuffix}`
        : `Bridge online · ${selected?.reason ?? 'provider unavailable'}`
      status.classList.toggle('error', !health.ok || selected?.available === false)
    } catch (error) {
      status.textContent = error.message
      status.classList.add('error')
    }
  }

  async function showCodexStatus (message) {
    appendMessage(messages, 'user', message)
    input.value = ''
    setBusy(true)
    try {
      const result = await client.codexStatus({
        model: state.model || null,
        reasoningEffort: state.reasoningEffort
      })
      appendMessage(messages, 'assistant', formatCodexStatus(result))
    } catch (error) {
      appendMessage(messages, 'assistant', `Error: ${error.message}`)
    } finally {
      setBusy(false)
      refreshHealth()
    }
  }

  async function submitMessage (message) {
    const trimmed = message.trim()
    if (!trimmed || state.busy) return

    if (state.provider === 'codex' && trimmed.toLowerCase() === '/status') {
      return await showCodexStatus(trimmed)
    }

    const context = refreshBadge()
    state.sessionKey = buildSessionKey(state, context)
    appendMessage(messages, 'user', trimmed)
    input.value = ''
    setBusy(true)

    try {
      const response = await client.chat({
        provider: state.provider,
        sessionKey: state.sessionKey,
        mode: state.mode,
        model: state.provider === 'codex' ? state.model || null : null,
        reasoningEffort: state.provider === 'codex' ? state.reasoningEffort : null,
        message: trimmed,
        context,
        screenshotDataUrl: contextApi.captureScreenshot()
      })
      const tradePlan = state.mode === 'analyze' ? response.tradePlan : null
      appendMessage(messages, 'assistant', response.message ?? 'No response text.', tradePlan)

      if (state.mode === 'analyze' && tradePlan !== null) {
        evaluationStore.record({ provider: response.provider, mode: state.mode, context, tradePlan })
        refreshBadge()
        if (tradePlan.decision === 'LONG' || tradePlan.decision === 'SHORT') {
          tradePlanOverlay.render({ ...tradePlan, provider: response.provider })
        } else {
          tradePlanOverlay.clear()
        }
      }
    } catch (error) {
      appendMessage(messages, 'assistant', `Error: ${error.message}`)
    } finally {
      setBusy(false)
      refreshHealth()
    }
  }

  function resetSessionForSettingsChange () {
    state.nonce += 1
    state.sessionKey = null
    persist()
  }

  toggleButton.addEventListener('click', () => setOpen(!state.open))
  panel.querySelector('#ai-panel-close').addEventListener('click', () => setOpen(false))
  panel.querySelector('#ai-clear-plan').addEventListener('click', () => tradePlanOverlay.clear())
  panel.querySelector('#ai-export-eval').addEventListener('click', () => evaluationStore.exportJson())
  panel.querySelector('#ai-new-session').addEventListener('click', async () => {
    const previousKey = state.sessionKey
    resetSessionForSettingsChange()
    if (previousKey) await client.resetSession(previousKey).catch(() => {})
    appendMessage(messages, 'assistant', 'Started a new AI session for this chart.')
  })

  providerSelect.addEventListener('change', () => {
    state.provider = providerSelect.value
    resetSessionForSettingsChange()
    syncProviderUi()
    refreshHealth()
  })
  modeSelect.addEventListener('change', () => {
    state.mode = modeSelect.value === 'analyze' ? 'analyze' : 'chat'
    resetSessionForSettingsChange()
    syncModeUi()
  })
  modelSelect.addEventListener('change', () => {
    state.model = modelSelect.value
    resetSessionForSettingsChange()
    refreshHealth()
  })
  reasoningSelect.addEventListener('change', () => {
    state.reasoningEffort = REASONING_EFFORTS.includes(reasoningSelect.value) ? reasoningSelect.value : 'medium'
    resetSessionForSettingsChange()
    refreshHealth()
  })

  form.addEventListener('submit', event => {
    event.preventDefault()
    submitMessage(input.value)
  })
  input.addEventListener('keydown', event => {
    if (event.key === 'Enter' && !event.shiftKey && !event.isComposing) {
      event.preventDefault()
      form.requestSubmit()
    }
  })
  cancelButton.addEventListener('click', async () => {
    if (!state.sessionKey) return
    await client.cancel(state.sessionKey).catch(() => {})
  })

  const observer = new MutationObserver(refreshBadge)
  observer.observe(document.getElementById('toolbar') ?? root, { subtree: true, attributes: true, attributeFilter: ['class', 'hidden'] })

  setOpen(state.open)
  syncProviderUi()
  syncModeUi()
  refreshBadge()
  refreshHealth()
  appendMessage(messages, 'assistant', 'Sẵn sàng. Chat bình thường sẽ trả lời tự nhiên dựa trên chart; chỉ chế độ Phân tích lệnh mới tạo WAIT/LONG/SHORT và entry/SL/TP.')
}
