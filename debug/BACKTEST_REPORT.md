# Debug backtest report

The debug page now includes a **Backtest** button. The report supports:

- Total PnL, maximum drawdown, profitable trades, profit factor, expected payoff, payoff ratio, Sharpe ratio, fees, and streaks.
- Cumulative and daily PnL charts.
- Entire-history, rolling 7/30/90/365-day, and custom UTC date ranges.
- JSON/CSV import, local persistence, and runtime injection.

## Recommended JSON

Place the generated file at `debug/data/backtest-trades.json` to load it automatically:

```json
{
  "strategy": "ExactBT ATR Expansion Breakout",
  "initialCapital": 10000,
  "currency": "USD",
  "trades": [
    {
      "entryTime": "2026-06-23T01:00:00Z",
      "exitTime": "2026-06-23T04:00:00Z",
      "side": "long",
      "entryPrice": 101000,
      "exitPrice": 102500,
      "quantity": 0.01,
      "fees": 1.2,
      "pnl": 13.8,
      "returnPct": 1.37
    }
  ]
}
```

An array of trade objects is also accepted. Common snake_case fields such as `entry_time`, `exit_time`, `entry_ts`, `exit_ts`, `net_pnl`, `pnl_usd`, `profit_abs`, `return_pct`, `entry_price`, `exit_price`, and `qty` are normalized automatically. A CSV file can use the same column names.

`pnl`/`net_pnl` is treated as net PnL. When PnL is omitted, the report derives it from side, entry price, exit price, quantity, and fees.

## Runtime integration

```js
window.__KLINECHARTS_BACKTEST_REPORT__.setData(backtestResult, {
  sourceName: 'ExactBT run'
})
window.__KLINECHARTS_BACKTEST_REPORT__.open()
```

Or dispatch an event:

```js
window.dispatchEvent(new CustomEvent('klinecharts:backtest-data', {
  detail: backtestResult
}))
```

## Core test

```bash
node debug/backtest-report-core.test.mjs
```
