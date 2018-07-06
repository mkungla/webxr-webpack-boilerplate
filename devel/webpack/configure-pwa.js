'use strict'

// libraries
const path = require('path')

// Webpack plugins
const HtmlWebpackPlugin = require('html-webpack-plugin')
const WebappWebpackPlugin = require('webapp-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

// Additional imports
const cli = require('../utils/cli')
const AppInfo = require('../utils/appinfo')

// define your stuff
const baseDir = path.join(__dirname, '../../')
const buildDir = path.join(baseDir, 'build')
const appinfo = new AppInfo()

cli.info('load app config from ./devel/webpack/configure-pwa.js')
module.exports = {
  name: 'pwa assets',
  mode: 'production',
  entry: {
    offline: [
      path.join(baseDir, 'src', 'pwa', 'offline.js'),
      path.join(baseDir, 'src', 'pwa', 'offline.scss'),
    ]
  },
  output: {
    path: path.join(buildDir),
    filename: './app/js/offline.js',
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
        'sass-loader',
      ],
    }]
  },
  plugins: [
    new WebappWebpackPlugin({
      // Your source logo
      logo: path.join(baseDir, 'src', 'img', 'logo.png'),

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
    new HtmlWebpackPlugin({
      title: 'offline',
      filename: 'offline.html',
      template: path.join(baseDir, 'src', 'pwa', 'offline.hbs')
    }),
    new MiniCssExtractPlugin({
      filename: 'app/css/[name].css'
    }),
  ],
}
