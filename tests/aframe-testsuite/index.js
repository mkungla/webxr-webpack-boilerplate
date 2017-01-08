/* global sinon, setup, teardown */
'use strict';
import clioutput from '../../devel/utils/clioutput';
class AFRAME_TS {

  constructor() {
    this.sceneEl = null;
    this.log = clioutput;
  }

  /**
   * Setup A-Frame scene
   */
  sceneSetup(opts) {
    var scene = document.createElement('a-scene');
    var assets = document.createElement('a-assets');
    scene.appendChild(assets);
    opts = opts || {};
    if (opts.assets) {
      opts.assets.forEach(function (asset) {
        assets.appendChild(asset);
      });
    }
    document.body.appendChild(scene);
    this.sceneEl = scene;
    return new Promise(function(resolve) {
        scene.addEventListener('loaded', function(e) {

            resolve(scene);
        });
    });
  }

  getScene() {
    return this.sceneEl;
  }

  createEntity() {
    var sceneEl = this.sceneEl;
    var entity = document.createElement('a-entity');
    sceneEl.appendChild(entity);
    return entity;
  }

  destructScene(){
    var attachedEls = ['canvas', 'a-assets', 'a-scene'];
    var els = document.querySelectorAll(attachedEls.join(','));
    for (var i = 0; i < els.length; i++) {
      els[i].parentNode.removeChild(els[i]);
    }
  }

}
export default (new AFRAME_TS());
