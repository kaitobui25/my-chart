import test from 'node:test'
import assert from 'node:assert/strict'
import { getModelResponseSchema, normalizeTradePlan, parseModelResponse } from '../response-schema.mjs'

test('normal chat response never exposes a trade plan', () => {
  const response = parseModelResponse(JSON.stringify({ message: 'RSI is rising.' }), 'chat')
  assert.equal(response.message, 'RSI is rising.')
  assert.equal(response.tradePlan, null)
  assert.deepEqual(getModelResponseSchema('chat').required, ['message'])
})

test('incomplete LONG is downgraded to WAIT', () => {
  const plan = normalizeTradePlan({ decision: 'LONG', confidence: 90, targets: [] })
  assert.equal(plan.decision, 'WAIT')
  assert.equal(plan.entryZone, null)
})

test('valid trade response is normalized', () => {
  const response = parseModelResponse(JSON.stringify({
    message: 'Setup found.',
    tradePlan: {
      decision: 'long', confidence: 72, marketRegime: 'trend',
      entryZone: { from: 102, to: 100 }, stopLoss: 98, targets: [106],
      riskReward: 2, expiryBars: 4, invalidation: 'Close below 98', reasons: ['Breakout'], warnings: []
    }
  }), 'analyze')
  assert.equal(response.tradePlan.decision, 'LONG')
  assert.deepEqual(response.tradePlan.entryZone, { from: 100, to: 102 })
})
