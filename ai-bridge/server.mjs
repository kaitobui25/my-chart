import http from 'node:http'
import { mkdir } from 'node:fs/promises'
import { ALLOWED_ORIGINS, HOST, MAX_BODY_BYTES, PORT, REQUEST_TIMEOUT_MS, RUNTIME_ROOT } from './config.mjs'
import { buildPrompt } from './prompt-builder.mjs'
import { normalizeModelResponse } from './response-schema.mjs'
import { SessionManager } from './session-manager.mjs'
import { FakeProvider } from './providers/fake-provider.mjs'
import { CodexProvider } from './providers/codex-provider.mjs'
import { GeminiAcpProvider } from './providers/gemini-acp-provider.mjs'

await mkdir(RUNTIME_ROOT, { recursive: true })

const providers = new Map()
for (const provider of [
  new CodexProvider({ runtimeRoot: RUNTIME_ROOT }),
  new GeminiAcpProvider({ runtimeRoot: RUNTIME_ROOT }),
  new FakeProvider()
]) providers.set(provider.id, provider)

const sessions = new SessionManager()

function sendJson (response, status, payload, origin = null) {
  const headers = {
    'content-type': 'application/json; charset=utf-8',
    'cache-control': 'no-store'
  }
  if (origin !== null && ALLOWED_ORIGINS.has(origin)) {
    headers['access-control-allow-origin'] = origin
    headers.vary = 'origin'
  }
  response.writeHead(status, headers)
  response.end(JSON.stringify(payload))
}

async function readJson (request) {
  const chunks = []
  let size = 0
  for await (const chunk of request) {
    size += chunk.length
    if (size > MAX_BODY_BYTES) {
      const error = new Error('Request body is too large.')
      error.status = 413
      throw error
    }
    chunks.push(chunk)
  }
  if (chunks.length === 0) return {}
  try {
    return JSON.parse(Buffer.concat(chunks).toString('utf8'))
  } catch {
    const error = new Error('Request body must be valid JSON.')
    error.status = 400
    throw error
  }
}

function providerSummaries () {
  return [...providers.values()].map(provider => ({
    id: provider.id,
    label: provider.label,
    capabilities: provider.capabilities,
    ...provider.status()
  }))
}

function normalizeMode (value) {
  return value === 'analyze' ? 'analyze' : 'chat'
}

async function handleChat (request, response, origin) {
  const body = await readJson(request)
  const provider = providers.get(body.provider)
  if (provider === undefined) return sendJson(response, 400, { error: 'Unknown provider.', code: 'UNKNOWN_PROVIDER' }, origin)
  if (typeof body.sessionKey !== 'string' || !body.sessionKey.trim()) return sendJson(response, 400, { error: 'sessionKey is required.', code: 'INVALID_SESSION' }, origin)
  if (typeof body.message !== 'string' || !body.message.trim()) return sendJson(response, 400, { error: 'message is required.', code: 'INVALID_MESSAGE' }, origin)

  const status = provider.status()
  if (!status.available) return sendJson(response, 503, { error: status.reason, code: 'PROVIDER_UNAVAILABLE' }, origin)

  const mode = normalizeMode(body.mode)
  const prompt = buildPrompt({ mode, message: body.message, context: body.context })
  let timeout
  const timeoutPromise = new Promise((_, reject) => {
    timeout = setTimeout(() => {
      sessions.cancel(body.sessionKey)
      const error = new Error('Provider request timed out.')
      error.code = 'PROVIDER_TIMEOUT'
      reject(error)
    }, REQUEST_TIMEOUT_MS)
  })

  try {
    const result = await Promise.race([
      provider.chat({
        sessionKey: body.sessionKey,
        mode,
        model: body.model,
        reasoningEffort: body.reasoningEffort,
        prompt,
        context: body.context,
        screenshotDataUrl: body.screenshotDataUrl,
        onCancel: callback => sessions.beginRequest(body.sessionKey, callback)
      }),
      timeoutPromise
    ])
    sendJson(response, 200, { provider: provider.id, mode, ...normalizeModelResponse(result, mode) }, origin)
  } finally {
    clearTimeout(timeout)
    sessions.finishRequest(body.sessionKey)
  }
}

async function handleCodexOptions (response, origin) {
  const provider = providers.get('codex')
  const status = provider.status()
  if (!status.available) return sendJson(response, 503, { error: status.reason, code: 'PROVIDER_UNAVAILABLE' }, origin)
  return sendJson(response, 200, await provider.options(), origin)
}

async function handleCodexStatus (request, response, origin) {
  const provider = providers.get('codex')
  const status = provider.status()
  if (!status.available) return sendJson(response, 503, { error: status.reason, code: 'PROVIDER_UNAVAILABLE' }, origin)
  const body = await readJson(request)
  return sendJson(response, 200, await provider.accountStatus({
    model: body.model,
    reasoningEffort: body.reasoningEffort
  }), origin)
}

const server = http.createServer(async (request, response) => {
  const origin = request.headers.origin ?? null
  if (origin !== null && !ALLOWED_ORIGINS.has(origin)) {
    return sendJson(response, 403, { error: 'Origin is not allowed.', code: 'ORIGIN_DENIED' })
  }

  if (request.method === 'OPTIONS') {
    response.writeHead(204, {
      'access-control-allow-origin': origin ?? 'http://127.0.0.1:5173',
      'access-control-allow-methods': 'GET,POST,DELETE,OPTIONS',
      'access-control-allow-headers': 'content-type',
      'access-control-max-age': '600'
    })
    return response.end()
  }

  const url = new URL(request.url ?? '/', `http://${HOST}:${PORT}`)
  try {
    if (request.method === 'GET' && url.pathname === '/health') {
      return sendJson(response, 200, { ok: true, host: HOST, port: PORT }, origin)
    }
    if (request.method === 'GET' && url.pathname === '/providers') {
      return sendJson(response, 200, { providers: providerSummaries() }, origin)
    }
    if (request.method === 'GET' && url.pathname === '/providers/codex/options') {
      return await handleCodexOptions(response, origin)
    }
    if (request.method === 'POST' && url.pathname === '/providers/codex/status') {
      return await handleCodexStatus(request, response, origin)
    }
    if (request.method === 'POST' && url.pathname === '/chat') {
      return await handleChat(request, response, origin)
    }
    if (request.method === 'POST' && url.pathname === '/chat/cancel') {
      const body = await readJson(request)
      return sendJson(response, 200, { cancelled: sessions.cancel(body.sessionKey) }, origin)
    }
    if (request.method === 'DELETE' && url.pathname.startsWith('/sessions/')) {
      const sessionKey = decodeURIComponent(url.pathname.slice('/sessions/'.length))
      for (const provider of providers.values()) provider.resetSession?.(sessionKey)
      return sendJson(response, 200, { deleted: sessions.delete(sessionKey) }, origin)
    }
    return sendJson(response, 404, { error: 'Not found.', code: 'NOT_FOUND' }, origin)
  } catch (error) {
    const status = Number(error.status) || (error.code === 'PROVIDER_TIMEOUT' ? 504 : 500)
    return sendJson(response, status, { error: error.message, code: error.code ?? 'INTERNAL_ERROR' }, origin)
  }
})

server.on('error', error => {
  console.error(`AI bridge failed: ${error.message}`)
  process.exitCode = 1
})

server.listen(PORT, HOST, () => {
  console.log(`my-chart AI bridge listening on http://${HOST}:${PORT}`)
})
