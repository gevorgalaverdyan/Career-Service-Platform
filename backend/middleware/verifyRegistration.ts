const db = require('../models/index');

const User = db.user;
const ROLES = db.ROLES;

const checkDuplicateEmail = (req, res, next) => {
  User.findOne({
    email: req.body.email,
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (user) {
      res.status(400).send({ message: 'Failed! Email is already in use!' });
      return;
    }

    next();
  });
};

const checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    req.body.roles.forEach((role) => {
      if (!ROLES.includes(role)) {
        res.status(400).send({
          message: `Failed! Role ${role} does not exist!`,
        });

        return;
      }
    });
  }

  next();
};

module.exports = { checkDuplicateEmail, checkRolesExisted };
export{};