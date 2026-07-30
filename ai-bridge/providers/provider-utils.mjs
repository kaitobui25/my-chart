import { spawnSync } from 'node:child_process'

export function commandExists (command) {
  const locator = process.platform === 'win32' ? 'where' : 'which'
  const result = spawnSync(locator, [command], { stdio: 'ignore', windowsHide: true })
  return result.status === 0
}

export function createProviderError (message, code = 'PROVIDER_ERROR') {
  const error = new Error(message)
  error.code = code
  return error
}
