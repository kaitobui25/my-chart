const ANALYSIS_RULES = [
  'Use only the supplied chart context. Do not invent prices, indicators, news, or unseen candles.',
  'The candles array is the complete allowed history for this turn. Never infer or use future candles.',
  'WAIT is a valid and preferred decision when the setup is unclear.',
  'Do not suggest leverage, position size, or removing a stop loss.',
  'LONG or SHORT requires a numeric entry zone, stop loss, at least one target, and a clear invalidation.',
  'Separate observed facts from inference.',
  'Return JSON only and follow the requested schema exactly.'
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
  const requestedMode = mode === 'analyze' ? 'structured trade analysis' : 'chart question'
  return [
    'You are a cautious chart-analysis assistant embedded in a local BTCUSDT chart.',
    ...ANALYSIS_RULES.map(rule => `- ${rule}`),
    '',
    `Task mode: ${requestedMode}`,
    `User request: ${message}`,
    '',
    'Required response shape:',
    '{"message":"concise explanation","tradePlan":{"decision":"LONG|SHORT|WAIT","confidence":0,"marketRegime":"trend|range|transition|unknown","entryZone":null,"stopLoss":null,"targets":[],"riskReward":null,"expiryBars":0,"invalidation":"","reasons":[],"warnings":[]}}',
    '',
    'Chart context JSON:',
    JSON.stringify(compactContext(context))
  ].join('\n')
}
