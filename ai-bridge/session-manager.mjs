export class SessionManager {
  constructor () {
    this.sessions = new Map()
    this.activeRequests = new Map()
  }

  get (sessionKey) {
    return this.sessions.get(sessionKey) ?? null
  }

  set (sessionKey, value) {
    this.sessions.set(sessionKey, value)
    return value
  }

  delete (sessionKey) {
    this.cancel(sessionKey)
    return this.sessions.delete(sessionKey)
  }

  beginRequest (sessionKey, cancel) {
    this.cancel(sessionKey)
    this.activeRequests.set(sessionKey, { cancel })
  }

  finishRequest (sessionKey) {
    this.activeRequests.delete(sessionKey)
  }

  cancel (sessionKey) {
    const active = this.activeRequests.get(sessionKey)
    if (active === undefined) return false
    try {
      active.cancel?.()
    } finally {
      this.activeRequests.delete(sessionKey)
    }
    return true
  }
}
