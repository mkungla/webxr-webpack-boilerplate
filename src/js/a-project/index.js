'use strict';
/* A-Frame Project */

import APROJECT from './a-project.js';
import {Config} from './core/Config';

// Set objects
APROJECT.Config = new Config();
APROJECT.version = JSON.stringify(require('../../../package.json').version);
APROJECT.name = JSON.stringify(require('../../../package.json').name);

// Export to browser
exports = window.APROJECT = APROJECT;
window.addEventListener('load', function () {
  let aframeScene = document.querySelector('a-scene');
  APROJECT.Config.set({
    host: 'localhost',
    path: '/api/v1',
    port: '9000',
    scheme: 'http',
    stats: true
  });

  if (aframeScene.hasLoaded) {
    APROJECT.aframeLoaded = true;
    APROJECT.render(aframeScene);
  } else {
    aframeScene.addEventListener('loaded', function () {
      APROJECT.aframeLoaded = true;
      APROJECT.render(aframeScene);
    });
  }
});
