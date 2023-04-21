const createServer = require('../utils/app');
const request = require('supertest'); // assuming your Express app is defined in a separate file

const API_URL = '/application/';

const app = createServer();

describe('gets applicationd by user ID', () => {
  it('should return a list of applications for a given user ID', async () => {
    // define a mock user ID for the test
    const userId = '42';

    // make a GET request to the endpoint with the mock user ID
    const response = await request(app).get(`${API_URL}user/${userId}`);

    // check that the response status code is 200 OK
    expect(response.status).toBe(200);

    // check that the response body is an array of objects with the expected properties
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBeGreaterThan(0);
    expect(response.body[0]).toHaveProperty('applicationId');
    expect(response.body[0]).toHaveProperty('jobId');
    expect(response.body[0]).toHaveProperty('userId', userId);
    expect(response.body[0]).toHaveProperty('status');
    expect(response.body[0]).toHaveProperty('createdOn');
  });

  it('should return a 404 error if the user ID is not found', async () => {
    // define a mock user ID that does not exist in the database
    const userId = '456';

    // make a GET request to the endpoint with the mock user ID
    const response = await request(app).get(`${API_URL}user/${userId}`); 

    // check that the response status code is 404 Not Found
    expect(response.status).toBe(403);

    // check that the response body contains an error message
    expect(response.body).toHaveProperty('message', 'User not found.');
  });
});