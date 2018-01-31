const cli = require('./utils/cli')
const webpack = require('webpack')
const path = require('path')
const packageJson = require('../package')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HandlebarsPlugin = require('handlebars-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const aframeVersion = require('aframe/package.json').version
const isDev = process.env.NODE_ENV !== 'production'

const buildDir = (isDev) ? 'build' : 'dist'

const extractStyle = new ExtractTextPlugin({
  allChunks: true,
  filename: 'style/app-style.css'
})

let PLUGINS = [
  new webpack.DefinePlugin({
    PROJECT_VERSION: JSON.stringify(packageJson.version),
    PROJECT_NAME: JSON.stringify(packageJson.name),
    PROJECT_ISSUE_URL: JSON.stringify(packageJson.bugs.url)
  }),
  new CleanWebpackPlugin([
    path.join(buildDir, '*')], {
      root: path.join(__dirname, '../'),
      exclude: ['.gitkeep'],
      verbose: true,
      dry: false
    }
  ),
  extractStyle,
  new HandlebarsPlugin({
    // path to hbs scene entry file(s)
    entry: path.join(process.cwd(), 'src', 'scenes', '*.hbs'),
    // output path and filename(s). This should lie within the webpacks output-folder
    // if ommited, the input filepath stripped of its extension will be used
    output: path.join(process.cwd(), buildDir, '[name].html'),
    // data passed to main hbs template: `main-template(data)`
    data: path.join(process.cwd(), 'src', 'metadata.json'),
    // globbed path to partials, where dir/filename is unique
    partials: [
      path.join(process.cwd(), 'src', 'partials', '**', '*.hbs')
    ],
    // hooks
    onBeforeSetup: function (Handlebars) {
      cli.info('Handlebars version: ', Handlebars.VERSION)
    },
    onBeforeAddPartials: function (Handlebars, partialsMap) {
      cli.info('update partials')
    },
    onBeforeCompile: function (Handlebars, templateContent) {
      if (templateContent.startsWith('<a-scene')) {
        return `{{> aframe/header}}${templateContent}{{> aframe/footer}}`
      }
      return `{{> html/header}}${templateContent}{{> html/footer}}`
    },
    onBeforeRender: function (Handlebars, data) {
      data.aframe = {
        'version': aframeVersion
      }
      data.app.name = data.app.name || data.project.name
      data.app.description = data.app.description || data.project.description
      data.app.keywords = data.app.keywords || data.project.keywords
    },
    // onBeforeSave: function (Handlebars, resultHtml, filename) {},
    onDone: function (Handlebars, filename) {
      cli.info(`updated: ${filename}`)
    }
  })
]

let entryPoints = {
  'js/vendors.js': path.join(process.cwd(), 'src', 'js', 'vendors.js'),
  'js/aframe-base.js': './src/aframe/aframe-base.js',
  'js/aframe-app.js': './src/aframe/aframe-app.js',
  'js/app.js': './src/js/app.js',
  'style/app-style.css.js': './src/style/app-style.scss'
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
        test: /\.scss$/,
        use: extractStyle.extract({
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
        test: /\.css$/,
        use: extractStyle.extract({
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
            'resolve-url-loader'
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
