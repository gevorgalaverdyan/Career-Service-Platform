const verification = require('../middleware/verify-user-registration');
const controller = require('../controllers/auth-controller');

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
    next();
  });

  app.post(
    '/api/auth/register',
    [verification.checkDuplicateEmail, verification.checkRolesExisted],
    controller.register
  );

  app.post('/api/auth/login', controller.login);
};
