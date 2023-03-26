const config = require('../config/auth.config');
const db = require('../models');
const User = db.user;
const Role = db.role;

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const register = async (req, res, next) => {
  const { firstName, lastName, email, password, roles, company } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 8);
  const user = new User({
    firstName,
    lastName,
    email,
    company,
    password: hashedPassword,
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

      const authorities = [];

      for (let i = 0; i < user.roles.length; i++) {
        authorities.push('ROLE_' + roles[i].name.toUpperCase());
      }

      user.save((err) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        res.status(201).json({
          _id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          company,
          token: generateToken(user._id),
          roles: authorities,
          userId: user.userId,
        });
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

      const passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({ message: 'Invalid Password!' });
      }

      var token = generateToken(user._id);

      const authorities = [];

      for (let i = 0; i < user.roles.length; i++) {
        authorities.push('ROLE_' + user.roles[i].name.toUpperCase());
      }

      req.session.token = token;

      res.status(200).json({
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        company: user.company,
        token: token,
        roles: authorities,
        userId: user.userId,
      });
    });
};

const logout = async (req, res, next) => {
  try {
    req.session = null;
    return res.status(200).send({ message: "You've been signed out!" });
  } catch (err) {
    next(err);
  }
};

const generateToken = (id) => {
  return jwt.sign({ id }, config.secret, {
    expiresIn: 86400, // 24 hours
  });
};

module.exports = { register, login, logout };
export {};