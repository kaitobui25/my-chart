import test from 'node:test'
import assert from 'node:assert/strict'
import { buildPrompt } from '../prompt-builder.mjs'

test('trade prompt includes replay safety and supplied context', () => {
  const prompt = buildPrompt({
    mode: 'analyze',
    message: 'Analyze',
    context: { symbol: 'BTCUSDT', timeframe: '15m', candles: [{ timestamp: 1, close: 100 }], indicators: [] }
  })
  assert.match(prompt, /Never infer or use future candles/)
  assert.match(prompt, /Trade analysis/)
  assert.match(prompt, /"timestamp":1/)
  assert.match(prompt, /BTCUSDT/)
})

test('normal chat prompt does not force a trade decision', () => {
  const prompt = buildPrompt({
    mode: 'chat',
    message: 'RSI nay ra sao?',
    context: { symbol: 'BTCUSDT', timeframe: '1h', candles: [], indicators: [] }
  })
  assert.match(prompt, /Communicate naturally/)
  assert.match(prompt, /Do not force a LONG, SHORT, WAIT/)
  assert.match(prompt, /\{"message":"natural chart-aware answer"\}/)
})
