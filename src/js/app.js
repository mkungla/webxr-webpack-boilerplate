/* global AFRAME THREE TWEEN PROJECT navigator */
/* eslint-disable no-underscore-dangle */
if (process.env.NODE_ENV !== 'production' && typeof AFRAME !== 'undefined') {
  const info = AFRAME.utils.debug(`${PROJECT.name}:info`)

  info('Looks like we are in development mode!')
  info(`Version: ${PROJECT.version}-dev`)
  info(`A-Frame Version: ${AFRAME.version}`)
  info(`three.js Version: r${THREE.REVISION}`)
  info(`including TWEEN: ${TWEEN._nextId}`)
  console.dir(PROJECT)
}

// ServiceWorker is a progressive technology. Ignore unsupported browsers
if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
  console.log('CLIENT: service worker registration in progress.')
  navigator.serviceWorker.register('/service-worker.js').then(() => {
    console.log('CLIENT: service worker registration complete.')
  }, () => {
    console.log('CLIENT: service worker registration failure.')
  })
} else {
  console.log('CLIENT: service worker is not supported.')
}
