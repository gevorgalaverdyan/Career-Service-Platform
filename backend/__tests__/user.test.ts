//import what we want to test
/*describe('user can log in and access his profile', () => {
  it.todo('Go to CareersConcordia, login existing user {email, password}');
  it.todo('Open User Profile page');
  it.todo('User should see his information');
});
*/
//import app from '../server'
import supertest from 'supertest'

const API_URL = '/auth/';

describe('login to profile', () => {
  describe('get login route', () => {
    describe('given user does not exist', () => {
      it('should return 404', async () => {
        const userData = {
          email: 'testJest@gmail.com',
          password: "123"
        }

        //await supertest(app).post(`${API_URL}login`).send(userData).expect(404);
      });
    });
  });
});

describe('user can signup', () => {
  it.todo(
    'Go to CareersConcordia, expected: user can access only login&signup'
  );
  it.todo(
    'After typing valid information, user is signed up and exists in the DB'
  );
});
