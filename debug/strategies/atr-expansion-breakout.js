const NORMALIZED_BAR_LISTS = new WeakSet()

const DEFAULT_CONFIG = Object.freeze({
  atrMeanWindow: 50,
  atrWindow: 21,
  atrStopWindow: 14,
  atrStopMultiplier: 3,
  expansionMultiplier: 1.25,
  breakoutLookback: 192,
  maximumHoldBars: 384,
  riskReward: 4,
  side: 'both',
  cancelAcrossUtcDay: true,
  initialCapital: 10000,
  positionSizePct: 100,
  commissionPct: 0.05,
  currency: 'USD'
})

function toPositiveInteger (value, fallback) {
  const parsed = Number(value)
  return Number.isFinite(parsed) && parsed >= 1 ? Math.round(parsed) : fallback
}

function toPositiveNumber (value, fallback) {
  const parsed = Number(value)
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback
}

function toNonNegativeNumber (value, fallback) {
  const parsed = Number(value)
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : fallback
}

function normalizeSide (value) {
  return ['long', 'short', 'both'].includes(value) ? value : DEFAULT_CONFIG.side
}

export function normalizeAtrExpansionConfig (config = {}) {
  return {
    atrMeanWindow: toPositiveInteger(config.atrMeanWindow, DEFAULT_CONFIG.atrMeanWindow),
    atrWindow: toPositiveInteger(config.atrWindow, DEFAULT_CONFIG.atrWindow),
    atrStopWindow: toPositiveInteger(config.atrStopWindow, DEFAULT_CONFIG.atrStopWindow),
    atrStopMultiplier: toPositiveNumber(config.atrStopMultiplier, DEFAULT_CONFIG.atrStopMultiplier),
    expansionMultiplier: toPositiveNumber(config.expansionMultiplier, DEFAULT_CONFIG.expansionMultiplier),
    breakoutLookback: toPositiveInteger(config.breakoutLookback, DEFAULT_CONFIG.breakoutLookback),
    maximumHoldBars: toPositiveInteger(config.maximumHoldBars, DEFAULT_CONFIG.maximumHoldBars),
    riskReward: toPositiveNumber(config.riskReward, DEFAULT_CONFIG.riskReward),
    side: normalizeSide(String(config.side ?? '').toLowerCase()),
    cancelAcrossUtcDay: config.cancelAcrossUtcDay !== false,
    initialCapital: toPositiveNumber(config.initialCapital, DEFAULT_CONFIG.initialCapital),
    positionSizePct: Math.min(100, toPositiveNumber(config.positionSizePct, DEFAULT_CONFIG.positionSizePct)),
    commissionPct: toNonNegativeNumber(config.commissionPct, DEFAULT_CONFIG.commissionPct),
    currency: String(config.currency ?? DEFAULT_CONFIG.currency).toUpperCase()
  }
}

function normalizeTimestamp (value) {
  const parsed = Number(value)
  if (!Number.isFinite(parsed)) {
    return null
  }
  return Math.abs(parsed) < 10_000_000_000 ? parsed * 1000 : parsed
}

export function normalizeBars (payload) {
  if (Array.isArray(payload) && NORMALIZED_BAR_LISTS.has(payload)) {
    return payload
  }
  const source = Array.isArray(payload) ? payload : payload?.data
  if (!Array.isArray(source)) {
    return []
  }

  const deduped = new Map()
  source.forEach(item => {
    const timestamp = normalizeTimestamp(item?.timestamp ?? item?.time ?? item?.openTime ?? item?.open_time)
    const open = Number(item?.open)
    const high = Number(item?.high)
    const low = Number(item?.low)
    const close = Number(item?.close)
    const volume = Number(item?.volume ?? 0)
    if (
      timestamp !== null &&
      Number.isFinite(open) &&
      Number.isFinite(high) &&
      Number.isFinite(low) &&
      Number.isFinite(close) &&
      high >= low
    ) {
      deduped.set(timestamp, {
        timestamp,
        open,
        high,
        low,
        close,
        volume: Number.isFinite(volume) ? volume : 0
      })
    }
  })

  const bars = Array.from(deduped.values()).sort((left, right) => left.timestamp - right.timestamp)
  NORMALIZED_BAR_LISTS.add(bars)
  return bars
}

