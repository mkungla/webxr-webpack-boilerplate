/* global document */
const lap = Math.PI * 2
const orbit = 10

/**
 * This addon gives a example how you could integrate your addon with A-Frame scene
 * without using A-Frame components or systems
 */
export default {
  name: 'example-move-active-camera',
  // this addon will not be reqistered if aframe is not present on loaded page
  // default false
  aframeRequired: true,
  data: {
    startPosition: {
      x: 0,
      y: 0,
      z: 0
    },
    startRotation: {
      x: 0,
      y: 0,
      z: 0
    }
  },

  /**
   * Called once when application first starts
   * Sets the data to values passed to registerAddon 2 param
   */
  setup() {
    this.camera = null
    this.position = this.data.startPosition
    this.rotation = this.data.startRotation
    this.point = 1.6;

    // disable addon if A-Frame was not loaded
    if (!this.app.aframe || !document.getElementById('move-active-camera')) {
      this.enabled = false
      return
    }
    // get active camera
    this.app.aframe.addEventListener('camera-set-active', (evt) => {
      this.camera = evt.detail.cameraEl
    });

    this.log.debug('setup')
  },

  /**
   * Called once when application first starts
   * and everytime when you call application start after stoping it.
   */
  start() {
    this.log.debug('start')
  },

  /**
   * Called every time when application play is called
   */
  play() {
    this.log.debug('play')
    // actually camera will not be ready yet
    if (!this.camera) {
      return
    }
  },

  /**
   * Called every time when application pause is called
   */
  pause() {
    this.log.debug('pause')
  },

  /**
   * Called in every render loop when application is playing
   */
  tick() {
    if (!this.camera) {
      return
    }
    this.position.x = orbit * Math.cos(this.point) + 0
    this.position.z = orbit * Math.sin(this.point) + orbit
    this.camera.setAttribute('position', this.position)
    this.point += 0.01

    if (this.point > lap) {
      this.point = 0
    }
  },

  /**
   * Called when application stop is called.
   * Currently dispose does not delete this Addon
   * so calling application start after stop will call
   * this objects .start again, but not .setup .
   * This behavior may change in this project skeleton
   * in the future allowing you to dispose Addons on
   * run time and re register Addons on demand.
   * Therefore the name dispose instead of stop
   * which it is right now by behavior.
   */
  dispose() {
    this.log.debug('dispose')
    this.position = this.data.startPosition
    this.rotation = this.data.startRotation
    this.point = 0;
  }
}
