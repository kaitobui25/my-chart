export default class ReplayController {
  constructor ({ chart, restoreDataLoader, batchSize = 400, baseIntervalMs = 1000, onStateChange = () => {} }) {
    if (chart == null || typeof chart.setDataLoader !== 'function') {
      throw new Error('ReplayController requires a chart instance.')
    }
    if (typeof restoreDataLoader !== 'function') {
      throw new Error('ReplayController requires a restoreDataLoader callback.')
    }

    this.chart = chart
    this.restoreDataLoader = restoreDataLoader
    this.batchSize = Math.max(50, Math.round(batchSize))
    this.baseIntervalMs = Math.max(50, Math.round(baseIntervalMs))
    this.onStateChange = onStateChange

    this.active = false
    this.playing = false
    this.speed = 1
    this.startIndex = -1
    this.currentIndex = -1
    this.fullData = []
    this.subscriber = null
    this.timer = null
  }

  getState () {
    const currentBar = this.fullData[this.currentIndex] ?? null
    return {
      active: this.active,
      playing: this.playing,
      speed: this.speed,
      startIndex: this.startIndex,
      currentIndex: this.currentIndex,
      totalBars: this.fullData.length,
      currentBar,
      atStart: !this.active || this.currentIndex <= this.startIndex,
      atEnd: !this.active || this.currentIndex >= this.fullData.length - 1
    }
  }

  enter ({ dataList, startTimestamp }) {
    if (!Array.isArray(dataList) || dataList.length < 2) {
      throw new Error('Replay requires at least two candles.')
    }

    const startIndex = this.#findExactTimestampIndex(dataList, startTimestamp)
    if (startIndex < 0) {
      throw new Error('The selected candle is not available in replay data.')
    }
    if (startIndex >= dataList.length - 1) {
      throw new Error('Choose an earlier candle so replay has future bars to reveal.')
    }

    this.pause()
    this.fullData = dataList
    this.startIndex = startIndex
    this.currentIndex = startIndex
    this.active = true
    this.subscriber = null

    this.chart.setDataLoader(this.#createDataLoader())
    this.#scrollToCurrentBar()
    this.#emit()
  }

  next () {
    if (!this.active || this.currentIndex >= this.fullData.length - 1) {
      this.pause()
      return false
    }

    this.currentIndex += 1
    const nextBar = this.fullData[this.currentIndex]
    if (typeof this.subscriber === 'function') {
      this.subscriber(nextBar)
    } else {
      this.chart.resetData()
    }
    this.#scrollToCurrentBar()

    if (this.currentIndex >= this.fullData.length - 1) {
      this.pause(false)
    }
    this.#emit()
    return true
  }

  previous () {
    if (!this.active || this.currentIndex <= this.startIndex) {
      return false
    }
    this.pause(false)
    this.currentIndex -= 1
    this.chart.resetData()
    this.#scrollToCurrentBar()
    this.#emit()
    return true
  }

  restart () {
    if (!this.active) {
      return false
    }
    this.pause(false)
    this.currentIndex = this.startIndex
    this.chart.resetData()
    this.#scrollToCurrentBar()
    this.#emit()
    return true
  }

  seek (index) {
    if (!this.active) {
      return false
    }
    const nextIndex = Math.min(Math.max(Math.round(index), this.startIndex), this.fullData.length - 1)
    if (nextIndex === this.currentIndex) {
      return true
    }
    this.pause(false)
    this.currentIndex = nextIndex
    this.chart.resetData()
    this.#scrollToCurrentBar()
    this.#emit()
    return true
  }

  play () {
    if (!this.active || this.playing || this.currentIndex >= this.fullData.length - 1) {
      return false
    }
    this.playing = true
    this.#emit()
    this.#scheduleNext()
    return true
  }

  pause (emit = true) {
    if (this.timer !== null) {
      window.clearTimeout(this.timer)
      this.timer = null
    }
    const changed = this.playing
    this.playing = false
    if (emit && changed) {
      this.#emit()
    }
  }

  togglePlay () {
    return this.playing ? (this.pause(), false) : this.play()
  }

  setSpeed (speed) {
    const normalized = Number(speed)
    if (!Number.isFinite(normalized) || normalized <= 0) {
      return false
    }
    this.speed = normalized
    if (this.playing) {
      this.#scheduleNext()
    }
    this.#emit()
    return true
  }

  exit () {
    if (!this.active) {
      return false
    }

    this.pause(false)
    this.active = false
    this.subscriber = null
    this.startIndex = -1
    this.currentIndex = -1
    this.fullData = []
    this.restoreDataLoader()
    this.#emit()
    return true
  }

  dispose () {
    this.pause(false)
    this.subscriber = null
    this.fullData = []
    this.active = false
  }

  #createDataLoader () {
    return {
      getBars: ({ type, timestamp, callback }) => {
        const { bars, more } = this.#sliceReplayBars(type, timestamp)
        callback(bars, more)
      },
      subscribeBar: ({ callback }) => {
        this.subscriber = callback
      },
      unsubscribeBar: () => {
        this.subscriber = null
      }
    }
  }

  #sliceReplayBars (type, timestamp) {
    const availableEnd = this.currentIndex + 1
    if (type === 'forward') {
      const end = this.#findFirstGreaterOrEqual(this.fullData, timestamp, availableEnd)
      const start = Math.max(0, end - this.batchSize)
      return {
        bars: this.fullData.slice(start, end),
        more: { forward: start > 0, backward: false }
      }
    }

    if (type === 'backward') {
      return {
        bars: [],
        more: { forward: false, backward: false }
      }
    }

    const start = Math.max(0, availableEnd - this.batchSize)
    return {
      bars: this.fullData.slice(start, availableEnd),
      more: { forward: start > 0, backward: false }
    }
  }

  #findFirstGreaterOrEqual (dataList, timestamp, endExclusive) {
    if (!Number.isFinite(timestamp)) {
      return Math.min(endExclusive, dataList.length)
    }
    let low = 0
    let high = Math.min(endExclusive, dataList.length)
    while (low < high) {
      const middle = Math.floor((low + high) / 2)
      if (dataList[middle].timestamp < timestamp) {
        low = middle + 1
      } else {
        high = middle
      }
    }
    return low
  }

  #findExactTimestampIndex (dataList, timestamp) {
    const index = this.#findFirstGreaterOrEqual(dataList, timestamp, dataList.length)
    return dataList[index]?.timestamp === timestamp ? index : -1
  }

  #scheduleNext () {
    if (this.timer !== null) {
      window.clearTimeout(this.timer)
    }
    if (!this.playing) {
      this.timer = null
      return
    }
    const delay = Math.max(50, Math.round(this.baseIntervalMs / this.speed))
    this.timer = window.setTimeout(() => {
      this.timer = null
      if (this.next() && this.playing) {
        this.#scheduleNext()
      }
    }, delay)
  }

  #scrollToCurrentBar () {
    window.requestAnimationFrame(() => {
      if (!this.active) return
      this.chart.scrollToRealTime(0)
    })
  }

  #emit () {
    this.onStateChange(this.getState())
  }
}
