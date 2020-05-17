const Rooter = require('../rooter');

describe('rooter hash mode', () => {
  let rooter;

  beforeAll(() => {
    rooter = new Rooter({ mode: 'hash' });
    window.location.href = window.location.href+'#';

    rooter.get('#', jest.fn());  // to avoid too many console warns in tests
    rooter.bind();
  });

  afterEach(() => {
    rooter.navigate('#');
  });

  it('should navigate to path', () => {
    rooter.navigate('#path');

    expect(window.location.hash).toEqual('#path');
  });

  it('should get current path', () => {
    expect(rooter.currentPath()).toEqual('#');
  });

  it('should call appropriate callback', () => {
    const callback = jest.fn();

    rooter.get('#hello', callback);
    rooter.navigate('#hello');
    rooter.routeHandler();

    expect(callback).toHaveBeenCalledTimes(1);
  });
});
