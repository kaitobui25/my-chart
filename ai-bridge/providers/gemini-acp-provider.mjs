import { mkdir } from 'node:fs/promises'
import path from 'node:path'
import { parseModelResponse } from '../response-schema.mjs'
import { commandExists, createProviderError, spawnCommand } from './provider-utils.mjs'

class AcpConnection {
  constructor ({ cwd }) {
    this.cwd = cwd
    this.child = null
    this.nextId = 1
    this.pending = new Map()
    this.buffer = ''
    this.chunks = new Map()
    this.stderr = ''
  }

  async start () {
    this.child = spawnCommand('gemini', ['--acp'], {
      cwd: this.cwd,
      windowsHide: true,
      stdio: ['pipe', 'pipe', 'pipe']
    })
    this.child.stdout.on('data', chunk => this.consume(String(chunk)))
    this.child.stderr.on('data', chunk => { this.stderr += String(chunk) })
    this.child.on('exit', code => this.rejectAll(new Error(this.stderr.trim() || `Gemini ACP exited with code ${code}.`)))
    this.child.on('error', error => this.rejectAll(error))

    await this.request('initialize', {
      protocolVersion: 1,
      clientInfo: { name: 'my-chart', version: '1.0.0' },
      clientCapabilities: { fs: { readTextFile: false, writeTextFile: false } }
    })
  }

  consume (chunk) {
    this.buffer += chunk
    const lines = this.buffer.split(/\r?\n/)
    this.buffer = lines.pop() ?? ''
    for (const line of lines) {
      if (!line.trim().startsWith('{')) continue
      let message
      try { message = JSON.parse(line) } catch { continue }

      if (message.method === 'session/update') {
        const params = message.params ?? {}
        const update = params.update ?? params
        const type = update.sessionUpdate ?? update.type
        const text = update.content?.text ?? update.message?.text
        if (type === 'agent_message_chunk' && typeof text === 'string') {
          const sessionId = params.sessionId ?? update.sessionId
          this.chunks.set(sessionId, `${this.chunks.get(sessionId) ?? ''}${text}`)
        }
        continue
      }

      if (message.id !== undefined && this.pending.has(message.id)) {
        const pending = this.pending.get(message.id)
        this.pending.delete(message.id)
        if (message.error) pending.reject(createProviderError(message.error.message ?? 'Gemini ACP error.', 'GEMINI_ACP_ERROR'))
        else pending.resolve(message.result ?? {})
      }
    }
  }

  request (method, params = {}) {
    if (this.child === null || this.child.killed) return Promise.reject(new Error('Gemini ACP is not running.'))
    const id = this.nextId++
    const payload = { jsonrpc: '2.0', id, method, params }
    return new Promise((resolve, reject) => {
      this.pending.set(id, { resolve, reject })
      this.child.stdin.write(`${JSON.stringify(payload)}\n`)
    })
  }

  async createSession () {
    const response = await this.request('session/new', { cwd: this.cwd, mcpServers: [] })
    if (typeof response.sessionId !== 'string') throw new Error('Gemini ACP did not return a sessionId.')
    return response.sessionId
  }

  async prompt (sessionId, prompt) {
    this.chunks.set(sessionId, '')
    const result = await this.request('session/prompt', {
      sessionId,
      prompt: [{ type: 'text', text: prompt }]
    })
    const text = this.chunks.get(sessionId) ?? result.text ?? result.message ?? ''
    this.chunks.delete(sessionId)
    return text
  }

  cancel (sessionId) {
    return this.request('session/cancel', { sessionId }).catch(() => {})
  }

  close () {
    this.child?.kill()
    this.child = null
  }

  rejectAll (error) {
    for (const pending of this.pending.values()) pending.reject(error)
    this.pending.clear()
  }
}

export class GeminiAcpProvider {
  id = 'gemini'
  label = 'Gemini ACP'
  capabilities = { images: false, structuredOutput: false, sessions: true }

  constructor ({ runtimeRoot }) {
    this.runtimeRoot = path.join(runtimeRoot, 'gemini')
    this.connection = null
    this.sessions = new Map()
  }

  status () {
    const available = commandExists('gemini')
    return {
      available,
      reason: available ? 'Gemini CLI found in PATH; ACP availability depends on the account and CLI version.' : 'Gemini CLI was not found in PATH.'
    }
  }

  async ensureConnection () {
    if (this.connection !== null) return this.connection
    await mkdir(this.runtimeRoot, { recursive: true })
    const connection = new AcpConnection({ cwd: this.runtimeRoot })
    try {
      await connection.start()
      this.connection = connection
      return connection
    } catch (error) {
      connection.close()
      throw error
    }
  }

  async chat ({ sessionKey, prompt, onCancel }) {
    if (!commandExists('gemini')) throw createProviderError('Gemini CLI was not found in PATH.', 'PROVIDER_UNAVAILABLE')
    const connection = await this.ensureConnection()
    let sessionId = this.sessions.get(sessionKey)
    if (sessionId === undefined) {
      sessionId = await connection.createSession()
      this.sessions.set(sessionKey, sessionId)
    }
    onCancel?.(() => connection.cancel(sessionId))
    return parseModelResponse(await connection.prompt(sessionId, prompt))
  }

  resetSession (sessionKey) {
    this.sessions.delete(sessionKey)
  }
}
