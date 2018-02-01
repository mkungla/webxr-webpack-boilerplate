const webpack = require('webpack')
const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const cli = require('./utils/cli')
const packageJson = require('../package')

let PLUGINS = [
  new webpack.NamedModulesPlugin()
]

cli.banner(packageJson.name, packageJson.version, 9000)

module.exports = merge(common, {
  plugins: PLUGINS,
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './build',
    allowedHosts: [
      '.github.com'
    ],
    host: '127.0.0.1',
    port: 9000,
    https: false,
    hot: false,
    inline: true,
    noInfo: true
  },
  module: {
    rules: []
  }
})
