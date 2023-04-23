import { errorHandler } from '../middleware/errorMiddleware';

describe('errorHandler middleware', () => {
  it('should set the status code and response body based on the error passed to it', () => {
    const err = new Error('test error');
    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    const next = jest.fn();

    errorHandler(err, req, res, next);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: 'test error',
      stack: expect.any(String)
    });
  });
});