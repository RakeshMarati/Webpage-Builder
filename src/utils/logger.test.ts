import Logger from './logger';

describe('Logger Utility', () => {
  beforeEach(() => {
    jest.spyOn(console, 'debug').mockImplementation(() => {});
    jest.spyOn(console, 'info').mockImplementation(() => {});
    jest.spyOn(console, 'warn').mockImplementation(() => {});
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should log info messages', () => {
    Logger.info('Test info', { test: true });
    expect(console.info).toHaveBeenCalled();
  });

  it('should log debug messages', () => {
    Logger.debug('Test debug');
    expect(console.debug).toHaveBeenCalled();
  });

  it('should log warning messages', () => {
    Logger.warn('Test warn');
    expect(console.warn).toHaveBeenCalled();
  });

  it('should log error messages', () => {
    Logger.error('Test error', new Error('fail'));
    expect(console.error).toHaveBeenCalled();
  });
});