const modes = ['hash', 'history'];

function isValidMode(mode) {
  return !mode ? true : modes.includes(mode);
}

class Rooter {
  constructor(options = {}) {
    if (!isValidMode(options.mode)) {
      throw new Error('invalid mode, try history or hash');
    }

    this.routes = [];
    this.mode = options.mode || (window.history.pushState ? 'history' : 'hash');
    this.routeHandler = this.routeHandler.bind(this);

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

  currentPath() {
    return this.mode === 'history' ? window.location.pathname.replace(/\?(.*)/, '')
      : (window.location.href.match(/#(.*)/) || [])[0] || '/';
  }

  navigate(path) {
    if (this.mode === 'history') {
      window.history.pushState(null, null, path);
      window.dispatchEvent(new Event('pushstate'));
    } else {
      window.location.href = window.location.href.replace(/#(.*)/gi, path);
    }

    return this;
  }

  bind() {
    window.addEventListener('pushstate', this.routeHandler);
    window.addEventListener('popstate', this.routeHandler);
    this.routeHandler();

    return this;
  }

  unbind() {
    window.removeEventListener('pushstate', this.routeHandler);
    window.removeEventListener('popstate', this.routeHandler);

    return this;
  }

  routeHandler() {
    const pathName = this.currentPath(),
      [currentRoute] = this.routes.filter(route => route.url === pathName);

     if (currentRoute) {
      currentRoute.callback();
    } else {
      console.warn(`no handler specified for '${pathName}'`);
    }
  }
}

module.exports = Rooter;
