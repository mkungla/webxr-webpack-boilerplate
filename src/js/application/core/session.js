import engine from 'store/src/store-engine'
import sessionStorage from 'store/storages/sessionStorage'
import Logger from './logger'
import defaultsPlugin from 'store/plugins/defaults'

const configDefaults = {
  'loglevel': 'info',
}

export default class Session {
  constructor(config) {
    this.store = engine.createStore([sessionStorage], defaultsPlugin)
    this.camera = null
    this.loggers = {}
    if (!this.get('config') && config) {
      this.store.defaults(configDefaults)
      if (config) {
        this.set('config', config)
      }
    }
    this.log = this.getLogger('session')
    this.log.debug('setup session')
  }

  /**
   * [getLogger description]
   * @param {String} [ns='anonymous'] [description]
   * @return {[type]} [description]
   */
  getLogger(ns = 'anonymous') {
    if (ns in this.loggers) {
      return this.loggers[ns]
    }
    this.loggers[ns] = new Logger(ns, this.get('config').logLevel)
    return this.loggers[ns]
  }

  /**
   * [get description]
   * @param {[type]} key [description]
   * @return {[type]} [description]
   */
  get(key) {
    return this.store.get(key)
  }

  /**
   * [set description]
   * @param {[type]} key [description]
   * @param {[type]} val [description]
   */
  set(key, val) {
    this.store.set(key, val)
  }
}
