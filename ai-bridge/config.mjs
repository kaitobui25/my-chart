import path from 'node:path'
import { fileURLToPath } from 'node:url'

const here = path.dirname(fileURLToPath(import.meta.url))

export const HOST = '127.0.0.1'
export const PORT = Number(process.env.MY_CHART_AI_PORT ?? 8788)
export const MAX_BODY_BYTES = 16 * 1024 * 1024
export const ALLOWED_ORIGINS = new Set([
  'http://127.0.0.1:5173',
  'http://localhost:5173'
])
export const RUNTIME_ROOT = path.resolve(here, '..', '.ai-runtime')
export const REQUEST_TIMEOUT_MS = Number(process.env.MY_CHART_AI_TIMEOUT_MS ?? 180000)
