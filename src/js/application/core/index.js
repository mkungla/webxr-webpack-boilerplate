/* global window AFRAME THREE */
import Session from './session'

import storeEngine from 'store/src/store-engine'
import localStorage from 'store/storages/localStorage'

export default class Application {
  /**
   * Main application constructor
   * Yo may want to set properties and their defaults here before application is sealed
   */
  constructor(conf) {
    this.session = new Session(conf)
    // generic logger
    this.log = this.session.getLogger('app')

    // set true after initial setup
    this.initialized = false

    // state is application playing
    this.isPlaying = false

    // state is application shutting down so most of calls should be blocked
    this.isDisposing = false

    // A-Frame is available in window
    this.hasAframe = false

    // will hold registered addons
    this.addons = {}

    // Reference to <a-scene> if AFRAME is present
    this.aframe = null

    // Used when A-Frame is not available
    this.rAFreq = null

    // Register background worker
    this.bgWorker = null

    // localStorage
    this.store = null

    // initialize
    this.init()

    // preventing new properties from being added to application and marking all
    // existing properties as non-configurable.
    // Do throw TypeError: can't define property "x": Object is not extensible
    // That will prevent you add by accident properties which may not be accessible
    // after this.stop
    Object.seal(this)
  }

  /**
   * initialize application instance
   */
  init() {
    // check that application is not in shutdown progress
    if (this.disposing('init'))
      return

    // setup localstorage
    this.store = storeEngine.createStore(localStorage)

    /* eslint consistent-this: ["error", "app"] */
    const app = this

    // Application initialization
    if (typeof AFRAME === 'undefined') {
      this.hasAframe = false
      this.polyfill()
      this.tick = this.tick.bind(this)
    } else {
      // use A-Frame render loop
      this.hasAframe = true
      const runtimeSysName = `${this.session.get('config').name}-runtime}`

      this.log.debug(`register ${runtimeSysName} system for A-Frame`)
      AFRAME.registerSystem(runtimeSysName, {
        init() {
          app.aframe = this.el
        },
        tick() {
          app.tick()
        },
      })
    }

    this.registerServiceWorker()

    // Application initialized
    this.log.debug('application is initialized')
    this.log.info(`Version: ${this.session.get('config').version}`)
    this.log.info(`A-Frame: ${this.hasAframe ? AFRAME.version : 'not included'}`)
    this.log.info(`three.js: ${typeof THREE === 'undefined' ? 'not included' : THREE.REVISION}`)
    this.initialized = true
  }

  /**
   * Play starts the Application
   *
   * @return {[type]} [description]
   */
  play() {
    // check that application is not in shutdown progress
    if (this.disposing('play'))
      return
    // verfify that application is initialized
    if (!this.initialized || this.isPlaying) {
      this.log.error('can not play, application not initialized correctly or already playing.')
      return
    }

    // play A-Frame
    if (this.hasAframe && this.session.get('config').ppaframe) {
      this.aframe.play()
    }
    this.log.debug(this.session.get('config').ppaframe)
    for (const [name, addon] of Object.entries(this.addons)) {
      // initialize addons if thats first call to start
      if (addon.app && addon.enabled) {
        // call addon start
        this.addons[name].isPlaying = true
        this.addons[name].play()
      }
    }
    this.log.ok('application is playing')
    this.isPlaying = true
    // call first tick
    this.tick()
  }

  /**
   * Pause application
   */
  pause() {
    // check that application is not in shutdown progress
    if (this.disposing('pause'))
      return

    // pause A-Frame
    if (this.hasAframe && this.session.get('config').ppaframe) {
      this.aframe.pause()
    }

    for (const [name, addon] of Object.entries(this.addons)) {
      // initialize addons if thats first call to start
      if (addon.app) {
        // call addon pause
        this.addons[name].isPlaying = false
        this.addons[name].pause()
      }
    }
    this.isPlaying = false
    this.log.ok('application is paused')
  }

  /**
   * Power on appplication engine
   *
   * Start the app engine based on configuration
   *  @return {Promise}   Promise which is resolved when everthing is started up
   */
  start() {
    // check that application is not in shutdown progress
    if (this.disposing('start'))
      return new Promise((resolve, reject) => reject(Error("blocked")))

    return new Promise((resolve, reject) => {
      this.registerWorkers()

      for (const [name, addon] of Object.entries(this.addons)) {
        // initialize addons if thats first call to start
        if (!addon.app && addon.enabled) {
          this.addons[name].app = this
          this.addons[name].setup()
          // preventing new properties from being added to addon and marking all
          // existing properties as non-configurable.
          // Do throw TypeError: can't define property "x": Object is not extensible
          // That will prevent you add by accident properties which may not be accessible
          // after this.stop
          Object.seal(this.addons[name])
        }
        // call addon start
        this.addons[name].start()
      }
      if (this.initialized) {
        this.play()
      }
      if (this.isPlaying) {
        this.log.debug('started')
        resolve(this.session.getLogger('app'))
      } else {
        const err = 'startup failed'

        this.log.error(err)
        reject(Error(err))
      }
    })
  }

