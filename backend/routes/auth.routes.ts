const verification = require('../middleware/verifyRegistration');
const controller = require('../controllers/auth.controller');

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
    next();
  });

  app.post(
    '/auth/register',
    [verification.checkDuplicateEmail, verification.checkRolesExisted],
    controller.register
  );

  app.post('/auth/login', controller.login);

  app.post('/auth/logout', controller.logout);
};