function inferIntervalMs (bars) {
  const differences = []
  const sampleSize = Math.min(bars.length - 1, 200)
  for (let index = 1; index <= sampleSize; index++) {
    const difference = bars[index].timestamp - bars[index - 1].timestamp
    if (difference > 0) {
      differences.push(difference)
    }
  }
  differences.sort((left, right) => left - right)
  return differences.length === 0 ? null : differences[Math.floor(differences.length / 2)]
}

export function aggregateBarsByMinutes (payload, minutes) {
  const bars = normalizeBars(payload)
  const spanMinutes = toPositiveInteger(minutes, 1)
  if (spanMinutes === 1 || bars.length === 0) {
    return bars
  }

  const bucketMs = spanMinutes * 60 * 1000
  const sourceIntervalMs = inferIntervalMs(bars)
  const expectedCount = sourceIntervalMs !== null && bucketMs % sourceIntervalMs === 0
    ? bucketMs / sourceIntervalMs
    : null
  const aggregated = []
  let active = null

  function finishActiveBucket () {
    if (active === null) {
      return
    }
    const isComplete = expectedCount === null || (
      active.count === expectedCount &&
      active.firstSourceTimestamp === active.timestamp &&
      active.lastSourceTimestamp === active.timestamp + (expectedCount - 1) * sourceIntervalMs
    )
    if (isComplete) {
      aggregated.push({
        timestamp: active.timestamp,
        open: active.open,
        high: active.high,
        low: active.low,
        close: active.close,
        volume: active.volume
      })
    }
  }

  bars.forEach(bar => {
    const bucketTimestamp = Math.floor(bar.timestamp / bucketMs) * bucketMs
    if (active === null || active.timestamp !== bucketTimestamp) {
      finishActiveBucket()
      active = {
        timestamp: bucketTimestamp,
        open: bar.open,
        high: bar.high,
        low: bar.low,
        close: bar.close,
        volume: bar.volume,
        count: 1,
        firstSourceTimestamp: bar.timestamp,
        lastSourceTimestamp: bar.timestamp
      }
      return
    }
    active.high = Math.max(active.high, bar.high)
    active.low = Math.min(active.low, bar.low)
    active.close = bar.close
    active.volume += bar.volume
    active.count += 1
    active.lastSourceTimestamp = bar.timestamp
  })

  finishActiveBucket()
  NORMALIZED_BAR_LISTS.add(aggregated)
  return aggregated
}

function computeTrueRanges (bars) {
  return bars.map((bar, index) => {
    if (index === 0) {
      return bar.high - bar.low
    }
    const previousClose = bars[index - 1].close
    return Math.max(
      bar.high - bar.low,
      Math.abs(bar.high - previousClose),
      Math.abs(bar.low - previousClose)
    )
  })
}

export function computeExactAtr (bars, length) {
  const window = toPositiveInteger(length, 1)
  const trueRanges = computeTrueRanges(bars)
  const values = new Array(bars.length).fill(null)
  let ewma = null

  trueRanges.forEach((trueRange, index) => {
    ewma = ewma === null ? trueRange : ewma + (trueRange - ewma) / window
    if (index >= window - 1) {
      values[index] = ewma
    }
  })
  return values
}

function sameUtcDate (firstTimestamp, secondTimestamp) {
  const first = new Date(firstTimestamp)
  const second = new Date(secondTimestamp)
  return first.getUTCFullYear() === second.getUTCFullYear() &&
    first.getUTCMonth() === second.getUTCMonth() &&
    first.getUTCDate() === second.getUTCDate()
}

function getExitForBar (position, bar, barIndex, maximumHoldBars) {
  const isLong = position.side === 'long'
  if (isLong) {
    if (bar.open <= position.stop) {
      return { price: bar.open, reason: 'stop_gap' }
    }
    if (bar.open >= position.target) {
      return { price: bar.open, reason: 'target_gap' }
    }
    if (bar.low <= position.stop) {
      return { price: position.stop, reason: 'stop_loss' }
    }
    if (bar.high >= position.target) {
      return { price: position.target, reason: 'take_profit' }
    }
  } else {
    if (bar.open >= position.stop) {
      return { price: bar.open, reason: 'stop_gap' }
    }
    if (bar.open <= position.target) {
      return { price: bar.open, reason: 'target_gap' }
    }
    if (bar.high >= position.stop) {
      return { price: position.stop, reason: 'stop_loss' }
    }
    if (bar.low <= position.target) {
      return { price: position.target, reason: 'take_profit' }
    }
  }

  if (barIndex - position.entryBar >= maximumHoldBars) {
    return { price: bar.close, reason: 'maximum_hold' }
  }
  return null
}

