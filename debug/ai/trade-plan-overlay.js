function createElement (className, text = '') {
  const element = document.createElement('div')
  element.className = className
  element.textContent = text
  return element
}

function finiteNumber (value) {
  return Number.isFinite(Number(value)) ? Number(value) : null
}

function normalizeEntryZone (entryZone) {
  const from = finiteNumber(entryZone?.from)
  const to = finiteNumber(entryZone?.to)
  if (from === null || to === null) return null
  return { from: Math.min(from, to), to: Math.max(from, to) }
}

export function createTradePlanOverlay (chart) {
  const chartDom = document.getElementById('chart')
  const host = document.createElement('div')
  host.id = 'ai-trade-plan-overlay'
  host.className = 'ai-trade-plan-overlay'
  chartDom?.appendChild(host)

  let currentPlan = null
  let animationFrame = 0

  function priceY (value, timestamp) {
    const coordinate = chart.convertToPixel?.({ timestamp, value }, { paneId: 'candle_pane', absolute: true })
    return Number.isFinite(coordinate?.y) ? coordinate.y : null
  }

  function addLine (kind, label, value, timestamp) {
    const y = priceY(value, timestamp)
    if (y === null) return
    const line = createElement(`ai-plan-line ai-plan-line-${kind}`)
    line.style.top = `${y}px`
    const text = createElement('ai-plan-line-label', `${label} ${value.toFixed(2)}`)
    line.appendChild(text)
    host.appendChild(line)
  }

  function draw () {
    animationFrame = 0
    host.replaceChildren()
    if (currentPlan === null || currentPlan.decision === 'WAIT') return

    const dataList = chart.getDataList?.() ?? []
    const timestamp = dataList.at(-1)?.timestamp
    if (!Number.isFinite(timestamp)) return

    const zone = normalizeEntryZone(currentPlan.entryZone)
    if (zone !== null) {
      const firstY = priceY(zone.from, timestamp)
      const secondY = priceY(zone.to, timestamp)
      if (firstY !== null && secondY !== null) {
        const entry = createElement('ai-plan-entry-zone')
        entry.style.top = `${Math.min(firstY, secondY)}px`
        entry.style.height = `${Math.max(2, Math.abs(secondY - firstY))}px`
        entry.appendChild(createElement('ai-plan-line-label', `ENTRY ${zone.from.toFixed(2)}–${zone.to.toFixed(2)}`))
        host.appendChild(entry)
      }
    }

    const stopLoss = finiteNumber(currentPlan.stopLoss)
    if (stopLoss !== null) addLine('stop', 'SL', stopLoss, timestamp)
    ;(Array.isArray(currentPlan.targets) ? currentPlan.targets : []).forEach((target, index) => {
      const value = finiteNumber(target)
      if (value !== null) addLine('target', `TP${index + 1}`, value, timestamp)
    })

    const badge = createElement('ai-plan-badge', `${currentPlan.provider ?? 'AI'} · ${currentPlan.decision} · ${currentPlan.confidence ?? 0}%`)
    host.appendChild(badge)
  }

  function scheduleDraw () {
    if (animationFrame !== 0) return
    animationFrame = window.requestAnimationFrame(draw)
  }

  function render (plan) {
    currentPlan = plan
    scheduleDraw()
  }

  function clear () {
    currentPlan = null
    if (animationFrame !== 0) window.cancelAnimationFrame(animationFrame)
    animationFrame = 0
    host.replaceChildren()
  }

  chart.subscribeAction?.('onScroll', scheduleDraw)
  chart.subscribeAction?.('onZoom', scheduleDraw)
  chart.subscribeAction?.('onVisibleRangeChange', scheduleDraw)
  window.addEventListener('resize', scheduleDraw)

  return Object.freeze({ render, clear })
}
