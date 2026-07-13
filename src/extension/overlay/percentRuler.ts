/**
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at

 * http://www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { SymbolDefaultPrecisionConstants } from '../../common/SymbolInfo'
import { isNumber } from '../../common/utils/typeChecks'
import type { OverlayTemplate } from '../../component/Overlay'

import type { LineAttrs } from '../figure/line'
import type { RectAttrs } from '../figure/rect'
import type { TextAttrs } from '../figure/text'

const LABEL_PADDING = 8
const LABEL_WIDTH = 220
const LABEL_LINE_HEIGHT = 17
const LABEL_OFFSET = 10

function clamp (value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

function formatDuration (duration: number): string {
  const absDuration = Math.abs(duration)
  const seconds = Math.floor(absDuration / 1000)
  const days = Math.floor(seconds / 86400)
  const hours = Math.floor((seconds % 86400) / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const restSeconds = seconds % 60
  const parts: string[] = []
  if (days > 0) {
    parts.push(`${days}d`)
  }
  if (hours > 0) {
    parts.push(`${hours}h`)
  }
  if (minutes > 0) {
    parts.push(`${minutes}m`)
  }
  if (parts.length === 0 || restSeconds > 0) {
    parts.push(`${restSeconds}s`)
  }
  return `${duration < 0 ? '-' : ''}${parts.join(' ')}`
}

const percentRuler: OverlayTemplate = {
  name: 'percentRuler',
  totalStep: 3,
  needDefaultPointFigure: true,
  needDefaultXAxisFigure: true,
  needDefaultYAxisFigure: true,
  createPointFigures: ({ chart, coordinates, bounding, overlay, xAxis }) => {
    const points = overlay.points
    const startValue = points[0]?.value
    const endValue = points[1]?.value
    if (coordinates.length !== 2 || !isNumber(startValue) || !isNumber(endValue)) {
      return []
    }

    const [startCoordinate, endCoordinate] = coordinates
    const [startPoint, endPoint] = points
    const priceDelta = endValue - startValue
    const pricePercent = startValue === 0 ? null : priceDelta / startValue * 100
    const startDataIndex = xAxis?.convertFromPixel(startCoordinate.x) ?? startPoint.dataIndex
    const endDataIndex = xAxis?.convertFromPixel(endCoordinate.x) ?? endPoint.dataIndex
    const barCount = isNumber(startDataIndex) && isNumber(endDataIndex)
      ? Math.abs(Math.round(endDataIndex) - Math.round(startDataIndex))
      : 0
    const duration = isNumber(startPoint.timestamp) && isNumber(endPoint.timestamp)
      ? endPoint.timestamp - startPoint.timestamp
      : 0
    const visibleRange = chart.getVisibleRange()
    const visibleBarCount = Math.max(visibleRange.realTo - visibleRange.realFrom, visibleRange.to - visibleRange.from, 1)
    const horizontalPercent = barCount / visibleBarCount * 100
    const precision = chart.getSymbol()?.pricePrecision ?? SymbolDefaultPrecisionConstants.PRICE
    const formatPrice = (value: number): string => chart.getDecimalFold().format(
      chart.getThousandsSeparator().format(value.toFixed(precision))
    )
    const labelLines = [
      `Delta: ${formatPrice(priceDelta)}`,
      `Price: ${pricePercent === null ? 'n/a' : `${pricePercent.toFixed(2)}%`}`,
      `Bars: ${barCount}`,
      `Time: ${formatDuration(duration)}`,
      `Visible: ${horizontalPercent.toFixed(2)}%`
    ]
    const labelHeight = LABEL_PADDING * 2 + labelLines.length * LABEL_LINE_HEIGHT
    const labelLeftCandidate = endCoordinate.x + LABEL_OFFSET + LABEL_WIDTH <= bounding.width
      ? endCoordinate.x + LABEL_OFFSET
      : endCoordinate.x - LABEL_OFFSET - LABEL_WIDTH
    const labelLeft = clamp(labelLeftCandidate, 4, Math.max(4, bounding.width - LABEL_WIDTH - 4))
    const labelTop = clamp(
      Math.min(startCoordinate.y, endCoordinate.y) + LABEL_OFFSET,
      4,
      Math.max(4, bounding.height - labelHeight - 4)
    )
    const lines: LineAttrs[] = [
      { coordinates },
      { coordinates: [startCoordinate, { x: endCoordinate.x, y: startCoordinate.y }] },
      { coordinates: [{ x: endCoordinate.x, y: startCoordinate.y }, endCoordinate] }
    ]
    const rect: RectAttrs = {
      x: labelLeft,
      y: labelTop,
      width: LABEL_WIDTH,
      height: labelHeight
    }
    const texts: TextAttrs[] = labelLines.map((text, index) => ({
      x: labelLeft + LABEL_PADDING,
      y: labelTop + LABEL_PADDING + index * LABEL_LINE_HEIGHT,
      width: LABEL_WIDTH - LABEL_PADDING * 2,
      height: LABEL_LINE_HEIGHT,
      text
    }))

    return [
      {
        type: 'line',
        attrs: lines,
        styles: {
          color: '#d97706',
          size: 1,
          style: 'dashed',
          dashedValue: [4, 3]
        }
      },
      {
        type: 'rect',
        ignoreEvent: true,
        attrs: rect,
        styles: {
          style: 'stroke_fill',
          color: 'rgba(255, 251, 235, 0.94)',
          borderColor: 'rgba(120, 53, 15, 0.28)',
          borderSize: 1,
          borderRadius: 4
        }
      },
      {
        type: 'text',
        ignoreEvent: true,
        attrs: texts,
        styles: {
          color: '#5c3b09',
          size: 12,
          weight: 'normal',
          backgroundColor: 'transparent',
          borderSize: 0,
          paddingLeft: 0,
          paddingTop: 0,
          paddingRight: 0,
          paddingBottom: 0
        }
      }
    ]
  }
}

export default percentRuler
