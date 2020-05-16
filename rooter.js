(function (factory) {
  if (typeof module !== 'undefined' && typeof exports === 'object') {
    module.exports = factory();
  } else if (typeof define === 'function' && define.amd) {
    define('rooter', factory);
  } else {
    window.rooter = factory();
  }
})(function () {
  class Router {
  }

  return Router;
});