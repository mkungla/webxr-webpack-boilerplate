'use strict'

// libraries
const path = require('path')

// Webpack plugins
const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HandlebarsPlugin = require('handlebars-webpack-plugin')

// Additional imports
const cli = require('../utils/cli')
const AppInfo = require('../utils/appinfo')

// define your stuff
const baseDir = path.join(__dirname, '../../')
const buildDir = path.join(baseDir, 'build')
const appinfo = new AppInfo()
const sassTheme = appinfo.sassTheme || 'red'

const PLUGINS = [
  new webpack.DefinePlugin({
    PROJECT: JSON.stringify(appinfo),
  }),
  new CleanWebpackPlugin(['build'], {
    // Absolute path to your webpack root folder (paths appended to this)
    // Default: root of your package
    root: baseDir,
    // Write logs to console.
    verbose: true,
    // Use boolean "true" to test/emulate delete. (will not remove files).
    // Default: false - remove files
    dry: false,
    // If true, remove files on recompile.
    // Default: false
    watch: false,
    // Instead of removing whole path recursively,
    // remove all path's content with exclusion of provided immediate children.
    // Good for not removing shared files from build directories.
    exclude: [
      '.gitkeep',
      'assets'
    ],
    // allow the plugin to clean folders outside of the webpack root.
    // Default: false - don't allow clean folder outside of the webpack root
    allowExternal: false,
    // perform clean just before files are emitted to the output dir
    // Default: false
    beforeEmit: false,
  }),
  new MiniCssExtractPlugin({
    filename: 'css/[name].css'
  }),
  new HandlebarsPlugin({
    // path to hbs scene entry file(s)
    entry: path.join(baseDir, 'src', 'hbs', '*.hbs'),
    // output path and filename(s). This should lie within the webpacks output-folder
    // if ommited, the input filepath stripped of its extension will be used
    output: path.join(buildDir, '[name].html'),
    // data passed to main hbs template: `main-template(data)`
    data: appinfo,
    // globbed path to partials, where dir/filename is unique
    partials: [
      path.join(baseDir, 'src', 'hbs', 'partials', '**', '*.hbs')
    ],
    // hooks
    onBeforeSetup: function(Handlebars) {
      cli.info('Handlebars version: ', Handlebars.VERSION)
    },
    // onBeforeAddPartials: function(Handlebars, partialsMap) {
    //   // cli.info('update Handlebars partials')
    // },
    // onBeforeCompile: function (Handlebars, templateContent) {
    //   if (templateContent.startsWith('<a-scene')) {
    //     return `{{> aframe/header}}${templateContent}{{> aframe/footer}}`
    //   }
    //   return `{{> html/header}}${templateContent}{{> html/footer}}`
    // },
    // onBeforeRender: function(Handlebars, data) {
    //   cli.info('onBeforeRender: ')
    //   data.app = appinfo
    // },
    // onBeforeSave: function(Handlebars, resultHtml, filename) {},
    // onDone: function(Handlebars, filename) {
    //   cli.ok(`updated: ${filename}`)
    // }
  })
]

cli.info('load app config from ./devel/webpack/configure-app.js')
module.exports = {
  name: 'app',
  entry: {
    app: [
      path.join(baseDir, 'src', 'js', 'app.js'),
      path.join(baseDir, 'src', 'style', 'app.scss'),
    ],
    'lib-aframe': [
      path.join(baseDir, 'src', 'js', 'lib-aframe.js'),
    ],
    'background.worker': [
      path.join(baseDir, 'src', 'js', 'background.worker.js'),
    ]
  },
  plugins: PLUGINS,
  output: {
    path: path.join(buildDir, 'app'),
    filename: path.join('js', '[name].js'),
    globalObject: 'this'
  },
  module: {
    rules: [{
      test: /\.(sa|sc|c)ss$/,
      use: [
        MiniCssExtractPlugin.loader,
        'css-loader',
        'postcss-loader',
        {
          loader: 'sass-loader',
          options: {
            data: `$theme: ${sassTheme};`,
          }
        }
      ],
    }, {
      test: /\.js$/,
      exclude: /(node_modules)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      }
    }]
  },
}
