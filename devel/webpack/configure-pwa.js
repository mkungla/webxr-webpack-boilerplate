'use strict'

// libraries
const path = require('path')

// Webpack plugins
const webpack = require('webpack')
const HandlebarsPlugin = require('handlebars-webpack-plugin')
const WebappWebpackPlugin = require('webapp-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

// Additional imports
const cli = require('../utils/cli')
const AppInfo = require('../utils/appinfo')

// define your stuff
const baseDir = path.join(__dirname, '../../')
const buildDir = path.join(baseDir, 'build')
const appinfo = new AppInfo()
const sassTheme = appinfo.sassTheme || 'red'

cli.info('load app config from ./devel/webpack/configure-pwa.js')
module.exports = {
  name: 'pwa assets',
  mode: 'production',
  entry: {
    offline: [
      path.join(baseDir, 'src', 'pwa', 'offline.js'),
      path.join(baseDir, 'src', 'pwa', 'offline.scss'),
    ],
    'service-worker': [
      path.join(baseDir, 'src', 'pwa', 'service-worker.js'),
    ]
  },
  output: {
    path: path.join(buildDir),
    filename: './app/js/[name].js',
  },
  module: {
    rules: [{
      test: /\.hbs$/,
      loader: 'handlebars-loader'
    }, {
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
  plugins: [
    new webpack.DefinePlugin({
      PROJECT: JSON.stringify(appinfo),
    }),
    new WebappWebpackPlugin({
      // Your source logo
      logo: path.join(baseDir, 'src', 'pwa', 'logo.png'),

      // Enable caching and optionally specify the path to store cached data
      // Note: disabling caching may increase build times considerably
      cache: true,

      // The prefix for all image files (might be a folder or a name)
      prefix: '/assets/pwa',

      // Inject html links/metadata (requires html-webpack-plugin)
      inject: true,

      favicons: {
        path: "/", // Path for overriding default icons path. `string`
        appName: appinfo.title, // Your application's name. `string`
        appDescription: appinfo.description, // Your application's description. `string`
        developerName: null, // Your (or your developer's) name. `string`
        developerURL: null, // Your (or your developer's) URL. `string`
        dir: "auto", // Primary text direction for name, short_name, and description
        lang: "en-US", // Primary language for name and short_name
        background: "#fff", // Background colour for flattened icons. `string`
        theme_color: "#fff", // Theme color user for example in Android's task switcher. `string`
        display: "standalone", // Preferred display mode: "fullscreen", "standalone", "minimal-ui" or "browser". `string`
        orientation: "landscape", // Default orientation: "any", "natural", "portrait" or "landscape". `string`
        start_url: "/?homescreen=1", // Start URL when launching the application from a device. `string`
        version: appinfo.version, // Your application's version string. `string`
        logging: false, // Print logs to console? `boolean
        // which icons should be generated (see https://github.com/haydenbleasel/favicons#usage)
        icons: {
          android: true,
          appleIcon: true,
          appleStartup: true,
          coast: false,
          favicons: true,
          firefox: true,
          opengraph: true,
          twitter: true,
          yandex: true,
          windows: true
        }
      },
    }),
    new HandlebarsPlugin({
      // path to hbs scene entry file(s)
      entry: path.join(baseDir, 'src', 'pwa', 'index.hbs'),
      // output path and filename(s). This should lie within the webpacks output-folder
      // if ommited, the input filepath stripped of its extension will be used
      output: path.join(buildDir, 'offline', 'index.html'),
      // data passed to main hbs template: `main-template(data)`
      data: appinfo,
      // globbed path to partials, where dir/filename is unique
      partials: [
        path.join(baseDir, 'src', 'pwa', 'pwa-partials', '**', '*.hbs')
      ],
      // hooks
      // onBeforeSetup: function(Handlebars) {
      //   cli.info('Handlebars version: ', Handlebars.VERSION)
      // },
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
      // },
      // onBeforeSave: function(Handlebars, resultHtml, filename) {},
      // onDone: function(Handlebars, filename) {
      //   cli.ok(`updated: ${filename}`)
      // }
    }),
    new MiniCssExtractPlugin({
      filename: 'app/css/offline.css'
    }),
  ],
}
