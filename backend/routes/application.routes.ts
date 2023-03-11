const applicationController = require('../controllers/application.controller');
const verifyJWT = require('../middleware/VerifyJWT');

module.exports = function (app) {
  app.get(
    '/application/:id',
    [verifyJWT.verifyToken],
    applicationController.getApplicationById
  );

  app.get(
    '/application',
    [verifyJWT.verifyToken],
    applicationController.getApplicationByUserId
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
