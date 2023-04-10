//import what we want to test
/*describe('user can log in and access his profile', () => {
  it.todo('Go to CareersConcordia, login existing user {email, password}');
  it.todo('Open User Profile page');
  it.todo('User should see his information');
});
*/
const createServer = require('../utils/app');
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

//////Cris Test
describe('create job', () => {
  it.todo('A recruiter should be able to create a job posting');
  it.todo('Sign in as a company and then create a posting ');
  it.todo(
    'A user(Job Seeking user) should see the posting with all the details'
  );

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

  describe('Post Job Posting', () => {
    describe('given field left empty', () => {
      it('should return 404', async () => {
        const postingData = {
          CompanyName: 'Genetec',
          Description: 'Full Stack, 12$/h,etc..',
          Deadline: '10/10/2009',
        };
        await supertest(app)
          .post(`${API_URL}postPosting`)
          .send(postingData)
          .expect(404);
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

  beforeAll(async () => {
    const mongoServer = await MongoMemoryServer.create();

    await mongoose.connect(mongoServer.getUri())
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
  })

  describe('get sign up route', () => {
      describe ('given user enters valid data', () => {
        it('should return 201', async () => {
          const userData = {
            email: 'HelloTest@gmail.com',
            password: '345',
          };

          await supertest(app).post(`${API_URL}register`).send(userData).expect(201);
        });
      });
  });

});