function createTrade ({ position, exit, exitBar, exitTime, commissionPct, equityBefore }) {
  const direction = position.side === 'long' ? 1 : -1
  const grossPnl = (exit.price - position.entryPrice) * position.quantity * direction
  const exitFee = Math.abs(exit.price * position.quantity) * commissionPct / 100
  const fees = position.entryFee + exitFee
  const pnl = grossPnl - fees
  const notional = Math.abs(position.entryPrice * position.quantity)

  return {
    id: String(position.tradeNumber),
    signalTime: position.signalTime,
    entryTime: position.entryTime,
    exitTime,
    side: position.side,
    entryPrice: position.entryPrice,
    exitPrice: exit.price,
    quantity: position.quantity,
    grossPnl,
    fees,
    pnl,
    returnPct: notional > 0 ? pnl / notional * 100 : 0,
    exitReason: exit.reason,
    stopPrice: position.stop,
    targetPrice: position.target,
    stopDistance: position.stopDistance,
    signalBar: position.signalBar,
    entryBar: position.entryBar,
    exitBar,
    barsHeld: exitBar - position.entryBar,
    equityBefore,
    equityAfter: equityBefore + pnl
  }
}

export function runAtrExpansionBreakout (payload, rawConfig = {}) {
  const bars = normalizeBars(payload)
  const config = normalizeAtrExpansionConfig(rawConfig)
  const strategyName = `ExactBT ATR Expansion Breakout — ATR${config.atrWindow} Stop${config.atrStopMultiplier} RR${config.riskReward}`
  if (bars.length < 2) {
    return {
      strategy: strategyName,
      currency: config.currency,
      initialCapital: config.initialCapital,
      finalEquity: config.initialCapital,
      trades: [],
      openPosition: null,
      barsProcessed: bars.length,
      config
    }
  }

  let signalAtrEwma = null
  let stopAtrEwma = null
  const signalAtrWindow = []
  let signalAtrWindowSum = 0
  const highQueue = []
  const lowQueue = []
  let highHead = 0
  let lowHead = 0
  let previousUpper = null
  let previousLower = null

  let equity = config.initialCapital
  let position = null
  let pending = null
  let lastExitBar = -1
  let tradeNumber = 0
  const trades = []

  for (let index = 0; index < bars.length; index++) {
    const bar = bars[index]
    const previousBar = index > 0 ? bars[index - 1] : null
    const trueRange = previousBar === null
      ? bar.high - bar.low
      : Math.max(
          bar.high - bar.low,
          Math.abs(bar.high - previousBar.close),
          Math.abs(bar.low - previousBar.close)
        )

    signalAtrEwma = signalAtrEwma === null
      ? trueRange
      : signalAtrEwma + (trueRange - signalAtrEwma) / config.atrWindow
    stopAtrEwma = stopAtrEwma === null
      ? trueRange
      : stopAtrEwma + (trueRange - stopAtrEwma) / config.atrStopWindow

    const currentSignalAtr = index >= config.atrWindow - 1 ? signalAtrEwma : null
    const currentStopAtr = index >= config.atrStopWindow - 1 ? stopAtrEwma : null
    if (currentSignalAtr !== null) {
      signalAtrWindow.push(currentSignalAtr)
      signalAtrWindowSum += currentSignalAtr
      if (signalAtrWindow.length > config.atrMeanWindow) {
        signalAtrWindowSum -= signalAtrWindow.shift()
      }
    }
    const meanAtr = signalAtrWindow.length === config.atrMeanWindow
      ? signalAtrWindowSum / config.atrMeanWindow
      : null

    const previousIndex = index - 1
    if (previousIndex >= 0) {
      while (highQueue.length > highHead && bars[highQueue[highQueue.length - 1]].high <= previousBar.high) {
        highQueue.pop()
      }
      highQueue.push(previousIndex)
      while (lowQueue.length > lowHead && bars[lowQueue[lowQueue.length - 1]].low >= previousBar.low) {
        lowQueue.pop()
      }
      lowQueue.push(previousIndex)
    }

    const minimumIndex = index - config.breakoutLookback
    while (highHead < highQueue.length && highQueue[highHead] < minimumIndex) {
      highHead += 1
    }
    while (lowHead < lowQueue.length && lowQueue[lowHead] < minimumIndex) {
      lowHead += 1
    }

    const upper = index >= config.breakoutLookback && highHead < highQueue.length
      ? bars[highQueue[highHead]].high
      : null
    const lower = index >= config.breakoutLookback && lowHead < lowQueue.length
      ? bars[lowQueue[lowHead]].low
      : null

    if (pending !== null && pending.entryBar === index && position === null && equity > 0) {
      const notional = equity * config.positionSizePct / 100
      const quantity = notional / bar.open
      const entryFee = notional * config.commissionPct / 100
      const stopDistance = pending.stopDistance
      position = {
        tradeNumber: ++tradeNumber,
        side: pending.side,
        signalTime: pending.signalTime,
        signalBar: pending.signalBar,
        entryTime: bar.timestamp,
        entryBar: index,
        entryPrice: bar.open,
        quantity,
        entryFee,
        stopDistance,
        stop: pending.side === 'long' ? bar.open - stopDistance : bar.open + stopDistance,
        target: pending.side === 'long'
          ? bar.open + stopDistance * config.riskReward
          : bar.open - stopDistance * config.riskReward
      }
      pending = null
    }

    if (position !== null) {
      const exit = getExitForBar(position, bar, index, config.maximumHoldBars)
      if (exit !== null) {
        const trade = createTrade({
          position,
          exit,
          exitBar: index,
          exitTime: bar.timestamp,
          commissionPct: config.commissionPct,
          equityBefore: equity
        })
        equity = trade.equityAfter
        trades.push(trade)
        position = null
        lastExitBar = index
      }
    }

    if (
      position === null && pending === null && lastExitBar !== index && index < bars.length - 1 &&
      previousBar !== null && upper !== null && previousUpper !== null &&
      lower !== null && previousLower !== null && meanAtr !== null &&
      currentSignalAtr !== null && currentStopAtr !== null && currentStopAtr > 0
    ) {
      const atrExpanded = currentSignalAtr > meanAtr * config.expansionMultiplier
      if (atrExpanded) {
        const longSignal = bar.close > upper && previousBar.close <= previousUpper
        const shortSignal = bar.close < lower && previousBar.close >= previousLower
        const allowLong = config.side === 'both' || config.side === 'long'
        const allowShort = config.side === 'both' || config.side === 'short'
        const pendingAllowed = !config.cancelAcrossUtcDay || sameUtcDate(bar.timestamp, bars[index + 1].timestamp)

        if (pendingAllowed && longSignal && allowLong && !shortSignal) {
          pending = {
            side: 'long',
            signalTime: bar.timestamp,
            signalBar: index,
            entryBar: index + 1,
            stopDistance: currentStopAtr * config.atrStopMultiplier
          }
        } else if (pendingAllowed && shortSignal && allowShort && !longSignal) {
          pending = {
            side: 'short',
            signalTime: bar.timestamp,
            signalBar: index,
            entryBar: index + 1,
            stopDistance: currentStopAtr * config.atrStopMultiplier
          }
        }
      }
    }

    previousUpper = upper
    previousLower = lower

    if (highHead > 2048 && highHead * 2 > highQueue.length) {
      highQueue.splice(0, highHead)
      highHead = 0
    }
    if (lowHead > 2048 && lowHead * 2 > lowQueue.length) {
      lowQueue.splice(0, lowHead)
      lowHead = 0
    }
  }

  return {
    strategy: strategyName,
    currency: config.currency,
    initialCapital: config.initialCapital,
    finalEquity: equity,
    netPnl: equity - config.initialCapital,
    trades,
    openPosition: position,
    pendingSignal: pending,
    barsProcessed: bars.length,
    firstBarTime: bars[0].timestamp,
    lastBarTime: bars[bars.length - 1].timestamp,
    config
  }
}

export const ATR_EXPANSION_BREAKOUT_DEFAULTS = DEFAULT_CONFIG
