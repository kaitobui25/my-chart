import test from 'node:test'
import assert from 'node:assert/strict'
import { buildPrompt } from '../prompt-builder.mjs'

test('prompt includes replay safety and supplied context only', () => {
  const prompt = buildPrompt({
    mode: 'analyze',
    message: 'Analyze',
    context: { symbol: 'BTCUSDT', timeframe: '15m', candles: [{ timestamp: 1, close: 100 }], indicators: [] }
  })
  assert.match(prompt, /Never infer or use future candles/)
  assert.match(prompt, /"timestamp":1/)
  assert.match(prompt, /BTCUSDT/)
})
