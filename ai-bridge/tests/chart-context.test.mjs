import test from 'node:test'
import assert from 'node:assert/strict'
import { selectVisibleWindow } from '../../debug/ai/chart-context.js'

test('visible selection never includes bars after the requested range', () => {
  const data = Array.from({ length: 1000 }, (_, index) => ({ timestamp: index }))
  const selected = selectVisibleWindow(data, { realFrom: 450, realTo: 500 }, 300)
  assert.equal(selected.toIndex, 500)
  assert.equal(selected.data.at(-1).timestamp, 500)
  assert.ok(selected.data.every(bar => bar.timestamp <= 500))
})
