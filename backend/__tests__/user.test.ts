//import what we want to test
/*describe('user can log in and access his profile', () => {
  it.todo('Go to CareersConcordia, login existing user {email, password}');
  it.todo('Open User Profile page');
  it.todo('User should see his information');
});
*/
import createServer from '../utils/app';
const supertest = require('supertest');
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

const API_URL = '/auth/';

const app = createServer();

describe('login to profile', () => {
  beforeAll(async () => {
    const mongoServer = await MongoMemoryServer.create();

    await mongoose.connect(mongoServer.getUri());
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
  });

  describe('get login route', () => {
    describe('given user does not exist', () => {
      it('should return 404', async () => {
        const userData = {
          email: 'testJest@gmail.com',
          password: '123',
        };

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
