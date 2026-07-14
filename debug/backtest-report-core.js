const DAY_MS = 24 * 60 * 60 * 1000

const TRADE_LIST_KEYS = ['trades', 'results', 'closedTrades', 'closed_trades', 'data']
const INITIAL_CAPITAL_KEYS = ['initialCapital', 'initial_capital', 'startingCapital', 'starting_capital', 'startingBalance', 'starting_balance', 'initialBalance', 'initial_balance', 'startBalance', 'start_balance', 'capital']
const STRATEGY_KEYS = ['strategy', 'strategyName', 'strategy_name', 'strategyId', 'strategy_id', 'name', 'title']
const CURRENCY_KEYS = ['currency', 'quoteCurrency', 'quote_currency']

function firstDefinedEntry (record, keys) {
  if (record === null || typeof record !== 'object') {
    return null
  }
  for (const key of keys) {
    if (record[key] !== undefined && record[key] !== null && record[key] !== '') {
      return { key, value: record[key] }
    }
  }
  return null
}

function firstDefined (record, keys) {
  return firstDefinedEntry(record, keys)?.value
}

function toFiniteNumber (value) {
  if (typeof value === 'number') {
    return Number.isFinite(value) ? value : null
  }
  if (typeof value !== 'string') {
    return null
  }
  const normalized = value.trim().replaceAll(',', '').replace(/[%$¥€£]/g, '')
  if (normalized === '') {
    return null
  }
  const parsed = Number(normalized)
  return Number.isFinite(parsed) ? parsed : null
}

export function toTimestamp (value) {
  if (value instanceof Date) {
    const timestamp = value.getTime()
    return Number.isFinite(timestamp) ? timestamp : null
  }
  if (typeof value === 'number') {
    if (!Number.isFinite(value)) {
      return null
    }
    return Math.abs(value) < 10_000_000_000 ? value * 1000 : value
  }
  if (typeof value !== 'string' || value.trim() === '') {
    return null
  }
  const numeric = toFiniteNumber(value)
  if (numeric !== null && /^\d+(?:\.\d+)?$/.test(value.trim())) {
    return Math.abs(numeric) < 10_000_000_000 ? numeric * 1000 : numeric
  }
  const timestamp = Date.parse(value)
  return Number.isFinite(timestamp) ? timestamp : null
}

function normalizeSide (value) {
  const side = String(value ?? '').trim().toLowerCase()
  if (['short', 'sell', '-1'].includes(side)) {
    return 'short'
  }
  return 'long'
}

function normalizeReturnPct (entry) {
  if (entry === null) {
    return null
  }
  const parsed = toFiniteNumber(entry.value)
  if (parsed === null) {
    return null
  }
  if (typeof entry.value === 'string' && entry.value.includes('%')) {
    return parsed
  }
  return ['profitRatio', 'profit_ratio', 'return'].includes(entry.key) ? parsed * 100 : parsed
}

function computePnlFromPrices ({ side, entryPrice, exitPrice, quantity, fees }) {
  if (entryPrice === null || exitPrice === null || quantity === null) {
    return null
  }
  const direction = side === 'short' ? -1 : 1
  return (exitPrice - entryPrice) * quantity * direction - (fees ?? 0)
}

