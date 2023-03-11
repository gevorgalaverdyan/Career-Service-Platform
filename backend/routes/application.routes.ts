const applicationController = require('../controllers/application.controller');
const verifyJWT = require('../middleware/VerifyJWT');

module.exports = function(app) {
  app.get(
    '/application/:id',
    [verifyJWT.verifyToken],
    applicationController.getApplicationById
  );

  app.get(
    '/application/user/:id',
    [verifyJWT.verifyToken],
    applicationController.getApplicationsByUserId
  );

  app.post(
    '/application',
    [verifyJWT.verifyToken],
    applicationController.createApplication
  );

  // app.put(
  //   '/application',
  //   [verifyJWT.verifyToken],
  //   applicationController.updateUser
  // );
};
