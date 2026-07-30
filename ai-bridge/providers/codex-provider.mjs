import { mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import { getModelResponseSchema, parseModelResponse } from '../response-schema.mjs'
import { commandExists, createProviderError, spawnCommand } from './provider-utils.mjs'
import { withCodexAppServer } from './codex-app-server-client.mjs'

export const CODEX_REASONING_EFFORTS = ['low', 'medium', 'high', 'xhigh']

function normalizeModelId (value) {
  if (value == null || value === '') return null
  const text = String(value).trim()
  return /^[A-Za-z0-9][A-Za-z0-9._:/-]{0,127}$/.test(text) ? text : null
}

function normalizeReasoningEffort (value) {
  const text = String(value ?? '').toLowerCase()
  return CODEX_REASONING_EFFORTS.includes(text) ? text : 'medium'
}

function reasoningValue (value) {
  if (typeof value === 'string') return value
  return value?.reasoningEffort ?? value?.effort ?? value?.value ?? value?.id ?? null
}

export function normalizeModelList (response) {
  const rows = Array.isArray(response?.data)
    ? response.data
    : Array.isArray(response?.models)
      ? response.models
      : []

  return rows.map(item => {
    const id = normalizeModelId(item?.id ?? item?.model ?? item?.slug)
    if (id === null) return null
    const efforts = (item?.supportedReasoningEfforts ?? item?.supported_reasoning_efforts ?? [])
      .map(reasoningValue)
      .map(value => String(value ?? '').toLowerCase())
      .filter(value => CODEX_REASONING_EFFORTS.includes(value))
    return {
      id,
      label: String(item?.displayName ?? item?.display_name ?? item?.name ?? id),
      defaultReasoningEffort: normalizeReasoningEffort(item?.defaultReasoningEffort ?? item?.default_reasoning_effort),
      supportedReasoningEfforts: efforts.length > 0 ? [...new Set(efforts)] : [...CODEX_REASONING_EFFORTS]
    }
  }).filter(Boolean)
}

function finiteOrNull (value) {
  const number = Number(value)
  return Number.isFinite(number) ? number : null
}

function normalizeRateLimitBucket (value, slot) {
  if (value == null || typeof value !== 'object') return null
  const usedPercent = finiteOrNull(value.usedPercent ?? value.used_percent)
  const windowDurationMins = finiteOrNull(value.windowDurationMins ?? value.window_duration_mins)
  const resetsAt = finiteOrNull(value.resetsAt ?? value.resets_at)
  return {
    slot,
    usedPercent,
    remainingPercent: usedPercent === null ? null : Math.max(0, 100 - usedPercent),
    windowDurationMins,
    resetsAt,
    limitId: value.limitId ?? value.limit_id ?? null
  }
}

export function normalizeAccountStatus ({ accountResponse, rateLimitsResponse, model, reasoningEffort }) {
  const account = accountResponse?.account ?? null
  const rateRoot = rateLimitsResponse?.rateLimits ?? rateLimitsResponse?.rate_limits ?? rateLimitsResponse ?? {}
  const resetRoot = rateLimitsResponse?.rateLimitResetCredits ?? rateLimitsResponse?.rate_limit_reset_credits ?? null

  return {
    account: account === null ? null : {
      type: account.type ?? null,
      email: account.email ?? null,
      planType: account.planType ?? account.plan_type ?? null
    },
    requiresOpenaiAuth: accountResponse?.requiresOpenaiAuth ?? accountResponse?.requires_openai_auth ?? null,
    selected: {
      model: normalizeModelId(model),
      reasoningEffort: normalizeReasoningEffort(reasoningEffort)
    },
    rateLimits: {
      primary: normalizeRateLimitBucket(rateRoot.primary, 'primary'),
      secondary: normalizeRateLimitBucket(rateRoot.secondary, 'secondary'),
      reachedType: rateRoot.rateLimitReachedType ?? rateRoot.rate_limit_reached_type ?? null,
      individualLimit: rateRoot.individualLimit ?? rateRoot.individual_limit ?? null,
      spendControlReached: rateRoot.spendControlReached ?? rateRoot.spend_control_reached ?? null
    },
    resetCredits: resetRoot === null ? null : {
      availableCount: finiteOrNull(resetRoot.availableCount ?? resetRoot.available_count) ?? 0,
      credits: Array.isArray(resetRoot.credits) ? resetRoot.credits : null
    }
  }
}

export class CodexProvider {
  id = 'codex'
  label = 'Codex (ChatGPT login)'
  capabilities = { images: true, structuredOutput: true, sessions: false, models: true, accountStatus: true }

  constructor ({ runtimeRoot }) {
    this.runtimeRoot = path.join(runtimeRoot, 'codex')
    this.modelCache = null
    this.modelCacheAt = 0
  }

  status () {
    const available = commandExists('codex')
    return {
      available,
      reason: available ? 'Codex CLI found in PATH.' : 'Install Codex CLI and sign in with ChatGPT.'
    }
  }

  async options () {
    if (!commandExists('codex')) throw createProviderError('Codex CLI was not found in PATH.', 'PROVIDER_UNAVAILABLE')
    const now = Date.now()
    if (this.modelCache !== null && now - this.modelCacheAt < 5 * 60 * 1000) {
      return { models: this.modelCache, reasoningEfforts: [...CODEX_REASONING_EFFORTS] }
    }

    await mkdir(this.runtimeRoot, { recursive: true })
    const models = await withCodexAppServer({ cwd: this.runtimeRoot }, async client => {
      return normalizeModelList(await client.request('model/list', { includeHidden: false }))
    })
    this.modelCache = models
    this.modelCacheAt = now
    return { models, reasoningEfforts: [...CODEX_REASONING_EFFORTS] }
  }

  async accountStatus ({ model, reasoningEffort }) {
    if (!commandExists('codex')) throw createProviderError('Codex CLI was not found in PATH.', 'PROVIDER_UNAVAILABLE')
    await mkdir(this.runtimeRoot, { recursive: true })
    return await withCodexAppServer({ cwd: this.runtimeRoot }, async client => {
      const accountResponse = await client.request('account/read', { refreshToken: false })
      const rateLimitsResponse = await client.request('account/rateLimits/read')
      return normalizeAccountStatus({ accountResponse, rateLimitsResponse, model, reasoningEffort })
    })
  }

  async chat ({ mode = 'chat', model, reasoningEffort, prompt, screenshotDataUrl, onCancel }) {
    if (!commandExists('codex')) throw createProviderError('Codex CLI was not found in PATH.', 'PROVIDER_UNAVAILABLE')
    await mkdir(this.runtimeRoot, { recursive: true })
    const requestDir = await mkdtemp(path.join(os.tmpdir(), 'my-chart-codex-'))
    const schemaPath = path.join(requestDir, 'response-schema.json')
    const outputPath = path.join(requestDir, 'final-response.json')
    const imagePath = path.join(requestDir, 'chart.png')
    await writeFile(schemaPath, JSON.stringify(getModelResponseSchema(mode)), 'utf8')

    const args = [
      'exec',
      '--skip-git-repo-check',
      '--sandbox', 'read-only',
      '--color', 'never',
      '-C', this.runtimeRoot,
      '--output-schema', schemaPath,
      '--output-last-message', outputPath
    ]

    const selectedModel = normalizeModelId(model)
    if (selectedModel !== null) args.push('--model', selectedModel)
    args.push('--config', `model_reasoning_effort="${normalizeReasoningEffort(reasoningEffort)}"`)

    if (typeof screenshotDataUrl === 'string' && screenshotDataUrl.startsWith('data:image/png;base64,')) {
      await writeFile(imagePath, Buffer.from(screenshotDataUrl.split(',')[1], 'base64'))
      args.push('--image', imagePath)
    }
    args.push('-')

    let child
    try {
      await new Promise((resolve, reject) => {
        child = spawnCommand('codex', args, {
          cwd: this.runtimeRoot,
          windowsHide: true,
          stdio: ['pipe', 'pipe', 'pipe']
        })
        onCancel?.(() => child.kill())

        let stderr = ''
        child.stderr.on('data', chunk => { stderr += String(chunk) })
        child.on('error', reject)
        child.on('exit', code => {
          if (code === 0) resolve()
          else reject(createProviderError(stderr.trim() || `Codex exited with code ${code}.`, 'CODEX_FAILED'))
        })
        child.stdin.end(prompt)
      })
      return parseModelResponse(await readFile(outputPath, 'utf8'), mode)
    } finally {
      await rm(requestDir, { recursive: true, force: true })
    }
  }
}
