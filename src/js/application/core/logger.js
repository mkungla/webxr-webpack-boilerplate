const logger = require('debug')

const DEBUG = 5
const OK = 4
const INFO = 3
const WARN = 2
const ERROR = 1

export default class Logger {
  constructor(ns, level) {
    /* config */
    this.formatters = {}
    this.formatters.h = (v) => v.toString('hex')

    const l = this.getLevelNr(level)

    /* logger */
    if (l === DEBUG) {
      this.d = logger(`webapp:${ns}:debug`)
      this.d.color = 'gray'
    }
    if (l >= OK) {
      this.o = logger(`webapp:${ns}:ok`)
      this.o.color = 'green'
    }
    if (l >= INFO) {
      this.i = logger(`webapp:${ns}:info`)
      this.i.color = 'teal'
    }
    if (l >= WARN) {
      this.w = logger(`webapp:${ns}:warn`)
      this.w.color = 'orange'
    }
    if (l >= ERROR) {
      this.e = logger(`webapp:${ns}:error`)
      this.e.color = 'red'
    }

    if (l > 0) {
      logger.enable('webapp:*:debug, webapp:*:ok, webapp:*:error, webapp:*:info, webapp:*:warn')
    }
  }

  // logger.enable(`webxr:${ns}:debug`)
  debug(...args) {
    if (this.d && this.d.enabled) {
      this.d(...args)
    }
  }

  ok(...args) {
    if (this.o && this.o.enabled) {
      this.o(...args)
    }
  }

  info(...args) {
    if (this.i && this.i.enabled) {
      this.i(...args)
    }
  }

  warn(...args) {
    if (this.w && this.w.enabled) {
      this.w(...args)
    }
  }

  error(...args) {
    if (this.e && this.e.enabled) {
      this.e(...args)
    }
  }

  getLevelNr(level) {
    let l = 0

    switch (level) {
      case 'debug':
        l = DEBUG
        break;
      case 'ok':
        l = OK
        break
      case 'info':
        l = INFO
        break
      case 'warn':
        l = WARN
        break
      case 'error':
        l = ERROR
        break
      default:
    }
    return l
  }

}
