const request = require('supertest');
const createServer = require('../utils/app');

describe('createServer', () => {
  it('should respond with 404 on an unknown route', async () => {
    const app = createServer();
    const response = await request(app).get('/unknown-route');
    expect(response.status).toBe(404);
  });
});

export{}