export function normalizeTrade (rawTrade, index = 0) {
  if (rawTrade === null || typeof rawTrade !== 'object') {
    return null
  }

  const entryTime = toTimestamp(firstDefined(rawTrade, [
    'entryTime', 'entry_time', 'openTime', 'open_time', 'entryTimestamp', 'entry_timestamp',
    'openedAt', 'opened_at', 'startTime', 'start_time', 'entryTs', 'entry_ts', 'entryDatetime', 'entry_datetime', 'entryDate', 'entry_date'
  ]))
  const exitTime = toTimestamp(firstDefined(rawTrade, [
    'exitTime', 'exit_time', 'closeTime', 'close_time', 'exitTimestamp', 'exit_timestamp',
    'closedAt', 'closed_at', 'endTime', 'end_time', 'exitTs', 'exit_ts', 'exitDatetime', 'exit_datetime', 'exitDate', 'exit_date', 'timestamp', 'date', 'time'
  ])) ?? entryTime

  if (exitTime === null) {
    return null
  }

  const side = normalizeSide(firstDefined(rawTrade, ['side', 'direction', 'positionSide', 'position_side', 'type']))
  const entryPrice = toFiniteNumber(firstDefined(rawTrade, ['entryPrice', 'entry_price', 'openPrice', 'open_price', 'priceOpen', 'price_open']))
  const exitPrice = toFiniteNumber(firstDefined(rawTrade, ['exitPrice', 'exit_price', 'closePrice', 'close_price', 'priceClose', 'price_close']))
  const quantity = toFiniteNumber(firstDefined(rawTrade, ['quantity', 'qty', 'size', 'amount', 'contracts', 'positionSize', 'position_size', 'stakeAmount', 'stake_amount']))
  const fees = toFiniteNumber(firstDefined(rawTrade, ['fees', 'fee', 'feesUsd', 'fees_usd', 'feeUsd', 'fee_usd', 'commission', 'commissionUsd', 'commission_usd', 'commissions', 'costs', 'tradingCosts', 'trading_costs'])) ?? 0

  let pnl = toFiniteNumber(firstDefined(rawTrade, [
    'netPnl', 'net_pnl', 'pnl', 'profit', 'profitAbs', 'profit_abs', 'realizedPnl', 'realized_pnl',
    'netProfit', 'net_profit', 'pnlUsd', 'pnl_usd', 'netPnlUsd', 'net_pnl_usd', 'netProfitUsd', 'net_profit_usd', 'pl', 'pnlR', 'pnl_r', 'netR', 'net_r'
  ]))
  if (pnl === null) {
    const grossPnl = toFiniteNumber(firstDefined(rawTrade, ['grossPnl', 'gross_pnl', 'grossProfit', 'gross_profit']))
    pnl = grossPnl === null ? computePnlFromPrices({ side, entryPrice, exitPrice, quantity, fees }) : grossPnl - fees
  }
  if (pnl === null) {
    return null
  }

  let returnPct = normalizeReturnPct(firstDefinedEntry(rawTrade, [
    'returnPct', 'return_pct', 'pnlPct', 'pnl_pct', 'profitPct', 'profit_pct', 'profitRatio', 'profit_ratio', 'return'
  ]))
  const notional = entryPrice !== null && quantity !== null ? Math.abs(entryPrice * quantity) : null
  if (returnPct === null && notional !== null && notional > 0) {
    returnPct = pnl / notional * 100
  }

  return {
    id: String(firstDefined(rawTrade, ['id', 'tradeId', 'trade_id']) ?? index + 1),
    entryTime: entryTime ?? exitTime,
    exitTime,
    side,
    entryPrice,
    exitPrice,
    quantity,
    fees,
    pnl,
    returnPct,
    raw: rawTrade
  }
}

export function normalizeBacktestPayload (payload, sourceName = 'Backtest data') {
  const root = Array.isArray(payload) ? {} : (payload ?? {})
  let rawTrades = Array.isArray(payload) ? payload : null
  if (rawTrades === null && root !== null && typeof root === 'object') {
    for (const key of TRADE_LIST_KEYS) {
      if (Array.isArray(root[key])) {
        rawTrades = root[key]
        break
      }
    }
  }
  rawTrades ??= []

  const trades = rawTrades
    .map((trade, index) => normalizeTrade(trade, index))
    .filter(trade => trade !== null)
    .sort((left, right) => left.exitTime - right.exitTime)

  const initialCapital = toFiniteNumber(firstDefined(root, INITIAL_CAPITAL_KEYS)) ?? 0
  const strategy = String(firstDefined(root, STRATEGY_KEYS) ?? sourceName)
  const currency = String(firstDefined(root, CURRENCY_KEYS) ?? 'USD').toUpperCase()

  return {
    strategy,
    currency,
    initialCapital: Math.max(0, initialCapital),
    trades,
    rawTradeCount: rawTrades.length,
    rejectedTradeCount: Math.max(0, rawTrades.length - trades.length),
    sourceName
  }
}

