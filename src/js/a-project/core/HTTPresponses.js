'use strict';

class HttpError extends Error {
  /**
   * HTTP Status constructor
   *
   * @param message
   * @param code
   */
  constructor (message, code) {
    super(message);
    this.name = this.constructor.name;
    this.code = code || 500;
    this.message = this.name + ': code: ' + this.code + ' message: ' + message;
  }

  /**
   * Set code
   *
   * @param code
   */
  setCode (code) {
    this.code = code || this.defaultCode();
  }

  /**
   * Set message
   *
   * @param msg
   */
  setMessage (msg) {
    this.message = msg || this.defaultMessage();
  }

  /**
   * Set defaults
   */
  setDefaults () {
    this.name = 'API - Internal Server Error';
    this.default_code = 500;
    this.default_message = 'Internal Server Error';
  }

  /**
   * Default code
   *
   * @returns {number}
   */
  defaultCode () {
    return this.default_code;
  }

  /**
   * Default message
   *
   * @returns {string}
   */
  defaultMessage () {
    return this.default_message;
  }
}

class ResponseError extends HttpError {
  /**
   * Response error
   *
   * @param message
   * @param code
   */
  constructor (message, code) {
    super(message, code);
    this.name = 'API - Not Implemented';
    this.default_code = 501;
    this.default_message = 'Not Implemented';
  }
}

class NotFoundError extends HttpError {
  /**
   * Not found error
   *
   * @param message
   * @param code
   */
  constructor (message, code) {
    super(message, code);
    this.name = 'API - 404 Not Found';
    this.code = code || 404;
    this.message = message || 'Not Found';
  }
}

export {HttpError, ResponseError, NotFoundError};
