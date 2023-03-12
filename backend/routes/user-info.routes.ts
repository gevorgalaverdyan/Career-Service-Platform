const userInfoController = require('../controllers/user-info.controller');
const verifyJWT = require('../middleware/VerifyJWT');

module.exports = function (app) {
  app.get(
    '/user-info/:id',
    [verifyJWT.verifyToken],
    userInfoController.getUserById
  );

  app.put(
    '/user-info/:id',
    [verifyJWT.verifyToken],
    userInfoController.updateUser
  );

  app.delete(
    '/user-info/:id',
    [verifyJWT.verifyToken],
    userInfoController.deleteUser
  );
};
