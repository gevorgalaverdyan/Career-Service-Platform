const { verifyRegistration } = require('../middleware');
const controller = require('../controllers/auth-controller');

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
    next();
  });

  app.post(
    '/api/auth/register',
    [
      verifyRegistration.checkDuplicateEmail,
      verifyRegistration.checkRolesExisted,
    ],
    controller.registerNewUser
  );

  app.post('/api/auth/signin', controller.signin);
};
