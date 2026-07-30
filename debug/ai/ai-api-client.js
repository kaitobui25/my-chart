const DEFAULT_BASE_URL = 'http://127.0.0.1:8788'

export class AiApiError extends Error {
  constructor (message, status = 0, code = 'AI_BRIDGE_ERROR') {
    super(message)
    this.name = 'AiApiError'
    this.status = status
    this.code = code
  }
}

export class AiApiClient {
  constructor (baseUrl = DEFAULT_BASE_URL) {
    this.baseUrl = baseUrl.replace(/\/$/, '')
  }

  async request (path, options = {}) {
    let response
    try {
      response = await fetch(`${this.baseUrl}${path}`, {
        ...options,
        headers: {
          'content-type': 'application/json',
          ...(options.headers ?? {})
        }
      })
    } catch (error) {
      throw new AiApiError(`AI bridge is offline: ${error.message}`, 0, 'BRIDGE_OFFLINE')
    }

    const payload = await response.json().catch(() => ({}))
    if (!response.ok) {
      throw new AiApiError(payload.error ?? `AI bridge request failed (${response.status}).`, response.status, payload.code)
    }
    return payload
  }

  health () {
    return this.request('/health')
  }

  providers () {
    return this.request('/providers')
  }

  codexOptions () {
    return this.request('/providers/codex/options')
  }

  codexStatus (payload = {}) {
    return this.request('/providers/codex/status', { method: 'POST', body: JSON.stringify(payload) })
  }

  chat (payload) {
    return this.request('/chat', { method: 'POST', body: JSON.stringify(payload) })
  }

  cancel (sessionKey) {
    return this.request('/chat/cancel', { method: 'POST', body: JSON.stringify({ sessionKey }) })
  }

  resetSession (sessionKey) {
    return this.request(`/sessions/${encodeURIComponent(sessionKey)}`, { method: 'DELETE' })
  }
}
