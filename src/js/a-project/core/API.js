'use strict';

import {ResponseError, NotFoundError, HttpError} from './HTTPresponses';
import 'whatwg-fetch';

/**
 * A-Frame SERVER API
 */
class API {
  /**
   * API
   *
   * @param isDev
   * @param version
   */
  constructor (isDev, version) {
    this.apiUrl = false;
    this.isDev = isDev;
    this.headers = new Headers();
    this.headers.append('X-A-Frame-Version', version);
  }

  /**
   * Set API url
   *
   * @param url
   */
  setApiUrl (url) {
    this.apiUrl = url;
  }

  /**
   * Can we connect to API server
   *
   * @returns {Promise.<TResult>}
   */
  isAlive () {
    let isAlive = this.fetch('/status').then(function (response) {
      return response.status === 'OK';
    }).catch(error => {
      Promise.reject(error);
      return false;
    });
    return isAlive;
  }

  /**
   * Fetch data
   *
   * @param path
   * @param method
   * @param data
   * @returns {Promise.<T>}
   */
  fetch (path, method = 'GET', data = {}) {
    path += '.json';

    // Request URL
    let requestUrl = this.apiUrl + path;

    // Request Object
    console.log(requestUrl);
    var request = new Request(requestUrl, {
      method: method,
      headers: this.headers,
      mode: 'cors',
      cache: 'default'
    });

    // Fetch from Server API
    return fetch(request).then(response => {
      // Handle Server response
      if (response.status === 200) {
        const contentType = response.headers.get('Content-Type') || '';

        // make sure that only application/json is expected as return
        if (contentType.includes('application/json')) {
          return response.json().catch(error => {
            return Promise.reject(new ResponseError('Invalid JSON: ' + error.message));
          });
        }
        return Promise.reject(new ResponseError('Invalid content type: ' + contentType));
      }

      // If Server returns 404
      if (response.status === 404) {
        return Promise.reject(new NotFoundError('Page not found: ' + path));
      }

      // If other Server error occoured
      return Promise.reject(new HttpError('HTTP error: ' + response.status));
    }).catch(error => {
      // Perhaps we are not connected to internet
      return Promise.reject(error.message);
    });
  }
}

export {API};
