/* global AFRAME THREE TWEEN PROJECT navigator */
/* eslint-disable no-underscore-dangle */

const info = AFRAME.utils.debug(`${PROJECT.name}:info`)

if (process.env.NODE_ENV !== 'production' && typeof AFRAME !== 'undefined') {
  info(`Version: ${PROJECT.version}-dev`)
  info(`A-Frame Version: ${AFRAME.version}`)
  info(`three.js Version: r${THREE.REVISION}`)
  info(`including TWEEN: ${TWEEN._nextId}`)
  console.dir(PROJECT)
}

// ServiceWorker is a progressive technology. Ignore unsupported browsers
if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator && PROJECT.serviceWorker) {
  info('CLIENT: service worker registration in progress.')
  navigator.serviceWorker.register('/app/js/service-worker.js').then(() => {
    info('CLIENT: service worker registration complete.')
  }, () => {
    info('CLIENT: service worker registration failure.')
  })
} else {
  info('CLIENT: service worker is not registered.')
}
