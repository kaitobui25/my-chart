import ChartImp from '../../src/Chart.ts'
import { createChartContextApi } from './chart-context.js'
import { createTradePlanOverlay } from './trade-plan-overlay.js'
import { mountAiChatPanel } from './ai-chat-panel.js'

let chart = null
const originalSetDataLoader = ChartImp.prototype.setDataLoader

ChartImp.prototype.setDataLoader = function (dataLoader) {
  chart = this
  return originalSetDataLoader.call(this, dataLoader)
}

try {
  await import('../app-bootstrap.js')
} finally {
  ChartImp.prototype.setDataLoader = originalSetDataLoader
}

if (chart === null) {
  throw new Error('AI bootstrap could not capture the chart instance.')
}

const contextApi = createChartContextApi(chart)
const tradePlanOverlay = createTradePlanOverlay(chart)
window.__MY_CHART_AI__ = Object.freeze({
  getContext: contextApi.getContext,
  captureScreenshot: contextApi.captureScreenshot,
  clearTradePlan: tradePlanOverlay.clear,
  renderTradePlan: tradePlanOverlay.render
})

mountAiChatPanel({ contextApi, tradePlanOverlay })
