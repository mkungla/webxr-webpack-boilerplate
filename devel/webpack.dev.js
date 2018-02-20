'use strict'

const webpack = require('webpack')
const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const cli = require('./utils/cli')
const packageJson = require('../package')

let PLUGINS = [
  new webpack.NamedModulesPlugin()
]

cli.banner(packageJson.name, packageJson.version, 9000)

let devSettings = packageJson.devSettings || {}
devSettings.host = devSettings.host || 'localhost'
devSettings.port = devSettings.port || 9000
devSettings.https = devSettings.https || false
module.exports = merge(common, {
  plugins: PLUGINS,
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './build',
    allowedHosts: devSettings.allowedHosts,
    host: devSettings.host,
    port: devSettings.port,
    https: devSettings.https,
    hot: false,
    inline: true,
    noInfo: true,
    after: (app) => {
      cli.banner(packageJson.name, packageJson.version, devSettings.host, devSettings.port)
    }
  },
  module: {
    rules: []
  }
})
