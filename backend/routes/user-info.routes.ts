const userInfoController = require('../controllers/user-info.controller');

module.exports = function (app) {
  app.get('/user-info/:id', userInfoController.getUserById);
};
