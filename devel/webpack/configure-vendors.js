'use strict'

// libraries
const path = require('path')

// Webpack plugins
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const autoprefixer = require('autoprefixer')

// Additional imports
const cli = require('../utils/cli')
const AppInfo = require('../utils/appinfo')

// define your stuff
const baseDir = path.join(__dirname, '../../')
const buildDir = path.join(baseDir, 'build')
const appinfo = new AppInfo()

cli.info('load app config from ./devel/webpack/configure-vendors.js')
module.exports = {
  name: 'vendors libraries',
  mode: 'production',
  // Add additional entripoints here to deal with vendor libraries
  // if one starts getting to big.
  // e.g. vendor libs like
  //    lodash would be in vendors.js and
  //    all aframe components you install would be in aframe-lib.js
  entry: {
    vendors: [
      path.join(baseDir, 'src', 'vendors', 'js', 'vendors.js')
    ],
    'vendors-custom': [
      path.join(baseDir, 'src', 'vendors', 'style', 'vendors-custom.scss')
    ]
  },
  output: {
    path: path.join(buildDir, 'app'),
    filename: 'js/[name].js',
  },
  // vendor stuff
  performance: {
    hints: false,
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: false
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  },
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      }
    }, {
      test: /\.(sa|sc|c)ss$/,
      use: [
        MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader',
          options: {
            sourceMap: false
          }
        },
        {
          loader: 'postcss-loader',
          options: {
            sourceMap: false,
            plugins: () => [
              autoprefixer({
                browsers: ['last 3 versions', 'iOS 9']
              })
            ]
          }
        }, {
          loader: 'sass-loader',
          options: {
            outputStyle: 'compressed'
          }
        }
      ],
    }]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].css'
    }),
  ]
}
