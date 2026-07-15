import assert from 'node:assert/strict'
import {
  computeBacktestMetrics,
  filterTradesByRange,
  normalizeBacktestPayload,
  parseBacktestText,
  startOfUtcDay,
  endOfUtcDay
} from './backtest-report-core.js'

const payload = {
  strategy: 'ATR Expansion Breakout',
  initialCapital: 10000,
  currency: 'USD',
  trades: [
    { entry_time: '2026-01-01T00:00:00Z', exit_time: '2026-01-01T01:00:00Z', side: 'long', pnl: 100, profit_ratio: 0.01 },
    { entry_time: '2026-01-02T00:00:00Z', exit_time: '2026-01-02T01:00:00Z', side: 'short', pnl: -50, profit_ratio: -0.005 },
    { entry_time: '2026-01-03T00:00:00Z', exit_time: '2026-01-03T01:00:00Z', side: 'long', pnl: 150, profit_ratio: 0.015 }
  ]
}

const report = normalizeBacktestPayload(payload, 'fixture')
assert.equal(report.strategy, 'ATR Expansion Breakout')
assert.equal(report.trades.length, 3)
assert.equal(report.trades[0].returnPct, 1)

const metrics = computeBacktestMetrics(report.trades, report.initialCapital)
assert.equal(metrics.totalPnl, 200)
assert.equal(metrics.profitableTrades, 2)
assert.equal(metrics.tradeCount, 3)
assert.equal(metrics.profitFactor, 5)
assert.equal(Number(metrics.totalReturnPct.toFixed(2)), 2)
assert.equal(metrics.maxDrawdown, 50)
assert.equal(metrics.maxConsecutiveWins, 1)
assert.equal(metrics.maxConsecutiveLosses, 1)

const filtered = filterTradesByRange(
  report.trades,
  startOfUtcDay('2026-01-02'),
  endOfUtcDay('2026-01-02')
)
assert.equal(filtered.length, 1)
assert.equal(filtered[0].pnl, -50)

const csv = 'exit_time,side,pnl\n2026-02-01T00:00:00Z,long,25\n2026-02-02T00:00:00Z,short,-10\n'
const csvReport = normalizeBacktestPayload(parseBacktestText(csv, 'trades.csv'), 'trades.csv')
assert.equal(csvReport.trades.length, 2)
assert.equal(computeBacktestMetrics(csvReport.trades).totalPnl, 15)

const derived = normalizeBacktestPayload({ trades: [{
  entry_time: 1_700_000_000,
  exit_time: 1_700_000_060,
  side: 'short',
  entry_price: 100,
  exit_price: 90,
  quantity: 2,
  fees: 1
}] })
assert.equal(derived.trades[0].pnl, 19)

const rReport = normalizeBacktestPayload({ trades: [{ exit_ts: 1_700_000_000, pnl_r: 1.25 }] })
assert.equal(rReport.currency, 'R')
assert.equal(rReport.trades[0].pnl, 1.25)

console.log('backtest-report-core tests passed')
