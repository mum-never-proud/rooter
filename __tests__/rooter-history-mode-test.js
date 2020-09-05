const Rooter = require('../src/rooter');

describe('rooter history mode', () => {
  let rooter;

  beforeEach(() => {
    rooter = new Rooter();

    rooter.get('/', jest.fn()); // to avoid too many console warns in tests
    rooter.get('/path', jest.fn());
    rooter.bind();
  });

  afterEach(() => {
    rooter.navigate('/');
    rooter.unbind();
  });

  it('should navigate to path', () => {
    expect(window.location.href).toEqual('http://localhost/');

    rooter.navigate('/path');

    expect(window.location.href).toEqual('http://localhost/path');
  });

  it('should get current path', () => {
    expect(rooter.currentPath()).toEqual('/');
  });

  it('call appropriate callback', () => {
    const callback = jest.fn();

    rooter.get('/hello', callback);
    rooter.navigate('/hello');

    expect(callback).toHaveBeenCalledTimes(1);
  });
});
