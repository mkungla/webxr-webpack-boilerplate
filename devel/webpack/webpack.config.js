'use strict'

// libraries

// Webpack plugins

// Webpack configs
const appWebpackConfig = require('./configure-app')
const staticAssetsWebpackConfig = require('./configure-static-assets')
const vendorsWebpackConfig = require('./configure-vendors')
const pwaWebpackConfig = require('./configure-pwa')

// Additional imports

// define your stuff

module.exports = {
  /**
   * Compiler for app
   *
   * @type {Object}
   */
  app: appWebpackConfig,

  /**
   * Compiler to handle or copy static assets to ./build/assets/static
   *
   * @type {Object}
   */
  staticAssets: staticAssetsWebpackConfig,

  /**
   * Compiler to build vendor libraries
   *
   * @type {Object}
   */
  vendors: vendorsWebpackConfig,

  /**
   * Compiler to compile PWA resources
   *
   * @type {[type]}
   */
  pwa: pwaWebpackConfig,
}
