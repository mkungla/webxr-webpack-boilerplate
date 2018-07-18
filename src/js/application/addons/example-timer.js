/* global document */

export default {
  name: 'example-timer',
  data: {
    selector: 'timer'
  },

  /**
   * Called once when you register the Addon
   */
  setup() {
    this.log.debug('setup')
    this.el = null
    this.value = '00:00:000'
    this.current = 0
    this.started = 0
  },

  /**
   * Called everytime when you start the application
   * Sets the data to values passed to registerAddon
   */
  start() {
    const selector = this.data.seletor

    this.el = document.getElementById(selector)
    if (!this.el) {
      return
    }
    this.reset()
    this.log.debug('start')
  },

  /**
   * Called when application play is called
   */
  play() {
    if (!this.el) {
      return
    }
    this.started = this.started ? this.started : this.now()
    this.log.debug('play')
  },

  /**
   * Called when application pause is called
   */
  pause() {
    if (!this.el) {
      return
    }
    this.current = this.started ? this.current + this.now() - this.started : this.current
    this.started = 0
    this.log.debug('pause')
  },

  /**
   * Called in every render loop
   */
  tick() {
    if (!this.el) {
      return
    }

    this.updateVal()
  },

  /**
   * Called when application stop is called
   */
  dispose() {
    this.log.debug('dispose')
    this.current = this.started ? this.current + this.now() - this.started : this.current
    this.started = 0
    this.reset()
    this.el = null
  },

  /**
   * CUSTOM API
   */
  now() {
    return (new Date()).getTime()
  },
  reset() {
    this.value = '00:00:000'
    this.started = 0
    this.current = 0
    this.updateVal()
  },
  pad(n, size) {
    const s = `0000${n}`

    return s.substr(s.length - size)
  },
  updateVal() {
    if (!this.el) {
      return
    }
    let newTime = this.current + (this.started ? this.now() - this.started : 0)

    /* eslint no-magic-numbers: off*/
    newTime %= (60 * 60 * 1000)
    const m = Math.floor(newTime / (60 * 1000))

    newTime %= (60 * 1000)
    const s = Math.floor(newTime / 1000)
    const ms = newTime % 1000

    this.value = `${this.pad(m, 2)}:${this.pad(s, 2)}:${this.pad(ms, 3)}`
    this.el.textContent = this.value
  }
}
