const packageJson = require('../../package')
const aframeVersion = require('aframe/package').version
const appConfig = require('../../app')

const configDefaults = {
  title: packageJson.name || 'WebXR Webpack Boilerplate',
  name: packageJson.name || 'webxr-webpack-boilerplate',
  version: packageJson.version || '0.0.1',
  description: packageJson.description || 'webxr demo',
  keywords: packageJson.keywords || 'webxr, demo',
  themecolor: '#ee295f',
  mstilecolor: '#ee295f',
  logLevel: 'warn',
  ppaframe: false,
  sassTheme: 'red',
  urlPrefix: '',
  // add current A-Frame version to app info
  aframe: aframeVersion
}

class AppInfo {
  constructor() {
    if (appConfig !== null) {
      Object.assign(this, appConfig)
    }
    this.validate()
  }

  validate() {
    for (const [key, val] of Object.entries(configDefaults)) {
      if (!(key in this)) {
        this[key] = val
      }
    }
  }
}
module.exports = AppInfo
