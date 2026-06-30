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
