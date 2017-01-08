// A-Frame
const AFRAME = window.AFRAME;
const THREE = AFRAME.THREE;
AFRAME.registerShader('custom-shader', {
  schema: {
    dashSize: {default: 3},
    lineWidth: {default: 1}
  },
  /**
   * `init` used to initialize material. Called once.
   */
  init (data) {
    this.material = new THREE.LineDashedMaterial(data);
    this.update(data);  // `update()` currently not called after `init`. (#1834)
  },
  /**
   * `update` used to update the material. Called on initialization and when data updates.
   */
  update (data) {
    this.material.dashsize = data.dashsize;
    this.material.linewidth = data.linewidth;
  }
});