export function parseCsv (text) {
  const rows = []
  let row = []
  let field = ''
  let quoted = false

  for (let index = 0; index < text.length; index++) {
    const character = text[index]
    if (quoted) {
      if (character === '"' && text[index + 1] === '"') {
        field += '"'
        index += 1
      } else if (character === '"') {
        quoted = false
      } else {
        field += character
      }
      continue
    }

    if (character === '"') {
      quoted = true
    } else if (character === ',') {
      row.push(field)
      field = ''
    } else if (character === '\n') {
      row.push(field)
      rows.push(row)
      row = []
      field = ''
    } else if (character !== '\r') {
      field += character
    }
  }
  row.push(field)
  if (row.some(value => value !== '') || rows.length === 0) {
    rows.push(row)
  }

  const nonEmptyRows = rows.filter(currentRow => currentRow.some(value => value.trim() !== ''))
  if (nonEmptyRows.length < 2) {
    return []
  }
  const headers = nonEmptyRows[0].map(header => header.trim())
  return nonEmptyRows.slice(1).map(values => Object.fromEntries(headers.map((header, index) => [header, values[index]?.trim() ?? ''])))
}

export function parseBacktestText (text, fileName = '') {
  const trimmed = text.trim()
  if (trimmed === '') {
    throw new Error('The selected file is empty.')
  }
  const looksLikeJson = fileName.toLowerCase().endsWith('.json') || trimmed.startsWith('{') || trimmed.startsWith('[')
  if (looksLikeJson) {
    return JSON.parse(trimmed)
  }
  return parseCsv(trimmed)
}

export function filterTradesByRange (trades, startTimestamp = null, endTimestamp = null) {
  return trades.filter(trade => (
    (startTimestamp === null || trade.exitTime >= startTimestamp) &&
    (endTimestamp === null || trade.exitTime <= endTimestamp)
  ))
}

function average (values) {
  return values.length === 0 ? null : values.reduce((sum, value) => sum + value, 0) / values.length
}

function sampleStandardDeviation (values) {
  if (values.length < 2) {
    return null
  }
  const mean = average(values)
  const variance = values.reduce((sum, value) => sum + (value - mean) ** 2, 0) / (values.length - 1)
  return Math.sqrt(variance)
}

function getUtcDateKey (timestamp) {
  return new Date(timestamp).toISOString().slice(0, 10)
}

