import { spawn } from 'node:child_process'
import { mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import { MODEL_RESPONSE_SCHEMA, parseModelResponse } from '../response-schema.mjs'
import { commandExists, createProviderError } from './provider-utils.mjs'

export class CodexProvider {
  id = 'codex'
  label = 'Codex (ChatGPT login)'
  capabilities = { images: true, structuredOutput: true, sessions: false }

  constructor ({ runtimeRoot }) {
    this.runtimeRoot = path.join(runtimeRoot, 'codex')
  }

  status () {
    const available = commandExists('codex')
    return {
      available,
      reason: available ? 'Codex CLI found in PATH.' : 'Install Codex CLI and sign in with ChatGPT.'
    }
  }

  async chat ({ prompt, screenshotDataUrl, onCancel }) {
    if (!commandExists('codex')) throw createProviderError('Codex CLI was not found in PATH.', 'PROVIDER_UNAVAILABLE')
    await mkdir(this.runtimeRoot, { recursive: true })
    const requestDir = await mkdtemp(path.join(os.tmpdir(), 'my-chart-codex-'))
    const schemaPath = path.join(requestDir, 'response-schema.json')
    const outputPath = path.join(requestDir, 'final-response.json')
    const imagePath = path.join(requestDir, 'chart.png')
    await writeFile(schemaPath, JSON.stringify(MODEL_RESPONSE_SCHEMA), 'utf8')

    const args = [
      'exec',
      '--skip-git-repo-check',
      '--sandbox', 'read-only',
      '--color', 'never',
      '-C', this.runtimeRoot,
      '--output-schema', schemaPath,
      '--output-last-message', outputPath
    ]

    if (typeof screenshotDataUrl === 'string' && screenshotDataUrl.startsWith('data:image/png;base64,')) {
      await writeFile(imagePath, Buffer.from(screenshotDataUrl.split(',')[1], 'base64'))
      args.push('--image', imagePath)
    }
    args.push('-')

    let child
    try {
      const result = await new Promise((resolve, reject) => {
        child = spawn('codex', args, {
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
      void result
      return parseModelResponse(await readFile(outputPath, 'utf8'))
    } finally {
      await rm(requestDir, { recursive: true, force: true })
    }
  }
}
