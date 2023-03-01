const userInfoController = require('../controllers/user-info.controller');

module.exports = function (app) {
  app.get('/user-info/:id', 
    userInfoController.getUserById
  );

  app.put('/user-info/:id', 
    userInfoController.updateUser
  );
}
