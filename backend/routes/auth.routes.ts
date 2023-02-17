const { checkDuplicateEmail, checkRolesExisted } = require('../middleware');
const { register, signin } = require('../controllers/auth-controller');

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
    next();
  });

  app.post(
    '/api/auth/register',
    [checkDuplicateEmail, checkRolesExisted],
    register
  );

  app.post('/api/auth/login', signin);
};
