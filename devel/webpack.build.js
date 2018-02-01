'use strict'

const webpack = require('webpack')
const merge = require('webpack-merge')
const common = require('./webpack.common.js')

let PLUGINS = [
  new webpack.optimize.UglifyJsPlugin({
    test: /\.js($|\?)/i,
    sourceMap: true,
    uglifyOptions: {compress: true}
  })
]

module.exports = merge(common, {
  devtool: 'source-map',
  plugins: PLUGINS
})
