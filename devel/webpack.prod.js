'use strict'

const webpack = require('webpack')
const merge = require('webpack-merge')
const common = require('./webpack/webpack.config.js')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const PLUGINS = [
  new UglifyJSPlugin({
    test: /\.js($|\?)/i,
    sourceMap: true,
    uglifyOptions: {
      compress: true
    }
  }),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('production')
  })
]

module.exports = merge.multiple(common, {
  app: {
    mode: 'production',
    devtool: 'source-map',
    plugins: PLUGINS
  },
  staticAssets: {
    mode: 'production',
  },
  vendors: {
    mode: 'production',
  },
  pwa: {
    mode: 'production',
  },
})
