import { hasSubscribers } from 'diagnostics_channel';

const db = require('../models');
const User = db.user;
const Role = db.role;

var bcrypt = require('bcryptjs');

const register = async (req, res, next) => {
  const { firstName, lastName, email, phoneNumber, password, roles } = req.body;

  const hashedPassword = bcrypt.hashSync(password, 8);
  const user = new User({
    firstName,
    lastName,
    email,
    phoneNumber,
    password: hashedPassword,
    roles,
  });

  user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    Role.find({ name: { $in: roles } }, (err, roles) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      user.roles = roles.map((role) => role._id);
      user.save((err) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        res.send({ message: 'User was registered successfully!' });
      });
    });
  });
};

const login = async (req, res, next) => {
  User.findOne({
    email: req.body.email,
  })
    .populate('roles', '-__v')
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        return res.status(404).send({ message: 'User Not found.' });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({ message: 'Invalid Password!' });
      }

      var roles = [];

      for (let i = 0; i < user.roles.length; i++) {
        roles.push('ROLE_' + user.roles[i].name.toUpperCase());
      }

      res.status(200).send({
        id: user._id,
        roles: roles,
      });
    });
};

module.exports = { register, login };
