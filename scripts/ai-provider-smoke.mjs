import { spawnSync } from 'node:child_process'

function exists (command) {
  const locator = process.platform === 'win32' ? 'where' : 'which'
  return spawnSync(locator, [command], { stdio: 'ignore', windowsHide: true }).status === 0
}

for (const provider of ['codex', 'gemini']) {
  console.log(`${provider}: ${exists(provider) ? 'found' : 'not found'}`)
}
console.log('Run "codex" once to sign in with ChatGPT. Run "gemini" once to complete the supported account authentication flow.')
