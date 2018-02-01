/* global AFRAME THREE TWEEN PROJECT_VERSION PROJECT_NAME PROJECT_ISSUE_URL */
/**
 * 1. app styles will be extraxted to style/app-theme.css
 *    and not included in final bundle of this entry point!
 */
import '../style/app-theme.scss'
import '../style/app-theme-blue.scss'

const metadata = require('../metadata')

if (process.env.NODE_ENV !== 'production') {
  const info = AFRAME.utils.debug(`${PROJECT_NAME}:info`)
  info('Looks like we are in development mode!')
  info(`Version: ${PROJECT_VERSION}-dev`)
  info(`report issues: ${PROJECT_ISSUE_URL}`)
  info(`A-Frame Version: ${AFRAME.version}`)
  info(`three.js Version: r${THREE.REVISION}`)
  info(`including TWEEN: ${TWEEN._nextId}`)
  console.log(metadata)
}