  /**
   * Power off system
   *
   * @return {Promise}  Promise which is resolved when everthing is cleaned up
   */
  stop() {
    // check that application is not in shutdown progress already
    if (this.disposing('stop'))
      return new Promise((resolve, reject) => reject(Error("blocked")))

    this.isDisposing = true
    this.isPlaying = false
    this.log.debug('preparing shutdown')
    return new Promise((resolve, reject) => {
      let down = false

      if (this.bgWorker) {
        this.bgWorker.terminate()
        this.bgWorker = null
      }

      if (this.rAFreq) {
        this.log.info('stopping engine', this.rAFreq)
        window.cancelAnimationFrame(this.rAFreq)
        this.rAFreq = null
      }

      // teardown addons
      for (const [name, addon] of Object.entries(this.addons)) {
        // initialize addons if thats first call to start
        if (addon.app) {
          // call addon pause
          this.addons[name].isPlaying = false
          this.addons[name].dispose()
        }
      }
      down = true
      if (down) {
        this.log.ok('shutdown complete')
        this.isDisposing = false
        resolve(this.session.getLogger('app'))
      } else {
        const err = 'failed to shutdown'

        this.log.error(err)
        this.isDisposing = false
        reject(Error(err))
      }
    })
  }

  /**
   * Appplication engine loop
   */
  tick() {
    if (!this.isPlaying || this.isDisposing) {
      return
    }
    for (const [name, addon] of Object.entries(this.addons)) {
      if (addon.enabled && addon.isPlaying) {
        this.addons[name].tick()
      }
    }

    if (!this.hasAframe) {
      this.rAFreq = window.requestAnimationFrame(this.tick)
    }
  }

  /**
   * Helper to prevent you calling any application methods when Application
   * is shutting down
   *
   * @param {[type]} fnName reference to where check was called
   * @return {[type]} [description]
   */
  disposing(fnName) {
    if (this.isDisposing) {
      this.log.error(`can not call ${fnName} while webapp is shutting down`)
      return true
    }
    return false
  }

  /**
   * registerAddon description
   * @param {[type]} addon
   * @param {[type]} data  Addon configuration
   * @return {[type]} [description]
   */
  registerAddon(addon, data) {
    if (!('name' in addon)) {
      this.log.error('addon mus have a name')
      return
    }
    if (this.addons[addon.name]) {
      this.log.error(`The addon ${addon.name} has been already registered.`)
      return
    }
    addon.app = null
    addon.aframeRequired = false
    // perhaps should do a deep merge of data and addon defaults instead of replace
    addon.data = data ? data : addon.data
    addon.enabled = true
    addon.isPlaying = false
    addon.log = this.session.getLogger(addon.name)
    this.addons[addon.name] = addon
  }

  /**
   * polyfill
   */
  polyfill() {
    // requestAnimationFrame and cancelAnimationFrame polyfill
    if (window.requestAnimationFrame && window.cancelAnimationFrame) {
      return
    }
    this.log.warn('using requestAnimationFrame and cancelAnimationFrame polyfill')
    let lastTime = 0
    const v = ['ms', 'moz', 'webkit', 'o']

    for (let x = 0; x < v.length && !window.requestAnimationFrame; ++x) {
      window.requestAnimationFrame = window[`${v[x]  }RequestAnimationFrame`]
      window.cancelAnimationFrame = window[`${v[x]  }CancelAnimationFrame`] ||
        window[`${v[x]  }CancelRequestAnimationFrame`]
    }
    if (!window.requestAnimationFrame) {
      window.requestAnimationFrame = function(cb) {
        const currTime = new Date().getTime()
        /* eslint no-magic-numbers: off*/
        const timeToCall = Math.max(0, 16 - (currTime - lastTime))
        const cbTime = currTime + timeToCall
        const id = window.setTimeout(() => {
          cb(cbTime)
        }, timeToCall)

        lastTime = currTime + timeToCall
        return id
      }
    }
    if (!window.cancelAnimationFrame) {
      window.cancelAnimationFrame = function(id) {
        clearTimeout(id)
      }
    }
  }

  /**
   * registerServiceWorker if needed
   */
  registerServiceWorker() {
    // // ServiceWorker is a progressive technology. Ignore unsupported browsers
    // if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator && PROJECT.serviceWorker) {
    //   info('CLIENT: service worker registration in progress.')
    //   navigator.serviceWorker.register('/app/js/service-worker.js').then(() => {
    //     info('CLIENT: service worker registration complete.')
    //   }, () => {
    //     info('CLIENT: service worker registration failure.')
    //   })
    // } else {
    //   info('CLIENT: service worker is not registered.')
    // }
  }

  /**
   * register Workers if needed
   */
  registerWorkers() {
    // if (window.Worker) {
    //   this.bgWorker = new Worker('/app/js/background.worker.js')
    //   this.bgWorker.onmessage = event => {
    //     this.log.debug(event)
    //   }
    //   this.bgWorker.onmessageerror = error => {
    //     this.log.error(error)
    //   }
    //   this.bgWorker.onerror = error => {
    //     this.log.error(error)
    //   }
    // }
  }
}
