/* global AFRAME THREE TWEEN PROJECT_VERSION PROJECT_NAME PROJECT_ISSUE_URL */
/**
 * 1. app styles will be extraxted to style/app-theme.css
 *    and not included in final bundle of this entry point!
 */
import '../style/app-theme.scss'
import '../style/app-theme-blue.scss'
import '../style/app-theme-green.scss'
import '../style/app-theme-red.scss'
import '../style/app-theme-yellow.scss'

const appConfig = require('../app-config')

if (process.env.NODE_ENV !== 'production' && typeof AFRAME !== 'undefined') {
  const info = AFRAME.utils.debug(`${PROJECT_NAME}:info`)
  info('Looks like we are in development mode!')
  info(`Version: ${PROJECT_VERSION}-dev`)
  info(`report issues: ${PROJECT_ISSUE_URL}`)
  info(`A-Frame Version: ${AFRAME.version}`)
  info(`three.js Version: r${THREE.REVISION}`)
  info(`including TWEEN: ${TWEEN._nextId}`)
  console.dir(appConfig)
}

// ServiceWorker is a progressive technology. Ignore unsupported browsers
if ('serviceWorker' in navigator) {
  console.log('CLIENT: service worker registration in progress.')
  navigator.serviceWorker.register('/service-worker.js').then(function () {
    console.log('CLIENT: service worker registration complete.')
  }, function () {
    console.log('CLIENT: service worker registration failure.')
  })
} else {
  console.log('CLIENT: service worker is not supported.')
}
