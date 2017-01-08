'use strict';
/* global assert, process, setup, suite, test, AFRAME_TS */
import AFRAME_TS from '../index';
require('../../../src/js/index');

suite('A-Frame Test Suite:', function () {


  setup(function(done){
    AFRAME_TS.sceneSetup().then(function(){
      AFRAME_TS.log.info('Scene has been reloaded................');
      done();
    });
  });

  test('Expects A-Frame to be defined.', function () {
      expect(window.AFRAME).to.be.an.instanceof(Object);
      expect(window.AFRAME).to.have.ownProperty('AScene');
  });

  test('Expects A-Frame Scene to be loaded.', function () {
    var sceneEl = AFRAME_TS.getScene();
    assert.isTrue(sceneEl.isPlaying, 'A-Frame Scene isPlaying should be true');
    assert.isTrue(sceneEl.isScene, 'AFRAME_TS.getScene should return Aframe scene');
    assert.isTrue(sceneEl.hasLoaded, 'A-Frame Scene hasLoaded should be true');
  });
});
