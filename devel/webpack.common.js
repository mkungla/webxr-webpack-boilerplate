'use strict'

const cli = require('./utils/cli')
const webpack = require('webpack')
const path = require('path')
const packageJson = require('../package')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HandlebarsPlugin = require('handlebars-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const aframeVersion = require('aframe/package.json').version
const isDev = process.env.NODE_ENV !== 'production'
const fs = require('fs')
const buildDir = (isDev) ? 'build' : 'dist'

const assetCopy = new CopyWebpackPlugin([
  {
    from: path.join(process.cwd(), 'src', 'assets', 'static'),
    to: path.join(process.cwd(), buildDir, 'assets', 'static')
  }
])
const swCopy = new CopyWebpackPlugin([
  {
    from: path.join(process.cwd(), 'src', 'js', 'sw'),
    to: path.join(process.cwd(), buildDir)
  }
])
const extractDefaultTheme = new ExtractTextPlugin({
  allChunks: true,
  filename: 'style/app-theme.css'
})

const extractBlueTheme = new ExtractTextPlugin({
  allChunks: true,
  filename: 'style/app-theme-blue.css'
})

const extractGreenTheme = new ExtractTextPlugin({
  allChunks: true,
  filename: 'style/app-theme-green.css'
})

const extractRedTheme = new ExtractTextPlugin({
  allChunks: true,
  filename: 'style/app-theme-red.css'
})

const extractYellowTheme = new ExtractTextPlugin({
  allChunks: true,
  filename: 'style/app-theme-yellow.css'
})

let PLUGINS = [
  new webpack.DefinePlugin({
    PROJECT_VERSION: JSON.stringify(packageJson.version),
    PROJECT_NAME: JSON.stringify(packageJson.name),
    PROJECT_ISSUE_URL: JSON.stringify(packageJson.bugs.url)
  }),
  new CleanWebpackPlugin([buildDir, path.join(buildDir, 'js')], {
    root: path.join(__dirname, '../'),
    exclude: [
      '.gitkeep',
      'js',
      'aframe-base.js',
      'aframe-base.js.map',
      'vendors.js',
      'vendors.js.map'
    ],
    verbose: true,
    dry: false
  }),

  extractDefaultTheme,
  extractBlueTheme,
  extractGreenTheme,
  extractRedTheme,
  extractYellowTheme,
  swCopy,
  assetCopy,
  new HandlebarsPlugin({
    // path to hbs scene entry file(s)
    entry: path.join(process.cwd(), 'src', 'scenes', '*.hbs'),
    // output path and filename(s). This should lie within the webpacks output-folder
    // if ommited, the input filepath stripped of its extension will be used
    output: path.join(process.cwd(), buildDir, '[name].html'),
    // data passed to main hbs template: `main-template(data)`
    data: path.join(process.cwd(), 'src', 'app-config.json'),
    // globbed path to partials, where dir/filename is unique
    partials: [
      path.join(process.cwd(), 'src', 'partials', '**', '*.hbs')
    ],
    // hooks
    onBeforeSetup: function (Handlebars) {
      cli.info('Handlebars version: ', Handlebars.VERSION)
    },
    onBeforeAddPartials: function (Handlebars, partialsMap) {
      // cli.info('update Handlebars partials')
    },
    // onBeforeCompile: function (Handlebars, templateContent) {
    //   if (templateContent.startsWith('<a-scene')) {
    //     return `{{> aframe/header}}${templateContent}{{> aframe/footer}}`
    //   }
    //   return `{{> html/header}}${templateContent}{{> html/footer}}`
    // },
    onBeforeRender: function (Handlebars, data) {
      data.aframe = {
        'version': aframeVersion
      }
      data.app.name = data.app.name || data.project.name
      data.app.description = data.app.description || data.project.description
      data.app.keywords = data.app.keywords || data.project.keywords
      data.defaults = require('./defaults.json')
    },
    // onBeforeSave: function (Handlebars, resultHtml, filename) {},
    onDone: function (Handlebars, filename) {
      // cli.ok(`updated: ${filename}`)
    }
  })
]

let entryPoints = {
  'js/aframe-app.js': './src/aframe/aframe-app.js',
  'js/app.js': './src/js/app.js'
}

if (process.env.WITH_VENDORS === 'true') {
  cli.info('rebuilding vendors')
  entryPoints['js/vendors.js'] = path.join(process.cwd(), 'src', 'js', 'vendors.js')
  entryPoints['js/aframe-base.js'] = path.join(process.cwd(), 'src', 'aframe', 'aframe-base.js')
} else {
  const vendorsBundle = path.join(process.cwd(), 'build', 'js', 'vendors.js')
  const aframeBundle = path.join(process.cwd(), 'build', 'js', 'aframe-base.js')
  cli.info('ignoring vendors')
  let readyToStart = true
  if (!fs.existsSync(vendorsBundle)) {
    readyToStart = false
    cli.warn('missing: ', vendorsBundle)
  }
  if (readyToStart && !fs.existsSync(aframeBundle)) {
    readyToStart = false
    cli.warn('missing: ', aframeBundle)
  }
  if (!readyToStart) {
    cli.warn('yarn start is not rebuilding vendor libraries')
    cli.warn('run `yarn run build` first to build vendor libraries')
    cli.warn('and then run `yarn start` again.')
    process.exit(1)
  }
}

cli.info(`env is ${process.env.NODE_ENV}`)

module.exports = {
  entry: entryPoints,
  plugins: PLUGINS,
  output: {
    filename: '[name]',
    path: path.join(process.cwd(), buildDir)
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }
      }, {
        // main theme extracted to style/app-theme.css
        test: /app-theme.scss$/,
        use: extractDefaultTheme.extract({
          fallback: 'style-loader',
          use: [
            { loader: 'css-loader', options: { sourceMap: isDev } },
            { loader: 'postcss-loader',
              options: {
                sourceMap: true,
                plugins: (loader) => [
                  require('autoprefixer')({browsers: ['last 3 versions', 'iOS 9']})
                ]
              }
            },
            'resolve-url-loader',
            { loader: 'sass-loader', options: { outputStyle: (isDev ? 'expanded' : 'compressed') } }
          ]
        })
      }, {
        // additional css extracted to style/app-theme.css
        test: /\.css$/,
        use: [
          { loader: 'css-loader', options: { sourceMap: isDev } },
          { loader: 'postcss-loader',
            options: {
              sourceMap: true,
              plugins: (loader) => [
                require('autoprefixer')({browsers: ['last 3 versions', 'iOS 9']})
              ]
            }
          },
          'resolve-url-loader'
        ]
      }, {
        // blue theme extracted to style/app-theme-blue.css
        test: /app-theme-blue.scss$/,
        use: extractBlueTheme.extract({
          fallback: 'style-loader',
          use: [
            { loader: 'css-loader', options: { sourceMap: isDev } },
            { loader: 'postcss-loader',
              options: {
                sourceMap: true,
                plugins: (loader) => [
                  require('autoprefixer')({browsers: ['last 3 versions', 'iOS 9']})
                ]
              }
            },
            'resolve-url-loader',
            { loader: 'sass-loader', options: { outputStyle: (isDev ? 'expanded' : 'compressed') } }
          ]
        })
      }, {
        // blue theme extracted to style/app-theme-blue.css
        test: /app-theme-green.scss$/,
        use: extractGreenTheme.extract({
          fallback: 'style-loader',
          use: [
            { loader: 'css-loader', options: { sourceMap: isDev } },
            { loader: 'postcss-loader',
              options: {
                sourceMap: true,
                plugins: (loader) => [
                  require('autoprefixer')({browsers: ['last 3 versions', 'iOS 9']})
                ]
              }
            },
            'resolve-url-loader',
            { loader: 'sass-loader', options: { outputStyle: (isDev ? 'expanded' : 'compressed') } }
          ]
        })
      }, {
        // blue theme extracted to style/app-theme-blue.css
        test: /app-theme-red.scss$/,
        use: extractRedTheme.extract({
          fallback: 'style-loader',
          use: [
            { loader: 'css-loader', options: { sourceMap: isDev } },
            { loader: 'postcss-loader',
              options: {
                sourceMap: true,
                plugins: (loader) => [
                  require('autoprefixer')({browsers: ['last 3 versions', 'iOS 9']})
                ]
              }
            },
            'resolve-url-loader',
            { loader: 'sass-loader', options: { outputStyle: (isDev ? 'expanded' : 'compressed') } }
          ]
        })
      }, {
        // blue theme extracted to style/app-theme-blue.css
        test: /app-theme-yellow.scss$/,
        use: extractYellowTheme.extract({
          fallback: 'style-loader',
          use: [
            { loader: 'css-loader', options: { sourceMap: isDev } },
            { loader: 'postcss-loader',
              options: {
                sourceMap: true,
                plugins: (loader) => [
                  require('autoprefixer')({browsers: ['last 3 versions', 'iOS 9']})
                ]
              }
            },
            'resolve-url-loader',
            { loader: 'sass-loader', options: { outputStyle: (isDev ? 'expanded' : 'compressed') } }
          ]
        })
      }, {
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
