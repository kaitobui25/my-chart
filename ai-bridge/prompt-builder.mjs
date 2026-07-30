const COMMON_RULES = [
  'Use the supplied chart context as the source of truth for prices, candles, indicators, timeframe, and replay state.',
  'The candles array is the complete allowed history for this turn. Never infer or use future candles.',
  'Do not invent prices, indicator values, news, or unseen candles.',
  'Separate observed chart facts from inference.',
  'Reply in the language used by the user.'
]

const ANALYSIS_RULES = [
  'Produce a trade plan only for the current chart context.',
  'WAIT is a valid and preferred decision when the setup is unclear.',
  'Do not suggest leverage, position size, or removing a stop loss.',
  'LONG or SHORT requires a numeric entry zone, stop loss, at least one target, and a clear invalidation.',
  'Return JSON only and follow the trade-analysis schema exactly.'
]

const CHAT_RULES = [
  'Communicate naturally with the user about the chart and their question.',
  'Do not force a LONG, SHORT, WAIT, market-regime label, confidence score, or invalidation statement.',
  'Do not create a trade plan unless the user switches to Trade analysis mode.',
  'Return JSON only with one field: {"message":"your natural answer"}.'
]

function compactContext (context) {
  const source = context && typeof context === 'object' ? context : {}
  return {
    version: source.version,
    generatedAt: source.generatedAt,
    symbol: source.symbol,
    timeframe: source.timeframe,
    period: source.period,
    candleMode: source.candleMode,
    replay: source.replay,
    visibleRange: source.visibleRange,
    candleCount: source.candleCount,
    candles: Array.isArray(source.candles) ? source.candles : [],
    indicators: Array.isArray(source.indicators) ? source.indicators : []
  }
}

export function buildPrompt ({ mode = 'chat', message, context }) {
  const analyze = mode === 'analyze'
  const modeRules = analyze ? ANALYSIS_RULES : CHAT_RULES
  const responseShape = analyze
    ? '{"message":"concise explanation","tradePlan":{"decision":"LONG|SHORT|WAIT","confidence":0,"marketRegime":"trend|range|transition|unknown","entryZone":null,"stopLoss":null,"targets":[],"riskReward":null,"expiryBars":0,"invalidation":"","reasons":[],"warnings":[]}}'
    : '{"message":"natural chart-aware answer"}'

  return [
    analyze
      ? 'You are a cautious trade-analysis assistant embedded in a local BTCUSDT chart.'
      : 'You are an intelligent chart-aware assistant embedded in a local BTCUSDT chart.',
    ...COMMON_RULES.map(rule => `- ${rule}`),
    ...modeRules.map(rule => `- ${rule}`),
    '',
    `Task mode: ${analyze ? 'Trade analysis' : 'Normal chat'}`,
    `User request: ${message}`,
    '',
    'Required response shape:',
    responseShape,
    '',
    'Chart context JSON:',
    JSON.stringify(compactContext(context))
  ].join('\n')
}