export function computeBacktestMetrics (trades, initialCapital = 0) {
  const sortedTrades = [...trades].sort((left, right) => left.exitTime - right.exitTime)
  const startingCapital = Number.isFinite(initialCapital) && initialCapital > 0 ? initialCapital : 0
  let equity = startingCapital
  let peakEquity = startingCapital
  let maxDrawdown = 0
  let maxDrawdownPct = 0
  let cumulativePnl = 0
  let consecutiveWins = 0
  let consecutiveLosses = 0
  let maxConsecutiveWins = 0
  let maxConsecutiveLosses = 0
  const equityCurve = []
  const drawdownCurve = []
  const dailyPnlMap = new Map()

  for (const trade of sortedTrades) {
    cumulativePnl += trade.pnl
    equity = startingCapital + cumulativePnl
    peakEquity = Math.max(peakEquity, equity)
    const drawdown = Math.max(0, peakEquity - equity)
    const drawdownPct = peakEquity > 0 ? drawdown / peakEquity * 100 : 0
    maxDrawdown = Math.max(maxDrawdown, drawdown)
    maxDrawdownPct = Math.max(maxDrawdownPct, drawdownPct)
    equityCurve.push({ timestamp: trade.exitTime, value: cumulativePnl, equity })
    drawdownCurve.push({ timestamp: trade.exitTime, value: -drawdown, percent: -drawdownPct })

    const dateKey = getUtcDateKey(trade.exitTime)
    dailyPnlMap.set(dateKey, (dailyPnlMap.get(dateKey) ?? 0) + trade.pnl)

    if (trade.pnl > 0) {
      consecutiveWins += 1
      consecutiveLosses = 0
      maxConsecutiveWins = Math.max(maxConsecutiveWins, consecutiveWins)
    } else if (trade.pnl < 0) {
      consecutiveLosses += 1
      consecutiveWins = 0
      maxConsecutiveLosses = Math.max(maxConsecutiveLosses, consecutiveLosses)
    }
  }

  const wins = sortedTrades.filter(trade => trade.pnl > 0)
  const losses = sortedTrades.filter(trade => trade.pnl < 0)
  const grossProfit = wins.reduce((sum, trade) => sum + trade.pnl, 0)
  const grossLoss = Math.abs(losses.reduce((sum, trade) => sum + trade.pnl, 0))
  const totalPnl = sortedTrades.reduce((sum, trade) => sum + trade.pnl, 0)
  const dailyPnl = Array.from(dailyPnlMap, ([date, pnl]) => ({ date, timestamp: Date.parse(`${date}T00:00:00Z`), pnl }))
  let runningDailyEquity = startingCapital
  const dailyReturns = dailyPnl.map(item => {
    const base = runningDailyEquity
    runningDailyEquity += item.pnl
    const value = base > 0 ? item.pnl / base : null
    return { ...item, returnValue: value }
  })
  const finiteDailyReturns = dailyReturns.map(item => item.returnValue).filter(value => value !== null && Number.isFinite(value))
  const meanDailyReturn = average(finiteDailyReturns)
  const dailyStdDev = sampleStandardDeviation(finiteDailyReturns)
  const sharpeRatio = meanDailyReturn !== null && dailyStdDev !== null && dailyStdDev > 0
    ? meanDailyReturn / dailyStdDev * Math.sqrt(365)
    : null

  const avgWin = average(wins.map(trade => trade.pnl))
  const avgLoss = average(losses.map(trade => Math.abs(trade.pnl)))
  const totalFees = sortedTrades.reduce((sum, trade) => sum + trade.fees, 0)
  const averageReturnPct = average(sortedTrades.map(trade => trade.returnPct).filter(value => value !== null))

  return {
    tradeCount: sortedTrades.length,
    profitableTrades: wins.length,
    losingTrades: losses.length,
    winRate: sortedTrades.length > 0 ? wins.length / sortedTrades.length * 100 : 0,
    totalPnl,
    totalReturnPct: startingCapital > 0 ? totalPnl / startingCapital * 100 : null,
    grossProfit,
    grossLoss,
    profitFactor: grossLoss > 0 ? grossProfit / grossLoss : (grossProfit > 0 ? Number.POSITIVE_INFINITY : null),
    expectedPayoff: sortedTrades.length > 0 ? totalPnl / sortedTrades.length : 0,
    avgWin,
    avgLoss,
    payoffRatio: avgWin !== null && avgLoss !== null && avgLoss > 0 ? avgWin / avgLoss : null,
    averageReturnPct,
    maxDrawdown,
    maxDrawdownPct,
    sharpeRatio,
    largestWin: wins.length > 0 ? Math.max(...wins.map(trade => trade.pnl)) : null,
    largestLoss: losses.length > 0 ? Math.min(...losses.map(trade => trade.pnl)) : null,
    totalFees,
    maxConsecutiveWins,
    maxConsecutiveLosses,
    firstExitTime: sortedTrades[0]?.exitTime ?? null,
    lastExitTime: sortedTrades.at(-1)?.exitTime ?? null,
    equityCurve,
    drawdownCurve,
    dailyPnl,
    dailyReturns
  }
}

export function getPresetRange (preset, trades) {
  if (trades.length === 0) {
    return { startTimestamp: null, endTimestamp: null }
  }
  const earliest = trades[0].exitTime
  const latest = trades.at(-1).exitTime
  if (preset === 'entire') {
    return { startTimestamp: earliest, endTimestamp: latest }
  }
  const days = Number(preset.replace('last-', ''))
  if (!Number.isFinite(days) || days <= 0) {
    return { startTimestamp: earliest, endTimestamp: latest }
  }
  return {
    startTimestamp: Math.max(earliest, latest - days * DAY_MS),
    endTimestamp: latest
  }
}

export function endOfUtcDay (dateString) {
  if (typeof dateString !== 'string' || dateString === '') {
    return null
  }
  const timestamp = Date.parse(`${dateString}T23:59:59.999Z`)
  return Number.isFinite(timestamp) ? timestamp : null
}

export function startOfUtcDay (dateString) {
  if (typeof dateString !== 'string' || dateString === '') {
    return null
  }
  const timestamp = Date.parse(`${dateString}T00:00:00.000Z`)
  return Number.isFinite(timestamp) ? timestamp : null
}
