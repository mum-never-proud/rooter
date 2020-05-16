(function (factory) {
  if (typeof module !== 'undefined' && typeof exports === 'object') {
    module.exports = factory();
  } else if (typeof define === 'function' && define.amd) {
    define('rooter', factory);
  } else {
    window.rooter = factory();
  }
})(function () {
  const modes = ['hash', 'history'];

  function isValidMode(mode) {
    return !mode ? true : modes.includes(mode);
  }

  class Rooter {
    constructor(options) {
      if (!isValidMode(options.mode)) {
        throw new Error('invalid mode, try history or hash');
      }

      this.routes = [];
      this.mode = options.mode || window.history.pushState ? 'history' : 'hash';

      return this;
    }

    get(url, callback) {
      if (typeof url !== 'string') {
        throw new Error('url must be a string');
      }

      if (typeof callback !== 'function') {
        throw new Error('callback must be a function');
      }

      this.routes.push({url, callback});

      return this;
    }

    forget(url) {
      this.routes = this.routes.filter(route => route.url !== url);

      return this;
    }

    navigate(path) {
      if (this.mode === 'history') {
        window.history.pushState(path);
      } else {
        window.location.href = window.location.href.replace(/#(.*)/gi, `#${path}`);
      }

      return this;
    }

    bind() {
      window.addEventListener('popstate', this.popStateHandler);

      return this;
    }

    unbind() {
      window.removeEventListener('popstate', this.popStateHandler);

      return this;
    }
  }

  return Rooter;
});