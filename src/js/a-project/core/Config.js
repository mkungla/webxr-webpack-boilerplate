'use strict';

class Config {
  /**
   * Config
   */
  constructor () {
    this.host = 'localhost';
    this.scheme = 'http';
    this.path = '/api';
    this.port = '9000';
    this.stats = false;
  }

  /**
   * Is it Development environment
   *
   * @returns {boolean}
   */
  isDev () {
    return this.host === 'localhost';
  }

  /**
   * Get full url to Server API
   *
   * @returns {string}
   */
  getServerUrl () {
    return this.scheme + '://' + this.host + ((this.port) ? ':' + this.port : '') + this.path;
  }

  /**
   * Set configuration option
   *
   * @param hostname
   */
  set (data) {
    for (let [key, value] of Object.entries(data)) {
      if (this.hasOwnProperty(key)) {
        this[key] = value;
      } else {
        console.warn('Invalid configuration property: ' + key);
      }
    }
  }
}

export {Config};
