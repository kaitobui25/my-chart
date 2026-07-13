/**
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { SymbolDefaultPrecisionConstants } from '../../common/SymbolInfo'
import { calcTextWidth } from '../../common/utils/canvas'
import { isNumber } from '../../common/utils/typeChecks'
import type { OverlayTemplate } from '../../component/Overlay'

import type { LineAttrs } from '../figure/line'
import type { RectAttrs } from '../figure/rect'
import type { TextAttrs } from '../figure/text'

const POSITIVE_COLOR = '#089981'
const POSITIVE_FILL_COLOR = 'rgba(8, 153, 129, 0.12)'
const POSITIVE_BORDER_COLOR = 'rgba(8, 153, 129, 0.72)'
const NEGATIVE_COLOR = '#f23645'
const NEGATIVE_FILL_COLOR = 'rgba(242, 54, 69, 0.12)'
const NEGATIVE_BORDER_COLOR = 'rgba(242, 54, 69, 0.72)'
const NEUTRAL_COLOR = '#64748b'
const NEUTRAL_FILL_COLOR = 'rgba(100, 116, 139, 0.10)'
const NEUTRAL_BORDER_COLOR = 'rgba(100, 116, 139, 0.65)'
const LABEL_FONT_SIZE = 12
const LABEL_FONT_WEIGHT = 600
const LABEL_HORIZONTAL_PADDING = 8
const LABEL_VERTICAL_PADDING = 5
const LABEL_GAP = 8
const BOUNDING_PADDING = 4

interface RulerPalette {
  color: string
  fillColor: string
  borderColor: string
}

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

function getPalette (priceDelta: number): RulerPalette {
  if (priceDelta > 0) {
    return {
      color: POSITIVE_COLOR,
      fillColor: POSITIVE_FILL_COLOR,
      borderColor: POSITIVE_BORDER_COLOR
    }
  }
  if (priceDelta < 0) {
    return {
      color: NEGATIVE_COLOR,
      fillColor: NEGATIVE_FILL_COLOR,
      borderColor: NEGATIVE_BORDER_COLOR
    }
  }
  return {
    color: NEUTRAL_COLOR,
    fillColor: NEUTRAL_FILL_COLOR,
    borderColor: NEUTRAL_BORDER_COLOR
  }
}

function getDirectionSymbol (priceDelta: number): string {
  if (priceDelta > 0) {
    return '▲'
  }
  if (priceDelta < 0) {
    return '▼'
  }
  return '•'
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
    const precision = chart.getSymbol()?.pricePrecision ?? SymbolDefaultPrecisionConstants.PRICE
    const formatPrice = (value: number): string => chart.getDecimalFold().format(
      chart.getThousandsSeparator().format(value.toFixed(precision))
    )
    const formattedDelta = `${priceDelta > 0 ? '+' : ''}${formatPrice(priceDelta)}`
    const formattedPercent = pricePercent === null
      ? 'n/a'
      : `${pricePercent > 0 ? '+' : ''}${pricePercent.toFixed(2)}%`
    const barsText = `${barCount} ${barCount === 1 ? 'bar' : 'bars'}`
    const label = `${getDirectionSymbol(priceDelta)} ${formattedPercent} · ${formattedDelta} · ${barsText} · ${formatDuration(duration)}`
    const palette = getPalette(priceDelta)

    const left = Math.min(startCoordinate.x, endCoordinate.x)
    const right = Math.max(startCoordinate.x, endCoordinate.x)
    const top = Math.min(startCoordinate.y, endCoordinate.y)
    const bottom = Math.max(startCoordinate.y, endCoordinate.y)
    const rangeRect: RectAttrs = {
      x: left,
      y: top,
      width: Math.max(right - left, 1),
      height: Math.max(bottom - top, 1)
    }
    const diagonal: LineAttrs = {
      coordinates: [startCoordinate, endCoordinate]
    }

    const measuredLabelWidth = calcTextWidth(label, LABEL_FONT_SIZE, LABEL_FONT_WEIGHT) + LABEL_HORIZONTAL_PADDING * 2
    const labelWidth = Math.min(measuredLabelWidth, Math.max(1, bounding.width - BOUNDING_PADDING * 2))
    const labelHeight = LABEL_FONT_SIZE + LABEL_VERTICAL_PADDING * 2
    const idealLabelCenterX = (left + right) / 2
    const labelCenterX = clamp(
      idealLabelCenterX,
      BOUNDING_PADDING + labelWidth / 2,
      Math.max(BOUNDING_PADDING + labelWidth / 2, bounding.width - BOUNDING_PADDING - labelWidth / 2)
    )
    const hasRoomAbove = top - LABEL_GAP - labelHeight >= BOUNDING_PADDING
    const idealLabelTop = hasRoomAbove ? top - LABEL_GAP - labelHeight : bottom + LABEL_GAP
    const labelTop = clamp(
      idealLabelTop,
      BOUNDING_PADDING,
      Math.max(BOUNDING_PADDING, bounding.height - BOUNDING_PADDING - labelHeight)
    )
    const labelText: TextAttrs = {
      x: labelCenterX,
      y: labelTop,
      width: labelWidth,
      height: labelHeight,
      text: label,
      align: 'center'
    }

    return [
      {
        type: 'rect',
        ignoreEvent: true,
        attrs: rangeRect,
        styles: {
          style: 'stroke_fill',
          color: palette.fillColor,
          borderColor: palette.borderColor,
          borderSize: 1,
          borderStyle: 'solid',
          borderRadius: 2
        }
      },
      {
        type: 'line',
        attrs: diagonal,
        styles: {
          color: palette.color,
          size: 1,
          style: 'dashed',
          dashedValue: [4, 3]
        }
      },
      {
        type: 'text',
        ignoreEvent: true,
        attrs: labelText,
        styles: {
          style: 'fill',
          color: '#ffffff',
          size: LABEL_FONT_SIZE,
          weight: LABEL_FONT_WEIGHT,
          backgroundColor: palette.color,
          borderSize: 0,
          borderRadius: 4,
          paddingLeft: LABEL_HORIZONTAL_PADDING,
          paddingTop: LABEL_VERTICAL_PADDING,
          paddingRight: LABEL_HORIZONTAL_PADDING,
          paddingBottom: LABEL_VERTICAL_PADDING
        }
      }
    ]
  }
}

export default percentRuler
