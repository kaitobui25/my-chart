import assert from 'node:assert/strict'
import {
  aggregateBarsByMinutes,
  computeExactAtr,
  normalizeAtrExpansionConfig,
  runAtrExpansionBreakout
} from './atr-expansion-breakout.js'

const MINUTE = 60 * 1000
const baseTime = Date.UTC(2026, 0, 1, 0, 0)

function bar (index, open, high, low, close, minutes = 30) {
  return {
    timestamp: baseTime + index * minutes * MINUTE,
    open,
    high,
    low,
    close,
    volume: 1
  }
}

const defaults = normalizeAtrExpansionConfig({})
assert.equal(defaults.atrWindow, 21)
assert.equal(defaults.atrStopMultiplier, 3)
assert.equal(defaults.riskReward, 4)
assert.equal(defaults.cancelAcrossUtcDay, true)

const atr = computeExactAtr([
  bar(0, 100, 101, 99, 100),
  bar(1, 100, 103, 99, 102),
  bar(2, 102, 104, 101, 103)
], 2)
assert.equal(atr[0], null)
assert.equal(atr[1], 3)
assert.equal(atr[2], 3)

const fifteenMinuteBars = [
  bar(0, 100, 102, 99, 101, 15),
  bar(1, 101, 104, 100, 103, 15),
  bar(2, 103, 105, 102, 104, 15),
  bar(3, 104, 106, 101, 102, 15)
]
const thirtyMinuteBars = aggregateBarsByMinutes(fifteenMinuteBars, 30)
assert.equal(thirtyMinuteBars.length, 2)
assert.deepEqual(thirtyMinuteBars[0], {
  timestamp: baseTime,
  open: 100,
  high: 104,
  low: 99,
  close: 103,
  volume: 2
})

const incompleteBars = aggregateBarsByMinutes(fifteenMinuteBars.slice(1), 30)
assert.equal(incompleteBars.length, 1)
assert.equal(incompleteBars[0].timestamp, baseTime + 30 * MINUTE)

const breakoutBars = [
  bar(0, 100, 101, 99, 100),
  bar(1, 100, 102, 99, 101),
  bar(2, 101, 101.5, 99.5, 100),
  bar(3, 100, 104, 99, 103.5),
  bar(4, 103.5, 120, 103, 118),
  bar(5, 118, 119, 117, 118)
]
const targetResult = runAtrExpansionBreakout(breakoutBars, {
  atrMeanWindow: 2,
  atrWindow: 2,
  atrStopWindow: 2,
  atrStopMultiplier: 1,
  expansionMultiplier: 0.1,
  breakoutLookback: 2,
  maximumHoldBars: 10,
  riskReward: 1,
  commissionPct: 0,
  cancelAcrossUtcDay: false
})
assert.equal(targetResult.trades.length, 1)
assert.equal(targetResult.trades[0].side, 'long')
assert.equal(targetResult.trades[0].exitReason, 'take_profit')
assert.ok(targetResult.trades[0].pnl > 0)

const bothHitBars = breakoutBars.map(item => ({ ...item }))
bothHitBars[4] = { ...bothHitBars[4], high: 120, low: 90, close: 100 }
const stopPriorityResult = runAtrExpansionBreakout(bothHitBars, {
  atrMeanWindow: 2,
  atrWindow: 2,
  atrStopWindow: 2,
  atrStopMultiplier: 1,
  expansionMultiplier: 0.1,
  breakoutLookback: 2,
  maximumHoldBars: 10,
  riskReward: 1,
  commissionPct: 0,
  cancelAcrossUtcDay: false
})
assert.equal(stopPriorityResult.trades.length, 1)
assert.equal(stopPriorityResult.trades[0].exitReason, 'stop_loss')
assert.ok(stopPriorityResult.trades[0].pnl < 0)

const utcBars = breakoutBars.map((item, index) => ({
  ...item,
  timestamp: Date.UTC(2026, 0, 1, 22, 0) + index * 30 * MINUTE
}))
const utcResult = runAtrExpansionBreakout(utcBars, {
  atrMeanWindow: 2,
  atrWindow: 2,
  atrStopWindow: 2,
  atrStopMultiplier: 1,
  expansionMultiplier: 0.1,
  breakoutLookback: 2,
  maximumHoldBars: 10,
  riskReward: 1,
  commissionPct: 0,
  cancelAcrossUtcDay: true
})
assert.equal(utcResult.trades.length, 0)

console.log('atr-expansion-breakout tests passed')
