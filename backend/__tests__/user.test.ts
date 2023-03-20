//import what we want to test
/*describe('user can log in and access his profile', () => {
  it.todo('Go to CareersConcordia, login existing user {email, password}');
  it.todo('Open User Profile page');
  it.todo('User should see his information');
});
*/
const {app} = require('../server');
const supertest = require('supertest')

const API_URL = '/auth/';

describe('login to profile', () => {
  describe('get login route', () => {
    describe('given user does not exist', () => {
      it('should return 404', async () => {
        const userData = {
          email: 'ab@gmail.com',
          password: "ab"
        }

        await supertest(app).post(`${API_URL}login`).send(userData).expect(404);
      });
    });
  });
});

/////Afif's test
describe('user can signup', () => {
  it.todo(
    'Go to CareersConcordia, expected: user can access only login&signup'
  );
  it.todo(
    'After typing valid information, user is signed up and exists in the DB'
  );
});
