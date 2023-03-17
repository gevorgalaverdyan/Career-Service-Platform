// //import what we want to test
// describe('user can log in and access his profile', () => {
//   it.todo('Go to CareersConcordia, login existing user {email, password}');
//   it.todo('Open User Profile page');
//   it.todo('User should see his information');
// });

// describe('user can signup', () => {
//   it.todo(
//     'Go to CareersConcordia, expected: user can access only login&signup'
//   );
//   it.todo(
//     'After typing valid information, user is signed up and exists in the DB'
//   );
// });
describe('Filter function', () => {
  test('it should filter by a search term (link)', () => {
    const input = [
      { id: 1, url: 'https://www.url1.dev' },
      { id: 2, url: 'https://www.url2.dev' },
      { id: 3, url: 'https://www.link3.dev' },
    ];

    const output = [{ id: 3, url: 'https://www.link3.dev' }];

    expect(filterByTerm(input, 'link')).toEqual(output);

    expect(filterByTerm(input, 'LINK')).toEqual(output);
  });
});

function filterByTerm(inputArr, searchTerm) {
  const regex = new RegExp(searchTerm, 'i');
  return inputArr.filter(function (arrayElement) {
    return arrayElement.url.match(regex);
  });
}
