import test from 'node:test'
import assert from 'node:assert/strict'
import { evaluateRecord } from '../../debug/ai/evaluation-store.js'

test('evaluates a long target before stop', () => {
  const record = {
    contextTimestamp: 1,
    referenceClose: 100,
    tradePlan: {
      decision: 'LONG',
      entryZone: { from: 99, to: 101 },
      stopLoss: 95,
      targets: [105]
    },
    evaluations: {}
  }
  const candles = [
    { timestamp: 1, open: 100, high: 101, low: 99, close: 100 },
    { timestamp: 2, open: 100, high: 102, low: 99, close: 101 },
    { timestamp: 3, open: 101, high: 106, low: 100, close: 105 },
    { timestamp: 4, open: 105, high: 107, low: 103, close: 106 },
    { timestamp: 5, open: 106, high: 108, low: 104, close: 107 }
  ]
  const result = evaluateRecord(record, candles)
  assert.equal(result.evaluations[4].outcome, 'target')
  assert.equal(result.evaluations[4].eventBar, 2)
  assert.equal(result.evaluations[4].mfePercent, 8)
})

test('does not evaluate before the full horizon exists', () => {
  const record = {
    contextTimestamp: 1,
    referenceClose: 100,
    tradePlan: { decision: 'WAIT', targets: [] },
    evaluations: {}
  }
  const result = evaluateRecord(record, [
    { timestamp: 1, high: 101, low: 99, close: 100 },
    { timestamp: 2, high: 102, low: 98, close: 101 }
  ])
  assert.deepEqual(result.evaluations, {})
})
