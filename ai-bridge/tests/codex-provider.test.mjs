import test from 'node:test'
import assert from 'node:assert/strict'
import { normalizeAccountStatus, normalizeModelList } from '../providers/codex-provider.mjs'

test('normalizes Codex model catalog and reasoning efforts', () => {
  const models = normalizeModelList({
    data: [{
      id: 'gpt-5.3-codex',
      displayName: 'GPT-5.3 Codex',
      defaultReasoningEffort: 'high',
      supportedReasoningEfforts: [{ reasoningEffort: 'low' }, { reasoningEffort: 'high' }, { reasoningEffort: 'xhigh' }]
    }]
  })
  assert.deepEqual(models, [{
    id: 'gpt-5.3-codex',
    label: 'GPT-5.3 Codex',
    defaultReasoningEffort: 'high',
    supportedReasoningEfforts: ['low', 'high', 'xhigh']
  }])
})

test('normalizes account quota for slash status', () => {
  const status = normalizeAccountStatus({
    accountResponse: { account: { type: 'chatgpt', email: 'user@example.com', planType: 'plus' }, requiresOpenaiAuth: true },
    rateLimitsResponse: {
      rateLimits: {
        primary: { usedPercent: 25, windowDurationMins: 300, resetsAt: 1730947200 },
        secondary: { usedPercent: 40, windowDurationMins: 10080, resetsAt: 1731552000 }
      },
      rateLimitResetCredits: { availableCount: 2, credits: [] }
    },
    model: 'gpt-5.3-codex',
    reasoningEffort: 'xhigh'
  })
  assert.equal(status.account.planType, 'plus')
  assert.equal(status.rateLimits.primary.remainingPercent, 75)
  assert.equal(status.resetCredits.availableCount, 2)
  assert.equal(status.selected.reasoningEffort, 'xhigh')
})
