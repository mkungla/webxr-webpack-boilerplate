/* eslint no-sync: "error" */
'use strict'

// libraries
const path = require('path')
const fs = require('fs')
const humanizeDuration = require('humanize-duration')

// Webpack plugins
const merge = require('webpack-merge')
const serve = require('webpack-serve');

// Webpack configs
const common = require('./webpack/webpack.config.js')

// Additional imports
const packageJson = require('../package')
const devSettings = require('../app-dev')
const cli = require('./utils/cli')

// define your stuff
const PLUGINS = []

const baseDir = path.join(__dirname, '../')
const buildDir = path.join(baseDir, 'build')
// const apiDir = path.join(process.cwd(), 'build', 'api')
const sslKey = path.join(__dirname, 'ssl', 'localhost.key')
const sslCrt = path.join(__dirname, 'ssl', 'localhost.crt')

const allConfig = merge.multiple(common, {
  app: {
    mode: 'development',
    devtool: 'inline-source-map',
    plugins: PLUGINS,
  },
  staticAssets: {},
  vendors: {},
  pwa: {},
})

const defaultPort = 9000

/* eslint no-sync: ["error", { allowAtRootLevel: true }]*/
serve({
  config: allConfig,
  content: buildDir,
  dev: devSettings.webpackDevMiddleware,
  host: devSettings.host || "localhost",
  hot: devSettings.webpackHotClient || {},
  http2: devSettings.http2 || true,
  https: devSettings.https || {
    key: fs.readFileSync(sslKey),
    cert: fs.readFileSync(sslCrt),
  },
  logLevel: devSettings.logLevel || 'info',
  logTime: devSettings.logTime || false,
  open: devSettings.open || false,
  port: devSettings.port || defaultPort
}).then((server) => {
  server.on('listening', ({
    server,
    options
  }) => {
    cli.debug(`server session ctx: ${server.sessionIdContext}`)
    cli.banner(packageJson.name, packageJson.version, options.host, options.port, options.hot.https)
  })

  /**
   * Emitted when a compiler has started a build.
   *
   * @type Compiler Instance
   */
  server.on('build-started', (compiler) => {
    cli.info(`building ${compiler.compiler.options.name} - mode: ${compiler.compiler.options.mode} - target: ${compiler.compiler.options.target}`)
  })

  /**
   * Emitted when a compiler has finished a build.
   *
   * @type Stats Object
   * @type Compiler Instance
   */
  server.on('build-finished', (stats) => {
    if (stats.stats.compilation.errors.length > 0) {
      stats.stats.compilation.errors.forEach((e) => {
        cli.error(e)
      })
    }
    if (stats.stats.compilation.warnings.length > 0) {
      stats.stats.compilation.warnings.forEach((e) => {
        cli.warn(e)
      })
    }
    const files = Object.keys(stats.stats.compilation.assets)

    if (files.length > 0 && devSettings.logLevel === 'debug') {
      files.forEach((file) => {
        cli.debug(file)
      })
    }

    const execTime = `${stats.stats.compilation.name} compilation finished in ${humanizeDuration(stats.stats.endTime - stats.stats.startTime)}`

    cli.ok(execTime)
  })

  /**
   * Emitted when a compiler has encountered and error, or a build has errors.
   *
   * @type Stats Object
   * @type Compiler Instance
   */
  server.on('compiler-error', (stats) => {
    if (stats.json.errors.length > 0) {
      stats.json.errors.forEach((e) => {
        cli.error(e)
      })
    }
  })

  /**
   * Emitted when a compiler has encountered a warning, or a build has warnings.
   *
   * @type Stats Object
   * @type Compiler Instance
   */
  server.on('compiler-warning', (stats) => {
    if (stats.json.warnings.length > 0) {
      stats.json.warnings.forEach((w) => {
        cli.warn(w)
      })
    }
  })
});
