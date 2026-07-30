import test from 'node:test'
import assert from 'node:assert/strict'
import { mkdtemp, rm, writeFile } from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import { buildWindowsCommand, commandExists, resolveCommand, spawnCommand } from '../providers/provider-utils.mjs'

test('resolves a command available in PATH', () => {
  assert.equal(commandExists('node'), true)
  assert.equal(typeof resolveCommand('node'), 'string')
})

test('builds a quoted cmd.exe command for npm shims on Windows', () => {
  assert.equal(
    buildWindowsCommand('C:\\Program Files\\nodejs\\codex.cmd', ['exec', '--output-schema', 'C:\\Temp Folder\\schema.json', '-']),
    '""C:\\Program Files\\nodejs\\codex.cmd" "exec" "--output-schema" "C:\\Temp Folder\\schema.json" "-""'
  )
})

test('executes a Windows cmd shim without double-escaping quotes', {
  skip: process.platform !== 'win32'
}, async () => {
  const directory = await mkdtemp(path.join(os.tmpdir(), 'my chart cmd-'))
  const shimPath = path.join(directory, 'my-chart-test-shim.cmd')
  const originalPath = process.env.PATH

  try {
    await writeFile(shimPath, '@echo off\r\necho %~1^|%~2\r\n', 'utf8')
    process.env.PATH = `${directory};${originalPath ?? ''}`

    const child = spawnCommand('my-chart-test-shim', [
      'hello world',
      'C:\\Temp Folder\\schema.json'
    ], {
      windowsHide: true,
      stdio: ['ignore', 'pipe', 'pipe']
    })

    let stdout = ''
    let stderr = ''
    child.stdout.on('data', chunk => { stdout += String(chunk) })
    child.stderr.on('data', chunk => { stderr += String(chunk) })

    const exitCode = await new Promise((resolve, reject) => {
      child.on('error', reject)
      child.on('exit', resolve)
    })

    assert.equal(exitCode, 0, stderr)
    assert.equal(stdout.trim(), 'hello world|C:\\Temp Folder\\schema.json')
  } finally {
    process.env.PATH = originalPath
    await rm(directory, { recursive: true, force: true })
  }
})
