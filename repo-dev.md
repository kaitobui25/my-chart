This file is a merged representation of a subset of the codebase, containing files not matching ignore patterns, combined into a single document by Repomix.

# File Summary

## Purpose
This file contains a packed representation of a subset of the repository's contents that is considered the most important context.
It is designed to be easily consumable by AI systems for analysis, code review,
or other automated processes.

## File Format
The content is organized as follows:
1. This summary section
2. Repository information
3. Directory structure
4. Repository files (if enabled)
5. Multiple file entries, each consisting of:
  a. A header with the file path (## File: path/to/file)
  b. The full contents of the file in a code block

## Usage Guidelines
- This file should be treated as read-only. Any changes should be made to the
  original repository files, not this packed version.
- When processing this file, use the file path to distinguish
  between different files in the repository.
- Be aware that this file may contain sensitive information. Handle it with
  the same level of security as you would the original repository.

## Notes
- Some files may have been excluded based on .gitignore rules and Repomix's configuration
- Binary files are not included in this packed representation. Please refer to the Repository Structure section for a complete list of file paths, including binary files
- Files matching these patterns are excluded: node_modules, dist, build, website, coverage, *.log, *.map
- Files matching patterns in .gitignore are excluded
- Files matching default ignore patterns are excluded
- Files are sorted by Git change count (files with more changes are at the bottom)

# Directory Structure
```
[scripts]/
  branch-lint.js
  check-env.js
  pre-publish.js
  utils.js

[debug]/
  index.html
  main.js
  style.css
```

# Files

## File: scripts/branch-lint.js
```javascript
import childProcess from 'child_process'
import { styleText } from 'node:util'

const branchName = childProcess.execSync('git branch --show-current').toString().trim()
if (!(/^(feature|fix)\/[A-Za-z0-9]+([-][A-Za-z0-9]+)*$/.test(branchName))) {
  console.log(
    styleText('red', 'Error: branch ') +
    styleText(['underline', 'red'], branchName) +
    styleText('red', ' not in compliance with the specification, branch names must start with feature/ or fix/ and may only contain letters, numbers, and the character \'-\'')
  )
  process.exit(1)
}
```

## File: scripts/check-env.js
```javascript
import { styleText } from 'node:util'

if (process.env.npm_command === 'install') {
  const allowedPackageManager = 'pnpm'
  const currentPackageManager = process.env.npm_config_user_agent?.split('/')[0] || 'unknown'
  if (currentPackageManager !== allowedPackageManager) {
    console.log(styleText('red', `\nError: This project must use ${allowedPackageManager} as the package manager. The current package manager used is ${currentPackageManager}. Please use the command ${styleText('underline', `${allowedPackageManager} install`)} to install dependencies .\n`))
    process.exit(1)
  }

  function compareVersions (current, required) {
    const operator = required.match(/^[><=]+/)?.[0] || '>='
    const version = required.replace(/^[><=]+/, '')

    const currParts = current.replace(/^v/, '').split('.').map(Number)
    const reqParts = version.split('.').map(Number)

    for (let i = 0; i < 3; i++) {
      const curr = currParts[i] || 0
      const req = reqParts[i] || 0

      if (curr > req) return operator.includes('>')
      if (curr < req) return operator.includes('<')
    }

    return operator.includes('=')
  }

  const requiredNodeVersion = '>=22.0.0'
  if (!compareVersions(process.version, requiredNodeVersion)) {
    console.log(styleText('red', `\nError: current Node.js version (${process.version}) does not meet the requirements, required Node.js version ${requiredNodeVersion} .\n`))
    process.exit(1)
  }
}
```

## File: scripts/pre-publish.js
```javascript
import childProcess from 'child_process'
import { styleText } from 'node:util'

import { getVersion } from './utils.js'

try {
  const versions = childProcess.execSync('npm view klinecharts versions').toString().trim()
  const currentVersion = getVersion()
  if (versions.includes(getVersion())) {
    console.log(styleText('red', `✖️ The version ${styleText('underline', currentVersion)} already exists, please modify the version in package.json`))
    process.exit(1)
  }
} catch (error) {}
```

## File: scripts/utils.js
```javascript
import path from 'path'
import fs from 'fs'

const root = fs.realpathSync(process.cwd())
const resolvePath = (relativePath, rootDirectory = root) => path.resolve(rootDirectory, relativePath)

function getVersion () {
  const result = fs.readFileSync(resolvePath('package.json'), 'utf-8')
  return JSON.parse(result).version
}

export { resolvePath, getVersion }
```

## File: debug/index.html
```html
<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>KLineChart debug</title>
    <link rel="stylesheet" href="./style.css">
  </head>
  <body>
    <div id="root">
      <div id="toolbar">
        <div id="period-switcher" aria-label="周期切换">
          <button data-period="1m" type="button">1m</button>
          <button data-period="5m" type="button">5m</button>
          <button data-period="15m" type="button">15m</button>
          <button data-period="1h" type="button">1h</button>
          <button data-period="1d" type="button">1d</button>
        </div>
      </div>
      <div id="chart"></div>
    </div>
    <script type="module" src="./main.js"></script>
  </body>
</html>
```

## File: debug/style.css
```css
* {
  box-sizing: border-box;
}

html,
body,
#root {
  width: 100%;
  height: 100%;
  margin: 0;
}

body {
  overflow: hidden;
  background: #ffffff;
}

#chart {
  width: 100%;
  height: calc(100% - 44px);
}

#toolbar {
  display: flex;
  align-items: center;
  gap: 12px;
  height: 44px;
  padding: 0 12px;
  border-bottom: 1px solid #e6e8eb;
  background: #ffffff;
  color: #333333;
  font: 13px/1.4 -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
}

#period-switcher {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 2px;
  border: 1px solid #d0d7de;
  border-radius: 4px;
  background: #f6f8fa;
}

#period-switcher button,
#load-forward,
#add-backward {
  height: 28px;
  padding: 0 12px;
  border: 1px solid #c9d0d8;
  border-radius: 4px;
  background: #f7f9fb;
  color: #1f2328;
  cursor: pointer;
}

#period-switcher button {
  min-width: 42px;
  border-color: transparent;
  background: transparent;
}

#period-switcher button.active {
  border-color: #0969da;
  background: #0969da;
  color: #ffffff;
}

#period-switcher button:hover,
#load-forward:hover,
#add-backward:hover {
  background: #eef2f6;
}

#period-switcher button.active:hover {
  background: #0969da;
}

#load-forward:disabled,
#add-backward:disabled {
  color: #8c959f;
  cursor: not-allowed;
}

#load-status {
  color: #57606a;
}
```

## File: debug/main.js
```javascript
import { dispose, init } from '../src/index.ts'

const MINUTE = 60 * 1000
const LOAD_BAR_COUNT = 100
const PERIODS = [
  { key: '1m', label: '1m', period: { span: 1, type: 'minute' } },
  { key: '5m', label: '5m', period: { span: 5, type: 'minute' } },
  { key: '15m', label: '15m', period: { span: 15, type: 'minute' } },
  { key: '1h', label: '1h', period: { span: 1, type: 'hour' } },
  { key: '1d', label: '1d', period: { span: 1, type: 'day' } }
]

let chart = null
const streamTimer = null
let activePeriodKey = PERIODS[0].key

function getActivePeriodConfig () {
  return PERIODS.find(({ key }) => key === activePeriodKey) ?? PERIODS[0]
}

function getPeriodDuration (period) {
  switch (period.type) {
    case 'second': return period.span * 1000
    case 'minute': return period.span * MINUTE
    case 'hour': return period.span * 60 * MINUTE
    case 'day': return period.span * 24 * 60 * MINUTE
    case 'week': return period.span * 7 * 24 * 60 * MINUTE
    case 'month': return period.span * 30 * 24 * 60 * MINUTE
    case 'year': return period.span * 365 * 24 * 60 * MINUTE
    default: return MINUTE
  }
}

function setActivePeriodButton () {
  document.querySelectorAll('#period-switcher button').forEach(button => {
    button.classList.toggle('active', button.dataset.period === activePeriodKey)
  })
}

function clamp (value, min, max) {
  return Math.min(Math.max(value, min), max)
}

function randomBetween (min, max) {
  return min + Math.random() * (max - min)
}

function randomNormal () {
  let u = 0
  let v = 0
  while (u === 0) u = Math.random()
  while (v === 0) v = Math.random()
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v)
}

function roundPrice (price) {
  return Number(price.toFixed(2))
}

function createMarketState (period) {
  const periodFactor = period.type === 'day'
    ? 3.2
    : period.type === 'hour'
      ? 1.7
      : Math.sqrt(Math.max(period.span, 1))

  return {
    volatility: 0.0035 * periodFactor,
    trend: randomBetween(-0.00035, 0.00035) * periodFactor
  }
}

function createNextBar (open, timestamp, state) {
  state.trend = clamp(state.trend * 0.96 + randomNormal() * state.volatility * 0.035, -0.004, 0.004)
  state.volatility = clamp(state.volatility * 0.92 + Math.abs(randomNormal()) * 0.00065, 0.0018, 0.032)

  const shock = randomNormal() * state.volatility
  const jump = Math.random() < 0.035 ? randomNormal() * state.volatility * 3.2 : 0
  const close = Math.max(1, open * (1 + state.trend + shock + jump))
  const bodyHigh = Math.max(open, close)
  const bodyLow = Math.min(open, close)
  const wickRatio = state.volatility * randomBetween(0.35, 2.6)
  const high = bodyHigh * (1 + wickRatio * randomBetween(0.15, 1.1))
  const low = Math.max(1, bodyLow * (1 - wickRatio * randomBetween(0.15, 1.1)))
  const rangeRatio = (high - low) / open
  const volumeBase = 450 + open * 0.18
  const volumeSpike = Math.random() < 0.055 ? randomBetween(1.8, 4.8) : 1
  const volume = Math.round(volumeBase * (1 + rangeRatio * 90) * randomBetween(0.55, 1.45) * volumeSpike)

  return {
    timestamp,
    open: roundPrice(open),
    high: roundPrice(high),
    low: roundPrice(low),
    close: roundPrice(close),
    volume
  }
}

function createPreviousBar (nextOpen, timestamp, state) {
  const drift = state.trend + randomNormal() * state.volatility
  const open = Math.max(1, nextOpen / (1 + drift))
  const bar = createNextBar(open, timestamp, state)
  bar.close = roundPrice(nextOpen)
  bar.high = roundPrice(Math.max(bar.high, bar.open, bar.close))
  bar.low = roundPrice(Math.min(bar.low, bar.open, bar.close))
  return bar
}

function createForwardDataList (basePrice, timestamp, period, count = LOAD_BAR_COUNT) {
  const duration = getPeriodDuration(period)
  const dataList = []
  const state = createMarketState(period)
  let nextOpen = basePrice
  for (let i = 1; i <= count; i++) {
    const bar = createPreviousBar(nextOpen, timestamp - i * duration, state)
    dataList.unshift(bar)
    nextOpen = bar.open
  }
  return dataList
}

function createBackDataList (basePrice, timestamp, period, count = LOAD_BAR_COUNT) {
  const duration = getPeriodDuration(period)
  const dataList = []
  const state = createMarketState(period)
  let open = basePrice

  for (let i = 1; i <= count; i++) {
    const bar = createNextBar(open, timestamp + i * duration, state)
    dataList.push(bar)
    open = bar.close
  }
  return dataList
}

function createDataLoader () {
  return {
    getBars: ({ type, timestamp, period, callback }) => {
      let dataList = []
      switch (type) {
        case 'init': {
          const duration = getPeriodDuration(period)
          dataList = createBackDataList(2680, (timestamp ?? Date.now()) - LOAD_BAR_COUNT * duration, period)
          break
        }
        case 'forward': {
          const historyDataList = chart.getDataList()
          const firstData = historyDataList[0]
          dataList = createForwardDataList(firstData.open, timestamp, period)
          break
        }
        case 'backward': {
          const historyDataList = chart.getDataList()
          const lastData = historyDataList[historyDataList.length - 1]
          dataList = createBackDataList(lastData.close, timestamp, period)
          break
        }
      }
      // callback(dataList, { forward: true, backward: true })
      setTimeout(() => {
        callback(dataList, { forward: false, backward: false })
      }, 1000)
    },
    subscribeBar: ({ period, callback }) => {
    },
    unsubscribeBar: () => {
    }
  }
}

function switchPeriod (periodKey) {
  const config = PERIODS.find(({ key }) => key === periodKey)
  if (chart === null || config === undefined || activePeriodKey === periodKey) {
    return
  }
  activePeriodKey = periodKey
  setActivePeriodButton()
  chart.setPeriod(config.period)
}

function mountChart () {
  const chartDom = document.getElementById('chart')
  if (chartDom === null) {
    return
  }
  dispose(chartDom)
  chart = init(chartDom, {
    layout: {
      basicParams: {
        // yAxisPosition: 'left',
        // paneHeight: 200
      },
      panes: [{ type: 'candle' }, { type: 'indicator', content: ['MA'] }]
    }
  })
  chart.setSymbol({ ticker: 'DEBUG', pricePrecision: 2, volumePrecision: 0 })
  chart.setPeriod(getActivePeriodConfig().period)
  chart.setDataLoader(createDataLoader())
  chart.createIndicator('EMA', { isStack: true, pane: { id: 'candle_pane' } })
  chart.createIndicator('SAR', { isStack: true, pane: { id: 'candle_pane' } })
  // chart.overrideYAxis({ id: 'new1', position: 'left' })
  // chart.createOverlay('brush')
}

function bindToolbar () {
  document.querySelectorAll('#period-switcher button').forEach(periodButton => {
    periodButton.addEventListener('click', () => {
      switchPeriod(periodButton.dataset.period)
    })
  })
  setActivePeriodButton()
}

window.addEventListener('beforeunload', () => {
  window.clearInterval(streamTimer)
  const chartDom = document.getElementById('chart')
  if (chartDom !== null) {
    dispose(chartDom)
  }
})

bindToolbar()
mountChart()
```
