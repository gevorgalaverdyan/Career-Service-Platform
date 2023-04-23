const createServer = require('../utils/app');
const request = require('supertest');
const app = createServer();

describe('logout', () => {
  it('should clear the session and return a success message', async () => {
    const response = await request(app)
      .post('/auth/logout')
      .expect(200);

    expect(response.body).toEqual({ message: "You've been signed out!" });
   
  });
});
