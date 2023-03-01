//import what we want to test
//@desc user can log in and access his profile
describe('User', () => {
  const user = {
    email: 'a@gmail.com',
    password: 'a',
  };

  describe('get User route', () => {
    describe('given user does not exist', () => {
      it('should return 404', () => {
        expect(true).toBe(true);
      });
    });
  });

  it.todo('Go to CareersConcordia, login existing user {email, password}');
  it.todo('Open User Profile page');
  it.todo('User should see his information');
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
