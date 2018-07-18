/* global document PROJECT */

import Application from './application/core'
// import application addons you want to register
import timer from './application/addons/example-timer'
import moveActiveCamera from './application/addons/example-move-active-camera'

const app = new Application(PROJECT)

// Reqister all application addons by calling registerAddon
app.registerAddon(timer, {
  seletor: 'app-timer'
})
app.registerAddon(moveActiveCamera, {
  startPosition: {
    x: 0,
    y: 1.6,
    z: 1
  },
  startRotation: {
    x: 0,
    y: 90,
    z: 0
  }
})

// Start the application as soon as possible
app.start().then((log) => {
  log.debug('webapp is running')
}).catch((err) => {
  console.error(err)
})

/**
 * EXAMPLE
 *
 *  Example controls used in ./controls.html example
 *  you can remove following code
 *  most of cases you don't need control over play, pause, stop, start
 *  and define your application logic either by creating and registering addons
 *  or when using A-Frame also in aframe components and systems
 */

// play / pause
const ppBtn = document.getElementById('play-pause')
// start / stop
const ssBtn = document.getElementById('start-stop')

ppBtn.addEventListener('click', (e) => {
  if (ppBtn.classList.contains('playing')) {
    // pause app
    app.pause()
  } else if (ssBtn.classList.contains('stopped')) {
    ssBtn.classList.toggle('stopped')
    // play app
    app.start().then((log) => {
      log.debug('webapp is running')
    }).catch((err) => {
      console.error(err)
    })
    if (ppBtn.classList.contains('playing')) {
      ppBtn.classList.toggle('playing')
    }
  } else {
    app.play()
  }
  ppBtn.classList.toggle('playing')
  e.preventDefault()
  return false
})

ssBtn.addEventListener('click', (e) => {
  if (!ssBtn.classList.contains('stopped')) {
    // stop app
    app.stop().then((log) => {
      log.debug('webapp is stopped')
    }).catch((err) => {
      console.error(err)
    })
    if (ppBtn.classList.contains('playing')) {
      ppBtn.classList.toggle('playing')
    }
  }
  ssBtn.classList.toggle('stopped')
  e.preventDefault()
  return false
})
