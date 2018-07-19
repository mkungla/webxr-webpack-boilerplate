const packageJson = require('../../package')
const aframeVersion = require('aframe/package').version
const appConfig = require('../../app')

class AppInfo {
  constructor() {
    if (appConfig !== null) {
      Object.assign(this, appConfig)
    }
    this.title = this.title || packageJson.name
    this.name = this.name || packageJson.name
    this.version = this.version || packageJson.version
    this.description = this.description || packageJson.description
    this.keywords = this.keywords || packageJson.keywords
    // add current A-Frame version to app info
    this.aframe = aframeVersion
  }
}
module.exports = AppInfo
