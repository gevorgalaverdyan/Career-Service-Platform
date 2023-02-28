const userInfoController = require('..controllers/user-info.controller');

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
    next();
  });

app.get(
    '/user-info/find/:id',
    userInfoController.getUserById
);
};


