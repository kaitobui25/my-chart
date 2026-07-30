import test from 'node:test'
import assert from 'node:assert/strict'
import { buildWindowsCommand, commandExists, resolveCommand } from '../providers/provider-utils.mjs'

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
