'use strict';

import {API} from './core/API';

/**
 * Example A-Frame Project
 */
class APROJECT {
  constructor () {
    this.name = 'A-Frame';
    this.aframeLoaded = false;
  }
  banner () {
    console.info('Name:    ' + this.getName());
    console.info('Version: ' + this.getVersion());
  }

  /**
   * Get Application name
   *
   * @returns string
   */
  getName () {
    return this.name;
  }

  /**
   * Get Toolshedr Server version
   *
   * @returns {string|*}
   */
  getVersion () {
    return this.version;
  }

  /**
   * Scene data source is offline
   */
  offline () {
    this.page = '<div id="devel">' +
      'A-Frame Project<br>' +
      '<em>default scene</em><br>' +
      '<sup class="error-msg">Could not connect to A-Frame Projects API!</sup>' +
      '</div>';
  }

  /**
   * Render
   */
  render (aframeScene) {
    let self = this;

    self.version = (self.Config.isDev()) ? self.version + '-devel' : self.version;
    self.API = new API(self.Config.isDev(), self.version);
    self.API.setApiUrl(self.Config.getServerUrl());

    self.banner();
    if (self.Config.stats) {
      aframeScene.setAttribute('stats', true);
    }

    self.API.isAlive().then(function (status) {
      if (!status) {
        self.offline();
        console.info('Server URL: ' + self.Config.getServerUrl() + ' [FAILED]');
      } else {
        console.info('Server URL: ' + self.Config.getServerUrl() + ' [OK]');
      }
      console.log('go....');
    });
  }
}
export default (new APROJECT());
