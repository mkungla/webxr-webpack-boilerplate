'use strict'

// libraries
const path = require('path')

// Webpack plugins
const CopyWebpackPlugin = require('copy-webpack-plugin')
// Additional imports
const cli = require('../utils/cli')

// define your stuff
const baseDir = path.join(__dirname, '../../')
const buildDir = path.join(baseDir, 'build')

const PLUGINS = [
  new CopyWebpackPlugin([{
    from: path.join(baseDir, 'src', 'static'),
    to: path.join(buildDir, 'assets', 'static'),
  }])
]

cli.info('load app config from ./devel/webpack/configure-static-assets.js')
module.exports = {
  name: 'static project assets',
  mode: 'production',
  entry: './src/static/index.js',
  output: {
    path: path.join(buildDir, 'assets', 'static'),
    filename: 'index.js',
  },
  plugins: PLUGINS,
  module: {
    rules: [{
        test: /\.html$/,
        use: {
          loader: 'html-loader'
        }
      },
      {
        test: /\.json$/,
        use: {
          loader: 'json-loader'
        }
      }
    ]
  }
}
