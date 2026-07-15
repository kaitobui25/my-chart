# ATR Expansion Breakout strategy

The debug toolbar includes a **Strategy** menu that runs the uploaded ExactBT/Pine strategy against cached BTCUSDT candles and sends the closed trades directly to the Backtest report.

## Default configuration

- ATR mean window: `50`
- Signal ATR window: `21`
- Stop ATR window: `14`
- ATR stop multiplier: `3.0`
- ATR expansion multiplier: `1.25`
- Breakout lookback: `192`
- Maximum hold: `384` bars
- Risk/reward: `4.0`
- Side: both
- Initial capital: `10,000 USD`
- Position size: `100%` of current equity
- Commission: `0.05%` on entry and exit
- Default timeframe: `30m`, aggregated from the cached `15m` file

## Execution rules

- Signals use the prior completed rolling channel.
- Entries fill at the next candle open.
- Stop distance is frozen from the signal candle's stop ATR.
- Stop-loss has priority when stop and target are both touched by one candle.
- No same-candle re-entry after an exit.
- A signal may be cancelled when its next-open fill crosses into a new UTC day.
- Maximum-hold exits use the candle close after stop/target checks.

The browser runner also handles gap-through-stop and gap-through-target fills at the candle open. This is explicit so the result is deterministic, but it can still differ from TradingView's broker emulator or another ExactBT engine when their intrabar assumptions differ.

## Runtime API

```js
const result = await window.__KLINECHARTS_STRATEGIES__.runAtrExpansionBreakout({
  timeframe: '30m',
  atrWindow: 21,
  atrStopMultiplier: 3,
  riskReward: 4
})
```

The original Pine v6 source is preserved at:

```text
debug/strategies/atr_expansion_breakout_atr21_stop3_rr4.pine
```
