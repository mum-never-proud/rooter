// you can ignore warnings, or use --silent if it bothers you ¯\_(ツ)_/¯

const Rooter = require('../src/rooter');

describe('rooter test', () => {
  it('should throw error when invalid mode is supplied', () => {
    expect(() => new Rooter({ mode: 'func' })).toThrow(Error);
  });

  it('should choose default mode is history', () => {
    expect(new Rooter().mode).toEqual('history');
  });

  it('should set the user defined mode', () => {
    expect(new Rooter({ mode: 'hash' }).mode).toEqual('hash');
  });

  it('should throw error on adding invalid route', () => {
    expect(() => new Rooter().get()).toThrow(Error); // invalid url and callback
    expect(() => new Rooter().get('/')).toThrow(Error); // invalid callback
  });

  it('should add route', () => {
    const rooter = new Rooter();

    expect(rooter.routes.length).toEqual(0);

    rooter.get(('/'), jest.fn());

    expect(rooter.routes.length).toEqual(1);
  });

  it('should remove route', () => {
    const rooter = new Rooter();

    rooter.get(('/'), jest.fn());

    expect(rooter.routes.length).toEqual(1);

    rooter.forget('/');

    expect(rooter.routes.length).toEqual(0);
  });
});
