const testVerifyJWT = require('../middleware/VerifyJWT');

describe('verifyToken middleware', () => {
  it('should return a 403 status with "No token provided!" message when no token is provided in the session', () => {
    const req = {
      session: {}
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    };
    const next = jest.fn();

    testVerifyJWT.verifyToken(req, res, next);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.send).toHaveBeenCalledWith({ message: 'No token provided!' });
    expect(next).not.toHaveBeenCalled();
  });
});