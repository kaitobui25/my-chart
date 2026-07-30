import test from 'node:test'
import assert from 'node:assert/strict'
import { SessionManager } from '../session-manager.mjs'

test('starting a second request cancels the first', () => {
  const manager = new SessionManager()
  let cancelled = false
  manager.beginRequest('a', () => { cancelled = true })
  manager.beginRequest('a', () => {})
  assert.equal(cancelled, true)
})
