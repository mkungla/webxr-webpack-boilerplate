const jsdom = require('jsdom');
const browserProps = ['window', 'navigator', 'document'];
const defaultPlainHtml = '<!doctype html><html><head><meta charset="utf-8"></head><body></body></html>';

function DummyBrowserStorage() {
  const data = {};
  return {
    setItem(key, value) {
      data[key] = value || '';
    },
    getItem(key) {
      return data[key];
    },
    removeItem(key) {
      delete data[key];
    },
    get length() {
      return Object.keys(data).length;
    },
    key(i) {
      const keys = Object.keys(data);
      return keys[i] || null;
    },
  };
}

function plainHtmlDomSetUp(markup = defaultPlainHtml, options={}) {

  // If document is already created
  if (typeof document !== 'undefined') return;
  const opts = {...options, ...{
    virtualConsole: jsdom.createVirtualConsole().sendTo(console)
  }};
  const document = jsdom.jsdom(markup, opts);
  const window   = document.defaultView;

  Object.keys(document.defaultView).forEach( key => {
    if (typeof global[key] === 'undefined') {
      browserProps.push(key);
      global[key] = document.defaultView[key];
    }
  });

  global.document = document;
  global.window = window;
  global.localStorage = global.window.localStorage = DummyBrowserStorage();
  global.sessionStorage = global.window.sessionStorage = DummyBrowserStorage();
  global.navigator = {
    userAgent: 'aframe-tests',
  };

  window.console = global.console;
  window.basePath = '/';

  document.destroy = plainHtmlDomTeardown;
}

// Destroy the Aframe scene
function plainHtmlDomTeardown() {
  browserProps.forEach( key => delete global[key] );
}

export { plainHtmlDomSetUp, plainHtmlDomTeardown };
