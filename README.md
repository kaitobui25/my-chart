# KLineChart

Lightweight k-line chart built with HTML5 canvas.

[Website](https://klinecharts.com) | [Documentation](https://www.klinecharts.com) | [GitHub Issues](https://github.com/liihuu/KLineChart/issues)

## Features

- Lightweight canvas-based candlestick chart.
- Built-in indicators and drawing overlays.
- Configurable styles, layout, locale, symbols, periods, and data loading.
- TypeScript source and type definitions.
- Mobile-friendly interactions.

## Install

```bash
npm install klinecharts --save
```

```bash
yarn add klinecharts
```

```bash
pnpm add klinecharts
```

### CDN

```html
<script src="https://unpkg.com/klinecharts/dist/klinecharts.min.js"></script>
```

```html
<script src="https://cdn.jsdelivr.net/npm/klinecharts/dist/klinecharts.min.js"></script>
```

## Local Development

This repository uses `pnpm`. Node.js 22 or newer is required.

```bash
pnpm install
node scripts/cache-btcusdt-data.js
pnpm debug
```

The debug app runs from the `debug/` directory. The cache step is required when running the debug server manually; the Windows batch file handles it automatically.

## BTCUSDT Debug Chart

For Windows, use the root-level batch file:

```bat
open-btcusdt-chart.bat
```

What it does:

- Downloads free BTCUSDT OHLCV data from Binance public API when local cache is missing.
- Saves cache files to `debug/data/*.json`.
- Reuses the saved cache on the next run, so it does not download again.
- Starts the Vite debug chart on `http://127.0.0.1:5173/`.
- Opens the chart in the default browser.

The debug chart currently includes these cached periods: `1m`, `5m`, `15m`, `1h`, `1d`, `1w`, and `1M`. It can display either normal candles or Heikin Ashi candles from the toolbar. In Heikin Ashi mode, hovering a candle shows a light real high/low overlay for the original candle. The settings menu can hide or show the chart grid. The built-in debug indicators can be hidden, shown, turned off, restored from the indicator dropdown, and configured with custom calculation parameters. Toolbar state is saved in browser storage, so period, candle mode, grid visibility, indicator parameters, and indicator choices survive refreshes and reopening the batch file.

To refresh cached data manually:

```bat
open-btcusdt-chart.bat refresh
```

Or run the cache script directly:

```bash
node scripts/cache-btcusdt-data.js --refresh
```

The generated JSON cache is ignored by git.

## AI Chart Chat

The debug chart can open a local AI chat panel beside the chart. The browser sends exact visible candle data, indicator results, replay state, and a chart screenshot to a bridge bound only to `127.0.0.1`.

### Start on Windows

```bat
open-btcusdt-ai-chart.bat
```

This starts both:

- Vite chart: `http://127.0.0.1:5173/`
- AI bridge: `http://127.0.0.1:8788/`

The original `open-btcusdt-chart.bat` remains available and does not require the AI bridge.

### Providers

**Codex**

Install Codex CLI, run it once, and select `Sign in with ChatGPT`. The bridge invokes `codex exec` in an empty read-only runtime directory, attaches the chart PNG, and requires structured JSON output.

**Gemini**

Install a Gemini CLI version that supports ACP, authenticate using the account flow supported by that CLI, and confirm that `gemini --acp` starts successfully. Gemini receives exact chart JSON through ACP. Image input is intentionally disabled in the first adapter version. Availability depends on the installed Gemini CLI release and account entitlement; the panel shows the provider as unavailable when ACP cannot start.

**Offline test**

The built-in fake provider validates the UI, bridge, context, and response pipeline without any AI login. It always returns `WAIT`.

Every **Analyze current chart** result is stored locally for replay evaluation. The panel can export JSON containing the decision plus MFE/MAE and target/stop outcomes after 4, 8, 16, and 32 future candles. The full candle context is not stored.

### Commands

```bash
pnpm ai:bridge
pnpm ai:smoke
pnpm test:ai
```

### Safety boundaries

- No exchange API is connected.
- No live or demo order is sent.
- The bridge listens on `127.0.0.1`, not `0.0.0.0`.
- Cross-origin browser requests are rejected except for the local Vite chart.
- Codex runs in a separate empty directory with read-only sandbox mode.
- A `LONG` or `SHORT` response missing entry, stop loss, or targets is downgraded to `WAIT`.
- Replay analysis uses only candles already present in `chart.getDataList()`, preventing access to unrevealed future candles.

## Build

```bash
pnpm build
```

Generated build files are written to `dist/`.

## Docs

```bash
pnpm docs:dev
```

## License

KLineChart is available under the Apache License 2.0.
