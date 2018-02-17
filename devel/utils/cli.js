'use strict'

const chalk = require('chalk')
const ip = require('ip')
const hrLine = chalk.magenta('\n=================================================================================')
const packageName = require('../../package').name

const Ok = (...message) => {
  console.log(
    chalk.bold.magenta(`[ ${packageName} ] `),
    chalk.bold.green('\u2714'),
    chalk.bold.white(message)
  )
}

const Error = (...message) => {
  console.error(
    chalk.bold.magenta(`[ ${packageName} ] `),
    chalk.bold.red('\u2718'),
    chalk.bold.white(message)
  )
}

const Info = (...message) => {
  console.info(
    chalk.bold.magenta(`[ ${packageName} ] `),
    chalk.bold.blue('\u26A0'),
    chalk.bold.white(message)
  )
}

const Warning = (...message) => {
  console.warn(
    chalk.bold.magenta(`[ ${packageName} ] `),
    chalk.bold.yellow('\u26A0'),
    chalk.bold.white(message)
  )
}

const Debug = (...message) => {
  console.log(
    chalk.bold.magenta(`[ ${packageName} ] `),
    chalk.bold.gray('\u2699'),
    chalk.bold(message)
  )
}

const Hr = () => {
  console.log(hrLine)
}

module.exports = {
  error: Error,
  info: Info,
  warn: Warning,
  ok: Ok,
  debug: Debug,
  hr: Hr,
  banner: (name, ver, host, port) => {
    Hr()
    Ok(`${name} v${ver} development server.`)
    Info('Open your browser:')
    Info(`    localhost: http://${host}:${port}`)
    Info(`          LAN: http://${ip.address()}:${port}`)
    Debug(`Press ${chalk.italic('CTRL-C')} to stop`)
  }
}
