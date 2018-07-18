
// Webpack configs
const common = require('./webpack/webpack.config.js')

// Webpack plugins
const merge = require('webpack-merge')

// define your stuff
const PLUGINS = []

module.exports = merge.multiple(common, {
  app: {
    mode: 'development',
    devtool: 'inline-source-map',
    plugins: PLUGINS,
  },
  staticAssets: {},
  vendors: {},
  pwa: {},
})
