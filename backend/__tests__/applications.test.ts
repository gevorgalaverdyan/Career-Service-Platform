// const createServer = require('../utils/app');
// const request = require('supertest'); // assuming your Express app is defined in a separate file

// const API_URL = '/application/';

// const app = createServer();

// describe('GET /application/user/:id', () => {
//   let token;

//   beforeAll((done) => {
//     // Log in the user and get a token
//     const user = { email: 'kosovo@bangladesh.ru', password: 'kosovo' };
//     request(app)
//       .post('/login')
//       .send(user)
//       .end((err, response) => {
//         token = response.body.token; // Save the token for later use
//         done();
//       });
//   });

//   it('should return all applications for the given user ID', async () => {
//     const userId = 1;
//     const response = await request(app)
//       .get(`/application/user/${userId}`)
//       .set('Authorization', `Bearer ${token}`);

//     expect(response.status).toBe(200);
//     expect(response.body).toHaveLength(2); // Change this to the expected number of applications for the given user ID
//   });

//   it('should return a 404 error if the user ID is not found', async () => {
//     const userId = 999;
//     const response = await request(app)
//       .get(`/application/user/${userId}`)
//       .set('Authorization', `Bearer ${token}`);

//     expect(response.status).toBe(404);
//     expect(response.body).toHaveProperty('message', 'User not found.');
//   });

//   it('should return a 401 error if no token is provided', async () => {
//     const userId = 1;
//     const response = await request(app)
//       .get(`/application/user/${userId}`);

//     expect(response.status).toBe(401);
//     expect(response.body).toHaveProperty('message', 'Unauthorized!');
//   });
// });