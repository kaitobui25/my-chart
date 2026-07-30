export class FakeProvider {
  id = 'fake'
  label = 'Offline test provider'
  capabilities = { images: false, structuredOutput: true, sessions: false }

  status () {
    return { available: true, reason: 'Always available for UI and bridge tests.' }
  }

  async chat ({ context }) {
    const last = context?.candles?.at?.(-1)
    return {
      message: last?.close == null
        ? 'Offline test provider received no candle data.'
        : `Offline test provider received ${context.candleCount ?? context.candles?.length ?? 0} candles. Last close: ${last.close}.`,
      tradePlan: {
        decision: 'WAIT',
        confidence: 0,
        marketRegime: 'unknown',
        entryZone: null,
        stopLoss: null,
        targets: [],
        riskReward: null,
        expiryBars: 0,
        invalidation: '',
        reasons: ['This provider validates the UI and data pipeline only.'],
        warnings: ['Select Codex or Gemini for model analysis.']
      }
    }
  }
}
