This file is a merged representation of a subset of the codebase, containing files not matching ignore patterns, combined into a single document by Repomix.

# File Summary

## Purpose
This file contains a packed representation of a subset of the repository's contents that is considered the most important context.
It is designed to be easily consumable by AI systems for analysis, code review,
or other automated processes.

## File Format
The content is organized as follows:
1. This summary section
2. Repository information
3. Directory structure
4. Repository files (if enabled)
5. Multiple file entries, each consisting of:
  a. A header with the file path (## File: path/to/file)
  b. The full contents of the file in a code block

## Usage Guidelines
- This file should be treated as read-only. Any changes should be made to the
  original repository files, not this packed version.
- When processing this file, use the file path to distinguish
  between different files in the repository.
- Be aware that this file may contain sensitive information. Handle it with
  the same level of security as you would the original repository.

## Notes
- Some files may have been excluded based on .gitignore rules and Repomix's configuration
- Binary files are not included in this packed representation. Please refer to the Repository Structure section for a complete list of file paths, including binary files
- Files matching these patterns are excluded: .git, node_modules, dist, build, website, coverage, *.log, *.map, *.png, *.jpg, *.jpeg, *.gif, *.webp, *.ico
- Files matching patterns in .gitignore are excluded
- Files matching default ignore patterns are excluded
- Files are sorted by Git change count (files with more changes are at the bottom)

# Directory Structure
```
Chart.ts
common/Action.ts
common/Animation.ts
common/BarSpace.ts
common/Bounding.ts
common/Canvas.ts
common/Coordinate.ts
common/Crosshair.ts
common/Data.ts
common/DataLoader.ts
common/DeepPartial.ts
common/DeepRequired.ts
common/Eventful.ts
common/EventHandler.ts
common/ExcludePickPartial.ts
common/Hotkey.ts
common/Nullable.ts
common/Period.ts
common/PickPartial.ts
common/PickRequired.ts
common/Point.ts
common/Styles.ts
common/SymbolInfo.ts
common/TaskScheduler.ts
common/Updater.ts
common/utils/canvas.ts
common/utils/color.ts
common/utils/compatible.ts
common/utils/dom.ts
common/utils/format.ts
common/utils/id.ts
common/utils/logger.ts
common/utils/number.ts
common/utils/performance.ts
common/utils/platform.ts
common/utils/typeChecks.ts
common/VisibleRange.ts
component/Axis.ts
component/Figure.ts
component/Indicator.ts
component/Overlay.ts
component/XAxis.ts
component/YAxis.ts
Event.ts
extension/figure/arc.ts
extension/figure/circle.ts
extension/figure/index.ts
extension/figure/line.ts
extension/figure/path.ts
extension/figure/polygon.ts
extension/figure/rect.ts
extension/figure/text.ts
extension/hotkey/index.ts
extension/hotkey/scrollLeft.ts
extension/hotkey/scrollRight.ts
extension/hotkey/zoomIn.ts
extension/hotkey/zoomOut.ts
extension/i18n/en-US.ts
extension/i18n/index.ts
extension/i18n/zh-CN.ts
extension/indicator/averagePrice.ts
extension/indicator/awesomeOscillator.ts
extension/indicator/bias.ts
extension/indicator/bollingerBands.ts
extension/indicator/brar.ts
extension/indicator/bullAndBearIndex.ts
extension/indicator/commodityChannelIndex.ts
extension/indicator/currentRatio.ts
extension/indicator/differentOfMovingAverage.ts
extension/indicator/directionalMovementIndex.ts
extension/indicator/easeOfMovementValue.ts
extension/indicator/exponentialMovingAverage.ts
extension/indicator/index.ts
extension/indicator/momentum.ts
extension/indicator/movingAverage.ts
extension/indicator/movingAverageConvergenceDivergence.ts
extension/indicator/onBalanceVolume.ts
extension/indicator/priceAndVolumeTrend.ts
extension/indicator/psychologicalLine.ts
extension/indicator/rateOfChange.ts
extension/indicator/relativeStrengthIndex.ts
extension/indicator/simpleMovingAverage.ts
extension/indicator/stoch.ts
extension/indicator/stopAndReverse.ts
extension/indicator/tripleExponentiallySmoothedAverage.ts
extension/indicator/volume.ts
extension/indicator/volumeRatio.ts
extension/indicator/williamsR.ts
extension/overlay/brush.ts
extension/overlay/fibonacciLine.ts
extension/overlay/horizontalRayLine.ts
extension/overlay/horizontalSegment.ts
extension/overlay/horizontalStraightLine.ts
extension/overlay/index.ts
extension/overlay/parallelStraightLine.ts
extension/overlay/priceChannelLine.ts
extension/overlay/priceLine.ts
extension/overlay/rayLine.ts
extension/overlay/segment.ts
extension/overlay/simpleAnnotation.ts
extension/overlay/simpleTag.ts
extension/overlay/straightLine.ts
extension/overlay/verticalRayLine.ts
extension/overlay/verticalSegment.ts
extension/overlay/verticalStraightLine.ts
extension/styles/dark.ts
extension/styles/index.ts
extension/styles/light.ts
extension/x-axis/index.ts
extension/x-axis/normal.ts
extension/y-axis/index.ts
extension/y-axis/logarithm.ts
extension/y-axis/normal.ts
extension/y-axis/percentage.ts
index.ts
Options.ts
pane/CandlePane.ts
pane/DrawPane.ts
pane/IndicatorPane.ts
pane/Pane.ts
pane/SeparatorPane.ts
pane/types.ts
pane/XAxisPane.ts
Store.ts
view/AxisView.ts
view/CandleAreaView.ts
view/CandleBarView.ts
view/CandleHighLowPriceView.ts
view/CandleLastPriceLabelView.ts
view/CandleLastPriceLineView.ts
view/CandleTooltipView.ts
view/ChildrenView.ts
view/CrosshairFeatureView.ts
view/CrosshairHorizontalLabelView.ts
view/CrosshairLineView.ts
view/CrosshairVerticalLabelView.ts
view/GridView.ts
view/IndicatorLastValueView.ts
view/IndicatorTooltipView.ts
view/IndicatorView.ts
view/OverlayView.ts
view/OverlayXAxisView.ts
view/OverlayYAxisView.ts
view/View.ts
view/XAxisView.ts
view/YAxisView.ts
widget/CandleWidget.ts
widget/DrawWidget.ts
widget/IndicatorWidget.ts
widget/SeparatorWidget.ts
widget/types.ts
widget/Widget.ts
widget/XAxisWidget.ts
widget/YAxisWidget.ts
```

# Files

## File: Chart.ts
```typescript
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

import type Nullable from './common/Nullable'
import type DeepPartial from './common/DeepPartial'
import type PickPartial from './common/PickPartial'
import type Bounding from './common/Bounding'
import { createDefaultBounding } from './common/Bounding'
import type { KLineData } from './common/Data'
import type Coordinate from './common/Coordinate'
import type Point from './common/Point'
import { UpdateLevel } from './common/Updater'
import type Crosshair from './common/Crosshair'
import type { ActionType, ActionCallback } from './common/Action'
import type { DataLoader } from './common/DataLoader'
import type VisibleRange from './common/VisibleRange'
import type { Formatter, DecimalFold, Options, ThousandsSeparator, ZoomAnchor, ZoomAnchorType, Layout, LayoutBasicParams, LayoutPaneContentChild, LayoutPaneContentChildMultipleParams, Hotkey } from './Options'
import Animation from './common/Animation'
import { createId } from './common/utils/id'
import { createDom } from './common/utils/dom'
import { getPixelRatio } from './common/utils/canvas'
import { isString, isArray, isValid, isNumber } from './common/utils/typeChecks'
import { requestAnimationFrame, cancelAnimationFrame, DEFAULT_REQUEST_ID } from './common/utils/compatible'
import { logWarn } from './common/utils/logger'
import { binarySearchNearest } from './common/utils/number'
import type { Styles } from './common/Styles'
import type BarSpace from './common/BarSpace'
import type PickRequired from './common/PickRequired'
import type { SymbolInfo } from './common/SymbolInfo'
import type { Period } from './common/Period'

import ChartStore, { SCALE_MULTIPLIER, type Store } from './Store'

import CandlePane from './pane/CandlePane'
import IndicatorPane from './pane/IndicatorPane'
import XAxisPane from './pane/XAxisPane'
import type DrawPane from './pane/DrawPane'
import SeparatorPane from './pane/SeparatorPane'

import { type PaneOptions, PANE_MIN_HEIGHT, PaneIdConstants } from './pane/types'

import type AxisImp from './component/Axis'
import type { YAxis, YAxisOverride } from './component/YAxis'

import type { IndicatorFilter, Indicator, IndicatorCreate, IndicatorOverride } from './component/Indicator'
import type { OverlayFilter, Overlay, OverlayCreate, OverlayOverride } from './component/Overlay'
import type ExcludePickPartial from './common/ExcludePickPartial'
import { DEFAULT_AXIS_ID } from './component/Axis'

import { getIndicatorClass } from './extension/indicator/index'

import Event from './Event'
import type { XAxisOverride } from './component/XAxis'

export interface CreateIndicatorOptions {
  isStack?: boolean
  pane?: PaneOptions
  yAxis?: YAxisOverride
}

export type DomPosition = 'root' | 'main' | 'yAxis'

export interface ConvertFilter {
  paneId?: string
  yAxisId?: string
  absolute?: boolean
}

export interface DomFilter {
  paneId: string
  position?: DomPosition
}

export interface Chart extends Store {
  id: string
  getDom: (paneId?: string, position?: DomPosition) => Nullable<HTMLElement>
  getSize: (paneId?: string, position?: DomPosition) => Nullable<Bounding>
  createIndicator: (value: string | IndicatorCreate, options?: CreateIndicatorOptions) => Nullable<string>
  getIndicators: (filter?: IndicatorFilter) => Indicator[]
  createOverlay: (value: string | OverlayCreate | Array<string | OverlayCreate>) => Nullable<string> | Array<Nullable<string>>
  getOverlays: (filter?: OverlayFilter) => Overlay[]
  setPaneOptions: (options: PaneOptions) => void
  overrideYAxis: (xAxis: YAxisOverride) => void
  overrideXAxis: (yAxis: XAxisOverride) => void
  getPaneOptions: (id?: string) => Nullable<PaneOptions> | PaneOptions[]
  scrollByDistance: (distance: number, animationDuration?: number) => void
  scrollToRealTime: (animationDuration?: number) => void
  scrollToDataIndex: (dataIndex: number, animationDuration?: number) => void
  scrollToTimestamp: (timestamp: number, animationDuration?: number) => void
  zoomAtCoordinate: (scale: number, coordinate?: Coordinate, animationDuration?: number) => void
  zoomAtDataIndex: (scale: number, dataIndex: number, animationDuration?: number) => void
  zoomAtTimestamp: (scale: number, timestamp: number, animationDuration?: number) => void
  convertToPixel: (points: Partial<Point> | Array<Partial<Point>>, filter?: ConvertFilter) => Partial<Coordinate> | Array<Partial<Coordinate>>
  convertFromPixel: (coordinates: Array<Partial<Coordinate>>, filter?: ConvertFilter) => Partial<Point> | Array<Partial<Point>>
  executeAction: (type: ActionType, data: Crosshair) => void
  subscribeAction: (type: ActionType, callback: ActionCallback) => void
  unsubscribeAction: (type: ActionType, callback?: ActionCallback) => void
  getConvertPictureUrl: (includeOverlay?: boolean, type?: 'png' | 'jpeg' | 'bmp', backgroundColor?: string) => string
  resize: () => void
}

export default class ChartImp implements Chart {
  id: string

  private _container: HTMLElement
  private _chartContainer: HTMLElement
  private readonly _chartBounding = createDefaultBounding()
  private readonly _chartEvent: Event
  private readonly _chartStore: ChartStore
  private _drawPanes: DrawPane[] = []
  private readonly _candlePane: CandlePane
  private readonly _xAxisPane: XAxisPane
  private readonly _separatorPanes = new Map<DrawPane, SeparatorPane>()

  private _layoutUpdateOptions = {
    sort: true,
    measureHeight: true,
    measureWidth: true,
    secondMeasureWidth: false,
    update: true,
    buildYAxisTick: false,
    cacheYAxisWidth: false,
    forceBuildYAxisTick: false
  }

  private _layoutPending = false

  private _resizeObserver: Nullable<ResizeObserver> = null

  private _resizeRequestAnimationId = DEFAULT_REQUEST_ID

  private readonly _scheduleResize = (): void => {
    if (this._resizeRequestAnimationId === DEFAULT_REQUEST_ID) {
      this._resizeRequestAnimationId = requestAnimationFrame(() => {
        this._resizeRequestAnimationId = DEFAULT_REQUEST_ID
        if (
          this._chartBounding.width !== Math.floor(this._chartContainer.clientWidth) ||
          this._chartBounding.height !== Math.floor(this._chartContainer.clientHeight)
        ) {
          this.resize()
        }
      })
    }
  }

  private readonly _cacheYAxisWidth = { left: 0, right: 0 }

  constructor (container: HTMLElement, options?: Options) {
    this._initContainer(container)
    this._chartEvent = new Event(this._chartContainer, this)
    this._chartStore = new ChartStore(this, options)
    const defaultPaneOptions = this._getLayoutDefaultPaneOptions(this._chartStore.getLayoutBasicParams())
    const defaultYAxis = this._getLayoutDefaultYAxis(this._chartStore.getLayoutBasicParams())
    this._candlePane = this._createPane<CandlePane>(CandlePane, { ...defaultPaneOptions, id: PaneIdConstants.CANDLE })
    this._candlePane.createYAxis({ ...defaultYAxis, id: DEFAULT_AXIS_ID })
    this._xAxisPane = this._createPane<XAxisPane>(XAxisPane, { ...defaultPaneOptions, id: PaneIdConstants.X_AXIS, order: Number.MAX_SAFE_INTEGER })
    this._applyLayout(options?.layout)
    this._layout()
    this._initResizeListener()
  }

  private _initContainer (container: HTMLElement): void {
    this._container = container
    this._chartContainer = createDom('div', {
      position: 'relative',
      width: '100%',
      height: '100%',
      outline: 'none',
      borderStyle: 'none',
      cursor: 'crosshair',
      boxSizing: 'border-box',
      userSelect: 'none',
      webkitUserSelect: 'none',
      overflow: 'hidden',
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment -- ignore
      // @ts-expect-error
      msUserSelect: 'none',
      MozUserSelect: 'none',
      webkitTapHighlightColor: 'transparent'
    })
    this._chartContainer.tabIndex = 1
    container.appendChild(this._chartContainer)
    this._cacheChartBounding()
  }

  private _cacheChartBounding (): void {
    this._chartBounding.width = Math.floor(this._chartContainer.clientWidth)
    this._chartBounding.height = Math.floor(this._chartContainer.clientHeight)
  }

  private _initResizeListener (): void {
    if (isValid(ResizeObserver)) {
      this._resizeObserver = new ResizeObserver(() => {
        this._scheduleResize()
      })
      this._resizeObserver.observe(this._chartContainer)
    } else {
      window.addEventListener('resize', this._scheduleResize)
    }
  }

  private _createPane<P extends DrawPane> (
    DrawPaneClass: new (chart: Chart, options: PickRequired<PaneOptions, 'id'>) => P,
    options: PickRequired<PaneOptions, 'id'>
  ): P {
    const pane = new DrawPaneClass(this, options)
    this._drawPanes.push(pane)
    return pane
  }

  getDrawPaneById (paneId: string): Nullable<DrawPane> {
    if (paneId === PaneIdConstants.CANDLE) {
      return this._candlePane
    }
    if (paneId === PaneIdConstants.X_AXIS) {
      return this._xAxisPane
    }
    const pane = this._drawPanes.find(p => p.getId() === paneId)
    return pane ?? null
  }

  getContainer (): HTMLElement { return this._container }

  getChartStore (): ChartStore { return this._chartStore }

  getXAxisPane (): XAxisPane { return this._xAxisPane }

  getDrawPanes (): DrawPane[] { return this._drawPanes }

  getSeparatorPanes (): Map<DrawPane, SeparatorPane> { return this._separatorPanes }

  private _getLayoutDefaultPaneOptions (basicParams: LayoutBasicParams): PaneOptions {
    const options: PaneOptions = {}
    if (isNumber(basicParams.paneMinHeight)) {
      options.minHeight = basicParams.paneMinHeight
    }
    if (isNumber(basicParams.paneHeight)) {
      options.height = basicParams.paneHeight
    }
    return options
  }

  private _getLayoutDefaultYAxis (basicParams: LayoutBasicParams): YAxisOverride {
    const yAxis: YAxisOverride = {}
    if (isString(basicParams.yAxisPosition)) {
      yAxis.position = basicParams.yAxisPosition
    }
    if (isValid(basicParams.yAxisInside)) {
      yAxis.inside = basicParams.yAxisInside
    }
    return yAxis
  }

  private _createLayoutIndicator (
    paneId: string,
    content: LayoutPaneContentChild,
    paneOptions: PaneOptions,
    yAxis: YAxisOverride
  ): void {
    let indicator: string | IndicatorCreate = ''
    let contentYAxis: Nullable<Omit<YAxisOverride, 'paneId'>> = null
    if (isString(content)) {
      indicator = content
    } else if (isValid((content as LayoutPaneContentChildMultipleParams).indicator)) {
      const child = content as LayoutPaneContentChildMultipleParams
      indicator = child.indicator
      contentYAxis = child.yAxis ?? null
    } else {
      indicator = content as Omit<IndicatorCreate, 'paneId'>
    }
    this.createIndicator(
      indicator,
      {
        isStack: true,
        pane: { ...paneOptions, id: paneId },
        yAxis: { ...yAxis, ...contentYAxis }
      }
    )
  }

  private _applyLayout (layout?: Layout): void {
    if (!isValid(layout)) {
      return
    }

    const basicParams = this._chartStore.getLayoutBasicParams()

    const defaultPaneOptions = this._getLayoutDefaultPaneOptions(basicParams)
    const defaultYAxis = this._getLayoutDefaultYAxis(basicParams)

    const panes = layout.panes ?? []
    panes.forEach((pane, index) => {
      const paneOptions = { ...defaultPaneOptions, ...pane.options }
      switch (pane.type) {
        case 'candle': {
          this._candlePane.setOptions({ ...paneOptions, id: PaneIdConstants.CANDLE })
          this._candlePane.createYAxis({ ...defaultYAxis, id: DEFAULT_AXIS_ID, paneId: PaneIdConstants.CANDLE })
          pane.content?.forEach(content => {
            this._createLayoutIndicator(
              PaneIdConstants.CANDLE,
              content,
              { ...paneOptions, id: PaneIdConstants.CANDLE },
              defaultYAxis
            )
          })
          break
        }
        case 'indicator': {
          const paneId = paneOptions.id ?? createId(PaneIdConstants.INDICATOR)
          let currentPane = this.getDrawPaneById(paneId)
          if (!isValid(currentPane)) {
            currentPane = this._createPane(IndicatorPane, { ...paneOptions, id: paneId, order: paneOptions.order ?? index + 1 })
          } else {
            currentPane.setOptions({ ...paneOptions, id: paneId })
          }
          currentPane.createYAxis({ ...defaultYAxis, id: DEFAULT_AXIS_ID, paneId })
          pane.content?.forEach(content => {
            this._createLayoutIndicator(
              paneId,
              content,
              { ...paneOptions, id: paneId },
              defaultYAxis
            )
          })
          break
        }
        case 'xAxis': {
          this._xAxisPane.setOptions({ ...paneOptions, id: PaneIdConstants.X_AXIS })
          break
        }
      }
    })
  }

  layout (options: {
    sort?: boolean
    measureHeight?: boolean
    measureWidth?: boolean
    secondMeasureWidth?: boolean
    update?: boolean
    buildYAxisTick?: boolean
    cacheYAxisWidth?: boolean
    forceBuildYAxisTick?: boolean
  }): void {
    if (options.sort ?? false) {
      this._layoutUpdateOptions.sort = options.sort!
    }
    if (options.measureHeight ?? false) {
      this._layoutUpdateOptions.measureHeight = options.measureHeight!
    }
    if (options.measureWidth ?? false) {
      this._layoutUpdateOptions.measureWidth = options.measureWidth!
    }
    if (options.secondMeasureWidth ?? false) {
      this._layoutUpdateOptions.secondMeasureWidth = options.secondMeasureWidth!
    }
    if (options.update ?? false) {
      this._layoutUpdateOptions.update = options.update!
    }
    if (options.buildYAxisTick ?? false) {
      this._layoutUpdateOptions.buildYAxisTick = options.buildYAxisTick!
    }
    if (options.cacheYAxisWidth ?? false) {
      this._layoutUpdateOptions.cacheYAxisWidth = options.cacheYAxisWidth!
    }
    if (options.forceBuildYAxisTick ?? false) {
      this._layoutUpdateOptions.forceBuildYAxisTick = options.forceBuildYAxisTick!
    }
    if (!this._layoutPending) {
      this._layoutPending = true
      Promise.resolve().then(_ => {
        this._layout()
        this._layoutPending = false
      }).catch((_: unknown) => {
        // todo
      })
    }
  }

  private _layout (): void {
    const { sort, measureHeight, measureWidth, secondMeasureWidth, update, buildYAxisTick, cacheYAxisWidth, forceBuildYAxisTick } = this._layoutUpdateOptions
    if (sort) {
      while (isValid(this._chartContainer.firstChild)) {
        this._chartContainer.removeChild(this._chartContainer.firstChild)
      }
      this._separatorPanes.clear()
      this._drawPanes.sort((a, b) => a.getOptions().order - b.getOptions().order)
      let prevPane: Nullable<DrawPane> = null
      this._drawPanes.forEach(pane => {
        if (pane.getId() !== PaneIdConstants.X_AXIS) {
          if (isValid(prevPane)) {
            const separatorPane = new SeparatorPane(this, '', prevPane, pane)
            this._chartContainer.appendChild(separatorPane.getContainer())
            this._separatorPanes.set(pane, separatorPane)
          }
          prevPane = pane
        }
        this._chartContainer.appendChild(pane.getContainer())
      })
    }
    if (measureHeight) {
      const totalHeight = this._chartBounding.height
      const separatorSize = this.getStyles().separator.size
      const xAxisHeight = this._xAxisPane.getXAxisComponent().getAutoSize()
      const contentPanes = this._drawPanes.filter(pane => pane.getId() !== PaneIdConstants.X_AXIS)
      const maximizedPane = contentPanes.find(pane => pane.getOptions().state === 'maximize')
      let remainingHeight = Math.max(totalHeight - xAxisHeight, 0)
      const paneHeights = new Map<DrawPane, number>()
      let actualSeparatorSize = separatorSize
      if (isValid(maximizedPane)) {
        actualSeparatorSize = 0
        contentPanes.forEach(pane => {
          paneHeights.set(pane, pane === maximizedPane ? remainingHeight : 0)
        })
      } else {
        remainingHeight = Math.max(remainingHeight - this._separatorPanes.size * separatorSize, 0)
        const flexiblePane =
          contentPanes.find(pane => pane.getId() === PaneIdConstants.CANDLE && pane.getOptions().state === 'normal') ??
          contentPanes.find(pane => pane.getOptions().state === 'normal')
        contentPanes.forEach(pane => {
          if (pane === flexiblePane) {
            return
          }
          const options = pane.getOptions()
          let paneHeight = PANE_MIN_HEIGHT
          if (options.state === 'normal') {
            paneHeight = Math.max(options.minHeight, options.height)
            const availableHeight = Math.max(remainingHeight, 0)
            if (paneHeight > availableHeight) {
              paneHeight = availableHeight
            }
          }
          remainingHeight -= paneHeight
          paneHeights.set(pane, paneHeight)
        })
        if (isValid(flexiblePane)) {
          paneHeights.set(flexiblePane, Math.max(remainingHeight, 0))
        }
      }
      this._drawPanes.forEach(pane => {
        if (pane.getId() !== PaneIdConstants.X_AXIS) {
          pane.setBounding({ height: paneHeights.get(pane) ?? 0 })
        }
      })

      this._xAxisPane.setBounding({ height: xAxisHeight })

      let top = 0
      this._drawPanes.forEach(pane => {
        const separatorPane = this._separatorPanes.get(pane)
        if (isValid(separatorPane)) {
          separatorPane.setBounding({ height: actualSeparatorSize, top })
          top += actualSeparatorSize
        }
        pane.setBounding({ top })
        top += pane.getBounding().height
      })
    }

    const buildYAxisTickAndMeasureWidth = (): void => {
      let forceMeasureWidth = measureWidth
      if (buildYAxisTick || forceBuildYAxisTick) {
        this._drawPanes.forEach(pane => {
          pane.getYAxisComponents().forEach(axis => {
            const success = (axis as unknown as AxisImp).buildTicks(forceBuildYAxisTick)
            forceMeasureWidth ||= success
          })
        })
      }
      if (forceMeasureWidth) {
        const totalWidth = this._chartBounding.width
        const styles = this.getStyles()

        const leftOutsideYAxisWidths: number[] = []
        const leftInsideYAxisWidths: number[] = []
        const rightInsideYAxisWidths: number[] = []
        const rightOutsideYAxisWidths: number[] = []

        const updateColumnWidth = (widths: number[], index: number, width: number): void => {
          widths[index] = Math.max(widths[index] ?? 0, width)
        }

        this._drawPanes.forEach(pane => {
          const leftOutsideAxes: YAxis[] = []
          const leftInsideAxes: YAxis[] = []
          const rightInsideAxes: YAxis[] = []
          const rightOutsideAxes: YAxis[] = []
          if (pane.getId() !== PaneIdConstants.X_AXIS) {
            pane.getWidgetYAxisComponents().forEach(axis => {
              const yAxis = axis
              if (yAxis.position === 'left') {
                if (yAxis.inside) {
                  leftInsideAxes.push(yAxis)
                } else {
                  leftOutsideAxes.push(yAxis)
                }
              } else {
                if (yAxis.inside) {
                  rightInsideAxes.push(yAxis)
                } else {
                  rightOutsideAxes.push(yAxis)
                }
              }
            })
          }

          leftOutsideAxes.forEach((yAxis, index) => { updateColumnWidth(leftOutsideYAxisWidths, index, yAxis.getAutoSize()) })
          leftInsideAxes.forEach((yAxis, index) => { updateColumnWidth(leftInsideYAxisWidths, index, yAxis.getAutoSize()) })
          rightInsideAxes.forEach((yAxis, index) => { updateColumnWidth(rightInsideYAxisWidths, index, yAxis.getAutoSize()) })
          rightOutsideAxes.forEach((yAxis, index) => { updateColumnWidth(rightOutsideYAxisWidths, index, yAxis.getAutoSize()) })
        })

        let leftYAxisWidth = leftOutsideYAxisWidths.reduce((total, width) => total + width, 0)
        let rightYAxisWidth = rightOutsideYAxisWidths.reduce((total, width) => total + width, 0)

        if (cacheYAxisWidth) {
          leftYAxisWidth = Math.max(this._cacheYAxisWidth.left, leftYAxisWidth)
          rightYAxisWidth = Math.max(this._cacheYAxisWidth.right, rightYAxisWidth)
        }

        this._cacheYAxisWidth.left = leftYAxisWidth
        this._cacheYAxisWidth.right = rightYAxisWidth

        let mainWidth = totalWidth
        let mainLeft = 0
        let mainRight = 0
        mainWidth -= leftYAxisWidth
        mainLeft = leftYAxisWidth

        mainWidth -= rightYAxisWidth
        mainRight = rightYAxisWidth

        this._chartStore.setTotalBarSpace(mainWidth)

        const paneBounding = { width: totalWidth }
        const mainBounding = { width: mainWidth, left: mainLeft, right: mainRight }
        const leftYAxisBounding = { width: leftYAxisWidth }
        const rightYAxisBounding = { width: rightYAxisWidth }
        const separatorFill = styles.separator.fill
        let separatorBounding: Partial<Bounding> = {}
        if (!separatorFill) {
          separatorBounding = mainBounding
        } else {
          separatorBounding = paneBounding
        }
        this._drawPanes.forEach((pane) => {
          this._separatorPanes.get(pane)?.setBounding(separatorBounding)
          const yAxisBounding: Record<string, Partial<Bounding>> = {}
          let leftOutsideOffset = 0
          let leftInsideOffset = 0
          let rightInsideOffset = 0
          let rightOutsideOffset = 0
          const leftOutsideAxes: YAxis[] = []
          const leftInsideAxes: YAxis[] = []
          const rightInsideAxes: YAxis[] = []
          const rightOutsideAxes: YAxis[] = []
          if (pane.getId() !== PaneIdConstants.X_AXIS) {
            pane.getWidgetYAxisComponents().forEach(axis => {
              const yAxis = axis
              if (yAxis.position === 'left') {
                if (yAxis.inside) {
                  leftInsideAxes.push(yAxis)
                } else {
                  leftOutsideAxes.push(yAxis)
                }
              } else {
                if (yAxis.inside) {
                  rightInsideAxes.push(yAxis)
                } else {
                  rightOutsideAxes.push(yAxis)
                }
              }
            })
          }

          const paneLeftOutsideYAxisWidth = leftOutsideAxes.reduce((total, _yAxis, index) => total + (leftOutsideYAxisWidths[index] ?? 0), 0)
          leftOutsideOffset = leftYAxisWidth - paneLeftOutsideYAxisWidth
          for (let index = leftOutsideAxes.length - 1; index >= 0; index--) {
            const yAxis = leftOutsideAxes[index]
            const width = leftOutsideYAxisWidths[index] ?? 0
            yAxisBounding[yAxis.id] = { width, left: leftOutsideOffset }
            leftOutsideOffset += width
          }
          leftInsideAxes.forEach((yAxis, index) => {
            const width = leftInsideYAxisWidths[index] ?? 0
            yAxisBounding[yAxis.id] = { width, left: mainLeft + leftInsideOffset }
            leftInsideOffset += width
          })
          rightInsideAxes.forEach((yAxis, index) => {
            const width = rightInsideYAxisWidths[index] ?? 0
            rightInsideOffset += width
            yAxisBounding[yAxis.id] = { width, left: mainLeft + mainWidth - rightInsideOffset }
          })
          rightOutsideAxes.forEach((yAxis, index) => {
            const width = rightOutsideYAxisWidths[index] ?? 0
            yAxisBounding[yAxis.id] = { width, left: mainLeft + mainWidth + rightOutsideOffset }
            rightOutsideOffset += width
          })
          pane.setYAxesBounding(yAxisBounding)
          pane.setBounding(paneBounding, mainBounding, leftYAxisBounding, rightYAxisBounding)
        })
      }
    }
    buildYAxisTickAndMeasureWidth()
    if (secondMeasureWidth) {
      buildYAxisTickAndMeasureWidth()
    }
    if (update) {
      (this._xAxisPane.getXAxisComponent() as unknown as AxisImp).buildTicks(true)
      this.updatePane(UpdateLevel.All)
    }
    this._layoutUpdateOptions = {
      sort: false,
      measureHeight: false,
      measureWidth: false,
      secondMeasureWidth: false,
      update: false,
      buildYAxisTick: false,
      cacheYAxisWidth: false,
      forceBuildYAxisTick: false
    }
  }

  updatePane (level: UpdateLevel, paneId?: string): void {
    if (isValid(paneId)) {
      const pane = this.getDrawPaneById(paneId)
      pane?.update(level)
    } else {
      this._drawPanes.forEach(pane => {
        pane.update(level)
        this._separatorPanes.get(pane)?.update(level)
      })
    }
  }

  getDom (paneId?: string, position?: DomPosition): Nullable<HTMLElement> {
    if (isValid(paneId)) {
      const pane = this.getDrawPaneById(paneId)
      if (isValid(pane)) {
        const pos = position ?? 'root'
        switch (pos) {
          case 'root': {
            return pane.getContainer()
          }
          case 'main': {
            return pane.getMainWidget().getContainer()
          }
          case 'yAxis': {
            return pane.getYAxisWidget()?.getContainer() ?? null
          }
        }
      }
    } else {
      return this._chartContainer
    }
    return null
  }

  getSize (paneId?: string, position?: DomPosition): Nullable<Bounding> {
    if (isValid(paneId)) {
      const pane = this.getDrawPaneById(paneId)
      if (isValid(pane)) {
        const pos = position ?? 'root'
        switch (pos) {
          case 'root': {
            return pane.getBounding()
          }
          case 'main': {
            return pane.getMainWidget().getBounding()
          }
          case 'yAxis': {
            return pane.getYAxisWidget()?.getBounding() ?? null
          }
        }
      }
    } else {
      return this._chartBounding
    }
    return null
  }

  private _resetYAxisAutoCalcTickFlag (): void {
    this._drawPanes.forEach(pane => {
      pane.getYAxisComponents().forEach(axis => {
        (axis as unknown as AxisImp).setAutoCalcTickFlag(true)
      })
    })
  }

  setSymbol (symbol: PickPartial<SymbolInfo, 'pricePrecision' | 'volumePrecision'>): void {
    if (symbol !== this.getSymbol()) {
      this._resetYAxisAutoCalcTickFlag()
      this._chartStore.setSymbol(symbol)
    }
  }

  getSymbol (): Nullable<SymbolInfo> {
    return this._chartStore.getSymbol()
  }

  setPeriod (period: Period): void {
    if (period !== this.getPeriod()) {
      this._resetYAxisAutoCalcTickFlag()
      this._chartStore.setPeriod(period)
    }
  }

  getPeriod (): Nullable<Period> {
    return this._chartStore.getPeriod()
  }

  setStyles (value: string | DeepPartial<Styles>): void {
    this._setOptions(() => {
      this._chartStore.setStyles(value)
    })
  }

  getStyles (): Styles { return this._chartStore.getStyles() }

  setFormatter (formatter: Partial<Formatter>): void {
    this._setOptions(() => {
      this._chartStore.setFormatter(formatter)
    })
  }

  getFormatter (): Formatter { return this._chartStore.getFormatter() }

  setLocale (locale: string): void {
    this._setOptions(() => {
      this._chartStore.setLocale(locale)
    })
  }

  getLocale (): string { return this._chartStore.getLocale() }

  setTimezone (timezone: string): void {
    this._setOptions(() => {
      this._chartStore.setTimezone(timezone)
    })
  }

  getTimezone (): string { return this._chartStore.getTimezone() }

  setThousandsSeparator (thousandsSeparator: Partial<ThousandsSeparator>): void {
    this._setOptions(() => {
      this._chartStore.setThousandsSeparator(thousandsSeparator)
    })
  }

  getThousandsSeparator (): ThousandsSeparator { return this._chartStore.getThousandsSeparator() }

  setDecimalFold (decimalFold: Partial<DecimalFold>): void {
    this._setOptions(() => {
      this._chartStore.setDecimalFold(decimalFold)
    })
  }

  getDecimalFold (): DecimalFold { return this._chartStore.getDecimalFold() }

  setHotkey (hotkey: Partial<Hotkey>): void {
    this._chartStore.setHotkey(hotkey)
  }

  getHotkey (): Hotkey { return this._chartStore.getHotkey() }

  getHotKey (): Hotkey { return this._chartStore.getHotKey() }

  private _setOptions (fuc: () => void): void {
    fuc()
    this.layout({
      measureHeight: true,
      measureWidth: true,
      update: true,
      buildYAxisTick: true,
      forceBuildYAxisTick: true
    })
  }

  setOffsetRightDistance (distance: number): void {
    this._chartStore.setOffsetRightDistance(distance, true)
  }

  getOffsetRightDistance (): number {
    return this._chartStore.getOffsetRightDistance()
  }

  setMaxOffsetLeftDistance (distance: number): void {
    if (distance < 0) {
      logWarn('setMaxOffsetLeftDistance', 'distance', 'distance must greater than zero!!!')
      return
    }
    this._chartStore.setMaxOffsetLeftDistance(distance)
  }

  setMaxOffsetRightDistance (distance: number): void {
    if (distance < 0) {
      logWarn('setMaxOffsetRightDistance', 'distance', 'distance must greater than zero!!!')
      return
    }
    this._chartStore.setMaxOffsetRightDistance(distance)
  }

  setLeftMinVisibleBarCount (barCount: number): void {
    if (barCount < 0) {
      logWarn('setLeftMinVisibleBarCount', 'barCount', 'barCount must greater than zero!!!')
      return
    }
    this._chartStore.setLeftMinVisibleBarCount(Math.ceil(barCount))
  }

  setRightMinVisibleBarCount (barCount: number): void {
    if (barCount < 0) {
      logWarn('setRightMinVisibleBarCount', 'barCount', 'barCount must greater than zero!!!')
      return
    }
    this._chartStore.setRightMinVisibleBarCount(Math.ceil(barCount))
  }

  setBarSpace (space: number): void {
    this._chartStore.setBarSpace(space)
  }

  getBarSpace (): BarSpace {
    return this._chartStore.getBarSpace()
  }

  getVisibleRange (): VisibleRange {
    return this._chartStore.getVisibleRange()
  }

  private _syncIndicatorPanesByData (): boolean {
    let changed = false
    const usedPaneIds = new Set<string>([PaneIdConstants.CANDLE, PaneIdConstants.X_AXIS])
    const defaultPaneOptions = this._getLayoutDefaultPaneOptions(this._chartStore.getLayoutBasicParams())
    this._chartStore.getIndicatorsByFilter({}).forEach(indicator => {
      usedPaneIds.add(indicator.paneId)
      if (!isValid(this.getDrawPaneById(indicator.paneId))) {
        this._createPane(IndicatorPane, { ...defaultPaneOptions, id: indicator.paneId })
        changed = true
      }
    })

    const removePaneIds: string[] = []
    this._drawPanes.forEach(pane => {
      const paneId = pane.getId()
      if (!usedPaneIds.has(paneId)) {
        removePaneIds.push(paneId)
      }
    })
    removePaneIds.forEach(paneId => {
      const index = this._drawPanes.findIndex(pane => pane.getId() === paneId)
      const pane = this._drawPanes[index]
      if (isValid(pane)) {
        this._drawPanes.splice(index, 1)
        pane.destroy()
        changed = true
      }
    })
    return changed
  }

  private _syncYAxesByData (): boolean {
    let changed = false
    const defaultYAxis = this._getLayoutDefaultYAxis(this._chartStore.getLayoutBasicParams())
    this._drawPanes.forEach(pane => {
      const paneId = pane.getId()
      if (paneId === PaneIdConstants.X_AXIS) {
        return
      }
      const usedYAxisIds = new Set<string>()
      if (paneId === PaneIdConstants.CANDLE) {
        usedYAxisIds.add(DEFAULT_AXIS_ID)
      }
      this._chartStore.getIndicatorsByPaneId(paneId).forEach(indicator => {
        usedYAxisIds.add(indicator.yAxisId)
        if (!pane.hasYAxisComponent(indicator.yAxisId)) {
          pane.createYAxis({ ...defaultYAxis, id: indicator.yAxisId, paneId })
          changed = true
        }
      })
      pane.getYAxisComponents().forEach(yAxis => {
        if (!usedYAxisIds.has(yAxis.id)) {
          changed = pane.removeYAxis(yAxis.id) || changed
        }
      })
    })
    return changed
  }

  resetData (): void {
    this._chartStore.resetData()
  }

  getDataList (): KLineData[] {
    return this._chartStore.getDataList()
  }

  setDataLoader (dataLoader: DataLoader): void {
    this._resetYAxisAutoCalcTickFlag()
    this._chartStore.setDataLoader(dataLoader)
  }

  createIndicator (value: string | IndicatorCreate, options?: CreateIndicatorOptions): Nullable<string> {
    const indicator: ExcludePickPartial<Indicator, 'name'> = isString(value) ? { name: value } : value
    if (getIndicatorClass(indicator.name) === null) {
      logWarn('createIndicator', 'value', 'indicator not supported, you may need to use registerIndicator to add one!!!')
      return null
    }

    const paneId = options?.pane?.id ?? createId(PaneIdConstants.INDICATOR)
    const yAxisId = options?.yAxis?.id ?? DEFAULT_AXIS_ID

    indicator.paneId = paneId
    indicator.yAxisId = yAxisId

    if (!isString(indicator.id)) {
      indicator.id = createId(indicator.name)
    }

    const result = this._chartStore.addIndicator(indicator as ExcludePickPartial<Indicator, 'id' | 'name' | 'paneId'>, options?.isStack ?? false)
    if (result) {
      let shouldSort = false
      let pane = this.getDrawPaneById(paneId)
      const defaultPaneOptions = this._getLayoutDefaultPaneOptions(this._chartStore.getLayoutBasicParams())
      const defaultYAxis = this._getLayoutDefaultYAxis(this._chartStore.getLayoutBasicParams())
      if (!isValid(pane)) {
        pane = this._createPane(IndicatorPane, { ...defaultPaneOptions, ...options?.pane, id: paneId })
        shouldSort = true
      } else if (isValid(options?.pane)) {
        pane.setOptions({ ...options.pane, id: paneId })
        shouldSort = isNumber(options.pane.order)
      }
      pane.createYAxis({ ...defaultYAxis, ...options?.yAxis, id: yAxisId, paneId })
      this._syncYAxesByData()
      this.layout({
        sort: shouldSort,
        measureHeight: true,
        measureWidth: true,
        update: true,
        buildYAxisTick: true,
        forceBuildYAxisTick: true
      })
      return indicator.id
    }
    return null
  }

  overrideIndicator (override: IndicatorOverride): boolean {
    const indicators = this._chartStore.getIndicatorsByFilter(override)
    if (indicators.length === 0) {
      return false
    }
    const updated = this._chartStore.overrideIndicator(override)
    if (updated) {
      this.layout({
        measureWidth: true,
        update: true,
        buildYAxisTick: true,
        forceBuildYAxisTick: true
      })
    }
    return updated
  }

  getIndicators (filter?: IndicatorFilter): Indicator[] {
    return this._chartStore.getIndicatorsByFilter(filter ?? {})
  }

  removeIndicator (filter?: IndicatorFilter): boolean {
    const removed = this._chartStore.removeIndicator(filter ?? {})
    if (removed) {
      const panesChanged = this._syncIndicatorPanesByData()
      this._syncYAxesByData()
      this.layout({
        sort: panesChanged,
        measureHeight: panesChanged,
        measureWidth: true,
        update: true,
        buildYAxisTick: true,
        forceBuildYAxisTick: true
      })
    }
    return removed
  }

  createOverlay (value: string | OverlayCreate | Array<string | OverlayCreate>): Nullable<string> | Array<Nullable<string>> {
    const overlays: OverlayCreate[] = []
    const appointPaneFlags: boolean[] = []

    const build: ((overlay: OverlayCreate) => void) = overlay => {
      if (!isValid(overlay.paneId) || this.getDrawPaneById(overlay.paneId) === null) {
        overlay.paneId = PaneIdConstants.CANDLE
        appointPaneFlags.push(false)
      } else {
        appointPaneFlags.push(true)
      }
      overlays.push(overlay)
    }

    if (isString(value)) {
      build({ name: value })
    } else if (isArray<Array<string | OverlayCreate>>(value)) {
      (value as Array<string | OverlayCreate>).forEach(v => {
        let overlay: Nullable<OverlayCreate> = null
        if (isString(v)) {
          overlay = { name: v }
        } else {
          overlay = v
        }
        build(overlay)
      })
    } else {
      build(value as OverlayCreate)
    }
    const ids = this._chartStore.addOverlays(overlays, appointPaneFlags)
    if (isArray(value)) {
      return ids
    }
    return ids[0]
  }

  getOverlays (filter?: OverlayFilter): Overlay[] {
    return this._chartStore.getOverlaysByFilter(filter ?? {})
  }

  overrideOverlay (override: OverlayOverride): boolean {
    return this._chartStore.overrideOverlay(override)
  }

  removeOverlay (filter?: OverlayFilter): boolean {
    return this._chartStore.removeOverlay(filter ?? {})
  }

  setPaneOptions (options: PaneOptions): void {
    let shouldMeasureHeight = false
    let shouldLayout = false
    let shouldSort = false
    const validId = isValid(options.id)
    for (const currentPane of this._drawPanes) {
      const currentPaneId = currentPane.getId()
      if ((validId && options.id === currentPaneId) || !validId) {
        if (currentPaneId !== PaneIdConstants.X_AXIS) {
          const currentPaneOptions = currentPane.getOptions()
          const currentState = currentPaneOptions.state
          if (isNumber(options.height) && options.height > 0) {
            const minHeight = Math.max(options.minHeight ?? currentPaneOptions.minHeight, 0)
            const height = Math.max(minHeight, options.height)
            shouldLayout = true
            shouldMeasureHeight = true
            currentPane.setBounding({ height })
          }
          if (isValid(options.state)) {
            shouldLayout = true
            shouldMeasureHeight = true
            if (currentState === 'normal' && options.state !== 'normal') {
              currentPane.setOptions({ height: currentPane.getBounding().height })
            } else if (currentState !== 'normal' && options.state === 'normal' && !isNumber(options.height)) {
              currentPane.setBounding({
                height: Math.max(currentPaneOptions.minHeight, currentPaneOptions.height)
              })
            }
          }
        }
        if (isNumber(options.order)) {
          shouldLayout = true
          shouldSort = true
        }
        currentPane.setOptions(options)
        if (currentPaneId === options.id) {
          break
        }
      }
    }
    if (shouldLayout) {
      this.layout({
        sort: shouldSort,
        measureHeight: shouldMeasureHeight,
        measureWidth: true,
        update: true,
        buildYAxisTick: true,
        forceBuildYAxisTick: true
      })
    }
  }

  overrideYAxis (yAxis: YAxisOverride): void {
    const validPaneId = isValid(yAxis.paneId)
    let shouldLayout = false
    for (const currentPane of this._drawPanes) {
      const currentPaneId = currentPane.getId()
      if (currentPaneId !== PaneIdConstants.X_AXIS && ((validPaneId && yAxis.paneId === currentPaneId) || !validPaneId)) {
        currentPane.createYAxis(yAxis)
        shouldLayout = true
        if (currentPaneId === yAxis.paneId) {
          break
        }
      }
    }
    if (shouldLayout) {
      this.layout({
        measureWidth: true,
        update: true,
        buildYAxisTick: true,
        forceBuildYAxisTick: true
      })
    }
  }

  overrideXAxis (xAxis: XAxisOverride): void {
    this._xAxisPane.overrideXAxis(xAxis)
    this.layout({
      measureHeight: true,
      update: true,
      buildYAxisTick: true,
      forceBuildYAxisTick: true
    })
  }

  getPaneOptions (id?: string): Nullable<PaneOptions> | PaneOptions[] {
    if (isValid(id)) {
      const pane = this.getDrawPaneById(id)
      return pane?.getOptions() ?? null
    }
    return this._drawPanes.map(pane => pane.getOptions())
  }

  setZoomEnabled (enabled: boolean): void {
    this._chartStore.setZoomEnabled(enabled)
  }

  isZoomEnabled (): boolean {
    return this._chartStore.isZoomEnabled()
  }

  setZoomAnchor (anchor: ZoomAnchorType | Partial<ZoomAnchor>): void {
    this._chartStore.setZoomAnchor(anchor)
  }

  getZoomAnchor (): ZoomAnchor {
    return this._chartStore.getZoomAnchor()
  }

  setScrollEnabled (enabled: boolean): void {
    this._chartStore.setScrollEnabled(enabled)
  }

  isScrollEnabled (): boolean {
    return this._chartStore.isScrollEnabled()
  }

  scrollByDistance (distance: number, animationDuration?: number): void {
    const duration = isNumber(animationDuration) && animationDuration > 0 ? animationDuration : 0
    this._chartStore.startScroll()
    if (duration > 0) {
      const animation = new Animation({ duration })
      animation.doFrame(frameTime => {
        const progressDistance = distance * (frameTime / duration)
        this._chartStore.scroll(progressDistance)
      })
      animation.start()
    } else {
      this._chartStore.scroll(distance)
    }
  }

  scrollToRealTime (animationDuration?: number): void {
    const { bar: barSpace } = this._chartStore.getBarSpace()
    const difBarCount = this._chartStore.getLastBarRightSideDiffBarCount() - this._chartStore.getInitialOffsetRightDistance() / barSpace
    const distance = difBarCount * barSpace
    this.scrollByDistance(distance, animationDuration)
  }

  scrollToDataIndex (dataIndex: number, animationDuration?: number): void {
    const distance = (
      this._chartStore.getLastBarRightSideDiffBarCount() + (this.getDataList().length - 1 - dataIndex)
    ) * this._chartStore.getBarSpace().bar
    this.scrollByDistance(distance, animationDuration)
  }

  scrollToTimestamp (timestamp: number, animationDuration?: number): void {
    const dataIndex = binarySearchNearest(this.getDataList(), 'timestamp', timestamp)
    this.scrollToDataIndex(dataIndex, animationDuration)
  }

  zoomAtCoordinate (scale: number, coordinate?: Coordinate, animationDuration?: number): void {
    const duration = isNumber(animationDuration) && animationDuration > 0 ? animationDuration : 0
    const { bar: barSpace } = this._chartStore.getBarSpace()
    const scaleBarSpace = barSpace * scale
    const difSpace = scaleBarSpace - barSpace
    if (duration > 0) {
      let prevProgressBarSpace = 0
      const animation = new Animation({ duration })
      animation.doFrame(frameTime => {
        const progressBarSpace = difSpace * (frameTime / duration)
        const scale = (progressBarSpace - prevProgressBarSpace) / this._chartStore.getBarSpace().bar * SCALE_MULTIPLIER
        this._chartStore.zoom(scale, coordinate ?? null, 'main')
        prevProgressBarSpace = progressBarSpace
      })
      animation.start()
    } else {
      this._chartStore.zoom(difSpace / barSpace * SCALE_MULTIPLIER, coordinate ?? null, 'main')
    }
  }

  zoomAtDataIndex (scale: number, dataIndex: number, animationDuration?: number): void {
    const x = this._chartStore.dataIndexToCoordinate(dataIndex)
    this.zoomAtCoordinate(scale, { x, y: 0 }, animationDuration)
  }

  zoomAtTimestamp (scale: number, timestamp: number, animationDuration?: number): void {
    const dataIndex = binarySearchNearest(this.getDataList(), 'timestamp', timestamp)
    this.zoomAtDataIndex(scale, dataIndex, animationDuration)
  }

  convertToPixel (points: Partial<Point> | Array<Partial<Point>>, filter?: ConvertFilter): Partial<Coordinate> | Array<Partial<Coordinate>> {
    const { paneId = PaneIdConstants.CANDLE, yAxisId, absolute = false } = filter ?? {}
    let coordinates: Array<Partial<Coordinate>> = []
    if (paneId !== PaneIdConstants.X_AXIS) {
      const pane = this.getDrawPaneById(paneId)
      if (pane !== null) {
        const bounding = pane.getBounding()
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment -- ignore
        // @ts-expect-error
        const ps: Array<Partial<Point>> = [].concat(points)
        const xAxis = this._xAxisPane.getXAxisComponent()
        const yAxis = pane.getYAxisComponentById(yAxisId)
        coordinates = ps.map(point => {
          const coordinate: Partial<Coordinate> = {}
          let dataIndex = point.dataIndex
          if (isNumber(point.timestamp)) {
            dataIndex = this._chartStore.timestampToDataIndex(point.timestamp)
          }
          if (isNumber(dataIndex)) {
            coordinate.x = xAxis.convertToPixel(dataIndex)
          }
          if (isNumber(point.value)) {
            const y = yAxis.convertToPixel(point.value)
            coordinate.y = absolute ? bounding.top + y : y
          }
          return coordinate
        })
      }
    }
    return isArray(points) ? coordinates : (coordinates[0] ?? {})
  }

  convertFromPixel (coordinates: Array<Partial<Coordinate>>, filter?: ConvertFilter): Partial<Point> | Array<Partial<Point>> {
    const { paneId = PaneIdConstants.CANDLE, yAxisId, absolute = false } = filter ?? {}
    let points: Array<Partial<Point>> = []
    if (paneId !== PaneIdConstants.X_AXIS) {
      const pane = this.getDrawPaneById(paneId)
      if (pane !== null) {
        const bounding = pane.getBounding()
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment -- ignore
        // @ts-expect-error
        const cs: Array<Partial<Coordinate>> = [].concat(coordinates)
        const xAxis = this._xAxisPane.getXAxisComponent()
        const yAxis = pane.getYAxisComponentById(yAxisId)
        points = cs.map(coordinate => {
          const point: Partial<Point> = {}
          if (isNumber(coordinate.x)) {
            const dataIndex = xAxis.convertFromPixel(coordinate.x)
            point.dataIndex = dataIndex
            point.timestamp = this._chartStore.dataIndexToTimestamp(dataIndex) ?? undefined
          }
          if (isNumber(coordinate.y)) {
            const y = absolute ? coordinate.y - bounding.top : coordinate.y
            point.value = yAxis.convertFromPixel(y)
          }
          return point
        })
      }
    }
    return isArray(coordinates) ? points : (points[0] ?? {})
  }

  executeAction (type: ActionType, data: Nullable<Crosshair>): void {
    switch (type) {
      case 'onCrosshairChange': {
        let crosshair: Nullable<Crosshair> = null
        if (isValid(data)) {
          crosshair = { ...data }
          crosshair.paneId ??= PaneIdConstants.CANDLE
        }
        this._chartStore.setCrosshair(crosshair, { notExecuteAction: true })
        break
      }
      default: { break }
    }
  }

  subscribeAction (type: ActionType, callback: ActionCallback): void {
    this._chartStore.subscribeAction(type, callback)
  }

  unsubscribeAction (type: ActionType, callback?: ActionCallback): void {
    this._chartStore.unsubscribeAction(type, callback)
  }

  getConvertPictureUrl (includeOverlay?: boolean, type?: 'png' | 'jpeg' | 'bmp', backgroundColor?: string): string {
    const { width, height } = this._chartBounding
    const canvas = createDom('canvas', {
      width: `${width}px`,
      height: `${height}px`,
      boxSizing: 'border-box'
    })
    const ctx = canvas.getContext('2d')!
    const pixelRatio = getPixelRatio(canvas)
    canvas.width = width * pixelRatio
    canvas.height = height * pixelRatio
    ctx.scale(pixelRatio, pixelRatio)

    ctx.fillStyle = backgroundColor ?? '#FFFFFF'
    ctx.fillRect(0, 0, width, height)
    const overlayFlag = includeOverlay ?? false
    this._drawPanes.forEach(pane => {
      const separatorPane = this._separatorPanes.get(pane)
      if (isValid(separatorPane)) {
        const separatorBounding = separatorPane.getBounding()
        ctx.drawImage(
          separatorPane.getImage(overlayFlag),
          separatorBounding.left, separatorBounding.top, separatorBounding.width, separatorBounding.height
        )
      }

      const bounding = pane.getBounding()
      ctx.drawImage(
        pane.getImage(overlayFlag),
        0, bounding.top, width, bounding.height
      )
    })
    return canvas.toDataURL(`image/${type ?? 'jpeg'}`)
  }

  resize (): void {
    this._cacheChartBounding()
    this.layout({
      measureHeight: true,
      measureWidth: true,
      secondMeasureWidth: true,
      update: true,
      buildYAxisTick: true,
      forceBuildYAxisTick: true
    })
  }

  destroy (): void {
    if (this._resizeRequestAnimationId !== DEFAULT_REQUEST_ID) {
      cancelAnimationFrame(this._resizeRequestAnimationId)
      this._resizeRequestAnimationId = DEFAULT_REQUEST_ID
    }
    if (isValid(this._resizeObserver)) {
      this._resizeObserver.disconnect()
      this._resizeObserver = null
    } else {
      window.removeEventListener('resize', this._scheduleResize)
    }
    this._chartEvent.destroy()
    this._drawPanes.forEach(pane => {
      pane.destroy()
    })
    this._drawPanes = []
    this._separatorPanes.clear()
    this._chartStore.destroy()
    this._container.removeChild(this._chartContainer)
  }
}
```

## File: common/Action.ts
```typescript
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

import { isFunction } from './utils/typeChecks'

export type ActionCallback = (data?: unknown) => void

export type ActionType = 'onZoom' | 'onScroll' | 'onVisibleRangeChange' | 'onCandleTooltipFeatureClick' | 'onIndicatorTooltipFeatureClick'| 'onCrosshairFeatureClick' | 'onCrosshairChange' | 'onCandleBarClick' | 'onPaneDrag'
export default class Action {
  private _callbacks: ActionCallback[] = []

  subscribe (callback: ActionCallback): void {
    const index = this._callbacks.indexOf(callback)
    if (index < 0) {
      this._callbacks.push(callback)
    }
  }

  unsubscribe (callback?: ActionCallback): void {
    if (isFunction(callback)) {
      const index = this._callbacks.indexOf(callback)
      if (index > -1) {
        this._callbacks.splice(index, 1)
      }
    } else {
      this._callbacks = []
    }
  }

  execute (data?: unknown): void {
    this._callbacks.forEach(callback => {
      callback(data)
    })
  }

  isEmpty (): boolean {
    return this._callbacks.length === 0
  }
}
```

## File: common/Animation.ts
```typescript
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

import type Nullable from './Nullable'
import { requestAnimationFrame } from './utils/compatible'
import { merge } from './utils/typeChecks'

type AnimationDoFrameCallback = (frameTime: number) => void

interface AnimationOptions {
  duration: number
  iterationCount: number
}

export default class Animation {
  private readonly _options = { duration: 500, iterationCount: 1 }

  private _doFrameCallback: Nullable<AnimationDoFrameCallback>

  private _currentIterationCount = 0
  private _running = false

  private _time = 0

  constructor (options?: Partial<AnimationOptions>) {
    merge(this._options, options)
  }

  _loop (): void {
    this._running = true
    const step: (() => void) = () => {
      if (this._running) {
        const diffTime = new Date().getTime() - this._time
        if (diffTime < this._options.duration) {
          this._doFrameCallback?.(diffTime)
          requestAnimationFrame(step)
        } else {
          this.stop()
          this._currentIterationCount++
          if (this._currentIterationCount < this._options.iterationCount) {
            this.start()
          }
        }
      }
    }
    requestAnimationFrame(step)
  }

  doFrame (callback: AnimationDoFrameCallback): this {
    this._doFrameCallback = callback
    return this
  }

  setDuration (duration: number): this {
    this._options.duration = duration
    return this
  }

  setIterationCount (iterationCount: number): this {
    this._options.iterationCount = iterationCount
    return this
  }

  start (): void {
    if (!this._running) {
      this._time = new Date().getTime()
      this._loop()
    }
  }

  stop (): void {
    if (this._running) {
      this._doFrameCallback?.(this._options.duration)
    }
    this._running = false
  }
}
```

## File: common/BarSpace.ts
```typescript
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

export default interface BarSpace {
  bar: number
  halfBar: number
  gapBar: number
  halfGapBar: number
}
```

## File: common/Bounding.ts
```typescript
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

import { isValid, merge } from './utils/typeChecks'

export default interface Bounding {
  width: number
  height: number
  left: number
  right: number
  top: number
  bottom: number
}

export function createDefaultBounding (bounding?: Partial<Bounding>): Bounding {
  const defaultBounding: Bounding = {
    width: 0,
    height: 0,
    left: 0,
    right: 0,
    top: 0,
    bottom: 0
  }
  if (isValid(bounding)) {
    merge(defaultBounding, bounding)
  }
  return defaultBounding
}
```

## File: common/Canvas.ts
```typescript
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

import { getPixelRatio } from './utils/canvas'
import { createDom } from './utils/dom'
import { isValid } from './utils/typeChecks'
import { requestAnimationFrame, DEFAULT_REQUEST_ID } from './utils/compatible'

type DrawListener = () => void

async function isSupportedDevicePixelContentBox (): Promise<boolean> {
  return await new Promise((resolve: (val: boolean) => void) => {
    const ro = new ResizeObserver((entries: ResizeObserverEntry[]) => {
      resolve(entries.every(entry => 'devicePixelContentBoxSize' in entry))
      ro.disconnect()
    })
    ro.observe(document.body, { box: 'device-pixel-content-box' })
  }).catch(() => false)
}

export default class Canvas {
  private readonly _element: HTMLCanvasElement
  private _resizeObserver: ResizeObserver
  private _mediaQueryList: MediaQueryList

  private readonly _ctx: CanvasRenderingContext2D

  private readonly _listener: DrawListener

  private _supportedDevicePixelContentBox = false

  private _width = 0
  private _height = 0

  private _pixelWidth = 0
  private _pixelHeight = 0

  private _nextPixelWidth = 0
  private _nextPixelHeight = 0

  private _requestAnimationId = DEFAULT_REQUEST_ID

  private readonly _mediaQueryListener: () => void = () => {
    const pixelRatio = getPixelRatio(this._element)
    this._nextPixelWidth = Math.round(this._element.clientWidth * pixelRatio)
    this._nextPixelHeight = Math.round(this._element.clientHeight * pixelRatio)
    this._resetPixelRatio()
  }

  constructor (style: Partial<CSSStyleDeclaration>, listener: DrawListener) {
    this._listener = listener
    this._element = createDom('canvas', style)
    this._ctx = this._element.getContext('2d')!
    isSupportedDevicePixelContentBox().then(result => {
      this._supportedDevicePixelContentBox = result
      if (result) {
        this._resizeObserver = new ResizeObserver((entries: ResizeObserverEntry[]) => {
          const entry = entries.find((entry: ResizeObserverEntry) => entry.target === this._element)
          const size = entry?.devicePixelContentBoxSize[0]
          if (isValid(size)) {
            this._nextPixelWidth = size.inlineSize
            this._nextPixelHeight = size.blockSize
            if (this._pixelWidth !== this._nextPixelWidth || this._pixelHeight !== this._nextPixelHeight) {
              this._resetPixelRatio()
            }
          }
        })
        this._resizeObserver.observe(this._element, { box: 'device-pixel-content-box' })
      } else {
        this._mediaQueryList = window.matchMedia(`(resolution: ${getPixelRatio(this._element)}dppx)`)
        // eslint-disable-next-line @typescript-eslint/no-deprecated -- ignore
        this._mediaQueryList.addListener(this._mediaQueryListener)
      }
    }).catch((_: unknown) => false)
  }

  private _resetPixelRatio (): void {
    this._executeListener(() => {
      const width = this._element.clientWidth
      const height = this._element.clientHeight
      this._width = width
      this._height = height
      this._pixelWidth = this._nextPixelWidth
      this._pixelHeight = this._nextPixelHeight
      this._element.width = this._nextPixelWidth
      this._element.height = this._nextPixelHeight
      const horizontalPixelRatio = this._nextPixelWidth / width
      const verticalPixelRatio = this._nextPixelHeight / height
      this._ctx.scale(horizontalPixelRatio, verticalPixelRatio)
    })
  }

  private _executeListener (fn?: () => void): void {
    if (this._requestAnimationId === DEFAULT_REQUEST_ID) {
      this._requestAnimationId = requestAnimationFrame(() => {
        this._ctx.clearRect(0, 0, this._width, this._height)
        fn?.()
        this._listener()
        this._requestAnimationId = DEFAULT_REQUEST_ID
      })
    }
  }

  update (w: number, h: number): void {
    if (this._width !== w || this._height !== h) {
      this._element.style.width = `${w}px`
      this._element.style.height = `${h}px`
      if (!this._supportedDevicePixelContentBox) {
        const pixelRatio = getPixelRatio(this._element)
        this._nextPixelWidth = Math.round(w * pixelRatio)
        this._nextPixelHeight = Math.round(h * pixelRatio)
        this._resetPixelRatio()
      }
    } else {
      this._executeListener()
    }
  }

  getElement (): HTMLCanvasElement {
    return this._element
  }

  getContext (): CanvasRenderingContext2D {
    return this._ctx
  }

  destroy (): void {
    if (isValid(this._resizeObserver)) {
      this._resizeObserver.unobserve(this._element)
    }
    if (isValid(this._mediaQueryList)) {
      // eslint-disable-next-line @typescript-eslint/no-deprecated -- ignore
      this._mediaQueryList.removeListener(this._mediaQueryListener)
    }
  }
}
```

## File: common/Coordinate.ts
```typescript
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

export default interface Coordinate {
  x: number
  y: number
}

export function getDistance (coordinate1: Coordinate, coordinate2: Coordinate): number {
  const xDif = coordinate1.x - coordinate2.x
  const yDif = coordinate1.y - coordinate2.y
  return Math.sqrt(xDif * xDif + yDif * yDif)
}
```

## File: common/Crosshair.ts
```typescript
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

import type Coordinate from './Coordinate'
import type { KLineData } from './Data'

export default interface Crosshair extends Partial<Coordinate> {
  paneId?: string
  realX?: number
  timestamp?: number
  kLineData?: KLineData
  dataIndex?: number
  realDataIndex?: number
}
```

## File: common/Data.ts
```typescript
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

import type Nullable from './Nullable'

export interface NeighborData<D> {
  prev: D
  current: D
  next: D
}

export type Timestamp = number

export interface KLineData {
  timestamp: Timestamp
  open: number
  high: number
  low: number
  close: number
  volume?: number
  turnover?: number
  [key: string]: unknown
}

export interface VisibleRangeData {
  dataIndex: number
  x: number
  data: NeighborData<Nullable<KLineData>>
}
```

## File: common/DataLoader.ts
```typescript
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

import type Nullable from './Nullable'
import type { KLineData } from './Data'
import type { SymbolInfo } from './SymbolInfo'
import type { Period } from './Period'

export type DataLoadType = 'init' | 'forward' | 'backward' | 'update'

export type DataLoadMore = boolean | {
  backward?: boolean
  forward?: boolean
}

export interface DataLoaderGetBarsParams {
  type: DataLoadType
  timestamp: Nullable<number>
  symbol: SymbolInfo
  period: Period
  callback: (data: KLineData[], more?: DataLoadMore) => void
}

export interface DataLoaderSubscribeBarParams {
  symbol: SymbolInfo
  period: Period
  callback: (data: KLineData) => void
}

export type DataLoaderUnsubscribeBarParams = Omit<DataLoaderSubscribeBarParams, 'callback'>

export interface DataLoader {
  getBars: (params: DataLoaderGetBarsParams) => void | Promise<void>
  subscribeBar?: (params: DataLoaderSubscribeBarParams) => void
  unsubscribeBar?: (params: DataLoaderUnsubscribeBarParams) => void
}
```

## File: common/DeepPartial.ts
```typescript
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

type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends Array<infer U>
    ? Array<DeepPartial<U>>
    : T[P] extends ReadonlyArray<infer X>
      ? ReadonlyArray<DeepPartial<X>>
      : T[P] extends object
        ? DeepPartial<T[P]>
        : T[P]
}

export default DeepPartial
```

## File: common/DeepRequired.ts
```typescript
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

type DeepRequired<T> = {
  [P in keyof T]-?: T[P] extends Array<infer U>
    ? Array<DeepRequired<U>>
    : T[P] extends ReadonlyArray<infer X>
      ? ReadonlyArray<DeepRequired<X>>
      : T[P] extends object
        ? DeepRequired<T[P]>
        : T[P]
}

export default DeepRequired
```

## File: common/Eventful.ts
```typescript
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

import { isValid } from './utils/typeChecks'

import type { EventName, MouseTouchEvent, MouseTouchEventCallback } from './EventHandler'

export interface EventDispatcher {
  dispatchEvent: (name: EventName, event: MouseTouchEvent) => boolean
}

export default abstract class Eventful implements EventDispatcher {
  private _children: Eventful[] = []

  private readonly _callbacks = new Map<EventName, MouseTouchEventCallback>()

  registerEvent (name: EventName, callback: MouseTouchEventCallback): this {
    this._callbacks.set(name, callback)
    return this
  }

  onEvent (name: EventName, event: MouseTouchEvent): boolean {
    const callback = this._callbacks.get(name)
    if (isValid(callback) && this.checkEventOn(event)) {
      return callback(event)
    }
    return false
  }

  abstract checkEventOn (event: MouseTouchEvent): boolean

  protected dispatchEventToChildren (name: EventName, event: MouseTouchEvent): boolean {
    const start = this._children.length - 1
    if (start > -1) {
      for (let i = start; i > -1; i--) {
        if (this._children[i].dispatchEvent(name, event)) {
          return true
        }
      }
    }
    return false
  }

  dispatchEvent (name: EventName, event: MouseTouchEvent): boolean {
    if (this.dispatchEventToChildren(name, event)) {
      return true
    }
    return this.onEvent(name, event)
  }

  addChild (eventful: Eventful): this {
    this._children.push(eventful)
    return this
  }

  clear (): void {
    this._children = []
  }
}
```

## File: common/EventHandler.ts
```typescript
/* eslint-disable eslint-comments/require-description -- ignore */

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

/**
 * This file uses most of the logic of lightweight-charts/mouse-event-handler.ts(https://github.com/tradingview/lightweight-charts) for reference.
 * Makes some modifications to add some events.
 * The use of the source code of this file is also subject to the terms
 * and consitions of the license of "lightweight-charts" (Apache License V2, see
 * </licenses/LICENSE-lightweight-charts>).
 */

import type Coordinate from './Coordinate'

import type Nullable from './Nullable'

import { isFF, isIOS } from './utils/platform'
import { isValid } from './utils/typeChecks'

export interface MouseTouchEvent extends Coordinate {
  pageX: number
  pageY: number
  isTouch?: boolean
  preventDefault?: () => void
}

export type MouseTouchEventCallback = (event: MouseTouchEvent, other?: number) => boolean

export interface EventHandler {
  pinchStartEvent?: MouseTouchEventCallback
  pinchEvent?: MouseTouchEventCallback
  pinchEndEvent?: MouseTouchEventCallback

  mouseWheelHortEvent?: MouseTouchEventCallback
  mouseWheelVertEvent?: MouseTouchEventCallback

  mouseClickEvent?: MouseTouchEventCallback
  mouseRightClickEvent?: MouseTouchEventCallback
  tapEvent?: MouseTouchEventCallback

  mouseDoubleClickEvent?: MouseTouchEventCallback
  doubleTapEvent?: MouseTouchEventCallback

  mouseDownEvent?: MouseTouchEventCallback
  touchStartEvent?: MouseTouchEventCallback

  mouseUpEvent?: MouseTouchEventCallback
  touchEndEvent?: MouseTouchEventCallback

  mouseDownOutsideEvent?: MouseTouchEventCallback

  mouseEnterEvent?: MouseTouchEventCallback
  mouseLeaveEvent?: MouseTouchEventCallback

  mouseMoveEvent?: MouseTouchEventCallback

  pressedMouseMoveEvent?: MouseTouchEventCallback
  touchMoveEvent?: MouseTouchEventCallback

  longTapEvent?: MouseTouchEventCallback
}

export type EventName = keyof EventHandler

export interface EventOptions {
  treatVertDragAsPageScroll: () => boolean
  treatHorzDragAsPageScroll: () => boolean
}

// we can use `const name = 500;` but with `const enum` this values will be inlined into code
// so we do not need to have it as variables
const Delay = {
  ResetClick: 500,
  LongTap: 500,
  PreventFiresTouchEvents: 500
}

const ManhattanDistance = {
  CancelClick: 5,
  CancelTap: 5,
  DoubleClick: 5,
  DoubleTap: 30
}

const MouseEventButton = {
  Left: 0,
  Middle: 1,
  Right: 2
}

export const TOUCH_MIN_RADIUS = 10

type TimerId = ReturnType<typeof setTimeout>

interface MouseTouchMoveWithDownInfo {
  xOffset: number
  yOffset: number
  manhattanDistance: number
}

// TODO: get rid of a lot of boolean flags, probably we should replace it with some enum
export default class EventHandlerImp {
  private readonly _target: HTMLElement
  private readonly _handler: EventHandler

  private readonly _options: EventOptions

  private _clickCount = 0
  private _clickTimeoutId: Nullable<TimerId> = null
  private _clickCoordinate: Coordinate = { x: Number.NEGATIVE_INFINITY, y: Number.POSITIVE_INFINITY }

  private _tapCount = 0
  private _tapTimeoutId: Nullable<TimerId> = null
  private _tapCoordinate: Coordinate = { x: Number.NEGATIVE_INFINITY, y: Number.POSITIVE_INFINITY }

  private _longTapTimeoutId: Nullable<TimerId> = null
  private _longTapActive = false

  private _mouseMoveStartCoordinate: Nullable<Coordinate> = null

  private _touchMoveStartCoordinate: Nullable<Coordinate> = null
  private _touchMoveExceededManhattanDistance = false

  private _cancelClick = false
  private _cancelTap = false

  private _unsubscribeOutsideMouseEvents: Nullable<() => void> = null
  private _unsubscribeOutsideTouchEvents: Nullable<() => void> = null
  private _unsubscribeMobileSafariEvents: Nullable<() => void> = null

  private _unsubscribeMousemove: Nullable<() => void> = null

  private _unsubscribeMouseWheel: Nullable<() => void> = null

  private _unsubscribeContextMenu: Nullable<() => void> = null

  private _unsubscribeRootMouseEvents: Nullable<() => void> = null
  private _unsubscribeRootTouchEvents: Nullable<() => void> = null

  private _startPinchMiddleCoordinate: Nullable<Coordinate> = null
  private _startPinchDistance = 0
  private _pinchPrevented = false
  private _preventTouchDragProcess = false

  private _mousePressed = false

  private _lastTouchEventTimeStamp = 0

  // for touchstart/touchmove/touchend events we handle only first touch
  // i.e. we don't support several active touches at the same time (except pinch event)
  private _activeTouchId: Nullable<number> = null

  // accept all mouse leave events if it's not an iOS device
  // see _mouseEnterHandler, _mouseMoveHandler, _mouseLeaveHandler
  private _acceptMouseLeave = !isIOS()

  constructor (
    target: HTMLElement,
    handler: EventHandler,
    options: EventOptions
  ) {
    this._target = target
    this._handler = handler
    this._options = options

    this._init()
  }

  destroy (): void {
    if (this._unsubscribeOutsideMouseEvents !== null) {
      this._unsubscribeOutsideMouseEvents()
      this._unsubscribeOutsideMouseEvents = null
    }

    if (this._unsubscribeOutsideTouchEvents !== null) {
      this._unsubscribeOutsideTouchEvents()
      this._unsubscribeOutsideTouchEvents = null
    }

    if (this._unsubscribeMousemove !== null) {
      this._unsubscribeMousemove()
      this._unsubscribeMousemove = null
    }

    if (this._unsubscribeMouseWheel !== null) {
      this._unsubscribeMouseWheel()
      this._unsubscribeMouseWheel = null
    }

    if (this._unsubscribeContextMenu !== null) {
      this._unsubscribeContextMenu()
      this._unsubscribeContextMenu = null
    }

    if (this._unsubscribeRootMouseEvents !== null) {
      this._unsubscribeRootMouseEvents()
      this._unsubscribeRootMouseEvents = null
    }

    if (this._unsubscribeRootTouchEvents !== null) {
      this._unsubscribeRootTouchEvents()
      this._unsubscribeRootTouchEvents = null
    }

    if (this._unsubscribeMobileSafariEvents !== null) {
      this._unsubscribeMobileSafariEvents()
      this._unsubscribeMobileSafariEvents = null
    }

    this._clearLongTapTimeout()
    this._resetClickTimeout()
  }

  private _mouseEnterHandler (enterEvent: MouseEvent): void {
    this._unsubscribeMousemove?.()
    this._unsubscribeMouseWheel?.()
    this._unsubscribeContextMenu?.()

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const boundMouseMoveHandler = this._mouseMoveHandler.bind(this)
    this._unsubscribeMousemove = () => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      this._target.removeEventListener('mousemove', boundMouseMoveHandler)
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    this._target.addEventListener('mousemove', boundMouseMoveHandler)

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const boundMouseWheel = this._mouseWheelHandler.bind(this)
    this._unsubscribeMouseWheel = () => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      this._target.removeEventListener('wheel', boundMouseWheel)
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    this._target.addEventListener('wheel', boundMouseWheel, { passive: false })

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const boundContextMenu = this._contextMenuHandler.bind(this)
    this._unsubscribeContextMenu = () => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      this._target.removeEventListener('contextmenu', boundContextMenu)
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    this._target.addEventListener('contextmenu', boundContextMenu, { passive: false })

    if (this._firesTouchEvents(enterEvent)) {
      return
    }

    this._processEvent(this._makeCompatEvent(enterEvent), this._handler.mouseEnterEvent)
    this._acceptMouseLeave = true
  }

  private _resetClickTimeout (): void {
    if (this._clickTimeoutId !== null) {
      clearTimeout(this._clickTimeoutId)
    }

    this._clickCount = 0
    this._clickTimeoutId = null
    this._clickCoordinate = { x: Number.NEGATIVE_INFINITY, y: Number.POSITIVE_INFINITY }
  }

  private _resetTapTimeout (): void {
    if (this._tapTimeoutId !== null) {
      clearTimeout(this._tapTimeoutId)
    }

    this._tapCount = 0
    this._tapTimeoutId = null
    this._tapCoordinate = { x: Number.NEGATIVE_INFINITY, y: Number.POSITIVE_INFINITY }
  }

  private _mouseMoveHandler (moveEvent: MouseEvent): void {
    if (this._mousePressed || this._touchMoveStartCoordinate !== null) {
      return
    }

    if (this._firesTouchEvents(moveEvent)) {
      return
    }

    this._processEvent(this._makeCompatEvent(moveEvent), this._handler.mouseMoveEvent)
    this._acceptMouseLeave = true
  }

  private _mouseWheelHandler (wheelEvent: WheelEvent): void {
    if (Math.abs(wheelEvent.deltaX) > Math.abs(wheelEvent.deltaY)) {
      if (!isValid(this._handler.mouseWheelHortEvent)) {
        return
      }
      this._preventDefault(wheelEvent)
      if (Math.abs(wheelEvent.deltaX) === 0) {
        return
      }
      this._handler.mouseWheelHortEvent(this._makeCompatEvent(wheelEvent), -wheelEvent.deltaX)
    } else {
      if (!isValid(this._handler.mouseWheelVertEvent)) {
        return
      }
      let deltaY = -(wheelEvent.deltaY / 100)
      if (deltaY === 0) {
        return
      }
      this._preventDefault(wheelEvent)

      switch (wheelEvent.deltaMode) {
        case wheelEvent.DOM_DELTA_PAGE: {
          deltaY *= 120
          break
        }

        case wheelEvent.DOM_DELTA_LINE: {
          deltaY *= 32
          break
        }
      }

      if (deltaY !== 0) {
        const scale = Math.sign(deltaY) * Math.min(1, Math.abs(deltaY))
        this._handler.mouseWheelVertEvent(this._makeCompatEvent(wheelEvent), scale)
      }
    }
  }

  private _contextMenuHandler (mouseEvent: MouseEvent): void {
    this._preventDefault(mouseEvent)
  }

  private _touchMoveHandler (moveEvent: TouchEvent): void {
    const touch = this._touchWithId(moveEvent.changedTouches, this._activeTouchId)
    if (touch === null) {
      return
    }

    this._lastTouchEventTimeStamp = this._eventTimeStamp(moveEvent)

    if (this._startPinchMiddleCoordinate !== null) {
      return
    }

    if (this._preventTouchDragProcess) {
      return
    }

    // prevent pinch if move event comes faster than the second touch
    this._pinchPrevented = true

    const moveInfo = this._mouseTouchMoveWithDownInfo(this._getCoordinate(touch), this._touchMoveStartCoordinate!)
    const { xOffset, yOffset, manhattanDistance } = moveInfo

    if (!this._touchMoveExceededManhattanDistance && manhattanDistance < ManhattanDistance.CancelTap) {
      return
    }

    if (!this._touchMoveExceededManhattanDistance) {
      // first time when current position exceeded manhattan distance

      // vertical drag is more important than horizontal drag
      // because we scroll the page vertically often than horizontally
      const correctedXOffset = xOffset * 0.5

      // a drag can be only if touch page scroll isn't allowed
      const isVertDrag = yOffset >= correctedXOffset && !this._options.treatVertDragAsPageScroll()
      const isHorzDrag = correctedXOffset > yOffset && !this._options.treatHorzDragAsPageScroll()

      // if drag event happened then we should revert preventDefault state to original one
      // and try to process the drag event
      // else we shouldn't prevent default of the event and ignore processing the drag event
      if (!isVertDrag && !isHorzDrag) {
        this._preventTouchDragProcess = true
      }

      this._touchMoveExceededManhattanDistance = true
      // if manhattan distance is more that 5 - we should cancel tap event
      this._cancelTap = true
      this._clearLongTapTimeout()
      this._resetTapTimeout()
    }

    if (!this._preventTouchDragProcess) {
      this._processEvent(this._makeCompatEvent(moveEvent, touch), this._handler.touchMoveEvent)

      // we should prevent default in case of touch only
      // to prevent scroll of the page
      // preventDefault(moveEvent)
    }
  }

  private _mouseMoveWithDownHandler (moveEvent: MouseEvent): void {
    if (moveEvent.button !== MouseEventButton.Left) {
      return
    }

    const moveInfo = this._mouseTouchMoveWithDownInfo(this._getCoordinate(moveEvent), this._mouseMoveStartCoordinate!)
    const { manhattanDistance } = moveInfo

    if (manhattanDistance >= ManhattanDistance.CancelClick) {
      // if manhattan distance is more that 5 - we should cancel click event
      this._cancelClick = true
      this._resetClickTimeout()
    }
    if (this._cancelClick) {
      // if this._cancelClick is true, that means that minimum manhattan distance is already exceeded
      this._processEvent(this._makeCompatEvent(moveEvent), this._handler.pressedMouseMoveEvent)
    }
  }

  private _mouseTouchMoveWithDownInfo (currentCoordinate: Coordinate, startCoordinate: Coordinate): MouseTouchMoveWithDownInfo {
    const xOffset = Math.abs(startCoordinate.x - currentCoordinate.x)
    const yOffset = Math.abs(startCoordinate.y - currentCoordinate.y)

    const manhattanDistance = xOffset + yOffset

    return { xOffset, yOffset, manhattanDistance }
  }

  /**
   * In Firefox mouse events dont't fire if the mouse position is outside of the browser's border.
   * To prevent the mouse from hanging while pressed we're subscribing on the mouseleave event of the document element.
   * We're subscribing on mouseleave, but this event is actually fired on mouseup outside of the browser's border.
   */
  private readonly _onFirefoxOutsideMouseUp = (mouseUpEvent: MouseEvent): void => {
    this._mouseUpHandler(mouseUpEvent)
  }

  /**
   * Safari doesn't fire touchstart/mousedown events on double tap since iOS 13.
   * There are two possible solutions:
   * 1) Call preventDefault in touchEnd handler. But it also prevents click event from firing.
   * 2) Add listener on dblclick event that fires with the preceding mousedown/mouseup.
   * https://developer.apple.com/forums/thread/125073
   */
  private readonly _onMobileSafariDoubleClick = (dblClickEvent: MouseEvent): void => {
    if (this._firesTouchEvents(dblClickEvent)) {
      ++this._tapCount

      if (this._tapTimeoutId !== null && this._tapCount > 1) {
        const { manhattanDistance } = this._mouseTouchMoveWithDownInfo(this._getCoordinate(dblClickEvent), this._tapCoordinate)

        if (manhattanDistance < ManhattanDistance.DoubleTap && !this._cancelTap) {
          this._processEvent(this._makeCompatEvent(dblClickEvent), this._handler.doubleTapEvent)
        }
        this._resetTapTimeout()
      }
    } else {
      ++this._clickCount

      if (this._clickTimeoutId !== null && this._clickCount > 1) {
        const { manhattanDistance } = this._mouseTouchMoveWithDownInfo(this._getCoordinate(dblClickEvent), this._clickCoordinate)

        if (manhattanDistance < ManhattanDistance.DoubleClick && !this._cancelClick) {
          this._processEvent(this._makeCompatEvent(dblClickEvent), this._handler.mouseDoubleClickEvent)
        }
        this._resetClickTimeout()
      }
    }
  }

  private _touchEndHandler (touchEndEvent: TouchEvent): void {
    let touch = this._touchWithId(touchEndEvent.changedTouches, this._activeTouchId)
    if (touch === null && touchEndEvent.touches.length === 0) {
      // something went wrong, somehow we missed the required touchend event
      // probably the browser has not sent this event
      touch = touchEndEvent.changedTouches[0]
    }

    if (touch === null) {
      return
    }

    this._activeTouchId = null
    this._lastTouchEventTimeStamp = this._eventTimeStamp(touchEndEvent)
    this._clearLongTapTimeout()
    this._touchMoveStartCoordinate = null

    if (this._unsubscribeRootTouchEvents !== null) {
      this._unsubscribeRootTouchEvents()
      this._unsubscribeRootTouchEvents = null
    }

    const compatEvent = this._makeCompatEvent(touchEndEvent, touch)
    this._processEvent(compatEvent, this._handler.touchEndEvent)
    ++this._tapCount

    if (this._tapTimeoutId !== null && this._tapCount > 1) {
      // check that both clicks are near enough
      const { manhattanDistance } = this._mouseTouchMoveWithDownInfo(this._getCoordinate(touch), this._tapCoordinate)
      if (manhattanDistance < ManhattanDistance.DoubleTap && !this._cancelTap) {
        this._processEvent(compatEvent, this._handler.doubleTapEvent)
      }
      this._resetTapTimeout()
    } else {
      if (!this._cancelTap) {
        this._processEvent(compatEvent, this._handler.tapEvent)

        // do not fire mouse events if tap handler was executed
        // prevent click event on new dom element (who appeared after tap)
        if (isValid(this._handler.tapEvent)) {
          this._preventDefault(touchEndEvent)
        }
      }
    }

    // prevent, for example, safari's dblclick-to-zoom or fast-click after long-tap
    // we handle mouseDoubleClickEvent here ourselves
    if (this._tapCount === 0) {
      this._preventDefault(touchEndEvent)
    }

    if (touchEndEvent.touches.length === 0) {
      if (this._longTapActive) {
        this._longTapActive = false
        // prevent native click event
        this._preventDefault(touchEndEvent)
      }
    }
  }

  private _mouseUpHandler (mouseUpEvent: MouseEvent): void {
    if (mouseUpEvent.button !== MouseEventButton.Left) {
      return
    }

    const compatEvent = this._makeCompatEvent(mouseUpEvent)

    this._mouseMoveStartCoordinate = null
    this._mousePressed = false

    if (this._unsubscribeRootMouseEvents !== null) {
      this._unsubscribeRootMouseEvents()
      this._unsubscribeRootMouseEvents = null
    }

    if (isFF()) {
      const rootElement = this._target.ownerDocument.documentElement
      rootElement.removeEventListener('mouseleave', this._onFirefoxOutsideMouseUp)
    }

    if (this._firesTouchEvents(mouseUpEvent)) {
      return
    }

    this._processEvent(compatEvent, this._handler.mouseUpEvent)
    ++this._clickCount

    if (this._clickTimeoutId !== null && this._clickCount > 1) {
      // check that both clicks are near enough
      const { manhattanDistance } = this._mouseTouchMoveWithDownInfo(this._getCoordinate(mouseUpEvent), this._clickCoordinate)
      if (manhattanDistance < ManhattanDistance.DoubleClick && !this._cancelClick) {
        this._processEvent(compatEvent, this._handler.mouseDoubleClickEvent)
      }
      this._resetClickTimeout()
    } else {
      if (!this._cancelClick) {
        this._processEvent(compatEvent, this._handler.mouseClickEvent)
      }
    }
  }

  private _clearLongTapTimeout (): void {
    if (this._longTapTimeoutId === null) {
      return
    }

    clearTimeout(this._longTapTimeoutId)
    this._longTapTimeoutId = null
  }

  private _touchStartHandler (downEvent: TouchEvent): void {
    if (this._activeTouchId !== null) {
      return
    }
    const touch = downEvent.changedTouches[0]
    this._activeTouchId = touch.identifier

    this._lastTouchEventTimeStamp = this._eventTimeStamp(downEvent)

    const rootElement = this._target.ownerDocument.documentElement

    this._cancelTap = false
    this._touchMoveExceededManhattanDistance = false
    this._preventTouchDragProcess = false

    this._touchMoveStartCoordinate = this._getCoordinate(touch)

    if (this._unsubscribeRootTouchEvents !== null) {
      this._unsubscribeRootTouchEvents()
      this._unsubscribeRootTouchEvents = null
    }

    {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const boundTouchMoveWithDownHandler = this._touchMoveHandler.bind(this)
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const boundTouchEndHandler = this._touchEndHandler.bind(this)

      this._unsubscribeRootTouchEvents = () => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        rootElement.removeEventListener('touchmove', boundTouchMoveWithDownHandler)
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        rootElement.removeEventListener('touchend', boundTouchEndHandler)
      }

      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      rootElement.addEventListener('touchmove', boundTouchMoveWithDownHandler, { passive: false })
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      rootElement.addEventListener('touchend', boundTouchEndHandler, { passive: false })

      this._clearLongTapTimeout()
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      this._longTapTimeoutId = setTimeout(this._longTapHandler.bind(this, downEvent), Delay.LongTap)
    }

    this._processEvent(this._makeCompatEvent(downEvent, touch), this._handler.touchStartEvent)

    if (this._tapTimeoutId === null) {
      this._tapCount = 0
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      this._tapTimeoutId = setTimeout(this._resetTapTimeout.bind(this), Delay.ResetClick)
      this._tapCoordinate = this._getCoordinate(touch)
    }
  }

  private _mouseDownHandler (downEvent: MouseEvent): void {
    if (downEvent.button === MouseEventButton.Right) {
      this._preventDefault(downEvent)
      this._processEvent(this._makeCompatEvent(downEvent), this._handler.mouseRightClickEvent)
      return
    }

    if (downEvent.button !== MouseEventButton.Left) {
      return
    }

    const rootElement = this._target.ownerDocument.documentElement
    if (isFF()) {
      rootElement.addEventListener('mouseleave', this._onFirefoxOutsideMouseUp)
    }

    this._cancelClick = false

    this._mouseMoveStartCoordinate = this._getCoordinate(downEvent)

    if (this._unsubscribeRootMouseEvents !== null) {
      this._unsubscribeRootMouseEvents()
      this._unsubscribeRootMouseEvents = null
    }

    {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const boundMouseMoveWithDownHandler = this._mouseMoveWithDownHandler.bind(this)
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const boundMouseUpHandler = this._mouseUpHandler.bind(this)

      this._unsubscribeRootMouseEvents = () => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        rootElement.removeEventListener('mousemove', boundMouseMoveWithDownHandler)
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        rootElement.removeEventListener('mouseup', boundMouseUpHandler)
      }

      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      rootElement.addEventListener('mousemove', boundMouseMoveWithDownHandler)
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      rootElement.addEventListener('mouseup', boundMouseUpHandler)
    }

    this._mousePressed = true

    if (this._firesTouchEvents(downEvent)) {
      return
    }

    this._processEvent(this._makeCompatEvent(downEvent), this._handler.mouseDownEvent)

    if (this._clickTimeoutId === null) {
      this._clickCount = 0
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      this._clickTimeoutId = setTimeout(this._resetClickTimeout.bind(this), Delay.ResetClick)
      this._clickCoordinate = this._getCoordinate(downEvent)
    }
  }

  private _init (): void {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    this._target.addEventListener('mouseenter', this._mouseEnterHandler.bind(this))

    // Do not show context menu when something went wrong
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    this._target.addEventListener('touchcancel', this._clearLongTapTimeout.bind(this))

    {
      const doc = this._target.ownerDocument

      const outsideHandler = (event: MouseEvent | TouchEvent): void => {
        if (this._handler.mouseDownOutsideEvent == null) {
          return
        }

        if (event.composed && this._target.contains(event.composedPath()[0] as Element)) {
          return
        }

        if ((event.target !== null) && this._target.contains(event.target as Element)) {
          return
        }

        this._handler.mouseDownOutsideEvent({ x: 0, y: 0, pageX: 0, pageY: 0 })
      }

      this._unsubscribeOutsideTouchEvents = () => {
        doc.removeEventListener('touchstart', outsideHandler)
      }

      this._unsubscribeOutsideMouseEvents = () => {
        doc.removeEventListener('mousedown', outsideHandler)
      }

      doc.addEventListener('mousedown', outsideHandler)
      doc.addEventListener('touchstart', outsideHandler, { passive: true })
    }

    if (isIOS()) {
      this._unsubscribeMobileSafariEvents = () => {
        this._target.removeEventListener('dblclick', this._onMobileSafariDoubleClick)
      }
      this._target.addEventListener('dblclick', this._onMobileSafariDoubleClick)
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    this._target.addEventListener('mouseleave', this._mouseLeaveHandler.bind(this))

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    this._target.addEventListener('touchstart', this._touchStartHandler.bind(this), { passive: true })

    this._target.addEventListener('mousedown', (e: MouseEvent) => {
      if (e.button === MouseEventButton.Middle) {
        // prevent incorrect scrolling event
        e.preventDefault()
        return false
      }
      return undefined
    })

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    this._target.addEventListener('mousedown', this._mouseDownHandler.bind(this))
    this._initPinch()

    // Hey mobile Safari, what's up?
    // If mobile Safari doesn't have any touchmove handler with passive=false
    // it treats a touchstart and the following touchmove events as cancelable=false,
    // so we can't prevent them (as soon we subscribe on touchmove inside touchstart's handler).
    // And we'll get scroll of the page along with chart's one instead of only chart's scroll.
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    this._target.addEventListener('touchmove', () => {}, { passive: false })
  }

  private _initPinch (): void {
    if (!isValid(this._handler.pinchStartEvent) &&
      !isValid(this._handler.pinchEvent) &&
      !isValid(this._handler.pinchEndEvent)
    ) {
      return
    }

    this._target.addEventListener(
      'touchstart',
      (event: TouchEvent) => { this._checkPinchState(event.touches) },
      { passive: true }
    )

    this._target.addEventListener(
      'touchmove',
      (event: TouchEvent) => {
        if (event.touches.length !== 2 || this._startPinchMiddleCoordinate === null) {
          return
        }
        if (isValid(this._handler.pinchEvent)) {
          const currentDistance = this._getTouchDistance(event.touches[0], event.touches[1])
          const scale = currentDistance / this._startPinchDistance
          this._handler.pinchEvent({ ...this._startPinchMiddleCoordinate, pageX: 0, pageY: 0 }, scale)
          this._preventDefault(event)
        }
      },
      { passive: false }
    )

    this._target.addEventListener('touchend', (event: TouchEvent) => {
      this._checkPinchState(event.touches)
    })
  }

  private _checkPinchState (touches: TouchList): void {
    if (touches.length === 1) {
      this._pinchPrevented = false
    }

    if (touches.length !== 2 || this._pinchPrevented || this._longTapActive) {
      this._stopPinch()
    } else {
      this._startPinch(touches)
    }
  }

  private _startPinch (touches: TouchList): void {
    const box = this._target.getBoundingClientRect()
    this._startPinchMiddleCoordinate = {
      x: ((touches[0].clientX - box.left) + (touches[1].clientX - box.left)) / 2,
      y: ((touches[0].clientY - box.top) + (touches[1].clientY - box.top)) / 2
    }

    this._startPinchDistance = this._getTouchDistance(touches[0], touches[1])

    if (isValid(this._handler.pinchStartEvent)) {
      this._handler.pinchStartEvent({ x: 0, y: 0, pageX: 0, pageY: 0 })
    }

    this._clearLongTapTimeout()
  }

  private _stopPinch (): void {
    if (this._startPinchMiddleCoordinate === null) {
      return
    }

    this._startPinchMiddleCoordinate = null

    if (isValid(this._handler.pinchEndEvent)) {
      this._handler.pinchEndEvent({ x: 0, y: 0, pageX: 0, pageY: 0 })
    }
  }

  private _mouseLeaveHandler (event: MouseEvent): void {
    this._unsubscribeMousemove?.()
    this._unsubscribeMouseWheel?.()
    this._unsubscribeContextMenu?.()

    if (this._firesTouchEvents(event)) {
      return
    }

    if (!this._acceptMouseLeave) {
      // mobile Safari sometimes emits mouse leave event for no reason, there is no way to handle it in other way
      // just ignore this event if there was no mouse move or mouse enter events
      return
    }

    this._processEvent(this._makeCompatEvent(event), this._handler.mouseLeaveEvent)

    // accept all mouse leave events if it's not an iOS device
    this._acceptMouseLeave = !isIOS()
  }

  private _longTapHandler (event: TouchEvent): void {
    const touch = this._touchWithId(event.touches, this._activeTouchId)
    if (touch === null) {
      return
    }

    this._processEvent(this._makeCompatEvent(event, touch), this._handler.longTapEvent)
    this._cancelTap = true

    // long tap is active until touchend event with 0 touches occurred
    this._longTapActive = true
  }

  private _firesTouchEvents (e: MouseEvent): boolean {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (isValid(e.sourceCapabilities?.firesTouchEvents)) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
      return e.sourceCapabilities.firesTouchEvents
    }

    return this._eventTimeStamp(e) < this._lastTouchEventTimeStamp + Delay.PreventFiresTouchEvents
  }

  private _processEvent (event: MouseTouchEvent, callback?: MouseTouchEventCallback): void {
    callback?.call(this._handler, event)
  }

  private _makeCompatEvent (event: MouseEvent | TouchEvent, touch?: Touch): MouseTouchEvent {
    // TouchEvent has no clientX/Y coordinates:
    // We have to use the last Touch instead
    const eventLike = touch ?? (event as MouseEvent)
    const box = this._target.getBoundingClientRect()
    return {
      x: eventLike.clientX - box.left,
      y: eventLike.clientY - box.top,

      pageX: eventLike.pageX,
      pageY: eventLike.pageY,
      isTouch: !event.type.startsWith('mouse') && event.type !== 'contextmenu' && event.type !== 'click' && event.type !== 'wheel',

      preventDefault: () => {
        if (event.type !== 'touchstart') {
          // touchstart is passive and cannot be prevented
          this._preventDefault(event)
        }
      }
    }
  }

  private _getTouchDistance (p1: Touch, p2: Touch): number {
    const xDiff = p1.clientX - p2.clientX
    const yDiff = p1.clientY - p2.clientY
    return Math.sqrt(xDiff * xDiff + yDiff * yDiff)
  }

  private _preventDefault (event: Event): void {
    if (event.cancelable) {
      event.preventDefault()
    }
  }

  private _getCoordinate (eventLike: Touch | MouseEvent): Coordinate {
    return {
      x: eventLike.pageX,
      y: eventLike.pageY
    }
  }

  private _eventTimeStamp (e: TouchEvent | MouseEvent): number {
    // for some reason e.timestamp is always 0 on iPad with magic mouse, so we use performance.now() as a fallback
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    return e.timeStamp ?? performance.now()
  }

  private _touchWithId (touches: TouchList, id: Nullable<number>): Nullable<Touch> {
    // eslint-disable-next-line @typescript-eslint/prefer-for-of
    for (let i = 0; i < touches.length; ++i) {
      if (touches[i].identifier === id) {
        return touches[i]
      }
    }
    return null
  }
}
```

## File: common/ExcludePickPartial.ts
```typescript
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

import type PickRequired from './PickRequired'

type ExcludePickPartial<T, K extends keyof T> = PickRequired<Partial<T>, K>

export default ExcludePickPartial
```

## File: common/Hotkey.ts
```typescript
import type { Chart } from '../Chart'

export interface HotkeyActionParams<E = unknown> {
  chart: Chart
  event: KeyboardEvent
  key: string
  hotkey: HotkeyTemplate<E>
}

export interface HotkeyTemplate<E = unknown> {
  name: string
  keys: string | string[]
  preventDefault?: boolean
  stopPropagation?: boolean
  check?: (params: HotkeyActionParams<E>) => boolean
  action: (params: HotkeyActionParams<E>) => void
  extendData?: E
}
```

## File: common/Nullable.ts
```typescript
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

type Nullable<T> = T | null

export default Nullable
```

## File: common/Period.ts
```typescript
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

export type PeriodType = 'second' | 'minute' | 'hour' | 'day' | 'week' | 'month' | 'year'

export interface Period {
  type: PeriodType
  span: number
}

export const PeriodTypeXAxisFormat: Record<PeriodType, string> = {
  second: 'HH:mm:ss',
  minute: 'HH:mm',
  hour: 'MM-DD HH:mm',
  day: 'YYYY-MM-DD',
  week: 'YYYY-MM-DD',
  month: 'YYYY-MM',
  year: 'YYYY'
}

export const PeriodTypeCrosshairTooltipFormat: Record<PeriodType, string> = {
  second: 'HH:mm:ss',
  minute: 'YYYY-MM-DD HH:mm',
  hour: 'YYYY-MM-DD HH:mm',
  day: 'YYYY-MM-DD',
  week: 'YYYY-MM-DD',
  month: 'YYYY-MM',
  year: 'YYYY'
}
```

## File: common/PickPartial.ts
```typescript
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

type PickPartial<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

export default PickPartial
```

## File: common/PickRequired.ts
```typescript
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

type PickRequired<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>

export default PickRequired
```

## File: common/Point.ts
```typescript
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

export default interface Point {
  dataIndex: number
  timestamp: number
  value: number
}
```

## File: common/Styles.ts
```typescript
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

import type Nullable from './Nullable'
import type { KLineData, NeighborData } from './Data'
import { hexToRgb } from './utils/color'

export interface Margin {
  marginLeft: number
  marginTop: number
  marginRight: number
  marginBottom: number
}

export interface Padding {
  paddingLeft: number
  paddingTop: number
  paddingRight: number
  paddingBottom: number
}

export interface Offset {
  offsetLeft: number
  offsetTop: number
  offsetRight: number
  offsetBottom: number
}

/**
 * line type
 */
export type LineType = 'dashed' | 'solid'

export interface LineStyle {
  style: LineType
  size: number
  color: string
  dashedValue: number[]
}

export interface SmoothLineStyle extends LineStyle {
  smooth: boolean | number
}

export interface StateLineStyle extends LineStyle {
  show: boolean
}

export type PathType = 'stroke' | 'fill'

export interface PathStyle {
  style: PathType
  color: string
  lineWidth: number
}

export type PolygonType = PathType | 'stroke_fill'

export interface PolygonStyle {
  style: PolygonType
  color: string | CanvasGradient
  borderColor: string
  borderSize: number
  borderStyle: LineType
  borderDashedValue: number[]
}

export interface RectStyle extends PolygonStyle {
  borderRadius: number | number[]
}

export interface TextStyle extends Padding {
  style: PolygonType
  color: string
  size: number
  family: string
  weight: number | string
  borderStyle: LineType
  borderDashedValue: number[]
  borderSize: number
  borderColor: string
  borderRadius: number | number[]
  backgroundColor: string | CanvasGradient
}

export interface StateTextStyle extends TextStyle {
  show: boolean
}

export type LastValueMarkTextStyle = Omit<StateTextStyle, 'backgroundColor'>

export type TooltipShowRule = 'always' | 'follow_cross' | 'none'

export type TooltipShowType = 'standard' | 'rect'

export interface ChangeColor {
  upColor: string
  downColor: string
  noChangeColor: string
}

export interface GradientColor {
  offset: number
  color: string
}

export type FeatureType = 'path' | 'icon_font'

export interface FeaturePathStyle extends Omit<PathStyle, 'color'> {
  path: string
}

export interface FeatureIconFontStyle {
  family: string
  code: string
}

export interface FeatureStyle extends Padding, Margin {
  id: string
  backgroundColor: string
  activeBackgroundColor: string
  size: number
  color: string
  activeColor: string
  borderRadius: number | number[]
  type: FeatureType
  content: FeaturePathStyle | FeatureIconFontStyle
}

export interface GridStyle {
  show: boolean
  horizontal: StateLineStyle
  vertical: StateLineStyle
}

export type TooltipTextStyle = Pick<TextStyle, 'color' | 'size' | 'family' | 'weight'> & Margin

export type TooltipTitleStyle = TooltipTextStyle & { show: boolean }

export type TooltipLegendStyle = TooltipTextStyle & { defaultValue: string }

export interface TooltipLegendChild {
  text: string
  color: string
}

export interface TooltipLegend {
  title: string | TooltipLegendChild
  value: string | TooltipLegendChild
}

export type TooltipFeaturePosition = 'left' | 'middle' | 'right'

export interface TooltipFeatureStyle extends FeatureStyle {
  position: TooltipFeaturePosition
}

export interface TooltipStyle extends Offset {
  showRule: TooltipShowRule
  showType: TooltipShowType
  features: TooltipFeatureStyle[]
}

export interface CandleAreaPointStyle {
  show: boolean
  color: string
  radius: number
  rippleColor: string
  rippleRadius: number
  animation: boolean
  animationDuration: number
}

export interface CandleAreaStyle {
  lineSize: number
  lineColor: string
  value: string
  smooth: boolean
  backgroundColor: string | GradientColor[]
  point: CandleAreaPointStyle
}

export interface CandleHighLowPriceMarkStyle {
  show: boolean
  color: string
  textOffset: number
  textSize: number
  textFamily: string
  textWeight: string
}

export type CandleLastPriceMarkLineStyle = Omit<StateLineStyle, 'color'>

export type CandleLastPriceMarkExtendTextPosition = 'above_price' | 'below_price'

export type CandleLastPriceMarkExtendTextStyle = LastValueMarkTextStyle & {
  position: CandleLastPriceMarkExtendTextPosition
  updateInterval: number
}
export interface CandleLastPriceMarkStyle extends ChangeColor {
  show: boolean
  compareRule: CandleColorCompareRule
  line: CandleLastPriceMarkLineStyle
  text: LastValueMarkTextStyle
  extendTexts: CandleLastPriceMarkExtendTextStyle[]
}

export interface CandlePriceMarkStyle {
  show: boolean
  high: CandleHighLowPriceMarkStyle
  low: CandleHighLowPriceMarkStyle
  last: CandleLastPriceMarkStyle
}

export type CandleTooltipRectPosition = 'fixed' | 'pointer'

export interface CandleTooltipRectStyle extends Omit<RectStyle, 'style' | 'borderDashedValue' | 'borderStyle'>, Padding, Offset {
  position: CandleTooltipRectPosition
}

export type CandleTooltipLegendsCustomCallback = (data: NeighborData<Nullable<KLineData>>, styles: CandleStyle) => TooltipLegend[]

export interface CandleTooltipStyle extends TooltipStyle {
  title: TooltipTitleStyle & { template: string }
  legend: TooltipLegendStyle & { template: CandleTooltipLegendsCustomCallback | TooltipLegend[] }
  rect: CandleTooltipRectStyle
}

export type CandleType = 'candle_solid' | 'candle_stroke' | 'candle_up_stroke' | 'candle_down_stroke' | 'ohlc' | 'area'

export type CandleColorCompareRule = 'current_open' | 'previous_close'

export interface CandleBarColor extends ChangeColor {
  compareRule: CandleColorCompareRule
  upBorderColor: string
  downBorderColor: string
  noChangeBorderColor: string
  upWickColor: string
  downWickColor: string
  noChangeWickColor: string
}

export interface CandleStyle {
  type: CandleType
  bar: CandleBarColor
  area: CandleAreaStyle
  priceMark: CandlePriceMarkStyle
  tooltip: CandleTooltipStyle
}

export type IndicatorPolygonStyle = Omit<PolygonStyle, 'color' | 'borderColor'> & ChangeColor

export interface IndicatorLastValueMarkStyle {
  show: boolean
  text: LastValueMarkTextStyle
}

export interface IndicatorTooltipStyle extends TooltipStyle {
  title: TooltipTitleStyle & { showName: boolean; showParams: boolean }
  legend: TooltipLegendStyle
}

export interface IndicatorStyle {
  ohlc: Pick<CandleBarColor, 'compareRule' | 'upColor' | 'downColor' | 'noChangeColor'>
  bars: IndicatorPolygonStyle[]
  lines: SmoothLineStyle[]
  circles: IndicatorPolygonStyle[]
  texts: TextStyle[]
  lastValueMark: IndicatorLastValueMarkStyle
  tooltip: IndicatorTooltipStyle
  [key: string]: unknown
}

export type AxisLineStyle = Omit<StateLineStyle, 'style' | 'dashedValue'>

export interface AxisTickLineStyle extends AxisLineStyle {
  length: number
}

export interface AxisTickTextStyle extends Pick<StateTextStyle, 'show' | 'color' | 'weight' | 'family' | 'size'> {
  marginStart: number
  marginEnd: number
}

export interface AxisStyle {
  show: boolean
  size: number | 'auto'
  axisLine: AxisLineStyle
  tickLine: AxisTickLineStyle
  tickText: AxisTickTextStyle
}

export interface CrosshairDirectionStyle {
  show: boolean
  line: StateLineStyle
  text: StateTextStyle
}

export interface CrosshairStyle {
  show: boolean
  horizontal: CrosshairDirectionStyle & { features: TooltipFeatureStyle[] }
  vertical: CrosshairDirectionStyle
}

export interface OverlayPointStyle {
  color: string
  borderColor: string
  borderSize: number
  radius: number
  activeColor: string
  activeBorderColor: string
  activeBorderSize: number
  activeRadius: number
}

export interface OverlayStyle {
  point: OverlayPointStyle
  line: SmoothLineStyle
  rect: RectStyle
  polygon: PolygonStyle
  circle: PolygonStyle
  arc: LineStyle
  text: TextStyle
  [key: string]: unknown
}

export interface SeparatorStyle {
  size: number
  color: string
  fill: boolean
  activeBackgroundColor: string
}

export interface Styles {
  grid: GridStyle
  candle: CandleStyle
  indicator: IndicatorStyle
  xAxis: AxisStyle
  yAxis: AxisStyle
  separator: SeparatorStyle
  crosshair: CrosshairStyle
  overlay: OverlayStyle
}

const Color = {
  RED: '#F92855',
  GREEN: '#2DC08E',
  WHITE: '#FFFFFF',
  GREY: '#76808F',
  BLUE: '#1677FF'
}

function getDefaultGridStyle (): GridStyle {
  return {
    show: true,
    horizontal: {
      show: true,
      size: 1,
      color: '#EDEDED',
      style: 'dashed',
      dashedValue: [2, 2]
    },
    vertical: {
      show: true,
      size: 1,
      color: '#EDEDED',
      style: 'dashed',
      dashedValue: [2, 2]
    }
  }
}

/**
 * Get default candle style
 * @type {{area: {backgroundColor: [{offset: number, color: string}, {offset: number, color: string}], lineColor: string, lineSize: number, value: string}, bar: {noChangeColor: string, upColor: string, downColor: string}, tooltip: {rect: {offsetTop: number, fillColor: string, borderColor: string, paddingBottom: number, borderRadius: number, paddingRight: number, borderSize: number, offsetLeft: number, paddingTop: number, paddingLeft: number, offsetRight: number}, showRule: string, values: null, showType: string, text: {marginRight: number, size: number, color: string, weight: string, marginBottom: number, family: string, marginTop: number, marginLeft: number}, labels: string[]}, type: string, priceMark: {high: {textMargin: number, textSize: number, color: string, textFamily: string, show: boolean, textWeight: string}, last: {noChangeColor: string, upColor: string, line: {dashValue: number[], size: number, show: boolean, style: string}, show: boolean, text: {paddingBottom: number, size: number, color: string, paddingRight: number, show: boolean, weight: string, paddingTop: number, family: string, paddingLeft: number}, downColor: string}, low: {textMargin: number, textSize: number, color: string, textFamily: string, show: boolean, textWeight: string}, show: boolean}}}
 */
function getDefaultCandleStyle (): CandleStyle {
  const highLow = {
    show: true,
    color: Color.GREY,
    textOffset: 5,
    textSize: 10,
    textFamily: 'Helvetica Neue',
    textWeight: 'normal'
  }
  return {
    type: 'candle_solid',
    bar: {
      compareRule: 'current_open',
      upColor: Color.GREEN,
      downColor: Color.RED,
      noChangeColor: Color.GREY,
      upBorderColor: Color.GREEN,
      downBorderColor: Color.RED,
      noChangeBorderColor: Color.GREY,
      upWickColor: Color.GREEN,
      downWickColor: Color.RED,
      noChangeWickColor: Color.GREY
    },
    area: {
      lineSize: 2,
      lineColor: Color.BLUE,
      smooth: false,
      value: 'close',
      backgroundColor: [{
        offset: 0,
        color: hexToRgb(Color.BLUE, 0.01)
      }, {
        offset: 1,
        color: hexToRgb(Color.BLUE, 0.2)
      }],
      point: {
        show: true,
        color: Color.BLUE,
        radius: 4,
        rippleColor: hexToRgb(Color.BLUE, 0.3),
        rippleRadius: 8,
        animation: true,
        animationDuration: 1000
      }
    },
    priceMark: {
      show: true,
      high: { ...highLow },
      low: { ...highLow },
      last: {
        show: true,
        compareRule: 'current_open',
        upColor: Color.GREEN,
        downColor: Color.RED,
        noChangeColor: Color.GREY,
        line: {
          show: true,
          style: 'dashed',
          dashedValue: [4, 4],
          size: 1
        },
        text: {
          show: true,
          style: 'fill',
          size: 12,
          paddingLeft: 4,
          paddingTop: 4,
          paddingRight: 4,
          paddingBottom: 4,
          borderColor: 'transparent',
          borderStyle: 'solid',
          borderSize: 0,
          borderDashedValue: [2, 2],
          color: Color.WHITE,
          family: 'Helvetica Neue',
          weight: 'normal',
          borderRadius: 2
        },
        extendTexts: []
      }
    },
    tooltip: {
      offsetLeft: 4,
      offsetTop: 6,
      offsetRight: 4,
      offsetBottom: 6,
      showRule: 'always',
      showType: 'standard',
      rect: {
        position: 'fixed',
        paddingLeft: 4,
        paddingRight: 4,
        paddingTop: 4,
        paddingBottom: 4,
        offsetLeft: 4,
        offsetTop: 4,
        offsetRight: 4,
        offsetBottom: 4,
        borderRadius: 4,
        borderSize: 1,
        borderColor: '#F2F3F5',
        color: '#FEFEFE'
      },
      title: {
        show: true,
        size: 14,
        family: 'Helvetica Neue',
        weight: 'normal',
        color: Color.GREY,
        marginLeft: 8,
        marginTop: 4,
        marginRight: 8,
        marginBottom: 4,
        template: '{ticker} · {period}'
      },
      legend: {
        size: 12,
        family: 'Helvetica Neue',
        weight: 'normal',
        color: Color.GREY,
        marginLeft: 8,
        marginTop: 4,
        marginRight: 8,
        marginBottom: 4,
        defaultValue: 'n/a',
        template: [
          { title: 'time', value: '{time}' },
          { title: 'open', value: '{open}' },
          { title: 'high', value: '{high}' },
          { title: 'low', value: '{low}' },
          { title: 'close', value: '{close}' },
          { title: 'volume', value: '{volume}' }
        ]
      },
      features: []
    }
  }
}

/**
 * Get default indicator style
 */
function getDefaultIndicatorStyle (): IndicatorStyle {
  const alphaGreen = hexToRgb(Color.GREEN, 0.7)
  const alphaRed = hexToRgb(Color.RED, 0.7)
  return {
    ohlc: {
      compareRule: 'current_open',
      upColor: alphaGreen,
      downColor: alphaRed,
      noChangeColor: Color.GREY
    },
    bars: [{
      style: 'fill',
      borderStyle: 'solid',
      borderSize: 1,
      borderDashedValue: [2, 2],
      upColor: alphaGreen,
      downColor: alphaRed,
      noChangeColor: Color.GREY
    }],
    lines: ['#FF9600', '#935EBD', Color.BLUE, '#E11D74', '#01C5C4'].map(color => ({
      style: 'solid',
      smooth: false,
      size: 1,
      dashedValue: [2, 2],
      color
    })),
    circles: [{
      style: 'fill',
      borderStyle: 'solid',
      borderSize: 1,
      borderDashedValue: [2, 2],
      upColor: alphaGreen,
      downColor: alphaRed,
      noChangeColor: Color.GREY
    }],
    texts: [{
      paddingLeft: 0,
      paddingTop: 0,
      paddingRight: 0,
      paddingBottom: 0,
      style: 'fill',
      size: 12,
      color: Color.BLUE,
      family: 'Helvetica Neue',
      weight: 'normal',
      borderStyle: 'solid',
      borderDashedValue: [2, 2],
      borderSize: 0,
      borderColor: 'transparent',
      borderRadius: 0,
      backgroundColor: 'transparent'
    }],
    lastValueMark: {
      show: false,
      text: {
        show: false,
        style: 'fill',
        color: Color.WHITE,
        size: 12,
        family: 'Helvetica Neue',
        weight: 'normal',
        borderStyle: 'solid',
        borderColor: 'transparent',
        borderSize: 0,
        borderDashedValue: [2, 2],
        paddingLeft: 4,
        paddingTop: 4,
        paddingRight: 4,
        paddingBottom: 4,
        borderRadius: 2
      }
    },
    tooltip: {
      offsetLeft: 4,
      offsetTop: 6,
      offsetRight: 4,
      offsetBottom: 6,
      showRule: 'always',
      showType: 'standard',
      title: {
        show: true,
        showName: true,
        showParams: true,
        size: 12,
        family: 'Helvetica Neue',
        weight: 'normal',
        color: Color.GREY,
        marginLeft: 8,
        marginTop: 4,
        marginRight: 8,
        marginBottom: 4
      },
      legend: {
        size: 12,
        family: 'Helvetica Neue',
        weight: 'normal',
        color: Color.GREY,
        marginLeft: 8,
        marginTop: 4,
        marginRight: 8,
        marginBottom: 4,
        defaultValue: 'n/a'
      },
      features: []
    }
  }
}

function getDefaultAxisStyle (): AxisStyle {
  return {
    show: true,
    size: 'auto',
    axisLine: {
      show: true,
      color: '#DDDDDD',
      size: 1
    },
    tickText: {
      show: true,
      color: Color.GREY,
      size: 12,
      family: 'Helvetica Neue',
      weight: 'normal',
      marginStart: 4,
      marginEnd: 6
    },
    tickLine: {
      show: true,
      size: 1,
      length: 3,
      color: '#DDDDDD'
    }
  }
}

function getDefaultCrosshairStyle (): CrosshairStyle {
  return {
    show: true,
    horizontal: {
      show: true,
      line: {
        show: true,
        style: 'dashed',
        dashedValue: [4, 2],
        size: 1,
        color: Color.GREY
      },
      text: {
        show: true,
        style: 'fill',
        color: Color.WHITE,
        size: 12,
        family: 'Helvetica Neue',
        weight: 'normal',
        borderStyle: 'solid',
        borderDashedValue: [2, 2],
        borderSize: 1,
        borderColor: Color.GREY,
        borderRadius: 2,
        paddingLeft: 4,
        paddingRight: 4,
        paddingTop: 4,
        paddingBottom: 4,
        backgroundColor: Color.GREY
      },
      features: []
    },
    vertical: {
      show: true,
      line: {
        show: true,
        style: 'dashed',
        dashedValue: [4, 2],
        size: 1,
        color: Color.GREY
      },
      text: {
        show: true,
        style: 'fill',
        color: Color.WHITE,
        size: 12,
        family: 'Helvetica Neue',
        weight: 'normal',
        borderStyle: 'solid',
        borderDashedValue: [2, 2],
        borderSize: 1,
        borderColor: Color.GREY,
        borderRadius: 2,
        paddingLeft: 4,
        paddingRight: 4,
        paddingTop: 4,
        paddingBottom: 4,
        backgroundColor: Color.GREY
      }
    }
  }
}

function getDefaultOverlayStyle (): OverlayStyle {
  const pointBorderColor = hexToRgb(Color.BLUE, 0.35)
  const alphaBg = hexToRgb(Color.BLUE, 0.25)
  function text (): TextStyle {
    return {
      style: 'fill',
      color: Color.WHITE,
      size: 12,
      family: 'Helvetica Neue',
      weight: 'normal',
      borderStyle: 'solid',
      borderDashedValue: [2, 2],
      borderSize: 1,
      borderRadius: 2,
      borderColor: Color.BLUE,
      paddingLeft: 4,
      paddingRight: 4,
      paddingTop: 4,
      paddingBottom: 4,
      backgroundColor: Color.BLUE
    }
  }
  return {
    point: {
      color: Color.BLUE,
      borderColor: pointBorderColor,
      borderSize: 1,
      radius: 5,
      activeColor: Color.BLUE,
      activeBorderColor: pointBorderColor,
      activeBorderSize: 3,
      activeRadius: 5
    },
    line: {
      style: 'solid',
      smooth: false,
      color: Color.BLUE,
      size: 1,
      dashedValue: [2, 2]
    },
    rect: {
      style: 'fill',
      color: alphaBg,
      borderColor: Color.BLUE,
      borderSize: 1,
      borderRadius: 0,
      borderStyle: 'solid',
      borderDashedValue: [2, 2]
    },
    polygon: {
      style: 'fill',
      color: Color.BLUE,
      borderColor: Color.BLUE,
      borderSize: 1,
      borderStyle: 'solid',
      borderDashedValue: [2, 2]
    },
    circle: {
      style: 'fill',
      color: alphaBg,
      borderColor: Color.BLUE,
      borderSize: 1,
      borderStyle: 'solid',
      borderDashedValue: [2, 2]
    },
    arc: {
      style: 'solid',
      color: Color.BLUE,
      size: 1,
      dashedValue: [2, 2]
    },
    text: text()
  }
}

function getDefaultSeparatorStyle (): SeparatorStyle {
  return {
    size: 1,
    color: '#DDDDDD',
    fill: true,
    activeBackgroundColor: hexToRgb(Color.BLUE, 0.08)
  }
}

export function getDefaultStyles (): Styles {
  return {
    grid: getDefaultGridStyle(),
    candle: getDefaultCandleStyle(),
    indicator: getDefaultIndicatorStyle(),
    xAxis: getDefaultAxisStyle(),
    yAxis: getDefaultAxisStyle(),
    separator: getDefaultSeparatorStyle(),
    crosshair: getDefaultCrosshairStyle(),
    overlay: getDefaultOverlayStyle()
  }
}
```

## File: common/SymbolInfo.ts
```typescript
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

export interface SymbolInfo {
  ticker: string
  pricePrecision: number
  volumePrecision: number
  [key: string]: unknown
}

export const SymbolDefaultPrecisionConstants = {
  PRICE: 2,
  VOLUME: 0
}
```

## File: common/TaskScheduler.ts
```typescript
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

import type Nullable from './Nullable'
import { isValid } from './utils/typeChecks'

type TaskFinishedCallback = () => void

export default class TaskScheduler {
  private _holdingTasks: Nullable<Record<string, Promise<unknown>>> = null

  private _running = false

  private readonly _callback: Nullable<TaskFinishedCallback>

  constructor (callback: TaskFinishedCallback) {
    this._callback = callback
  }

  add (tasks: Record<string, Promise<unknown>>): void {
    if (!this._running) {
      void this._runTask(tasks)
    } else {
      if (isValid(this._holdingTasks)) {
        this._holdingTasks = {
          ...this._holdingTasks,
          ...tasks
        }
      } else {
        this._holdingTasks = tasks
      }
    }
  }

  private async _runTask (tasks: Record<string, Promise<unknown>>): Promise<void> {
    this._running = true
    try {
      await Promise.all(Object.values(tasks))
    } finally {
      this._running = false
      this._callback?.()
      if (isValid(this._holdingTasks)) {
        const next = this._holdingTasks
        void this._runTask(next)
        this._holdingTasks = null
      }
    }
  }

  clear (): void {
    this._holdingTasks = null
  }
}
```

## File: common/Updater.ts
```typescript
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

export const enum UpdateLevel {
  Main,
  Overlay,
  Separator,
  Drawer,
  All
}

export default interface Updater {
  update: (level?: UpdateLevel) => void
}
```

## File: common/utils/canvas.ts
```typescript
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

import type Nullable from '../Nullable'
import { isValid } from './typeChecks'

let measureCtx: Nullable<CanvasRenderingContext2D> = null

/**
 * Get pixel ratio
 * @param canvas
 * @returns {number}
 */
export function getPixelRatio (canvas: HTMLCanvasElement): number {
  return canvas.ownerDocument.defaultView?.devicePixelRatio ?? 1
}

export function createFont (size?: number, weight?: string | number, family?: string): string {
  return `${weight ?? 'normal'} ${size ?? 12}px ${family ?? 'Helvetica Neue'}`
}

/**
 * Measure the width of text
 * @param text
 * @returns {number}
 */
export function calcTextWidth (text: string, size?: number, weight?: string | number, family?: string): number {
  if (!isValid(measureCtx)) {
    const canvas = document.createElement('canvas')
    const pixelRatio = getPixelRatio(canvas)
    measureCtx = canvas.getContext('2d')!
    measureCtx.scale(pixelRatio, pixelRatio)
  }
  measureCtx.font = createFont(size, weight, family)
  return Math.round(measureCtx.measureText(text).width)
}
```

## File: common/utils/color.ts
```typescript
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

import { isValid } from './typeChecks'

const rgbaRegExp = /^[rR][gG][Bb][Aa]\(([\s]*(2[0-4][0-9]|25[0-5]|[01]?[0-9][0-9]?)[\s]*,){3}[\s]*(1|1.0|0|0.[0-9])[\s]*\){1}$/

export function isRgba (color: string): boolean {
  return rgbaRegExp.test(color)
}

export function isHsla (color: string): boolean {
  return (/^[hH][Ss][Ll][Aa]\(([\s]*(360｜3[0-5][0-9]|[012]?[0-9][0-9]?)[\s]*,)([\s]*((100|[0-9][0-9]?)%|0)[\s]*,){2}([\s]*(1|1.0|0|0.[0-9])[\s]*)\)$/).test(color)
}

export function isTransparent (color: string): boolean {
  return color === 'transparent' ||
    color === 'none' ||
    /^[rR][gG][Bb][Aa]\(([\s]*(2[0-4][0-9]|25[0-5]|[01]?[0-9][0-9]?)[\s]*,){3}[\s]*0[\s]*\)$/.test(color) ||
    /^[hH][Ss][Ll][Aa]\(([\s]*(360｜3[0-5][0-9]|[012]?[0-9][0-9]?)[\s]*,)([\s]*((100|[0-9][0-9]?)%|0)[\s]*,){2}([\s]*0[\s]*)\)$/.test(color)
}

export function rgbToHex (rgb: string): string {
  if (!isRgba(rgb)) {
    return rgb
  }
  const match = rgbaRegExp.exec(rgb)
  if (!isValid(match)) {
    throw new Error('Invalid RGB string format')
  }
  const r = parseInt(match[1], 10).toString(16)
  const g = parseInt(match[2], 10).toString(16)
  const b = parseInt(match[3], 10).toString(16)
  return `#${r.length === 1 ? `0${r}` : r}${g.length === 1 ? `0${r}` : r}${b.length === 1 ? `0${r}` : r}`
}

export function hexToRgb (hex: string, alpha?: number): string {
  const h = hex.replace(/^#/, '')
  const i = parseInt(h, 16)
  const r = (i >> 16) & 255
  const g = (i >> 8) & 255
  const b = i & 255

  return `rgba(${r}, ${g}, ${b}, ${alpha ?? 1})`
}
```

## File: common/utils/compatible.ts
```typescript
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

import { isFunction } from './typeChecks'

export const DEFAULT_REQUEST_ID = -1

export function requestAnimationFrame (fn: (params: unknown) => unknown): number {
  if (isFunction(window.requestAnimationFrame)) {
    return window.requestAnimationFrame(fn)
  }
  return window.setTimeout(fn, 20)
}

export function cancelAnimationFrame (id: number): void {
  if (isFunction(window.cancelAnimationFrame)) {
    window.cancelAnimationFrame(id)
  } else {
    window.clearTimeout(id)
  }
}

export function requestIdleCallback (fn: IdleRequestCallback): number {
  if (isFunction(window.requestIdleCallback)) {
    return window.requestIdleCallback(fn)
  }
  const startTime = performance.now()
  return window.setTimeout(function () {
    fn({
      didTimeout: false,
      timeRemaining () {
        return Math.max(0, 50 - (performance.now() - startTime))
      }
    })
  }, 1)
}

export function cancelIdleCallback (id: number): void {
  if (isFunction(window.cancelIdleCallback)) {
    window.cancelIdleCallback(id)
  } else {
    window.clearTimeout(id)
  }
}
```

## File: common/utils/dom.ts
```typescript
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

/**
 * Create dom
 * @param tagName
 * @param styles
 * @return {*}
 */
export function createDom<K extends keyof HTMLElementTagNameMap> (tagName: K, styles?: Partial<CSSStyleDeclaration>): HTMLElementTagNameMap[K] {
  const dom = document.createElement(tagName)
  const s = styles ?? {}
  // eslint-disable-next-line guard-for-in -- ignore
  for (const key in s) {
    (dom.style)[key] = s[key] ?? ''
  }
  return dom
}
```

## File: common/utils/format.ts
```typescript
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

import { isNumber, isValid } from './typeChecks'

export interface DateTime {
  YYYY: string
  MM: string
  DD: string
  HH: string
  mm: string
  ss: string
}

const reEscapeChar = /\\(\\)?/g
const rePropName = RegExp(
  '[^.[\\]]+' + '|' +
  '\\[(?:' +
    '([^"\'][^[]*)' + '|' +
    '(["\'])((?:(?!\\2)[^\\\\]|\\\\.)*?)\\2' +
  ')\\]' + '|' +
  '(?=(?:\\.|\\[\\])(?:\\.|\\[\\]|$))'
  , 'g')

export function formatValue (data: unknown, key: string, defaultValue?: unknown): unknown {
  if (isValid(data)) {
    const path: string[] = []
    key.replace(rePropName, (subString: string, ...args: unknown[]) => {
      let k = subString
      if (isValid(args[1])) {
        k = (args[2] as string).replace(reEscapeChar, '$1')
      } else if (isValid(args[0])) {
        k = (args[0] as string).trim()
      }
      path.push(k)
      return ''
    })
    let value = data
    let index = 0
    const length = path.length
    while (isValid(value) && index < length) {
      value = value?.[path[index++]]
    }
    return isValid(value) ? value : (defaultValue ?? '--')
  }
  return defaultValue ?? '--'
}

export function formatTimestampToDateTime (dateTimeFormat: Intl.DateTimeFormat, timestamp: number): DateTime {
  const date: Record<string, string> = {}
  dateTimeFormat.formatToParts(new Date(timestamp)).forEach(({ type, value }) => {
    switch (type) {
      case 'year': {
        date.YYYY = value
        break
      }
      case 'month': {
        date.MM = value
        break
      }
      case 'day': {
        date.DD = value
        break
      }
      case 'hour': {
        date.HH = value === '24' ? '00' : value
        break
      }
      case 'minute': {
        date.mm = value
        break
      }
      case 'second': {
        date.ss = value
        break
      }
      default: { break }
    }
  })
  return date as unknown as DateTime
}

export function formatTimestampByTemplate (dateTimeFormat: Intl.DateTimeFormat, timestamp: number, template: string): string {
  const date = formatTimestampToDateTime(dateTimeFormat, timestamp)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return -- ignore
  return template.replace(/YYYY|MM|DD|HH|mm|ss/g, key => date[key])
}

export function formatPrecision (value: string | number, precision?: number): string {
  const v = +value
  if (isNumber(v)) {
    return v.toFixed(precision ?? 2)
  }
  return `${value}`
}

export function formatBigNumber (value: string | number): string {
  const v = +value
  if (isNumber(v)) {
    if (v > 1000000000) {
      return `${+((v / 1000000000).toFixed(3))}B`
    }
    if (v > 1000000) {
      return `${+((v / 1000000).toFixed(3))}M`
    }
    if (v > 1000) {
      return `${+((v / 1000).toFixed(3))}K`
    }
  }
  return `${value}`
}

export function formatThousands (value: string | number, sign: string): string {
  const vl = `${value}`
  if (sign.length === 0) {
    return vl
  }
  if (vl.includes('.')) {
    const arr = vl.split('.')
    return `${arr[0].replace(/(\d)(?=(\d{3})+$)/g, $1 => `${$1}${sign}`)}.${arr[1]}`
  }
  return vl.replace(/(\d)(?=(\d{3})+$)/g, $1 => `${$1}${sign}`)
}

export function formatFoldDecimal (value: string | number, threshold: number): string {
  const vl = `${value}`
  const reg = new RegExp('\\.0{' + threshold + ',}[1-9][0-9]*$')
  if (reg.test(vl)) {
    const result = vl.split('.')
    const lastIndex = result.length - 1
    const v = result[lastIndex]
    const match = /0*/.exec(v)
    if (isValid(match)) {
      const count = match[0].length
      result[lastIndex] = v.replace(/0*/, `0{${count}}`)
      return result.join('.')
    }
  }
  return vl
}

export function formatTemplateString (template: string, params: Record<string, unknown>): string {
  return template.replace(/\{(\w+)\}/g, (_, key) => {
    const value = params[key as string]
    if (isValid(value)) {
      return value as string
    }
    return `{${key}}`
  })
}
```

## File: common/utils/id.ts
```typescript
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

let baseId = 1
let prevIdTimestamp = new Date().getTime()

export function createId (prefix?: string): string {
  const timestamp = new Date().getTime()
  if (timestamp === prevIdTimestamp) {
    ++baseId
  } else {
    baseId = 1
  }
  prevIdTimestamp = timestamp
  return `${prefix ?? ''}${timestamp}_${baseId}`
}
```

## File: common/utils/logger.ts
```typescript
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

const DEV = process.env.NODE_ENV === 'development'

function log (templateText: string, tagStyle: string, messageStyle: string, api: string, invalidParam: string, append: string): void {
  if (DEV) {
    const apiStr = api !== '' ? `Call api \`${api}\`${invalidParam !== '' || append !== '' ? ', ' : '.'}` : ''
    const invalidParamStr = invalidParam !== '' ? `invalid parameter \`${invalidParam}\`${append !== '' ? ', ' : '.'}` : ''
    const appendStr = append !== '' ? append : ''
    console.log(templateText, tagStyle, messageStyle, apiStr, invalidParamStr, appendStr)
  }
}

export function logWarn (api: string, invalidParam: string, append?: string): void {
  log(
    '%c😑 klinecharts warning%c %s%s%s',
    'padding:3px 4px;border-radius:2px;color:#ffffff;background-color:#FF9600',
    'color:#FF9600',
    api, invalidParam, append ?? ''
  )
}

export function logError (api: string, invalidParam: string, append?: string): void {
  log(
    '%c😟 klinecharts error%c %s%s%s',
    'padding:3px 4px;border-radius:2px;color:#ffffff;background-color:#F92855;',
    'color:#F92855;',
    api, invalidParam, append ?? ''
  )
}

export function logTag (): void {
  log(
    '%c❤️ Welcome to klinecharts. Version is __VERSION__',
    'border-radius:4px;border:dashed 1px #1677FF;line-height:70px;padding:0 20px;margin:16px 0;font-size:14px;color:#1677FF;',
    '',
    '',
    '',
    ''
  )
}
```

## File: common/utils/number.ts
```typescript
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

/**
 * Binary search for the nearest result
 * @param dataList
 * @param valueKey
 * @param targetValue
 * @return {number}
 */
export function binarySearchNearest<T> (dataList: T[], valueKey: keyof T, targetValue: T[keyof T]): number {
  let left = 0
  let right = 0
  for (right = dataList.length - 1; left !== right;) {
    const midIndex = Math.floor((right + left) / 2)
    const mid = right - left
    const midValue = dataList[midIndex][valueKey]
    if (targetValue === dataList[left][valueKey]) {
      return left
    }
    if (targetValue === dataList[right][valueKey]) {
      return right
    }
    if (targetValue === midValue) {
      return midIndex
    }

    if (targetValue > midValue) {
      left = midIndex
    } else {
      right = midIndex
    }

    if (mid <= 2) {
      break
    }
  }
  return left
}

/**
 * 优化数字
 * @param value
 * @return {number|number}
 */
export function nice (value: number): number {
  const exponent = Math.floor(log10(value))
  const exp10 = index10(exponent)
  const f = value / exp10 // 1 <= f < 10
  let nf = 0
  if (f < 1.5) {
    nf = 1
  } else if (f < 2.5) {
    nf = 2
  } else if (f < 3.5) {
    nf = 3
  } else if (f < 4.5) {
    nf = 4
  } else if (f < 5.5) {
    nf = 5
  } else if (f < 6.5) {
    nf = 6
  } else {
    nf = 8
  }
  value = nf * exp10
  return +value.toFixed(Math.abs(exponent))
}

/**
 * Round
 * @param value
 * @param precision
 * @return {number}
 */
export function round (value: number, precision?: number): number {
  precision = Math.max(0, precision ?? 0)
  const pow = Math.pow(10, precision)
  return Math.round(value * pow) / pow
}

/**
 * Get precision
 * @param value
 * @return {number|number}
 */
export function getPrecision (value: number): number {
  const str = value.toString()
  const eIndex = str.indexOf('e')
  if (eIndex > 0) {
    const precision = +str.slice(eIndex + 1)
    return precision < 0 ? -precision : 0
  }
  const dotIndex = str.indexOf('.')
  return dotIndex < 0 ? 0 : str.length - 1 - dotIndex
}

export function getMaxMin<D> (dataList: D[], maxKey: keyof D, minKey: keyof D): number[] {
  const maxMin = [Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER]
  const dataLength = dataList.length
  let index = 0
  while (index < dataLength) {
    const data = dataList[index]
    maxMin[0] = Math.max((data[maxKey] ?? Number.MIN_SAFE_INTEGER) as number, maxMin[0])
    maxMin[1] = Math.min((data[minKey] ?? Number.MAX_SAFE_INTEGER) as number, maxMin[1])
    ++index
  }
  return maxMin
}

/**
 * log10
 * @param value
 * @return {number}
 */
export function log10 (value: number): number {
  if (value === 0) {
    return 0
  }
  return Math.log10(value)
}

/**
 * index 10
 * @param value
 * @return {number}
 */
export function index10 (value: number): number {
  return Math.pow(10, value)
}
```

## File: common/utils/performance.ts
```typescript
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

export function throttle (func: (...args: unknown[]) => unknown, wait?: number): () => void {
  let previous = 0
  return function () {
    const now = Date.now()
    if (now - previous > (wait ?? 20)) {
      func.apply(this, arguments)
      previous = now
    }
  }
}

// export function memoize<R1 = any, R2 = any> (func: (...args: any[]) => R1, resolver?: (...args: any[]) => R2): (...args: any[]) => R1 {
//   if (!isFunction(func) || (isValid(resolver) && !isFunction(resolver))) {
//     throw new TypeError('Expected a function')
//   }
//   const memoized = function (...args: any[]): any {
//     const key = isFunction(resolver) ? resolver.apply(this, args) : args[0]
//     const cache = memoized.cache

//     if (cache.has(key)) {
//       return cache.get(key)
//     }
//     const result = func.apply(this, args)
//     // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
//     memoized.cache = cache.set(key, result) || cache
//     return result
//   }
//   // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
//   memoized.cache = new (memoize.Cache || Map)()
//   return memoized
// }
// memoize.Cache = Map
```

## File: common/utils/platform.ts
```typescript
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

export function isFF (): boolean {
  if (typeof window === 'undefined') {
    return false
  }
  return window.navigator.userAgent.toLowerCase().includes('firefox')
}

export function isIOS (): boolean {
  if (typeof window === 'undefined') {
    return false
  }
  return /iPhone|iPad|iPod|iOS/.test(window.navigator.userAgent)
}

export function isAppleOS (): boolean {
  return /Mac|iPhone|iPad|iPod|iOS/.test(window.navigator.userAgent)
}
```

## File: common/utils/typeChecks.ts
```typescript
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- ignore
export function merge (target: any, source: any): void {
  if ((!isObject(target) && !isObject(source))) {
    return
  }
  for (const key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key) as boolean) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access -- ignore
      const targetProp = target[key]
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access -- ignore
      const sourceProp = source[key]
      if (
        isObject(sourceProp) &&
        isObject(targetProp)
      ) {
        merge(targetProp, sourceProp)
      } else {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access -- ignore
        target[key] = clone(sourceProp)
      }
    }
  }
}

export function clone<T> (target: T): T {
  if (!isObject(target)) {
    return target
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- ignore
  let copy: any = null
  if (isArray(target)) {
    copy = []
  } else {
    copy = {}
  }
  for (const key in target) {
    if (Object.prototype.hasOwnProperty.call(target, key) as boolean) {
      const v = target[key]
      if (isObject(v)) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access -- ignore
        copy[key] = clone(v)
      } else {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access -- ignore
        copy[key] = v
      }
    }
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return -- ignore
  return copy
}

export function isArray<T = unknown> (value: unknown): value is T[] {
  return Object.prototype.toString.call(value) === '[object Array]'
}

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-parameters -- ignore
export function isFunction<T = (...args: unknown[]) => unknown> (value: unknown): value is T {
  return typeof value === 'function'
}

export function isObject (value: unknown): value is object {
  return (typeof value === 'object') && isValid(value)
}

export function isNumber (value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value)
}

export function isValid<T> (value: T | null | undefined): value is T {
  return value !== null && value !== undefined
}

export function isBoolean (value: unknown): value is boolean {
  return typeof value === 'boolean'
}

export function isString (value: unknown): value is string {
  return typeof value === 'string'
}
```

## File: common/VisibleRange.ts
```typescript
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

export default interface VisibleRange {
  readonly from: number
  readonly to: number
  readonly realFrom: number
  readonly realTo: number
}

export function getDefaultVisibleRange (): VisibleRange {
  return { from: 0, to: 0, realFrom: 0, realTo: 0 }
}
```

## File: component/Axis.ts
```typescript
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

import type VisibleRange from '../common/VisibleRange'

import type DrawPane from '../pane/DrawPane'

import type Bounding from '../common/Bounding'
import type { Chart } from '../Chart'
import type PickRequired from '../common/PickRequired'

export interface AxisTick {
  coord: number
  value: number | string
  text: string
}

export interface AxisRange extends VisibleRange {
  readonly range: number
  readonly realRange: number
  readonly displayFrom: number
  readonly displayTo: number
  readonly displayRange: number
}

export interface AxisGap {
  top?: number
  bottom?: number
}

export type AxisPosition = 'left' | 'right'

export interface AxisValueToValueParams {
  range: AxisRange
}

export type AxisValueToValueCallback = (value: number, params: AxisValueToValueParams) => number

export interface AxisCreateRangeParams {
  chart: Chart
  paneId: string
  defaultRange: AxisRange
}

export type AxisCreateRangeCallback = (params: AxisCreateRangeParams) => AxisRange

export interface AxisCreateTicksParams {
  range: AxisRange
  bounding: Bounding
  defaultTicks: AxisTick[]
}

export type AxisCreateTicksCallback = (params: AxisCreateTicksParams) => AxisTick[]

export type AxisMinSpanCallback = (value: number) => number

export const TICK_COUNT = 8

export const DEFAULT_AXIS_ID = 'default'

export interface AxisOverride {
  name?: string
  id?: string
  paneId?: string
  reverse?: boolean
  inside?: boolean
  position?: AxisPosition
  scrollZoomEnabled?: boolean
  gap?: AxisGap
  createRange?: AxisCreateRangeCallback
  createTicks?: AxisCreateTicksCallback
}

export interface AxisTemplate extends PickRequired<AxisOverride, 'name'> {
  valueToRealValue?: AxisValueToValueCallback
  realValueToDisplayValue?: AxisValueToValueCallback
  displayValueToRealValue?: AxisValueToValueCallback
  realValueToValue?: AxisValueToValueCallback
  displayValueToText?: (value: number, precision: number) => string
  minSpan?: AxisMinSpanCallback
}

export interface Axis {
  override: (axis: AxisOverride) => void
  getTicks: () => AxisTick[]
  getRange: () => AxisRange
  getAutoSize: () => number
  convertToPixel: (value: number) => number
  convertFromPixel: (px: number) => number
}

function getDefaultAxisRange (): AxisRange {
  return {
    from: 0,
    to: 0,
    range: 0,
    realFrom: 0,
    realTo: 0,
    realRange: 0,
    displayFrom: 0,
    displayTo: 0,
    displayRange: 0
  }
}

export default abstract class AxisImp implements Axis {
  name: string
  scrollZoomEnabled = true
  createTicks: AxisCreateTicksCallback

  private readonly _parent: DrawPane

  private _range = getDefaultAxisRange()
  private _prevRange = getDefaultAxisRange()
  private _ticks: AxisTick[] = []

  private _autoCalcTickFlag = true

  constructor (parent: DrawPane) {
    this._parent = parent
  }

  getParent (): DrawPane { return this._parent }

  buildTicks (force: boolean): boolean {
    if (this._autoCalcTickFlag) {
      this._range = this.createRangeImp()
    }
    if (this._prevRange.from !== this._range.from || this._prevRange.to !== this._range.to || force) {
      this._prevRange = this._range
      this._ticks = this.createTicksImp()
      return true
    }
    return false
  }

  getTicks (): AxisTick[] {
    return this._ticks
  }

  setRange (range: AxisRange): void {
    this._autoCalcTickFlag = false
    this._range = range
  }

  getRange (): AxisRange { return this._range }

  setAutoCalcTickFlag (flag: boolean): void {
    this._autoCalcTickFlag = flag
  }

  getAutoCalcTickFlag (): boolean { return this._autoCalcTickFlag }

  protected abstract createRangeImp (): AxisRange

  protected abstract createTicksImp (): AxisTick[]

  protected abstract getBounding (): Bounding

  abstract override (axis: AxisOverride): void

  abstract getAutoSize (): number

  abstract convertToPixel (value: number): number
  abstract convertFromPixel (px: number): number
}
```

## File: component/Figure.ts
```typescript
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

import type Coordinate from '../common/Coordinate'

import Eventful from '../common/Eventful'
import type { MouseTouchEvent } from '../common/EventHandler'

export const DEVIATION = 2

export interface Figure<A = unknown, S = unknown> {
  name: string
  attrs: A
  styles: S
  draw: (ctx: CanvasRenderingContext2D, attrs: A, styles: S) => void
  checkEventOn: (coordinate: Coordinate, attrs: A, styles: S) => boolean
}

export type FigureTemplate<A = unknown, S = unknown> = Pick<Figure<A, S>, 'name' | 'draw' | 'checkEventOn'>

export type FigureCreate<A = unknown, S = unknown> = Pick<Figure<A, S>, 'name' | 'attrs' | 'styles'>

export type FigureConstructor<A = unknown, S = unknown> = new (figure: FigureCreate<A, S>) => ({ draw: (ctx: CanvasRenderingContext2D) => void })
export type FigureInnerConstructor<A = unknown, S = unknown> = new (figure: FigureCreate<A, S>) => FigureImp<A, S>
export default abstract class FigureImp<A = unknown, S = unknown> extends Eventful implements Omit<Figure<A, S>, 'name' | 'draw' | 'checkEventOn'> {
  attrs: A
  styles: S

  constructor (figure: FigureCreate<A, S>) {
    super()
    this.attrs = figure.attrs
    this.styles = figure.styles
  }

  checkEventOn (event: MouseTouchEvent): boolean {
    return this.checkEventOnImp(event, this.attrs, this.styles)
  }

  setAttrs (attrs: A): this {
    this.attrs = attrs
    return this
  }

  setStyles (styles: S): this {
    this.styles = styles
    return this
  }

  draw (ctx: CanvasRenderingContext2D): void {
    this.drawImp(ctx, this.attrs, this.styles)
  }

  abstract checkEventOnImp (event: MouseTouchEvent, attrs: A, styles: S): boolean

  abstract drawImp (ctx: CanvasRenderingContext2D, attrs: A, styles: S): void

  static extend<A, S> (figure: FigureTemplate<A, S>): new (figure: FigureCreate) => FigureImp<A, S> {
    class Custom extends FigureImp<A, S> {
      checkEventOnImp (coordinate: Coordinate, attrs: A, styles: S): boolean {
        return figure.checkEventOn(coordinate, attrs, styles)
      }

      drawImp (ctx: CanvasRenderingContext2D, attrs: A, styles: S): void {
        figure.draw(ctx, attrs, styles)
      }
    }
    return Custom
  }
}
```

## File: component/Indicator.ts
```typescript
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

import type Nullable from '../common/Nullable'
import type DeepPartial from '../common/DeepPartial'
import type ExcludePickPartial from '../common/ExcludePickPartial'
import type { KLineData, NeighborData } from '../common/Data'
import type Bounding from '../common/Bounding'
import type BarSpace from '../common/BarSpace'
import type Crosshair from '../common/Crosshair'
import type { IndicatorStyle, IndicatorPolygonStyle, SmoothLineStyle, RectStyle, TextStyle, TooltipFeatureStyle, LineType, TooltipLegend } from '../common/Styles'
import { isNumber, isValid, merge, isBoolean, isString, clone, isFunction } from '../common/utils/typeChecks'
import type { DataLoadType } from '../common/DataLoader'

import type { XAxis } from './XAxis'
import type { YAxis } from './YAxis'

import { formatValue } from '../common/utils/format'

import type { ArcAttrs } from '../extension/figure/arc'
import type { RectAttrs } from '../extension/figure/rect'
import type { TextAttrs } from '../extension/figure/text'
import type { Chart } from '../Chart'
import type { LineAttrs } from '../extension/figure/line'
import { DEFAULT_AXIS_ID } from './Axis'

export type IndicatorSeries = 'normal' | 'price' | 'volume'

export type IndicatorFigureStyle = Partial<Omit<SmoothLineStyle, 'style'>> & Partial<Omit<RectStyle, 'style'>> & Partial<TextStyle> & Partial<{ style: LineType[keyof LineType] }> & Record<string, unknown>

export type IndicatorFigureAttrs = Partial<ArcAttrs> & Partial<LineAttrs> & Partial<RectAttrs> & Partial<TextAttrs> & Record<string, unknown>

export interface IndicatorFigureAttrsCallbackParams<D> {
  data: NeighborData<Nullable<D>>
  coordinate: NeighborData<Record<keyof D, number> & { x: number }>
  bounding: Bounding
  barSpace: BarSpace
  xAxis: XAxis
  yAxis: YAxis
}

export interface IndicatorFigureStylesCallbackParams<D> {
  data: NeighborData<Nullable<D>>
  indicator: Indicator<D>
  barSpace: BarSpace
  defaultStyles?: IndicatorStyle
}

export type IndicatorFigureAttrsCallback<D> = (params: IndicatorFigureAttrsCallbackParams<D>) => Nullable<IndicatorFigureAttrs>
export type IndicatorFigureStylesCallback<D> = (params: IndicatorFigureStylesCallbackParams<D>) => Nullable<IndicatorFigureStyle>

export interface IndicatorFigure<D = unknown> {
  key: string
  title?: string
  type?: string
  baseValue?: number
  attrs?: IndicatorFigureAttrsCallback<D>
  styles?: IndicatorFigureStylesCallback<D>
}

export type IndicatorRegenerateFiguresCallback<D, C> = (calcParams: C[]) => Array<IndicatorFigure<D>>

export interface IndicatorTooltipData {
  name: string
  calcParamsText: string
  features: TooltipFeatureStyle[]
  legends: TooltipLegend[]
}

export interface IndicatorCreateTooltipDataSourceParams<D> {
  chart: Chart
  indicator: Indicator<D>
  bounding: Bounding
  crosshair: Crosshair
  xAxis: XAxis
  yAxis: YAxis
}

export type IndicatorCreateTooltipDataSourceCallback<D> = (params: IndicatorCreateTooltipDataSourceParams<D>) => IndicatorTooltipData

export type IndicatorEventTarget = 'feature'

export interface IndicatorDrawParams<D, C, E> {
  ctx: CanvasRenderingContext2D
  chart: Chart
  indicator: Indicator<D, C, E>
  bounding: Bounding
  xAxis: XAxis
  yAxis: YAxis
}

export type IndicatorDrawCallback<D, C, E> = (params: IndicatorDrawParams<D, C, E>) => boolean

export type IndicatorCalcCallback<D, C, E> = (dataList: KLineData[], indicator: Indicator<D, C, E>) => Promise<D[]> | D[]

export type IndicatorShouldUpdateCallback<D, C, E> = (prev: Indicator<D, C, E>, current: Indicator<D, C, E>) => (boolean | { calc: boolean, draw: boolean })

export type IndicatorDataState = 'loading' | 'error' | 'ready'

export interface IndicatorOnDataStateChangeParams<D> {
  state: IndicatorDataState
  type: DataLoadType

  indicator: Indicator<D>
}

export interface Indicator<D = unknown, C = unknown, E = unknown> {
  /**
   * Unique id
   */
  id: string

  /**
   * Pane id
   */
  paneId: string

  /**
   * Y-axis id
   */
  yAxisId: string

  /**
   * Indicator name
   */
  name: string

  /**
   * Short name, for display
   */
  shortName: string

  /**
   * Precision
   */
  precision: number

  /**
   * Calculation parameters
   */
  calcParams: C[]

  /**
   * Whether ohlc column is required
   */
  shouldOhlc: boolean

  /**
   * Whether large data values need to be formatted, starting from 1000, for example, whether 100000 needs to be formatted with 100K
   */
  shouldFormatBigNumber: boolean

  /**
   * Whether the indicator is visible
   */
  visible: boolean

  /**
   * Z index
   */
  zLevel: number

  /**
   * Extend data
   */
  extendData: E

  /**
   * Indicator series
   */
  series: IndicatorSeries

  /**
   * Figure configuration information
   */
  figures: Array<IndicatorFigure<D>>

  /**
   * Specified minimum value
   */
  minValue: Nullable<number>

  /**
   * Specified maximum value
   */
  maxValue: Nullable<number>

  /**
   * Style configuration
   */
  styles: Nullable<DeepPartial<IndicatorStyle>>

  /**
   *  Should update, should calc or draw
   */
  shouldUpdate: Nullable<IndicatorShouldUpdateCallback<D, C, E>>

  /**
   * Indicator calculation
   */
  calc: IndicatorCalcCallback<D, C, E>

  /**
   * Regenerate figure configuration
   */
  regenerateFigures: Nullable<IndicatorRegenerateFiguresCallback<D, C>>

  /**
   * Create custom tooltip text
   */
  createTooltipDataSource: Nullable<IndicatorCreateTooltipDataSourceCallback<D>>

  /**
   * Custom draw
   */
  draw: Nullable<IndicatorDrawCallback<D, C, E>>

  /**
   * Calculation result
   */
  result: D[]
}

export type IndicatorTemplate<D = unknown, C = unknown, E = unknown> = ExcludePickPartial<Omit<Indicator<D, C, E>, 'result' | 'paneId' | 'yAxisId'>, 'name' | 'calc'>

export type IndicatorCreate<D = unknown, C = unknown, E = unknown> = ExcludePickPartial<Omit<Indicator<D, C, E>, 'result' | 'paneId' | 'yAxisId'>, 'name'>

export type IndicatorOverride<D = unknown, C = unknown, E = unknown> = Partial<Omit<Indicator<D, C, E>, 'result' | 'yAxisId'>>

export type IndicatorFilter = Partial<Pick<Indicator, 'id' | 'paneId' | 'name'>>

export type IndicatorConstructor<D = unknown, C = unknown, E = unknown> = new () => IndicatorImp<D, C, E>

export type EachFigureCallback<D> = (figure: IndicatorFigure<D>, figureStyles: IndicatorFigureStyle, index: number) => void

export function eachFigures<D = unknown> (
  indicator: Indicator,
  dataIndex: number,
  barSpace: BarSpace,
  defaultStyles: IndicatorStyle,
  eachFigureCallback: EachFigureCallback<D>
): void {
  const result = indicator.result
  const figures = indicator.figures
  const styles = indicator.styles

  const textStyles = formatValue(styles, 'texts', defaultStyles.texts) as TextStyle[]
  const textStyleCount = textStyles.length

  const circleStyles = formatValue(styles, 'circles', defaultStyles.circles) as IndicatorPolygonStyle[]
  const circleStyleCount = circleStyles.length

  const barStyles = formatValue(styles, 'bars', defaultStyles.bars) as IndicatorPolygonStyle[]
  const barStyleCount = barStyles.length

  const lineStyles = formatValue(styles, 'lines', defaultStyles.lines) as SmoothLineStyle[]
  const lineStyleCount = lineStyles.length

  let textCount = 0
  let circleCount = 0
  let barCount = 0
  let lineCount = 0

  // eslint-disable-next-line @typescript-eslint/init-declarations  -- ignore
  let defaultFigureStyles
  let figureIndex = 0
  figures.forEach(figure => {
    switch (figure.type) {
      case 'text': {
        figureIndex = textCount
        defaultFigureStyles = textStyles[textCount % textStyleCount]
        textCount++
        break
      }
      case 'circle': {
        figureIndex = circleCount
        const styles = circleStyles[circleCount % circleStyleCount]
        defaultFigureStyles = { ...styles, color: styles.noChangeColor }
        circleCount++
        break
      }
      case 'bar': {
        figureIndex = barCount
        const styles = barStyles[barCount % barStyleCount]
        defaultFigureStyles = { ...styles, color: styles.noChangeColor }
        barCount++
        break
      }
      case 'line': {
        figureIndex = lineCount
        defaultFigureStyles = lineStyles[lineCount % lineStyleCount]
        lineCount++
        break
      }
      default: { break }
    }
    if (isValid(figure.type)) {
      const ss = figure.styles?.({
        data: {
          prev: result[dataIndex - 1],
          current: result[dataIndex],
          next: result[dataIndex + 1]
        },
        indicator,
        barSpace,
        defaultStyles
      })
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument -- ignore
      eachFigureCallback(figure, { ...defaultFigureStyles, ...ss }, figureIndex)
    }
  })
}

export default class IndicatorImp<D = unknown, C = unknown, E = unknown> implements Indicator<D, C, E> {
  id: string
  paneId: string
  yAxisId = DEFAULT_AXIS_ID
  name: string
  shortName: string
  precision = 4
  calcParams: C[] = []
  shouldOhlc = false
  shouldFormatBigNumber = false
  visible = true
  zLevel = 0
  extendData: E
  series: IndicatorSeries = 'normal'
  figures: Array<IndicatorFigure<D>> = []
  minValue: Nullable<number> = null
  maxValue: Nullable<number> = null
  styles: Nullable<Partial<IndicatorStyle>> = null
  shouldUpdate: IndicatorShouldUpdateCallback<D, C, E> = (prev, current) => {
    const calc = JSON.stringify(prev.calcParams) !== JSON.stringify(current.calcParams) ||
      prev.figures !== current.figures ||
      prev.calc !== current.calc
    const draw = calc ||
      prev.shortName !== current.shortName ||
      prev.paneId !== current.paneId ||
      prev.yAxisId !== current.yAxisId ||
      prev.series !== current.series ||
      prev.minValue !== current.minValue ||
      prev.maxValue !== current.maxValue ||
      prev.precision !== current.precision ||
      prev.shouldOhlc !== current.shouldOhlc ||
      prev.shouldFormatBigNumber !== current.shouldFormatBigNumber ||
      prev.visible !== current.visible ||
      prev.zLevel !== current.zLevel ||
      prev.extendData !== current.extendData ||
      prev.regenerateFigures !== current.regenerateFigures ||
      prev.createTooltipDataSource !== current.createTooltipDataSource ||
      prev.draw !== current.draw

    return { calc, draw }
  }

  calc: IndicatorCalcCallback<D, C, E> = () => []
  regenerateFigures: Nullable<IndicatorRegenerateFiguresCallback<D, C>> = null
  createTooltipDataSource: Nullable<IndicatorCreateTooltipDataSourceCallback<D>> = null
  draw: Nullable<IndicatorDrawCallback<D, C, E>> = null

  result: D[] = []

  private _prevIndicator: Indicator<D, C, E>
  private _lockSeriesPrecision = false

  constructor (indicator: IndicatorTemplate<D, C, E>) {
    this.override(indicator)
    this._lockSeriesPrecision = false
  }

  override (indicator: Partial<Indicator<D, C, E>>): void {
    const { result, ...currentOthers } = this
    this._prevIndicator = { ...clone(currentOthers), result }
    const {
      id,
      name,
      shortName,
      precision,
      styles,
      figures,
      calcParams,
      ...others
    } = indicator
    if (!isString(this.id) && isString(id)) {
      this.id = id
    }
    if (!isString(this.name)) {
      this.name = name ?? ''
    }
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition  -- ignore
    this.shortName = shortName ?? this.shortName ?? this.name
    if (isNumber(precision)) {
      this.precision = precision
      this._lockSeriesPrecision = true
    }

    if (isValid(styles)) {
      this.styles ??= {}
      merge(this.styles, styles)
    }
    merge(this, others)
    if (isValid(calcParams)) {
      this.calcParams = calcParams
      if (isFunction(this.regenerateFigures)) {
        this.figures = this.regenerateFigures(this.calcParams)
      }
    }
    this.figures = figures ?? this.figures
  }

  setSeriesPrecision (precision: number): void {
    if (!this._lockSeriesPrecision) {
      this.precision = precision
    }
  }

  shouldUpdateImp (): ({ calc: boolean, draw: boolean, sort: boolean }) {
    const sort = this._prevIndicator.zLevel !== this.zLevel
    const result = this.shouldUpdate(this._prevIndicator, this)
    if (isBoolean(result)) {
      return { calc: result, draw: result, sort }
    }
    return { ...result, sort }
  }

  async calcImp (dataList: KLineData[]): Promise<boolean> {
    try {
      const result = await this.calc(dataList, this)
      this.result = result
      return true
    } catch (e) {
      return false
    }
  }

  static extend<D = unknown> (template: IndicatorTemplate<D>): IndicatorConstructor<D> {
    class Custom extends IndicatorImp<D> {
      constructor () {
        super(template)
      }
    }
    return Custom
  }
}
```

## File: component/Overlay.ts
```typescript
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

import type Nullable from '../common/Nullable'
import type DeepPartial from '../common/DeepPartial'
import type ExcludePickPartial from '../common/ExcludePickPartial'
import type Point from '../common/Point'
import type Coordinate from '../common/Coordinate'
import type Bounding from '../common/Bounding'
import type { OverlayStyle } from '../common/Styles'
import type { MouseTouchEvent } from '../common/EventHandler'
import { clone, isArray, isBoolean, isNumber, isString, isValid, merge } from '../common/utils/typeChecks'

import type { XAxis } from './XAxis'
import type { YAxis } from './YAxis'
import type ChartStore from '../Store'
import type { Chart } from '../Chart'

export type OverlayMode = 'normal' | 'weak_magnet' | 'strong_magnet'

export interface OverlayPerformEventParams {
  currentStep: number
  mode: OverlayMode
  points: Array<Partial<Point>>
  performPointIndex: number
  performPoint: Partial<Point>
}

/**
 * Drawing mode for overlays
 * - 'step': Traditional click-based drawing (default)
 * - 'continuous': Freehand drawing with mouse down, move, up
 */
export type OverlayDrawingMode = 'step' | 'continuous'

export interface OverlayEventCollection<E> {
  onDrawStart: Nullable<OverlayEventCallback<E>>
  onDrawing: Nullable<OverlayEventCallback<E>>
  onDrawEnd: Nullable<OverlayEventCallback<E>>
  onRemoved: Nullable<OverlayEventCallback<E>>
  onClick: Nullable<OverlayEventCallback<E>>
  onDoubleClick: Nullable<OverlayEventCallback<E>>
  onRightClick: Nullable<OverlayEventCallback<E>>
  onPressedMoveStart: Nullable<OverlayEventCallback<E>>
  onPressedMoving: Nullable<OverlayEventCallback<E>>
  onPressedMoveEnd: Nullable<OverlayEventCallback<E>>
  onMouseMove: Nullable<OverlayEventCallback<E>>
  onMouseEnter: Nullable<OverlayEventCallback<E>>
  onMouseLeave: Nullable<OverlayEventCallback<E>>
  onSelected: Nullable<OverlayEventCallback<E>>
  onDeselected: Nullable<OverlayEventCallback<E>>
}

export function checkOverlayFigureEvent (
  targetEventType: keyof Omit<OverlayEventCollection<unknown>, 'onDrawStart' | 'onDrawing' | 'onDrawEnd' | 'onRemoved'>,
  figure: Nullable<OverlayFigure>
): boolean {
  const ignoreEvent = figure?.ignoreEvent ?? false
  if (isBoolean(ignoreEvent)) {
    return !ignoreEvent
  }
  return !ignoreEvent.includes(targetEventType)
}

export interface OverlayFigure {
  key?: string
  type: string
  attrs: unknown
  styles?: unknown
  ignoreEvent?: boolean | Array<keyof Omit<OverlayEventCollection<unknown>, 'onDrawStart' | 'onDrawing' | 'onDrawEnd' | 'onRemoved'>>
}

export interface OverlayCreateFiguresCallbackParams<E> {
  chart: Chart
  overlay: Overlay<E>
  coordinates: Coordinate[]
  bounding: Bounding
  xAxis: Nullable<XAxis>
  yAxis: Nullable<YAxis>
}

export interface OverlayEvent<E> extends Partial<MouseTouchEvent> {
  figure?: OverlayFigure
  overlay: Overlay<E>
  chart: Chart
}

export type OverlayEventCallback<E> = (event: OverlayEvent<E>) => void

export type OverlayCreateFiguresCallback<E> = (params: OverlayCreateFiguresCallbackParams<E>) => OverlayFigure | OverlayFigure[]

export interface Overlay<E = unknown> extends OverlayEventCollection<E> {
  /**
   * Unique identification
   */
  id: string

  /**
   * Group id
   */
  groupId: string

  /**
   * Pane id
   */
  paneId: string

  /**
   * Name
   */
  name: string

  /**
   * Total number of steps required to complete mouse operation
   */
  totalStep: number

  /**
   * Current step
   */
  currentStep: number

  /**
   * Drawing mode: 'step' for click-based, 'continuous' for freehand
   */
  drawingMode: OverlayDrawingMode

  /**
   * Whether it is locked. When it is true, it will not respond to events
   */
  lock: boolean

  /**
   * Whether the overlay is visible
   */
  visible: boolean

  /**
   * Draw level
   */
  zLevel: number

  /**
   * Whether the default figure corresponding to the point is required
   */
  needDefaultPointFigure: boolean

  /**
   * Whether the default figure on the Y axis is required
   */
  needDefaultXAxisFigure: boolean

  /**
   * Whether the default figure on the X axis is required
   */
  needDefaultYAxisFigure: boolean

  /**
   * Mode
   */
  mode: OverlayMode

  /**
   * When mode is weak_magnet is the response distance
   */
  modeSensitivity: number

  /**
   * Time and value information
   */
  points: Array<Partial<Point>>

  /**
   * Extended Data
   */
  extendData: E

  /**
   * The style information and format are consistent with the overlay in the unified configuration
   */
  styles: Nullable<DeepPartial<OverlayStyle>>

  /**
   * Create figures corresponding to points
   */
  createPointFigures: Nullable<OverlayCreateFiguresCallback<E>>

  /**
   * Create figures on the Y axis
   */
  createXAxisFigures: Nullable<OverlayCreateFiguresCallback<E>>

  /**
   * Create figures on the X axis
   */
  createYAxisFigures: Nullable<OverlayCreateFiguresCallback<E>>

  /**
   * Special handling callbacks when pressing events
   */
  performEventPressedMove: Nullable<(params: OverlayPerformEventParams) => void>

  /**
   * In drawing, special handling callback when moving events
   */
  performEventMoveForDrawing: Nullable<(params: OverlayPerformEventParams) => void>
}

export type OverlayTemplate<E = unknown> = ExcludePickPartial<Omit<Overlay<E>, 'id' | 'groupId' | 'paneId' | 'points' | 'currentStep'>, 'name'>

export type OverlayCreate<E = unknown> = ExcludePickPartial<Omit<Overlay<E>, 'drawingMode' | 'currentStep' | 'totalStep' | 'createPointFigures' | 'createXAxisFigures' | 'createYAxisFigures' | 'performEventPressedMove' | 'performEventMoveForDrawing'>, 'name'>
export type OverlayOverride<E = unknown> = Partial<Omit<Overlay<E>, 'drawingMode' | 'currentStep' | 'totalStep' | 'createPointFigures' | 'createXAxisFigures' | 'createYAxisFigures' | 'performEventPressedMove' | 'performEventMoveForDrawing'>>

export type OverlayFilter<E = unknown> = Partial<Pick<Overlay<E>, 'id' | 'groupId' | 'name' | 'paneId'>>

export type OverlayInnerConstructor<E = unknown> = new () => OverlayImp<E>
export type OverlayConstructor<E = unknown> = new () => Overlay<E>

const OVERLAY_DRAW_STEP_START = 1
const OVERLAY_DRAW_STEP_FINISHED = -1

export const OVERLAY_ID_PREFIX = 'overlay_'

export const OVERLAY_FIGURE_KEY_PREFIX = 'overlay_figure_'

export default class OverlayImp<E = unknown> implements Overlay<E> {
  id: string
  groupId = ''
  paneId: string
  name: string
  totalStep = 1
  currentStep = OVERLAY_DRAW_STEP_START
  drawingMode: OverlayDrawingMode = 'step'
  lock = false
  visible = true
  zLevel = 0
  needDefaultPointFigure = false
  needDefaultXAxisFigure = false
  needDefaultYAxisFigure = false
  mode: OverlayMode = 'normal'
  modeSensitivity = 8
  points: Array<Partial<Point>> = []
  extendData: E
  styles: Nullable<DeepPartial<OverlayStyle>> = null
  createPointFigures: Nullable<OverlayCreateFiguresCallback<E>> = null
  createXAxisFigures: Nullable<OverlayCreateFiguresCallback<E>> = null
  createYAxisFigures: Nullable<OverlayCreateFiguresCallback<E>> = null
  performEventPressedMove: Nullable<(params: OverlayPerformEventParams) => void> = null
  performEventMoveForDrawing: Nullable<(params: OverlayPerformEventParams) => void> = null
  onDrawStart: Nullable<OverlayEventCallback<E>> = null
  onDrawing: Nullable<OverlayEventCallback<E>> = null
  onDrawEnd: Nullable<OverlayEventCallback<E>> = null
  onClick: Nullable<OverlayEventCallback<E>> = null
  onDoubleClick: Nullable<OverlayEventCallback<E>> = null
  onRightClick: Nullable<OverlayEventCallback<E>> = null
  onPressedMoveStart: Nullable<OverlayEventCallback<E>> = null
  onPressedMoving: Nullable<OverlayEventCallback<E>> = null
  onPressedMoveEnd: Nullable<OverlayEventCallback<E>> = null
  onMouseMove: Nullable<OverlayEventCallback<E>> = null
  onMouseEnter: Nullable<OverlayEventCallback<E>> = null
  onMouseLeave: Nullable<OverlayEventCallback<E>> = null
  onRemoved: Nullable<OverlayEventCallback<E>> = null
  onSelected: Nullable<OverlayEventCallback<E>> = null
  onDeselected: Nullable<OverlayEventCallback<E>> = null

  private _prevZLevel = 0

  private _prevOverlay: Overlay<E>

  private _prevPressedPoint: Nullable<Partial<Point>> = null
  private _prevPressedPoints: Array<Partial<Point>> = []

  constructor (overlay: OverlayTemplate<E>) {
    this.override(overlay)
  }

  override (overlay: Partial<Overlay<E>>): void {
    this._prevOverlay = clone({
      ...this,
      _prevOverlay: null
    })

    const {
      id,
      name,
      currentStep: _,
      points,
      styles,
      ...others
    } = overlay

    merge(this, others)

    if (!isString(this.name)) {
      this.name = name ?? ''
    }

    if (!isString(this.id) && isString(id)) {
      this.id = id
    }

    if (isValid(styles)) {
      this.styles ??= {}
      merge(this.styles, styles)
    }

    if (isArray(points) && points.length > 0) {
      this.points = [...points]
      this.currentStep = OVERLAY_DRAW_STEP_FINISHED
      const lastIndex = this.points.length - 1
      const lastPoint = this.points[lastIndex]
      if (lastIndex > 0 && isValid(lastPoint)) {
        this.performEventPressedMove?.({
          currentStep: this.currentStep,
          mode: this.mode,
          points: this.points,
          performPointIndex: lastIndex,
          performPoint: lastPoint
        })
      }
    }
  }

  getPrevZLevel (): number { return this._prevZLevel }

  setPrevZLevel (zLevel: number): void { this._prevZLevel = zLevel }

  shouldUpdate (): { draw: boolean, sort: boolean } {
    const sort = this._prevOverlay.zLevel !== this.zLevel
    const draw = sort ||
      JSON.stringify(this._prevOverlay.points) !== JSON.stringify(this.points) ||
      this._prevOverlay.visible !== this.visible ||
      this._prevOverlay.extendData !== this.extendData ||
      this._prevOverlay.styles !== this.styles

    return { sort, draw }
  }

  nextStep (): void {
    if (this.currentStep === this.totalStep - 1) {
      this.currentStep = OVERLAY_DRAW_STEP_FINISHED
    } else {
      this.currentStep++
    }
  }

  forceComplete (): void {
    this.currentStep = OVERLAY_DRAW_STEP_FINISHED
  }

  isDrawing (): boolean {
    return this.currentStep !== OVERLAY_DRAW_STEP_FINISHED
  }

  isStart (): boolean {
    return this.currentStep === OVERLAY_DRAW_STEP_START
  }

  isContinuousDrawingMode (): boolean {
    return this.drawingMode === 'continuous'
  }

  /**
   * Start continuous drawing - set first point
   */
  startContinuousDrawing (point: Partial<Point>): void {
    this.points = []
    this.continuousDrawingModeEventMoveForDrawing(point)
    this.currentStep = 2 // Mark as actively drawing
  }

  /**
   * Add a point during continuous drawing mode
   */
  continuousDrawingModeEventMoveForDrawing (point: Partial<Point>): boolean {
    const newPoint: Partial<Point> = {}
    if (isNumber(point.timestamp)) {
      newPoint.timestamp = point.timestamp
    }
    if (isNumber(point.dataIndex)) {
      newPoint.dataIndex = point.dataIndex
    }
    if (isNumber(point.value)) {
      newPoint.value = point.value
    }
    this.points.push(newPoint)
    return true
  }

  stepDrawingModeEventMoveForDrawing (point: Partial<Point>): void {
    const pointIndex = this.currentStep - 1
    const newPoint: Partial<Point> = {}
    if (isNumber(point.timestamp)) {
      newPoint.timestamp = point.timestamp
    }
    if (isNumber(point.dataIndex)) {
      newPoint.dataIndex = point.dataIndex
    }
    if (isNumber(point.value)) {
      newPoint.value = point.value
    }
    this.points[pointIndex] = newPoint
    this.performEventMoveForDrawing?.({
      currentStep: this.currentStep,
      mode: this.mode,
      points: this.points,
      performPointIndex: pointIndex,
      performPoint: newPoint
    })
  }

  eventPressedPointMove (point: Partial<Point>, pointIndex: number): void {
    this.points[pointIndex].timestamp = point.timestamp
    if (isNumber(point.dataIndex)) {
      this.points[pointIndex].dataIndex = point.dataIndex
    }
    if (isNumber(point.value)) {
      this.points[pointIndex].value = point.value
    }
    this.performEventPressedMove?.({
      currentStep: this.currentStep,
      points: this.points,
      mode: this.mode,
      performPointIndex: pointIndex,
      performPoint: this.points[pointIndex]
    })
  }

  startPressedMove (point: Partial<Point>): void {
    this._prevPressedPoint = { ...point }
    this._prevPressedPoints = clone(this.points)
  }

  eventPressedOtherMove (point: Partial<Point>, chartStore: ChartStore): void {
    if (this._prevPressedPoint !== null) {
      let difDataIndex: Nullable<number> = null
      if (isNumber(point.dataIndex) && isNumber(this._prevPressedPoint.dataIndex)) {
        difDataIndex = point.dataIndex - this._prevPressedPoint.dataIndex
      }
      let difValue: Nullable<number> = null
      if (isNumber(point.value) && isNumber(this._prevPressedPoint.value)) {
        difValue = point.value - this._prevPressedPoint.value
      }
      this.points = this._prevPressedPoints.map(p => {
        const newPoint = { ...p }
        if (isNumber(difDataIndex) && (isNumber(p.dataIndex) || isNumber(p.timestamp))) {
          const dataIndex = isNumber(p.timestamp)
            ? this.isContinuousDrawingMode()
              ? chartStore.timestampToFloatIndex(p.timestamp)
              : chartStore.timestampToDataIndex(p.timestamp)
            : p.dataIndex!
          newPoint.dataIndex = dataIndex + difDataIndex
          newPoint.timestamp = this.isContinuousDrawingMode()
            ? chartStore.floatIndexToTimestamp(newPoint.dataIndex) ?? undefined
            : chartStore.dataIndexToTimestamp(newPoint.dataIndex) ?? undefined
        }
        if (isNumber(difValue) && isNumber(p.value)) {
          newPoint.value = p.value + difValue
        }
        return newPoint
      })
    }
  }

  static extend<E = unknown> (template: OverlayTemplate<E>): OverlayInnerConstructor<E> {
    class Custom extends OverlayImp<E> {
      constructor () {
        super(template)
      }
    }
    return Custom
  }
}
```

## File: component/XAxis.ts
```typescript
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

import type Nullable from '../common/Nullable'
import type Bounding from '../common/Bounding'
import { isFunction, isNumber, isString } from '../common/utils/typeChecks'

import AxisImp, { type Axis, type AxisRange, type AxisTick, TICK_COUNT, type AxisOverride } from './Axis'

import type DrawPane from '../pane/DrawPane'
import { calcTextWidth } from '../common/utils/canvas'
import { PeriodTypeXAxisFormat } from '../common/Period'
import type PickRequired from '../common/PickRequired'

export type XAxisOverride = Pick<AxisOverride, 'name' | 'scrollZoomEnabled' | 'createTicks'>

export type XAxisTemplate = PickRequired<XAxisOverride, 'name'>

export interface XAxis extends Axis, Required<XAxisTemplate> {
  convertTimestampFromPixel: (pixel: number) => Nullable<number>
  convertTimestampToPixel: (timestamp: number) => number
}

export type XAxisConstructor = new (parent: DrawPane) => XAxis

export default abstract class XAxisImp extends AxisImp implements XAxis {
  constructor (parent: DrawPane, xAxis: XAxisTemplate) {
    super(parent)
    this.override(xAxis)
  }

  override (xAxis: AxisOverride): void {
    const {
      name,
      scrollZoomEnabled,
      createTicks
    } = xAxis
    if (!isString(this.name) && isString(name)) {
      this.name = name
    }
    this.scrollZoomEnabled = scrollZoomEnabled ?? this.scrollZoomEnabled
    this.createTicks = createTicks ?? this.createTicks
  }

  protected override createRangeImp (): AxisRange {
    const chartStore = this.getParent().getChart().getChartStore()
    const visibleDataRange = chartStore.getVisibleRange()
    const { realFrom, realTo } = visibleDataRange
    const af = realFrom
    const at = realTo
    const diff = realTo - realFrom + 1
    const range = {
      from: af,
      to: at,
      range: diff,
      realFrom: af,
      realTo: at,
      realRange: diff,
      displayFrom: af,
      displayTo: at,
      displayRange: diff
    }
    return range
  }

  protected override createTicksImp (): AxisTick[] {
    const { realFrom, realTo, from } = this.getRange()
    const chartStore = this.getParent().getChart().getChartStore()
    const formatDate = chartStore.getInnerFormatter().formatDate
    const period = chartStore.getPeriod()
    const ticks: AxisTick[] = []

    const barSpace = chartStore.getBarSpace().bar
    const textStyles = chartStore.getStyles().xAxis.tickText
    const tickTextWidth = Math.max(calcTextWidth('YYYY-MM-DD HH:mm:ss', textStyles.size, textStyles.weight, textStyles.family), this.getBounding().width / TICK_COUNT)
    let tickBetweenBarCount = Math.ceil(tickTextWidth / barSpace)
    if (tickBetweenBarCount % 2 !== 0) {
      tickBetweenBarCount += 1
    }
    const startDataIndex = Math.max(0, Math.floor(realFrom / tickBetweenBarCount) * tickBetweenBarCount)

    for (let i = startDataIndex; i < realTo; i += tickBetweenBarCount) {
      if (i >= from) {
        const timestamp = chartStore.dataIndexToTimestamp(i)
        if (isNumber(timestamp)) {
          ticks.push({
            coord: this.convertToPixel(i),
            value: timestamp,
            text: formatDate(timestamp, PeriodTypeXAxisFormat[period?.type ?? 'day'], 'xAxis')
          })
        }
      }
    }

    if (isFunction(this.createTicks)) {
      return this.createTicks({
        range: this.getRange(),
        bounding: this.getBounding(),
        defaultTicks: ticks
      })
    }
    return ticks
  }

  override getAutoSize (): number {
    const styles = this.getParent().getChart().getStyles()
    const xAxisStyles = styles.xAxis
    const height = xAxisStyles.size
    if (height !== 'auto') {
      return height
    }
    const crosshairStyles = styles.crosshair
    let xAxisHeight = 0
    if (xAxisStyles.show) {
      if (xAxisStyles.axisLine.show) {
        xAxisHeight += xAxisStyles.axisLine.size
      }
      if (xAxisStyles.tickLine.show) {
        xAxisHeight += xAxisStyles.tickLine.length
      }
      if (xAxisStyles.tickText.show) {
        xAxisHeight += (xAxisStyles.tickText.marginStart + xAxisStyles.tickText.marginEnd + xAxisStyles.tickText.size)
      }
    }
    let crosshairVerticalTextHeight = 0
    if (
      crosshairStyles.show &&
      crosshairStyles.vertical.show &&
      crosshairStyles.vertical.text.show
    ) {
      crosshairVerticalTextHeight += (
        crosshairStyles.vertical.text.paddingTop +
        crosshairStyles.vertical.text.paddingBottom +
        crosshairStyles.vertical.text.borderSize * 2 +
        crosshairStyles.vertical.text.size
      )
    }
    return Math.max(xAxisHeight, crosshairVerticalTextHeight)
  }

  protected override getBounding (): Bounding {
    return this.getParent().getMainWidget().getBounding()
  }

  convertTimestampFromPixel (pixel: number): Nullable<number> {
    const chartStore = this.getParent().getChart().getChartStore()
    const dataIndex = chartStore.coordinateToDataIndex(pixel)
    return chartStore.dataIndexToTimestamp(dataIndex)
  }

  convertTimestampToPixel (timestamp: number): number {
    const chartStore = this.getParent().getChart().getChartStore()
    const dataIndex = chartStore.timestampToDataIndex(timestamp)
    return chartStore.dataIndexToCoordinate(dataIndex)
  }

  convertFromPixel (pixel: number): number {
    return this.getParent().getChart().getChartStore().coordinateToDataIndex(pixel)
  }

  convertToPixel (value: number): number {
    return this.getParent().getChart().getChartStore().dataIndexToCoordinate(value)
  }

  static extend (template: XAxisTemplate): XAxisConstructor {
    class Custom extends XAxisImp {
      constructor (parent: DrawPane) {
        super(parent, template)
      }
    }
    return Custom
  }
}
```

## File: component/YAxis.ts
```typescript
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

import type Bounding from '../common/Bounding'
import { isFunction, isNumber, isString, isValid, merge } from '../common/utils/typeChecks'
import { index10, getPrecision, nice, round } from '../common/utils/number'
import { calcTextWidth } from '../common/utils/canvas'
import { formatPrecision } from '../common/utils/format'
import { SymbolDefaultPrecisionConstants } from '../common/SymbolInfo'

import AxisImp, {
  type Axis, type AxisRange,
  type AxisTick, type AxisValueToValueCallback,
  type AxisMinSpanCallback, type AxisCreateRangeCallback,
  type AxisPosition,
  TICK_COUNT,
  DEFAULT_AXIS_ID,
  type AxisOverride,
  type AxisTemplate
} from './Axis'

import type DrawPane from '../pane/DrawPane'

import { PaneIdConstants } from '../pane/types'

export type YAxisTemplate = AxisTemplate

export type YAxisOverride = AxisOverride & { needWidget?: boolean }

export interface YAxis extends Axis, Required<YAxisTemplate> {
  isFromZero: () => boolean
  isInCandle: () => boolean
  convertToNicePixel: (value: number) => number
}

export type YAxisConstructor = new (parent: DrawPane) => YAxis

export default abstract class YAxisImp extends AxisImp implements YAxis {
  id = DEFAULT_AXIS_ID
  paneId = ''
  reverse = false
  inside = false
  position: AxisPosition = 'right'
  gap = {
    top: 0.2,
    bottom: 0.1
  }

  createRange: AxisCreateRangeCallback = params => params.defaultRange
  minSpan: AxisMinSpanCallback = precision => index10(-precision)
  valueToRealValue: AxisValueToValueCallback = value => value
  realValueToDisplayValue: AxisValueToValueCallback = value => value
  displayValueToRealValue: AxisValueToValueCallback = value => value
  realValueToValue: AxisValueToValueCallback = value => value
  displayValueToText: ((value: number, precision: number) => string) = (value, precision) => formatPrecision(value, precision)

  constructor (parent: DrawPane, yAxis: YAxisTemplate) {
    super(parent)
    const {
      minSpan,
      valueToRealValue,
      realValueToDisplayValue,
      displayValueToRealValue,
      realValueToValue,
      displayValueToText,
      ...others
    } = yAxis

    if (isFunction(minSpan)) {
      this.minSpan = minSpan
    }
    if (isFunction(valueToRealValue)) {
      this.valueToRealValue = valueToRealValue
    }
    if (isFunction(realValueToDisplayValue)) {
      this.realValueToDisplayValue = realValueToDisplayValue
    }
    if (isFunction(displayValueToRealValue)) {
      this.displayValueToRealValue = displayValueToRealValue
    }
    if (isFunction(realValueToValue)) {
      this.realValueToValue = realValueToValue
    }
    if (isFunction(displayValueToText)) {
      this.displayValueToText = displayValueToText
    }

    this.override(others)
  }

  override (yAxis: AxisOverride): void {
    const {
      id,
      name,
      gap,
      ...others
    } = yAxis
    if (isValid(id) && this.id === DEFAULT_AXIS_ID) {
      this.id = id
    }
    if (!isString(this.name) && isString(name)) {
      this.name = name
    }
    merge(this.gap, gap)
    merge(this, others)
  }

  protected override createRangeImp (): AxisRange {
    const parent = this.getParent()
    const chart = parent.getChart()
    const chartStore = chart.getChartStore()
    const paneId = parent.getId()
    let min = Number.MAX_SAFE_INTEGER
    let max = Number.MIN_SAFE_INTEGER
    let shouldOhlc = false
    let specifyMin = Number.MAX_SAFE_INTEGER
    let specifyMax = Number.MIN_SAFE_INTEGER
    let indicatorPrecision = Number.MAX_SAFE_INTEGER
    const indicators = chartStore.getIndicatorsByPaneId(paneId).filter(indicator => indicator.yAxisId === this.id)
    indicators.forEach(indicator => {
      shouldOhlc ||= indicator.shouldOhlc
      indicatorPrecision = Math.min(indicatorPrecision, indicator.precision)
      if (isNumber(indicator.minValue)) {
        specifyMin = Math.min(specifyMin, indicator.minValue)
      }
      if (isNumber(indicator.maxValue)) {
        specifyMax = Math.max(specifyMax, indicator.maxValue)
      }
    })

    let precision = 4
    const inCandle = this.isInCandle()
    const isDefaultYAxis = this.id === DEFAULT_AXIS_ID
    if (inCandle) {
      const pricePrecision = chartStore.getSymbol()?.pricePrecision ?? SymbolDefaultPrecisionConstants.PRICE
      if (indicatorPrecision !== Number.MAX_SAFE_INTEGER) {
        precision = Math.min(indicatorPrecision, pricePrecision)
      } else {
        precision = pricePrecision
      }
    } else {
      if (indicatorPrecision !== Number.MAX_SAFE_INTEGER) {
        precision = indicatorPrecision
      }
    }
    const visibleRangeDataList = chartStore.getVisibleRangeDataList()
    const candleStyles = chart.getStyles().candle
    const isArea = candleStyles.type === 'area'
    const areaValueKey = candleStyles.area.value
    const shouldCompareHighLow = (inCandle && isDefaultYAxis && !isArea) || (!inCandle && shouldOhlc)
    visibleRangeDataList.forEach((visibleData) => {
      const dataIndex = visibleData.dataIndex
      const data = visibleData.data.current
      if (isValid(data)) {
        if (shouldCompareHighLow) {
          min = Math.min(min, data.low)
          max = Math.max(max, data.high)
        }
        if (inCandle && isDefaultYAxis && isArea) {
          const value = data[areaValueKey]
          if (isNumber(value)) {
            min = Math.min(min, value)
            max = Math.max(max, value)
          }
        }
      }
      indicators.forEach(({ result, figures }) => {
        const data = result[dataIndex] ?? {}
        figures.forEach(figure => {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- ignore
          const value = data[figure.key]
          if (isNumber(value)) {
            min = Math.min(min, value)
            max = Math.max(max, value)
          }
        })
      })
    })

    if (min !== Number.MAX_SAFE_INTEGER && max !== Number.MIN_SAFE_INTEGER) {
      min = Math.min(specifyMin, min)
      max = Math.max(specifyMax, max)
    } else {
      min = 0
      max = 10
    }
    const defaultDiff = max - min
    const defaultRange = {
      from: min,
      to: max,
      range: defaultDiff,
      realFrom: min,
      realTo: max,
      realRange: defaultDiff,
      displayFrom: min,
      displayTo: max,
      displayRange: defaultDiff
    }

    const range = this.createRange({
      chart,
      paneId,
      defaultRange
    })
    let realFrom = range.realFrom
    let realTo = range.realTo
    let realRange = range.realRange
    const minSpan = this.minSpan(precision)
    if (
      realFrom === realTo || realRange < minSpan
    ) {
      const minCheck = specifyMin === realFrom
      const maxCheck = specifyMax === realTo
      const halfTickCount = TICK_COUNT / 2
      realFrom = minCheck ? realFrom : (maxCheck ? realFrom - TICK_COUNT * minSpan : realFrom - halfTickCount * minSpan)
      realTo = maxCheck ? realTo : (minCheck ? realTo + TICK_COUNT * minSpan : realTo + halfTickCount * minSpan)
    }

    const height = this.getBounding().height
    const { top, bottom } = this.gap
    let topRate = top
    if (topRate >= 1) {
      topRate = topRate / height
    }
    let bottomRate = bottom
    if (bottomRate >= 1) {
      bottomRate = bottomRate / height
    }
    realRange = realTo - realFrom
    realFrom = realFrom - realRange * bottomRate
    realTo = realTo + realRange * topRate

    const from = this.realValueToValue(realFrom, { range })
    const to = this.realValueToValue(realTo, { range })
    const displayFrom = this.realValueToDisplayValue(realFrom, { range })
    const displayTo = this.realValueToDisplayValue(realTo, { range })
    return {
      from,
      to,
      range: to - from,
      realFrom,
      realTo,
      realRange: realTo - realFrom,
      displayFrom,
      displayTo,
      displayRange: displayTo - displayFrom
    }
  }

  /**
   * 是否是蜡烛图轴
   * @return {boolean}
   */
  isInCandle (): boolean {
    return this.getParent().getId() === PaneIdConstants.CANDLE
  }

  /**
   * 是否从y轴0开始
   * @return {boolean}
   */
  isFromZero (): boolean {
    return (
      (this.position === 'left' && this.inside) ||
      (this.position === 'right' && !this.inside)
    )
  }

  protected override createTicksImp (): AxisTick[] {
    const range = this.getRange()
    const { displayFrom, displayTo, displayRange } = range
    const ticks: AxisTick[] = []

    if (displayRange >= 0) {
      const interval = nice(displayRange / TICK_COUNT)
      const precision = getPrecision(interval)

      const first = round(Math.ceil(displayFrom / interval) * interval, precision)
      const last = round(Math.floor(displayTo / interval) * interval, precision)
      let n = 0
      let f = first

      if (interval !== 0) {
        while (f <= last) {
          const v = f.toFixed(precision)
          ticks[n] = { text: v, coord: 0, value: v }
          ++n
          f += interval
        }
      }
    }

    const pane = this.getParent()
    const height = this.getBounding().height
    const chartStore = pane.getChart().getChartStore()
    const optimalTicks: AxisTick[] = []
    const indicators = chartStore.getIndicatorsByPaneId(pane.getId()).filter(indicator => indicator.yAxisId === this.id)
    const styles = chartStore.getStyles()
    let precision = 0
    let shouldFormatBigNumber = false
    if (this.isInCandle() && this.id === DEFAULT_AXIS_ID) {
      precision = chartStore.getSymbol()?.pricePrecision ?? SymbolDefaultPrecisionConstants.PRICE
    } else {
      indicators.forEach(indicator => {
        precision = Math.max(precision, indicator.precision)
        shouldFormatBigNumber ||= indicator.shouldFormatBigNumber
      })
    }
    const formatter = chartStore.getInnerFormatter()
    const thousandsSeparator = chartStore.getThousandsSeparator()
    const decimalFold = chartStore.getDecimalFold()
    const textHeight = styles.xAxis.tickText.size
    let validY = NaN
    ticks.forEach(({ value }) => {
      let v = this.displayValueToText(+value, precision)
      const y = this.convertToPixel(
        this.realValueToValue(
          this.displayValueToRealValue(+value, { range }),
          { range }
        )
      )
      if (shouldFormatBigNumber) {
        v = formatter.formatBigNumber(value)
      }
      v = decimalFold.format(thousandsSeparator.format(v))
      const validYNumber = isNumber(validY)
      if (
        y > textHeight &&
        y < height - textHeight &&
        ((validYNumber && (Math.abs(validY - y) > textHeight * 2)) || !validYNumber)) {
        optimalTicks.push({ text: v, coord: y, value })
        validY = y
      }
    })
    if (isFunction(this.createTicks)) {
      return this.createTicks({
        range: this.getRange(),
        bounding: this.getBounding(),
        defaultTicks: optimalTicks
      })
    }
    return optimalTicks
  }

  override getAutoSize (): number {
    const pane = this.getParent()
    const chart = pane.getChart()
    const chartStore = chart.getChartStore()
    const styles = chartStore.getStyles()
    const yAxisStyles = styles.yAxis
    const width = yAxisStyles.size
    if (width !== 'auto') {
      return width
    }
    let yAxisWidth = 0
    if (yAxisStyles.show) {
      if (yAxisStyles.axisLine.show) {
        yAxisWidth += yAxisStyles.axisLine.size
      }
      if (yAxisStyles.tickLine.show) {
        yAxisWidth += yAxisStyles.tickLine.length
      }
      if (yAxisStyles.tickText.show) {
        let textWidth = 0
        this.getTicks().forEach(tick => {
          textWidth = Math.max(textWidth, calcTextWidth(tick.text, yAxisStyles.tickText.size, yAxisStyles.tickText.weight, yAxisStyles.tickText.family))
        })
        yAxisWidth += (yAxisStyles.tickText.marginStart + yAxisStyles.tickText.marginEnd + textWidth)
      }
    }

    const priceMarkStyles = styles.candle.priceMark
    const lastPriceMarkTextVisible = priceMarkStyles.show && priceMarkStyles.last.show && priceMarkStyles.last.text.show
    let lastPriceTextWidth = 0

    const crosshairStyles = styles.crosshair
    const crosshairHorizontalTextVisible = crosshairStyles.show && crosshairStyles.horizontal.show && crosshairStyles.horizontal.text.show
    let crosshairHorizontalTextWidth = 0

    if (lastPriceMarkTextVisible || crosshairHorizontalTextVisible) {
      const pricePrecision = chartStore.getSymbol()?.pricePrecision ?? SymbolDefaultPrecisionConstants.PRICE
      const max = this.getRange().displayTo

      if (lastPriceMarkTextVisible) {
        const dataList = chartStore.getDataList()
        const data = dataList[dataList.length - 1]
        if (isValid(data)) {
          const { paddingLeft, paddingRight, size, family, weight } = priceMarkStyles.last.text
          lastPriceTextWidth = paddingLeft + calcTextWidth(formatPrecision(data.close, pricePrecision), size, weight, family) + paddingRight
          const formatExtendText = chartStore.getInnerFormatter().formatExtendText
          priceMarkStyles.last.extendTexts.forEach((item, index) => {
            const text = formatExtendText({ type: 'last_price', data, index })
            if (text.length > 0 && item.show) {
              lastPriceTextWidth = Math.max(lastPriceTextWidth, item.paddingLeft + calcTextWidth(text, item.size, item.weight, item.family) + item.paddingRight)
            }
          })
        }
      }

      if (crosshairHorizontalTextVisible) {
        const indicators = chartStore.getIndicatorsByPaneId(pane.getId()).filter(indicator => indicator.yAxisId === this.id)
        let indicatorPrecision = 0
        let shouldFormatBigNumber = false
        indicators.forEach(indicator => {
          indicatorPrecision = Math.max(indicator.precision, indicatorPrecision)
          shouldFormatBigNumber ||= indicator.shouldFormatBigNumber
        })
        let precision = 2
        if (this.isInCandle() && this.id === DEFAULT_AXIS_ID) {
          const lastValueMarkStyles = styles.indicator.lastValueMark
          if (lastValueMarkStyles.show && lastValueMarkStyles.text.show) {
            precision = Math.max(indicatorPrecision, pricePrecision)
          } else {
            precision = pricePrecision
          }
        } else {
          precision = indicatorPrecision
        }
        let valueText = formatPrecision(max, precision)
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- ignore
        if (shouldFormatBigNumber) {
          valueText = chartStore.getInnerFormatter().formatBigNumber(valueText)
        }
        valueText = chartStore.getDecimalFold().format(valueText)
        crosshairHorizontalTextWidth += (
          crosshairStyles.horizontal.text.paddingLeft +
          crosshairStyles.horizontal.text.paddingRight +
          crosshairStyles.horizontal.text.borderSize * 2 +
          calcTextWidth(
            valueText,
            crosshairStyles.horizontal.text.size,
            crosshairStyles.horizontal.text.weight,
            crosshairStyles.horizontal.text.family
          )
        )
      }
    }
    return Math.max(yAxisWidth, lastPriceTextWidth, crosshairHorizontalTextWidth)
  }

  protected override getBounding (): Bounding {
    return this.getParent().getYAxisWidgetById(this.id)?.getBounding() ?? this.getParent().getMainWidget().getBounding()
  }

  convertFromPixel (pixel: number): number {
    const height = this.getBounding().height
    const range = this.getRange()
    const { realFrom, realRange } = range
    const rate = this.reverse ? pixel / height : 1 - pixel / height
    const realValue = rate * realRange + realFrom
    return this.realValueToValue(realValue, { range })
  }

  convertToPixel (value: number): number {
    const range = this.getRange()
    const realValue = this.valueToRealValue(value, { range })
    const height = this.getBounding().height
    const { realFrom, realRange } = range
    const rate = (realValue - realFrom) / realRange
    return this.reverse ? Math.round(rate * height) : Math.round((1 - rate) * height)
  }

  convertToNicePixel (value: number): number {
    const height = this.getBounding().height
    const pixel = this.convertToPixel(value)
    return Math.round(Math.max(height * 0.05, Math.min(pixel, height * 0.98)))
  }

  static extend (template: YAxisTemplate): YAxisConstructor {
    class Custom extends YAxisImp {
      constructor (parent: DrawPane) {
        super(parent, template)
      }
    }
    return Custom
  }
}
```

## File: Event.ts
```typescript
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

import type Nullable from './common/Nullable'
import EventHandlerImp, { type EventHandler, type MouseTouchEvent, TOUCH_MIN_RADIUS } from './common/EventHandler'
import type Coordinate from './common/Coordinate'
import { UpdateLevel } from './common/Updater'
import type Crosshair from './common/Crosshair'
import { requestAnimationFrame, cancelAnimationFrame } from './common/utils/compatible'
import { isArray, isFunction, isValid } from './common/utils/typeChecks'
import { isAppleOS } from './common/utils/platform'

import { getHotkey, getSupportedHotkeys } from './extension/hotkey/index'

import type { AxisRange } from './component/Axis'
import type YAxisImp from './component/YAxis'
import type XAxis from './component/XAxis'

import type Chart from './Chart'
import type Pane from './pane/Pane'
import type DrawPane from './pane/DrawPane'
import type XAxisPane from './pane/XAxisPane'
import { PaneIdConstants } from './pane/types'
import type Widget from './widget/Widget'
import type YAxisWidget from './widget/YAxisWidget'
import { WidgetNameConstants, REAL_SEPARATOR_HEIGHT } from './widget/types'

interface EventTriggerWidgetInfo {
  pane: Nullable<Pane>
  widget: Nullable<Widget>
}

const hotkeyModifierAlias: Record<string, string> = {
  command: 'meta',
  cmd: 'meta',
  control: 'ctrl',
  option: 'alt',
  mod: isAppleOS() ? 'meta' : 'ctrl'
}

const hotkeyAlias: Record<string, string> = {
  '+': 'equal',
  plus: 'equal',
  add: 'equal',
  numpadadd: 'equal',
  '-': 'minus',
  subtract: 'minus',
  numpadsubtract: 'minus',
  esc: 'escape',
  del: 'delete',
  left: 'arrowleft',
  right: 'arrowright',
  up: 'arrowup',
  down: 'arrowdown'
}

const hotKeyModifierOrder = ['ctrl', 'alt', 'shift', 'meta']

export default class Event implements EventHandler {
  private readonly _chart: Chart
  private readonly _event: EventHandlerImp

  // 惯性滚动开始时间
  private _flingStartTime = new Date().getTime()
  // 惯性滚动定时器
  private _flingScrollRequestId: Nullable<number> = null
  // 开始滚动时坐标点
  private _startScrollCoordinate: Nullable<Coordinate> = null
  // 开始触摸时坐标
  private _touchCoordinate: Nullable<Coordinate> = null
  // 是否是取消了十字光标
  private _touchCancelCrosshair = false
  // 是否缩放过
  private _touchZoomed = false
  // 用来记录捏合缩放的尺寸
  private _pinchScale = 1

  private _mouseDownWidget: Nullable<Widget> = null

  private readonly _prevYAxisRanges = new Map<YAxisImp, Nullable<AxisRange>>()

  private _xAxisStartScaleCoordinate: Nullable<Coordinate> = null
  private _xAxisStartScaleDistance = 0
  private _xAxisScale = 1

  private _yAxisStartScaleDistance = 0

  private _mouseMoveTriggerWidgetInfo: EventTriggerWidgetInfo = { pane: null, widget: null }

  private readonly _boundKeyBoardDownEvent: ((event: KeyboardEvent) => void) = (event: KeyboardEvent) => {
    const target = event.target as Nullable<HTMLElement>
    const tagName = target?.tagName.toLowerCase()
    if (tagName === 'input' || tagName === 'textarea' || target?.isContentEditable === true) {
      return
    }
    const { enabled, exclude } = this._chart.getHotKey()
    if (!enabled) {
      return
    }
    const eventKeys: string[] = []
    if (event.ctrlKey) {
      eventKeys.push('ctrl')
    }
    if (event.altKey) {
      eventKeys.push('alt')
    }
    if (event.shiftKey) {
      eventKeys.push('shift')
    }
    if (event.metaKey) {
      eventKeys.push('meta')
    }
    const eventCode = event.code.trim().toLowerCase()
    if (/^key[a-z]$/.test(eventCode)) {
      eventKeys.push(eventCode.slice(3))
    } else if (/^digit[0-9]$/.test(eventCode)) {
      eventKeys.push(eventCode.slice(5))
    } else {
      eventKeys.push(hotkeyAlias[eventCode] ?? eventCode)
    }
    const key = eventKeys.join('+')
    const names = getSupportedHotkeys()
    for (let i = names.length - 1; i >= 0; i--) {
      const name = names[i]
      const hotkey = getHotkey(name)
      if (!exclude.includes(name) && isValid(hotkey)) {
        const hotkeyKeys = isArray<string>(hotkey.keys) ? hotkey.keys : [hotkey.keys]
        const match = hotkeyKeys.some(hotkeyKey => {
          const modifiers: string[] = []
          let normalKey = ''
          hotkeyKey.replace(/\+\+$/, '+Plus').replace(/\+=$/, '+Equal').split('+').forEach(part => {
            const hotkeyPart = hotkeyModifierAlias[part.trim().toLowerCase()] ?? part
            const hotkeyPartValue = hotkeyPart.trim().toLowerCase()
            let value = ''
            if (/^key[a-z]$/.test(hotkeyPartValue)) {
              value = hotkeyPartValue.slice(3)
            } else if (/^digit[0-9]$/.test(hotkeyPartValue)) {
              value = hotkeyPartValue.slice(5)
            } else {
              value = hotkeyAlias[hotkeyPartValue] ?? hotkeyPartValue
            }
            if (hotKeyModifierOrder.includes(value)) {
              if (!modifiers.includes(value)) {
                modifiers.push(value)
              }
            } else if (value.length > 0) {
              normalKey = value
            }
          })
          modifiers.sort((a, b) => hotKeyModifierOrder.indexOf(a) - hotKeyModifierOrder.indexOf(b))
          return [...modifiers, normalKey].filter(key => key.length > 0).join('+') === key
        })
        if (match) {
          const params = { chart: this._chart, event, key, hotkey }
          if (!isFunction(hotkey.check) || hotkey.check(params)) {
            if (hotkey.preventDefault ?? true) {
              event.preventDefault()
            }
            if (hotkey.stopPropagation ?? false) {
              event.stopPropagation()
            }
            hotkey.action(params)
            return
          }
        }
      }
    }
  }

  constructor (container: HTMLElement, chart: Chart) {
    this._chart = chart
    this._event = new EventHandlerImp(container, this, {
      treatVertDragAsPageScroll: () => false,
      treatHorzDragAsPageScroll: () => false
    })
    document.addEventListener('keydown', this._boundKeyBoardDownEvent)
  }

  private _getYAxisByWidget (widget: Widget<DrawPane<YAxisImp>>): YAxisImp {
    if (widget.getName() === WidgetNameConstants.Y_AXIS) {
      return (widget as unknown as YAxisWidget).getAxisComponent() as unknown as YAxisImp
    }
    return widget.getPane().getYAxisComponentById() as unknown as YAxisImp
  }

  pinchStartEvent (): boolean {
    this._touchZoomed = true
    this._pinchScale = 1
    return true
  }

  pinchEvent (e: MouseTouchEvent, scale: number): boolean {
    const { pane, widget } = this._findWidgetByEvent(e)
    if (pane?.getId() !== PaneIdConstants.X_AXIS && widget?.getName() === WidgetNameConstants.MAIN) {
      const event = this._makeWidgetEvent(e, widget)
      const zoomScale = (scale - this._pinchScale) * 5
      this._pinchScale = scale
      this._chart.getChartStore().zoom(zoomScale, { x: event.x, y: event.y }, 'main')
      return true
    }
    return false
  }

  mouseWheelHortEvent (_: MouseTouchEvent, distance: number): boolean {
    const store = this._chart.getChartStore()
    store.startScroll()
    store.scroll(distance)
    return true
  }

  mouseWheelVertEvent (e: MouseTouchEvent, scale: number): boolean {
    const { widget } = this._findWidgetByEvent(e)
    const event = this._makeWidgetEvent(e, widget)
    const name = widget?.getName()
    if (name === WidgetNameConstants.MAIN) {
      this._chart.getChartStore().zoom(scale, { x: event.x, y: event.y }, 'main')
      return true
    }
    return false
  }

  mouseDownEvent (e: MouseTouchEvent): boolean {
    const { pane, widget } = this._findWidgetByEvent(e)
    this._mouseDownWidget = widget
    if (widget !== null) {
      const event = this._makeWidgetEvent(e, widget)
      const name = widget.getName()
      switch (name) {
        case WidgetNameConstants.SEPARATOR: {
          return widget.dispatchEvent('mouseDownEvent', event)
        }
        case WidgetNameConstants.MAIN: {
          // Dispatch event first to allow overlays (e.g., continuous drawing) to consume it
          const consumed = widget.dispatchEvent('mouseDownEvent', event)
          // Only start scrolling if the event was not consumed by an overlay
          if (!consumed) {
            const yAxes = (pane as DrawPane<YAxisImp>).getYAxisComponents()
            for (const item of yAxes) {
              const yAxis = item as YAxisImp
              if (!yAxis.getAutoCalcTickFlag()) {
                const range = yAxis.getRange()
                this._prevYAxisRanges.set(yAxis, { ...range })
              }
            }
            this._startScrollCoordinate = { x: event.x, y: event.y }
            this._chart.getChartStore().startScroll()
          }
          return consumed
        }
        case WidgetNameConstants.X_AXIS: {
          return this._processXAxisScrollStartEvent(widget, event)
        }
        case WidgetNameConstants.Y_AXIS: {
          return this._processYAxisScaleStartEvent(widget as Widget<DrawPane<YAxisImp>>, event)
        }
      }
    }
    return false
  }

  mouseMoveEvent (e: MouseTouchEvent): boolean {
    const { pane, widget } = this._findWidgetByEvent(e)
    const event = this._makeWidgetEvent(e, widget)
    if (
      this._mouseMoveTriggerWidgetInfo.pane?.getId() !== pane?.getId() ||
      this._mouseMoveTriggerWidgetInfo.widget?.getName() !== widget?.getName()
    ) {
      widget?.dispatchEvent('mouseEnterEvent', event)
      this._mouseMoveTriggerWidgetInfo.widget?.dispatchEvent('mouseLeaveEvent', event)
      this._mouseMoveTriggerWidgetInfo = { pane, widget }
    }
    if (widget !== null) {
      const name = widget.getName()
      switch (name) {
        case WidgetNameConstants.MAIN: {
          const consumed = widget.dispatchEvent('mouseMoveEvent', event)
          let crosshair: Crosshair | undefined = { x: event.x, y: event.y, paneId: pane?.getId() }
          if (consumed) {
            if (widget.getForceCursor() !== 'pointer') {
              crosshair = undefined
            }
            widget.setCursor('pointer')
          } else {
            widget.setCursor('crosshair')
          }
          this._chart.getChartStore().setCrosshair(crosshair)
          return consumed
        }
        case WidgetNameConstants.SEPARATOR:
        case WidgetNameConstants.X_AXIS:
        case WidgetNameConstants.Y_AXIS: {
          const consumed = widget.dispatchEvent('mouseMoveEvent', event)
          this._chart.getChartStore().setCrosshair()
          return consumed
        }
      }
    }
    return false
  }

  pressedMouseMoveEvent (e: MouseTouchEvent): boolean {
    if (this._mouseDownWidget !== null && this._mouseDownWidget.getName() === WidgetNameConstants.SEPARATOR) {
      return this._mouseDownWidget.dispatchEvent('pressedMouseMoveEvent', e)
    }
    const { pane, widget } = this._findWidgetByEvent(e)
    if (
      widget !== null &&
      this._mouseDownWidget?.getPane().getId() === pane?.getId() &&
      this._mouseDownWidget?.getName() === widget.getName()
    ) {
      const event = this._makeWidgetEvent(e, widget)
      const name = widget.getName()
      switch (name) {
        case WidgetNameConstants.MAIN: {
          // eslint-disable-next-line @typescript-eslint/init-declarations -- ignore
          let crosshair: Crosshair | undefined
          const consumed = widget.dispatchEvent('pressedMouseMoveEvent', event)
          if (!consumed) {
            this._processMainScrollingEvent(widget as Widget<DrawPane<YAxisImp>>, event)
          } else {
            // Explicitly update overlay when event was consumed (e.g., continuous drawing)
            this._chart.updatePane(UpdateLevel.Overlay)
          }
          if (!consumed || widget.getForceCursor() === 'pointer') {
            crosshair = { x: event.x, y: event.y, paneId: pane?.getId() }
          }
          this._chart.getChartStore().setCrosshair(crosshair, { forceInvalidate: true })
          return consumed
        }
        case WidgetNameConstants.X_AXIS: {
          return this._processXAxisScrollingEvent(widget as Widget<DrawPane<XAxis>>, event)
        }
        case WidgetNameConstants.Y_AXIS: {
          return this._processYAxisScalingEvent(widget as Widget<DrawPane<YAxisImp>>, event)
        }
      }
    }
    return false
  }

  mouseUpEvent (e: MouseTouchEvent): boolean {
    const { widget } = this._findWidgetByEvent(e)
    let consumed = false
    if (widget !== null) {
      const event = this._makeWidgetEvent(e, widget)
      const name = widget.getName()
      switch (name) {
        case WidgetNameConstants.MAIN:
        case WidgetNameConstants.SEPARATOR:
        case WidgetNameConstants.X_AXIS:
        case WidgetNameConstants.Y_AXIS: {
          consumed = widget.dispatchEvent('mouseUpEvent', event)
          break
        }
      }
      if (consumed) {
        this._chart.updatePane(UpdateLevel.Overlay)
      }
    }
    this._mouseDownWidget = null
    this._startScrollCoordinate = null
    this._prevYAxisRanges.clear()
    this._xAxisStartScaleCoordinate = null
    this._xAxisStartScaleDistance = 0
    this._xAxisScale = 1
    this._yAxisStartScaleDistance = 0
    return consumed
  }

  mouseClickEvent (e: MouseTouchEvent): boolean {
    const { widget } = this._findWidgetByEvent(e)
    if (widget !== null) {
      const event = this._makeWidgetEvent(e, widget)
      return widget.dispatchEvent('mouseClickEvent', event)
    }
    return false
  }

  mouseRightClickEvent (e: MouseTouchEvent): boolean {
    const { widget } = this._findWidgetByEvent(e)
    let consumed = false
    if (widget !== null) {
      const event = this._makeWidgetEvent(e, widget)
      const name = widget.getName()
      switch (name) {
        case WidgetNameConstants.MAIN:
        case WidgetNameConstants.X_AXIS:
        case WidgetNameConstants.Y_AXIS: {
          consumed = widget.dispatchEvent('mouseRightClickEvent', event)
          break
        }
      }
      if (consumed) {
        this._chart.updatePane(UpdateLevel.Overlay)
      }
    }
    return false
  }

  mouseDoubleClickEvent (e: MouseTouchEvent): boolean {
    const { widget } = this._findWidgetByEvent(e)
    if (widget !== null) {
      const name = widget.getName()
      switch (name) {
        case WidgetNameConstants.MAIN: {
          const event = this._makeWidgetEvent(e, widget)
          return widget.dispatchEvent('mouseDoubleClickEvent', event)
        }
        case WidgetNameConstants.Y_AXIS: {
          const yAxis = this._getYAxisByWidget(widget as Widget<DrawPane<YAxisImp>>)
          if (!yAxis.getAutoCalcTickFlag()) {
            yAxis.setAutoCalcTickFlag(true)
            this._chart.layout({
              measureWidth: true,
              update: true,
              buildYAxisTick: true
            })
            return true
          }
          break
        }
      }
    }
    return false
  }

  mouseLeaveEvent (): boolean {
    this._chart.getChartStore().setCrosshair()
    return true
  }

  touchStartEvent (e: MouseTouchEvent): boolean {
    const { pane, widget } = this._findWidgetByEvent(e)
    if (widget !== null) {
      const event = this._makeWidgetEvent(e, widget)
      event.preventDefault?.()
      const name = widget.getName()
      switch (name) {
        case WidgetNameConstants.MAIN: {
          const chartStore = this._chart.getChartStore()
          if (widget.dispatchEvent('mouseDownEvent', event)) {
            this._touchCancelCrosshair = true
            this._touchCoordinate = null
            chartStore.setCrosshair(undefined, { notInvalidate: true })
            this._chart.updatePane(UpdateLevel.Overlay)
            return true
          }
          if (this._flingScrollRequestId !== null) {
            cancelAnimationFrame(this._flingScrollRequestId)
            this._flingScrollRequestId = null
          }
          this._flingStartTime = new Date().getTime()

          const yAxes = (pane as DrawPane<YAxisImp>).getYAxisComponents()

          for (const item of yAxes) {
            const yAxis = item as YAxisImp
            if (!yAxis.getAutoCalcTickFlag()) {
              const range = yAxis.getRange()
              this._prevYAxisRanges.set(yAxis, { ...range })
            }
          }

          this._startScrollCoordinate = { x: event.x, y: event.y }
          chartStore.startScroll()
          this._touchZoomed = false
          if (this._touchCoordinate !== null) {
            const xDif = event.x - this._touchCoordinate.x
            const yDif = event.y - this._touchCoordinate.y
            const radius = Math.sqrt(xDif * xDif + yDif * yDif)
            if (radius < TOUCH_MIN_RADIUS) {
              this._touchCoordinate = { x: event.x, y: event.y }
              chartStore.setCrosshair({ x: event.x, y: event.y, paneId: pane?.getId() })
            } else {
              this._touchCoordinate = null
              this._touchCancelCrosshair = true
              chartStore.setCrosshair()
            }
          }
          return true
        }
        case WidgetNameConstants.X_AXIS: {
          return this._processXAxisScrollStartEvent(widget, event)
        }
        case WidgetNameConstants.Y_AXIS: {
          return this._processYAxisScaleStartEvent(widget as Widget<DrawPane<YAxisImp>>, event)
        }
      }
    }
    return false
  }

  touchMoveEvent (e: MouseTouchEvent): boolean {
    const { pane, widget } = this._findWidgetByEvent(e)
    if (widget !== null) {
      const event = this._makeWidgetEvent(e, widget)
      const name = widget.getName()
      const chartStore = this._chart.getChartStore()
      switch (name) {
        case WidgetNameConstants.MAIN: {
          if (widget.dispatchEvent('pressedMouseMoveEvent', event)) {
            event.preventDefault?.()
            chartStore.setCrosshair(undefined, { notInvalidate: true })
            this._chart.updatePane(UpdateLevel.Overlay)
            return true
          }
          if (this._touchCoordinate !== null) {
            event.preventDefault?.()
            chartStore.setCrosshair({ x: event.x, y: event.y, paneId: pane?.getId() })
          } else {
            this._processMainScrollingEvent(widget as Widget<DrawPane<YAxisImp>>, event)
          }
          return true
        }
        case WidgetNameConstants.X_AXIS: {
          event.preventDefault?.()
          return this._processXAxisScrollingEvent(widget as Widget<DrawPane<XAxis>>, event)
        }
        case WidgetNameConstants.Y_AXIS: {
          return this._processYAxisScalingEvent(widget as Widget<DrawPane<YAxisImp>>, event)
        }
      }
    }
    return false
  }

  touchEndEvent (e: MouseTouchEvent): boolean {
    const { widget } = this._findWidgetByEvent(e)
    if (widget !== null) {
      const event = this._makeWidgetEvent(e, widget)
      const name = widget.getName()
      switch (name) {
        case WidgetNameConstants.MAIN: {
          widget.dispatchEvent('mouseUpEvent', event)
          if (this._startScrollCoordinate !== null) {
            const time = new Date().getTime() - this._flingStartTime
            const distance = event.x - this._startScrollCoordinate.x
            let v = distance / (time > 0 ? time : 1) * 20
            if (time < 200 && Math.abs(v) > 0) {
              const store = this._chart.getChartStore()
              const flingScroll: (() => void) = () => {
                this._flingScrollRequestId = requestAnimationFrame(() => {
                  store.startScroll()
                  store.scroll(v)
                  v = v * (1 - 0.025)
                  if (Math.abs(v) < 1) {
                    if (this._flingScrollRequestId !== null) {
                      cancelAnimationFrame(this._flingScrollRequestId)
                      this._flingScrollRequestId = null
                    }
                  } else {
                    flingScroll()
                  }
                })
              }
              flingScroll()
            }
          }
          return true
        }
        case WidgetNameConstants.X_AXIS:
        case WidgetNameConstants.Y_AXIS: {
          const consumed = widget.dispatchEvent('mouseUpEvent', event)
          if (consumed) {
            this._chart.updatePane(UpdateLevel.Overlay)
          }
        }
      }
      this._startScrollCoordinate = null
      this._prevYAxisRanges.clear()
      this._xAxisStartScaleCoordinate = null
      this._xAxisStartScaleDistance = 0
      this._xAxisScale = 1
      this._yAxisStartScaleDistance = 0
    }
    return false
  }

  tapEvent (e: MouseTouchEvent): boolean {
    const { pane, widget } = this._findWidgetByEvent(e)
    let consumed = false
    if (widget !== null) {
      const event = this._makeWidgetEvent(e, widget)
      const result = widget.dispatchEvent('mouseClickEvent', event)
      if (widget.getName() === WidgetNameConstants.MAIN) {
        const event = this._makeWidgetEvent(e, widget)
        const chartStore = this._chart.getChartStore()
        if (result) {
          this._touchCancelCrosshair = true
          this._touchCoordinate = null
          chartStore.setCrosshair(undefined, { notInvalidate: true })
          consumed = true
        } else {
          if (!this._touchCancelCrosshair && !this._touchZoomed) {
            this._touchCoordinate = { x: event.x, y: event.y }
            chartStore.setCrosshair({ x: event.x, y: event.y, paneId: pane?.getId() }, { notInvalidate: true })
            consumed = true
          }
          this._touchCancelCrosshair = false
        }
      }
      if (consumed || result) {
        this._chart.updatePane(UpdateLevel.Overlay)
      }
    }
    return consumed
  }

  doubleTapEvent (e: MouseTouchEvent): boolean {
    return this.mouseDoubleClickEvent(e)
  }

  longTapEvent (e: MouseTouchEvent): boolean {
    const { pane, widget } = this._findWidgetByEvent(e)
    if (widget !== null && widget.getName() === WidgetNameConstants.MAIN) {
      const event = this._makeWidgetEvent(e, widget)
      this._touchCoordinate = { x: event.x, y: event.y }
      this._chart.getChartStore().setCrosshair({ x: event.x, y: event.y, paneId: pane?.getId() })
      return true
    }
    return false
  }

  private _processMainScrollingEvent (widget: Widget<DrawPane<YAxisImp>>, event: MouseTouchEvent): void {
    if (this._startScrollCoordinate !== null) {
      const yAxes = widget.getPane().getYAxisComponents()
      for (const item of yAxes) {
        const yAxis = item as YAxisImp
        const prevRange = this._prevYAxisRanges.get(yAxis)
        if (isValid(prevRange) && !yAxis.getAutoCalcTickFlag() && yAxis.scrollZoomEnabled) {
          event.preventDefault?.()
          const { from, to, range } = prevRange
          let distance = 0
          if (yAxis.reverse) {
            distance = this._startScrollCoordinate.y - event.y
          } else {
            distance = event.y - this._startScrollCoordinate.y
          }
          const bounding = widget.getBounding()
          const scale = distance / bounding.height
          const difRange = range * scale
          const newFrom = from + difRange
          const newTo = to + difRange
          const newRealFrom = yAxis.valueToRealValue(newFrom, { range: prevRange })
          const newRealTo = yAxis.valueToRealValue(newTo, { range: prevRange })
          const newDisplayFrom = yAxis.realValueToDisplayValue(newRealFrom, { range: prevRange })
          const newDisplayTo = yAxis.realValueToDisplayValue(newRealTo, { range: prevRange })
          yAxis.setRange({
            from: newFrom,
            to: newTo,
            range: newTo - newFrom,
            realFrom: newRealFrom,
            realTo: newRealTo,
            realRange: newRealTo - newRealFrom,
            displayFrom: newDisplayFrom,
            displayTo: newDisplayTo,
            displayRange: newDisplayTo - newDisplayFrom
          })
        }
      }

      const distance = event.x - this._startScrollCoordinate.x
      this._chart.getChartStore().scroll(distance)
    }
  }

  private _processXAxisScrollStartEvent (widget: Widget, event: MouseTouchEvent): boolean {
    const consumed = widget.dispatchEvent('mouseDownEvent', event)
    if (consumed) {
      this._chart.updatePane(UpdateLevel.Overlay)
    }
    this._xAxisStartScaleCoordinate = { x: event.x, y: event.y }
    this._xAxisStartScaleDistance = event.pageX
    return consumed
  }

  private _processXAxisScrollingEvent (widget: Widget<DrawPane<XAxis>>, event: MouseTouchEvent): boolean {
    const consumed = widget.dispatchEvent('pressedMouseMoveEvent', event)
    if (!consumed) {
      const xAxis = (widget.getPane() as unknown as XAxisPane).getXAxisComponent()
      if (xAxis.scrollZoomEnabled && this._xAxisStartScaleDistance !== 0) {
        const scale = this._xAxisStartScaleDistance / event.pageX
        if (Number.isFinite(scale)) {
          const zoomScale = (scale - this._xAxisScale) * 10
          this._xAxisScale = scale
          this._chart.getChartStore().zoom(zoomScale, this._xAxisStartScaleCoordinate, 'xAxis')
        }
      }
    } else {
      this._chart.updatePane(UpdateLevel.Overlay)
    }
    return consumed
  }

  private _processYAxisScaleStartEvent (widget: Widget<DrawPane<YAxisImp>>, event: MouseTouchEvent): boolean {
    const consumed = widget.dispatchEvent('mouseDownEvent', event)
    if (consumed) {
      this._chart.updatePane(UpdateLevel.Overlay)
    }
    const yAxis = this._getYAxisByWidget(widget)
    const range = yAxis.getRange()
    this._prevYAxisRanges.set(yAxis, { ...range })
    this._yAxisStartScaleDistance = event.pageY
    return consumed
  }

  private _processYAxisScalingEvent (widget: Widget<DrawPane<YAxisImp>>, event: MouseTouchEvent): boolean {
    const consumed = widget.dispatchEvent('pressedMouseMoveEvent', event)
    if (!consumed) {
      const yAxis = this._getYAxisByWidget(widget)
      const prevYAxisRange = this._prevYAxisRanges.get(yAxis)
      if (isValid(prevYAxisRange) && yAxis.scrollZoomEnabled && this._yAxisStartScaleDistance !== 0) {
        event.preventDefault?.()
        const { from, to, range } = prevYAxisRange
        const scale = event.pageY / this._yAxisStartScaleDistance
        const newRange = range * scale
        const difRange = (newRange - range) / 2
        const newFrom = from - difRange
        const newTo = to + difRange
        const newRealFrom = yAxis.valueToRealValue(newFrom, { range: prevYAxisRange })
        const newRealTo = yAxis.valueToRealValue(newTo, { range: prevYAxisRange })
        const newDisplayFrom = yAxis.realValueToDisplayValue(newRealFrom, { range: prevYAxisRange })
        const newDisplayTo = yAxis.realValueToDisplayValue(newRealTo, { range: prevYAxisRange })
        yAxis.setRange({
          from: newFrom,
          to: newTo,
          range: newRange,
          realFrom: newRealFrom,
          realTo: newRealTo,
          realRange: newRealTo - newRealFrom,
          displayFrom: newDisplayFrom,
          displayTo: newDisplayTo,
          displayRange: newDisplayTo - newDisplayFrom
        })
        this._chart.layout({
          measureWidth: true,
          update: true,
          buildYAxisTick: true
        })
      }
    } else {
      this._chart.updatePane(UpdateLevel.Overlay)
    }
    return consumed
  }

  private _findWidgetByEvent (event: MouseTouchEvent): EventTriggerWidgetInfo {
    const { x, y } = event
    const separatorPanes = this._chart.getSeparatorPanes()
    const separatorSize = this._chart.getStyles().separator.size
    for (const items of separatorPanes) {
      const pane = items[1]
      const bounding = pane.getBounding()
      const top = bounding.top - Math.round((REAL_SEPARATOR_HEIGHT - separatorSize) / 2)
      if (
        x >= bounding.left && x <= bounding.left + bounding.width &&
        y >= top && y <= top + REAL_SEPARATOR_HEIGHT
      ) {
        return { pane, widget: pane.getWidget() }
      }
    }

    const drawPanes = this._chart.getDrawPanes()

    let pane: Nullable<DrawPane> = null
    for (const p of drawPanes) {
      const bounding = p.getBounding()
      if (
        x >= bounding.left && x <= bounding.left + bounding.width &&
        y >= bounding.top && y <= bounding.top + bounding.height
      ) {
        pane = p
        break
      }
    }
    let widget: Nullable<Widget> = null
    if (pane !== null) {
      if (!isValid(widget)) {
        const mainWidget = pane.getMainWidget()
        const mainBounding = mainWidget.getBounding()
        if (
          x >= mainBounding.left && x <= mainBounding.left + mainBounding.width &&
          y >= mainBounding.top && y <= mainBounding.top + mainBounding.height
        ) {
          widget = mainWidget
        }
      }
      if (!isValid(widget)) {
        for (const yAxisWidget of pane.getYAxisWidgets()) {
          const yAxisBounding = yAxisWidget.getBounding()
          if (
            x >= yAxisBounding.left && x <= yAxisBounding.left + yAxisBounding.width &&
            y >= yAxisBounding.top && y <= yAxisBounding.top + yAxisBounding.height
          ) {
            widget = yAxisWidget
            break
          }
        }
      }
    }
    return { pane, widget }
  }

  private _makeWidgetEvent (event: MouseTouchEvent, widget: Nullable<Widget>): MouseTouchEvent {
    const bounding = widget?.getBounding() ?? null
    return {
      ...event,
      x: event.x - (bounding?.left ?? 0),
      y: event.y - (bounding?.top ?? 0)
    }
  }

  destroy (): void {
    document.removeEventListener('keydown', this._boundKeyBoardDownEvent)
    this._event.destroy()
  }
}
```

## File: extension/figure/arc.ts
```typescript
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

import type Coordinate from '../../common/Coordinate'
import { getDistance } from '../../common/Coordinate'
import type { LineStyle } from '../../common/Styles'

import { type FigureTemplate, DEVIATION } from '../../component/Figure'

import type { CircleAttrs } from './circle'

export function checkCoordinateOnArc (coordinate: Coordinate, attrs: ArcAttrs | ArcAttrs[]): boolean {
  let arcs: ArcAttrs[] = []
  arcs = arcs.concat(attrs)
  for (const arc of arcs) {
    if (Math.abs(getDistance(coordinate, arc) - arc.r) < DEVIATION) {
      const { r, startAngle, endAngle } = arc
      const startCoordinateX = r * Math.cos(startAngle) + arc.x
      const startCoordinateY = r * Math.sin(startAngle) + arc.y
      const endCoordinateX = r * Math.cos(endAngle) + arc.x
      const endCoordinateY = r * Math.sin(endAngle) + arc.y
      if (
        coordinate.x <= Math.max(startCoordinateX, endCoordinateX) + DEVIATION &&
        coordinate.x >= Math.min(startCoordinateX, endCoordinateX) - DEVIATION &&
        coordinate.y <= Math.max(startCoordinateY, endCoordinateY) + DEVIATION &&
        coordinate.y >= Math.min(startCoordinateY, endCoordinateY) - DEVIATION
      ) {
        return true
      }
    }
  }

  return false
}

export function drawArc (ctx: CanvasRenderingContext2D, attrs: ArcAttrs | ArcAttrs[], styles: Partial<LineStyle>): void {
  let arcs: ArcAttrs[] = []
  arcs = arcs.concat(attrs)
  const { style = 'solid', size = 1, color = 'currentColor', dashedValue = [2, 2] } = styles
  ctx.lineWidth = size
  ctx.strokeStyle = color
  if (style === 'dashed') {
    ctx.setLineDash(dashedValue)
  } else {
    ctx.setLineDash([])
  }
  arcs.forEach(({ x, y, r, startAngle, endAngle }) => {
    ctx.beginPath()
    ctx.arc(x, y, r, startAngle, endAngle)
    ctx.stroke()
    ctx.closePath()
  })
}

export interface ArcAttrs extends CircleAttrs {
  startAngle: number
  endAngle: number
}

const arc: FigureTemplate<ArcAttrs | ArcAttrs[], Partial<LineStyle>> = {
  name: 'arc',
  checkEventOn: checkCoordinateOnArc,
  draw: (ctx: CanvasRenderingContext2D, attrs: ArcAttrs | ArcAttrs[], styles: Partial<LineStyle>) => {
    drawArc(ctx, attrs, styles)
  }
}

export default arc
```

## File: extension/figure/circle.ts
```typescript
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

import type Coordinate from '../../common/Coordinate'
import type { PolygonStyle } from '../../common/Styles'
import { isString } from '../../common/utils/typeChecks'
import { isTransparent } from '../../common/utils/color'

import type { FigureTemplate } from '../../component/Figure'

export function checkCoordinateOnCircle (coordinate: Coordinate, attrs: CircleAttrs | CircleAttrs[]): boolean {
  let circles: CircleAttrs[] = []
  circles = circles.concat(attrs)

  for (const circle of circles) {
    const { x, y, r } = circle
    const difX = coordinate.x - x
    const difY = coordinate.y - y
    if (!(difX * difX + difY * difY > r * r)) {
      return true
    }
  }
  return false
}

export function drawCircle (ctx: CanvasRenderingContext2D, attrs: CircleAttrs | CircleAttrs[], styles: Partial<PolygonStyle>): void {
  let circles: CircleAttrs[] = []
  circles = circles.concat(attrs)

  const {
    style = 'fill',
    color = 'currentColor',
    borderSize = 1,
    borderColor = 'currentColor',
    borderStyle = 'solid',
    borderDashedValue = [2, 2]
  } = styles

  const solid = (style === 'fill' || styles.style === 'stroke_fill') && (!isString(color) || !isTransparent(color))
  if (solid) {
    ctx.fillStyle = color
    circles.forEach(({ x, y, r }) => {
      ctx.beginPath()
      ctx.arc(x, y, r, 0, Math.PI * 2)
      ctx.closePath()
      ctx.fill()
    })
  }
  if ((style === 'stroke' || styles.style === 'stroke_fill') && borderSize > 0 && !isTransparent(borderColor)) {
    ctx.strokeStyle = borderColor
    ctx.lineWidth = borderSize
    if (borderStyle === 'dashed') {
      ctx.setLineDash(borderDashedValue)
    } else {
      ctx.setLineDash([])
    }
    circles.forEach(({ x, y, r }) => {
      if (!solid || r > borderSize) {
        ctx.beginPath()
        ctx.arc(x, y, r, 0, Math.PI * 2)
        ctx.closePath()
        ctx.stroke()
      }
    })
  }
}

export interface CircleAttrs {
  x: number
  y: number
  r: number
}

const circle: FigureTemplate<CircleAttrs | CircleAttrs[], Partial<PolygonStyle>> = {
  name: 'circle',
  checkEventOn: checkCoordinateOnCircle,
  draw: (ctx: CanvasRenderingContext2D, attrs: CircleAttrs | CircleAttrs[], styles: Partial<PolygonStyle>) => {
    drawCircle(ctx, attrs, styles)
  }
}

export default circle
```

## File: extension/figure/index.ts
```typescript
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

import type Nullable from '../../common/Nullable'

import FigureImp, { type FigureTemplate, type FigureConstructor, type FigureInnerConstructor } from '../../component/Figure'

import circle from './circle'
import line from './line'
import polygon from './polygon'
import rect from './rect'
import text from './text'
import arc from './arc'
import path from './path'

const figures: Record<string, FigureInnerConstructor> = {}

const extensions = [circle, line, polygon, rect, text, arc, path]
extensions.forEach((figure: FigureTemplate) => {
  figures[figure.name] = FigureImp.extend(figure)
})

function getSupportedFigures (): string[] {
  return Object.keys(figures)
}

function registerFigure<A = unknown, S = unknown> (figure: FigureTemplate<A, S>): void {
  figures[figure.name] = FigureImp.extend(figure)
}

function getInnerFigureClass (name: string): Nullable<FigureInnerConstructor> {
  return figures[name] ?? null
}

function getFigureClass<A = unknown, S = unknown> (name: string): Nullable<FigureConstructor<A, S>> {
  return figures[name] ?? null
}

export { getSupportedFigures, getFigureClass, getInnerFigureClass, registerFigure }
```

## File: extension/figure/line.ts
```typescript
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

import type Nullable from '../../common/Nullable'
import type Coordinate from '../../common/Coordinate'
import type { SmoothLineStyle } from '../../common/Styles'

import { type FigureTemplate, DEVIATION } from '../../component/Figure'
import { isNumber, isString } from '../../common/utils/typeChecks'

export function checkCoordinateOnLine (coordinate: Coordinate, attrs: LineAttrs | LineAttrs[]): boolean {
  let lines: LineAttrs[] = []
  lines = lines.concat(attrs)

  for (const line of lines) {
    const { coordinates } = line
    if (coordinates.length > 1) {
      for (let i = 1; i < coordinates.length; i++) {
        const prevCoordinate = coordinates[i - 1]
        const currentCoordinate = coordinates[i]
        if (prevCoordinate.x === currentCoordinate.x) {
          if (
            Math.abs(prevCoordinate.y - coordinate.y) + Math.abs(currentCoordinate.y - coordinate.y) - Math.abs(prevCoordinate.y - currentCoordinate.y) < DEVIATION + DEVIATION &&
            Math.abs(coordinate.x - prevCoordinate.x) < DEVIATION
          ) {
            return true
          }
        } else {
          const kb = getLinearSlopeIntercept(prevCoordinate, currentCoordinate)!
          const y = getLinearYFromSlopeIntercept(kb, coordinate)
          const yDif = Math.abs(y - coordinate.y)
          if (
            Math.abs(prevCoordinate.x - coordinate.x) + Math.abs(currentCoordinate.x - coordinate.x) - Math.abs(prevCoordinate.x - currentCoordinate.x) < DEVIATION + DEVIATION &&
            yDif * yDif / (kb[0] * kb[0] + 1) < DEVIATION * DEVIATION
          ) {
            return true
          }
        }
      }
    }
  }
  return false
}

export function getLinearYFromSlopeIntercept (kb: Nullable<number[]>, coordinate: Coordinate): number {
  if (kb !== null) {
    return coordinate.x * kb[0] + kb[1]
  }
  return coordinate.y
}

/**
 * 获取点在两点决定的一次函数上的y值
 * @param coordinate1
 * @param coordinate2
 * @param targetCoordinate
 */
export function getLinearYFromCoordinates (coordinate1: Coordinate, coordinate2: Coordinate, targetCoordinate: Coordinate): number {
  const kb = getLinearSlopeIntercept(coordinate1, coordinate2)
  return getLinearYFromSlopeIntercept(kb, targetCoordinate)
}

export function getLinearSlopeIntercept (coordinate1: Coordinate, coordinate2: Coordinate): Nullable<number[]> {
  const difX = coordinate1.x - coordinate2.x
  if (difX !== 0) {
    const k = (coordinate1.y - coordinate2.y) / difX
    const b = coordinate1.y - k * coordinate1.x
    return [k, b]
  }
  return null
}

export function lineTo (ctx: CanvasRenderingContext2D, coordinates: Coordinate[], smooth: number | boolean): void {
  const length = coordinates.length
  const smoothParam = isNumber(smooth) ? (smooth > 0 && smooth < 1 ? smooth : 0) : (smooth ? 0.5 : 0)
  if ((smoothParam > 0) && length > 2) {
    let cpx0 = coordinates[0].x
    let cpy0 = coordinates[0].y
    for (let i = 1; i < length - 1; i++) {
      const prevCoordinate = coordinates[i - 1]
      const coordinate = coordinates[i]
      const nextCoordinate = coordinates[i + 1]
      const dx01 = coordinate.x - prevCoordinate.x
      const dy01 = coordinate.y - prevCoordinate.y
      const dx12 = nextCoordinate.x - coordinate.x
      const dy12 = nextCoordinate.y - coordinate.y
      let dx02 = nextCoordinate.x - prevCoordinate.x
      let dy02 = nextCoordinate.y - prevCoordinate.y
      const prevSegmentLength = Math.sqrt(dx01 * dx01 + dy01 * dy01)
      const nextSegmentLength = Math.sqrt(dx12 * dx12 + dy12 * dy12)
      const segmentLengthRatio = nextSegmentLength / (nextSegmentLength + prevSegmentLength)

      let nextCpx = coordinate.x + dx02 * smoothParam * segmentLengthRatio
      let nextCpy = coordinate.y + dy02 * smoothParam * segmentLengthRatio
      nextCpx = Math.min(nextCpx, Math.max(nextCoordinate.x, coordinate.x))
      nextCpy = Math.min(nextCpy, Math.max(nextCoordinate.y, coordinate.y))
      nextCpx = Math.max(nextCpx, Math.min(nextCoordinate.x, coordinate.x))
      nextCpy = Math.max(nextCpy, Math.min(nextCoordinate.y, coordinate.y))

      dx02 = nextCpx - coordinate.x
      dy02 = nextCpy - coordinate.y

      let cpx1 = coordinate.x - dx02 * prevSegmentLength / nextSegmentLength
      let cpy1 = coordinate.y - dy02 * prevSegmentLength / nextSegmentLength

      cpx1 = Math.min(cpx1, Math.max(prevCoordinate.x, coordinate.x))
      cpy1 = Math.min(cpy1, Math.max(prevCoordinate.y, coordinate.y))
      cpx1 = Math.max(cpx1, Math.min(prevCoordinate.x, coordinate.x))
      cpy1 = Math.max(cpy1, Math.min(prevCoordinate.y, coordinate.y))

      dx02 = coordinate.x - cpx1
      dy02 = coordinate.y - cpy1
      nextCpx = coordinate.x + dx02 * nextSegmentLength / prevSegmentLength
      nextCpy = coordinate.y + dy02 * nextSegmentLength / prevSegmentLength

      ctx.bezierCurveTo(cpx0, cpy0, cpx1, cpy1, coordinate.x, coordinate.y)

      cpx0 = nextCpx
      cpy0 = nextCpy
    }
    const lastCoordinate = coordinates[length - 1]
    ctx.bezierCurveTo(cpx0, cpy0, lastCoordinate.x, lastCoordinate.y, lastCoordinate.x, lastCoordinate.y)
  } else {
    for (let i = 1; i < length; i++) {
      ctx.lineTo(coordinates[i].x, coordinates[i].y)
    }
  }
}

export function drawLine (ctx: CanvasRenderingContext2D, attrs: LineAttrs | LineAttrs[], styles: Partial<SmoothLineStyle> & { lineCap?: CanvasLineCap; lineJoin?: CanvasLineJoin }): void {
  let lines: LineAttrs[] = []
  lines = lines.concat(attrs)
  const { style = 'solid', smooth = false, size = 1, color = 'currentColor', dashedValue = [2, 2], lineCap, lineJoin } = styles
  const isSmooth = isNumber(smooth) ? smooth > 0 : smooth
  ctx.lineWidth = size
  ctx.strokeStyle = color
  // Use explicit lineCap/lineJoin if provided, otherwise default based on smooth
  if (isString(lineCap)) {
    ctx.lineCap = lineCap
  } else if (isSmooth) {
    ctx.lineCap = 'round'
  } else {
    ctx.lineCap = 'butt'
  }
  if (isString(lineJoin)) {
    ctx.lineJoin = lineJoin
  } else if (isSmooth) {
    ctx.lineJoin = 'round'
  } else {
    ctx.lineJoin = 'miter'
  }
  if (style === 'dashed') {
    ctx.setLineDash(dashedValue)
  } else {
    ctx.setLineDash([])
  }
  const correction = size % 2 === 1 ? 0.5 : 0
  lines.forEach(({ coordinates }) => {
    if (coordinates.length > 1) {
      if (
        coordinates.length === 2 &&
        (
          coordinates[0].x === coordinates[1].x ||
          coordinates[0].y === coordinates[1].y
        )
      ) {
        ctx.beginPath()
        if (coordinates[0].x === coordinates[1].x) {
          ctx.moveTo(coordinates[0].x + correction, coordinates[0].y)
          ctx.lineTo(coordinates[1].x + correction, coordinates[1].y)
        } else {
          ctx.moveTo(coordinates[0].x, coordinates[0].y + correction)
          ctx.lineTo(coordinates[1].x, coordinates[1].y + correction)
        }
        ctx.stroke()
        ctx.closePath()
      } else {
        ctx.save()
        if (size % 2 === 1) {
          ctx.translate(0.5, 0.5)
        }
        ctx.beginPath()
        ctx.moveTo(coordinates[0].x, coordinates[0].y)
        lineTo(ctx, coordinates, smooth)
        ctx.stroke()
        ctx.closePath()
        ctx.restore()
      }
    }
  })
}

export interface LineAttrs {
  coordinates: Coordinate[]
}

const line: FigureTemplate<LineAttrs | LineAttrs[], Partial<SmoothLineStyle>> = {
  name: 'line',
  checkEventOn: checkCoordinateOnLine,
  draw: (ctx: CanvasRenderingContext2D, attrs: LineAttrs | LineAttrs[], styles: Partial<SmoothLineStyle>) => {
    drawLine(ctx, attrs, styles)
  }
}

export default line
```

## File: extension/figure/path.ts
```typescript
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

import type { PathStyle } from '../../common/Styles'
import { isValid } from '../../common/utils/typeChecks'

import type { FigureTemplate } from '../../component/Figure'
import { checkCoordinateOnRect } from './rect'

function drawEllipticalArc (ctx: CanvasRenderingContext2D, x1: number, y1: number, args: number[], offsetX: number, offsetY: number, isRelative: boolean): void {
  const [rx, ry, rotation, largeArcFlag, sweepFlag, x2, y2] = args

  const targetX = isRelative ? x1 + x2 : x2 + offsetX
  const targetY = isRelative ? y1 + y2 : y2 + offsetY

  const segments = ellipticalArcToBeziers(x1, y1, rx, ry, rotation, largeArcFlag, sweepFlag, targetX, targetY)

  segments.forEach(segment => {
    ctx.bezierCurveTo(segment[0], segment[1], segment[2], segment[3], segment[4], segment[5])
  })
}

function ellipticalArcToBeziers (x1: number, y1: number, rx: number, ry: number, rotation: number, largeArcFlag: number, sweepFlag: number, x2: number, y2: number): number[][] {
  const { cx, cy, startAngle, deltaAngle } = computeEllipticalArcParameters(
    x1, y1, rx, ry, rotation, largeArcFlag, sweepFlag, x2, y2
  )

  const segments: number[][] = []
  const numSegments = Math.ceil(Math.abs(deltaAngle) / (Math.PI / 2))
  for (let i = 0; i < numSegments; i++) {
    const start = startAngle + (i * deltaAngle) / numSegments
    const end = startAngle + ((i + 1) * deltaAngle) / numSegments

    const bezier = ellipticalArcToBezier(cx, cy, rx, ry, rotation, start, end)
    segments.push(bezier)
  }

  return segments
}

function computeEllipticalArcParameters (x1: number, y1: number, rx: number, ry: number, rotation: number, largeArcFlag: number, sweepFlag: number, x2: number, y2: number): { cx: number; cy: number; startAngle: number; deltaAngle: number } {
  const phi = (rotation * Math.PI) / 180

  const dx = (x1 - x2) / 2
  const dy = (y1 - y2) / 2
  const x1p = Math.cos(phi) * dx + Math.sin(phi) * dy
  const y1p = -Math.sin(phi) * dx + Math.cos(phi) * dy

  const lambda = (x1p ** 2) / (rx ** 2) + (y1p ** 2) / (ry ** 2)
  if (lambda > 1) {
    rx *= Math.sqrt(lambda)
    ry *= Math.sqrt(lambda)
  }

  const sign = largeArcFlag === sweepFlag ? -1 : 1
  const numerator = (rx ** 2) * (ry ** 2) - (rx ** 2) * (y1p ** 2) - (ry ** 2) * (x1p ** 2)
  const denominator = (rx ** 2) * (y1p ** 2) + (ry ** 2) * (x1p ** 2)
  const cxp = sign * Math.sqrt(Math.abs(numerator / denominator)) * (rx * y1p / ry)
  const cyp = sign * Math.sqrt(Math.abs(numerator / denominator)) * (-ry * x1p / rx)

  const cx = Math.cos(phi) * cxp - Math.sin(phi) * cyp + (x1 + x2) / 2
  const cy = Math.sin(phi) * cxp + Math.cos(phi) * cyp + (y1 + y2) / 2

  const startAngle = Math.atan2((y1p - cyp) / ry, (x1p - cxp) / rx)
  let deltaAngle = Math.atan2((-y1p - cyp) / ry, (-x1p - cxp) / rx) - startAngle

  if (deltaAngle < 0 && sweepFlag === 1) {
    deltaAngle += 2 * Math.PI
  } else if (deltaAngle > 0 && sweepFlag === 0) {
    deltaAngle -= 2 * Math.PI
  }

  return { cx, cy, startAngle, deltaAngle }
}

/**
 * Ellipse arc segment to Bezier curve
 * @param cx
 * @param cy
 * @param rx
 * @param ry
 * @param rotation
 * @param startAngle
 * @param endAngle
 * @returns
 */
function ellipticalArcToBezier (cx: number, cy: number, rx: number, ry: number, rotation: number, startAngle: number, endAngle: number): number[] {
  // 计算控制点
  const alpha = Math.sin(endAngle - startAngle) * (Math.sqrt(4 + 3 * Math.tan((endAngle - startAngle) / 2) ** 2) - 1) / 3
  const cosPhi = Math.cos(rotation)
  const sinPhi = Math.sin(rotation)

  const x1 = cx + rx * Math.cos(startAngle) * cosPhi - ry * Math.sin(startAngle) * sinPhi
  const y1 = cy + rx * Math.cos(startAngle) * sinPhi + ry * Math.sin(startAngle) * cosPhi

  const x2 = cx + rx * Math.cos(endAngle) * cosPhi - ry * Math.sin(endAngle) * sinPhi
  const y2 = cy + rx * Math.cos(endAngle) * sinPhi + ry * Math.sin(endAngle) * cosPhi

  const cp1x = x1 + alpha * (-rx * Math.sin(startAngle) * cosPhi - ry * Math.cos(startAngle) * sinPhi)
  const cp1y = y1 + alpha * (-rx * Math.sin(startAngle) * sinPhi + ry * Math.cos(startAngle) * cosPhi)

  const cp2x = x2 - alpha * (-rx * Math.sin(endAngle) * cosPhi - ry * Math.cos(endAngle) * sinPhi)
  const cp2y = y2 - alpha * (-rx * Math.sin(endAngle) * sinPhi + ry * Math.cos(endAngle) * cosPhi)

  return [cp1x, cp1y, cp2x, cp2y, x2, y2]
}

export function drawPath (ctx: CanvasRenderingContext2D, attrs: PathAttrs | PathAttrs[], styles: Partial<PathStyle>): void {
  let paths: PathAttrs[] = []
  paths = paths.concat(attrs)
  const { lineWidth = 1, color = 'currentColor' } = styles
  ctx.lineWidth = lineWidth
  ctx.strokeStyle = color
  ctx.setLineDash([])
  paths.forEach(({ x, y, path }) => {
    const commands = path.match(/[MLHVCSQTAZ][^MLHVCSQTAZ]*/gi)
    if (isValid(commands)) {
      const offsetX = x
      const offsetY = y
      ctx.beginPath()
      commands.forEach(command => {
        let currentX = 0
        let currentY = 0
        let startX = 0
        let startY = 0
        const type = command[0]
        const args = command.slice(1).trim().split(/[\s,]+/).map(Number)
        switch (type) {
          case 'M':
            currentX = args[0] + offsetX
            currentY = args[1] + offsetY
            ctx.moveTo(currentX, currentY)
            startX = currentX
            startY = currentY
            break
          case 'm':
            currentX += args[0]
            currentY += args[1]
            ctx.moveTo(currentX, currentY)
            startX = currentX
            startY = currentY
            break
          case 'L':
            currentX = args[0] + offsetX
            currentY = args[1] + offsetY
            ctx.lineTo(currentX, currentY)
            break
          case 'l':
            currentX += args[0]
            currentY += args[1]
            ctx.lineTo(currentX, currentY)
            break
          case 'H':
            currentX = args[0] + offsetX
            ctx.lineTo(currentX, currentY)
            break
          case 'h':
            currentX += args[0]
            ctx.lineTo(currentX, currentY)
            break
          case 'V':
            currentY = args[0] + offsetY
            ctx.lineTo(currentX, currentY)
            break
          case 'v':
            currentY += args[0]
            ctx.lineTo(currentX, currentY)
            break
          case 'C':
            ctx.bezierCurveTo(
              args[0] + offsetX, args[1] + offsetY,
              args[2] + offsetX, args[3] + offsetY,
              args[4] + offsetX, args[5] + offsetY
            )
            currentX = args[4] + offsetX
            currentY = args[5] + offsetY
            break
          case 'c':
            ctx.bezierCurveTo(
              currentX + args[0], currentY + args[1],
              currentX + args[2], currentY + args[3],
              currentX + args[4], currentY + args[5]
            )
            currentX += args[4]
            currentY += args[5]
            break
          case 'S':
            ctx.bezierCurveTo(
              currentX, currentY,
              args[0] + offsetX, args[1] + offsetY,
              args[2] + offsetX, args[3] + offsetY
            )
            currentX = args[2] + offsetX
            currentY = args[3] + offsetY
            break
          case 's':
            ctx.bezierCurveTo(
              currentX, currentY,
              currentX + args[0], currentY + args[1],
              currentX + args[2], currentY + args[3]
            )
            currentX += args[2]
            currentY += args[3]
            break
          case 'Q':
            ctx.quadraticCurveTo(
              args[0] + offsetX, args[1] + offsetY,
              args[2] + offsetX, args[3] + offsetY
            )
            currentX = args[2] + offsetX
            currentY = args[3] + offsetY
            break
          case 'q':
            ctx.quadraticCurveTo(
              currentX + args[0], currentY + args[1],
              currentX + args[2], currentY + args[3]
            )
            currentX += args[2]
            currentY += args[3]
            break
          case 'T':
            ctx.quadraticCurveTo(
              currentX, currentY,
              args[0] + offsetX, args[1] + offsetY
            )
            currentX = args[0] + offsetX
            currentY = args[1] + offsetY
            break
          case 't':
            ctx.quadraticCurveTo(
              currentX, currentY,
              currentX + args[0], currentY + args[1]
            )
            currentX += args[0]
            currentY += args[1]
            break
          case 'A':
            // arc
            // reference https://www.w3.org/TR/SVG/implnote.html#ArcImplementationNotes
            drawEllipticalArc(ctx, currentX, currentY, args, offsetX, offsetY, false)
            currentX = args[5] + offsetX
            currentY = args[6] + offsetY
            break
          case 'a':
            // arc
            // reference https://www.w3.org/TR/SVG/implnote.html#ArcImplementationNotes
            drawEllipticalArc(ctx, currentX, currentY, args, offsetX, offsetY, true)
            currentX += args[5]
            currentY += args[6]
            break
          case 'Z':
          case 'z':
            ctx.closePath()
            currentX = startX
            currentY = startY
            break
          default: { break }
        }
      })
      if (styles.style === 'fill') {
        ctx.fill()
      } else {
        ctx.stroke()
      }
    }
  })
}

export interface PathAttrs {
  x: number
  y: number
  width: number
  height: number
  path: string
}

const path: FigureTemplate<PathAttrs | PathAttrs[], Partial<PathStyle>> = {
  name: 'path',
  checkEventOn: checkCoordinateOnRect,
  draw: (ctx: CanvasRenderingContext2D, attrs: PathAttrs | PathAttrs[], styles: Partial<PathStyle>) => {
    drawPath(ctx, attrs, styles)
  }
}

export default path
```

## File: extension/figure/polygon.ts
```typescript
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

import type Coordinate from '../../common/Coordinate'
import type { PolygonStyle } from '../../common/Styles'
import { isString } from '../../common/utils/typeChecks'
import { isTransparent } from '../../common/utils/color'

import type { FigureTemplate } from '../../component/Figure'

export function checkCoordinateOnPolygon (coordinate: Coordinate, attrs: PolygonAttrs | PolygonAttrs[]): boolean {
  let polygons: PolygonAttrs[] = []
  polygons = polygons.concat(attrs)
  for (const polygon of polygons) {
    let on = false
    const { coordinates } = polygon
    for (let i = 0, j = coordinates.length - 1; i < coordinates.length; j = i++) {
      if (
        (coordinates[i].y > coordinate.y) !== (coordinates[j].y > coordinate.y) &&
        (coordinate.x < (coordinates[j].x - coordinates[i].x) * (coordinate.y - coordinates[i].y) / (coordinates[j].y - coordinates[i].y) + coordinates[i].x)
      ) {
        on = !on
      }
    }
    if (on) {
      return true
    }
  }
  return false
}

export function drawPolygon (ctx: CanvasRenderingContext2D, attrs: PolygonAttrs | PolygonAttrs[], styles: Partial<PolygonStyle>): void {
  let polygons: PolygonAttrs[] = []
  polygons = polygons.concat(attrs)
  const {
    style = 'fill',
    color = 'currentColor',
    borderSize = 1,
    borderColor = 'currentColor',
    borderStyle = 'solid',
    borderDashedValue = [2, 2]
  } = styles
  if (
    (style === 'fill' || styles.style === 'stroke_fill') &&
    (!isString(color) || !isTransparent(color))) {
    ctx.fillStyle = color
    polygons.forEach(({ coordinates }) => {
      ctx.beginPath()
      ctx.moveTo(coordinates[0].x, coordinates[0].y)
      for (let i = 1; i < coordinates.length; i++) {
        ctx.lineTo(coordinates[i].x, coordinates[i].y)
      }
      ctx.closePath()
      ctx.fill()
    })
  }
  if ((style === 'stroke' || styles.style === 'stroke_fill') && borderSize > 0 && !isTransparent(borderColor)) {
    ctx.strokeStyle = borderColor
    ctx.lineWidth = borderSize
    if (borderStyle === 'dashed') {
      ctx.setLineDash(borderDashedValue)
    } else {
      ctx.setLineDash([])
    }
    polygons.forEach(({ coordinates }) => {
      ctx.beginPath()
      ctx.moveTo(coordinates[0].x, coordinates[0].y)
      for (let i = 1; i < coordinates.length; i++) {
        ctx.lineTo(coordinates[i].x, coordinates[i].y)
      }
      ctx.closePath()
      ctx.stroke()
    })
  }
}

export interface PolygonAttrs {
  coordinates: Coordinate[]
}

const polygon: FigureTemplate<PolygonAttrs | PolygonAttrs[], Partial<PolygonStyle>> = {
  name: 'polygon',
  checkEventOn: checkCoordinateOnPolygon,
  draw: (ctx: CanvasRenderingContext2D, attrs: PolygonAttrs | PolygonAttrs[], styles: Partial<PolygonStyle>) => {
    drawPolygon(ctx, attrs, styles)
  }
}

export default polygon
```

## File: extension/figure/rect.ts
```typescript
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

import type Coordinate from '../../common/Coordinate'
import type { RectStyle } from '../../common/Styles'
import { isTransparent } from '../../common/utils/color'
import { isString } from '../../common/utils/typeChecks'

import { type FigureTemplate, DEVIATION } from '../../component/Figure'

export function checkCoordinateOnRect (coordinate: Coordinate, attrs: RectAttrs | RectAttrs[]): boolean {
  let rects: RectAttrs[] = []
  rects = rects.concat(attrs)
  for (const rect of rects) {
    let x = rect.x
    let width = rect.width
    if (width < DEVIATION * 2) {
      x -= DEVIATION
      width = DEVIATION * 2
    }
    let y = rect.y
    let height = rect.height
    if (height < DEVIATION * 2) {
      y -= DEVIATION
      height = DEVIATION * 2
    }
    if (
      coordinate.x >= x &&
      coordinate.x <= x + width &&
      coordinate.y >= y &&
      coordinate.y <= y + height
    ) {
      return true
    }
  }
  return false
}

export function drawRect (ctx: CanvasRenderingContext2D, attrs: RectAttrs | RectAttrs[], styles: Partial<RectStyle>): void {
  let rects: RectAttrs[] = []
  rects = rects.concat(attrs)
  const {
    style = 'fill',
    color = 'transparent',
    borderSize = 1,
    borderColor = 'transparent',
    borderStyle = 'solid',
    borderRadius: r = 0,
    borderDashedValue = [2, 2]
  } = styles
  // eslint-disable-next-line @typescript-eslint/unbound-method, @typescript-eslint/no-unnecessary-condition -- ignore
  const draw = ctx.roundRect ?? ctx.rect
  const solid = (style === 'fill' || styles.style === 'stroke_fill') && (!isString(color) || !isTransparent(color))
  if (solid) {
    ctx.fillStyle = color
    rects.forEach(({ x, y, width: w, height: h }) => {
      ctx.beginPath()
      draw.call(ctx, x, y, w, h, r)
      ctx.closePath()
      ctx.fill()
    })
  }
  if ((style === 'stroke' || styles.style === 'stroke_fill') && borderSize > 0 && !isTransparent(borderColor)) {
    ctx.strokeStyle = borderColor
    ctx.fillStyle = borderColor
    ctx.lineWidth = borderSize
    if (borderStyle === 'dashed') {
      ctx.setLineDash(borderDashedValue)
    } else {
      ctx.setLineDash([])
    }
    const correction = borderSize % 2 === 1 ? 0.5 : 0
    const doubleCorrection = Math.round(correction * 2)
    rects.forEach(({ x, y, width: w, height: h }) => {
      if (w > borderSize * 2 && h > borderSize * 2) {
        ctx.beginPath()
        draw.call(ctx, x + correction, y + correction, w - doubleCorrection, h - doubleCorrection, r)
        ctx.closePath()
        ctx.stroke()
      } else {
        if (!solid) {
          ctx.fillRect(x, y, w, h)
        }
      }
    })
  }
}

export interface RectAttrs {
  x: number
  y: number
  width: number
  height: number
}

const rect: FigureTemplate<RectAttrs | RectAttrs[], Partial<RectStyle>> = {
  name: 'rect',
  checkEventOn: checkCoordinateOnRect,
  draw: (ctx: CanvasRenderingContext2D, attrs: RectAttrs | RectAttrs[], styles: Partial<RectStyle>) => {
    drawRect(ctx, attrs, styles)
  }
}

export default rect
```

## File: extension/figure/text.ts
```typescript
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

import type Coordinate from '../../common/Coordinate'
import type { TextStyle } from '../../common/Styles'

import { createFont, calcTextWidth } from '../../common/utils/canvas'

import type { FigureTemplate } from '../../component/Figure'

import { type RectAttrs, drawRect } from './rect'

export function getTextRect (attrs: TextAttrs, styles: Partial<TextStyle>): RectAttrs {
  const { size = 12, paddingLeft = 0, paddingTop = 0, paddingRight = 0, paddingBottom = 0, weight = 'normal', family } = styles
  const { x, y, text, align = 'left', baseline = 'top', width: w, height: h } = attrs
  const width = w ?? (paddingLeft + calcTextWidth(text, size, weight, family) + paddingRight)
  const height = h ?? (paddingTop + size + paddingBottom)
  let startX = 0
  switch (align) {
    case 'left':
    case 'start': {
      startX = x
      break
    }
    case 'right':
    case 'end': {
      startX = x - width
      break
    }
    default: {
      startX = x - width / 2
      break
    }
  }
  let startY = 0
  switch (baseline) {
    case 'top':
    case 'hanging': {
      startY = y
      break
    }
    case 'bottom':
    case 'ideographic':
    case 'alphabetic': {
      startY = y - height
      break
    }
    default: {
      startY = y - height / 2
      break
    }
  }
  return { x: startX, y: startY, width, height }
}

export function checkCoordinateOnText (coordinate: Coordinate, attrs: TextAttrs | TextAttrs[], styles: Partial<TextStyle>): boolean {
  let texts: TextAttrs[] = []
  texts = texts.concat(attrs)
  for (const text of texts) {
    const { x, y, width, height } = getTextRect(text, styles)
    if (
      coordinate.x >= x &&
      coordinate.x <= x + width &&
      coordinate.y >= y &&
      coordinate.y <= y + height
    ) {
      return true
    }
  }
  return false
}

export function drawText (ctx: CanvasRenderingContext2D, attrs: TextAttrs | TextAttrs[], styles: Partial<TextStyle>): void {
  let texts: TextAttrs[] = []
  texts = texts.concat(attrs)
  const {
    color = 'currentColor',
    size = 12,
    family,
    weight,
    paddingLeft = 0,
    paddingTop = 0,
    paddingRight = 0
  } = styles
  const rects = texts.map(text => getTextRect(text, styles))
  drawRect(ctx, rects, { ...styles, color: styles.backgroundColor })

  ctx.textAlign = 'left'
  ctx.textBaseline = 'top'
  ctx.font = createFont(size, weight, family)
  ctx.fillStyle = color

  texts.forEach((text, index) => {
    const rect = rects[index]
    ctx.fillText(text.text, rect.x + paddingLeft, rect.y + paddingTop, rect.width - paddingLeft - paddingRight)
  })
}

export interface TextAttrs {
  x: number
  y: number
  text: string
  width?: number
  height?: number
  align?: CanvasTextAlign
  baseline?: CanvasTextBaseline
}

const text: FigureTemplate<TextAttrs | TextAttrs[], Partial<TextStyle>> = {
  name: 'text',
  checkEventOn: checkCoordinateOnText,
  draw: (ctx: CanvasRenderingContext2D, attrs: TextAttrs | TextAttrs[], styles: Partial<TextStyle>) => {
    drawText(ctx, attrs, styles)
  }
}

export default text
```

## File: extension/hotkey/index.ts
```typescript
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

import type Nullable from '../../common/Nullable'

import type { HotkeyTemplate } from '../../common/Hotkey'

import scrollLeft from './scrollLeft'
import scrollRight from './scrollRight'
import zoomIn from './zoomIn'
import zoomOut from './zoomOut'

const hotkeys: Record<string, HotkeyTemplate> = {
  [scrollLeft.name]: scrollLeft,
  [scrollRight.name]: scrollRight,
  [zoomIn.name]: zoomIn,
  [zoomOut.name]: zoomOut
}

function registerHotkey<E = unknown> (hotkey: HotkeyTemplate<E>): void {
  hotkeys[hotkey.name] = hotkey as HotkeyTemplate
}

function getHotkey (name: string): Nullable<HotkeyTemplate> {
  return hotkeys[name] ?? null
}

function getSupportedHotkeys (): string[] {
  return Object.keys(hotkeys)
}

export { registerHotkey, getHotkey, getSupportedHotkeys }
```

## File: extension/hotkey/scrollLeft.ts
```typescript
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

import type { HotkeyTemplate } from '../../common/Hotkey'

const scrollLeft: HotkeyTemplate = {
  name: 'scrollLeft',
  keys: 'Shift+ArrowLeft',
  action: ({ chart }) => {
    chart.scrollByDistance(-3 * chart.getBarSpace().bar)
  }
}

export default scrollLeft
```

## File: extension/hotkey/scrollRight.ts
```typescript
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

import type { HotkeyTemplate } from '../../common/Hotkey'

const scrollRight: HotkeyTemplate = {
  name: 'scrollRight',
  keys: 'Shift+ArrowRight',
  action: ({ chart }) => {
    chart.scrollByDistance(3 * chart.getBarSpace().bar)
  }
}

export default scrollRight
```

## File: extension/hotkey/zoomIn.ts
```typescript
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

import type { HotkeyTemplate } from '../../common/Hotkey'

const zoomIn: HotkeyTemplate = {
  name: 'zoomIn',
  keys: ['Shift+Equal', 'Shift+NumpadAdd'],
  action: ({ chart }) => {
    chart.zoomAtCoordinate(1.05)
  }
}

export default zoomIn
```

## File: extension/hotkey/zoomOut.ts
```typescript
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

import type { HotkeyTemplate } from '../../common/Hotkey'

const zoomOut: HotkeyTemplate = {
  name: 'zoomOut',
  keys: ['Shift+Minus', 'Shift+NumpadSubtract'],
  action: ({ chart }) => {
    chart.zoomAtCoordinate(0.95)
  }
}

export default zoomOut
```

## File: extension/i18n/en-US.ts
```typescript
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

import type { Locales } from '../../Options'

const enUS: Locales = {
  time: 'Time: ',
  open: 'Open: ',
  high: 'High: ',
  low: 'Low: ',
  close: 'Close: ',
  volume: 'Volume: ',
  turnover: 'Turnover: ',
  change: 'Change: ',
  second: 'S',
  minute: '',
  hour: 'H',
  day: 'D',
  week: 'W',
  month: 'M',
  year: 'Y'
}

export default enUS
```

## File: extension/i18n/index.ts
```typescript
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

import type { Locales } from '../../Options'

import zhCN from './zh-CN'
import enUS from './en-US'

const locales: Record<string, Locales> = {
  'zh-CN': zhCN,
  'en-US': enUS
}

function registerLocale (locale: string, ls: Locales): void {
  locales[locale] = { ...locales[locale], ...ls }
}

function getSupportedLocales (): string[] {
  return Object.keys(locales)
}

function i18n (key: string, locale: string): string {
  return locales[locale][key] ?? key
}

export { i18n, registerLocale, getSupportedLocales }
```

## File: extension/i18n/zh-CN.ts
```typescript
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

import type { Locales } from '../../Options'

const zhCN: Locales = {
  time: '时间：',
  open: '开：',
  high: '高：',
  low: '低：',
  close: '收：',
  volume: '成交量：',
  turnover: '成交额：',
  change: '涨幅：',
  second: '秒',
  minute: '',
  hour: '小时',
  day: '天',
  week: '周',
  month: '月',
  year: '年'
}

export default zhCN
```

## File: extension/indicator/averagePrice.ts
```typescript
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

import type { IndicatorTemplate } from '../../component/Indicator'

interface Avp {
  avp?: number
}

/**
 * average price
 */
const averagePrice: IndicatorTemplate<Avp> = {
  name: 'AVP',
  shortName: 'AVP',
  series: 'price',
  precision: 2,
  figures: [
    { key: 'avp', title: 'AVP: ', type: 'line' }
  ],
  calc: (dataList) => {
    let totalTurnover = 0
    let totalVolume = 0
    return dataList.map((kLineData) => {
      const avp: Avp = {}
      const turnover = kLineData.turnover ?? 0
      const volume = kLineData.volume ?? 0
      totalTurnover += turnover
      totalVolume += volume
      if (totalVolume !== 0) {
        avp.avp = totalTurnover / totalVolume
      }
      return avp
    })
  }
}

export default averagePrice
```

## File: extension/indicator/awesomeOscillator.ts
```typescript
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

import { formatValue } from '../../common/utils/format'

import type { IndicatorTemplate } from '../../component/Indicator'

interface Ao {
  ao?: number
}

const awesomeOscillator: IndicatorTemplate<Ao, number> = {
  name: 'AO',
  shortName: 'AO',
  calcParams: [5, 34],
  figures: [{
    key: 'ao',
    title: 'AO: ',
    type: 'bar',
    baseValue: 0,
    styles: ({ data, indicator, defaultStyles }) => {
      const { prev, current } = data
      const prevAo = prev?.ao ?? Number.MIN_SAFE_INTEGER
      const currentAo = current?.ao ?? Number.MIN_SAFE_INTEGER
      let color = ''
      if (currentAo > prevAo) {
        color = formatValue(indicator.styles, 'bars[0].upColor', (defaultStyles!.bars)[0].upColor) as string
      } else {
        color = formatValue(indicator.styles, 'bars[0].downColor', (defaultStyles!.bars)[0].downColor) as string
      }
      const style = currentAo > prevAo ? 'stroke' : 'fill'
      return { color, style, borderColor: color }
    }
  }],
  calc: (dataList, indicator) => {
    const params = indicator.calcParams
    const maxPeriod = Math.max(params[0], params[1])
    let shortSum = 0
    let longSum = 0
    let short = 0
    let long = 0
    return dataList.map((kLineData, i) => {
      const ao: Ao = {}
      const middle = (kLineData.low + kLineData.high) / 2
      shortSum += middle
      longSum += middle
      if (i >= params[0] - 1) {
        short = shortSum / params[0]
        const agoKLineData = dataList[i - (params[0] - 1)]
        shortSum -= ((agoKLineData.low + agoKLineData.high) / 2)
      }
      if (i >= params[1] - 1) {
        long = longSum / params[1]
        const agoKLineData = dataList[i - (params[1] - 1)]
        longSum -= ((agoKLineData.low + agoKLineData.high) / 2)
      }
      if (i >= maxPeriod - 1) {
        ao.ao = short - long
      }
      return ao
    })
  }
}

export default awesomeOscillator
```

## File: extension/indicator/bias.ts
```typescript
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

import type { IndicatorTemplate } from '../../component/Indicator'

interface Bias {
  bias1?: number
  bias2?: number
  bias3?: number
}

/**
 * BIAS
 * 乖离率=[(当日收盘价-N日平均价)/N日平均价]*100%
 */
const bias: IndicatorTemplate<Bias, number> = {
  name: 'BIAS',
  shortName: 'BIAS',
  calcParams: [6, 12, 24],
  figures: [
    { key: 'bias1', title: 'BIAS6: ', type: 'line' },
    { key: 'bias2', title: 'BIAS12: ', type: 'line' },
    { key: 'bias3', title: 'BIAS24: ', type: 'line' }
  ],
  regenerateFigures: (params) => params.map((p, i) => ({ key: `bias${i + 1}`, title: `BIAS${p}: `, type: 'line' })),
  calc: (dataList, indicator) => {
    const { calcParams: params, figures } = indicator
    const closeSums: number[] = []
    return dataList.map((kLineData, i) => {
      const bias: Bias = {}
      const close = kLineData.close
      params.forEach((p, index) => {
        closeSums[index] = (closeSums[index] ?? 0) + close
        if (i >= p - 1) {
          const mean = closeSums[index] / params[index]
          bias[figures[index].key] = (close - mean) / mean * 100

          closeSums[index] -= dataList[i - (p - 1)].close
        }
      })
      return bias
    })
  }
}

export default bias
```

## File: extension/indicator/bollingerBands.ts
```typescript
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

import type { KLineData } from '../../common/Data'
import type { IndicatorTemplate } from '../../component/Indicator'

interface Boll {
  up?: number
  mid?: number
  dn?: number
}

/**
 * 计算布林指标中的标准差
 * @param dataList
 * @param ma
 * @return {number}
 */
function getBollMd (dataList: KLineData[], ma: number): number {
  const dataSize = dataList.length
  let sum = 0
  dataList.forEach(data => {
    const closeMa = data.close - ma
    sum += closeMa * closeMa
  })
  sum = Math.abs(sum)
  return Math.sqrt(sum / dataSize)
}

/**
 * BOLL
 */
const bollingerBands: IndicatorTemplate<Boll, number> = {
  name: 'BOLL',
  shortName: 'BOLL',
  series: 'price',
  calcParams: [20, 2],
  precision: 2,
  shouldOhlc: true,
  figures: [
    { key: 'up', title: 'UP: ', type: 'line' },
    { key: 'mid', title: 'MID: ', type: 'line' },
    { key: 'dn', title: 'DN: ', type: 'line' }
  ],
  calc: (dataList, indicator) => {
    const params = indicator.calcParams
    const p = params[0] - 1
    let closeSum = 0
    return dataList.map((kLineData, i) => {
      const close = kLineData.close
      const boll: Boll = {}
      closeSum += close
      if (i >= p) {
        boll.mid = closeSum / params[0]
        const md = getBollMd(dataList.slice(i - p, i + 1), boll.mid)
        boll.up = boll.mid + params[1] * md
        boll.dn = boll.mid - params[1] * md
        closeSum -= dataList[i - p].close
      }
      return boll
    })
  }
}

export default bollingerBands
```

## File: extension/indicator/brar.ts
```typescript
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

import type { IndicatorTemplate } from '../../component/Indicator'

interface Brar {
  br?: number
  ar?: number
}

/**
 * BRAR
 * 默认参数是26。
 * 公式N日BR=N日内（H－CY）之和除以N日内（CY－L）之和*100，
 * 其中，H为当日最高价，L为当日最低价，CY为前一交易日的收盘价，N为设定的时间参数。
 * N日AR=(N日内（H－O）之和除以N日内（O－L）之和)*100，
 * 其中，H为当日最高价，L为当日最低价，O为当日开盘价，N为设定的时间参数
 *
 */
const brar: IndicatorTemplate<Brar, number> = {
  name: 'BRAR',
  shortName: 'BRAR',
  calcParams: [26],
  figures: [
    { key: 'br', title: 'BR: ', type: 'line' },
    { key: 'ar', title: 'AR: ', type: 'line' }
  ],
  calc: (dataList, indicator) => {
    const params = indicator.calcParams
    let hcy = 0
    let cyl = 0
    let ho = 0
    let ol = 0
    return dataList.map((kLineData, i) => {
      const brar: Brar = {}
      const high = kLineData.high
      const low = kLineData.low
      const open = kLineData.open
      const prevClose = (dataList[i - 1] ?? kLineData).close
      ho += (high - open)
      ol += (open - low)
      hcy += (high - prevClose)
      cyl += (prevClose - low)
      if (i >= params[0] - 1) {
        if (ol !== 0) {
          brar.ar = ho / ol * 100
        } else {
          brar.ar = 0
        }
        if (cyl !== 0) {
          brar.br = hcy / cyl * 100
        } else {
          brar.br = 0
        }
        const agoKLineData = dataList[i - (params[0] - 1)]
        const agoHigh = agoKLineData.high
        const agoLow = agoKLineData.low
        const agoOpen = agoKLineData.open
        const agoPreClose = (dataList[i - params[0]] ?? dataList[i - (params[0] - 1)]).close
        hcy -= (agoHigh - agoPreClose)
        cyl -= (agoPreClose - agoLow)
        ho -= (agoHigh - agoOpen)
        ol -= (agoOpen - agoLow)
      }
      return brar
    })
  }
}

export default brar
```

## File: extension/indicator/bullAndBearIndex.ts
```typescript
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
import type { IndicatorTemplate } from '../../component/Indicator'

interface Bbi {
  bbi?: number
}

/**
 * 多空指标
 * 公式: BBI = (MA(CLOSE, M) + MA(CLOSE, N) + MA(CLOSE, O) + MA(CLOSE, P)) / 4
 *
 */
const bullAndBearIndex: IndicatorTemplate<Bbi, number> = {
  name: 'BBI',
  shortName: 'BBI',
  series: 'price',
  precision: 2,
  calcParams: [3, 6, 12, 24],
  shouldOhlc: true,
  figures: [
    { key: 'bbi', title: 'BBI: ', type: 'line' }
  ],
  calc: (dataList, indicator) => {
    const params = indicator.calcParams
    const maxPeriod = Math.max(...params)
    const closeSums: number[] = []
    const mas: number[] = []
    return dataList.map((kLineData, i) => {
      const bbi: Bbi = {}
      const close = kLineData.close
      params.forEach((p, index) => {
        closeSums[index] = (closeSums[index] ?? 0) + close
        if (i >= p - 1) {
          mas[index] = closeSums[index] / p
          closeSums[index] -= dataList[i - (p - 1)].close
        }
      })
      if (i >= maxPeriod - 1) {
        let maSum = 0
        mas.forEach(ma => {
          maSum += ma
        })
        bbi.bbi = maSum / 4
      }
      return bbi
    })
  }
}

export default bullAndBearIndex
```

## File: extension/indicator/commodityChannelIndex.ts
```typescript
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

import type { IndicatorTemplate } from '../../component/Indicator'

interface Cci {
  cci?: number
}

/**
 * CCI
 * CCI（N日）=（TP－MA）÷MD÷0.015
 * 其中，TP=（最高价+最低价+收盘价）÷3
 * MA=近N日TP价的累计之和÷N
 * MD=近N日TP - 当前MA绝对值的累计之和÷N
 *
 */
const commodityChannelIndex: IndicatorTemplate<Cci, number> = {
  name: 'CCI',
  shortName: 'CCI',
  calcParams: [20],
  figures: [
    { key: 'cci', title: 'CCI: ', type: 'line' }
  ],
  calc: (dataList, indicator) => {
    const params = indicator.calcParams
    const p = params[0] - 1
    let tpSum = 0
    const tpList: number[] = []
    return dataList.map((kLineData, i) => {
      const cci: Cci = {}
      const tp = (kLineData.high + kLineData.low + kLineData.close) / 3
      tpSum += tp
      tpList.push(tp)
      if (i >= p) {
        const maTp = tpSum / params[0]
        const sliceTpList = tpList.slice(i - p, i + 1)
        let sum = 0
        sliceTpList.forEach(tp => {
          sum += Math.abs(tp - maTp)
        })
        const md = sum / params[0]
        cci.cci = md !== 0 ? (tp - maTp) / md / 0.015 : 0
        const agoTp = (dataList[i - p].high + dataList[i - p].low + dataList[i - p].close) / 3
        tpSum -= agoTp
      }
      return cci
    })
  }
}

export default commodityChannelIndex
```

## File: extension/indicator/currentRatio.ts
```typescript
/**
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at

 * http:*www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import type { IndicatorTemplate } from '../../component/Indicator'

interface Cr {
  cr?: number
  ma1?: number
  ma2?: number
  ma3?: number
  ma4?: number
}

/**
 * MID:=REF(HIGH+LOW,1)/2;
 * CR:SUM(MAX(0,HIGH-MID),N)/SUM(MAX(0,MID-LOW),N)*100;
 * MA1:REF(MA(CR,M1),M1/2.5+1);
 * MA2:REF(MA(CR,M2),M2/2.5+1);
 * MA3:REF(MA(CR,M3),M3/2.5+1);
 * MA4:REF(MA(CR,M4),M4/2.5+1);
 * MID赋值:(昨日最高价+昨日最低价)/2
 * 输出带状能量线:0和最高价-MID的较大值的N日累和/0和MID-最低价的较大值的N日累和*100
 * 输出MA1:M1(5)/2.5+1日前的CR的M1(5)日简单移动平均
 * 输出MA2:M2(10)/2.5+1日前的CR的M2(10)日简单移动平均
 * 输出MA3:M3(20)/2.5+1日前的CR的M3(20)日简单移动平均
 * 输出MA4:M4/2.5+1日前的CR的M4日简单移动平均
 *
 */
const currentRatio: IndicatorTemplate<Cr, number> = {
  name: 'CR',
  shortName: 'CR',
  calcParams: [26, 10, 20, 40, 60],
  figures: [
    { key: 'cr', title: 'CR: ', type: 'line' },
    { key: 'ma1', title: 'MA1: ', type: 'line' },
    { key: 'ma2', title: 'MA2: ', type: 'line' },
    { key: 'ma3', title: 'MA3: ', type: 'line' },
    { key: 'ma4', title: 'MA4: ', type: 'line' }
  ],
  calc: (dataList, indicator) => {
    const params = indicator.calcParams

    const ma1ForwardPeriod = Math.ceil(params[1] / 2.5 + 1)
    const ma2ForwardPeriod = Math.ceil(params[2] / 2.5 + 1)
    const ma3ForwardPeriod = Math.ceil(params[3] / 2.5 + 1)
    const ma4ForwardPeriod = Math.ceil(params[4] / 2.5 + 1)
    let ma1Sum = 0
    const ma1List: number[] = []
    let ma2Sum = 0
    const ma2List: number[] = []
    let ma3Sum = 0
    const ma3List: number[] = []
    let ma4Sum = 0
    const ma4List: number[] = []
    const result: Cr[] = []
    dataList.forEach((kLineData, i) => {
      const cr: Cr = {}
      const prevData = dataList[i - 1] ?? kLineData
      const prevMid = (prevData.high + prevData.close + prevData.low + prevData.open) / 4

      const highSubPreMid = Math.max(0, kLineData.high - prevMid)

      const preMidSubLow = Math.max(0, prevMid - kLineData.low)

      if (i >= params[0] - 1) {
        if (preMidSubLow !== 0) {
          cr.cr = highSubPreMid / preMidSubLow * 100
        } else {
          cr.cr = 0
        }
        ma1Sum += cr.cr
        ma2Sum += cr.cr
        ma3Sum += cr.cr
        ma4Sum += cr.cr
        if (i >= params[0] + params[1] - 2) {
          ma1List.push(ma1Sum / params[1])
          if (i >= params[0] + params[1] + ma1ForwardPeriod - 3) {
            cr.ma1 = ma1List[ma1List.length - 1 - ma1ForwardPeriod]
          }
          ma1Sum -= (result[i - (params[1] - 1)].cr ?? 0)
        }
        if (i >= params[0] + params[2] - 2) {
          ma2List.push(ma2Sum / params[2])
          if (i >= params[0] + params[2] + ma2ForwardPeriod - 3) {
            cr.ma2 = ma2List[ma2List.length - 1 - ma2ForwardPeriod]
          }
          ma2Sum -= (result[i - (params[2] - 1)].cr ?? 0)
        }
        if (i >= params[0] + params[3] - 2) {
          ma3List.push(ma3Sum / params[3])
          if (i >= params[0] + params[3] + ma3ForwardPeriod - 3) {
            cr.ma3 = ma3List[ma3List.length - 1 - ma3ForwardPeriod]
          }
          ma3Sum -= (result[i - (params[3] - 1)].cr ?? 0)
        }
        if (i >= params[0] + params[4] - 2) {
          ma4List.push(ma4Sum / params[4])
          if (i >= params[0] + params[4] + ma4ForwardPeriod - 3) {
            cr.ma4 = ma4List[ma4List.length - 1 - ma4ForwardPeriod]
          }
          ma4Sum -= (result[i - (params[4] - 1)].cr ?? 0)
        }
      }
      result.push(cr)
    })
    return result
  }
}
export default currentRatio
```

## File: extension/indicator/differentOfMovingAverage.ts
```typescript
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

import type { IndicatorTemplate } from '../../component/Indicator'

interface Dma {
  dma?: number
  ama?: number
}

/**
 * DMA
 * 公式：DIF:MA(CLOSE,N1)-MA(CLOSE,N2);DIFMA:MA(DIF,M)
 */
const differentOfMovingAverage: IndicatorTemplate<Dma, number> = {
  name: 'DMA',
  shortName: 'DMA',
  calcParams: [10, 50, 10],
  figures: [
    { key: 'dma', title: 'DMA: ', type: 'line' },
    { key: 'ama', title: 'AMA: ', type: 'line' }
  ],
  calc: (dataList, indicator) => {
    const params = indicator.calcParams
    const maxPeriod = Math.max(params[0], params[1])
    let closeSum1 = 0
    let closeSum2 = 0
    let dmaSum = 0
    const result: Dma[] = []
    dataList.forEach((kLineData, i) => {
      const dma: Dma = {}
      const close = kLineData.close
      closeSum1 += close
      closeSum2 += close
      let ma1 = 0
      let ma2 = 0
      if (i >= params[0] - 1) {
        ma1 = closeSum1 / params[0]
        closeSum1 -= dataList[i - (params[0] - 1)].close
      }
      if (i >= params[1] - 1) {
        ma2 = closeSum2 / params[1]
        closeSum2 -= dataList[i - (params[1] - 1)].close
      }

      if (i >= maxPeriod - 1) {
        const dif = ma1 - ma2
        dma.dma = dif
        dmaSum += dif
        if (i >= maxPeriod + params[2] - 2) {
          dma.ama = dmaSum / params[2]
          dmaSum -= (result[i - (params[2] - 1)].dma ?? 0)
        }
      }
      result.push(dma)
    })
    return result
  }
}

export default differentOfMovingAverage
```

## File: extension/indicator/directionalMovementIndex.ts
```typescript
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

import type { IndicatorTemplate } from '../../component/Indicator'

interface Dmi {
  pdi?: number
  mdi?: number
  adx?: number
  adxr?: number
}

/**
 * DMI
 *
 * MTR:=EXPMEMA(MAX(MAX(HIGH-LOW,ABS(HIGH-REF(CLOSE,1))),ABS(REF(CLOSE,1)-LOW)),N)
 * HD :=HIGH-REF(HIGH,1);
 * LD :=REF(LOW,1)-LOW;
 * DMP:=EXPMEMA(IF(HD>0&&HD>LD,HD,0),N);
 * DMM:=EXPMEMA(IF(LD>0&&LD>HD,LD,0),N);
 *
 * PDI: DMP*100/MTR;
 * MDI: DMM*100/MTR;
 * ADX: EXPMEMA(ABS(MDI-PDI)/(MDI+PDI)*100,MM);
 * ADXR:EXPMEMA(ADX,MM);
 * 公式含义：
 * MTR赋值:最高价-最低价和最高价-昨收的绝对值的较大值和昨收-最低价的绝对值的较大值的N日指数平滑移动平均
 * HD赋值:最高价-昨日最高价
 * LD赋值:昨日最低价-最低价
 * DMP赋值:如果HD>0并且HD>LD,返回HD,否则返回0的N日指数平滑移动平均
 * DMM赋值:如果LD>0并且LD>HD,返回LD,否则返回0的N日指数平滑移动平均
 * 输出PDI:DMP*100/MTR
 * 输出MDI:DMM*100/MTR
 * 输出ADX:MDI-PDI的绝对值/(MDI+PDI)*100的MM日指数平滑移动平均
 * 输出ADXR:ADX的MM日指数平滑移动平均
 *
 */
const directionalMovementIndex: IndicatorTemplate<Dmi, number> = {
  name: 'DMI',
  shortName: 'DMI',
  calcParams: [14, 6],
  figures: [
    { key: 'pdi', title: 'PDI: ', type: 'line' },
    { key: 'mdi', title: 'MDI: ', type: 'line' },
    { key: 'adx', title: 'ADX: ', type: 'line' },
    { key: 'adxr', title: 'ADXR: ', type: 'line' }
  ],
  calc: (dataList, indicator) => {
    const params = indicator.calcParams
    let trSum = 0
    let hSum = 0
    let lSum = 0
    let mtr = 0
    let dmp = 0
    let dmm = 0
    let dxSum = 0
    let adx = 0
    const result: Dmi[] = []
    dataList.forEach((kLineData, i) => {
      const dmi: Dmi = {}
      const prevKLineData = dataList[i - 1] ?? kLineData
      const preClose = prevKLineData.close
      const high = kLineData.high
      const low = kLineData.low
      const hl = high - low
      const hcy = Math.abs(high - preClose)
      const lcy = Math.abs(preClose - low)
      const hhy = high - prevKLineData.high
      const lyl = prevKLineData.low - low
      const tr = Math.max(Math.max(hl, hcy), lcy)
      const h = (hhy > 0 && hhy > lyl) ? hhy : 0
      const l = (lyl > 0 && lyl > hhy) ? lyl : 0
      trSum += tr
      hSum += h
      lSum += l
      if (i >= params[0] - 1) {
        if (i > params[0] - 1) {
          mtr = mtr - mtr / params[0] + tr
          dmp = dmp - dmp / params[0] + h
          dmm = dmm - dmm / params[0] + l
        } else {
          mtr = trSum
          dmp = hSum
          dmm = lSum
        }
        let pdi = 0
        let mdi = 0
        if (mtr !== 0) {
          pdi = dmp * 100 / mtr
          mdi = dmm * 100 / mtr
        }
        dmi.pdi = pdi
        dmi.mdi = mdi
        let dx = 0
        if (mdi + pdi !== 0) {
          dx = Math.abs((mdi - pdi)) / (mdi + pdi) * 100
        }
        dxSum += dx
        if (i >= params[0] * 2 - 2) {
          if (i > params[0] * 2 - 2) {
            adx = (adx * (params[0] - 1) + dx) / params[0]
          } else {
            adx = dxSum / params[0]
          }
          dmi.adx = adx
          if (i >= params[0] * 2 + params[1] - 3) {
            dmi.adxr = ((result[i - (params[1] - 1)].adx ?? 0) + adx) / 2
          }
        }
      }
      result.push(dmi)
    })
    return result
  }
}

export default directionalMovementIndex
```

## File: extension/indicator/easeOfMovementValue.ts
```typescript
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

import type { IndicatorTemplate } from '../../component/Indicator'

interface Emv {
  emv?: number
  maEmv?: number
}

/**
 *
 * EMV 简易波动指标
 * 公式：
 * A=（今日最高+今日最低）/2
 * B=（前日最高+前日最低）/2
 * C=今日最高-今日最低
 * EM=（A-B）*C/今日成交额
 * EMV=N日内EM的累和
 * MAEMV=EMV的M日的简单移动平均
 *
 */
const easeOfMovementValue: IndicatorTemplate<Emv, number> = {
  name: 'EMV',
  shortName: 'EMV',
  calcParams: [14, 9],
  figures: [
    { key: 'emv', title: 'EMV: ', type: 'line' },
    { key: 'maEmv', title: 'MAEMV: ', type: 'line' }
  ],
  calc: (dataList, indicator) => {
    const params = indicator.calcParams
    let emvValueSum = 0
    const emvValueList: number[] = []
    return dataList.map((kLineData, i) => {
      const emv: Emv = {}
      if (i > 0) {
        const prevKLineData = dataList[i - 1]
        const high = kLineData.high
        const low = kLineData.low
        const volume = kLineData.volume ?? 0
        const distanceMoved = (high + low) / 2 - (prevKLineData.high + prevKLineData.low) / 2

        if (volume === 0 || high - low === 0) {
          emv.emv = 0
        } else {
          const ratio = volume / 100000000 / (high - low)
          emv.emv = distanceMoved / ratio
        }
        emvValueSum += emv.emv
        emvValueList.push(emv.emv)
        if (i >= params[0]) {
          emv.maEmv = emvValueSum / params[0]
          emvValueSum -= emvValueList[i - params[0]]
        }
      }
      return emv
    })
  }
}

export default easeOfMovementValue
```

## File: extension/indicator/exponentialMovingAverage.ts
```typescript
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

import type { IndicatorTemplate } from '../../component/Indicator'

interface Ema {
  ema1?: number
  ema2?: number
  ema3?: number
}

/**
 * EMA 指数移动平均
 */
const exponentialMovingAverage: IndicatorTemplate<Ema, number> = {
  name: 'EMA',
  shortName: 'EMA',
  series: 'price',
  calcParams: [6, 12, 20],
  precision: 2,
  shouldOhlc: true,
  figures: [
    { key: 'ema1', title: 'EMA6: ', type: 'line' },
    { key: 'ema2', title: 'EMA12: ', type: 'line' },
    { key: 'ema3', title: 'EMA20: ', type: 'line' }
  ],
  regenerateFigures: (params) => params.map((p, i) => ({ key: `ema${i + 1}`, title: `EMA${p}: `, type: 'line' })),
  calc: (dataList, indicator) => {
    const { calcParams: params, figures } = indicator
    let closeSum = 0
    const emaValues: number[] = []
    return dataList.map((kLineData, i) => {
      const ema = {}
      const close = kLineData.close
      closeSum += close
      params.forEach((p, index) => {
        if (i >= p - 1) {
          if (i > p - 1) {
            emaValues[index] = (2 * close + (p - 1) * emaValues[index]) / (p + 1)
          } else {
            emaValues[index] = closeSum / p
          }
          ema[figures[index].key] = emaValues[index]
        }
      })
      return ema
    })
  }
}

export default exponentialMovingAverage
```

## File: extension/indicator/index.ts
```typescript
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

import type Nullable from '../../common/Nullable'

import IndicatorImp, { type IndicatorTemplate, type IndicatorConstructor } from '../../component/Indicator'

import averagePrice from './averagePrice'
import awesomeOscillator from './awesomeOscillator'
import bias from './bias'
import bollingerBands from './bollingerBands'
import brar from './brar'
import bullAndBearIndex from './bullAndBearIndex'
import commodityChannelIndex from './commodityChannelIndex'
import currentRatio from './currentRatio'
import differentOfMovingAverage from './differentOfMovingAverage'
import directionalMovementIndex from './directionalMovementIndex'
import easeOfMovementValue from './easeOfMovementValue'
import exponentialMovingAverage from './exponentialMovingAverage'
import momentum from './momentum'
import movingAverage from './movingAverage'
import movingAverageConvergenceDivergence from './movingAverageConvergenceDivergence'
import onBalanceVolume from './onBalanceVolume'
import priceAndVolumeTrend from './priceAndVolumeTrend'
import psychologicalLine from './psychologicalLine'
import rateOfChange from './rateOfChange'
import relativeStrengthIndex from './relativeStrengthIndex'
import simpleMovingAverage from './simpleMovingAverage'
import stoch from './stoch'
import stopAndReverse from './stopAndReverse'
import tripleExponentiallySmoothedAverage from './tripleExponentiallySmoothedAverage'
import volume from './volume'
import volumeRatio from './volumeRatio'
import williamsR from './williamsR'

const indicators: Record<string, IndicatorConstructor> = {}

const extensions = [
  averagePrice, awesomeOscillator, bias, bollingerBands, brar,
  bullAndBearIndex, commodityChannelIndex, currentRatio, differentOfMovingAverage,
  directionalMovementIndex, easeOfMovementValue, exponentialMovingAverage, momentum,
  movingAverage, movingAverageConvergenceDivergence, onBalanceVolume, priceAndVolumeTrend,
  psychologicalLine, rateOfChange, relativeStrengthIndex, simpleMovingAverage,
  stoch, stopAndReverse, tripleExponentiallySmoothedAverage, volume, volumeRatio, williamsR
]

extensions.forEach((indicator: IndicatorTemplate) => {
  indicators[indicator.name] = IndicatorImp.extend(indicator)
})

function registerIndicator<D = unknown, C = unknown, E = unknown> (indicator: IndicatorTemplate<D, C, E>): void {
  indicators[indicator.name] = IndicatorImp.extend(indicator)
}

function getIndicatorClass (name: string): Nullable<IndicatorConstructor> {
  return indicators[name] ?? null
}

function getSupportedIndicators (): string[] {
  return Object.keys(indicators)
}

export { registerIndicator, getIndicatorClass, getSupportedIndicators }
```

## File: extension/indicator/momentum.ts
```typescript
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

import type { IndicatorTemplate } from '../../component/Indicator'

interface Mtm {
  mtm?: number
  maMtm?: number
}

/**
 * mtm
 * 公式 MTM（N日）=C－CN
 */
const momentum: IndicatorTemplate<Mtm, number> = {
  name: 'MTM',
  shortName: 'MTM',
  calcParams: [12, 6],
  figures: [
    { key: 'mtm', title: 'MTM: ', type: 'line' },
    { key: 'maMtm', title: 'MAMTM: ', type: 'line' }
  ],
  calc: (dataList, indicator) => {
    const params = indicator.calcParams
    let mtmSum = 0
    const result: Mtm[] = []
    dataList.forEach((kLineData, i) => {
      const mtm: Mtm = {}
      if (i >= params[0]) {
        const close = kLineData.close
        const agoClose = dataList[i - params[0]].close
        mtm.mtm = close - agoClose
        mtmSum += mtm.mtm
        if (i >= params[0] + params[1] - 1) {
          mtm.maMtm = mtmSum / params[1]
          mtmSum -= (result[i - (params[1] - 1)].mtm ?? 0)
        }
      }
      result.push(mtm)
    })
    return result
  }
}

export default momentum
```

## File: extension/indicator/movingAverage.ts
```typescript
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

import type { IndicatorTemplate } from '../../component/Indicator'

interface Ma {
  ma1?: number
  ma2?: number
  ma3?: number
  ma4?: number
}

/**
 * MA 移动平均
 */
const movingAverage: IndicatorTemplate<Ma, number> = {
  name: 'MA',
  shortName: 'MA',
  series: 'price',
  calcParams: [5, 10, 30, 60],
  precision: 2,
  shouldOhlc: true,
  figures: [
    { key: 'ma1', title: 'MA5: ', type: 'line' },
    { key: 'ma2', title: 'MA10: ', type: 'line' },
    { key: 'ma3', title: 'MA30: ', type: 'line' },
    { key: 'ma4', title: 'MA60: ', type: 'line' }
  ],
  regenerateFigures: (params) => params.map((p, i) => ({ key: `ma${i + 1}`, title: `MA${p}: `, type: 'line' })),
  calc: (dataList, indicator) => {
    const { calcParams: params, figures } = indicator
    const closeSums: number[] = []
    return dataList.map((kLineData, i) => {
      const ma = {}
      const close = kLineData.close
      params.forEach((p, index) => {
        closeSums[index] = (closeSums[index] ?? 0) + close
        if (i >= p - 1) {
          ma[figures[index].key] = closeSums[index] / p
          closeSums[index] -= dataList[i - (p - 1)].close
        }
      })
      return ma
    })
  }
}

export default movingAverage
```

## File: extension/indicator/movingAverageConvergenceDivergence.ts
```typescript
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

import { formatValue } from '../../common/utils/format'

import type { IndicatorTemplate } from '../../component/Indicator'

interface Macd {
  dif?: number
  dea?: number
  macd?: number
}

/**
 * MACD：参数快线移动平均、慢线移动平均、移动平均，
 * 默认参数值12、26、9。
 * 公式：⒈首先分别计算出收盘价12日指数平滑移动平均线与26日指数平滑移动平均线，分别记为EMA(12）与EMA(26）。
 * ⒉求这两条指数平滑移动平均线的差，即：DIFF = EMA(SHORT) － EMA(LONG)。
 * ⒊再计算DIFF的M日的平均的指数平滑移动平均线，记为DEA。
 * ⒋最后用DIFF减DEA，得MACD。MACD通常绘制成围绕零轴线波动的柱形图。MACD柱状大于0涨颜色，小于0跌颜色。
 */
const movingAverageConvergenceDivergence: IndicatorTemplate<Macd, number> = {
  name: 'MACD',
  shortName: 'MACD',
  calcParams: [12, 26, 9],
  figures: [
    { key: 'dif', title: 'DIF: ', type: 'line' },
    { key: 'dea', title: 'DEA: ', type: 'line' },
    {
      key: 'macd',
      title: 'MACD: ',
      type: 'bar',
      baseValue: 0,
      styles: ({ data, indicator, defaultStyles }) => {
        const { prev, current } = data
        const prevMacd = prev?.macd ?? Number.MIN_SAFE_INTEGER
        const currentMacd = current?.macd ?? Number.MIN_SAFE_INTEGER
        let color = ''
        if (currentMacd > 0) {
          color = formatValue(indicator.styles, 'bars[0].upColor', (defaultStyles!.bars)[0].upColor) as string
        } else if (currentMacd < 0) {
          color = formatValue(indicator.styles, 'bars[0].downColor', (defaultStyles!.bars)[0].downColor) as string
        } else {
          color = formatValue(indicator.styles, 'bars[0].noChangeColor', (defaultStyles!.bars)[0].noChangeColor) as string
        }
        const style = prevMacd < currentMacd ? 'stroke' : 'fill'
        return { style, color, borderColor: color }
      }
    }
  ],
  calc: (dataList, indicator) => {
    const params = indicator.calcParams
    let closeSum = 0
    let emaShort = 0
    let emaLong = 0
    let dif = 0
    let difSum = 0
    let dea = 0
    const maxPeriod = Math.max(params[0], params[1])
    return dataList.map((kLineData, i) => {
      const macd: Macd = {}
      const close = kLineData.close
      closeSum += close
      if (i >= params[0] - 1) {
        if (i > params[0] - 1) {
          emaShort = (2 * close + (params[0] - 1) * emaShort) / (params[0] + 1)
        } else {
          emaShort = closeSum / params[0]
        }
      }
      if (i >= params[1] - 1) {
        if (i > params[1] - 1) {
          emaLong = (2 * close + (params[1] - 1) * emaLong) / (params[1] + 1)
        } else {
          emaLong = closeSum / params[1]
        }
      }
      if (i >= maxPeriod - 1) {
        dif = emaShort - emaLong
        macd.dif = dif
        difSum += dif
        if (i >= maxPeriod + params[2] - 2) {
          if (i > maxPeriod + params[2] - 2) {
            dea = (dif * 2 + dea * (params[2] - 1)) / (params[2] + 1)
          } else {
            dea = difSum / params[2]
          }
          macd.macd = (dif - dea) * 2
          macd.dea = dea
        }
      }
      return macd
    })
  }
}

export default movingAverageConvergenceDivergence
```

## File: extension/indicator/onBalanceVolume.ts
```typescript
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

import type { IndicatorTemplate } from '../../component/Indicator'

interface Obv {
  obv?: number
  maObv?: number
}

/**
 * OBV
 * OBV = REF(OBV) + sign * V
 */
const onBalanceVolume: IndicatorTemplate<Obv, number> = {
  name: 'OBV',
  shortName: 'OBV',
  calcParams: [30],
  figures: [
    { key: 'obv', title: 'OBV: ', type: 'line' },
    { key: 'maObv', title: 'MAOBV: ', type: 'line' }
  ],
  calc: (dataList, indicator) => {
    const params = indicator.calcParams
    let obvSum = 0
    let oldObv = 0
    const result: Obv[] = []
    dataList.forEach((kLineData, i) => {
      const prevKLineData = dataList[i - 1] ?? kLineData
      if (kLineData.close < prevKLineData.close) {
        oldObv -= (kLineData.volume ?? 0)
      } else if (kLineData.close > prevKLineData.close) {
        oldObv += (kLineData.volume ?? 0)
      }
      const obv: Obv = { obv: oldObv }
      obvSum += oldObv
      if (i >= params[0] - 1) {
        obv.maObv = obvSum / params[0]
        obvSum -= (result[i - (params[0] - 1)].obv ?? 0)
      }
      result.push(obv)
    })
    return result
  }
}

export default onBalanceVolume
```

## File: extension/indicator/priceAndVolumeTrend.ts
```typescript
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

import type { IndicatorTemplate } from '../../component/Indicator'

interface Pvt {
  pvt?: number
}

/**
 * 价量趋势指标
 * 公式:
 * X = (CLOSE - REF(CLOSE, 1)) / REF(CLOSE, 1) * VOLUME
 * PVT = SUM(X)
 *
 */
const priceAndVolumeTrend: IndicatorTemplate<Pvt> = {
  name: 'PVT',
  shortName: 'PVT',
  figures: [
    { key: 'pvt', title: 'PVT: ', type: 'line' }
  ],
  calc: (dataList) => {
    let sum = 0
    return dataList.map((kLineData, i) => {
      const pvt: Pvt = {}
      const close = kLineData.close
      const volume = kLineData.volume ?? 1
      const prevClose = (dataList[i - 1] ?? kLineData).close
      let x = 0
      const total = prevClose * volume
      if (total !== 0) {
        x = (close - prevClose) / total
      }
      sum += x
      pvt.pvt = sum
      return pvt
    })
  }
}

export default priceAndVolumeTrend
```

## File: extension/indicator/psychologicalLine.ts
```typescript
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

import type { IndicatorTemplate } from '../../component/Indicator'

interface Psy {
  psy?: number
  maPsy?: number
}

/**
 * PSY
 * 公式：PSY=N日内的上涨天数/N×100%。
 */
const psychologicalLine: IndicatorTemplate<Psy, number> = {
  name: 'PSY',
  shortName: 'PSY',
  calcParams: [12, 6],
  figures: [
    { key: 'psy', title: 'PSY: ', type: 'line' },
    { key: 'maPsy', title: 'MAPSY: ', type: 'line' }
  ],
  calc: (dataList, indicator) => {
    const params = indicator.calcParams
    let upCount = 0
    let psySum = 0
    const upList: number[] = []
    const result: Psy[] = []
    dataList.forEach((kLineData, i) => {
      const psy: Psy = {}
      const prevClose = (dataList[i - 1] ?? kLineData).close
      const upFlag = kLineData.close - prevClose > 0 ? 1 : 0
      upList.push(upFlag)
      upCount += upFlag
      if (i >= params[0] - 1) {
        psy.psy = upCount / params[0] * 100
        psySum += psy.psy
        if (i >= params[0] + params[1] - 2) {
          psy.maPsy = psySum / params[1]
          psySum -= (result[i - (params[1] - 1)].psy ?? 0)
        }
        upCount -= upList[i - (params[0] - 1)]
      }
      result.push(psy)
    })
    return result
  }
}

export default psychologicalLine
```

## File: extension/indicator/rateOfChange.ts
```typescript
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

import type { IndicatorTemplate } from '../../component/Indicator'

interface Roc {
  roc?: number
  maRoc?: number
}

/**
 * 变动率指标
 * 公式：ROC = (CLOSE - REF(CLOSE, N)) / REF(CLOSE, N)
 */
const rateOfChange: IndicatorTemplate<Roc, number> = {
  name: 'ROC',
  shortName: 'ROC',
  calcParams: [12, 6],
  figures: [
    { key: 'roc', title: 'ROC: ', type: 'line' },
    { key: 'maRoc', title: 'MAROC: ', type: 'line' }
  ],
  calc: (dataList, indicator) => {
    const params = indicator.calcParams
    const result: Roc[] = []
    let rocSum = 0
    dataList.forEach((kLineData, i) => {
      const roc: Roc = {}
      if (i >= params[0] - 1) {
        const close = kLineData.close
        const agoClose = (dataList[i - params[0]] ?? dataList[i - (params[0] - 1)]).close
        if (agoClose !== 0) {
          roc.roc = (close - agoClose) / agoClose * 100
        } else {
          roc.roc = 0
        }
        rocSum += roc.roc
        if (i >= params[0] - 1 + params[1] - 1) {
          roc.maRoc = rocSum / params[1]
          rocSum -= (result[i - (params[1] - 1)].roc ?? 0)
        }
      }
      result.push(roc)
    })
    return result
  }
}

export default rateOfChange
```

## File: extension/indicator/relativeStrengthIndex.ts
```typescript
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

import type { IndicatorTemplate } from '../../component/Indicator'

interface Rsi {
  rsi1?: number
  rsi2?: number
  rsi3?: number
}

/**
 * RSI
 * RSI = 100 - 100 / (1 + RMA(MAX(CHANGE(CLOSE), 0), N) / RMA(MAX(-CHANGE(CLOSE), 0), N))
 */
const relativeStrengthIndex: IndicatorTemplate<Rsi, number> = {
  name: 'RSI',
  shortName: 'RSI',
  calcParams: [6, 12, 24],
  figures: [
    { key: 'rsi1', title: 'RSI1: ', type: 'line' },
    { key: 'rsi2', title: 'RSI2: ', type: 'line' },
    { key: 'rsi3', title: 'RSI3: ', type: 'line' }
  ],
  regenerateFigures: (params) => params.map((_, index) => {
    const num = index + 1
    return { key: `rsi${num}`, title: `RSI${num}: `, type: 'line' }
  }),
  calc: (dataList, indicator) => {
    const { calcParams: params, figures } = indicator
    const gainSums: number[] = []
    const lossSums: number[] = []
    const avgGains: Array<number | undefined> = []
    const avgLosses: Array<number | undefined> = []
    return dataList.map((kLineData, i) => {
      const rsi: Record<string, number> = {}
      const change = i === 0 ? 0 : kLineData.close - dataList[i - 1].close
      const gain = Math.max(change, 0)
      const loss = Math.max(-change, 0)
      params.forEach((p, index) => {
        gainSums[index] = (gainSums[index] ?? 0) + gain
        lossSums[index] = (lossSums[index] ?? 0) + loss

        if (i < p) {
          return
        }

        if (avgGains[index] === undefined || avgLosses[index] === undefined) {
          avgGains[index] = gainSums[index] / p
          avgLosses[index] = lossSums[index] / p
        } else {
          avgGains[index] = (avgGains[index] * (p - 1) + gain) / p
          avgLosses[index] = (avgLosses[index] * (p - 1) + loss) / p
        }

        if (avgLosses[index] === 0) {
          rsi[figures[index].key] = 100
        } else if (avgGains[index] === 0) {
          rsi[figures[index].key] = 0
        } else {
          rsi[figures[index].key] = 100 - (100 / (1 + avgGains[index] / avgLosses[index]))
        }
      })
      return rsi
    })
  }
}

export default relativeStrengthIndex
```

## File: extension/indicator/simpleMovingAverage.ts
```typescript
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

import type { IndicatorTemplate } from '../../component/Indicator'

interface Sma {
  sma?: number
}

/**
 * sma
 */
const simpleMovingAverage: IndicatorTemplate<Sma, number> = {
  name: 'SMA',
  shortName: 'SMA',
  series: 'price',
  calcParams: [12, 2],
  precision: 2,
  figures: [
    { key: 'sma', title: 'SMA: ', type: 'line' }
  ],
  shouldOhlc: true,
  calc: (dataList, indicator) => {
    const params = indicator.calcParams
    let closeSum = 0
    let smaValue = 0
    return dataList.map((kLineData, i) => {
      const sma: Sma = {}
      const close = kLineData.close
      closeSum += close
      if (i >= params[0] - 1) {
        if (i > params[0] - 1) {
          smaValue = (close * params[1] + smaValue * (params[0] - params[1] + 1)) / (params[0] + 1)
        } else {
          smaValue = closeSum / params[0]
        }
        sma.sma = smaValue
      }
      return sma
    })
  }
}

export default simpleMovingAverage
```

## File: extension/indicator/stoch.ts
```typescript
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

import type { KLineData } from '../../common/Data'
import type { IndicatorTemplate } from '../../component/Indicator'

import { getMaxMin } from '../../common/utils/number'

interface Kdj {
  k?: number
  d?: number
  j?: number
}

/**
 * KDJ
 *
 * 当日K值=2/3×前一日K值+1/3×当日RSV
 * 当日D值=2/3×前一日D值+1/3×当日K值
 * 若无前一日K 值与D值，则可分别用50来代替。
 * J值=3*当日K值-2*当日D值
 */
const stoch: IndicatorTemplate<Kdj, number> = {
  name: 'KDJ',
  shortName: 'KDJ',
  calcParams: [9, 3, 3],
  figures: [
    { key: 'k', title: 'K: ', type: 'line' },
    { key: 'd', title: 'D: ', type: 'line' },
    { key: 'j', title: 'J: ', type: 'line' }
  ],
  calc: (dataList, indicator) => {
    const params = indicator.calcParams
    const result: Kdj[] = []
    dataList.forEach((kLineData, i) => {
      const kdj: Kdj = {}
      const close = kLineData.close
      if (i >= params[0] - 1) {
        const lhn = getMaxMin<KLineData>(dataList.slice(i - (params[0] - 1), i + 1), 'high', 'low')
        const hn = lhn[0]
        const ln = lhn[1]
        const hnSubLn = hn - ln
        const rsv = (close - ln) / (hnSubLn === 0 ? 1 : hnSubLn) * 100
        kdj.k = ((params[1] - 1) * (result[i - 1]?.k ?? 50) + rsv) / params[1]
        kdj.d = ((params[2] - 1) * (result[i - 1]?.d ?? 50) + kdj.k) / params[2]
        kdj.j = 3.0 * kdj.k - 2.0 * kdj.d
      }
      result.push(kdj)
    })
    return result
  }
}

export default stoch
```

## File: extension/indicator/stopAndReverse.ts
```typescript
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

import { formatValue } from '../../common/utils/format'

import type { IndicatorTemplate } from '../../component/Indicator'

interface Sar {
  sar?: number
  high: number
  low: number
}

const stopAndReverse: IndicatorTemplate<Sar, number> = {
  name: 'SAR',
  shortName: 'SAR',
  series: 'price',
  calcParams: [2, 2, 20],
  precision: 2,
  shouldOhlc: true,
  figures: [
    {
      key: 'sar',
      title: 'SAR: ',
      type: 'circle',
      styles: ({ data, indicator, defaultStyles }) => {
        const { current } = data
        const sar = current?.sar ?? Number.MIN_SAFE_INTEGER
        const halfHL = ((current?.high ?? 0) + (current?.low ?? 0)) / 2
        const color = sar < halfHL
          ? formatValue(indicator.styles, 'circles[0].upColor', (defaultStyles!.circles)[0].upColor) as string
          : formatValue(indicator.styles, 'circles[0].downColor', (defaultStyles!.circles)[0].downColor) as string
        return { color }
      }
    }
  ],
  calc: (dataList, indicator) => {
    const params = indicator.calcParams
    const startAf = params[0] / 100
    const step = params[1] / 100
    const maxAf = params[2] / 100

    // 加速因子
    let af = startAf
    // 极值
    let ep = -100
    // 判断是上涨还是下跌  false：下跌
    let isIncreasing = false
    let sar = 0
    return dataList.map((kLineData, i) => {
      // 上一个周期的sar
      const preSar = sar
      const high = kLineData.high
      const low = kLineData.low
      if (isIncreasing) {
        // 上涨
        if (ep === -100 || ep < high) {
          // 重新初始化值
          ep = high
          af = Math.min(af + step, maxAf)
        }
        sar = preSar + af * (ep - preSar)
        const lowMin = Math.min(dataList[Math.max(1, i) - 1].low, low)
        if (sar > kLineData.low) {
          sar = ep
          // 重新初始化值
          af = startAf
          ep = -100
          isIncreasing = !isIncreasing
        } else if (sar > lowMin) {
          sar = lowMin
        }
      } else {
        if (ep === -100 || ep > low) {
          // 重新初始化值
          ep = low
          af = Math.min(af + step, maxAf)
        }
        sar = preSar + af * (ep - preSar)
        const highMax = Math.max(dataList[Math.max(1, i) - 1].high, high)
        if (sar < kLineData.high) {
          sar = ep
          // 重新初始化值
          af = 0
          ep = -100
          isIncreasing = !isIncreasing
        } else if (sar < highMax) {
          sar = highMax
        }
      }
      return { high, low, sar }
    })
  }
}

export default stopAndReverse
```

## File: extension/indicator/tripleExponentiallySmoothedAverage.ts
```typescript
/**
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at

 * http:*www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import type { IndicatorTemplate } from '../../component/Indicator'

interface Trix {
  trix?: number
  maTrix?: number
}

/**
 * trix
 *
 * TR=收盘价的N日指数移动平均的N日指数移动平均的N日指数移动平均；
 * TRIX=(TR-昨日TR)/昨日TR*100；
 * MATRIX=TRIX的M日简单移动平均；
 * 默认参数N设为12，默认参数M设为9；
 * 默认参数12、9
 * 公式：MTR:=EMA(EMA(EMA(CLOSE,N),N),N)
 * TRIX:(MTR-REF(MTR,1))/REF(MTR,1)*100;
 * TRMA:MA(TRIX,M)
 *
 */
const tripleExponentiallySmoothedAverage: IndicatorTemplate<Trix, number> = {
  name: 'TRIX',
  shortName: 'TRIX',
  calcParams: [12, 9],
  figures: [
    { key: 'trix', title: 'TRIX: ', type: 'line' },
    { key: 'maTrix', title: 'MATRIX: ', type: 'line' }
  ],
  calc: (dataList, indicator) => {
    const params = indicator.calcParams
    let closeSum = 0
    let ema1 = 0
    let ema2 = 0
    let oldTr = 0
    let ema1Sum = 0
    let ema2Sum = 0
    let trixSum = 0
    const result: Trix[] = []
    dataList.forEach((kLineData, i) => {
      const trix: Trix = {}
      const close = kLineData.close
      closeSum += close
      if (i >= params[0] - 1) {
        if (i > params[0] - 1) {
          ema1 = (2 * close + (params[0] - 1) * ema1) / (params[0] + 1)
        } else {
          ema1 = closeSum / params[0]
        }
        ema1Sum += ema1
        if (i >= params[0] * 2 - 2) {
          if (i > params[0] * 2 - 2) {
            ema2 = (2 * ema1 + (params[0] - 1) * ema2) / (params[0] + 1)
          } else {
            ema2 = ema1Sum / params[0]
          }
          ema2Sum += ema2
          if (i >= params[0] * 3 - 3) {
            let tr = 0
            let trixValue = 0
            if (i > params[0] * 3 - 3) {
              tr = (2 * ema2 + (params[0] - 1) * oldTr) / (params[0] + 1)
              trixValue = (tr - oldTr) / oldTr * 100
            } else {
              tr = ema2Sum / params[0]
            }
            oldTr = tr
            trix.trix = trixValue
            trixSum += trixValue
            if (i >= params[0] * 3 + params[1] - 4) {
              trix.maTrix = trixSum / params[1]
              trixSum -= (result[i - (params[1] - 1)].trix ?? 0)
            }
          }
        }
      }
      result.push(trix)
    })
    return result
  }
}

export default tripleExponentiallySmoothedAverage
```

## File: extension/indicator/volume.ts
```typescript
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

import { formatValue } from '../../common/utils/format'
import { isValid } from '../../common/utils/typeChecks'

import type { IndicatorTemplate, IndicatorFigure } from '../../component/Indicator'

interface Vol {
  open: number
  close: number
  volume?: number
  ma1?: number
  ma2?: number
  ma3?: number
}

function getVolumeFigure (): IndicatorFigure<Vol> {
  return {
    key: 'volume',
    title: 'VOLUME: ',
    type: 'bar',
    baseValue: 0,
    styles: ({ data, indicator, defaultStyles }) => {
      const current = data.current
      let color = formatValue(indicator.styles, 'bars[0].noChangeColor', (defaultStyles!.bars)[0].noChangeColor)
      if (isValid(current)) {
        if (current.close > current.open) {
          color = formatValue(indicator.styles, 'bars[0].upColor', (defaultStyles!.bars)[0].upColor)
        } else if (current.close < current.open) {
          color = formatValue(indicator.styles, 'bars[0].downColor', (defaultStyles!.bars)[0].downColor)
        }
      }
      return { color: color as string }
    }
  }
}

const volume: IndicatorTemplate<Vol, number> = {
  name: 'VOL',
  shortName: 'VOL',
  series: 'volume',
  calcParams: [5, 10, 20],
  shouldFormatBigNumber: true,
  precision: 0,
  minValue: 0,
  figures: [
    { key: 'ma1', title: 'MA5: ', type: 'line' },
    { key: 'ma2', title: 'MA10: ', type: 'line' },
    { key: 'ma3', title: 'MA20: ', type: 'line' },
    getVolumeFigure()
  ],
  regenerateFigures: (params) => {
    const figures: Array<IndicatorFigure<Vol>> = params.map((p, i) => ({ key: `ma${i + 1}`, title: `MA${p}: `, type: 'line' }))
    figures.push(getVolumeFigure())
    return figures
  },
  calc: (dataList, indicator) => {
    const { calcParams: params, figures } = indicator
    const volSums: number[] = []
    return dataList.map((kLineData, i) => {
      const volume = kLineData.volume ?? 0
      const vol: Vol = { volume, open: kLineData.open, close: kLineData.close }
      params.forEach((p, index) => {
        volSums[index] = (volSums[index] ?? 0) + volume
        if (i >= p - 1) {
          vol[figures[index].key] = volSums[index] / p
          volSums[index] -= (dataList[i - (p - 1)].volume ?? 0)
        }
      })
      return vol
    })
  }
}

export default volume
```

## File: extension/indicator/volumeRatio.ts
```typescript
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

import type { IndicatorTemplate } from '../../component/Indicator'

interface Vr {
  vr?: number
  maVr?: number
}

/**
 * VR
 * VR=（UVS+1/2PVS）/（DVS+1/2PVS）
 * 24天以来凡是股价上涨那一天的成交量都称为AV，将24天内的AV总和相加后称为UVS
 * 24天以来凡是股价下跌那一天的成交量都称为BV，将24天内的BV总和相加后称为DVS
 * 24天以来凡是股价不涨不跌，则那一天的成交量都称为CV，将24天内的CV总和相加后称为PVS
 *
 */
const volumeRatio: IndicatorTemplate<Vr, number> = {
  name: 'VR',
  shortName: 'VR',
  calcParams: [26, 6],
  figures: [
    { key: 'vr', title: 'VR: ', type: 'line' },
    { key: 'maVr', title: 'MAVR: ', type: 'line' }
  ],
  calc: (dataList, indicator) => {
    const params = indicator.calcParams
    let uvs = 0
    let dvs = 0
    let pvs = 0
    let vrSum = 0
    const result: Vr[] = []
    dataList.forEach((kLineData, i) => {
      const vr: Vr = {}
      const close = kLineData.close
      const preClose = (dataList[i - 1] ?? kLineData).close
      const volume = kLineData.volume ?? 0
      if (close > preClose) {
        uvs += volume
      } else if (close < preClose) {
        dvs += volume
      } else {
        pvs += volume
      }
      if (i >= params[0] - 1) {
        const halfPvs = pvs / 2
        if (dvs + halfPvs === 0) {
          vr.vr = 0
        } else {
          vr.vr = (uvs + halfPvs) / (dvs + halfPvs) * 100
        }
        vrSum += vr.vr
        if (i >= params[0] + params[1] - 2) {
          vr.maVr = vrSum / params[1]
          vrSum -= (result[i - (params[1] - 1)].vr ?? 0)
        }

        const agoData = dataList[i - (params[0] - 1)]
        const agoPreData = dataList[i - params[0]] ?? agoData
        const agoClose = agoData.close
        const agoVolume = agoData.volume ?? 0
        if (agoClose > agoPreData.close) {
          uvs -= agoVolume
        } else if (agoClose < agoPreData.close) {
          dvs -= agoVolume
        } else {
          pvs -= agoVolume
        }
      }
      result.push(vr)
    })
    return result
  }
}

export default volumeRatio
```

## File: extension/indicator/williamsR.ts
```typescript
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

import type { KLineData } from '../../common/Data'
import type { IndicatorTemplate } from '../../component/Indicator'

import { getMaxMin } from '../../common/utils/number'

interface Wr {
  wr1?: number
  wr2?: number
  wr3?: number
}

/**
 * WR
 * 公式 WR(N) = 100 * [ C - HIGH(N) ] / [ HIGH(N)-LOW(N) ]
 */
const williamsR: IndicatorTemplate<Wr, number> = {
  name: 'WR',
  shortName: 'WR',
  calcParams: [6, 10, 14],
  figures: [
    { key: 'wr1', title: 'WR1: ', type: 'line' },
    { key: 'wr2', title: 'WR2: ', type: 'line' },
    { key: 'wr3', title: 'WR3: ', type: 'line' }
  ],
  regenerateFigures: (params) => params.map((_, i) => ({ key: `wr${i + 1}`, title: `WR${i + 1}: `, type: 'line' })),
  calc: (dataList, indicator) => {
    const { calcParams: params, figures } = indicator
    return dataList.map((kLineData, i) => {
      const wr: Wr = {}
      const close = kLineData.close
      params.forEach((param, index) => {
        const p = param - 1
        if (i >= p) {
          const hln = getMaxMin<KLineData>(dataList.slice(i - p, i + 1), 'high', 'low')
          const hn = hln[0]
          const ln = hln[1]
          const hnSubLn = hn - ln
          wr[figures[index].key] = hnSubLn === 0 ? 0 : (close - hn) / hnSubLn * 100
        }
      })
      return wr
    })
  }
}

export default williamsR
```

## File: extension/overlay/brush.ts
```typescript
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

import type { OverlayTemplate } from '../../component/Overlay'

/**
 * brush overlay - freehand drawing with click and drag
 * Uses continuous drawing mode for smooth path creation
 */
const brush: OverlayTemplate = {
  name: 'brush',
  totalStep: 2,
  drawingMode: 'continuous',
  needDefaultPointFigure: false,
  needDefaultXAxisFigure: false,
  needDefaultYAxisFigure: false,
  createPointFigures: ({ coordinates }) => {
    if (coordinates.length < 2) {
      return []
    }
    return [
      {
        type: 'line',
        attrs: { coordinates },
        styles: {
          smooth: false,
          lineCap: 'round',
          lineJoin: 'round'
        }
      }
    ]
  }
}

export default brush
```

## File: extension/overlay/fibonacciLine.ts
```typescript
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

import { isNumber } from '../../common/utils/typeChecks'
import { SymbolDefaultPrecisionConstants } from '../../common/SymbolInfo'

import type { OverlayTemplate } from '../../component/Overlay'

import type { LineAttrs } from '../figure/line'
import type { TextAttrs } from '../figure/text'

const fibonacciLine: OverlayTemplate = {
  name: 'fibonacciLine',
  totalStep: 3,
  needDefaultPointFigure: true,
  needDefaultXAxisFigure: true,
  needDefaultYAxisFigure: true,
  createPointFigures: ({ chart, coordinates, bounding, overlay, yAxis }) => {
    const points = overlay.points

    if (coordinates.length > 0) {
      let precision = 0
      if (yAxis?.isInCandle() ?? true) {
        precision = chart.getSymbol()?.pricePrecision ?? SymbolDefaultPrecisionConstants.PRICE
      } else {
        const indicators = chart.getIndicators({ paneId: overlay.paneId })
        indicators.forEach(indicator => {
          precision = Math.max(precision, indicator.precision)
        })
      }
      const lines: LineAttrs[] = []
      const texts: TextAttrs[] = []
      const startX = 0
      const endX = bounding.width
      if (coordinates.length > 1 && isNumber(points[0].value) && isNumber(points[1].value)) {
        const percents = [1, 0.786, 0.618, 0.5, 0.382, 0.236, 0]
        const yDif = coordinates[0].y - coordinates[1].y
        const valueDif = points[0].value - points[1].value
        percents.forEach(percent => {
          const y = coordinates[1].y + yDif * percent
          const value = chart.getDecimalFold().format(chart.getThousandsSeparator().format(((points[1].value ?? 0) + valueDif * percent).toFixed(precision)))
          lines.push({ coordinates: [{ x: startX, y }, { x: endX, y }] })
          texts.push({
            x: startX,
            y,
            text: `${value} (${(percent * 100).toFixed(1)}%)`,
            baseline: 'bottom'
          })
        })
      }
      return [
        {
          type: 'line',
          attrs: lines
        }, {
          type: 'text',
          isCheckEvent: false,
          attrs: texts
        }
      ]
    }
    return []
  }
}

export default fibonacciLine
```

## File: extension/overlay/horizontalRayLine.ts
```typescript
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

import { isValid } from '../../common/utils/typeChecks'
import type { OverlayTemplate } from '../../component/Overlay'

const horizontalRayLine: OverlayTemplate = {
  name: 'horizontalRayLine',
  totalStep: 3,
  needDefaultPointFigure: true,
  needDefaultXAxisFigure: true,
  needDefaultYAxisFigure: true,
  createPointFigures: ({ coordinates, bounding }) => {
    const coordinate = { x: 0, y: coordinates[0].y }
    if (isValid(coordinates[1]) && coordinates[0].x < coordinates[1].x) {
      coordinate.x = bounding.width
    }
    return [
      {
        type: 'line',
        attrs: { coordinates: [coordinates[0], coordinate] }
      }
    ]
  },
  performEventPressedMove: ({ points, performPoint }) => {
    points[0].value = performPoint.value
    points[1].value = performPoint.value
  },
  performEventMoveForDrawing: ({ currentStep, points, performPoint }) => {
    if (currentStep === 2) {
      points[0].value = performPoint.value
    }
  }
}

export default horizontalRayLine
```

## File: extension/overlay/horizontalSegment.ts
```typescript
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

import type { OverlayTemplate } from '../../component/Overlay'

import type { LineAttrs } from '../figure/line'

const horizontalSegment: OverlayTemplate = {
  name: 'horizontalSegment',
  totalStep: 3,
  needDefaultPointFigure: true,
  needDefaultXAxisFigure: true,
  needDefaultYAxisFigure: true,
  createPointFigures: ({ coordinates }) => {
    const lines: LineAttrs[] = []
    if (coordinates.length === 2) {
      lines.push({ coordinates })
    }
    return [
      {
        type: 'line',
        attrs: lines
      }
    ]
  },
  performEventPressedMove: ({ points, performPoint }) => {
    points[0].value = performPoint.value
    points[1].value = performPoint.value
  },
  performEventMoveForDrawing: ({ currentStep, points, performPoint }) => {
    if (currentStep === 2) {
      points[0].value = performPoint.value
    }
  }
}

export default horizontalSegment
```

## File: extension/overlay/horizontalStraightLine.ts
```typescript
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

import type { OverlayTemplate } from '../../component/Overlay'

const horizontalStraightLine: OverlayTemplate = {
  name: 'horizontalStraightLine',
  totalStep: 2,
  needDefaultPointFigure: true,
  needDefaultXAxisFigure: true,
  needDefaultYAxisFigure: true,
  createPointFigures: ({ coordinates, bounding }) => [{
    type: 'line',
    attrs: {
      coordinates: [
        {
          x: 0,
          y: coordinates[0].y
        }, {
          x: bounding.width,
          y: coordinates[0].y
        }
      ]
    }
  }]
}

export default horizontalStraightLine
```

## File: extension/overlay/index.ts
```typescript
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

import type Nullable from '../../common/Nullable'

import OverlayImp, { type OverlayTemplate, type OverlayConstructor, type OverlayInnerConstructor } from '../../component/Overlay'

import fibonacciLine from './fibonacciLine'
import horizontalRayLine from './horizontalRayLine'
import horizontalSegment from './horizontalSegment'
import horizontalStraightLine from './horizontalStraightLine'
import parallelStraightLine from './parallelStraightLine'
import priceChannelLine from './priceChannelLine'
import priceLine from './priceLine'
import rayLine from './rayLine'
import segment from './segment'
import straightLine from './straightLine'
import verticalRayLine from './verticalRayLine'
import verticalSegment from './verticalSegment'
import verticalStraightLine from './verticalStraightLine'

import simpleAnnotation from './simpleAnnotation'
import simpleTag from './simpleTag'
import brush from './brush'

const overlays: Record<string, OverlayInnerConstructor> = {}

const extensions = [
  fibonacciLine, horizontalRayLine, horizontalSegment, horizontalStraightLine,
  parallelStraightLine, priceChannelLine, priceLine, rayLine, segment,
  straightLine, verticalRayLine, verticalSegment, verticalStraightLine,
  simpleAnnotation, simpleTag, brush
]

extensions.forEach((template: OverlayTemplate) => {
  overlays[template.name] = OverlayImp.extend(template)
})

function registerOverlay<E = unknown> (template: OverlayTemplate<E>): void {
  overlays[template.name] = OverlayImp.extend(template)
}

function getOverlayInnerClass (name: string): Nullable<OverlayInnerConstructor> {
  return overlays[name] ?? null
}

function getOverlayClass (name: string): Nullable<OverlayConstructor> {
  return overlays[name] ?? null
}

function getSupportedOverlays (): string[] {
  return Object.keys(overlays)
}

export { registerOverlay, getOverlayClass, getOverlayInnerClass, getSupportedOverlays }
```

## File: extension/overlay/parallelStraightLine.ts
```typescript
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

import type Coordinate from '../../common/Coordinate'
import type Bounding from '../../common/Bounding'

import type { OverlayTemplate } from '../../component/Overlay'

import { type LineAttrs, getLinearSlopeIntercept } from '../figure/line'

/**
 * 获取平行线
 * @param coordinates
 * @param bounding
 * @param extendParallelLineCount
 * @returns {Array}
 */
export function getParallelLines (coordinates: Coordinate[], bounding: Bounding, extendParallelLineCount?: number): LineAttrs[] {
  const count = extendParallelLineCount ?? 0
  const lines: LineAttrs[] = []
  if (coordinates.length > 1) {
    if (coordinates[0].x === coordinates[1].x) {
      const startY = 0
      const endY = bounding.height
      lines.push({ coordinates: [{ x: coordinates[0].x, y: startY }, { x: coordinates[0].x, y: endY }] })
      if (coordinates.length > 2) {
        lines.push({ coordinates: [{ x: coordinates[2].x, y: startY }, { x: coordinates[2].x, y: endY }] })
        const distance = coordinates[0].x - coordinates[2].x
        for (let i = 0; i < count; i++) {
          const d = distance * (i + 1)
          lines.push({ coordinates: [{ x: coordinates[0].x + d, y: startY }, { x: coordinates[0].x + d, y: endY }] })
        }
      }
    } else {
      const startX = 0
      const endX = bounding.width
      const kb = getLinearSlopeIntercept(coordinates[0], coordinates[1])!
      const k = kb[0]
      const b = kb[1]
      lines.push({ coordinates: [{ x: startX, y: startX * k + b }, { x: endX, y: endX * k + b }] })
      if (coordinates.length > 2) {
        const b1 = coordinates[2].y - k * coordinates[2].x
        lines.push({ coordinates: [{ x: startX, y: startX * k + b1 }, { x: endX, y: endX * k + b1 }] })
        const distance = b - b1
        for (let i = 0; i < count; i++) {
          const b2 = b + distance * (i + 1)
          lines.push({ coordinates: [{ x: startX, y: startX * k + b2 }, { x: endX, y: endX * k + b2 }] })
        }
      }
    }
  }
  return lines
}

const parallelStraightLine: OverlayTemplate = {
  name: 'parallelStraightLine',
  totalStep: 4,
  needDefaultPointFigure: true,
  needDefaultXAxisFigure: true,
  needDefaultYAxisFigure: true,
  createPointFigures: ({ coordinates, bounding }) => [
    {
      type: 'line',
      attrs: getParallelLines(coordinates, bounding)
    }
  ]
}

export default parallelStraightLine
```

## File: extension/overlay/priceChannelLine.ts
```typescript
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

import type { OverlayTemplate } from '../../component/Overlay'

import { getParallelLines } from './parallelStraightLine'

const priceChannelLine: OverlayTemplate = {
  name: 'priceChannelLine',
  totalStep: 4,
  needDefaultPointFigure: true,
  needDefaultXAxisFigure: true,
  needDefaultYAxisFigure: true,
  createPointFigures: ({ coordinates, bounding }) => [
    {
      type: 'line',
      attrs: getParallelLines(coordinates, bounding, 1)
    }
  ]
}

export default priceChannelLine
```

## File: extension/overlay/priceLine.ts
```typescript
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
import type { OverlayTemplate } from '../../component/Overlay'

const priceLine: OverlayTemplate = {
  name: 'priceLine',
  totalStep: 2,
  needDefaultPointFigure: true,
  needDefaultXAxisFigure: true,
  needDefaultYAxisFigure: true,
  createPointFigures: ({ chart, coordinates, bounding, overlay, yAxis }) => {
    let precision = 0
    if (yAxis?.isInCandle() ?? true) {
      precision = chart.getSymbol()?.pricePrecision ?? SymbolDefaultPrecisionConstants.PRICE
    } else {
      const indicators = chart.getIndicators({ paneId: overlay.paneId })
      indicators.forEach(indicator => {
        precision = Math.max(precision, indicator.precision)
      })
    }
    const { value = 0 } = (overlay.points)[0]
    return [
      {
        type: 'line',
        attrs: { coordinates: [coordinates[0], { x: bounding.width, y: coordinates[0].y }] }
      },
      {
        type: 'text',
        ignoreEvent: true,
        attrs: {
          x: coordinates[0].x,
          y: coordinates[0].y,
          text: chart.getDecimalFold().format(chart.getThousandsSeparator().format(value.toFixed(precision))),
          baseline: 'bottom'
        }
      }
    ]
  }
}

export default priceLine
```

## File: extension/overlay/rayLine.ts
```typescript
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

import type Coordinate from '../../common/Coordinate'
import type Bounding from '../../common/Bounding'

import type { OverlayTemplate } from '../../component/Overlay'

import { getLinearYFromCoordinates, type LineAttrs } from '../figure/line'

export function getRayLine (coordinates: Coordinate[], bounding: Bounding): LineAttrs | LineAttrs[] {
  if (coordinates.length > 1) {
    let coordinate = { x: 0, y: 0 }
    if (coordinates[0].x === coordinates[1].x && coordinates[0].y !== coordinates[1].y) {
      if (coordinates[0].y < coordinates[1].y) {
        coordinate = {
          x: coordinates[0].x,
          y: bounding.height
        }
      } else {
        coordinate = {
          x: coordinates[0].x,
          y: 0
        }
      }
    } else if (coordinates[0].x > coordinates[1].x) {
      coordinate = {
        x: 0,
        y: getLinearYFromCoordinates(coordinates[0], coordinates[1], { x: 0, y: coordinates[0].y })
      }
    } else {
      coordinate = {
        x: bounding.width,
        y: getLinearYFromCoordinates(coordinates[0], coordinates[1], { x: bounding.width, y: coordinates[0].y })
      }
    }
    return { coordinates: [coordinates[0], coordinate] }
  }
  return []
}

const rayLine: OverlayTemplate = {
  name: 'rayLine',
  totalStep: 3,
  needDefaultPointFigure: true,
  needDefaultXAxisFigure: true,
  needDefaultYAxisFigure: true,
  createPointFigures: ({ coordinates, bounding }) => [
    {
      type: 'line',
      attrs: getRayLine(coordinates, bounding)
    }
  ]
}

export default rayLine
```

## File: extension/overlay/segment.ts
```typescript
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

import type { OverlayTemplate } from '../../component/Overlay'

const segment: OverlayTemplate = {
  name: 'segment',
  totalStep: 3,
  needDefaultPointFigure: true,
  needDefaultXAxisFigure: true,
  needDefaultYAxisFigure: true,
  createPointFigures: ({ coordinates }) => {
    if (coordinates.length === 2) {
      return [
        {
          type: 'line',
          attrs: { coordinates }
        }
      ]
    }
    return []
  }
}

export default segment
```

## File: extension/overlay/simpleAnnotation.ts
```typescript
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

import type { OverlayTemplate } from '../../component/Overlay'
import { isFunction, isValid } from '../../common/utils/typeChecks'

const simpleAnnotation: OverlayTemplate = {
  name: 'simpleAnnotation',
  totalStep: 2,
  styles: {
    line: { style: 'dashed' }
  },
  createPointFigures: ({ overlay, coordinates }) => {
    let text = ''
    if (isValid(overlay.extendData)) {
      if (!isFunction(overlay.extendData)) {
        text = (overlay.extendData ?? '') as string
      } else {
        text = (overlay.extendData(overlay)) as string
      }
    }
    const startX = coordinates[0].x
    const startY = coordinates[0].y - 6
    const lineEndY = startY - 50
    const arrowEndY = lineEndY - 5
    return [
      {
        type: 'line',
        attrs: { coordinates: [{ x: startX, y: startY }, { x: startX, y: lineEndY }] },
        ignoreEvent: true
      },
      {
        type: 'polygon',
        attrs: { coordinates: [{ x: startX, y: lineEndY }, { x: startX - 4, y: arrowEndY }, { x: startX + 4, y: arrowEndY }] },
        ignoreEvent: true
      },
      {
        type: 'text',
        attrs: { x: startX, y: arrowEndY, text, align: 'center', baseline: 'bottom' },
        ignoreEvent: true
      }
    ]
  }
}

export default simpleAnnotation
```

## File: extension/overlay/simpleTag.ts
```typescript
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

import { formatPrecision } from '../../common/utils/format'
import { SymbolDefaultPrecisionConstants } from '../../common/SymbolInfo'
import { isFunction, isNumber, isValid } from '../../common/utils/typeChecks'

import type { OverlayTemplate } from '../../component/Overlay'

const simpleTag: OverlayTemplate = {
  name: 'simpleTag',
  totalStep: 2,
  styles: {
    line: { style: 'dashed' }
  },
  createPointFigures: ({ bounding, coordinates }) => ({
    type: 'line',
    attrs: {
      coordinates: [
        { x: 0, y: coordinates[0].y },
        { x: bounding.width, y: coordinates[0].y }
      ]
    },
    ignoreEvent: true
  }),
  createYAxisFigures: ({ chart, overlay, coordinates, bounding, yAxis }) => {
    const isFromZero = yAxis?.isFromZero() ?? false
    let textAlign: CanvasTextAlign = 'left'
    let x = 0
    if (isFromZero) {
      textAlign = 'left'
      x = 0
    } else {
      textAlign = 'right'
      x = bounding.width
    }
    let text = ''
    if (isValid(overlay.extendData)) {
      if (!isFunction(overlay.extendData)) {
        text = (overlay.extendData ?? '') as string
      } else {
        text = overlay.extendData(overlay) as string
      }
    }
    if (!isValid(text) && isNumber(overlay.points[0].value)) {
      text = formatPrecision(overlay.points[0].value, chart.getSymbol()?.pricePrecision ?? SymbolDefaultPrecisionConstants.PRICE)
    }
    return { type: 'text', attrs: { x, y: coordinates[0].y, text, align: textAlign, baseline: 'middle' } }
  }
}

export default simpleTag
```

## File: extension/overlay/straightLine.ts
```typescript
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

import { getLinearYFromCoordinates } from '../figure/line'

import type { OverlayTemplate } from '../../component/Overlay'

const straightLine: OverlayTemplate = {
  name: 'straightLine',
  totalStep: 3,
  needDefaultPointFigure: true,
  needDefaultXAxisFigure: true,
  needDefaultYAxisFigure: true,
  createPointFigures: ({ coordinates, bounding }) => {
    if (coordinates.length === 2) {
      if (coordinates[0].x === coordinates[1].x) {
        return [
          {
            type: 'line',
            attrs: {
              coordinates: [
                {
                  x: coordinates[0].x,
                  y: 0
                }, {
                  x: coordinates[0].x,
                  y: bounding.height
                }
              ]
            }
          }
        ]
      }
      return [
        {
          type: 'line',
          attrs: {
            coordinates: [
              {
                x: 0,
                y: getLinearYFromCoordinates(coordinates[0], coordinates[1], { x: 0, y: coordinates[0].y })
              }, {
                x: bounding.width,
                y: getLinearYFromCoordinates(coordinates[0], coordinates[1], { x: bounding.width, y: coordinates[0].y })
              }
            ]
          }
        }
      ]
    }
    return []
  }
}

export default straightLine
```

## File: extension/overlay/verticalRayLine.ts
```typescript
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

import type { OverlayTemplate } from '../../component/Overlay'

const verticalRayLine: OverlayTemplate = {
  name: 'verticalRayLine',
  totalStep: 3,
  needDefaultPointFigure: true,
  needDefaultXAxisFigure: true,
  needDefaultYAxisFigure: true,
  createPointFigures: ({ coordinates, bounding }) => {
    if (coordinates.length === 2) {
      const coordinate = { x: coordinates[0].x, y: 0 }
      if (coordinates[0].y < coordinates[1].y) {
        coordinate.y = bounding.height
      }
      return [
        {
          type: 'line',
          attrs: { coordinates: [coordinates[0], coordinate] }
        }
      ]
    }
    return []
  },
  performEventPressedMove: ({ points, performPoint }) => {
    points[0].timestamp = performPoint.timestamp
    points[0].dataIndex = performPoint.dataIndex
    points[1].timestamp = performPoint.timestamp
    points[1].dataIndex = performPoint.dataIndex
  },
  performEventMoveForDrawing: ({ currentStep, points, performPoint }) => {
    if (currentStep === 2) {
      points[0].timestamp = performPoint.timestamp
      points[0].dataIndex = performPoint.dataIndex
    }
  }
}

export default verticalRayLine
```

## File: extension/overlay/verticalSegment.ts
```typescript
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

import type { OverlayTemplate } from '../../component/Overlay'

const verticalSegment: OverlayTemplate = {
  name: 'verticalSegment',
  totalStep: 3,
  needDefaultPointFigure: true,
  needDefaultXAxisFigure: true,
  needDefaultYAxisFigure: true,
  createPointFigures: ({ coordinates }) => {
    if (coordinates.length === 2) {
      return [
        {
          type: 'line',
          attrs: { coordinates }
        }
      ]
    }
    return []
  },
  performEventPressedMove: ({ points, performPoint }) => {
    points[0].timestamp = performPoint.timestamp
    points[0].dataIndex = performPoint.dataIndex
    points[1].timestamp = performPoint.timestamp
    points[1].dataIndex = performPoint.dataIndex
  },
  performEventMoveForDrawing: ({ currentStep, points, performPoint }) => {
    if (currentStep === 2) {
      points[0].timestamp = performPoint.timestamp
      points[0].dataIndex = performPoint.dataIndex
    }
  }
}

export default verticalSegment
```

## File: extension/overlay/verticalStraightLine.ts
```typescript
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

import type { OverlayTemplate } from '../../component/Overlay'

const verticalStraightLine: OverlayTemplate = {
  name: 'verticalStraightLine',
  totalStep: 2,
  needDefaultPointFigure: true,
  needDefaultXAxisFigure: true,
  needDefaultYAxisFigure: true,
  createPointFigures: ({ coordinates, bounding }) => [
    {
      type: 'line',
      attrs: {
        coordinates: [
          {
            x: coordinates[0].x,
            y: 0
          }, {
            x: coordinates[0].x,
            y: bounding.height
          }
        ]
      }
    }
  ]
}

export default verticalStraightLine
```

## File: extension/styles/dark.ts
```typescript
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

import type DeepPartial from '../../common/DeepPartial'
import type { Styles } from '../../common/Styles'

const dark: DeepPartial<Styles> = {
  grid: {
    horizontal: {
      color: '#292929'
    },
    vertical: {
      color: '#292929'
    }
  },
  candle: {
    priceMark: {
      high: {
        color: '#929AA5'
      },
      low: {
        color: '#929AA5'
      }
    },
    tooltip: {
      rect: {
        color: 'rgba(10, 10, 10, .6)',
        borderColor: 'rgba(10, 10, 10, .6)'
      },
      title: {
        color: '#929AA5'
      },
      legend: {
        color: '#929AA5'
      }
    }
  },
  indicator: {
    tooltip: {
      title: {
        color: '#929AA5'
      },
      legend: {
        color: '#929AA5'
      }
    }
  },
  xAxis: {
    axisLine: {
      color: '#333333'
    },
    tickText: {
      color: '#929AA5'
    },
    tickLine: {
      color: '#333333'
    }
  },
  yAxis: {
    axisLine: {
      color: '#333333'
    },
    tickText: {
      color: '#929AA5'
    },
    tickLine: {
      color: '#333333'
    }
  },
  separator: {
    color: '#333333'
  },
  crosshair: {
    horizontal: {
      line: {
        color: '#929AA5'
      },
      text: {
        borderColor: '#373a40',
        backgroundColor: '#373a40'
      }
    },
    vertical: {
      line: {
        color: '#929AA5'
      },
      text: {
        borderColor: '#373a40',
        backgroundColor: '#373a40'
      }
    }
  }
}

export default dark
```

## File: extension/styles/index.ts
```typescript
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

import type Nullable from '../../common/Nullable'
import type DeepPartial from '../../common/DeepPartial'
import type { Styles } from '../../common/Styles'

import light from './light'
import dark from './dark'

const styles: Record<string, DeepPartial<Styles>> = {
  light,
  dark
}

function registerStyles (name: string, ss: DeepPartial<Styles>): void {
  styles[name] = ss
}

function getStyles (name: string): Nullable<DeepPartial<Styles>> {
  return styles[name] ?? null
}

export {
  registerStyles,
  getStyles
}
```

## File: extension/styles/light.ts
```typescript
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

import type DeepPartial from '../../common/DeepPartial'
import type { Styles } from '../../common/Styles'

const light: DeepPartial<Styles> = {
  grid: {
    horizontal: {
      color: '#EDEDED'
    },
    vertical: {
      color: '#EDEDED'
    }
  },
  candle: {
    priceMark: {
      high: {
        color: '#76808F'
      },
      low: {
        color: '#76808F'
      }
    },
    tooltip: {
      rect: {
        color: '#FEFEFE',
        borderColor: '#F2F3F5'
      },
      title: {
        color: '#76808F'
      },
      legend: {
        color: '#76808F'
      }
    }
  },
  indicator: {
    tooltip: {
      title: {
        color: '#76808F'
      },
      legend: {
        color: '#76808F'
      }
    }
  },
  xAxis: {
    axisLine: {
      color: '#DDDDDD'
    },
    tickText: {
      color: '#76808F'
    },
    tickLine: {
      color: '#DDDDDD'
    }
  },
  yAxis: {
    axisLine: {
      color: '#DDDDDD'
    },
    tickText: {
      color: '#76808F'
    },
    tickLine: {
      color: '#DDDDDD'
    }
  },
  separator: {
    color: '#DDDDDD'
  },
  crosshair: {
    horizontal: {
      line: {
        color: '#76808F'
      },
      text: {
        borderColor: '#686D76',
        backgroundColor: '#686D76'
      }
    },
    vertical: {
      line: {
        color: '#76808F'
      },
      text: {
        borderColor: '#686D76',
        backgroundColor: '#686D76'
      }
    }
  }
}

export default light
```

## File: extension/x-axis/index.ts
```typescript
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

import XAxisImp, { type XAxisTemplate, type XAxisConstructor } from '../../component/XAxis'

import normal from './normal'

const xAxises: Record<string, XAxisConstructor> = {
  normal: XAxisImp.extend(normal)
}

function registerXAxis (axis: XAxisTemplate): void {
  xAxises[axis.name] = XAxisImp.extend(axis)
}

function getXAxisClass (name: string): XAxisConstructor {
  return xAxises[name] ?? xAxises.normal
}

export {
  registerXAxis,
  getXAxisClass
}
```

## File: extension/x-axis/normal.ts
```typescript
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

import type { AxisTemplate } from '../../component/Axis'

const normal: AxisTemplate = {
  name: 'normal'
}

export default normal
```

## File: extension/y-axis/index.ts
```typescript
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

import YAxisImp, { type YAxisTemplate, type YAxisConstructor } from '../../component/YAxis'

import normal from './normal'
import percentage from './percentage'
import logarithm from './logarithm'

const yAxises: Record<string, YAxisConstructor> = {
  normal: YAxisImp.extend(normal),
  percentage: YAxisImp.extend(percentage),
  logarithm: YAxisImp.extend(logarithm)
}

function registerYAxis (axis: YAxisTemplate): void {
  yAxises[axis.name] = YAxisImp.extend(axis)
}

function getYAxisClass (name: string): YAxisConstructor {
  return yAxises[name] ?? yAxises.normal
}

export {
  registerYAxis,
  getYAxisClass
}
```

## File: extension/y-axis/logarithm.ts
```typescript
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

import { log10, index10 } from '../../common/utils/number'
import type { AxisTemplate } from '../../component/Axis'

const logarithm: AxisTemplate = {
  name: 'logarithm',
  minSpan: (precision) => 0.05 * index10(-precision),
  valueToRealValue: (value) => value < 0 ? -log10(Math.abs(value)) : log10(value),
  realValueToDisplayValue: (value) => value < 0 ? -index10(Math.abs(value)) : index10(value),
  displayValueToRealValue: (value) => value < 0 ? -log10(Math.abs(value)) : log10(value),
  realValueToValue: (value) => value < 0 ? -index10(Math.abs(value)) : index10(value),
  createRange: ({ defaultRange }) => {
    const { from, to, range } = defaultRange
    const realFrom = from < 0 ? -log10(Math.abs(from)) : log10(from)
    const realTo = to < 0 ? -log10(Math.abs(to)) : log10(to)
    return {
      from,
      to,
      range,
      realFrom,
      realTo,
      realRange: realTo - realFrom,
      displayFrom: from,
      displayTo: to,
      displayRange: range
    }
  }
}

export default logarithm
```

## File: extension/y-axis/normal.ts
```typescript
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

import type { AxisTemplate } from '../../component/Axis'

const normal: AxisTemplate = {
  name: 'normal'
}

export default normal
```

## File: extension/y-axis/percentage.ts
```typescript
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

import { formatPrecision } from '../../common/utils/format'
import { isValid } from '../../common/utils/typeChecks'
import type { AxisTemplate } from '../../component/Axis'

const percentage: AxisTemplate = {
  name: 'percentage',
  minSpan: () => Math.pow(10, -2),
  displayValueToText: value => `${formatPrecision(value, 2)}%`,
  valueToRealValue: (value, { range }) => (value - range.from) / range.range * range.realRange + range.realFrom,
  realValueToValue: (value, { range }) => (value - range.realFrom) / range.realRange * range.range + range.from,
  createRange: ({ chart, defaultRange }) => {
    const kLineDataList = chart.getDataList()
    const visibleRange = chart.getVisibleRange()
    const kLineData = kLineDataList[visibleRange.from]
    if (isValid(kLineData)) {
      const { from, to, range } = defaultRange
      const realFrom = (defaultRange.from - kLineData.close) / kLineData.close * 100
      const realTo = (defaultRange.to - kLineData.close) / kLineData.close * 100
      const realRange = realTo - realFrom
      return {
        from,
        to,
        range,
        realFrom,
        realTo,
        realRange,
        displayFrom: realFrom,
        displayTo: realTo,
        displayRange: realRange
      }
    }
    return defaultRange
  }
}

export default percentage
```

## File: index.ts
```typescript
/**
 *       ___           ___                   ___           ___           ___           ___           ___           ___           ___
 *      /\__\         /\__\      ___        /\__\         /\  \         /\  \         /\__\         /\  \         /\  \         /\  \
 *     /:/  /        /:/  /     /\  \      /::|  |       /::\  \       /::\  \       /:/  /        /::\  \       /::\  \        \:\  \
 *    /:/__/        /:/  /      \:\  \    /:|:|  |      /:/\:\  \     /:/\:\  \     /:/__/        /:/\:\  \     /:/\:\  \        \:\  \
 *   /::\__\____   /:/  /       /::\__\  /:/|:|  |__   /::\~\:\  \   /:/  \:\  \   /::\  \ ___   /::\~\:\  \   /::\~\:\  \       /::\  \
 *  /:/\:::::\__\ /:/__/     __/:/\/__/ /:/ |:| /\__\ /:/\:\ \:\__\ /:/__/ \:\__\ /:/\:\  /\__\ /:/\:\ \:\__\ /:/\:\ \:\__\     /:/\:\__\
 *  \/_|:|~~|~    \:\  \    /\/:/  /    \/__|:|/:/  / \:\~\:\ \/__/ \:\  \  \/__/ \/__\:\/:/  / \/__\:\/:/  / \/_|::\/:/  /    /:/  \/__/
 *     |:|  |      \:\  \   \::/__/         |:/:/  /   \:\ \:\__\    \:\  \            \::/  /       \::/  /     |:|::/  /    /:/  /
 *     |:|  |       \:\  \   \:\__\         |::/  /     \:\ \/__/     \:\  \           /:/  /        /:/  /      |:|\/__/     \/__/
 *     |:|  |        \:\__\   \/__/         /:/  /       \:\__\        \:\__\         /:/  /        /:/  /       |:|  |
 *      \|__|         \/__/                 \/__/         \/__/         \/__/         \/__/         \/__/         \|__|
 *
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

import type {
  LineType, PolygonType, TooltipShowRule, TooltipShowType, FeatureType, TooltipFeaturePosition,
  CandleType, CandleTooltipRectPosition
} from './common/Styles'
import type Nullable from './common/Nullable'

import { logError, logTag, logWarn } from './common/utils/logger'

import {
  clone, merge, isString, isNumber, isValid, isObject, isArray, isFunction, isBoolean
} from './common/utils/typeChecks'
import {
  formatValue,
  formatPrecision,
  formatBigNumber,
  formatThousands,
  formatFoldDecimal,
  formatTimestampByTemplate
} from './common/utils/format'
import { calcTextWidth } from './common/utils/canvas'
import type { ActionType } from './common/Action'
import type { IndicatorSeries } from './component/Indicator'
import type { OverlayMode, OverlayDrawingMode } from './component/Overlay'

import type { FormatDateType, Options, ZoomAnchor } from './Options'
import ChartImp, { type Chart, type DomPosition } from './Chart'

import { checkCoordinateOnArc } from './extension/figure/arc'
import { checkCoordinateOnCircle } from './extension/figure/circle'
import {
  checkCoordinateOnLine,
  getLinearYFromSlopeIntercept,
  getLinearSlopeIntercept,
  getLinearYFromCoordinates
} from './extension/figure/line'
import { checkCoordinateOnPolygon } from './extension/figure/polygon'
import { checkCoordinateOnRect } from './extension/figure/rect'
import { checkCoordinateOnText } from './extension/figure/text'

import { registerFigure, getSupportedFigures, getFigureClass } from './extension/figure/index'
import { registerIndicator, getSupportedIndicators } from './extension/indicator/index'
import { registerLocale, getSupportedLocales } from './extension/i18n/index'
import { registerOverlay, getOverlayClass, getSupportedOverlays } from './extension/overlay/index'
import { registerStyles } from './extension/styles/index'
import { registerXAxis } from './extension/x-axis'
import { registerYAxis } from './extension/y-axis'
import { registerHotkey, getHotkey, getSupportedHotkeys } from './extension/hotkey/index'

const charts = new Map<string, ChartImp>()
let chartBaseId = 1

/**
 * Chart version
 * @return {string}
 */
function version (): string {
  return '__VERSION__'
}

/**
 * Init chart instance
 * @param ds
 * @param options
 * @returns {Chart}
 */
function init (ds: HTMLElement | string, options?: Options): Nullable<Chart> {
  logTag()
  let dom: Nullable<HTMLElement> = null
  if (isString(ds)) {
    dom = document.getElementById(ds)
  } else {
    dom = ds
  }
  if (dom === null) {
    logError('', '', 'The chart cannot be initialized correctly. Please check the parameters. The chart container cannot be null and child elements need to be added!!!')
    return null
  }
  let chart = charts.get(dom.id)
  if (isValid(chart)) {
    logWarn('', '', 'The chart has been initialized on the dom！！！')
    return chart
  }
  const id = `k_line_chart_${chartBaseId++}`
  chart = new ChartImp(dom, options)
  chart.id = id
  dom.setAttribute('k-line-chart-id', id)
  charts.set(id, chart)
  return chart
}

/**
 * Destroy chart instance
 * @param dcs
 */
function dispose (dcs: HTMLElement | Chart | string): void {
  let id: Nullable<string> = null
  if (dcs instanceof ChartImp) {
    id = dcs.id
  } else {
    let dom: Nullable<HTMLElement> = null
    if (isString(dcs)) {
      dom = document.getElementById(dcs)
    } else {
      dom = dcs as HTMLElement
    }
    id = dom?.getAttribute('k-line-chart-id') ?? null
  }
  if (id !== null) {
    charts.get(id)?.destroy()
    charts.delete(id)
  }
}

const utils = {
  clone,
  merge,
  isString,
  isNumber,
  isValid,
  isObject,
  isArray,
  isFunction,
  isBoolean,
  formatValue,
  formatPrecision,
  formatBigNumber,
  formatDate: formatTimestampByTemplate,
  formatThousands,
  formatFoldDecimal,
  calcTextWidth,
  getLinearSlopeIntercept,
  getLinearYFromSlopeIntercept,
  getLinearYFromCoordinates,
  checkCoordinateOnArc,
  checkCoordinateOnCircle,
  checkCoordinateOnLine,
  checkCoordinateOnPolygon,
  checkCoordinateOnRect,
  checkCoordinateOnText
}

export {
  version, init, dispose,
  registerFigure, getSupportedFigures, getFigureClass,
  registerIndicator, getSupportedIndicators,
  registerHotkey, getHotkey, getSupportedHotkeys,
  registerOverlay, getSupportedOverlays, getOverlayClass,
  registerLocale, getSupportedLocales,
  registerStyles,
  registerXAxis, registerYAxis,
  utils,
  type LineType, type PolygonType, type TooltipShowRule, type TooltipShowType, type FeatureType, type TooltipFeaturePosition, type CandleTooltipRectPosition,
  type CandleType, type FormatDateType, type ZoomAnchor,
  type DomPosition, type ActionType, type IndicatorSeries, type OverlayMode, type OverlayDrawingMode
}
```

## File: Options.ts
```typescript
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

import type { KLineData } from './common/Data'
import type DeepPartial from './common/DeepPartial'
import type { Styles } from './common/Styles'
import type { AxisPosition } from './component/Axis'
import type { IndicatorCreate } from './component/Indicator'
import type { YAxisOverride } from './component/YAxis'
import type { PaneOptions } from './pane/types'

export type FormatDateType = 'tooltip' | 'crosshair' | 'xAxis'

export interface FormatDateParams {
  dateTimeFormat: Intl.DateTimeFormat
  timestamp: number
  template: string
  type: FormatDateType
}

export type FormatDate = (params: FormatDateParams) => string

export type FormatBigNumber = (value: string | number) => string

export type ExtendTextType = 'last_price'

export interface FormatExtendTextParams {
  type: ExtendTextType
  data: KLineData
  index: number
}

export type FormatExtendText = (params: FormatExtendTextParams) => string

export interface Formatter {
  formatDate: FormatDate
  formatBigNumber: FormatBigNumber
  formatExtendText: FormatExtendText
}

export interface Locales {
  time: string
  open: string
  high: string
  low: string
  close: string
  volume: string
  change: string
  turnover: string
  second: string
  minute: string
  hour: string
  day: string
  week: string
  month: string
  year: string
  [key: string]: string
}

export interface DecimalFold {
  threshold: number
  format: (value: string | number) => string
}

export interface ThousandsSeparator {
  sign: string
  format: (value: string | number) => string
}

export type ZoomAnchorType = 'cursor' | 'last_bar'

export interface ZoomAnchor {
  main: ZoomAnchorType
  xAxis: ZoomAnchorType
}

export interface LayoutBasicParams {
  barSpaceLimitMin?: number
  barSpaceLimitMax?: number
  yAxisPosition?: AxisPosition
  yAxisInside?: boolean
  paneMinHeight?: number
  paneHeight?: number
}

export interface LayoutPaneContentChildMultipleParams {
  indicator: string | IndicatorCreate
  yAxis?: Omit<YAxisOverride, 'paneId'>
}

export type LayoutPaneContentChild = LayoutPaneContentChildMultipleParams | string | IndicatorCreate

export interface LayoutPane {
  type: 'candle' | 'indicator' | 'xAxis'
  content?: LayoutPaneContentChild[]
  options?: PaneOptions
}

export interface Layout {
  basicParams?: LayoutBasicParams
  panes?: LayoutPane[]
}

export interface Hotkey {
  enabled: boolean
  exclude: string[]
}

export interface Options {
  locale?: string
  timezone?: string
  styles?: string | DeepPartial<Styles>
  formatter?: Partial<Formatter>
  thousandsSeparator?: Partial<ThousandsSeparator>
  decimalFold?: Partial<DecimalFold>
  zoomAnchor?: ZoomAnchorType | Partial<ZoomAnchor>
  hotkey?: Partial<Hotkey>
  layout?: Layout
}
```

## File: pane/CandlePane.ts
```typescript
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

import type DrawWidget from '../widget/DrawWidget'
import CandleWidget from '../widget/CandleWidget'

import type DrawPane from './DrawPane'
import IndicatorPane from './IndicatorPane'
import type { YAxis } from '../component/YAxis'

export default class CandlePane extends IndicatorPane {
  override createMainWidget (container: HTMLElement): DrawWidget<DrawPane<YAxis>> {
    return new CandleWidget(container, this)
  }
}
```

## File: pane/DrawPane.ts
```typescript
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

import type DeepRequired from '../common/DeepRequired'
import type PickRequired from '../common/PickRequired'

import { createDom } from '../common/utils/dom'
import { getPixelRatio } from '../common/utils/canvas'

import type Nullable from '../common/Nullable'
import type { UpdateLevel } from '../common/Updater'
import type Bounding from '../common/Bounding'

import { isBoolean, isNumber, isValid, merge } from '../common/utils/typeChecks'

import { DEFAULT_AXIS_ID, type Axis } from '../component/Axis'
import type YAxisImp from '../component/YAxis'
import type { YAxis, YAxisOverride } from '../component/YAxis'

import type DrawWidget from '../widget/DrawWidget'
import type YAxisWidget from '../widget/YAxisWidget'

import { type PaneOptions, PANE_DEFAULT_HEIGHT, PANE_MIN_HEIGHT, PaneIdConstants } from './types'
import Pane from './Pane'

import type Chart from '../Chart'

export default abstract class DrawPane<C extends Axis = Axis> extends Pane {
  private readonly _mainWidget: DrawWidget<DrawPane<C>>
  private readonly _yAxisWidgets = new Map<string, YAxisWidget>()
  private readonly _yAxisComponents = new Map<string, YAxis>()
  private _yAxesBounding: Record<string, Partial<Bounding>> = {}

  private readonly _options: DeepRequired<PaneOptions> = {
    id: '',
    minHeight: PANE_MIN_HEIGHT,
    dragEnabled: true,
    order: 0,
    height: PANE_DEFAULT_HEIGHT,
    state: 'normal'
  }

  constructor (chart: Chart, options: PickRequired<PaneOptions, 'id'>) {
    super(chart, options.id)
    const container = this.getContainer()
    this._mainWidget = this.createMainWidget(container)
    this.setOptions(options)
  }

  setOptions (options: PaneOptions): this {
    merge(this._options, options)
    if (isNumber(options.height) && options.height > 0) {
      this.setBounding({ height: this._options.height })
    }
    return this
  }

  protected setAxisCursor (scrollZoomEnabled?: boolean, yAxisId?: string): void {
    let container: Nullable<HTMLElement> = null
    let cursor = 'default'
    if (this.getId() === PaneIdConstants.X_AXIS) {
      container = this.getMainWidget().getContainer()
      cursor = 'ew-resize'
    } else {
      container = this.getYAxisWidgetById(yAxisId)?.getContainer() ?? null
      cursor = 'ns-resize'
    }
    if (!isValid(container) || !isBoolean(scrollZoomEnabled)) {
      return
    }
    if (scrollZoomEnabled) {
      container.style.cursor = cursor
    } else {
      container.style.cursor = 'default'
    }
  }

  createYAxis (axis: YAxisOverride): YAxis {
    const yAxisId = axis.id ?? DEFAULT_AXIS_ID
    const yAxisName = axis.name ?? 'normal'
    const needWidget = axis.needWidget ?? true
    let yAxis = this._yAxisComponents.get(yAxisId)
    const shouldCreateYAxis = !isValid(yAxis) || (isValid(axis.name) && yAxis.name !== axis.name)
    if (shouldCreateYAxis) {
      this._yAxisWidgets.get(yAxisId)?.destroy()
      this._yAxisWidgets.delete(yAxisId)
      yAxis = this.createYAxisComponent(yAxisName)
      yAxis.id = yAxisId
      yAxis.paneId = this.getId()
      this._yAxisComponents.set(yAxisId, yAxis)
      if (needWidget) {
        const yAxisWidget = this.createYAxisWidget(this.getContainer(), yAxis)
        if (isValid(yAxisWidget)) {
          this._yAxisWidgets.set(yAxisId, yAxisWidget)
        }
      }
    }
    if (!isValid(yAxis)) {
      throw new Error('create yAxis failed.')
    }
    ;(yAxis as unknown as YAxisImp).setAutoCalcTickFlag(true)
    yAxis.override({
      ...axis,
      name: yAxisName
    })
    this.setAxisCursor(yAxis.scrollZoomEnabled, yAxisId)
    return yAxis
  }

  getOptions (): DeepRequired<PaneOptions> { return this._options }

  getYAxisComponents (): YAxis[] {
    return Array.from(this._yAxisComponents.values())
  }

  getWidgetYAxisComponents (): YAxis[] {
    return Array.from(this._yAxisWidgets.keys()).map(id => this._yAxisComponents.get(id)!)
  }

  hasYAxisComponent (yAxisId: string): boolean {
    return this._yAxisComponents.has(yAxisId)
  }

  removeYAxis (yAxisId: string): boolean {
    const yAxis = this._yAxisComponents.get(yAxisId)
    if (!isValid(yAxis)) {
      return false
    }
    this._yAxisComponents.delete(yAxisId)
    const yAxisWidget = this._yAxisWidgets.get(yAxisId)
    if (isValid(yAxisWidget)) {
      yAxisWidget.destroy()
      this._yAxisWidgets.delete(yAxisId)
    }
    this._yAxesBounding = Object.keys(this._yAxesBounding).reduce<Record<string, Partial<Bounding>>>((bounding, id) => {
      if (id !== yAxisId) {
        bounding[id] = this._yAxesBounding[id]
      }
      return bounding
    }, {})
    return true
  }

  private _getDefaultYAxisId (): Nullable<string> {
    if (this._yAxisComponents.has(DEFAULT_AXIS_ID)) {
      return DEFAULT_AXIS_ID
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return -- ignore
    return this._yAxisComponents.keys().next().value ?? null
  }

  getYAxisComponentById (yAxisId?: string): YAxis {
    const id = yAxisId ?? this._getDefaultYAxisId()
    return this._yAxisComponents.get(id!)!
  }

  getYAxisWidgetById (yAxisId?: string): Nullable<YAxisWidget> {
    const id = yAxisId ?? this._getDefaultYAxisId()
    return isValid(id) ? this._yAxisWidgets.get(id) ?? null : null
  }

  setYAxesBounding (bounding: Record<string, Partial<Bounding>>): void {
    this._yAxesBounding = bounding
  }

  override setBounding (
    rootBounding: Partial<Bounding>,
    mainBounding?: Partial<Bounding>,
    leftYAxisBounding?: Partial<Bounding>,
    rightYAxisBounding?: Partial<Bounding>
  ): this {
    merge(this.getBounding(), rootBounding)
    const contentBounding: Partial<Bounding> = {}
    if (isValid(rootBounding.height)) {
      contentBounding.height = rootBounding.height
    }
    if (isValid(rootBounding.top)) {
      contentBounding.top = rootBounding.top
    }
    this._mainWidget.setBounding(contentBounding)
    const mainBoundingValid = isValid(mainBounding)
    if (mainBoundingValid) {
      this._mainWidget.setBounding(mainBounding)
    }
    if (this._yAxisWidgets.size > 0) {
      this._yAxisWidgets.forEach((yAxisWidget, yAxisId) => {
        yAxisWidget.setBounding(contentBounding)
        if (isValid(this._yAxesBounding[yAxisId])) {
          yAxisWidget.setBounding(this._yAxesBounding[yAxisId])
          return
        }
        const yAxis = this.getYAxisComponentById(yAxisId)
        if (yAxis.position === 'left') {
          if (isValid(leftYAxisBounding)) {
            yAxisWidget.setBounding({ ...leftYAxisBounding, left: 0 })
          }
        } else {
          if (isValid(rightYAxisBounding)) {
            yAxisWidget.setBounding(rightYAxisBounding)
            if (mainBoundingValid) {
              yAxisWidget.setBounding({
                left: (mainBounding.left ?? 0) +
                  (mainBounding.width ?? 0) +
                  (mainBounding.right ?? 0) -
                  (rightYAxisBounding.width ?? 0)
              })
            }
          }
        }
      })
    }
    return this
  }

  getMainWidget (): DrawWidget<DrawPane<C>> { return this._mainWidget }

  getYAxisWidget (): Nullable<YAxisWidget> { return this.getYAxisWidgetById() }

  getYAxisWidgets (): YAxisWidget[] { return Array.from(this._yAxisWidgets.values()) }

  override updateImp (level: UpdateLevel): void {
    this._mainWidget.update(level)
    this._yAxisWidgets.forEach(widget => { widget.update(level) })
  }

  destroy (): void {
    this._mainWidget.destroy()
    this._yAxisWidgets.forEach(widget => { widget.destroy() })
  }

  override getImage (includeOverlay: boolean): HTMLCanvasElement {
    const { width, height } = this.getBounding()
    const canvas = createDom('canvas', {
      width: `${width}px`,
      height: `${height}px`,
      boxSizing: 'border-box'
    })
    const ctx = canvas.getContext('2d')!
    const pixelRatio = getPixelRatio(canvas)
    canvas.width = width * pixelRatio
    canvas.height = height * pixelRatio
    ctx.scale(pixelRatio, pixelRatio)

    const mainBounding = this._mainWidget.getBounding()
    ctx.drawImage(
      this._mainWidget.getImage(includeOverlay),
      mainBounding.left, 0,
      mainBounding.width, mainBounding.height
    )
    this._yAxisWidgets.forEach(yAxisWidget => {
      const yAxisBounding = yAxisWidget.getBounding()
      ctx.drawImage(
        yAxisWidget.getImage(includeOverlay),
        yAxisBounding.left, 0,
        yAxisBounding.width, yAxisBounding.height
      )
    })
    return canvas
  }

  protected createYAxisComponent (_name: string): YAxis {
    throw new Error('createYAxisComponent is not implemented.')
  }

  protected createYAxisWidget (_container: HTMLElement, _yAxis: YAxis): Nullable<YAxisWidget> { return null }

  protected abstract createMainWidget (container: HTMLElement): DrawWidget<DrawPane<C>>
}
```

## File: pane/IndicatorPane.ts
```typescript
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

import type Nullable from '../common/Nullable'

import type DrawWidget from '../widget/DrawWidget'
import IndicatorWidget from '../widget/IndicatorWidget'
import YAxisWidget from '../widget/YAxisWidget'

import type { YAxis } from '../component/YAxis'

import { getYAxisClass } from '../extension/y-axis'

import DrawPane from './DrawPane'

export default class IndicatorPane extends DrawPane<YAxis> {
  override createYAxisComponent (name?: string): YAxis {
    const YAxisClass = getYAxisClass(name ?? 'default')
    return new YAxisClass(this)
  }

  override createMainWidget (container: HTMLElement): DrawWidget<DrawPane<YAxis>> {
    return new IndicatorWidget(container, this)
  }

  override createYAxisWidget (container: HTMLElement, yAxis: YAxis): Nullable<YAxisWidget> {
    return new YAxisWidget(container, this, yAxis)
  }
}
```

## File: pane/Pane.ts
```typescript
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

import type Updater from '../common/Updater'
import { UpdateLevel } from '../common/Updater'
import type Bounding from '../common/Bounding'
import { createDefaultBounding } from '../common/Bounding'
import { createDom } from '../common/utils/dom'

import type Chart from '../Chart'

export default abstract class Pane implements Updater {
  private readonly _container: HTMLElement
  private readonly _id: string
  private readonly _chart: Chart

  private readonly _bounding = createDefaultBounding()

  constructor (chart: Chart, id: string) {
    this._chart = chart
    this._id = id
    this._container = createDom('div', {
      width: '100%',
      margin: '0',
      padding: '0',
      position: 'relative',
      overflow: 'hidden',
      boxSizing: 'border-box'
    })
  }

  getContainer (): HTMLElement {
    return this._container
  }

  getId (): string {
    return this._id
  }

  getChart (): Chart {
    return this._chart
  }

  getBounding (): Bounding {
    return this._bounding
  }

  update (level?: UpdateLevel): void {
    if (this._bounding.height !== this._container.clientHeight) {
      this._container.style.height = `${this._bounding.height}px`
    }
    this.updateImp(level ?? UpdateLevel.Drawer, this._container, this._bounding)
  }

  abstract setBounding (...bounding: Array<Partial<Bounding>>): Pane

  abstract getImage (includeOverlay: boolean): HTMLCanvasElement

  abstract updateImp (level: UpdateLevel, container: HTMLElement, bounding: Bounding): void
}
```

## File: pane/SeparatorPane.ts
```typescript
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

import { UpdateLevel } from '../common/Updater'
import type Bounding from '../common/Bounding'
import { merge } from '../common/utils/typeChecks'
import { createDom } from '../common/utils/dom'
import { getPixelRatio } from '../common/utils/canvas'

import type Chart from '../Chart'

import type DrawPane from './DrawPane'
import Pane from './Pane'

import SeparatorWidget from '../widget/SeparatorWidget'

export default class SeparatorPane extends Pane {
  private _topPane: DrawPane
  private _bottomPane: DrawPane

  private readonly _separatorWidget: SeparatorWidget

  constructor (chart: Chart, id: string, topPane: DrawPane, bottomPane: DrawPane) {
    super(chart, id)
    this.getContainer().style.overflow = ''
    this._topPane = topPane
    this._bottomPane = bottomPane
    this._separatorWidget = new SeparatorWidget(this.getContainer(), this)
  }

  override setBounding (rootBounding: Partial<Bounding>): Pane {
    merge(this.getBounding(), rootBounding)
    return this
  }

  getTopPane (): DrawPane {
    return this._topPane
  }

  setTopPane (pane: DrawPane): Pane {
    this._topPane = pane
    return this
  }

  getBottomPane (): DrawPane {
    return this._bottomPane
  }

  setBottomPane (pane: DrawPane): Pane {
    this._bottomPane = pane
    return this
  }

  getWidget (): SeparatorWidget { return this._separatorWidget }

  override getImage (_includeOverlay: boolean): HTMLCanvasElement {
    const { width, height } = this.getBounding()

    const styles = this.getChart().getStyles().separator
    const canvas = createDom('canvas', {
      width: `${width}px`,
      height: `${height}px`,
      boxSizing: 'border-box'
    })
    const ctx = canvas.getContext('2d')!
    const pixelRatio = getPixelRatio(canvas)
    canvas.width = width * pixelRatio
    canvas.height = height * pixelRatio
    ctx.scale(pixelRatio, pixelRatio)
    ctx.fillStyle = styles.color
    ctx.fillRect(0, 0, width, height)
    return canvas
  }

  override updateImp (level: UpdateLevel, container: HTMLElement, bounding: Bounding): void {
    if (level === UpdateLevel.All || level === UpdateLevel.Separator) {
      const styles = this.getChart().getStyles().separator
      container.style.backgroundColor = styles.color
      container.style.height = `${bounding.height}px`
      container.style.marginLeft = `${bounding.left}px`
      container.style.width = `${bounding.width}px`
      this._separatorWidget.update(level)
    }
  }
}
```

## File: pane/types.ts
```typescript
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

export type PaneState = 'normal' | 'maximize' | 'minimize'

export interface PaneOptions {
  id?: string
  height?: number
  minHeight?: number
  dragEnabled?: boolean
  order?: number
  state?: PaneState
}

export const PANE_MIN_HEIGHT = 30

export const PANE_DEFAULT_HEIGHT = 100

export const PaneIdConstants = {
  CANDLE: 'candle_pane',
  INDICATOR: 'indicator_pane_',
  X_AXIS: 'x_axis_pane'
}
```

## File: pane/XAxisPane.ts
```typescript
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

import { isValid } from '../common/utils/typeChecks'
import type PickRequired from '../common/PickRequired'

import type DrawWidget from '../widget/DrawWidget'
import XAxisWidget from '../widget/XAxisWidget'

import type { XAxis, XAxisOverride } from '../component/XAxis'

import DrawPane from './DrawPane'
import type { PaneOptions } from './types'

import { getXAxisClass } from '../extension/x-axis'

import type Chart from '../Chart'

export default class XAxisPane extends DrawPane<XAxis> {
  private _xAxis: XAxis

  constructor (chart: Chart, options: PickRequired<PaneOptions, 'id'>) {
    super(chart, options)
    this.overrideXAxis({ name: 'normal', scrollZoomEnabled: true })
  }

  override setOptions (options: PaneOptions): this {
    return super.setOptions(options)
  }

  overrideXAxis (xAxis: XAxisOverride): this {
    const axisName = xAxis.name
    if (
      !isValid(this._xAxis) ||
      (isValid(axisName) && this._xAxis.name !== axisName)
    ) {
      this._xAxis = this.createXAxisComponent(axisName ?? 'normal')
    }
    this._xAxis.override(xAxis)
    this.setAxisCursor(this._xAxis.scrollZoomEnabled)
    return this
  }

  getXAxisComponent (): XAxis {
    return this._xAxis
  }

  private createXAxisComponent (name: string): XAxis {
    const XAxisClass = getXAxisClass(name)
    return new XAxisClass(this)
  }

  override createMainWidget (container: HTMLElement): DrawWidget<DrawPane<XAxis>> {
    return new XAxisWidget(container, this)
  }
}
```

## File: Store.ts
```typescript
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

import type Nullable from './common/Nullable'
import type PickPartial from './common/PickPartial'
import type DeepPartial from './common/DeepPartial'
import type { KLineData, VisibleRangeData } from './common/Data'
import type VisibleRange from './common/VisibleRange'
import type Coordinate from './common/Coordinate'
import { getDefaultVisibleRange } from './common/VisibleRange'
import TaskScheduler from './common/TaskScheduler'
import type Crosshair from './common/Crosshair'
import type BarSpace from './common/BarSpace'
import type { Period } from './common/Period'
import { SymbolDefaultPrecisionConstants, type SymbolInfo } from './common/SymbolInfo'

import Action from './common/Action'
import type { ActionType, ActionCallback } from './common/Action'
import { formatValue, formatTimestampByTemplate, formatBigNumber, formatThousands, formatFoldDecimal } from './common/utils/format'
import { getDefaultStyles, type Styles, type TooltipLegend } from './common/Styles'
import { isArray, isString, isValid, isNumber, isBoolean, merge } from './common/utils/typeChecks'
import { createId } from './common/utils/id'
import { binarySearchNearest } from './common/utils/number'
import { logWarn } from './common/utils/logger'
import { UpdateLevel } from './common/Updater'
import type { DataLoader, DataLoaderGetBarsParams, DataLoadMore, DataLoadType } from './common/DataLoader'

import type { Options, Formatter, ThousandsSeparator, DecimalFold, FormatDateType, FormatDateParams, FormatBigNumber, FormatExtendText, FormatExtendTextParams, ZoomAnchor, ZoomAnchorType, LayoutBasicParams, Hotkey } from './Options'

import type { IndicatorOverride, IndicatorCreate, IndicatorFilter, Indicator } from './component/Indicator'
import type IndicatorImp from './component/Indicator'
import { getIndicatorClass } from './extension/indicator/index'

import type OverlayImp from './component/Overlay'
import { type OverlayCreate, OVERLAY_ID_PREFIX, type OverlayFilter, type OverlayFigure, type OverlayOverride } from './component/Overlay'
import { getOverlayInnerClass } from './extension/overlay/index'

import { getStyles as getExtensionStyles } from './extension/styles/index'

import { PaneIdConstants, PANE_DEFAULT_HEIGHT, PANE_MIN_HEIGHT } from './pane/types'

import type Chart from './Chart'
import type ExcludePickPartial from './common/ExcludePickPartial'

const BarSpaceLimitConstants = {
  MIN: 1,
  MAX: 50
}

const DEFAULT_LAYOUT_BASIC_PARAMS: Required<LayoutBasicParams> = {
  barSpaceLimitMin: BarSpaceLimitConstants.MIN,
  barSpaceLimitMax: BarSpaceLimitConstants.MAX,
  yAxisPosition: 'right',
  yAxisInside: false,
  paneMinHeight: PANE_MIN_HEIGHT,
  paneHeight: PANE_DEFAULT_HEIGHT
}

type ScrollLimitRole = 'bar_count' | 'distance'

export interface ProgressOverlayInfo {
  paneId: string
  overlay: OverlayImp
  appointPaneFlag: boolean
}

export type EventOverlayInfoFigureType = 'none' | 'point' | 'other'

export interface EventOverlayInfo {
  paneId: string
  overlay: Nullable<OverlayImp>
  figureType: EventOverlayInfoFigureType
  figureIndex: number
  figure: Nullable<OverlayFigure>
}

type ProcessOverlayEventCallback = (overlay: OverlayImp, figure: Nullable<OverlayFigure>) => boolean

const DEFAULT_BAR_SPACE = 10

const DEFAULT_OFFSET_RIGHT_DISTANCE = 80

const BAR_GAP_RATIO = 0.2

export const SCALE_MULTIPLIER = 10

export const DEFAULT_MIN_TIME_SPAN = 15 * 60 * 1000

export interface Store {
  setStyles: (value: string | DeepPartial<Styles>) => void
  getStyles: () => Styles
  setFormatter: (formatter: Partial<Formatter>) => void
  getFormatter: () => Formatter
  setLocale: (locale: string) => void
  getLocale: () => string
  setTimezone: (timezone: string) => void
  getTimezone: () => string
  setThousandsSeparator: (thousandsSeparator: Partial<ThousandsSeparator>) => void
  getThousandsSeparator: () => ThousandsSeparator
  setDecimalFold: (decimalFold: Partial<DecimalFold>) => void
  getDecimalFold: () => DecimalFold
  setHotkey: (hotkey: Partial<Hotkey>) => void
  getHotkey: () => Hotkey
  getHotKey: () => Hotkey
  setSymbol: (symbol: PickPartial<SymbolInfo, 'pricePrecision' | 'volumePrecision'>) => void
  getSymbol: () => Nullable<SymbolInfo>
  setPeriod: (period: Period) => void
  getPeriod: () => Nullable<Period>
  getDataList: () => KLineData[]
  setOffsetRightDistance: (distance: number) => void
  getOffsetRightDistance: () => number
  setMaxOffsetLeftDistance: (distance: number) => void
  setMaxOffsetRightDistance: (distance: number) => void
  setLeftMinVisibleBarCount: (barCount: number) => void
  setRightMinVisibleBarCount: (barCount: number) => void
  setBarSpace: (space: number) => void
  getBarSpace: () => BarSpace
  getVisibleRange: () => VisibleRange
  setDataLoader: (dataLoader: DataLoader) => void
  overrideIndicator: (override: IndicatorCreate) => boolean
  removeIndicator: (filter?: IndicatorFilter) => boolean
  overrideOverlay: (override: Partial<OverlayCreate>) => boolean
  removeOverlay: (filter?: OverlayFilter) => boolean
  setZoomEnabled: (enabled: boolean) => void
  isZoomEnabled: () => boolean
  setZoomAnchor: (anchor: ZoomAnchorType | Partial<ZoomAnchor>) => void
  getZoomAnchor: () => ZoomAnchor
  setScrollEnabled: (enabled: boolean) => void
  isScrollEnabled: () => boolean
  resetData: () => void
}

export default class StoreImp implements Store {
  /**
   * Internal chart
   */
  private readonly _chart: Chart

  /**
   * Styles
   */
  private readonly _styles = getDefaultStyles()

  /**
   * Custom api
   */
  private readonly _formatter = {
    formatDate: ({
      dateTimeFormat,
      timestamp,
      template
    }: FormatDateParams) => formatTimestampByTemplate(dateTimeFormat, timestamp, template),
    formatBigNumber,
    formatExtendText: (_: FormatExtendTextParams) => ''
  }

  /**
   * Inner formatter
   * @description Internal use only
   */
  private readonly _innerFormatter = {
    formatDate: (timestamp: number, template: string, type: FormatDateType) => this._formatter.formatDate({ dateTimeFormat: this._dateTimeFormat, timestamp, template, type }),
    formatBigNumber: (value: number | string) => this._formatter.formatBigNumber(value),
    formatExtendText: (params: FormatExtendTextParams) => this._formatter.formatExtendText(params)
  }

  /**
   * Locale
   */
  private _locale = 'en-US'

  /**
   * Thousands separator
   */
  private readonly _thousandsSeparator = {
    sign: ',',
    format: (value: string | number) => formatThousands(value, this._thousandsSeparator.sign)
  }

  /**
   * Decimal fold
   */
  private readonly _decimalFold = {
    threshold: 3,
    format: (value: string | number) => formatFoldDecimal(value, this._decimalFold.threshold)
  }

  /**
   * Hotkey
   */
  private readonly _hotKey = {
    enabled: true,
    exclude: []
  }

  /**
   * Symbol
   */
  private _symbol: Nullable<SymbolInfo> = null

  /**
   * Period
   */
  private _period: Nullable<Period> = null

  /**
   * Data source
   */
  private _dataList: KLineData[] = []

  /**
   * Load more data callback
   */
  private _dataLoader: Nullable<DataLoader> = null

  /**
   * Is loading data flag
   */
  private _loading = false

  /**
  * Whether there are forward and backward more flag
   */
  private readonly _dataLoadMore = { forward: false, backward: false }

  /**
     * Time format
     */
  private _dateTimeFormat: Intl.DateTimeFormat

  /**
   * Scale enabled flag
   */
  private _zoomEnabled = true

  /**
   * Zoom anchor point flag
   */
  private readonly _zoomAnchor: ZoomAnchor = {
    main: 'cursor',
    xAxis: 'cursor'
  }

  /**
   * Scroll enabled flag
   */
  private _scrollEnabled = true

  /**
   * Total space of drawing area
   */
  private _totalBarSpace = 0

  /**
   * Space occupied by a single piece of data
   */
  private _barSpace = DEFAULT_BAR_SPACE

  /**
   * The space of the draw bar
   */
  private _gapBarSpace: number

  private readonly _layoutBasicParams = { ...DEFAULT_LAYOUT_BASIC_PARAMS }

  /**
   * Distance from the last data to the right of the drawing area
   */
  private _offsetRightDistance = DEFAULT_OFFSET_RIGHT_DISTANCE

  /**
   * The number of bar calculated from the distance of the last data to the right of the drawing area
   */
  private _lastBarRightSideDiffBarCount: number

  /**
   * The number of bar to the right of the drawing area from the last data when scrolling starts
   */
  private _startLastBarRightSideDiffBarCount = 0

  /**
   * Scroll limit role
   */
  private _scrollLimitRole: ScrollLimitRole = 'bar_count'

  /**
   * Scroll to the leftmost and rightmost visible bar
   */
  private readonly _minVisibleBarCount = { left: 2, right: 2 }

  /**
   * Scroll to the leftmost and rightmost distance
   */
  private readonly _maxOffsetDistance = { left: 50, right: 50 }

  /**
   * Start and end points of visible area data index
   */
  private _visibleRange = getDefaultVisibleRange()

  /**
   * Visible data array
   */
  private _visibleRangeDataList: VisibleRangeData[] = []

  /**
   * Visible highest lowest price data
   */
  private _visibleRangeHighLowPrice = [
    { x: 0, price: Number.MIN_SAFE_INTEGER },
    { x: 0, price: Number.MAX_SAFE_INTEGER }
  ]

  /**
   * Crosshair info
   */
  private _crosshair: Crosshair = {}

  /**
   * Actions
   */
  private readonly _actions = new Map<ActionType, Action>()

  /**
   * Indicator
   */
  private readonly _indicators = new Map<string, IndicatorImp[]>()

  /**
   * Task scheduler
   */
  private readonly _taskScheduler: TaskScheduler

  /**
   * Overlay
   */
  private readonly _overlays = new Map<string, OverlayImp[]>()

  /**
   * Overlay information in painting
   */
  private _progressOverlayInfo: Nullable<ProgressOverlayInfo> = null

  private _lastPriceMarkExtendTextUpdateTimers: Array<ReturnType<typeof setTimeout>> = []

  /**
   * Overlay information by the mouse pressed
   */
  private _pressedOverlayInfo: EventOverlayInfo = {
    paneId: '',
    overlay: null,
    figureType: 'none',
    figureIndex: -1,
    figure: null
  }

  /**
   * Overlay information by hover
   */
  private _hoverOverlayInfo: EventOverlayInfo = {
    paneId: '',
    overlay: null,
    figureType: 'none',
    figureIndex: -1,
    figure: null
  }

  /**
   * Overlay information by the mouse click
   */
  private _clickOverlayInfo: EventOverlayInfo = {
    paneId: '',
    overlay: null,
    figureType: 'none',
    figureIndex: -1,
    figure: null
  }

  constructor (chart: Chart, options?: Options) {
    this._chart = chart
    const { styles, locale, timezone, formatter, thousandsSeparator, decimalFold, zoomAnchor, hotkey, layout } = options ?? {}
    if (isValid(layout) && !isArray(layout)) {
      merge(this._layoutBasicParams, layout.basicParams)
    }
    this._calcOptimalBarSpace()
    this._lastBarRightSideDiffBarCount = this._offsetRightDistance / this._barSpace

    if (isValid(styles)) {
      this.setStyles(styles)
    }
    if (isString(locale)) {
      this.setLocale(locale)
    }
    this.setTimezone(timezone ?? '')
    if (isValid(formatter)) {
      this.setFormatter(formatter)
    }
    if (isValid(thousandsSeparator)) {
      this.setThousandsSeparator(thousandsSeparator)
    }
    if (isValid(decimalFold)) {
      this.setDecimalFold(decimalFold)
    }

    if (isValid(zoomAnchor)) {
      this.setZoomAnchor(zoomAnchor)
    }

    if (isValid(hotkey)) {
      this.setHotkey(hotkey)
    }

    this._taskScheduler = new TaskScheduler(() => {
      this._chart.layout({
        measureWidth: true,
        update: true,
        buildYAxisTick: true
      })
    })
  }

  setStyles (value: string | DeepPartial<Styles>): void {
    let styles: Nullable<DeepPartial<Styles>> = null
    if (isString(value)) {
      styles = getExtensionStyles(value)
    } else {
      styles = value
    }
    merge(this._styles, styles)
    // `candle.tooltip.custom` should override
    if (isArray(styles?.candle?.tooltip?.legend?.template)) {
      this._styles.candle.tooltip.legend.template = styles.candle.tooltip.legend.template as TooltipLegend[]
    }
    if (isValid(styles?.candle?.priceMark?.last?.extendTexts)) {
      this._clearLastPriceMarkExtendTextUpdateTimer()
      const intervals: number[] = []
      this._styles.candle.priceMark.last.extendTexts.forEach(item => {
        const updateInterval = item.updateInterval
        if (item.show && updateInterval > 0 && !intervals.includes(updateInterval)) {
          intervals.push(updateInterval)
          const timer = setInterval(() => {
            this._chart.updatePane(UpdateLevel.Main, PaneIdConstants.CANDLE)
          }, updateInterval)
          this._lastPriceMarkExtendTextUpdateTimers.push(timer)
        }
      })
    }
  }

  getStyles (): Styles { return this._styles }

  setFormatter (formatter: Partial<Formatter>): void {
    merge(this._formatter, formatter)
  }

  getFormatter (): Formatter { return this._formatter }

  getInnerFormatter (): {
    formatDate: (timestamp: number, template: string, type: FormatDateType) => string
    formatBigNumber: FormatBigNumber,
    formatExtendText: FormatExtendText
    } {
    return this._innerFormatter
  }

  setLocale (locale: string): void { this._locale = locale }

  getLocale (): string { return this._locale }

  setTimezone (timezone: string): void {
    if (
      !isValid(this._dateTimeFormat) ||
      (this.getTimezone() !== timezone)
    ) {
      const options: Intl.DateTimeFormatOptions = {
        hour12: false,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }
      if (timezone.length > 0) {
        options.timeZone = timezone
      }
      let dateTimeFormat: Nullable<Intl.DateTimeFormat> = null
      try {
        dateTimeFormat = new Intl.DateTimeFormat('en', options)
      } catch (e) {
        logWarn('', '', 'Timezone is error!!!')
      }
      if (dateTimeFormat !== null) {
        this._dateTimeFormat = dateTimeFormat
      }
    }
  }

  getTimezone (): string { return this._dateTimeFormat.resolvedOptions().timeZone }

  getDateTimeFormat (): Intl.DateTimeFormat {
    return this._dateTimeFormat
  }

  setThousandsSeparator (thousandsSeparator: Partial<ThousandsSeparator>): void {
    merge(this._thousandsSeparator, thousandsSeparator)
  }

  getThousandsSeparator (): ThousandsSeparator { return this._thousandsSeparator }

  setDecimalFold (decimalFold: Partial<DecimalFold>): void { merge(this._decimalFold, decimalFold) }

  getDecimalFold (): DecimalFold { return this._decimalFold }

  setHotkey (hotkey: Partial<Hotkey>): void { merge(this._hotKey, hotkey) }

  getHotkey (): Hotkey { return this._hotKey }

  getHotKey (): Hotkey { return this._hotKey }

  setSymbol (symbol: PickPartial<SymbolInfo, 'pricePrecision' | 'volumePrecision'>): void {
    this.resetData(() => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment -- ignore
      // @ts-expect-error
      this._symbol = {
        pricePrecision: SymbolDefaultPrecisionConstants.PRICE,
        volumePrecision: SymbolDefaultPrecisionConstants.VOLUME,
        ...this._symbol,
        ...symbol
      }
      this._synchronizeIndicatorSeriesPrecision()
    })
  }

  getSymbol (): Nullable<SymbolInfo> {
    return this._symbol
  }

  setPeriod (period: Period): void {
    this.resetData(() => {
      this._period = period
    })
  }

  getPeriod (): Nullable<Period> {
    return this._period
  }

  getDataList (): KLineData[] {
    return this._dataList
  }

  getVisibleRangeDataList (): VisibleRangeData[] {
    return this._visibleRangeDataList
  }

  getVisibleRangeHighLowPrice (): Array<{ price: number; x: number }> {
    return this._visibleRangeHighLowPrice
  }

  private _addData (
    data: KLineData | KLineData[],
    type: DataLoadType,
    more?: DataLoadMore
  ): void {
    let success = false
    let adjustFlag = false
    if (isArray<KLineData>(data)) {
      const realMore = { backward: false, forward: false }
      if (isBoolean(more)) {
        realMore.backward = more
        realMore.forward = more
      } else {
        realMore.backward = more?.backward ?? false
        realMore.forward = more?.forward ?? false
      }
      switch (type) {
        case 'init': {
          this._clearData()
          this._dataList = data
          this._dataLoadMore.backward = realMore.backward
          this._dataLoadMore.forward = realMore.forward
          this.setOffsetRightDistance(this._offsetRightDistance)
          adjustFlag = true
          break
        }
        case 'backward': {
          this._dataList = this._dataList.concat(data)
          this._dataLoadMore.backward = realMore.backward
          this._lastBarRightSideDiffBarCount -= data.length
          // scroll start LastBarRightSideDiffBarCount should sub data length
          this._startLastBarRightSideDiffBarCount -= data.length
          adjustFlag = data.length > 0
          break
        }
        case 'forward': {
          this._dataList = data.concat(this._dataList)
          this._dataLoadMore.forward = realMore.forward
          adjustFlag = data.length > 0
          break
        }
        default: {
          break
        }
      }
      success = true
    } else {
      const dataCount = this._dataList.length
      // Determine where individual data should be added
      const timestamp = data.timestamp
      const lastDataTimestamp = formatValue(this._dataList[dataCount - 1], 'timestamp', 0) as number
      if (timestamp > lastDataTimestamp) {
        this._dataList.push(data)
        let lastBarRightSideDiffBarCount = this.getLastBarRightSideDiffBarCount()
        if (lastBarRightSideDiffBarCount < 0) {
          this.setLastBarRightSideDiffBarCount(--lastBarRightSideDiffBarCount)
        }
        success = true
        adjustFlag = true
      } else if (timestamp === lastDataTimestamp) {
        this._dataList[dataCount - 1] = data
        success = true
        adjustFlag = true
      }
    }
    if (success && adjustFlag) {
      this._adjustVisibleRange()
      this.setCrosshair(this._crosshair, { notInvalidate: true })
      const filterIndicators = this.getIndicatorsByFilter({})
      if (filterIndicators.length > 0) {
        this._calcIndicator(filterIndicators)
      } else {
        this._chart.layout({
          measureWidth: true,
          update: true,
          buildYAxisTick: true,
          cacheYAxisWidth: type !== 'init'
        })
      }
    }
  }

  setDataLoader (dataLoader: DataLoader): void {
    this.resetData(() => {
      this._dataLoader = dataLoader
    })
  }

  private _calcOptimalBarSpace (): void {
    const specialBarSpace = 4
    const ratio = 1 - BAR_GAP_RATIO * Math.atan(Math.max(specialBarSpace, this._barSpace) - specialBarSpace) / (Math.PI * 0.5)
    let gapBarSpace = Math.min(Math.floor(this._barSpace * ratio), Math.floor(this._barSpace))
    if (gapBarSpace % 2 === 0 && gapBarSpace + 2 >= this._barSpace) {
      --gapBarSpace
    }
    this._gapBarSpace = Math.max(1, gapBarSpace)
  }

  private _adjustVisibleRange (): void {
    const totalBarCount = this._dataList.length
    const visibleBarCount = this._totalBarSpace / this._barSpace

    let leftMinVisibleBarCount = 0
    let rightMinVisibleBarCount = 0

    if (this._scrollLimitRole === 'distance') {
      leftMinVisibleBarCount = (this._totalBarSpace - this._maxOffsetDistance.right) / this._barSpace
      rightMinVisibleBarCount = (this._totalBarSpace - this._maxOffsetDistance.left) / this._barSpace
    } else {
      leftMinVisibleBarCount = this._minVisibleBarCount.left
      rightMinVisibleBarCount = this._minVisibleBarCount.right
    }

    leftMinVisibleBarCount = Math.max(0, leftMinVisibleBarCount)
    rightMinVisibleBarCount = Math.max(0, rightMinVisibleBarCount)

    const maxRightOffsetBarCount = visibleBarCount - Math.min(leftMinVisibleBarCount, totalBarCount)
    if (this._lastBarRightSideDiffBarCount > maxRightOffsetBarCount) {
      this._lastBarRightSideDiffBarCount = maxRightOffsetBarCount
    }

    const minRightOffsetBarCount = -totalBarCount + Math.min(rightMinVisibleBarCount, totalBarCount)
    if (this._lastBarRightSideDiffBarCount < minRightOffsetBarCount) {
      this._lastBarRightSideDiffBarCount = minRightOffsetBarCount
    }
    let to = Math.round(this._lastBarRightSideDiffBarCount + totalBarCount + 0.5)
    const realTo = to
    if (to > totalBarCount) {
      to = totalBarCount
    }
    let from = Math.round(to - visibleBarCount) - 1
    if (from < 0) {
      from = 0
    }
    const realFrom = this._lastBarRightSideDiffBarCount > 0 ? Math.round(totalBarCount + this._lastBarRightSideDiffBarCount - visibleBarCount) - 1 : from
    this._visibleRange = { from, to, realFrom, realTo }
    this.executeAction('onVisibleRangeChange', this._visibleRange)
    this._visibleRangeDataList = []
    this._visibleRangeHighLowPrice = [
      { x: 0, price: Number.MIN_SAFE_INTEGER },
      { x: 0, price: Number.MAX_SAFE_INTEGER }
    ]
    for (let i = realFrom; i < realTo; i++) {
      const kLineData = this._dataList[i]
      const x = this.dataIndexToCoordinate(i)
      this._visibleRangeDataList.push({
        dataIndex: i,
        x,
        data: {
          prev: this._dataList[i - 1] ?? kLineData,
          current: kLineData,
          next: this._dataList[i + 1] ?? kLineData
        }
      })
      if (isValid(kLineData)) {
        if (this._visibleRangeHighLowPrice[0].price < kLineData.high) {
          this._visibleRangeHighLowPrice[0].price = kLineData.high
          this._visibleRangeHighLowPrice[0].x = x
        }
        if (this._visibleRangeHighLowPrice[1].price > kLineData.low) {
          this._visibleRangeHighLowPrice[1].price = kLineData.low
          this._visibleRangeHighLowPrice[1].x = x
        }
      }
    }
    // More processing and loading, more loading if there are callback methods and no data is being loaded
    if (from === 0) {
      if (this._dataLoadMore.forward) {
        this._processDataLoad('forward')
      }
    } else if (to === totalBarCount) {
      if (this._dataLoadMore.backward) {
        this._processDataLoad('backward')
      }
    }
  }

  private _processDataLoad (type: DataLoadType): void {
    if (!this._loading && isValid(this._dataLoader) && isValid(this._symbol) && isValid(this._period)) {
      this._loading = true
      const params: DataLoaderGetBarsParams = {
        type,
        symbol: this._symbol,
        period: this._period,
        timestamp: null,
        callback: (data: KLineData[], more?: DataLoadMore) => {
          this._loading = false
          this._addData(data, type, more)
          if (type === 'init') {
            this._dataLoader?.subscribeBar?.({
              symbol: this._symbol!,
              period: this._period!,
              callback: (data: KLineData) => {
                this._addData(data, 'update')
              }
            })
          }
        }
      }
      switch (type) {
        case 'backward': {
          params.timestamp = this._dataList[this._dataList.length - 1]?.timestamp ?? null
          break
        }
        case 'forward': {
          params.timestamp = this._dataList[0]?.timestamp ?? null
          break
        }
        default: {
          break
        }
      }
      void this._dataLoader.getBars(params)
    }
  }

  private _processDataUnsubscribe (): void {
    if (isValid(this._dataLoader) && isValid(this._symbol) && isValid(this._period)) {
      this._dataLoader.unsubscribeBar?.({
        symbol: this._symbol,
        period: this._period
      })
    }
  }

  resetData (fn?: () => void): void {
    this._processDataUnsubscribe()
    fn?.()
    this._loading = false
    this._processDataLoad('init')
  }

  getBarSpace (): BarSpace {
    return {
      bar: this._barSpace,
      halfBar: this._barSpace / 2,
      gapBar: this._gapBarSpace,
      halfGapBar: Math.floor(this._gapBarSpace / 2)
    }
  }

  setBarSpace (barSpace: number, adjustBeforeFunc?: () => void): void {
    if (
      barSpace < this._layoutBasicParams.barSpaceLimitMin ||
      barSpace > this._layoutBasicParams.barSpaceLimitMax ||
      this._barSpace === barSpace
    ) {
      return
    }
    this._barSpace = barSpace
    this._calcOptimalBarSpace()
    adjustBeforeFunc?.()
    this._adjustVisibleRange()
    this.setCrosshair(this._crosshair, { notInvalidate: true })
    this._chart.layout({
      measureWidth: true,
      update: true,
      buildYAxisTick: true,
      cacheYAxisWidth: true
    })
  }

  getLayoutBasicParams (): Required<LayoutBasicParams> {
    return this._layoutBasicParams
  }

  setTotalBarSpace (totalSpace: number): void {
    if (this._totalBarSpace !== totalSpace) {
      this._totalBarSpace = totalSpace
      this._adjustVisibleRange()
      this.setCrosshair(this._crosshair, { notInvalidate: true })
    }
  }

  setOffsetRightDistance (distance: number, isUpdate?: boolean): this {
    this._offsetRightDistance = this._scrollLimitRole === 'distance' ? Math.min(this._maxOffsetDistance.right, distance) : distance
    this._lastBarRightSideDiffBarCount = this._offsetRightDistance / this._barSpace
    if (isUpdate ?? false) {
      this._adjustVisibleRange()
      this.setCrosshair(this._crosshair, { notInvalidate: true })
      this._chart.layout({
        measureWidth: true,
        update: true,
        buildYAxisTick: true,
        cacheYAxisWidth: true
      })
    }
    return this
  }

  getInitialOffsetRightDistance (): number {
    return this._offsetRightDistance
  }

  getOffsetRightDistance (): number {
    return Math.max(0, this._lastBarRightSideDiffBarCount * this._barSpace)
  }

  getLastBarRightSideDiffBarCount (): number {
    return this._lastBarRightSideDiffBarCount
  }

  setLastBarRightSideDiffBarCount (barCount: number): void {
    this._lastBarRightSideDiffBarCount = barCount
  }

  setMaxOffsetLeftDistance (distance: number): void {
    this._scrollLimitRole = 'distance'
    this._maxOffsetDistance.left = distance
  }

  setMaxOffsetRightDistance (distance: number): void {
    this._scrollLimitRole = 'distance'
    this._maxOffsetDistance.right = distance
  }

  setLeftMinVisibleBarCount (barCount: number): void {
    this._scrollLimitRole = 'bar_count'
    this._minVisibleBarCount.left = barCount
  }

  setRightMinVisibleBarCount (barCount: number): void {
    this._scrollLimitRole = 'bar_count'
    this._minVisibleBarCount.right = barCount
  }

  getVisibleRange (): VisibleRange {
    return this._visibleRange
  }

  startScroll (): void {
    this._startLastBarRightSideDiffBarCount = this._lastBarRightSideDiffBarCount
  }

  scroll (distance: number): void {
    if (!this._scrollEnabled) {
      return
    }
    const distanceBarCount = distance / this._barSpace
    const prevLastBarRightSideDistance = this._lastBarRightSideDiffBarCount * this._barSpace
    this._lastBarRightSideDiffBarCount = this._startLastBarRightSideDiffBarCount - distanceBarCount
    this._adjustVisibleRange()
    this.setCrosshair(this._crosshair, { notInvalidate: true })
    this._chart.layout({
      measureWidth: true,
      update: true,
      buildYAxisTick: true,
      cacheYAxisWidth: true
    })
    const realDistance = Math.round(
      prevLastBarRightSideDistance - this._lastBarRightSideDiffBarCount * this._barSpace
    )
    if (realDistance !== 0) {
      this.executeAction('onScroll', { distance: realDistance })
    }
  }

  getDataByDataIndex (dataIndex: number): Nullable<KLineData> {
    return this._dataList[dataIndex] ?? null
  }

  coordinateToFloatIndex (x: number): number {
    const dataCount = this._dataList.length
    const deltaFromRight = (this._totalBarSpace - x) / this._barSpace
    const index = dataCount + this._lastBarRightSideDiffBarCount - deltaFromRight
    return Math.round(index * 1000000) / 1000000
  }

  dataIndexToTimestamp (dataIndex: number): Nullable<number> {
    const length = this._dataList.length
    if (length === 0) {
      return null
    }
    const data = this.getDataByDataIndex(dataIndex)
    if (isValid(data)) {
      return data.timestamp
    }
    if (isValid(this._period)) {
      const lastIndex = length - 1
      let referenceTimestamp: Nullable<number | null> = null
      let diff = 0
      if (dataIndex > lastIndex) {
        referenceTimestamp = this._dataList[lastIndex].timestamp
        diff = dataIndex - lastIndex
      } else if (dataIndex < 0) {
        referenceTimestamp = this._dataList[0].timestamp
        diff = dataIndex
      }
      if (isNumber(referenceTimestamp)) {
        const { type, span } = this._period
        switch (type) {
          case 'second': {
            return referenceTimestamp + span * 1000 * diff
          }
          case 'minute': {
            return referenceTimestamp + span * 60 * 1000 * diff
          }
          case 'hour': {
            return referenceTimestamp + span * 60 * 60 * 1000 * diff
          }
          case 'day': {
            return referenceTimestamp + span * 24 * 60 * 60 * 1000 * diff
          }
          case 'week': {
            return referenceTimestamp + span * 7 * 24 * 60 * 60 * 1000 * diff
          }
          case 'month': {
            const date = new Date(referenceTimestamp)
            const referenceDay = date.getDate()

            date.setDate(1)

            date.setMonth(date.getMonth() + span * diff)
            const lastDayOfTargetMonth = new Date(
              date.getFullYear(),
              date.getMonth() + 1,
              0
            ).getDate()
            date.setDate(Math.min(referenceDay, lastDayOfTargetMonth))
            return date.getTime()
          }
          case 'year': {
            const date = new Date(referenceTimestamp)
            date.setFullYear(date.getFullYear() + span * diff)
            return date.getTime()
          }
        }
      }
    }
    return null
  }

  timestampToDataIndex (timestamp: number): number {
    const length = this._dataList.length
    if (length === 0) {
      return 0
    }
    if (isValid(this._period)) {
      let referenceTimestamp: Nullable<number | null> = null
      let baseDataIndex = 0

      const lastIndex = length - 1
      const lastTimestamp = this._dataList[lastIndex].timestamp
      if (timestamp > lastTimestamp) {
        referenceTimestamp = lastTimestamp
        baseDataIndex = lastIndex
      }
      const firstTimestamp = this._dataList[0].timestamp
      if (timestamp < firstTimestamp) {
        referenceTimestamp = firstTimestamp
        baseDataIndex = 0
      }
      if (isNumber(referenceTimestamp)) {
        const { type, span } = this._period
        switch (type) {
          case 'second': {
            return baseDataIndex + Math.floor((timestamp - referenceTimestamp) / (span * 1000))
          }
          case 'minute': {
            return baseDataIndex + Math.floor((timestamp - referenceTimestamp) / (span * 60 * 1000))
          }
          case 'hour': {
            return baseDataIndex + Math.floor((timestamp - referenceTimestamp) / (span * 60 * 60 * 1000))
          }
          case 'day': {
            return baseDataIndex + Math.floor((timestamp - referenceTimestamp) / (span * 24 * 60 * 60 * 1000))
          }
          case 'week': {
            return baseDataIndex + Math.floor((timestamp - referenceTimestamp) / (span * 7 * 24 * 60 * 60 * 1000))
          }
          case 'month': {
            const referenceDate = new Date(referenceTimestamp)
            const currentDate = new Date(timestamp)
            const referenceYear = referenceDate.getFullYear()
            const currentYear = currentDate.getFullYear()
            const referenceMonth = referenceDate.getMonth()
            const currentMonth = currentDate.getMonth()
            return baseDataIndex + Math.floor(((currentYear - referenceYear) * 12 + (currentMonth - referenceMonth)) / span)
          }
          case 'year': {
            const referenceYear = new Date(referenceTimestamp).getFullYear()
            const currentYear = new Date(timestamp).getFullYear()
            return baseDataIndex + Math.floor((currentYear - referenceYear) / span)
          }
        }
      }
    }
    return binarySearchNearest(this._dataList, 'timestamp', timestamp)
  }

  dataIndexToCoordinate (dataIndex: number): number {
    const dataCount = this._dataList.length
    const deltaFromRight = dataCount + this._lastBarRightSideDiffBarCount - dataIndex
    return Math.floor(this._totalBarSpace - (deltaFromRight - 0.5) * this._barSpace + 0.5)
  }

  coordinateToDataIndex (x: number): number {
    return Math.ceil(this.coordinateToFloatIndex(x)) - 1
  }

  /**
   * Converts a float data index to an interpolated timestamp.
   * This allows sub-bar precision for smooth freehand drawings.
   * Supports extrapolation beyond the data range (drawing in the "future").
   * @param floatIndex - A floating point index (e.g., 42.75)
   * @returns An interpolated timestamp between two bars
   */
  floatIndexToTimestamp (floatIndex: number): Nullable<number> {
    const length = this._dataList.length
    if (length === 0) {
      return null
    }

    const lastIndex = length - 1

    // Handle float index beyond the last bar (extrapolate into the future)
    if (floatIndex > lastIndex && length >= 2) {
      const lastTimestamp = this._dataList[lastIndex].timestamp
      const secondLastTimestamp = this._dataList[lastIndex - 1].timestamp
      const barDuration = lastTimestamp - secondLastTimestamp
      if (barDuration > 0) {
        const barsBeyondLast = floatIndex - lastIndex
        return Math.round(lastTimestamp + barsBeyondLast * barDuration)
      }
    }

    // Handle float index before the first bar (extrapolate into the past)
    if (floatIndex < 0 && length >= 2) {
      const firstTimestamp = this._dataList[0].timestamp
      const secondTimestamp = this._dataList[1].timestamp
      const barDuration = secondTimestamp - firstTimestamp
      if (barDuration > 0) {
        return Math.round(firstTimestamp + floatIndex * barDuration)
      }
    }

    // Normal case: interpolate between two bars within the data range
    const intIndex = Math.floor(floatIndex)
    const fraction = floatIndex - intIndex

    // Get timestamp at the integer index
    const timestampAtInt = this.dataIndexToTimestamp(intIndex)

    // If no fractional part, return the integer timestamp
    if (fraction === 0 || !isNumber(timestampAtInt)) {
      return timestampAtInt
    }

    // Get timestamp at the next index for interpolation
    const timestampAtNext = this.dataIndexToTimestamp(intIndex + 1)

    if (isNumber(timestampAtNext)) {
      // Linear interpolation between the two timestamps
      return Math.round(timestampAtInt + (timestampAtNext - timestampAtInt) * fraction)
    }

    return timestampAtInt
  }

  /**
   * Converts a precise timestamp to a float data index.
   * This preserves sub-bar precision for smooth freehand drawings across timeframe changes.
   * Supports extrapolation beyond the data range (drawing in the "future").
   * @param timestamp - A precise timestamp (possibly between or beyond bars)
   * @returns A floating point index representing the exact position
   */
  timestampToFloatIndex (timestamp: number): number {
    const length = this._dataList.length
    if (length === 0) {
      return 0
    }

    const firstTimestamp = this._dataList[0].timestamp
    const lastTimestamp = this._dataList[length - 1].timestamp

    // Handle timestamp beyond the last bar (drawing in the "future")
    if (timestamp > lastTimestamp && length >= 2) {
      // Calculate average bar duration from the last two bars
      const secondLastTimestamp = this._dataList[length - 2].timestamp
      const barDuration = lastTimestamp - secondLastTimestamp
      if (barDuration > 0) {
        const timeBeyondLast = timestamp - lastTimestamp
        const barsBeyond = timeBeyondLast / barDuration
        return length - 1 + barsBeyond
      }
    }

    // Handle timestamp before the first bar
    if (timestamp < firstTimestamp && length >= 2) {
      const secondTimestamp = this._dataList[1].timestamp
      const barDuration = secondTimestamp - firstTimestamp
      if (barDuration > 0) {
        const timeBeforeFirst = firstTimestamp - timestamp
        const barsBefore = timeBeforeFirst / barDuration
        return -barsBefore
      }
    }

    // Find the floor bar index using binary search
    // We need the bar where barTimestamp <= timestamp < nextBarTimestamp
    let left = 0
    let right = length - 1
    let floorIndex = 0

    while (left <= right) {
      const mid = Math.floor((left + right) / 2)
      const midTimestamp = this._dataList[mid].timestamp

      if (midTimestamp <= timestamp) {
        floorIndex = mid
        left = mid + 1
      } else {
        right = mid - 1
      }
    }

    // Get the floor bar and the next bar for interpolation
    const dataAtFloor = this._dataList[floorIndex]
    const dataAtNext = floorIndex + 1 < length ? this._dataList[floorIndex + 1] : null

    if (isValid(dataAtFloor) && isValid(dataAtNext)) {
      const timestampAtFloor = dataAtFloor.timestamp
      const timestampAtNext = dataAtNext.timestamp

      // Calculate fractional position between the two bars
      if (timestamp >= timestampAtFloor && timestampAtNext > timestampAtFloor) {
        const fraction = (timestamp - timestampAtFloor) / (timestampAtNext - timestampAtFloor)
        return floorIndex + Math.min(fraction, 1) // Clamp to max 1
      }
    }

    return floorIndex
  }

  zoom (scale: number, coordinate: Nullable<Partial<Coordinate>>, position: 'main' | 'xAxis'): void {
    if (!this._zoomEnabled) {
      return
    }
    const zoomCoordinate: Partial<Coordinate> = coordinate ?? { x: this._crosshair.x ?? this._totalBarSpace / 2 }

    if (position === 'xAxis') {
      if (this._zoomAnchor.xAxis === 'last_bar') {
        zoomCoordinate.x = this.dataIndexToCoordinate(this._dataList.length - 1)
      }
    } else {
      if (this._zoomAnchor.main === 'last_bar') {
        zoomCoordinate.x = this.dataIndexToCoordinate(this._dataList.length - 1)
      }
    }
    const x = zoomCoordinate.x!
    const floatIndex = this.coordinateToFloatIndex(x)
    const prevBarSpace = this._barSpace
    const barSpace = this._barSpace + scale * (this._barSpace / SCALE_MULTIPLIER)
    this.setBarSpace(barSpace, () => {
      this._lastBarRightSideDiffBarCount += (floatIndex - this.coordinateToFloatIndex(x))
    })
    const realScale = this._barSpace / prevBarSpace
    if (realScale !== 1) {
      this.executeAction('onZoom', { scale: realScale })
    }
  }

  setZoomEnabled (enabled: boolean): void {
    this._zoomEnabled = enabled
  }

  isZoomEnabled (): boolean {
    return this._zoomEnabled
  }

  setZoomAnchor (anchor: ZoomAnchorType | Partial<ZoomAnchor>): void {
    if (isString(anchor)) {
      this._zoomAnchor.main = anchor
      this._zoomAnchor.xAxis = anchor
    } else {
      if (isString(anchor.main)) {
        this._zoomAnchor.main = anchor.main
      }
      if (isString(anchor.xAxis)) {
        this._zoomAnchor.xAxis = anchor.xAxis
      }
    }
  }

  getZoomAnchor (): ZoomAnchor {
    return { ...this._zoomAnchor }
  }

  setScrollEnabled (enabled: boolean): void {
    this._scrollEnabled = enabled
  }

  isScrollEnabled (): boolean {
    return this._scrollEnabled
  }

  setCrosshair (
    crosshair?: Nullable<Crosshair>,
    options?: { notInvalidate?: boolean, notExecuteAction?: boolean, forceInvalidate?: boolean }
  ): void {
    const { notInvalidate, notExecuteAction, forceInvalidate } = options ?? {}
    const cr = crosshair ?? {}
    let realDataIndex = 0
    let dataIndex = 0
    if (isNumber(cr.x)) {
      realDataIndex = this.coordinateToDataIndex(cr.x)
      if (realDataIndex < 0) {
        dataIndex = 0
      } else if (realDataIndex > this._dataList.length - 1) {
        dataIndex = this._dataList.length - 1
      } else {
        dataIndex = realDataIndex
      }
    } else {
      realDataIndex = this._dataList.length - 1
      dataIndex = realDataIndex
    }
    const kLineData: Nullable<KLineData> = this._dataList[dataIndex]
    const realX = this.dataIndexToCoordinate(realDataIndex)
    const prevCrosshair = { x: this._crosshair.x, y: this._crosshair.y, paneId: this._crosshair.paneId }
    this._crosshair = { ...cr, realX, kLineData, realDataIndex, dataIndex, timestamp: this.dataIndexToTimestamp(realDataIndex) ?? undefined }
    if (
      prevCrosshair.x !== cr.x ||
      prevCrosshair.y !== cr.y ||
      prevCrosshair.paneId !== cr.paneId ||
      (forceInvalidate ?? false)
    ) {
      if (isValid(kLineData) && !(notExecuteAction ?? false) && this.hasAction('onCrosshairChange') && isString(this._crosshair.paneId)) {
        this.executeAction('onCrosshairChange', crosshair)
      }
      if (!(notInvalidate ?? false)) {
        this._chart.updatePane(UpdateLevel.Overlay)
      }
    }
  }

  getCrosshair (): Crosshair {
    return this._crosshair
  }

  executeAction (type: ActionType, data?: unknown): void {
    this._actions.get(type)?.execute(data)
  }

  subscribeAction (type: ActionType, callback: ActionCallback): void {
    if (!this._actions.has(type)) {
      this._actions.set(type, new Action())
    }
    this._actions.get(type)?.subscribe(callback)
  }

  unsubscribeAction (type: ActionType, callback?: ActionCallback): void {
    const action = this._actions.get(type)
    if (isValid(action)) {
      action.unsubscribe(callback)
      if (action.isEmpty()) {
        this._actions.delete(type)
      }
    }
  }

  hasAction (type: ActionType): boolean {
    const action = this._actions.get(type)
    return isValid(action) && !action.isEmpty()
  }

  private _sortIndicators (paneId?: string): void {
    if (isString(paneId)) {
      this._indicators.get(paneId)?.sort((i1, i2) => i1.zLevel - i2.zLevel)
    } else {
      this._indicators.forEach(paneIndicators => {
        paneIndicators.sort((i1, i2) => i1.zLevel - i2.zLevel)
      })
    }
  }

  private _calcIndicator (data: IndicatorImp | IndicatorImp[]): void {
    let indicators: IndicatorImp[] = []
    indicators = indicators.concat(data)
    if (indicators.length > 0) {
      const tasks: Record<string, Promise<unknown>> = {}
      indicators.forEach(indicator => {
        tasks[indicator.id] = indicator.calcImp(this._dataList)
      })
      this._taskScheduler.add(tasks)
    }
  }

  addIndicator (create: ExcludePickPartial<Indicator, 'id' | 'name' | 'paneId'>, isStack: boolean): boolean {
    const { name } = create
    const filterIndicators = this.getIndicatorsByFilter(create)
    if (filterIndicators.length > 0) {
      return false
    }
    const paneId = create.paneId
    let paneIndicators = this.getIndicatorsByPaneId(paneId)
    const IndicatorClazz = getIndicatorClass(name)!
    const indicator = new IndicatorClazz()

    this._synchronizeIndicatorSeriesPrecision(indicator)
    indicator.override(create)
    if (!isStack) {
      this.removeIndicator({ paneId })
      paneIndicators = []
    }
    paneIndicators.push(indicator)
    this._indicators.set(paneId, paneIndicators)
    this._sortIndicators(paneId)
    this._calcIndicator(indicator)
    return true
  }

  getIndicatorsByPaneId (paneId: string): IndicatorImp[] {
    return this._indicators.get(paneId) ?? []
  }

  getIndicatorsByFilter (filter: IndicatorFilter): IndicatorImp[] {
    const { paneId, name, id } = filter
    const match: ((overlay: IndicatorImp) => boolean) = indicator => {
      if (isValid(id)) {
        return indicator.id === id
      }
      return !isValid(name) || indicator.name === name
    }
    let indicators: IndicatorImp[] = []
    if (isValid(paneId)) {
      indicators = indicators.concat(this.getIndicatorsByPaneId(paneId).filter(match))
    } else {
      this._indicators.forEach(paneIndicators => {
        indicators = indicators.concat(paneIndicators.filter(match))
      })
    }
    return indicators
  }

  removeIndicator (filter: IndicatorFilter): boolean {
    let removed = false
    const filterIndicators = this.getIndicatorsByFilter(filter)
    filterIndicators.forEach(indicator => {
      const paneIndicators = this.getIndicatorsByPaneId(indicator.paneId)
      const index = paneIndicators.findIndex(ins => ins.id === indicator.id)
      if (index > -1) {
        paneIndicators.splice(index, 1)
        removed = true
      }
      if (paneIndicators.length === 0) {
        this._indicators.delete(indicator.paneId)
      }
    })
    return removed
  }

  hasIndicators (paneId: string): boolean {
    return this._indicators.has(paneId)
  }

  private _synchronizeIndicatorSeriesPrecision (indicator?: IndicatorImp): void {
    if (isValid(this._symbol)) {
      const {
        pricePrecision = SymbolDefaultPrecisionConstants.PRICE,
        volumePrecision = SymbolDefaultPrecisionConstants.VOLUME
      } = this._symbol
      const synchronize: ((indicator: IndicatorImp) => void) = indicator => {
        switch (indicator.series) {
          case 'price': {
            indicator.setSeriesPrecision(pricePrecision)
            break
          }
          case 'volume': {
            indicator.setSeriesPrecision(volumePrecision)
            break
          }
          default: { break }
        }
      }

      if (isValid(indicator)) {
        synchronize(indicator)
      } else {
        this._indicators.forEach(paneIndicators => {
          paneIndicators.forEach(indicator => {
            synchronize(indicator)
          })
        })
      }
    }
  }

  overrideIndicator (override: IndicatorOverride): boolean {
    let updateFlag = false
    let sortFlag = false
    const filterIndicators = this.getIndicatorsByFilter(override)
    filterIndicators.forEach(indicator => {
      const prevPaneId = indicator.paneId
      indicator.override(override)
      const currentPaneId = indicator.paneId
      if (prevPaneId !== currentPaneId) {
        const prevPaneIndicators = this.getIndicatorsByPaneId(prevPaneId)
        const index = prevPaneIndicators.findIndex(ins => ins.id === indicator.id)
        if (index > -1) {
          prevPaneIndicators.splice(index, 1)
        }
        if (prevPaneIndicators.length === 0) {
          this._indicators.delete(prevPaneId)
        }
        const currentPaneIndicators = this.getIndicatorsByPaneId(currentPaneId)
        if (!currentPaneIndicators.some(ins => ins.id === indicator.id)) {
          currentPaneIndicators.push(indicator)
          this._indicators.set(currentPaneId, currentPaneIndicators)
        }
        sortFlag = true
      }
      const { calc, draw, sort } = indicator.shouldUpdateImp()
      if (sort) {
        sortFlag = true
      }
      if (calc) {
        this._calcIndicator(indicator)
      } else {
        if (draw) {
          updateFlag = true
        }
      }
    })

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- ignore
    if (sortFlag) {
      this._sortIndicators()
    }
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- ignore
    return updateFlag || sortFlag
  }

  getOverlaysByFilter (filter: OverlayFilter): OverlayImp[] {
    const { id, groupId, paneId, name } = filter
    const match: ((overlay: OverlayImp) => boolean) = overlay => {
      if (isValid(id)) {
        return overlay.id === id
      } else {
        if (isValid(groupId)) {
          return overlay.groupId === groupId && (!isValid(name) || overlay.name === name)
        }
      }
      return !isValid(name) || overlay.name === name
    }

    let overlays: OverlayImp[] = []
    if (isValid(paneId)) {
      overlays = overlays.concat(this.getOverlaysByPaneId(paneId).filter(match))
    } else {
      this._overlays.forEach(paneOverlays => {
        overlays = overlays.concat(paneOverlays.filter(match))
      })
    }
    const progressOverlay = this._progressOverlayInfo?.overlay
    if (isValid(progressOverlay) && match(progressOverlay)) {
      overlays.push(progressOverlay)
    }
    return overlays
  }

  getOverlaysByPaneId (paneId?: string): OverlayImp[] {
    if (!isString(paneId)) {
      let overlays: OverlayImp[] = []
      this._overlays.forEach(paneOverlays => {
        overlays = overlays.concat(paneOverlays)
      })
      return overlays
    }
    return this._overlays.get(paneId) ?? []
  }

  private _sortOverlays (paneId?: string): void {
    if (isString(paneId)) {
      this._overlays.get(paneId)?.sort((o1, o2) => o1.zLevel - o2.zLevel)
    } else {
      this._overlays.forEach(paneOverlays => {
        paneOverlays.sort((o1, o2) => o1.zLevel - o2.zLevel)
      })
    }
  }

  addOverlays (os: OverlayCreate[], appointPaneFlags: boolean[]): Array<Nullable<string>> {
    const updatePaneIds: string[] = []
    const ids = os.map((create, index) => {
      if (isValid(create.id)) {
        let findOverlay: Nullable<OverlayImp> = null
        for (const item of this._overlays) {
          const overlays = item[1]
          const overlay = overlays.find(o => o.id === create.id)
          if (isValid(overlay)) {
            findOverlay = overlay
            break
          }
        }
        if (isValid(findOverlay)) {
          return create.id
        }
      }
      const OverlayClazz = getOverlayInnerClass(create.name)
      if (isValid(OverlayClazz)) {
        const id = create.id ?? createId(OVERLAY_ID_PREFIX)
        const overlay = new OverlayClazz()
        const paneId = create.paneId ?? PaneIdConstants.CANDLE
        create.id = id
        create.groupId ??= id
        const zLevel = this.getOverlaysByPaneId(paneId).length
        create.zLevel ??= zLevel
        overlay.override(create)
        if (!updatePaneIds.includes(paneId)) {
          updatePaneIds.push(paneId)
        }
        if (overlay.isDrawing()) {
          this._progressOverlayInfo = { paneId, overlay, appointPaneFlag: appointPaneFlags[index] }
        } else {
          if (!this._overlays.has(paneId)) {
            this._overlays.set(paneId, [])
          }
          this._overlays.get(paneId)?.push(overlay)
        }
        if (overlay.isStart()) {
          overlay.onDrawStart?.(({ overlay, chart: this._chart }))
        }
        return id
      }
      return null
    })
    if (updatePaneIds.length > 0) {
      this._sortOverlays()
      updatePaneIds.forEach(paneId => {
        this._chart.updatePane(UpdateLevel.Overlay, paneId)
      })
      this._chart.updatePane(UpdateLevel.Overlay, PaneIdConstants.X_AXIS)
    }
    return ids
  }

  getProgressOverlayInfo (): Nullable<ProgressOverlayInfo> {
    return this._progressOverlayInfo
  }

  progressOverlayComplete (): void {
    if (this._progressOverlayInfo !== null) {
      const { overlay, paneId } = this._progressOverlayInfo
      if (!overlay.isDrawing()) {
        if (!this._overlays.has(paneId)) {
          this._overlays.set(paneId, [])
        }
        this._overlays.get(paneId)?.push(overlay)
        this._sortOverlays(paneId)
        this._progressOverlayInfo = null
      }
    }
  }

  updateProgressOverlayInfo (paneId: string, appointPaneFlag?: boolean): void {
    if (this._progressOverlayInfo !== null) {
      if (isBoolean(appointPaneFlag) && appointPaneFlag) {
        this._progressOverlayInfo.appointPaneFlag = appointPaneFlag
      }
      this._progressOverlayInfo.paneId = paneId
      this._progressOverlayInfo.overlay.override({ paneId })
    }
  }

  overrideOverlay (override: OverlayOverride): boolean {
    let sortFlag = false
    const updatePaneIds: string[] = []
    const filterOverlays = this.getOverlaysByFilter(override)
    filterOverlays.forEach(overlay => {
      overlay.override(override)
      const { sort, draw } = overlay.shouldUpdate()
      if (sort) {
        sortFlag = true
      }
      if (sort || draw) {
        if (!updatePaneIds.includes(overlay.paneId)) {
          updatePaneIds.push(overlay.paneId)
        }
      }
    })

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- ignore
    if (sortFlag) {
      this._sortOverlays()
    }
    if (updatePaneIds.length > 0) {
      updatePaneIds.forEach(paneId => {
        this._chart.updatePane(UpdateLevel.Overlay, paneId)
      })
      this._chart.updatePane(UpdateLevel.Overlay, PaneIdConstants.X_AXIS)
      return true
    }
    return false
  }

  removeOverlay (filter: OverlayFilter): boolean {
    const updatePaneIds: string[] = []
    const filterOverlays = this.getOverlaysByFilter(filter)
    filterOverlays.forEach(overlay => {
      const paneId = overlay.paneId
      const paneOverlays = this.getOverlaysByPaneId(overlay.paneId)
      overlay.onRemoved?.({ overlay, chart: this._chart })
      if (!updatePaneIds.includes(paneId)) {
        updatePaneIds.push(paneId)
      }
      if (overlay.isDrawing()) {
        this._progressOverlayInfo = null
      } else {
        const index = paneOverlays.findIndex(o => o.id === overlay.id)
        if (index > -1) {
          paneOverlays.splice(index, 1)
        }
      }
      if (paneOverlays.length === 0) {
        this._overlays.delete(paneId)
      }
    })
    if (updatePaneIds.length > 0) {
      updatePaneIds.forEach(paneId => {
        this._chart.updatePane(UpdateLevel.Overlay, paneId)
      })
      this._chart.updatePane(UpdateLevel.Overlay, PaneIdConstants.X_AXIS)
      return true
    }
    return false
  }

  setPressedOverlayInfo (info: EventOverlayInfo): void {
    this._pressedOverlayInfo = info
  }

  getPressedOverlayInfo (): EventOverlayInfo {
    return this._pressedOverlayInfo
  }

  setHoverOverlayInfo (
    info: EventOverlayInfo,
    processOnMouseEnterEvent: ProcessOverlayEventCallback,
    processOnMouseLeaveEvent: ProcessOverlayEventCallback
  ): void {
    const { overlay, figureType, figureIndex, figure } = this._hoverOverlayInfo
    const infoOverlay = info.overlay
    if (
      overlay?.id !== infoOverlay?.id ||
      figureType !== info.figureType ||
      figureIndex !== info.figureIndex
    ) {
      this._hoverOverlayInfo = info
      if (overlay?.id !== infoOverlay?.id) {
        let ignoreUpdateFlag = false
        let sortFlag = false
        if (overlay !== null) {
          overlay.override({ zLevel: overlay.getPrevZLevel() })
          sortFlag = true
          if (processOnMouseLeaveEvent(overlay, figure)) {
            ignoreUpdateFlag = true
          }
        }

        if (infoOverlay !== null) {
          infoOverlay.setPrevZLevel(infoOverlay.zLevel)
          infoOverlay.override({ zLevel: Number.MAX_SAFE_INTEGER })
          sortFlag = true
          if (processOnMouseEnterEvent(infoOverlay, info.figure)) {
            ignoreUpdateFlag = true
          }
        }
        if (sortFlag) {
          this._sortOverlays()
        }
        if (!ignoreUpdateFlag) {
          this._chart.updatePane(UpdateLevel.Overlay)
        }
      }
    }
  }

  getHoverOverlayInfo (): EventOverlayInfo {
    return this._hoverOverlayInfo
  }

  setClickOverlayInfo (
    info: EventOverlayInfo,
    processOnSelectedEvent: ProcessOverlayEventCallback,
    processOnDeselectedEvent: ProcessOverlayEventCallback
  ): void {
    const { paneId, overlay, figureType, figure, figureIndex } = this._clickOverlayInfo
    const infoOverlay = info.overlay
    if (overlay?.id !== infoOverlay?.id || figureType !== info.figureType || figureIndex !== info.figureIndex) {
      this._clickOverlayInfo = info
      if (overlay?.id !== infoOverlay?.id) {
        if (isValid(overlay)) {
          processOnDeselectedEvent(overlay, figure)
        }
        if (isValid(infoOverlay)) {
          processOnSelectedEvent(infoOverlay, info.figure)
        }
        this._chart.updatePane(UpdateLevel.Overlay, info.paneId)
        if (paneId !== info.paneId) {
          this._chart.updatePane(UpdateLevel.Overlay, paneId)
        }
        this._chart.updatePane(UpdateLevel.Overlay, PaneIdConstants.X_AXIS)
      }
    }
  }

  getClickOverlayInfo (): EventOverlayInfo {
    return this._clickOverlayInfo
  }

  isOverlayEmpty (): boolean {
    return this._overlays.size === 0 && this._progressOverlayInfo === null
  }

  isOverlayDrawing (): boolean {
    return this._progressOverlayInfo?.overlay.isDrawing() ?? false
  }

  private _clearLastPriceMarkExtendTextUpdateTimer (): void {
    this._lastPriceMarkExtendTextUpdateTimers.forEach(timer => {
      clearInterval(timer)
    })
    this._lastPriceMarkExtendTextUpdateTimers = []
  }

  private _clearData (): void {
    this._dataLoadMore.backward = false
    this._dataLoadMore.forward = false
    this._loading = false
    this._dataList = []
    this._visibleRangeDataList = []
    this._visibleRangeHighLowPrice = [
      { x: 0, price: Number.MIN_SAFE_INTEGER },
      { x: 0, price: Number.MAX_SAFE_INTEGER }
    ]
    this._visibleRange = getDefaultVisibleRange()
    this._crosshair = {}
  }

  getChart (): Chart {
    return this._chart
  }

  destroy (): void {
    this._clearData()
    this._clearLastPriceMarkExtendTextUpdateTimer()
    this._taskScheduler.clear()
    this._overlays.clear()
    this._indicators.clear()
    this._actions.clear()
  }
}
```

## File: view/AxisView.ts
```typescript
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

import type Bounding from '../common/Bounding'
import type { AxisStyle, Styles } from '../common/Styles'

import type { LineAttrs } from '../extension/figure/line'
import type { TextAttrs } from '../extension/figure/text'

import type { AxisTick, Axis } from '../component/Axis'

import View from './View'

export default abstract class AxisView<C extends Axis = Axis> extends View<C> {
  override drawImp (ctx: CanvasRenderingContext2D): void {
    const widget = this.getWidget()
    const pane = widget.getPane()
    const bounding = widget.getBounding()
    const axis = this.getAxis()
    const styles: AxisStyle = this.getAxisStyles(pane.getChart().getStyles())
    if (styles.show) {
      if (styles.axisLine.show) {
        this.createFigure({
          name: 'line',
          attrs: this.createAxisLine(bounding, styles),
          styles: styles.axisLine
        })?.draw(ctx)
      }
      const ticks = axis.getTicks()
      if (styles.tickLine.show) {
        const lines = this.createTickLines(ticks, bounding, styles)
        lines.forEach(line => {
          this.createFigure({
            name: 'line',
            attrs: line,
            styles: styles.tickLine
          })?.draw(ctx)
        })
      }
      if (styles.tickText.show) {
        const texts = this.createTickTexts(ticks, bounding, styles)
        this.createFigure({
          name: 'text',
          attrs: texts,
          styles: styles.tickText
        })?.draw(ctx)
      }
    }
  }

  protected abstract getAxisStyles (styles: Styles): AxisStyle

  protected abstract getAxis (): Axis

  protected abstract createAxisLine (bounding: Bounding, styles: AxisStyle): LineAttrs
  protected abstract createTickLines (ticks: AxisTick[], bounding: Bounding, styles: AxisStyle): LineAttrs[]
  protected abstract createTickTexts (tick: AxisTick[], bounding: Bounding, styles: AxisStyle): TextAttrs[]
}
```

## File: view/CandleAreaView.ts
```typescript
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

import type Coordinate from '../common/Coordinate'
import type { GradientColor } from '../common/Styles'
import Animation from '../common/Animation'
import { isNumber, isArray, isValid } from '../common/utils/typeChecks'
import { UpdateLevel } from '../common/Updater'

import ChildrenView from './ChildrenView'

import { lineTo } from '../extension/figure/line'
import type Nullable from '../common/Nullable'

export default class CandleAreaView extends ChildrenView {
  private readonly _ripplePoint = this.createFigure({
    name: 'circle',
    attrs: {
      x: 0,
      y: 0,
      r: 0
    },
    styles: {
      style: 'fill'
    }
  })

  private _animationFrameTime = 0

  private readonly _animation = new Animation({ iterationCount: Infinity }).doFrame((time) => {
    this._animationFrameTime = time
    const pane = this.getWidget().getPane()
    pane.getChart().updatePane(UpdateLevel.Main, pane.getId())
  })

  override drawImp (ctx: CanvasRenderingContext2D): void {
    const widget = this.getWidget()
    const pane = widget.getPane()
    const chart = pane.getChart()
    const dataList = chart.getDataList()
    const lastDataIndex = dataList.length - 1
    const bounding = widget.getBounding()
    const yAxis = pane.getYAxisComponentById()
    const styles = chart.getStyles().candle.area
    const coordinates: Coordinate[] = []
    let minY = Number.MAX_SAFE_INTEGER
    let areaStartX: number = Number.MIN_SAFE_INTEGER
    let ripplePointCoordinate: Nullable<Coordinate> = null
    this.eachChildren((data) => {
      const x = data.x
      const { current: kLineData } = data.data
      const value = kLineData?.[styles.value]
      if (isNumber(value)) {
        const y = yAxis.convertToPixel(value)
        if (areaStartX === Number.MIN_SAFE_INTEGER) {
          areaStartX = x
        }
        coordinates.push({ x, y })
        minY = Math.min(minY, y)
        if (data.dataIndex === lastDataIndex) {
          ripplePointCoordinate = { x, y }
        }
      }
    })

    if (coordinates.length > 0) {
      this.createFigure({
        name: 'line',
        attrs: { coordinates },
        styles: {
          color: styles.lineColor,
          size: styles.lineSize,
          smooth: styles.smooth
        }
      }
      )?.draw(ctx)

      // render area
      const backgroundColor = styles.backgroundColor
      let color: string | CanvasGradient = ''
      if (isArray<GradientColor>(backgroundColor)) {
        const gradient = ctx.createLinearGradient(0, bounding.height, 0, minY)
        try {
          backgroundColor.forEach(({ offset, color }) => {
            gradient.addColorStop(offset, color)
          })
        } catch (e) {
        }
        color = gradient
      } else {
        color = backgroundColor
      }
      ctx.fillStyle = color
      ctx.beginPath()
      ctx.moveTo(areaStartX, bounding.height)
      ctx.lineTo(coordinates[0].x, coordinates[0].y)
      lineTo(ctx, coordinates, styles.smooth)
      ctx.lineTo(coordinates[coordinates.length - 1].x, bounding.height)
      ctx.closePath()
      ctx.fill()
    }

    const pointStyles = styles.point
    if (pointStyles.show && isValid(ripplePointCoordinate)) {
      this.createFigure({
        name: 'circle',
        attrs: {
          x: ripplePointCoordinate!.x,
          y: ripplePointCoordinate!.y,
          r: pointStyles.radius
        },
        styles: {
          style: 'fill',
          color: pointStyles.color
        }
      })?.draw(ctx)
      let rippleRadius = pointStyles.rippleRadius
      if (pointStyles.animation) {
        rippleRadius = pointStyles.radius + this._animationFrameTime / pointStyles.animationDuration * (pointStyles.rippleRadius - pointStyles.radius)
        this._animation.setDuration(pointStyles.animationDuration).start()
      }
      this._ripplePoint
        ?.setAttrs({
          x: ripplePointCoordinate!.x,
          y: ripplePointCoordinate!.y,
          r: rippleRadius
        })
        .setStyles({ style: 'fill', color: pointStyles.rippleColor }).draw(ctx)
    } else {
      this.stopAnimation()
    }
  }

  stopAnimation (): void {
    this._animation.stop()
  }
}
```

## File: view/CandleBarView.ts
```typescript
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

import type Nullable from '../common/Nullable'
import type { VisibleRangeData } from '../common/Data'
import type BarSpace from '../common/BarSpace'
import { isValid } from '../common/utils/typeChecks'
import type { EventHandler } from '../common/EventHandler'
import type { CandleType, CandleBarColor, RectStyle } from '../common/Styles'

import type { FigureCreate } from '../component/Figure'
import type { RectAttrs } from '../extension/figure/rect'

import ChildrenView from './ChildrenView'

import { PaneIdConstants } from '../pane/types'
import { DEFAULT_AXIS_ID } from '../component/Axis'

export interface CandleBarOptions {
  yAxisId: string
  type: Exclude<CandleType, 'area'>
  styles: CandleBarColor
}

export default class CandleBarView extends ChildrenView {
  private readonly _boundCandleBarClickEvent = (data: VisibleRangeData) => () => {
    this.getWidget().getPane().getChart().getChartStore().executeAction('onCandleBarClick', data)
    return false
  }

  override drawImp (ctx: CanvasRenderingContext2D): void {
    const pane = this.getWidget().getPane()
    const isMain = pane.getId() === PaneIdConstants.CANDLE
    const chartStore = pane.getChart().getChartStore()
    const candleBarOptions = this.getCandleBarOptions()
    if (candleBarOptions !== null) {
      const { type, styles } = candleBarOptions
      let ohlcSize = 0
      let halfOhlcSize = 0
      if (candleBarOptions.type === 'ohlc') {
        const { gapBar } = chartStore.getBarSpace()
        ohlcSize = Math.min(Math.max(Math.round(gapBar * 0.2), 1), 8)
        if (ohlcSize > 2 && ohlcSize % 2 === 1) {
          ohlcSize--
        }
        halfOhlcSize = Math.floor(ohlcSize / 2)
      }
      const yAxis = pane.getYAxisComponentById(candleBarOptions.yAxisId)
      this.eachChildren((visibleData, barSpace) => {
        const { x, data: { current, prev } } = visibleData
        if (isValid(current)) {
          const { open, high, low, close } = current
          const comparePrice = styles.compareRule === 'current_open' ? open : (prev?.close ?? close)
          const colors: string[] = []
          if (close > comparePrice) {
            colors[0] = styles.upColor
            colors[1] = styles.upBorderColor
            colors[2] = styles.upWickColor
          } else if (close < comparePrice) {
            colors[0] = styles.downColor
            colors[1] = styles.downBorderColor
            colors[2] = styles.downWickColor
          } else {
            colors[0] = styles.noChangeColor
            colors[1] = styles.noChangeBorderColor
            colors[2] = styles.noChangeWickColor
          }
          const openY = yAxis.convertToPixel(open)
          const closeY = yAxis.convertToPixel(close)
          const priceY = [
            openY, closeY,
            yAxis.convertToPixel(high),
            yAxis.convertToPixel(low)
          ]
          priceY.sort((a, b) => a - b)

          const correction = barSpace.gapBar % 2 === 0 ? 1 : 0
          let rects: Array<FigureCreate<RectAttrs | RectAttrs[], Partial<RectStyle>>> = []
          switch (type) {
            case 'candle_solid': {
              rects = this._createSolidBar(x, priceY, barSpace, colors, correction)
              break
            }
            case 'candle_stroke': {
              rects = this._createStrokeBar(x, priceY, barSpace, colors, correction)
              break
            }
            case 'candle_up_stroke': {
              if (close > open) {
                rects = this._createStrokeBar(x, priceY, barSpace, colors, correction)
              } else {
                rects = this._createSolidBar(x, priceY, barSpace, colors, correction)
              }
              break
            }
            case 'candle_down_stroke': {
              if (open > close) {
                rects = this._createStrokeBar(x, priceY, barSpace, colors, correction)
              } else {
                rects = this._createSolidBar(x, priceY, barSpace, colors, correction)
              }
              break
            }
            case 'ohlc': {
              rects = [
                {
                  name: 'rect',
                  attrs: [
                    {
                      x: x - halfOhlcSize,
                      y: priceY[0],
                      width: ohlcSize,
                      height: priceY[3] - priceY[0]
                    },
                    {
                      x: x - barSpace.halfGapBar,
                      y: openY + ohlcSize > priceY[3] ? priceY[3] - ohlcSize : openY,
                      width: barSpace.halfGapBar - halfOhlcSize,
                      height: ohlcSize
                    },
                    {
                      x: x + halfOhlcSize,
                      y: closeY + ohlcSize > priceY[3] ? priceY[3] - ohlcSize : closeY,
                      width: barSpace.halfGapBar - halfOhlcSize,
                      height: ohlcSize
                    }
                  ],
                  styles: { color: colors[0] }
                }
              ]
              break
            }
          }
          rects.forEach(rect => {
            let handler: Nullable<EventHandler> = null
            if (isMain) {
              handler = {
                mouseClickEvent: this._boundCandleBarClickEvent(visibleData)
              }
            }
            this.createFigure(rect, handler ?? undefined)?.draw(ctx)
          })
        }
      })
    }
  }

  protected getCandleBarOptions (): Nullable<CandleBarOptions> {
    const candleStyles = this.getWidget().getPane().getChart().getStyles().candle
    return {
      yAxisId: DEFAULT_AXIS_ID,
      type: candleStyles.type as Exclude<CandleType, 'area'>,
      styles: candleStyles.bar
    }
  }

  private _createSolidBar (x: number, priceY: number[], barSpace: BarSpace, colors: string[], correction: number): Array<FigureCreate<RectAttrs | RectAttrs[], Partial<RectStyle>>> {
    return [
      {
        name: 'rect',
        attrs: {
          x,
          y: priceY[0],
          width: 1,
          height: priceY[3] - priceY[0]
        },
        styles: { color: colors[2] }
      },
      {
        name: 'rect',
        attrs: {
          x: x - barSpace.halfGapBar,
          y: priceY[1],
          width: barSpace.gapBar + correction,
          height: Math.max(1, priceY[2] - priceY[1])
        },
        styles: {
          style: 'stroke_fill',
          color: colors[0],
          borderColor: colors[1]
        }
      }
    ]
  }

  private _createStrokeBar (x: number, priceY: number[], barSpace: BarSpace, colors: string[], correction: number): Array<FigureCreate<RectAttrs | RectAttrs[], Partial<RectStyle>>> {
    return [
      {
        name: 'rect',
        attrs: [
          {
            x,
            y: priceY[0],
            width: 1,
            height: priceY[1] - priceY[0]
          },
          {
            x,
            y: priceY[2],
            width: 1,
            height: priceY[3] - priceY[2]
          }
        ],
        styles: { color: colors[2] }
      },
      {
        name: 'rect',
        attrs: {
          x: x - barSpace.halfGapBar,
          y: priceY[1],
          width: barSpace.gapBar + correction,
          height: Math.max(1, priceY[2] - priceY[1])
        },
        styles: {
          style: 'stroke',
          borderColor: colors[1]
        }
      }
    ]
  }
}
```

## File: view/CandleHighLowPriceView.ts
```typescript
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

import type Coordinate from '../common/Coordinate'
import type { CandleHighLowPriceMarkStyle } from '../common/Styles'
import { formatPrecision } from '../common/utils/format'
import { SymbolDefaultPrecisionConstants } from '../common/SymbolInfo'

import View from './View'

import type { YAxis } from '../component/YAxis'

export default class CandleHighLowPriceView extends View<YAxis> {
  override drawImp (ctx: CanvasRenderingContext2D): void {
    const widget = this.getWidget()
    const pane = widget.getPane()
    const chartStore = pane.getChart().getChartStore()
    const priceMarkStyles = chartStore.getStyles().candle.priceMark
    const highPriceMarkStyles = priceMarkStyles.high
    const lowPriceMarkStyles = priceMarkStyles.low
    if (priceMarkStyles.show && (highPriceMarkStyles.show || lowPriceMarkStyles.show)) {
      const highestLowestPrice = chartStore.getVisibleRangeHighLowPrice()
      const precision = chartStore.getSymbol()?.pricePrecision ?? SymbolDefaultPrecisionConstants.PRICE
      const yAxis = pane.getYAxisComponentById()

      const { price: high, x: highX } = highestLowestPrice[0]
      const { price: low, x: lowX } = highestLowestPrice[1]
      const highY = yAxis.convertToPixel(high)
      const lowY = yAxis.convertToPixel(low)
      const decimalFold = chartStore.getDecimalFold()
      const thousandsSeparator = chartStore.getThousandsSeparator()
      if (highPriceMarkStyles.show && high !== Number.MIN_SAFE_INTEGER) {
        this._drawMark(
          ctx,
          decimalFold.format(thousandsSeparator.format(formatPrecision(high, precision))),
          { x: highX, y: highY },
          highY < lowY ? [-2, -5] : [2, 5],
          highPriceMarkStyles
        )
      }
      if (lowPriceMarkStyles.show && low !== Number.MAX_SAFE_INTEGER) {
        this._drawMark(
          ctx,
          decimalFold.format(thousandsSeparator.format(formatPrecision(low, precision))),
          { x: lowX, y: lowY },
          highY < lowY ? [2, 5] : [-2, -5],
          lowPriceMarkStyles
        )
      }
    }
  }

  private _drawMark (
    ctx: CanvasRenderingContext2D,
    text: string,
    coordinate: Coordinate,
    offsets: number[],
    styles: CandleHighLowPriceMarkStyle
  ): void {
    const startX = coordinate.x
    const startY = coordinate.y + offsets[0]
    this.createFigure({
      name: 'line',
      attrs: {
        coordinates: [
          { x: startX - 2, y: startY + offsets[0] },
          { x: startX, y: startY },
          { x: startX + 2, y: startY + offsets[0] }
        ]
      },
      styles: { color: styles.color }
    })?.draw(ctx)

    let lineEndX = 0
    let textStartX = 0
    let textAlign = 'left'
    const { width } = this.getWidget().getBounding()
    if (startX > width / 2) {
      lineEndX = startX - 5
      textStartX = lineEndX - styles.textOffset
      textAlign = 'right'
    } else {
      lineEndX = startX + 5
      textAlign = 'left'
      textStartX = lineEndX + styles.textOffset
    }

    const y = startY + offsets[1]
    this.createFigure({
      name: 'line',
      attrs: {
        coordinates: [
          { x: startX, y: startY },
          { x: startX, y },
          { x: lineEndX, y }
        ]
      },
      styles: { color: styles.color }
    })?.draw(ctx)
    this.createFigure({
      name: 'text',
      attrs: {
        x: textStartX,
        y,
        text,
        align: textAlign,
        baseline: 'middle'
      },
      styles: {
        color: styles.color,
        size: styles.textSize,
        family: styles.textFamily,
        weight: styles.textWeight
      }
    })?.draw(ctx)
  }
}
```

## File: view/CandleLastPriceLabelView.ts
```typescript
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

import { isValid } from '../common/utils/typeChecks'
import { calcTextWidth } from '../common/utils/canvas'
import type { TextStyle } from '../common/Styles'
import { SymbolDefaultPrecisionConstants } from '../common/SymbolInfo'

import View from './View'

import type { FigureCreate } from '../component/Figure'
import type YAxis from '../component/YAxis'
import type { TextAttrs } from '../extension/figure/text'

export default class CandleLastPriceLabelView extends View {
  override drawImp (ctx: CanvasRenderingContext2D): void {
    const widget = this.getWidget()
    const pane = widget.getPane()
    const bounding = widget.getBounding()
    const chartStore = pane.getChart().getChartStore()
    const priceMarkStyles = chartStore.getStyles().candle.priceMark
    const lastPriceMarkStyles = priceMarkStyles.last
    const lastPriceMarkTextStyles = lastPriceMarkStyles.text
    if (priceMarkStyles.show && lastPriceMarkStyles.show && lastPriceMarkTextStyles.show) {
      const precision = chartStore.getSymbol()?.pricePrecision ?? SymbolDefaultPrecisionConstants.PRICE
      const yAxis = pane.getYAxisComponentById() as YAxis
      const dataList = chartStore.getDataList()
      const data = dataList[dataList.length - 1]
      if (isValid(data)) {
        const { close, open } = data
        const comparePrice = lastPriceMarkStyles.compareRule === 'current_open' ? open : (dataList[dataList.length - 2]?.close ?? close)
        const priceY = yAxis.convertToNicePixel(close)
        let backgroundColor = ''
        if (close > comparePrice) {
          backgroundColor = lastPriceMarkStyles.upColor
        } else if (close < comparePrice) {
          backgroundColor = lastPriceMarkStyles.downColor
        } else {
          backgroundColor = lastPriceMarkStyles.noChangeColor
        }
        let x = 0
        let textAlgin: CanvasTextAlign = 'left'
        if (yAxis.isFromZero()) {
          x = 0
          textAlgin = 'left'
        } else {
          x = bounding.width
          textAlgin = 'right'
        }

        const textFigures: Array<FigureCreate<TextAttrs, TextStyle>> = []
        const yAxisRange = yAxis.getRange()
        let priceText = yAxis.displayValueToText(
          yAxis.realValueToDisplayValue(
            yAxis.valueToRealValue(close, { range: yAxisRange }),
            { range: yAxisRange }
          ),
          precision
        )
        priceText = chartStore.getDecimalFold().format(chartStore.getThousandsSeparator().format(priceText))
        const { paddingLeft, paddingRight, paddingTop, paddingBottom, size, family, weight } = lastPriceMarkTextStyles
        let textWidth = paddingLeft + calcTextWidth(priceText, size, weight, family) + paddingRight
        const priceTextHeight = paddingTop + size + paddingBottom
        textFigures.push({
          name: 'text',
          attrs: {
            x,
            y: priceY,
            width: textWidth,
            height: priceTextHeight,
            text: priceText,
            align: textAlgin,
            baseline: 'middle'
          },
          styles: {
            ...lastPriceMarkTextStyles,
            backgroundColor
          }
        })
        const formatExtendText = chartStore.getInnerFormatter().formatExtendText
        const priceTextHalfHeight = size / 2
        let aboveY = priceY - priceTextHalfHeight - paddingTop
        let belowY = priceY + priceTextHalfHeight + paddingBottom
        lastPriceMarkStyles.extendTexts.forEach((item, index) => {
          const text = formatExtendText({ type: 'last_price', data, index })
          if (text.length > 0 && item.show) {
            const textHalfHeight = item.size / 2
            let textY = 0
            if (item.position === 'above_price') {
              aboveY -= (item.paddingBottom + textHalfHeight)
              textY = aboveY
              aboveY -= (textHalfHeight + item.paddingTop)
            } else {
              belowY += (item.paddingTop + textHalfHeight)
              textY = belowY
              belowY += (textHalfHeight + item.paddingBottom)
            }
            textWidth = Math.max(textWidth, item.paddingLeft + calcTextWidth(text, item.size, item.weight, item.family) + item.paddingRight)
            textFigures.push({
              name: 'text',
              attrs: {
                x,
                y: textY,
                width: textWidth,
                height: item.paddingTop + item.size + item.paddingBottom,
                text,
                align: textAlgin,
                baseline: 'middle'
              },
              styles: { ...item, backgroundColor }
            })
          }
        })
        textFigures.forEach(figure => {
          figure.attrs.width = textWidth
          this.createFigure(figure)?.draw(ctx)
        })
      }
    }
  }
}
```

## File: view/CandleLastPriceLineView.ts
```typescript
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

import { isValid } from '../common/utils/typeChecks'
import type YAxis from '../component/YAxis'

import View from './View'

export default class CandleLastPriceView extends View {
  override drawImp (ctx: CanvasRenderingContext2D): void {
    const widget = this.getWidget()
    const pane = widget.getPane()
    const bounding = widget.getBounding()
    const chartStore = pane.getChart().getChartStore()
    const priceMarkStyles = chartStore.getStyles().candle.priceMark
    const lastPriceMarkStyles = priceMarkStyles.last
    const lastPriceMarkLineStyles = lastPriceMarkStyles.line
    if (priceMarkStyles.show && lastPriceMarkStyles.show && lastPriceMarkLineStyles.show) {
      const yAxis = pane.getYAxisComponentById() as YAxis
      const dataList = chartStore.getDataList()
      const data = dataList[dataList.length - 1]
      if (isValid(data)) {
        const { close, open } = data
        const comparePrice = lastPriceMarkStyles.compareRule === 'current_open' ? open : (dataList[dataList.length - 2]?.close ?? close)
        const priceY = yAxis.convertToNicePixel(close)
        let color = ''
        if (close > comparePrice) {
          color = lastPriceMarkStyles.upColor
        } else if (close < comparePrice) {
          color = lastPriceMarkStyles.downColor
        } else {
          color = lastPriceMarkStyles.noChangeColor
        }
        this.createFigure({
          name: 'line',
          attrs: {
            coordinates: [
              { x: 0, y: priceY },
              { x: bounding.width, y: priceY }
            ]
          },
          styles: {
            style: lastPriceMarkLineStyles.style,
            color,
            size: lastPriceMarkLineStyles.size,
            dashedValue: lastPriceMarkLineStyles.dashedValue
          }
        })?.draw(ctx)
      }
    }
  }
}
```

## File: view/CandleTooltipView.ts
```typescript
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

import type {
  TooltipLegend, TooltipLegendChild
} from '../common/Styles'
import { formatPrecision, formatTemplateString } from '../common/utils/format'
import { createFont } from '../common/utils/canvas'
import { isFunction, isObject, isValid } from '../common/utils/typeChecks'
import { PeriodTypeCrosshairTooltipFormat } from '../common/Period'
import { SymbolDefaultPrecisionConstants } from '../common/SymbolInfo'

import { PaneIdConstants } from '../pane/types'

import IndicatorTooltipView from './IndicatorTooltipView'

import { i18n } from '../extension/i18n/index'

export default class CandleTooltipView extends IndicatorTooltipView {
  override drawImp (ctx: CanvasRenderingContext2D): void {
    const widget = this.getWidget()
    const chartStore = widget.getPane().getChart().getChartStore()
    const crosshair = chartStore.getCrosshair()
    if (isValid(crosshair.kLineData)) {
      const bounding = widget.getBounding()
      const styles = chartStore.getStyles()
      const candleStyles = styles.candle
      const indicatorStyles = styles.indicator
      if (
        candleStyles.tooltip.showType === 'rect' &&
        indicatorStyles.tooltip.showType === 'rect'
      ) {
        const isDrawCandleTooltip = this.isDrawTooltip(crosshair, candleStyles.tooltip)
        const isDrawIndicatorTooltip = this.isDrawTooltip(crosshair, indicatorStyles.tooltip)
        this._drawRectTooltip(
          ctx, isDrawCandleTooltip, isDrawIndicatorTooltip,
          candleStyles.tooltip.offsetTop
        )
      } else if (
        candleStyles.tooltip.showType === 'standard' &&
        indicatorStyles.tooltip.showType === 'standard'
      ) {
        const { offsetLeft, offsetTop, offsetRight } = candleStyles.tooltip
        const maxWidth = bounding.width - offsetRight
        const top = this._drawCandleStandardTooltip(
          ctx, offsetLeft, offsetTop, maxWidth
        )
        this.drawIndicatorTooltip(ctx, offsetLeft, top, maxWidth)
      } else if (
        candleStyles.tooltip.showType === 'rect' &&
        indicatorStyles.tooltip.showType === 'standard'
      ) {
        const { offsetLeft, offsetTop, offsetRight } = candleStyles.tooltip
        const maxWidth = bounding.width - offsetRight
        const top = this.drawIndicatorTooltip(
          ctx, offsetLeft, offsetTop, maxWidth
        )
        const isDrawCandleTooltip = this.isDrawTooltip(crosshair, candleStyles.tooltip)
        this._drawRectTooltip(
          ctx, isDrawCandleTooltip, false, top
        )
      } else {
        const { offsetLeft, offsetTop, offsetRight } = candleStyles.tooltip
        const maxWidth = bounding.width - offsetRight
        const top = this._drawCandleStandardTooltip(
          ctx, offsetLeft, offsetTop, maxWidth
        )
        const isDrawIndicatorTooltip = this.isDrawTooltip(crosshair, indicatorStyles.tooltip)
        this._drawRectTooltip(
          ctx, false, isDrawIndicatorTooltip, top
        )
      }
    }
  }

  private _drawCandleStandardTooltip (
    ctx: CanvasRenderingContext2D,
    left: number,
    top: number,
    maxWidth: number
  ): number {
    const chartStore = this.getWidget().getPane().getChart().getChartStore()
    const styles = chartStore.getStyles().candle
    const tooltipStyles = styles.tooltip
    const tooltipLegendStyles = tooltipStyles.legend
    let prevRowHeight = 0
    const coordinate = { x: left, y: top }
    const crosshair = chartStore.getCrosshair()
    if (this.isDrawTooltip(crosshair, tooltipStyles)) {
      const tooltipTitleStyles = tooltipStyles.title
      if (tooltipTitleStyles.show) {
        const { type = '', span = '' } = chartStore.getPeriod() ?? {}
        const text = formatTemplateString(tooltipTitleStyles.template, { ...chartStore.getSymbol(), period: `${span}${i18n(type, chartStore.getLocale())}` })
        const color = tooltipTitleStyles.color
        const height = this.drawStandardTooltipLegends(
          ctx, [
            {
              title: { text: '', color },
              value: { text, color }
            }
          ], { x: left, y: top }, left,
          0, maxWidth, tooltipTitleStyles
        )
        coordinate.y = coordinate.y + height
      }

      const legends = this._getCandleTooltipLegends()
      const features = this.classifyTooltipFeatures(tooltipStyles.features)
      prevRowHeight = this.drawStandardTooltipFeatures(
        ctx, features[0], coordinate,
        null, left, prevRowHeight, maxWidth
      )
      prevRowHeight = this.drawStandardTooltipFeatures(
        ctx, features[1], coordinate,
        null, left, prevRowHeight, maxWidth
      )
      if (legends.length > 0) {
        prevRowHeight = this.drawStandardTooltipLegends(
          ctx, legends, coordinate, left,
          prevRowHeight, maxWidth, tooltipLegendStyles
        )
      }

      prevRowHeight = this.drawStandardTooltipFeatures(
        ctx, features[2], coordinate,
        null, left, prevRowHeight, maxWidth
      )
    }
    return coordinate.y + prevRowHeight
  }

  private _drawRectTooltip (
    ctx: CanvasRenderingContext2D,
    isDrawCandleTooltip: boolean,
    isDrawIndicatorTooltip: boolean,
    top: number
  ): void {
    const widget = this.getWidget()
    const pane = widget.getPane()
    const chartStore = pane.getChart().getChartStore()

    const styles = chartStore.getStyles()
    const candleStyles = styles.candle
    const indicatorStyles = styles.indicator
    const candleTooltipStyles = candleStyles.tooltip
    const indicatorTooltipStyles = indicatorStyles.tooltip
    if (isDrawCandleTooltip || isDrawIndicatorTooltip) {
      const candleLegends = this._getCandleTooltipLegends()
      const { offsetLeft, offsetTop, offsetRight, offsetBottom } = candleTooltipStyles

      const {
        marginLeft: baseLegendMarginLeft,
        marginRight: baseLegendMarginRight,
        marginTop: baseLegendMarginTop,
        marginBottom: baseLegendMarginBottom,
        size: baseLegendSize,
        weight: baseLegendWeight,
        family: baseLegendFamily
      } = candleTooltipStyles.legend

      const {
        position: rectPosition,
        paddingLeft: rectPaddingLeft,
        paddingRight: rectPaddingRight,
        paddingTop: rectPaddingTop,
        paddingBottom: rectPaddingBottom,
        offsetLeft: rectOffsetLeft,
        offsetRight: rectOffsetRight,
        offsetTop: rectOffsetTop,
        offsetBottom: rectOffsetBottom,
        borderSize: rectBorderSize,
        borderRadius: rectBorderRadius,
        borderColor: rectBorderColor,
        color: rectBackgroundColor
      } = candleTooltipStyles.rect

      let maxTextWidth = 0
      let rectWidth = 0
      let rectHeight = 0
      if (isDrawCandleTooltip) {
        ctx.font = createFont(baseLegendSize, baseLegendWeight, baseLegendFamily)
        candleLegends.forEach(data => {
          const title = data.title as TooltipLegendChild
          const value = data.value as TooltipLegendChild
          const text = `${title.text}${value.text}`
          const labelWidth = ctx.measureText(text).width + baseLegendMarginLeft + baseLegendMarginRight
          maxTextWidth = Math.max(maxTextWidth, labelWidth)
        })
        rectHeight += ((baseLegendMarginBottom + baseLegendMarginTop + baseLegendSize) * candleLegends.length)
      }

      const {
        marginLeft: indicatorLegendMarginLeft,
        marginRight: indicatorLegendMarginRight,
        marginTop: indicatorLegendMarginTop,
        marginBottom: indicatorLegendMarginBottom,
        size: indicatorLegendSize,
        weight: indicatorLegendWeight,
        family: indicatorLegendFamily
      } = indicatorTooltipStyles.legend
      const indicatorLegendsArray: TooltipLegend[][] = []
      if (isDrawIndicatorTooltip) {
        const indicators = chartStore.getIndicatorsByPaneId(pane.getId())
        ctx.font = createFont(indicatorLegendSize, indicatorLegendWeight, indicatorLegendFamily)
        indicators.forEach(indicator => {
          const tooltipDataLegends = this.getIndicatorTooltipData(indicator).legends
          indicatorLegendsArray.push(tooltipDataLegends)
          tooltipDataLegends.forEach(data => {
            const title = data.title as TooltipLegendChild
            const value = data.value as TooltipLegendChild
            const text = `${title.text}${value.text}`
            const textWidth = ctx.measureText(text).width + indicatorLegendMarginLeft + indicatorLegendMarginRight
            maxTextWidth = Math.max(maxTextWidth, textWidth)
            rectHeight += (indicatorLegendMarginTop + indicatorLegendMarginBottom + indicatorLegendSize)
          })
        })
      }
      rectWidth += maxTextWidth
      if (rectWidth !== 0 && rectHeight !== 0) {
        const crosshair = chartStore.getCrosshair()
        const bounding = widget.getBounding()
        const yAxisBounding = pane.getYAxisWidget()!.getBounding()
        rectWidth += (rectBorderSize * 2 + rectPaddingLeft + rectPaddingRight)
        rectHeight += (rectBorderSize * 2 + rectPaddingTop + rectPaddingBottom)
        const centerX = bounding.width / 2
        const isPointer = rectPosition === 'pointer' && crosshair.paneId === PaneIdConstants.CANDLE
        const isLeft = (crosshair.realX ?? 0) > centerX
        let rectX = 0
        if (isPointer) {
          const realX = crosshair.realX!
          if (isLeft) {
            rectX = realX - rectOffsetRight - rectWidth
          } else {
            rectX = realX + rectOffsetLeft
          }
        } else {
          const yAxis = this.getWidget().getPane().getYAxisComponentById()
          if (isLeft) {
            rectX = rectOffsetLeft + offsetLeft
            if (yAxis.inside && yAxis.position === 'left') {
              rectX += yAxisBounding.width
            }
          } else {
            rectX = bounding.width - rectOffsetRight - rectWidth - offsetRight
            if (yAxis.inside && yAxis.position === 'right') {
              rectX -= yAxisBounding.width
            }
          }
        }

        let rectY = top + rectOffsetTop
        if (isPointer) {
          const y = crosshair.y!
          rectY = y - rectHeight / 2
          if (rectY + rectHeight > bounding.height - rectOffsetBottom - offsetBottom) {
            rectY = bounding.height - rectOffsetBottom - rectHeight - offsetBottom
          }
          if (rectY < top + rectOffsetTop) {
            rectY = top + rectOffsetTop + offsetTop
          }
        }
        this.createFigure({
          name: 'rect',
          attrs: {
            x: rectX,
            y: rectY,
            width: rectWidth,
            height: rectHeight
          },
          styles: {
            style: 'stroke_fill',
            color: rectBackgroundColor,
            borderColor: rectBorderColor,
            borderSize: rectBorderSize,
            borderRadius: rectBorderRadius
          }
        })?.draw(ctx)
        const candleTextX = rectX + rectBorderSize + rectPaddingLeft + baseLegendMarginLeft
        let textY = rectY + rectBorderSize + rectPaddingTop
        if (isDrawCandleTooltip) {
          // render candle texts
          candleLegends.forEach(data => {
            textY += baseLegendMarginTop
            const title = data.title as TooltipLegendChild
            this.createFigure({
              name: 'text',
              attrs: {
                x: candleTextX,
                y: textY,
                text: title.text
              },
              styles: {
                color: title.color,
                size: baseLegendSize,
                family: baseLegendFamily,
                weight: baseLegendWeight
              }
            })?.draw(ctx)
            const value = data.value as TooltipLegendChild
            this.createFigure({
              name: 'text',
              attrs: {
                x: rectX + rectWidth - rectBorderSize - baseLegendMarginRight - rectPaddingRight,
                y: textY,
                text: value.text,
                align: 'right'
              },
              styles: {
                color: value.color,
                size: baseLegendSize,
                family: baseLegendFamily,
                weight: baseLegendWeight
              }
            })?.draw(ctx)
            textY += (baseLegendSize + baseLegendMarginBottom)
          })
        }
        if (isDrawIndicatorTooltip) {
          // render indicator legends
          const indicatorTextX = rectX + rectBorderSize + rectPaddingLeft + indicatorLegendMarginLeft
          indicatorLegendsArray.forEach(legends => {
            legends.forEach(data => {
              textY += indicatorLegendMarginTop
              const title = data.title as TooltipLegendChild
              const value = data.value as TooltipLegendChild
              this.createFigure({
                name: 'text',
                attrs: {
                  x: indicatorTextX,
                  y: textY,
                  text: title.text
                },
                styles: {
                  color: title.color,
                  size: indicatorLegendSize,
                  family: indicatorLegendFamily,
                  weight: indicatorLegendWeight
                }
              })?.draw(ctx)

              this.createFigure({
                name: 'text',
                attrs: {
                  x: rectX + rectWidth - rectBorderSize - indicatorLegendMarginRight - rectPaddingRight,
                  y: textY,
                  text: value.text,
                  align: 'right'
                },
                styles: {
                  color: value.color,
                  size: indicatorLegendSize,
                  family: indicatorLegendFamily,
                  weight: indicatorLegendWeight
                }
              })?.draw(ctx)
              textY += (indicatorLegendSize + indicatorLegendMarginBottom)
            })
          })
        }
      }
    }
  }

  private _getCandleTooltipLegends (): TooltipLegend[] {
    const chartStore = this.getWidget().getPane().getChart().getChartStore()
    const styles = chartStore.getStyles().candle
    const dataList = chartStore.getDataList()
    const formatter = chartStore.getInnerFormatter()
    const decimalFold = chartStore.getDecimalFold()
    const thousandsSeparator = chartStore.getThousandsSeparator()
    const locale = chartStore.getLocale()
    const { pricePrecision = SymbolDefaultPrecisionConstants.PRICE, volumePrecision = SymbolDefaultPrecisionConstants.VOLUME } = chartStore.getSymbol() ?? {}
    const period = chartStore.getPeriod()
    const dataIndex = chartStore.getCrosshair().dataIndex ?? 0

    const tooltipStyles = styles.tooltip
    const { color: textColor, defaultValue, template } = tooltipStyles.legend
    const prev = dataList[dataIndex - 1] ?? null
    const current = dataList[dataIndex]

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- ignore
    const prevClose = prev?.close ?? current.close
    const changeValue = current.close - prevClose
    const mapping = {
      ...current,
      time: formatter.formatDate(current.timestamp, PeriodTypeCrosshairTooltipFormat[period?.type ?? 'day'], 'tooltip'),
      open: decimalFold.format(thousandsSeparator.format(formatPrecision(current.open, pricePrecision))),
      high: decimalFold.format(thousandsSeparator.format(formatPrecision(current.high, pricePrecision))),
      low: decimalFold.format(thousandsSeparator.format(formatPrecision(current.low, pricePrecision))),
      close: decimalFold.format(thousandsSeparator.format(formatPrecision(current.close, pricePrecision))),
      volume: decimalFold.format(thousandsSeparator.format(
        formatter.formatBigNumber(formatPrecision(current.volume ?? defaultValue, volumePrecision))
      )),
      turnover: decimalFold.format(thousandsSeparator.format(
        formatPrecision(current.turnover ?? defaultValue, pricePrecision)
      )),
      change: prevClose === 0 ? defaultValue : `${thousandsSeparator.format(formatPrecision(changeValue / prevClose * 100))}%`
    }
    const legends = (
      isFunction(template)
        ? template({ prev, current, next: dataList[dataIndex + 1] ?? null }, styles)
        : template
    )
    return legends.map(({ title, value }) => {
      let t: TooltipLegendChild = { text: '', color: textColor }
      if (isObject(title)) {
        t = { ...title }
      } else {
        t.text = title
      }
      t.text = i18n(t.text, locale)
      let v = { text: defaultValue, color: textColor }
      if (isObject(value)) {
        v = { ...value }
      } else {
        v.text = value
      }
      if (isValid(/{change}/.exec(v.text))) {
        v.color = changeValue === 0 ? styles.priceMark.last.noChangeColor : (changeValue > 0 ? styles.priceMark.last.upColor : styles.priceMark.last.downColor)
      }
      v.text = formatTemplateString(v.text, mapping)
      return { title: t, value: v }
    })
  }
}
```

## File: view/ChildrenView.ts
```typescript
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

import View from './View'
import type { VisibleRangeData } from '../common/Data'
import type BarSpace from '../common/BarSpace'
import type { YAxis } from '../component/YAxis'

export type EachChildCallback = (
  data: VisibleRangeData,
  barSpace: BarSpace,
  index: number
) => void

export default abstract class ChildrenView extends View<YAxis> {
  protected eachChildren (childCallback: EachChildCallback): void {
    const pane = this.getWidget().getPane()
    const chartStore = pane.getChart().getChartStore()
    const visibleRangeDataList = chartStore.getVisibleRangeDataList()
    const barSpace = chartStore.getBarSpace()
    const dataLength = visibleRangeDataList.length
    let index = 0
    while (index < dataLength) {
      childCallback(visibleRangeDataList[index], barSpace, index)
      ++index
    }
  }
}
```

## File: view/CrosshairFeatureView.ts
```typescript
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

import type Nullable from '../common/Nullable'
import type Crosshair from '../common/Crosshair'
import type { FeatureIconFontStyle, FeaturePathStyle, FeatureStyle } from '../common/Styles'
import { isString } from '../common/utils/typeChecks'
import { calcTextWidth } from '../common/utils/canvas'
import { SymbolDefaultPrecisionConstants } from '../common/SymbolInfo'

import type { YAxis } from '../component/YAxis'

import type DrawPane from '../pane/DrawPane'
import type DrawWidget from '../widget/DrawWidget'
import View from './View'

interface CrosshairFeatureInfo {
  crosshair: Crosshair
  feature: FeatureStyle
}

export default class CrosshairFeatureView extends View<YAxis> {
  private _activeFeatureInfo: Nullable<CrosshairFeatureInfo> = null

  private readonly _featureClickEvent = (featureInfo: CrosshairFeatureInfo) => () => {
    const pane = this.getWidget().getPane()
    pane.getChart().getChartStore().executeAction('onCrosshairFeatureClick', featureInfo)
    return true
  }

  private readonly _featureMouseMoveEvent = (featureInfo: CrosshairFeatureInfo) => () => {
    this._activeFeatureInfo = featureInfo
    this.getWidget().setForceCursor('pointer')
    return true
  }

  constructor (widget: DrawWidget<DrawPane<YAxis>>) {
    super(widget)
    this.registerEvent('mouseMoveEvent', _ => {
      this._activeFeatureInfo = null
      this.getWidget().setForceCursor(null)
      return false
    })
  }

  override drawImp (ctx: CanvasRenderingContext2D): void {
    const widget = this.getWidget()
    const pane = widget.getPane()
    const chartStore = widget.getPane().getChart().getChartStore()
    const crosshair = chartStore.getCrosshair()
    const weight = this.getWidget()
    const yAxis = weight.getPane().getYAxisComponentById()
    if (isString(crosshair.paneId) && crosshair.paneId === pane.getId() && yAxis.isInCandle()) {
      const styles = chartStore.getStyles().crosshair
      const features = styles.horizontal.features
      if (styles.show && styles.horizontal.show && features.length > 0) {
        const isRight = yAxis.position === 'right'
        const bounding = weight.getBounding()

        let yAxisTextWidth = 0
        const horizontalTextStyles = styles.horizontal.text
        if (yAxis.inside && horizontalTextStyles.show) {
          const value = yAxis.convertFromPixel(crosshair.y!)
          const range = yAxis.getRange()
          let text = yAxis.displayValueToText(
            yAxis.realValueToDisplayValue(
              yAxis.valueToRealValue(value, { range }),
              { range }
            ),
            chartStore.getSymbol()?.pricePrecision ?? SymbolDefaultPrecisionConstants.PRICE
          )
          text = chartStore.getDecimalFold().format(chartStore.getThousandsSeparator().format(text))
          yAxisTextWidth = horizontalTextStyles.paddingLeft +
            calcTextWidth(text, horizontalTextStyles.size, horizontalTextStyles.weight, horizontalTextStyles.family) +
            horizontalTextStyles.paddingRight
        }

        let x = yAxisTextWidth
        if (isRight) {
          x = bounding.width - yAxisTextWidth
        }
        const y = crosshair.y!
        features.forEach(feature => {
          const {
            marginLeft = 0, marginTop = 0, marginRight = 0,
            paddingLeft = 0, paddingTop = 0, paddingRight = 0, paddingBottom = 0,
            color, activeColor, backgroundColor, activeBackgroundColor,
            borderRadius, size = 0, type, content
          } = feature
          let width = size
          if (type === 'icon_font') {
            const iconFont = content as FeatureIconFontStyle
            width = paddingLeft + calcTextWidth(iconFont.code, size, 'normal', iconFont.family) + paddingRight
          }
          if (isRight) {
            x -= (width + marginRight)
          } else {
            x += marginLeft
          }
          let finalColor = color
          let finalBackgroundColor = backgroundColor
          if (this._activeFeatureInfo?.feature.id === feature.id) {
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- ignore
            finalColor = activeColor ?? color
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- ignore
            finalBackgroundColor = activeBackgroundColor ?? backgroundColor
          }
          const eventHandler = {
            mouseDownEvent: this._featureClickEvent({ crosshair, feature }),
            mouseMoveEvent: this._featureMouseMoveEvent({ crosshair, feature })
          }
          if (type === 'icon_font') {
            const iconFont = content as FeatureIconFontStyle
            this.createFigure({
              name: 'text',
              attrs: {
                text: iconFont.code,
                x,
                y: y + marginTop,
                baseline: 'middle'
              },
              styles: {
                paddingLeft,
                paddingTop,
                paddingRight,
                paddingBottom,
                borderRadius,
                size,
                family: iconFont.family,
                color: finalColor,
                backgroundColor: finalBackgroundColor
              }
            }, eventHandler)?.draw(ctx)
          } else {
            this.createFigure({
              name: 'rect',
              attrs: { x, y: y + marginTop - size / 2, width: size, height: size },
              styles: {
                paddingLeft,
                paddingTop,
                paddingRight,
                paddingBottom,
                color: finalBackgroundColor
              }
            }, eventHandler)?.draw(ctx)
            const path = content as FeaturePathStyle
            this.createFigure({
              name: 'path',
              attrs: { path: path.path, x, y: y + marginTop + paddingTop - size / 2, width: size, height: size },
              styles: {
                style: path.style,
                lineWidth: path.lineWidth,
                color: finalColor
              }
            })?.draw(ctx)
          }
          if (isRight) {
            x -= marginLeft
          } else {
            x += (width + marginRight)
          }
        })
      }
    }
  }
}
```

## File: view/CrosshairHorizontalLabelView.ts
```typescript
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

import type Bounding from '../common/Bounding'
import type Crosshair from '../common/Crosshair'
import type { CrosshairStyle, CrosshairDirectionStyle, StateTextStyle } from '../common/Styles'
import { isString } from '../common/utils/typeChecks'
import { createFont } from '../common/utils/canvas'
import { SymbolDefaultPrecisionConstants } from '../common/SymbolInfo'

import { DEFAULT_AXIS_ID, type Axis } from '../component/Axis'
import type YAxis from '../component/YAxis'

import type { TextAttrs } from '../extension/figure/text'

import type ChartStore from '../Store'

import View from './View'
import type YAxisWidget from '../widget/YAxisWidget'

export default class CrosshairHorizontalLabelView<C extends Axis = YAxis> extends View<C> {
  override drawImp (ctx: CanvasRenderingContext2D): void {
    const widget = this.getWidget()
    const pane = widget.getPane()
    const chartStore = widget.getPane().getChart().getChartStore()
    const crosshair = chartStore.getCrosshair()
    if (isString(crosshair.paneId) && this.compare(crosshair, pane.getId())) {
      const styles = chartStore.getStyles().crosshair
      if (styles.show) {
        const directionStyles = this.getDirectionStyles(styles)
        const textStyles = directionStyles.text
        if (directionStyles.show && textStyles.show) {
          const bounding = widget.getBounding()
          const axis = 'getAxisComponent' in widget
            ? (widget as unknown as YAxisWidget).getAxisComponent()
            : pane.getYAxisComponentById()
          const text = this.getText(crosshair, chartStore, axis)
          ctx.font = createFont(textStyles.size, textStyles.weight, textStyles.family)
          this.createFigure({
            name: 'text',
            attrs: this.getTextAttrs(text, ctx.measureText(text).width, crosshair, bounding, axis, textStyles),
            styles: textStyles
          })?.draw(ctx)
        }
      }
    }
  }

  protected compare (crosshair: Crosshair, paneId: string): boolean {
    return crosshair.paneId === paneId
  }

  protected getDirectionStyles (styles: CrosshairStyle): CrosshairDirectionStyle {
    return styles.horizontal
  }

  protected getText (crosshair: Crosshair, chartStore: ChartStore, axis: Axis): string {
    const yAxis = axis as unknown as YAxis
    const value = axis.convertFromPixel(crosshair.y!)
    let precision = 0
    let shouldFormatBigNumber = false
    if (yAxis.isInCandle() && yAxis.id === DEFAULT_AXIS_ID) {
      precision = chartStore.getSymbol()?.pricePrecision ?? SymbolDefaultPrecisionConstants.PRICE
    } else {
      const indicators = chartStore.getIndicatorsByPaneId(crosshair.paneId!).filter(indicator => indicator.yAxisId === yAxis.id)
      indicators.forEach(indicator => {
        precision = Math.max(indicator.precision, precision)
        shouldFormatBigNumber ||= indicator.shouldFormatBigNumber
      })
    }
    const yAxisRange = yAxis.getRange()
    let text = yAxis.displayValueToText(
      yAxis.realValueToDisplayValue(
        yAxis.valueToRealValue(value, { range: yAxisRange }),
        { range: yAxisRange }
      ),
      precision
    )

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- ignore
    if (shouldFormatBigNumber) {
      text = chartStore.getInnerFormatter().formatBigNumber(text)
    }
    return chartStore.getDecimalFold().format(chartStore.getThousandsSeparator().format(text))
  }

  protected getTextAttrs (text: string, _textWidth: number, crosshair: Crosshair, bounding: Bounding, axis: Axis, _styles: StateTextStyle): TextAttrs {
    const yAxis = axis as unknown as YAxis
    let x = 0
    let textAlign: CanvasTextAlign = 'left'
    if (yAxis.isFromZero()) {
      x = 0
      textAlign = 'left'
    } else {
      x = bounding.width
      textAlign = 'right'
    }

    return { x, y: crosshair.y!, text, align: textAlign, baseline: 'middle' }
  }
}
```

## File: view/CrosshairLineView.ts
```typescript
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

import type Coordinate from '../common/Coordinate'
import type { CrosshairDirectionStyle } from '../common/Styles'
import { isString } from '../common/utils/typeChecks'

import View from './View'

export default class CrosshairLineView extends View {
  override drawImp (ctx: CanvasRenderingContext2D): void {
    const widget = this.getWidget()
    const pane = widget.getPane()
    const bounding = widget.getBounding()
    const chartStore = widget.getPane().getChart().getChartStore()
    const crosshair = chartStore.getCrosshair()
    const styles = chartStore.getStyles().crosshair
    if (isString(crosshair.paneId) && styles.show) {
      if (crosshair.paneId === pane.getId()) {
        const y = crosshair.y!
        this._drawLine(
          ctx,
          [
            { x: 0, y },
            { x: bounding.width, y }
          ],
          styles.horizontal
        )
      }
      const x = crosshair.realX!
      this._drawLine(
        ctx,
        [
          { x, y: 0 },
          { x, y: bounding.height }
        ],
        styles.vertical
      )
    }
  }

  private _drawLine (ctx: CanvasRenderingContext2D, coordinates: Coordinate[], styles: CrosshairDirectionStyle): void {
    if (styles.show) {
      const lineStyles = styles.line
      if (lineStyles.show) {
        this.createFigure({
          name: 'line',
          attrs: { coordinates },
          styles: lineStyles
        })?.draw(ctx)
      }
    }
  }
}
```

## File: view/CrosshairVerticalLabelView.ts
```typescript
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

import type Bounding from '../common/Bounding'
import type Crosshair from '../common/Crosshair'
import type { CrosshairStyle, CrosshairDirectionStyle, StateTextStyle } from '../common/Styles'
import { isValid } from '../common/utils/typeChecks'

import type { Axis } from '../component/Axis'
import type { XAxis } from '../component/XAxis'

import type ChartStore from '../Store'

import CrosshairHorizontalLabelView from './CrosshairHorizontalLabelView'
import type { TextAttrs } from '../extension/figure/text'
import { PeriodTypeCrosshairTooltipFormat } from '../common/Period'

export default class CrosshairVerticalLabelView extends CrosshairHorizontalLabelView<XAxis> {
  override compare (crosshair: Crosshair): boolean {
    return isValid(crosshair.timestamp)
  }

  override getDirectionStyles (styles: CrosshairStyle): CrosshairDirectionStyle {
    return styles.vertical
  }

  override getText (crosshair: Crosshair, chartStore: ChartStore): string {
    const timestamp = crosshair.timestamp!
    return chartStore.getInnerFormatter().formatDate(timestamp, PeriodTypeCrosshairTooltipFormat[chartStore.getPeriod()?.type ?? 'day'], 'crosshair')
  }

  override getTextAttrs (text: string, textWidth: number, crosshair: Crosshair, bounding: Bounding, _axis: Axis, styles: StateTextStyle): TextAttrs {
    const x = crosshair.realX!
    let optimalX = 0
    let align: CanvasTextAlign = 'center'
    if (x - textWidth / 2 - styles.paddingLeft < 0) {
      optimalX = 0
      align = 'left'
    } else if (x + textWidth / 2 + styles.paddingRight > bounding.width) {
      optimalX = bounding.width
      align = 'right'
    } else {
      optimalX = x
    }
    return { x: optimalX, y: 0, text, align, baseline: 'top' }
  }
}
```

## File: view/GridView.ts
```typescript
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

import type { LineAttrs } from '../extension/figure/line'

import View from './View'

export default class GridView extends View {
  override drawImp (ctx: CanvasRenderingContext2D): void {
    const widget = this.getWidget()
    const pane = this.getWidget().getPane()
    const chart = pane.getChart()
    const bounding = widget.getBounding()

    const styles = chart.getStyles().grid
    const show = styles.show

    if (show) {
      ctx.save()
      ctx.globalCompositeOperation = 'destination-over'
      const horizontalStyles = styles.horizontal
      const horizontalShow = horizontalStyles.show
      if (horizontalShow) {
        const yAxis = pane.getYAxisComponentById()
        const attrs: LineAttrs[] = yAxis.getTicks().map(tick => ({
          coordinates: [
            { x: 0, y: tick.coord },
            { x: bounding.width, y: tick.coord }
          ]
        }))
        this.createFigure({
          name: 'line',
          attrs,
          styles: horizontalStyles
        })?.draw(ctx)
      }
      const verticalStyles = styles.vertical
      const verticalShow = verticalStyles.show
      if (verticalShow) {
        const xAxis = chart.getXAxisPane().getXAxisComponent()
        const attrs: LineAttrs[] = xAxis.getTicks().map(tick => ({
          coordinates: [
            { x: tick.coord, y: 0 },
            { x: tick.coord, y: bounding.height }
          ]
        }))
        this.createFigure({
          name: 'line',
          attrs,
          styles: verticalStyles
        })?.draw(ctx)
      }
      ctx.restore()
    }
  }
}
```

## File: view/IndicatorLastValueView.ts
```typescript
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

import { isNumber, isValid } from '../common/utils/typeChecks'

import { eachFigures, type IndicatorFigure, type IndicatorFigureStyle } from '../component/Indicator'

import View from './View'

import type { YAxis } from '../component/YAxis'
import type YAxisWidget from '../widget/YAxisWidget'

export default class IndicatorLastValueView extends View<YAxis> {
  override drawImp (ctx: CanvasRenderingContext2D): void {
    const widget = this.getWidget()
    const pane = widget.getPane()
    const bounding = widget.getBounding()
    const chartStore = pane.getChart().getChartStore()
    const defaultStyles = chartStore.getStyles().indicator
    const lastValueMarkStyles = defaultStyles.lastValueMark
    const lastValueMarkTextStyles = lastValueMarkStyles.text
    if (lastValueMarkStyles.show) {
      const yAxisWidget = widget as unknown as YAxisWidget
      const yAxis = yAxisWidget.getAxisComponent()
      const yAxisRange = yAxis.getRange()
      const dataList = chartStore.getDataList()
      const barSpace = chartStore.getBarSpace()
      const dataIndex = dataList.length - 1
      const indicators = chartStore.getIndicatorsByPaneId(pane.getId()).filter(indicator => indicator.yAxisId === yAxis.id)
      const formatter = chartStore.getInnerFormatter()
      const decimalFold = chartStore.getDecimalFold()
      const thousandsSeparator = chartStore.getThousandsSeparator()
      indicators.forEach(indicator => {
        const result = indicator.result
        const data = result[dataIndex] ?? {}
        if (isValid(data) && indicator.visible) {
          const precision = indicator.precision
          eachFigures(indicator, dataIndex, barSpace, defaultStyles, (figure: IndicatorFigure, figureStyles: Required<IndicatorFigureStyle>) => {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- ignore
            const value = data[figure.key]
            if (isNumber(value)) {
              const y = yAxis.convertToNicePixel(value)
              let text = yAxis.displayValueToText(
                yAxis.realValueToDisplayValue(
                  yAxis.valueToRealValue(value, { range: yAxisRange }),
                  { range: yAxisRange }
                ),
                precision
              )
              if (indicator.shouldFormatBigNumber) {
                text = formatter.formatBigNumber(text)
              }
              text = decimalFold.format(thousandsSeparator.format(text))
              let x = 0
              let textAlign: CanvasTextAlign = 'left'
              if (yAxis.isFromZero()) {
                x = 0
                textAlign = 'left'
              } else {
                x = bounding.width
                textAlign = 'right'
              }

              this.createFigure({
                name: 'text',
                attrs: {
                  x,
                  y,
                  text,
                  align: textAlign,
                  baseline: 'middle'
                },
                styles: {
                  ...lastValueMarkTextStyles,
                  backgroundColor: figureStyles.color
                }
              })?.draw(ctx)
            }
          })
        }
      })
    }
  }
}
```

## File: view/IndicatorTooltipView.ts
```typescript
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

import type Crosshair from '../common/Crosshair'
import type { TooltipStyle, TooltipTextStyle, TooltipLegend, TooltipLegendChild, TooltipFeatureStyle, FeatureIconFontStyle, FeaturePathStyle } from '../common/Styles'
import { formatPrecision } from '../common/utils/format'
import { isValid, isObject, isString, isNumber, isFunction } from '../common/utils/typeChecks'
import { createFont } from '../common/utils/canvas'
import type Coordinate from '../common/Coordinate'
import type Nullable from '../common/Nullable'
import type { ActionType } from '../common/Action'

import type { YAxis } from '../component/YAxis'

import type { Indicator, IndicatorFigure, IndicatorFigureStyle, IndicatorTooltipData } from '../component/Indicator'
import { eachFigures } from '../component/Indicator'

import type DrawPane from '../pane/DrawPane'
import type DrawWidget from '../widget/DrawWidget'
import View from './View'

interface TooltipFeatureInfo {
  paneId: string
  indicator?: Indicator
  feature: TooltipFeatureStyle
}

export default class IndicatorTooltipView extends View<YAxis> {
  private _activeFeatureInfo: Nullable<TooltipFeatureInfo> = null

  private readonly _featureClickEvent = (type: ActionType, featureInfo: TooltipFeatureInfo) => () => {
    const pane = this.getWidget().getPane()
    pane.getChart().getChartStore().executeAction(type, featureInfo)
    return true
  }

  private readonly _featureMouseMoveEvent = (featureInfo: TooltipFeatureInfo) => () => {
    this._activeFeatureInfo = featureInfo
    return true
  }

  constructor (widget: DrawWidget<DrawPane<YAxis>>) {
    super(widget)
    this.registerEvent('mouseMoveEvent', _ => {
      this._activeFeatureInfo = null
      return false
    })
  }

  override drawImp (ctx: CanvasRenderingContext2D): void {
    const widget = this.getWidget()
    const pane = widget.getPane()
    const chartStore = pane.getChart().getChartStore()
    const crosshair = chartStore.getCrosshair()
    if (isValid(crosshair.kLineData)) {
      const bounding = widget.getBounding()
      const { offsetLeft, offsetTop, offsetRight } = chartStore.getStyles().indicator.tooltip
      this.drawIndicatorTooltip(
        ctx, offsetLeft, offsetTop,
        bounding.width - offsetRight
      )
    }
  }

  protected drawIndicatorTooltip (
    ctx: CanvasRenderingContext2D,
    left: number,
    top: number,
    maxWidth: number
  ): number {
    const pane = this.getWidget().getPane()
    const chartStore = pane.getChart().getChartStore()
    const styles = chartStore.getStyles().indicator
    const tooltipStyles = styles.tooltip
    if (this.isDrawTooltip(chartStore.getCrosshair(), tooltipStyles)) {
      const indicators = chartStore.getIndicatorsByPaneId(pane.getId())
      const tooltipTitleStyles = tooltipStyles.title
      const tooltipLegendStyles = tooltipStyles.legend
      indicators.forEach(indicator => {
        let prevRowHeight = 0
        const coordinate = { x: left, y: top }
        const { name, calcParamsText, legends, features: featuresStyles } = this.getIndicatorTooltipData(indicator)
        const nameValid = name.length > 0
        const legendValid = legends.length > 0
        if (nameValid || legendValid) {
          const features = this.classifyTooltipFeatures(featuresStyles)
          prevRowHeight = this.drawStandardTooltipFeatures(
            ctx, features[0],
            coordinate, indicator,
            left, prevRowHeight, maxWidth
          )

          if (nameValid) {
            let text = name
            if (calcParamsText.length > 0) {
              text = `${text}${calcParamsText}`
            }
            const color = tooltipTitleStyles.color
            prevRowHeight = this.drawStandardTooltipLegends(
              ctx,
              [
                {
                  title: { text: '', color },
                  value: { text, color }
                }
              ],
              coordinate, left, prevRowHeight, maxWidth, tooltipTitleStyles
            )
          }

          prevRowHeight = this.drawStandardTooltipFeatures(
            ctx, features[1],
            coordinate, indicator,
            left, prevRowHeight, maxWidth
          )

          if (legendValid) {
            prevRowHeight = this.drawStandardTooltipLegends(
              ctx, legends, coordinate,
              left, prevRowHeight, maxWidth, tooltipLegendStyles
            )
          }

          // draw right features
          prevRowHeight = this.drawStandardTooltipFeatures(
            ctx, features[2],
            coordinate, indicator,
            left, prevRowHeight, maxWidth
          )
          top = coordinate.y + prevRowHeight
        }
      })
    }
    return top
  }

  protected drawStandardTooltipFeatures (
    ctx: CanvasRenderingContext2D,
    features: TooltipFeatureStyle[],
    coordinate: Coordinate,
    indicator: Nullable<Indicator>,
    left: number,
    prevRowHeight: number,
    maxWidth: number
  ): number {
    if (features.length > 0) {
      let width = 0
      let height = 0
      features.forEach(feature => {
        const {
          marginLeft = 0, marginTop = 0, marginRight = 0, marginBottom = 0,
          paddingLeft = 0, paddingTop = 0, paddingRight = 0, paddingBottom = 0,
          size = 0, type, content
        } = feature
        let contentWidth = 0
        if (type === 'icon_font') {
          const iconFont = content as FeatureIconFontStyle
          ctx.font = createFont(size, 'normal', iconFont.family)
          contentWidth = ctx.measureText(iconFont.code).width
        } else {
          contentWidth = size
        }
        width += (marginLeft + paddingLeft + contentWidth + paddingRight + marginRight)
        height = Math.max(height, marginTop + paddingTop + size + paddingBottom + marginBottom)
      })
      if (coordinate.x + width > maxWidth) {
        coordinate.x = left
        coordinate.y += prevRowHeight
        prevRowHeight = height
      } else {
        prevRowHeight = Math.max(prevRowHeight, height)
      }
      const pane = this.getWidget().getPane()
      const paneId = pane.getId()

      features.forEach(feature => {
        const {
          marginLeft = 0, marginTop = 0, marginRight = 0,
          paddingLeft = 0, paddingTop = 0, paddingRight = 0, paddingBottom = 0,
          backgroundColor, activeBackgroundColor, borderRadius,
          size = 0, color, activeColor, type, content
        } = feature

        let finalColor = color
        let finalBackgroundColor = backgroundColor
        if (
          this._activeFeatureInfo?.paneId === paneId &&
          this._activeFeatureInfo.indicator?.id === indicator?.id &&
          this._activeFeatureInfo.feature.id === feature.id
        ) {
          // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- ignore
          finalColor = activeColor ?? color
          // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- ignore
          finalBackgroundColor = activeBackgroundColor ?? backgroundColor
        }
        let actionType: ActionType = 'onCandleTooltipFeatureClick'
        const featureInfo: TooltipFeatureInfo = {
          paneId, feature
        }
        if (isValid(indicator)) {
          actionType = 'onIndicatorTooltipFeatureClick'
          featureInfo.indicator = indicator
        }
        const eventHandler = {
          mouseDownEvent: this._featureClickEvent(actionType, featureInfo),
          mouseMoveEvent: this._featureMouseMoveEvent(featureInfo)
        }
        let contentWidth = 0
        if (type === 'icon_font') {
          const iconFont = content as FeatureIconFontStyle
          this.createFigure({
            name: 'text',
            attrs: { text: iconFont.code, x: coordinate.x + marginLeft, y: coordinate.y + marginTop },
            styles: {
              paddingLeft,
              paddingTop,
              paddingRight,
              paddingBottom,
              borderRadius,
              size,
              family: iconFont.family,
              color: finalColor,
              backgroundColor: finalBackgroundColor
            }
          }, eventHandler)?.draw(ctx)
          contentWidth = ctx.measureText(iconFont.code).width
        } else {
          this.createFigure({
            name: 'rect',
            attrs: { x: coordinate.x + marginLeft, y: coordinate.y + marginTop, width: size, height: size },
            styles: {
              paddingLeft,
              paddingTop,
              paddingRight,
              paddingBottom,
              color: finalBackgroundColor
            }
          }, eventHandler)?.draw(ctx)
          const path = content as FeaturePathStyle
          this.createFigure({
            name: 'path',
            attrs: { path: path.path, x: coordinate.x + marginLeft + paddingLeft, y: coordinate.y + marginTop + paddingTop, width: size, height: size },
            styles: {
              style: path.style,
              lineWidth: path.lineWidth,
              color: finalColor
            }
          })?.draw(ctx)
          contentWidth = size
        }
        coordinate.x += (marginLeft + paddingLeft + contentWidth + paddingRight + marginRight)
      })
    }
    return prevRowHeight
  }

  protected drawStandardTooltipLegends (
    ctx: CanvasRenderingContext2D,
    legends: TooltipLegend[],
    coordinate: Coordinate,
    left: number,
    prevRowHeight: number,
    maxWidth: number,
    styles: TooltipTextStyle
  ): number {
    if (legends.length > 0) {
      const { marginLeft, marginTop, marginRight, marginBottom, size, family, weight } = styles
      ctx.font = createFont(size, weight, family)
      legends.forEach(data => {
        const title = data.title as TooltipLegendChild
        const value = data.value as TooltipLegendChild
        const titleTextWidth = ctx.measureText(title.text).width
        const valueTextWidth = ctx.measureText(value.text).width
        const totalTextWidth = titleTextWidth + valueTextWidth
        const h = marginTop + size + marginBottom
        if (coordinate.x + marginLeft + totalTextWidth + marginRight > maxWidth) {
          coordinate.x = left
          coordinate.y += prevRowHeight
          prevRowHeight = h
        } else {
          prevRowHeight = Math.max(prevRowHeight, h)
        }
        if (title.text.length > 0) {
          this.createFigure({
            name: 'text',
            attrs: { x: coordinate.x + marginLeft, y: coordinate.y + marginTop, text: title.text },
            styles: { color: title.color, size, family, weight }
          })?.draw(ctx)
        }
        this.createFigure({
          name: 'text',
          attrs: { x: coordinate.x + marginLeft + titleTextWidth, y: coordinate.y + marginTop, text: value.text },
          styles: { color: value.color, size, family, weight }
        })?.draw(ctx)
        coordinate.x += (marginLeft + totalTextWidth + marginRight)
      })
    }
    return prevRowHeight
  }

  protected isDrawTooltip (crosshair: Crosshair, styles: TooltipStyle): boolean {
    const showRule = styles.showRule
    return showRule === 'always' ||
      (showRule === 'follow_cross' && isString(crosshair.paneId))
  }

  protected getIndicatorTooltipData (indicator: Indicator): IndicatorTooltipData {
    const chartStore = this.getWidget().getPane().getChart().getChartStore()
    const styles = chartStore.getStyles().indicator
    const tooltipStyles = styles.tooltip
    const tooltipTitleStyles = tooltipStyles.title
    let name = ''
    let calcParamsText = ''
    if (tooltipTitleStyles.show) {
      if (tooltipTitleStyles.showName) {
        name = indicator.shortName
      }
      if (tooltipTitleStyles.showParams) {
        const calcParams = indicator.calcParams
        if (calcParams.length > 0) {
          calcParamsText = `(${calcParams.join(',')})`
        }
      }
    }
    const tooltipData: IndicatorTooltipData = { name, calcParamsText, legends: [], features: tooltipStyles.features }

    const dataIndex = chartStore.getCrosshair().dataIndex!
    const result = indicator.result

    const formatter = chartStore.getInnerFormatter()
    const decimalFold = chartStore.getDecimalFold()
    const thousandsSeparator = chartStore.getThousandsSeparator()
    const legends: TooltipLegend[] = []
    if (indicator.visible) {
      const barSpace = chartStore.getBarSpace()
      const data = result[dataIndex] ?? {}
      const defaultValue = tooltipStyles.legend.defaultValue
      eachFigures(indicator, dataIndex, barSpace, styles, (figure: IndicatorFigure, figureStyles: Required<IndicatorFigureStyle>) => {
        if (isString(figure.title)) {
          const color = figureStyles.color
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment  -- ignore
          let value = data[figure.key]
          if (isNumber(value)) {
            value = formatPrecision(value, indicator.precision)
            if (indicator.shouldFormatBigNumber) {
              value = formatter.formatBigNumber(value as string)
            }
            value = decimalFold.format(thousandsSeparator.format(value as string))
          }
          legends.push({ title: { text: figure.title, color }, value: { text: (value ?? defaultValue) as string, color } })
        }
      })
      tooltipData.legends = legends
    }

    if (isFunction(indicator.createTooltipDataSource)) {
      const widget = this.getWidget()
      const pane = widget.getPane()
      const chart = pane.getChart()
      const { name: customName, calcParamsText: customCalcParamsText, legends: customLegends, features: customFeatures } = indicator.createTooltipDataSource({
        chart,
        indicator,
        crosshair: chartStore.getCrosshair(),
        bounding: widget.getBounding(),
        xAxis: pane.getChart().getXAxisPane().getXAxisComponent(),
        yAxis: pane.getYAxisComponentById(indicator.yAxisId)
      })
      if (tooltipTitleStyles.show) {
        if (isString(customName) && tooltipTitleStyles.showName) {
          tooltipData.name = customName
        }
        if (isString(customCalcParamsText) && tooltipTitleStyles.showParams) {
          tooltipData.calcParamsText = customCalcParamsText
        }
      }

      if (isValid(customFeatures)) {
        tooltipData.features = customFeatures
      }
      if (isValid(customLegends) && indicator.visible) {
        const optimizedLegends: TooltipLegend[] = []
        const color = styles.tooltip.legend.color
        customLegends.forEach(data => {
          let title = { text: '', color }
          if (isObject(data.title)) {
            title = data.title
          } else {
            title.text = data.title
          }
          let value = { text: '', color }
          if (isObject(data.value)) {
            value = data.value
          } else {
            value.text = data.value
          }
          if (isNumber(Number(value.text))) {
            value.text = decimalFold.format(thousandsSeparator.format(value.text))
          }
          optimizedLegends.push({ title, value })
        })
        tooltipData.legends = optimizedLegends
      }
    }
    return tooltipData
  }

  protected classifyTooltipFeatures (features: TooltipFeatureStyle[]): TooltipFeatureStyle[][] {
    const leftFeatures: TooltipFeatureStyle[] = []
    const middleFeatures: TooltipFeatureStyle[] = []
    const rightFeatures: TooltipFeatureStyle[] = []
    features.forEach(feature => {
      switch (feature.position) {
        case 'left': {
          leftFeatures.push(feature)
          break
        }
        case 'middle': {
          middleFeatures.push(feature)
          break
        }
        case 'right': {
          rightFeatures.push(feature)
          break
        }
      }
    })
    return [leftFeatures, middleFeatures, rightFeatures]
  }
}
```

## File: view/IndicatorView.ts
```typescript
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

import type Nullable from '../common/Nullable'
import type { CandleColorCompareRule, SmoothLineStyle } from '../common/Styles'
import { formatValue } from '../common/utils/format'
import { isNumber, isValid } from '../common/utils/typeChecks'
import type Coordinate from '../common/Coordinate'

import { eachFigures, type IndicatorFigure, type IndicatorFigureAttrs, type IndicatorFigureStyle } from '../component/Indicator'

import CandleBarView, { type CandleBarOptions } from './CandleBarView'

export default class IndicatorView extends CandleBarView {
  override getCandleBarOptions (): Nullable<CandleBarOptions> {
    const pane = this.getWidget().getPane()
    const chartStore = pane.getChart().getChartStore()
    const indicators = chartStore.getIndicatorsByPaneId(pane.getId())
    for (const indicator of indicators) {
      const yAxis = pane.getYAxisComponentById(indicator.yAxisId)
      if (indicator.shouldOhlc && indicator.visible && !yAxis.isInCandle()) {
        const indicatorStyles = indicator.styles
        const defaultStyles = chartStore.getStyles().indicator
        const compareRule = formatValue(indicatorStyles, 'ohlc.compareRule', defaultStyles.ohlc.compareRule) as CandleColorCompareRule
        const upColor = formatValue(indicatorStyles, 'ohlc.upColor', defaultStyles.ohlc.upColor) as string
        const downColor = formatValue(indicatorStyles, 'ohlc.downColor', defaultStyles.ohlc.downColor) as string
        const noChangeColor = formatValue(indicatorStyles, 'ohlc.noChangeColor', defaultStyles.ohlc.noChangeColor) as string
        return {
          yAxisId: indicator.yAxisId,
          type: 'ohlc',
          styles: {
            compareRule,
            upColor,
            downColor,
            noChangeColor,
            upBorderColor: upColor,
            downBorderColor: downColor,
            noChangeBorderColor: noChangeColor,
            upWickColor: upColor,
            downWickColor: downColor,
            noChangeWickColor: noChangeColor
          }
        }
      }
    }
    return null
  }

  override drawImp (ctx: CanvasRenderingContext2D): void {
    super.drawImp(ctx)
    const widget = this.getWidget()
    const pane = widget.getPane()
    const chart = pane.getChart()
    const bounding = widget.getBounding()
    const xAxis = chart.getXAxisPane().getXAxisComponent()
    const chartStore = chart.getChartStore()
    const indicators = chartStore.getIndicatorsByPaneId(pane.getId())
    const defaultStyles = chartStore.getStyles().indicator
    ctx.save()
    indicators.forEach(indicator => {
      const yAxis = pane.getYAxisComponentById(indicator.yAxisId)
      if (indicator.visible) {
        if (indicator.zLevel < 0) {
          ctx.globalCompositeOperation = 'destination-over'
        } else {
          ctx.globalCompositeOperation = 'source-over'
        }
        let isCover = false
        if (indicator.draw !== null) {
          ctx.save()
          isCover = indicator.draw({
            ctx,
            chart,
            indicator,
            bounding,
            xAxis,
            yAxis
          })
          ctx.restore()
        }
        if (!isCover) {
          const result = indicator.result
          const lines: Array<Array<{ coordinates: Coordinate[], styles: Partial<SmoothLineStyle> }>> = []

          this.eachChildren((data, barSpace) => {
            const { halfGapBar } = barSpace
            const { dataIndex, x } = data
            const prevX = xAxis.convertToPixel(dataIndex - 1)
            const nextX = xAxis.convertToPixel(dataIndex + 1)
            const prevData = result[dataIndex - 1] ?? null
            const currentData = result[dataIndex] ?? null
            const nextData = result[dataIndex + 1] ?? null
            const prevCoordinate = { x: prevX }
            const currentCoordinate = { x }
            const nextCoordinate = { x: nextX }
            indicator.figures.forEach(({ key }) => {
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- ignore
              const prevValue = prevData?.[key]
              if (isNumber(prevValue)) {
                prevCoordinate[key] = yAxis.convertToPixel(prevValue)
              }
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- ignore
              const currentValue = currentData?.[key]
              if (isNumber(currentValue)) {
                currentCoordinate[key] = yAxis.convertToPixel(currentValue)
              }
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- ignore
              const nextValue = nextData?.[key]
              if (isNumber(nextValue)) {
                nextCoordinate[key] = yAxis.convertToPixel(nextValue)
              }
            })
            eachFigures(indicator, dataIndex, barSpace, defaultStyles, (figure: IndicatorFigure, figureStyles: IndicatorFigureStyle, figureIndex: number) => {
              if (isValid(currentData?.[figure.key])) {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- ignore
                const valueY = currentCoordinate[figure.key]
                let attrs = figure.attrs?.({
                  data: { prev: prevData, current: currentData, next: nextData },
                  coordinate: { prev: prevCoordinate, current: currentCoordinate, next: nextCoordinate },
                  bounding,
                  barSpace,
                  xAxis,
                  yAxis
                })
                switch (figure.type) {
                  case 'text': {
                    attrs = {
                      x,
                      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- ignore
                      y: valueY,
                      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- ignore
                      text: currentData?.[figure.key],
                      align: 'center',
                      baseline: 'middle',
                      ...attrs
                    }
                    break
                  }
                  case 'circle': {
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- ignore
                    attrs = { x, y: valueY, r: Math.max(1, halfGapBar), ...attrs }
                    break
                  }
                  case 'rect':
                  case 'bar': {
                    const baseValue = figure.baseValue ?? yAxis.getRange().from
                    const baseValueY = yAxis.convertToPixel(baseValue)
                    let height = Math.abs(baseValueY - (valueY as number))
                    if (baseValue !== currentData?.[figure.key]) {
                      height = Math.max(1, height)
                    }
                    let y = 0
                    if (valueY > baseValueY) {
                      y = baseValueY
                    } else {
                      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- ignore
                      y = valueY
                    }
                    const barWidth = attrs?.width ?? halfGapBar * 2
                    attrs = {
                      x: x - barWidth / 2,
                      y,
                      width: Math.max(1, barWidth),
                      height,
                      ...attrs
                    }
                    break
                  }
                  case 'line': {
                    if (!isValid(lines[figureIndex])) {
                      lines[figureIndex] = []
                    }
                    if (isNumber(currentCoordinate[figure.key]) && isNumber(nextCoordinate[figure.key])) {
                      lines[figureIndex].push({
                        coordinates: attrs?.coordinates ?? [
                          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- ignore
                          { x: currentCoordinate.x, y: currentCoordinate[figure.key] },
                          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- ignore
                          { x: nextCoordinate.x, y: nextCoordinate[figure.key] }
                        ],
                        styles: figureStyles as unknown as SmoothLineStyle
                      })
                    }
                    break
                  }
                  default: { break }
                }
                const type = figure.type!
                if (isValid<IndicatorFigureAttrs>(attrs) && type !== 'line') {
                  this.createFigure({
                    name: type === 'bar' ? 'rect' : type,
                    attrs,
                    styles: figureStyles
                  })?.draw(ctx)
                }
              }
            })
          })

          // merge line and render
          lines.forEach(items => {
            if (items.length > 1) {
              const mergeLines = [
                {
                  coordinates: [items[0].coordinates[0], items[0].coordinates[1]],
                  styles: items[0].styles
                }
              ]
              for (let i = 1; i < items.length; i++) {
                const lastMergeLine = mergeLines[mergeLines.length - 1]
                const current = items[i]
                const lastMergeLineLastCoordinate = lastMergeLine.coordinates[lastMergeLine.coordinates.length - 1]
                if (
                  lastMergeLineLastCoordinate.x === current.coordinates[0].x &&
                  lastMergeLineLastCoordinate.y === current.coordinates[0].y &&
                  lastMergeLine.styles.style === current.styles.style &&
                  lastMergeLine.styles.color === current.styles.color &&
                  lastMergeLine.styles.size === current.styles.size &&
                  lastMergeLine.styles.smooth === current.styles.smooth &&
                  lastMergeLine.styles.dashedValue?.[0] === current.styles.dashedValue?.[0] &&
                  lastMergeLine.styles.dashedValue?.[1] === current.styles.dashedValue?.[1]
                ) {
                  lastMergeLine.coordinates.push(current.coordinates[1])
                } else {
                  mergeLines.push({
                    coordinates: [current.coordinates[0], current.coordinates[1]],
                    styles: current.styles
                  })
                }
              }
              mergeLines.forEach(({ coordinates, styles }) => {
                this.createFigure({
                  name: 'line',
                  attrs: { coordinates },
                  styles
                })?.draw(ctx)
              })
            }
          })
        }
      }
    })
    ctx.restore()
  }
}
```

## File: view/OverlayView.ts
```typescript
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

import type Nullable from '../common/Nullable'
import type Coordinate from '../common/Coordinate'
import type Point from '../common/Point'
import type { EventHandler, EventName, MouseTouchEvent, MouseTouchEventCallback } from '../common/EventHandler'
import { isFunction, isNumber, isValid } from '../common/utils/typeChecks'

import type { Axis } from '../component/Axis'
import type { YAxis } from '../component/YAxis'
import type { OverlayFigure, Overlay } from '../component/Overlay'
import type OverlayImp from '../component/Overlay'
import { checkOverlayFigureEvent, OVERLAY_FIGURE_KEY_PREFIX } from '../component/Overlay'

import type { EventOverlayInfoFigureType } from '../Store'

import { PaneIdConstants } from '../pane/types'

import type DrawWidget from '../widget/DrawWidget'
import type DrawPane from '../pane/DrawPane'

import View from './View'

export default class OverlayView<C extends Axis = YAxis> extends View<C> {
  constructor (widget: DrawWidget<DrawPane<C>>) {
    super(widget)
    this._initEvent()
  }

  private _initEvent (): void {
    const widget = this.getWidget()
    const pane = widget.getPane()
    const paneId = pane.getId()
    const chart = pane.getChart()
    const chartStore = chart.getChartStore()
    this.registerEvent('mouseMoveEvent', event => {
      const progressOverlayInfo = chartStore.getProgressOverlayInfo()
      if (progressOverlayInfo !== null) {
        const overlay = progressOverlayInfo.overlay
        let progressOverlayPaneId = progressOverlayInfo.paneId
        if (overlay.isStart()) {
          chartStore.updateProgressOverlayInfo(paneId)
          progressOverlayPaneId = paneId
        }
        const index = overlay.points.length - 1
        if (overlay.isDrawing() && progressOverlayPaneId === paneId) {
          overlay.stepDrawingModeEventMoveForDrawing(this._coordinateToPoint(overlay, event))
          overlay.onDrawing?.({ chart, overlay, ...event })
        }
        return this._figureMouseMoveEvent(
          overlay,
          'point',
          index,
          { key: `${OVERLAY_FIGURE_KEY_PREFIX}point_${index}`, type: 'circle', attrs: {} }
        )(event)
      }
      chartStore.setHoverOverlayInfo(
        {
          paneId,
          overlay: null,
          figureType: 'none',
          figureIndex: -1,
          figure: null
        },
        (o, f) => this._processOverlayMouseEnterEvent(o, f, event),
        (o, f) => this._processOverlayMouseLeaveEvent(o, f, event)
      )
      widget.setForceCursor(null)
      return false
    }).registerEvent('mouseClickEvent', event => {
      const progressOverlayInfo = chartStore.getProgressOverlayInfo()
      if (progressOverlayInfo !== null) {
        const overlay = progressOverlayInfo.overlay
        let progressOverlayPaneId = progressOverlayInfo.paneId
        if (overlay.isStart()) {
          chartStore.updateProgressOverlayInfo(paneId, true)
          progressOverlayPaneId = paneId
        }
        const index = overlay.points.length - 1
        if (overlay.isDrawing() && progressOverlayPaneId === paneId) {
          overlay.stepDrawingModeEventMoveForDrawing(this._coordinateToPoint(overlay, event))
          overlay.onDrawing?.({ chart, overlay, ...event })
          overlay.nextStep()
          if (!overlay.isDrawing()) {
            chartStore.progressOverlayComplete()
            overlay.onDrawEnd?.({ chart, overlay, ...event })
          }
        }
        return this._figureMouseClickEvent(
          overlay,
          'point',
          index,
          {
            key: `${OVERLAY_FIGURE_KEY_PREFIX}point_${index}`,
            type: 'circle',
            attrs: {}
          }
        )(event)
      }
      chartStore.setClickOverlayInfo(
        {
          paneId,
          overlay: null,
          figureType: 'none',
          figureIndex: -1,
          figure: null
        },
        (o, f) => this._processOverlaySelectedEvent(o, f, event),
        (o, f) => this._processOverlayDeselectedEvent(o, f, event)
      )
      return false
    }).registerEvent('mouseDoubleClickEvent', event => {
      const progressOverlayInfo = chartStore.getProgressOverlayInfo()
      if (progressOverlayInfo !== null) {
        const overlay = progressOverlayInfo.overlay
        const progressOverlayPaneId = progressOverlayInfo.paneId
        if (overlay.isDrawing() && progressOverlayPaneId === paneId) {
          overlay.forceComplete()
          if (!overlay.isDrawing()) {
            chartStore.progressOverlayComplete()
            overlay.onDrawEnd?.({ chart, overlay, ...event })
          }
        }
        const index = overlay.points.length - 1
        return this._figureMouseClickEvent(
          overlay,
          'point',
          index,
          {
            key: `${OVERLAY_FIGURE_KEY_PREFIX}point_${index}`,
            type: 'circle',
            attrs: {}
          }
        )(event)
      }
      return false
    }).registerEvent('mouseRightClickEvent', event => {
      const progressOverlayInfo = chartStore.getProgressOverlayInfo()
      if (progressOverlayInfo !== null) {
        const overlay = progressOverlayInfo.overlay
        if (overlay.isDrawing()) {
          const index = overlay.points.length - 1
          return this._figureMouseRightClickEvent(
            overlay,
            'point',
            index,
            {
              key: `${OVERLAY_FIGURE_KEY_PREFIX}point_${index}`,
              type: 'circle',
              attrs: {}
            }
          )(event)
        }
      }
      return false
    }).registerEvent('mouseDownEvent', event => {
      // Handle continuous drawing mode - start drawing on mouse down
      const progressOverlayInfo = chartStore.getProgressOverlayInfo()
      if (progressOverlayInfo !== null) {
        const overlay = progressOverlayInfo.overlay
        if (overlay.isContinuousDrawingMode() && overlay.isStart()) {
          chartStore.updateProgressOverlayInfo(paneId, true)
          const point = this._coordinateToPoint(overlay, event)
          overlay.startContinuousDrawing(point)
          overlay.onDrawStart?.({ chart, overlay, ...event })
          return true
        }
      }
      return false
    }).registerEvent('mouseUpEvent', event => {
      // Handle continuous drawing mode - complete on mouse up
      const progressOverlayInfo = chartStore.getProgressOverlayInfo()
      if (progressOverlayInfo !== null) {
        const overlay = progressOverlayInfo.overlay
        if (overlay.isContinuousDrawingMode() && overlay.isDrawing() && !overlay.isStart()) {
          overlay.forceComplete()
          chartStore.progressOverlayComplete()
          overlay.onDrawEnd?.({ chart, overlay, ...event })
          return true
        }
      }
      const { overlay, figure } = chartStore.getPressedOverlayInfo()
      if (overlay !== null) {
        if (checkOverlayFigureEvent('onPressedMoveEnd', figure)) {
          overlay.onPressedMoveEnd?.({ chart, overlay, figure: figure ?? undefined, ...event })
        }
      }
      chartStore.setPressedOverlayInfo({
        paneId,
        overlay: null,
        figureType: 'none',
        figureIndex: -1,
        figure: null
      })
      return false
    }).registerEvent('pressedMouseMoveEvent', event => {
      // Handle continuous drawing mode - accumulate points while mouse is pressed
      const progressOverlayInfo = chartStore.getProgressOverlayInfo()
      if (progressOverlayInfo !== null) {
        const overlay = progressOverlayInfo.overlay
        if (overlay.isContinuousDrawingMode() && overlay.isDrawing() && !overlay.isStart()) {
          const point = this._coordinateToPoint(overlay, event)
          overlay.continuousDrawingModeEventMoveForDrawing(point)
          overlay.onDrawing?.({ chart, overlay, ...event })
          this.getWidget().setForceCursor('pointer')
          return true
        }
      }
      const { overlay, figureType, figureIndex, figure } = chartStore.getPressedOverlayInfo()
      if (overlay !== null) {
        if (checkOverlayFigureEvent('onPressedMoving', figure)) {
          if (!overlay.lock) {
            const point = this._coordinateToPoint(overlay, event)
            if (figureType === 'point') {
              overlay.eventPressedPointMove(point, figureIndex)
            } else {
              overlay.eventPressedOtherMove(point, this.getWidget().getPane().getChart().getChartStore())
            }
            let prevented = false
            overlay.onPressedMoving?.({ chart, overlay, figure: figure ?? undefined, ...event, preventDefault: () => { prevented = true } })
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- ignore
            if (prevented) {
              this.getWidget().setForceCursor(null)
            } else {
              this.getWidget().setForceCursor('pointer')
            }
            return true
          }
        }
      }
      this.getWidget().setForceCursor(null)
      return false
    })
  }

  private _createFigureEvents (
    overlay: OverlayImp,
    figureType: EventOverlayInfoFigureType,
    figureIndex: number,
    figure: OverlayFigure
  ): Nullable<EventHandler> {
    if (overlay.isDrawing()) {
      return null
    }
    return {
      mouseMoveEvent: this._figureMouseMoveEvent(overlay, figureType, figureIndex, figure),
      mouseDownEvent: this._figureMouseDownEvent(overlay, figureType, figureIndex, figure),
      mouseClickEvent: this._figureMouseClickEvent(overlay, figureType, figureIndex, figure),
      mouseRightClickEvent: this._figureMouseRightClickEvent(overlay, figureType, figureIndex, figure),
      mouseDoubleClickEvent: this._figureMouseDoubleClickEvent(overlay, figureType, figureIndex, figure)
    }
  }

  private _processOverlayMouseEnterEvent (overlay: OverlayImp, figure: Nullable<OverlayFigure>, event: MouseTouchEvent): boolean {
    if (isFunction(overlay.onMouseEnter) && checkOverlayFigureEvent('onMouseEnter', figure)) {
      overlay.onMouseEnter({ chart: this.getWidget().getPane().getChart(), overlay, figure: figure ?? undefined, ...event })
      return true
    }
    return false
  }

  private _processOverlayMouseLeaveEvent (overlay: OverlayImp, figure: Nullable<OverlayFigure>, event: MouseTouchEvent): boolean {
    if (isFunction(overlay.onMouseLeave) && checkOverlayFigureEvent('onMouseLeave', figure)) {
      overlay.onMouseLeave({ chart: this.getWidget().getPane().getChart(), overlay, figure: figure ?? undefined, ...event })
      return true
    }
    return false
  }

  private _processOverlaySelectedEvent (overlay: OverlayImp, figure: Nullable<OverlayFigure>, event: MouseTouchEvent): boolean {
    if (checkOverlayFigureEvent('onSelected', figure)) {
      overlay.onSelected?.({ chart: this.getWidget().getPane().getChart(), overlay, figure: figure ?? undefined, ...event })
      return true
    }
    return false
  }

  private _processOverlayDeselectedEvent (overlay: OverlayImp, figure: Nullable<OverlayFigure>, event: MouseTouchEvent): boolean {
    if (checkOverlayFigureEvent('onDeselected', figure)) {
      overlay.onDeselected?.({ chart: this.getWidget().getPane().getChart(), overlay, figure: figure ?? undefined, ...event })
      return true
    }
    return false
  }

  private _figureMouseMoveEvent (overlay: OverlayImp, figureType: EventOverlayInfoFigureType, figureIndex: number, figure: OverlayFigure): MouseTouchEventCallback {
    return (event: MouseTouchEvent) => {
      const pane = this.getWidget().getPane()
      const check = !overlay.isDrawing() && checkOverlayFigureEvent('onMouseMove', figure)
      if (check) {
        let prevented = false
        overlay.onMouseMove?.({ chart: pane.getChart(), overlay, figure, ...event, preventDefault: () => { prevented = true } })
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- ignore
        if (prevented) {
          this.getWidget().setForceCursor(null)
        } else {
          this.getWidget().setForceCursor('pointer')
        }
      }

      pane.getChart().getChartStore().setHoverOverlayInfo(
        { paneId: pane.getId(), overlay, figureType, figure, figureIndex },
        (o, f) => this._processOverlayMouseEnterEvent(o, f, event),
        (o, f) => this._processOverlayMouseLeaveEvent(o, f, event)
      )
      return check
    }
  }

  private _figureMouseDownEvent (overlay: OverlayImp, figureType: EventOverlayInfoFigureType, figureIndex: number, figure: OverlayFigure): MouseTouchEventCallback {
    return (event: MouseTouchEvent) => {
      if (overlay.lock) {
        return false
      }
      const pane = this.getWidget().getPane()
      const paneId = pane.getId()
      overlay.startPressedMove(this._coordinateToPoint(overlay, event))
      if (checkOverlayFigureEvent('onPressedMoveStart', figure)) {
        overlay.onPressedMoveStart?.({ chart: pane.getChart(), overlay, figure, ...event })
        pane.getChart().getChartStore().setPressedOverlayInfo({ paneId, overlay, figureType, figureIndex, figure })
        return !overlay.isDrawing()
      }
      return false
    }
  }

  private _figureMouseClickEvent (overlay: OverlayImp, figureType: EventOverlayInfoFigureType, figureIndex: number, figure: OverlayFigure): MouseTouchEventCallback {
    return (event: MouseTouchEvent) => {
      const pane = this.getWidget().getPane()
      const paneId = pane.getId()
      const check = !overlay.isDrawing() && checkOverlayFigureEvent('onClick', figure)
      if (check) {
        overlay.onClick?.({ chart: this.getWidget().getPane().getChart(), overlay, figure, ...event })
      }
      pane.getChart().getChartStore().setClickOverlayInfo(
        { paneId, overlay, figureType, figureIndex, figure },
        (o, f) => this._processOverlaySelectedEvent(o, f, event),
        (o, f) => this._processOverlayDeselectedEvent(o, f, event)
      )
      return check
    }
  }

  private _figureMouseDoubleClickEvent (overlay: OverlayImp, _figureType: EventOverlayInfoFigureType, _figureIndex: number, figure: OverlayFigure): MouseTouchEventCallback {
    return (event: MouseTouchEvent) => {
      if (checkOverlayFigureEvent('onDoubleClick', figure)) {
        overlay.onDoubleClick?.({ ...event, chart: this.getWidget().getPane().getChart(), figure, overlay })
        return !overlay.isDrawing()
      }
      return false
    }
  }

  private _figureMouseRightClickEvent (overlay: OverlayImp, _figureType: EventOverlayInfoFigureType, _figureIndex: number, figure: OverlayFigure): MouseTouchEventCallback {
    return (event: MouseTouchEvent) => {
      if (checkOverlayFigureEvent('onRightClick', figure)) {
        let prevented = false
        overlay.onRightClick?.({ chart: this.getWidget().getPane().getChart(), overlay, figure, ...event, preventDefault: () => { prevented = true } })
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- ignore
        if (!prevented) {
          this.getWidget().getPane().getChart().getChartStore().removeOverlay(overlay)
        }
        return !overlay.isDrawing()
      }
      return false
    }
  }

  private _coordinateToPoint (o: Overlay, coordinate: Coordinate): Partial<Point> {
    const point: Partial<Point> = {}
    const pane = this.getWidget().getPane()
    const chart = pane.getChart()
    const paneId = pane.getId()
    const chartStore = chart.getChartStore()
    if (this.coordinateToPointTimestampDataIndexFlag()) {
      const overlayImp = o as OverlayImp
      if (overlayImp.isContinuousDrawingMode()) {
        // For continuous drawing, store precise timestamp for sub-bar positioning
        const floatIndex = chartStore.coordinateToFloatIndex(coordinate.x)
        point.dataIndex = floatIndex
        point.timestamp = chartStore.floatIndexToTimestamp(floatIndex) ?? undefined
      } else {
        // For step-based drawing, snap to candle boundaries
        const xAxis = chart.getXAxisPane().getXAxisComponent()
        const dataIndex = xAxis.convertFromPixel(coordinate.x)
        point.dataIndex = dataIndex
        point.timestamp = chartStore.dataIndexToTimestamp(dataIndex) ?? undefined
      }
    }
    if (this.coordinateToPointValueFlag()) {
      const yAxis = pane.getYAxisComponentById()
      let value = yAxis.convertFromPixel(coordinate.y)
      if (o.mode !== 'normal' && paneId === PaneIdConstants.CANDLE && isNumber(point.dataIndex)) {
        const kLineData = chartStore.getDataByDataIndex(point.dataIndex)
        if (kLineData !== null) {
          const modeSensitivity = o.modeSensitivity
          if (value > kLineData.high) {
            if (o.mode === 'weak_magnet') {
              const highY = yAxis.convertToPixel(kLineData.high)
              const buffValueY = yAxis.reverse ? highY + modeSensitivity : highY - modeSensitivity
              const buffValue = yAxis.convertFromPixel(buffValueY)
              if (value < buffValue) {
                value = kLineData.high
              }
            } else {
              value = kLineData.high
            }
          } else if (value < kLineData.low) {
            if (o.mode === 'weak_magnet') {
              const lowY = yAxis.convertToPixel(kLineData.low)
              const buffValueY = yAxis.reverse ? lowY - modeSensitivity : lowY + modeSensitivity
              const buffValue = yAxis.convertFromPixel(buffValueY)
              if (value > buffValue) {
                value = kLineData.low
              }
            } else {
              value = kLineData.low
            }
          } else {
            const max = Math.max(kLineData.open, kLineData.close)
            const min = Math.min(kLineData.open, kLineData.close)
            if (value > max) {
              if (value - max < kLineData.high - value) {
                value = max
              } else {
                value = kLineData.high
              }
            } else if (value < min) {
              if (value - kLineData.low < min - value) {
                value = kLineData.low
              } else {
                value = min
              }
            } else if (max - value < value - min) {
              value = max
            } else {
              value = min
            }
          }
        }
      }
      point.value = value
    }
    return point
  }

  protected coordinateToPointValueFlag (): boolean {
    return true
  }

  protected coordinateToPointTimestampDataIndexFlag (): boolean {
    return true
  }

  override dispatchEvent (name: EventName, event: MouseTouchEvent): boolean {
    const isDrawing = this.getWidget().getPane().getChart().getChartStore().isOverlayDrawing()
    if (isDrawing) {
      return this.onEvent(name, event)
    }
    return super.dispatchEvent(name, event)
  }

  override drawImp (ctx: CanvasRenderingContext2D): void {
    const overlays = this.getCompleteOverlays()
    overlays.forEach(overlay => {
      if (overlay.visible) {
        this._drawOverlay(ctx, overlay)
      }
    })
    const progressOverlay = this.getProgressOverlay()
    if (isValid(progressOverlay) && progressOverlay.visible) {
      this._drawOverlay(ctx, progressOverlay)
    }
  }

  private _drawOverlay (
    ctx: CanvasRenderingContext2D,
    overlay: OverlayImp
  ): void {
    const { points } = overlay
    const pane = this.getWidget().getPane()
    const chart = pane.getChart()
    const chartStore = chart.getChartStore()
    const yAxis = pane.getYAxisComponentById() as unknown as Nullable<YAxis>
    // For continuous drawing overlays, use float indices for smooth rendering
    const isContinuous = overlay.isContinuousDrawingMode()
    const coordinates = points.map(point => {
      let dataIndex: Nullable<number> = null
      if (isContinuous && isNumber(point.timestamp)) {
        // Use timestampToFloatIndex for sub-bar precision
        dataIndex = chartStore.timestampToFloatIndex(point.timestamp)
      } else if (isNumber(point.timestamp)) {
        // For regular overlays, use integer timestamp lookup
        dataIndex = chartStore.timestampToDataIndex(point.timestamp)
      } else if (isNumber(point.dataIndex)) {
        // Fallback to dataIndex if no timestamp
        dataIndex = point.dataIndex
      }
      const coordinate = { x: 0, y: 0 }
      if (isNumber(dataIndex)) {
        coordinate.x = chartStore.dataIndexToCoordinate(dataIndex)
      }
      if (isNumber(point.value)) {
        coordinate.y = yAxis?.convertToPixel(point.value) ?? 0
      }
      return coordinate
    })
    if (coordinates.length > 0) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment -- ignore
      // @ts-expect-error
      const figures = [].concat(this.getFigures(overlay, coordinates))
      this.drawFigures(
        ctx,
        overlay,
        figures
      )
    }
    this.drawDefaultFigures(
      ctx,
      overlay,
      coordinates
    )
  }

  protected drawFigures (ctx: CanvasRenderingContext2D, overlay: OverlayImp, figures: OverlayFigure[]): void {
    const defaultStyles = this.getWidget().getPane().getChart().getStyles().overlay
    figures.forEach((figure, figureIndex) => {
      const { type, styles, attrs } = figure
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment -- ignore
      // @ts-expect-error
      const attrsArray = [].concat(attrs)
      attrsArray.forEach((ats) => {
        const events = this._createFigureEvents(overlay, 'other', figureIndex, figure)
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment -- ignore
        // @ts-expect-error
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- ignore
        const ss = { ...defaultStyles[type], ...overlay.styles?.[type], ...styles }
        this.createFigure({
          name: type, attrs: ats, styles: ss
        }, events ?? undefined)?.draw(ctx)
      })
    })
  }

  protected getCompleteOverlays (): OverlayImp[] {
    const pane = this.getWidget().getPane()
    return pane.getChart().getChartStore().getOverlaysByPaneId(pane.getId())
  }

  protected getProgressOverlay (): Nullable<OverlayImp> {
    const pane = this.getWidget().getPane()
    const info = pane.getChart().getChartStore().getProgressOverlayInfo()
    if (isValid(info) && info.paneId === pane.getId()) {
      return info.overlay
    }
    return null
  }

  protected getFigures (
    o: Overlay,
    coordinates: Coordinate[]
  ): OverlayFigure | OverlayFigure[] {
    const widget = this.getWidget()
    const pane = widget.getPane()
    const chart = pane.getChart()
    const yAxis = pane.getYAxisComponentById() as unknown as Nullable<YAxis>
    const xAxis = chart.getXAxisPane().getXAxisComponent()
    const bounding = widget.getBounding()
    return o.createPointFigures?.({ chart, overlay: o, coordinates, bounding, xAxis, yAxis }) ?? []
  }

  protected drawDefaultFigures (
    ctx: CanvasRenderingContext2D,
    overlay: OverlayImp,
    coordinates: Coordinate[]
  ): void {
    if (overlay.needDefaultPointFigure) {
      const chartStore = this.getWidget().getPane().getChart().getChartStore()
      const hoverOverlayInfo = chartStore.getHoverOverlayInfo()
      const clickOverlayInfo = chartStore.getClickOverlayInfo()
      if (
        (hoverOverlayInfo.overlay?.id === overlay.id && hoverOverlayInfo.figureType !== 'none') ||
        (clickOverlayInfo.overlay?.id === overlay.id && clickOverlayInfo.figureType !== 'none')
      ) {
        const defaultStyles = chartStore.getStyles().overlay
        const styles = overlay.styles
        const pointStyles = { ...defaultStyles.point, ...styles?.point }
        coordinates.forEach(({ x, y }, index) => {
          let radius = pointStyles.radius
          let color = pointStyles.color
          let borderColor = pointStyles.borderColor
          let borderSize = pointStyles.borderSize
          if (
            hoverOverlayInfo.overlay?.id === overlay.id &&
            hoverOverlayInfo.figureType === 'point' &&
            hoverOverlayInfo.figure?.key === `${OVERLAY_FIGURE_KEY_PREFIX}point_${index}`
          ) {
            radius = pointStyles.activeRadius
            color = pointStyles.activeColor
            borderColor = pointStyles.activeBorderColor
            borderSize = pointStyles.activeBorderSize
          }

          this.createFigure(
            {
              name: 'circle',
              attrs: { x, y, r: radius + borderSize },
              styles: { color: borderColor }
            },
            this._createFigureEvents(
              overlay,
              'point',
              index,
              {
                key: `${OVERLAY_FIGURE_KEY_PREFIX}point_${index}`,
                type: 'circle',
                attrs: { x, y, r: radius + borderSize },
                styles: { color: borderColor }
              }
            ) ?? undefined
          )?.draw(ctx)
          this.createFigure({
            name: 'circle',
            attrs: { x, y, r: radius },
            styles: { color }
          })?.draw(ctx)
        })
      }
    }
  }
}
```

## File: view/OverlayXAxisView.ts
```typescript
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

import type Nullable from '../common/Nullable'
import type Coordinate from '../common/Coordinate'

import { isNumber } from '../common/utils/typeChecks'

import type { XAxis } from '../component/XAxis'
import type { YAxis } from '../component/YAxis'
import type { OverlayFigure, Overlay } from '../component/Overlay'
import type OverlayImp from '../component/Overlay'

import OverlayYAxisView from './OverlayYAxisView'

export default class OverlayXAxisView extends OverlayYAxisView<XAxis> {
  override coordinateToPointTimestampDataIndexFlag (): boolean {
    return true
  }

  override coordinateToPointValueFlag (): boolean {
    return false
  }

  override getCompleteOverlays (): OverlayImp[] {
    return this.getWidget().getPane().getChart().getChartStore().getOverlaysByPaneId()
  }

  override getProgressOverlay (): Nullable<OverlayImp> {
    return this.getWidget().getPane().getChart().getChartStore().getProgressOverlayInfo()?.overlay ?? null
  }

  override getDefaultFigures (
    overlay: Overlay,
    coordinates: Coordinate[]
  ): OverlayFigure[] {
    const figures: OverlayFigure[] = []
    const widget = this.getWidget()
    const pane = widget.getPane()
    const chartStore = pane.getChart().getChartStore()
    const clickOverlayInfo = chartStore.getClickOverlayInfo()
    if (overlay.needDefaultXAxisFigure && overlay.id === clickOverlayInfo.overlay?.id) {
      let leftX = Number.MAX_SAFE_INTEGER
      let rightX = Number.MIN_SAFE_INTEGER
      coordinates.forEach((coordinate, index) => {
        leftX = Math.min(leftX, coordinate.x)
        rightX = Math.max(rightX, coordinate.x)
        const point = overlay.points[index]
        if (isNumber(point.timestamp)) {
          const text = chartStore.getInnerFormatter().formatDate(point.timestamp, 'YYYY-MM-DD HH:mm', 'crosshair')
          figures.push({ type: 'text', attrs: { x: coordinate.x, y: 0, text, align: 'center' }, ignoreEvent: true })
        }
      })
      if (coordinates.length > 1) {
        figures.unshift({ type: 'rect', attrs: { x: leftX, y: 0, width: rightX - leftX, height: widget.getBounding().height }, ignoreEvent: true })
      }
    }
    return figures
  }

  override getFigures (
    o: Overlay,
    coordinates: Coordinate[]
  ): OverlayFigure | OverlayFigure[] {
    const widget = this.getWidget()
    const pane = widget.getPane()
    const chart = pane.getChart()
    const yAxis = pane.getYAxisComponentById() as unknown as Nullable<YAxis>
    const xAxis = chart.getXAxisPane().getXAxisComponent()
    const bounding = widget.getBounding()
    return o.createXAxisFigures?.({ chart, overlay: o, coordinates, bounding, xAxis, yAxis }) ?? []
  }
}
```

## File: view/OverlayYAxisView.ts
```typescript
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

import type Nullable from '../common/Nullable'
import type Coordinate from '../common/Coordinate'
import { formatPrecision } from '../common/utils/format'
import { isNumber } from '../common/utils/typeChecks'
import { SymbolDefaultPrecisionConstants } from '../common/SymbolInfo'

import type { Axis } from '../component/Axis'
import type { YAxis } from '../component/YAxis'
import type { OverlayFigure, Overlay } from '../component/Overlay'
import type OverlayImp from '../component/Overlay'

import OverlayView from './OverlayView'

import type YAxisImp from '../component/YAxis'

export default class OverlayYAxisView<C extends Axis = YAxis> extends OverlayView<C> {
  override coordinateToPointTimestampDataIndexFlag (): boolean {
    return false
  }

  override drawDefaultFigures (
    ctx: CanvasRenderingContext2D,
    overlay: OverlayImp,
    coordinates: Coordinate[]
  ): void {
    this.drawFigures(
      ctx,
      overlay,
      this.getDefaultFigures(overlay, coordinates)
    )
  }

  protected getDefaultFigures (
    overlay: Overlay,
    coordinates: Coordinate[]
  ): OverlayFigure[] {
    const widget = this.getWidget()
    const pane = widget.getPane()
    const chartStore = pane.getChart().getChartStore()
    const clickOverlayInfo = chartStore.getClickOverlayInfo()
    const figures: OverlayFigure[] = []
    if (
      overlay.needDefaultYAxisFigure &&
      overlay.id === clickOverlayInfo.overlay?.id &&
      clickOverlayInfo.paneId === pane.getId()
    ) {
      const yAxis = pane.getYAxisComponentById() as unknown as YAxisImp
      const bounding = widget.getBounding()
      let topY = Number.MAX_SAFE_INTEGER
      let bottomY = Number.MIN_SAFE_INTEGER
      const isFromZero = yAxis.isFromZero()
      let textAlign: CanvasTextAlign = 'left'
      let x = 0
      if (isFromZero) {
        textAlign = 'left'
        x = 0
      } else {
        textAlign = 'right'
        x = bounding.width
      }
      const decimalFold = chartStore.getDecimalFold()
      const thousandsSeparator = chartStore.getThousandsSeparator()
      coordinates.forEach((coordinate, index) => {
        const point = overlay.points[index]
        if (isNumber(point.value)) {
          topY = Math.min(topY, coordinate.y)
          bottomY = Math.max(bottomY, coordinate.y)
          const text = decimalFold.format(thousandsSeparator.format(formatPrecision(point.value, chartStore.getSymbol()?.pricePrecision ?? SymbolDefaultPrecisionConstants.PRICE)))
          figures.push({ type: 'text', attrs: { x, y: coordinate.y, text, align: textAlign, baseline: 'middle' }, ignoreEvent: true })
        }
      })
      if (coordinates.length > 1) {
        figures.unshift({ type: 'rect', attrs: { x: 0, y: topY, width: bounding.width, height: bottomY - topY }, ignoreEvent: true })
      }
    }
    return figures
  }

  override getFigures (
    overlay: Overlay,
    coordinates: Coordinate[]
  ): OverlayFigure | OverlayFigure[] {
    const widget = this.getWidget()
    const pane = widget.getPane()
    const chart = pane.getChart()
    const yAxis = pane.getYAxisComponentById() as unknown as Nullable<YAxis>
    const xAxis = chart.getXAxisPane().getXAxisComponent()
    const bounding = widget.getBounding()
    return overlay.createYAxisFigures?.({ chart, overlay, coordinates, bounding, xAxis, yAxis }) ?? []
  }
}
```

## File: view/View.ts
```typescript
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

import type Nullable from '../common/Nullable'
import type { EventHandler, EventName, MouseTouchEvent } from '../common/EventHandler'
import Eventful from '../common/Eventful'
import { isValid } from '../common/utils/typeChecks'

import type Figure from '../component/Figure'
import type { Axis } from '../component/Axis'
import type { FigureCreate } from '../component/Figure'

import { getInnerFigureClass } from '../extension/figure/index'

import type DrawWidget from '../widget/DrawWidget'
import type DrawPane from '../pane/DrawPane'

export default abstract class View<C extends Axis = Axis> extends Eventful {
  /**
   * Parent widget
   */
  private readonly _widget: DrawWidget<DrawPane<C>>

  constructor (widget: DrawWidget<DrawPane<C>>) {
    super()
    this._widget = widget
  }

  getWidget (): DrawWidget<DrawPane<C>> { return this._widget }

  protected createFigure (create: FigureCreate, eventHandler?: EventHandler): Nullable<Figure> {
    const FigureClazz = getInnerFigureClass(create.name)
    if (FigureClazz !== null) {
      const figure = new FigureClazz(create)
      if (isValid(eventHandler)) {
        for (const key in eventHandler) {
          // eslint-disable-next-line no-prototype-builtins -- ignore
          if (eventHandler.hasOwnProperty(key)) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument -- ignore
            figure.registerEvent(key as EventName, eventHandler[key])
          }
        }
        this.addChild(figure)
      }
      return figure
    }
    return null
  }

  draw (ctx: CanvasRenderingContext2D): void {
    this.clear()
    this.drawImp(ctx)
  }

  checkEventOn (_: MouseTouchEvent): boolean {
    return true
  }

  protected abstract drawImp (ctx: CanvasRenderingContext2D): void
}
```

## File: view/XAxisView.ts
```typescript
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

import type Bounding from '../common/Bounding'
import type { AxisStyle, Styles } from '../common/Styles'

import type { LineAttrs } from '../extension/figure/line'
import type { TextAttrs } from '../extension/figure/text'

import type { AxisTick } from '../component/Axis'
import type { XAxis } from '../component/XAxis'

import AxisView from './AxisView'
import type XAxisPane from '../pane/XAxisPane'

export default class XAxisView extends AxisView<XAxis> {
  protected override getAxis (): XAxis {
    return (this.getWidget().getPane() as unknown as XAxisPane).getXAxisComponent()
  }

  override getAxisStyles (styles: Styles): AxisStyle {
    return styles.xAxis
  }

  override createAxisLine (bounding: Bounding): LineAttrs {
    return {
      coordinates: [
        { x: 0, y: 0 },
        { x: bounding.width, y: 0 }
      ]
    }
  }

  override createTickLines (ticks: AxisTick[], _bounding: Bounding, styles: AxisStyle): LineAttrs[] {
    const tickLineStyles = styles.tickLine
    const axisLineSize = styles.axisLine.size
    return ticks.map(tick => ({
      coordinates: [
        { x: tick.coord, y: 0 },
        { x: tick.coord, y: axisLineSize + tickLineStyles.length }
      ]
    }))
  }

  override createTickTexts (ticks: AxisTick[], _bounding: Bounding, styles: AxisStyle): TextAttrs[] {
    const tickTickStyles = styles.tickText
    const axisLineSize = styles.axisLine.size
    const tickLineLength = styles.tickLine.length
    return ticks.map(tick => ({
      x: tick.coord,
      y: axisLineSize + tickLineLength + tickTickStyles.marginStart,
      text: tick.text,
      align: 'center',
      baseline: 'top'
    }))
  }
}
```

## File: view/YAxisView.ts
```typescript
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

import type Bounding from '../common/Bounding'
import type { AxisStyle, Styles } from '../common/Styles'

import type { LineAttrs } from '../extension/figure/line'
import type { TextAttrs } from '../extension/figure/text'

import type { AxisTick } from '../component/Axis'
import type { YAxis } from '../component/YAxis'
import type YAxisWidget from '../widget/YAxisWidget'

import AxisView from './AxisView'

export default class YAxisView extends AxisView<YAxis> {
  protected override getAxis (): YAxis {
    return (this.getWidget() as unknown as YAxisWidget).getAxisComponent()
  }

  override getAxisStyles (styles: Styles): AxisStyle {
    return styles.yAxis
  }

  override createAxisLine (bounding: Bounding, styles: AxisStyle): LineAttrs {
    const yAxis = this.getAxis()
    const size = styles.axisLine.size
    let x = 0
    if (yAxis.isFromZero()) {
      x = 0
    } else {
      x = bounding.width - size
    }
    return {
      coordinates: [
        { x, y: 0 },
        { x, y: bounding.height }
      ]
    }
  }

  override createTickLines (ticks: AxisTick[], bounding: Bounding, styles: AxisStyle): LineAttrs[] {
    const yAxis = this.getAxis()
    const axisLineStyles = styles.axisLine
    const tickLineStyles = styles.tickLine

    let startX = 0
    let endX = 0
    if (yAxis.isFromZero()) {
      startX = 0
      if (axisLineStyles.show) {
        startX += axisLineStyles.size
      }
      endX = startX + tickLineStyles.length
    } else {
      startX = bounding.width
      if (axisLineStyles.show) {
        startX -= axisLineStyles.size
      }
      endX = startX - tickLineStyles.length
    }
    return ticks.map(tick => ({
      coordinates: [
        { x: startX, y: tick.coord },
        { x: endX, y: tick.coord }
      ]
    }))
  }

  override createTickTexts (ticks: AxisTick[], bounding: Bounding, styles: AxisStyle): TextAttrs[] {
    const yAxis = this.getAxis()
    const axisLineStyles = styles.axisLine
    const tickLineStyles = styles.tickLine
    const tickTextStyles = styles.tickText

    let x = 0
    if (yAxis.isFromZero()) {
      x = tickTextStyles.marginStart
      if (axisLineStyles.show) {
        x += axisLineStyles.size
      }
      if (tickLineStyles.show) {
        x += tickLineStyles.length
      }
    } else {
      x = bounding.width - tickTextStyles.marginEnd
      if (axisLineStyles.show) {
        x -= axisLineStyles.size
      }
      if (tickLineStyles.show) {
        x -= tickLineStyles.length
      }
    }
    const textAlign = this.getAxis().isFromZero() ? 'left' : 'right'
    return ticks.map(tick => ({
      x,
      y: tick.coord,
      text: tick.text,
      align: textAlign,
      baseline: 'middle'
    }))
  }
}
```

## File: widget/CandleWidget.ts
```typescript
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

import IndicatorWidget from './IndicatorWidget'

import CandleBarView from '../view/CandleBarView'
import CandleAreaView from '../view/CandleAreaView'
import CandleHighLowPriceView from '../view/CandleHighLowPriceView'
import CandleLastPriceLineView from '../view/CandleLastPriceLineView'

import type IndicatorTooltipView from '../view/IndicatorTooltipView'
import CandleTooltipView from '../view/CandleTooltipView'
import CrosshairFeatureView from '../view/CrosshairFeatureView'

import type AxisPane from '../pane/DrawPane'

import type { YAxis } from '../component/YAxis'

export default class CandleWidget extends IndicatorWidget {
  private readonly _candleBarView = new CandleBarView(this)
  private readonly _candleAreaView = new CandleAreaView(this)
  private readonly _candleHighLowPriceView = new CandleHighLowPriceView(this)
  private readonly _candleLastPriceLineView = new CandleLastPriceLineView(this)
  private readonly _crosshairFeatureView = new CrosshairFeatureView(this)

  constructor (rootContainer: HTMLElement, pane: AxisPane<YAxis>) {
    super(rootContainer, pane)
    this.addChild(this._candleBarView)
    this.addChild(this._crosshairFeatureView)
  }

  override updateMainContent (ctx: CanvasRenderingContext2D): void {
    const candleStyles = this.getPane().getChart().getStyles().candle
    if (candleStyles.type !== 'area') {
      this._candleBarView.draw(ctx)
      this._candleHighLowPriceView.draw(ctx)
      this._candleAreaView.stopAnimation()
    } else {
      this._candleAreaView.draw(ctx)
    }
    this._candleLastPriceLineView.draw(ctx)
  }

  override updateOverlayContent (ctx: CanvasRenderingContext2D): void {
    this._crosshairFeatureView.draw(ctx)
  }

  override createTooltipView (): IndicatorTooltipView {
    return new CandleTooltipView(this)
  }
}
```

## File: widget/DrawWidget.ts
```typescript
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

import type Bounding from '../common/Bounding'
import { UpdateLevel } from '../common/Updater'
import Canvas from '../common/Canvas'

import type DrawPane from '../pane/DrawPane'

import Widget from './Widget'

import { createDom } from '../common/utils/dom'
import { getPixelRatio } from '../common/utils/canvas'

export default abstract class DrawWidget<P extends DrawPane = DrawPane> extends Widget<P> {
  private readonly _mainCanvas: Canvas
  private readonly _overlayCanvas: Canvas

  constructor (rootContainer: HTMLElement, pane: P) {
    super(rootContainer, pane)
    this._mainCanvas = new Canvas({
      position: 'absolute',
      top: '0',
      left: '0',
      zIndex: '2',
      boxSizing: 'border-box'
    }, () => {
      this.updateMain(this._mainCanvas.getContext())
    })
    this._overlayCanvas = new Canvas({
      position: 'absolute',
      top: '0',
      left: '0',
      zIndex: '2',
      boxSizing: 'border-box'
    }, () => {
      this.updateOverlay(this._overlayCanvas.getContext())
    })
    const container = this.getContainer()
    container.appendChild(this._mainCanvas.getElement())
    container.appendChild(this._overlayCanvas.getElement())
  }

  override createContainer (): HTMLElement {
    return createDom('div', {
      margin: '0',
      padding: '0',
      position: 'absolute',
      top: '0',
      overflow: 'hidden',
      boxSizing: 'border-box',
      zIndex: '1'
    })
  }

  override updateImp (container: HTMLElement, bounding: Bounding, level: UpdateLevel): void {
    const { width, height, left } = bounding
    container.style.left = `${left}px`

    let l = level
    const w = container.clientWidth
    const h = container.clientHeight
    if (width !== w || height !== h) {
      container.style.width = `${width}px`
      container.style.height = `${height}px`
      l = UpdateLevel.Drawer
    }
    switch (l) {
      case UpdateLevel.Main: {
        this._mainCanvas.update(width, height)
        break
      }
      case UpdateLevel.Overlay: {
        this._overlayCanvas.update(width, height)
        break
      }
      case UpdateLevel.Drawer:
      case UpdateLevel.All: {
        this._mainCanvas.update(width, height)
        this._overlayCanvas.update(width, height)
        break
      }
      default: {
        break
      }
    }
  }

  destroy (): void {
    this._mainCanvas.destroy()
    this._overlayCanvas.destroy()
    super.destroy()
  }

  getImage (includeOverlay: boolean): HTMLCanvasElement {
    const { width, height } = this.getBounding()
    const canvas = createDom('canvas', {
      width: `${width}px`,
      height: `${height}px`,
      boxSizing: 'border-box'
    })
    const ctx = canvas.getContext('2d')!
    const pixelRatio = getPixelRatio(canvas)
    canvas.width = width * pixelRatio
    canvas.height = height * pixelRatio
    ctx.scale(pixelRatio, pixelRatio)

    ctx.drawImage(this._mainCanvas.getElement(), 0, 0, width, height)

    if (includeOverlay) {
      ctx.drawImage(this._overlayCanvas.getElement(), 0, 0, width, height)
    }
    return canvas
  }

  protected abstract updateMain (ctx: CanvasRenderingContext2D): void
  protected abstract updateOverlay (ctx: CanvasRenderingContext2D): void
}
```

## File: widget/IndicatorWidget.ts
```typescript
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

import type DrawPane from '../pane/DrawPane'

import { WidgetNameConstants } from './types'
import DrawWidget from './DrawWidget'

import type { YAxis } from '../component/YAxis'

import GridView from '../view/GridView'
import IndicatorView from '../view/IndicatorView'
import CrosshairLineView from '../view/CrosshairLineView'
import IndicatorTooltipView from '../view/IndicatorTooltipView'
import OverlayView from '../view/OverlayView'

export default class IndicatorWidget extends DrawWidget<DrawPane<YAxis>> {
  private readonly _gridView = new GridView(this)
  private readonly _indicatorView = new IndicatorView(this)
  private readonly _crosshairLineView = new CrosshairLineView(this)
  private readonly _tooltipView = this.createTooltipView()
  private readonly _overlayView = new OverlayView(this)

  constructor (rootContainer: HTMLElement, pane: DrawPane<YAxis>) {
    super(rootContainer, pane)
    this.addChild(this._tooltipView)
    this.addChild(this._overlayView)
  }

  getName (): string {
    return WidgetNameConstants.MAIN
  }

  protected updateMain (ctx: CanvasRenderingContext2D): void {
    this.updateMainContent(ctx)
    this._indicatorView.draw(ctx)
    this._gridView.draw(ctx)
  }

  protected createTooltipView (): IndicatorTooltipView {
    return new IndicatorTooltipView(this)
  }

  protected updateMainContent (_ctx: CanvasRenderingContext2D): void {
    // to do it
  }

  protected updateOverlayContent (_ctx: CanvasRenderingContext2D): void {
    // to do it
  }

  override updateOverlay (ctx: CanvasRenderingContext2D): void {
    this._overlayView.draw(ctx)
    this._crosshairLineView.draw(ctx)
    this.updateOverlayContent(ctx)
    this._tooltipView.draw(ctx)
  }
}
```

## File: widget/SeparatorWidget.ts
```typescript
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

import type Bounding from '../common/Bounding'
import { UpdateLevel } from '../common/Updater'
import type { MouseTouchEvent } from '../common/EventHandler'
import { createDom } from '../common/utils/dom'
import { throttle } from '../common/utils/performance'
import type Nullable from '../common/Nullable'
import { isValid } from '../common/utils/typeChecks'

import Widget from './Widget'
import { WidgetNameConstants, REAL_SEPARATOR_HEIGHT } from './types'

import type SeparatorPane from '../pane/SeparatorPane'
import type DrawPane from '../pane/DrawPane'
import { PaneIdConstants } from '../pane/types'

export default class SeparatorWidget extends Widget<SeparatorPane> {
  private _dragFlag = false
  private _dragStartY = 0

  private _topPaneHeight = 0
  private _bottomPaneHeight = 0

  private _topPane: Nullable<DrawPane> = null
  private _bottomPane: Nullable<DrawPane> = null

  constructor (rootContainer: HTMLElement, pane: SeparatorPane) {
    super(rootContainer, pane)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument -- ignore
    this.registerEvent('touchStartEvent', this._mouseDownEvent.bind(this))
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument -- ignore
      .registerEvent('touchMoveEvent', this._pressedMouseMoveEvent.bind(this))
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument -- ignore
      .registerEvent('touchEndEvent', this._mouseUpEvent.bind(this))
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument -- ignore
      .registerEvent('mouseDownEvent', this._mouseDownEvent.bind(this))
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument -- ignore
      .registerEvent('mouseUpEvent', this._mouseUpEvent.bind(this))
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument -- ignore
      .registerEvent('pressedMouseMoveEvent', this._pressedMouseMoveEvent.bind(this))
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument -- ignore
      .registerEvent('mouseEnterEvent', this._mouseEnterEvent.bind(this))
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument -- ignore
      .registerEvent('mouseLeaveEvent', this._mouseLeaveEvent.bind(this))
  }

  override getName (): string {
    return WidgetNameConstants.SEPARATOR
  }

  private _dragEnabled (topPane: DrawPane, bottomPane: DrawPane): boolean {
    return topPane.getOptions().state === 'normal' &&
      bottomPane.getOptions().state === 'normal' &&
      bottomPane.getOptions().dragEnabled
  }

  private _findAdjustablePane (startIndex: number, step: number): Nullable<DrawPane> {
    const drawPanes = this.getPane().getChart().getDrawPanes()
    for (let i = startIndex; i >= 0 && i < drawPanes.length; i += step) {
      const pane = drawPanes[i]
      if (pane.getId() !== PaneIdConstants.X_AXIS && pane.getOptions().state === 'normal') {
        return pane
      }
    }
    return null
  }

  private _findDragPanes (): Nullable<{ topPane: DrawPane, bottomPane: DrawPane }> {
    const currentPane = this.getPane()
    const drawPanes = currentPane.getChart().getDrawPanes()
    const topPaneIndex = drawPanes.indexOf(currentPane.getTopPane())
    const bottomPaneIndex = drawPanes.indexOf(currentPane.getBottomPane())
    if (topPaneIndex === -1 || bottomPaneIndex === -1) {
      return null
    }
    const topPane = this._findAdjustablePane(topPaneIndex, -1)
    const bottomPane = this._findAdjustablePane(bottomPaneIndex, 1)
    if (isValid(topPane) && isValid(bottomPane) && this._dragEnabled(topPane, bottomPane)) {
      return { topPane, bottomPane }
    }
    return null
  }

  private _mouseDownEvent (event: MouseTouchEvent): boolean {
    const dragPanes = this._findDragPanes()
    if (!isValid(dragPanes)) {
      this._topPane = null
      this._bottomPane = null
      return false
    }
    this._topPane = dragPanes.topPane
    this._bottomPane = dragPanes.bottomPane
    this._dragFlag = true
    this._dragStartY = event.pageY
    this._topPaneHeight = this._topPane.getBounding().height
    this._bottomPaneHeight = this._bottomPane.getBounding().height
    return true
  }

  private _mouseUpEvent (): boolean {
    this._dragFlag = false
    this._topPane = null
    this._bottomPane = null
    this._topPaneHeight = 0
    this._bottomPaneHeight = 0
    return this._mouseLeaveEvent()
  }

  // eslint-disable-next-line @typescript-eslint/unbound-method -- ignore
  private readonly _pressedMouseMoveEvent = throttle(this._pressedTouchMouseMoveEvent, 20)

  private _pressedTouchMouseMoveEvent (event: MouseTouchEvent): boolean {
    const dragDistance = event.pageY - this._dragStartY

    const isUpDrag = dragDistance < 0
    if (isValid(this._topPane) && isValid(this._bottomPane)) {
      if (
        this._dragEnabled(this._topPane, this._bottomPane)
      ) {
        let reducedPane: Nullable<DrawPane> = null
        let increasedPane: Nullable<DrawPane> = null
        let startDragReducedPaneHeight = 0
        let startDragIncreasedPaneHeight = 0
        if (isUpDrag) {
          reducedPane = this._topPane
          increasedPane = this._bottomPane
          startDragReducedPaneHeight = this._topPaneHeight
          startDragIncreasedPaneHeight = this._bottomPaneHeight
        } else {
          reducedPane = this._bottomPane
          increasedPane = this._topPane
          startDragReducedPaneHeight = this._bottomPaneHeight
          startDragIncreasedPaneHeight = this._topPaneHeight
        }
        const reducedPaneMinHeight = reducedPane.getOptions().minHeight
        if (startDragReducedPaneHeight > reducedPaneMinHeight) {
          const reducedPaneHeight = Math.max(startDragReducedPaneHeight - Math.abs(dragDistance), reducedPaneMinHeight)
          const diffHeight = startDragReducedPaneHeight - reducedPaneHeight
          reducedPane.setBounding({ height: reducedPaneHeight })
          const increasedPaneHeight = startDragIncreasedPaneHeight + diffHeight
          increasedPane.setBounding({ height: increasedPaneHeight })
          reducedPane.setOptions({ height: reducedPaneHeight })
          increasedPane.setOptions({ height: increasedPaneHeight })
          const currentPane = this.getPane()
          const chart = currentPane.getChart()
          chart.getChartStore().executeAction('onPaneDrag', { paneId: currentPane.getId() })
          chart.layout({
            measureHeight: true,
            measureWidth: true,
            update: true,
            buildYAxisTick: true,
            forceBuildYAxisTick: true
          })
        }
      }
    }

    return true
  }

  private _mouseEnterEvent (): boolean {
    const dragPanes = this._findDragPanes()
    if (isValid(dragPanes)) {
      const chart = this.getPane().getChart()
      const styles = chart.getStyles().separator
      this.getContainer().style.background = styles.activeBackgroundColor
      return true
    }
    return false
  }

  private _mouseLeaveEvent (): boolean {
    if (!this._dragFlag) {
      this.getContainer().style.background = 'transparent'
      return true
    }
    return false
  }

  override createContainer (): HTMLElement {
    return createDom('div', {
      width: '100%',
      height: `${REAL_SEPARATOR_HEIGHT}px`,
      margin: '0',
      padding: '0',
      position: 'absolute',
      top: '-3px',
      zIndex: '20',
      boxSizing: 'border-box',
      cursor: 'ns-resize'
    })
  }

  override updateImp (container: HTMLElement, _bounding: Bounding, level: UpdateLevel): void {
    if (level === UpdateLevel.All || level === UpdateLevel.Separator) {
      const styles = this.getPane().getChart().getStyles().separator
      container.style.top = `${-Math.floor((REAL_SEPARATOR_HEIGHT - styles.size) / 2)}px`
      container.style.height = `${REAL_SEPARATOR_HEIGHT}px`
    }
  }
}
```

## File: widget/types.ts
```typescript
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

export const WidgetNameConstants = {
  MAIN: 'main',
  X_AXIS: 'xAxis',
  Y_AXIS: 'yAxis',
  SEPARATOR: 'separator'
}

export const REAL_SEPARATOR_HEIGHT = 7
```

## File: widget/Widget.ts
```typescript
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

import type Bounding from '../common/Bounding'
import { createDefaultBounding } from '../common/Bounding'
import type Updater from '../common/Updater'
import { UpdateLevel } from '../common/Updater'
import Eventful from '../common/Eventful'

import type Pane from '../pane/Pane'

import { isString, merge } from '../common/utils/typeChecks'
import type { MouseTouchEvent } from '../common/EventHandler'
import type Nullable from '../common/Nullable'

export default abstract class Widget<P extends Pane = Pane> extends Eventful implements Updater {
  /**
   * root container
   */
  private readonly _rootContainer: HTMLElement

  /**
   * Parent pane
   */
  private readonly _pane: P

  /**
   * wrapper container
   */
  private readonly _container: HTMLElement

  private readonly _bounding: Bounding = createDefaultBounding()

  private _cursor = 'crosshair'

  private _forceCursor: Nullable<string> = null

  constructor (rootContainer: HTMLElement, pane: P) {
    super()
    this._pane = pane
    this._rootContainer = rootContainer
    this._container = this.createContainer()
    rootContainer.appendChild(this._container)
  }

  setBounding (bounding: Partial<Bounding>): this {
    merge(this._bounding, bounding)
    return this
  }

  getContainer (): HTMLElement { return this._container }

  getBounding (): Bounding {
    return this._bounding
  }

  getPane (): P {
    return this._pane
  }

  override checkEventOn (_: MouseTouchEvent): boolean {
    return true
  }

  setCursor (cursor: string): void {
    if (!isString(this._forceCursor)) {
      if (cursor !== this._cursor) {
        this._cursor = cursor
        this._container.style.cursor = this._cursor
      }
    }
  }

  setForceCursor (cursor: Nullable<string>): void {
    if (cursor !== this._forceCursor) {
      this._forceCursor = cursor
      this._container.style.cursor = this._forceCursor ?? this._cursor
    }
  }

  getForceCursor (): Nullable<string> {
    return this._forceCursor
  }

  update (level?: UpdateLevel): void {
    this.updateImp(this._container, this._bounding, level ?? UpdateLevel.Drawer)
  }

  destroy (): void {
    this._rootContainer.removeChild(this._container)
  }

  abstract getName (): string

  protected abstract createContainer (): HTMLElement

  protected abstract updateImp (container: HTMLElement, bounding: Bounding, level: UpdateLevel): void
}
```

## File: widget/XAxisWidget.ts
```typescript
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

import { WidgetNameConstants } from './types'
import DrawWidget from './DrawWidget'

import type DrawPane from '../pane/DrawPane'

import type { XAxis } from '../component/XAxis'

import XAxisView from '../view/XAxisView'
import OverlayXAxisView from '../view/OverlayXAxisView'
import CrosshairVerticalLabelView from '../view/CrosshairVerticalLabelView'

export default class XAxisWidget extends DrawWidget<DrawPane<XAxis>> {
  private readonly _xAxisView = new XAxisView(this)
  private readonly _overlayXAxisView = new OverlayXAxisView(this)
  private readonly _crosshairVerticalLabelView = new CrosshairVerticalLabelView(this)

  constructor (rootContainer: HTMLElement, pane: DrawPane<XAxis>) {
    super(rootContainer, pane)
    this.setCursor('ew-resize')
    this.addChild(this._overlayXAxisView)
  }

  override getName (): string {
    return WidgetNameConstants.X_AXIS
  }

  override updateMain (ctx: CanvasRenderingContext2D): void {
    this._xAxisView.draw(ctx)
  }

  override updateOverlay (ctx: CanvasRenderingContext2D): void {
    this._overlayXAxisView.draw(ctx)
    this._crosshairVerticalLabelView.draw(ctx)
  }
}
```

## File: widget/YAxisWidget.ts
```typescript
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

import type DrawPane from '../pane/DrawPane'

import { WidgetNameConstants } from './types'
import DrawWidget from './DrawWidget'

import type { YAxis } from '../component/YAxis'

import YAxisView from '../view/YAxisView'
import CandleLastPriceLabelView from '../view/CandleLastPriceLabelView'
import IndicatorLastValueView from '../view/IndicatorLastValueView'
import OverlayYAxisView from '../view/OverlayYAxisView'
import CrosshairHorizontalLabelView from '../view/CrosshairHorizontalLabelView'
import { DEFAULT_AXIS_ID } from '../component/Axis'

export default class YAxisWidget extends DrawWidget<DrawPane<YAxis>> {
  private readonly _yAxis: YAxis
  private readonly _yAxisView = new YAxisView(this)
  private readonly _candleLastPriceLabelView = new CandleLastPriceLabelView(this)
  private readonly _indicatorLastValueView = new IndicatorLastValueView(this)
  private readonly _overlayYAxisView = new OverlayYAxisView(this)
  private readonly _crosshairHorizontalLabelView = new CrosshairHorizontalLabelView(this)

  constructor (rootContainer: HTMLElement, pane: DrawPane<YAxis>, yAxis: YAxis) {
    super(rootContainer, pane)
    this._yAxis = yAxis
    this.setCursor('ns-resize')
    this.addChild(this._overlayYAxisView)
  }

  getAxisComponent (): YAxis {
    return this._yAxis
  }

  override getName (): string {
    return WidgetNameConstants.Y_AXIS
  }

  override updateMain (ctx: CanvasRenderingContext2D): void {
    this._yAxisView.draw(ctx)
    if (this._yAxis.id === DEFAULT_AXIS_ID && this.getAxisComponent().isInCandle()) {
      this._candleLastPriceLabelView.draw(ctx)
    }
    this._indicatorLastValueView.draw(ctx)
  }

  override updateOverlay (ctx: CanvasRenderingContext2D): void {
    this._overlayYAxisView.draw(ctx)
    this._crosshairHorizontalLabelView.draw(ctx)
  }
}
```
