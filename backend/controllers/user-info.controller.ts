const db = require('../models');
const User = db.user;
const Role = db.role;

const bcrypt = require('bcryptjs');

const getUserById = async (req, res) => {
  User.findOne({
    _id: db.mongoose.Types.ObjectId(req.params.id),
  })
    .populate('roles', '-__v')
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        return res.status(404).send({ message: 'User Not Found' });
      }

      res.status(200).json({
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      });
    });
};

const updateUser = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 8);
  const user = new User({
    firstName,
    lastName,
    email,
    password: hashedPassword,
  });

  User.findOneAndUpdate({ _id: req.params.id }, user, { new: true })
    .populate('roles', '-__v')
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        return res.status(404).send({ message: 'User Not Found' });
      }

      res.status(200).send(user);
    });
};

const deleteUser = async (req, res) => {
  User.deleteOne({ _id: req.params.id })
    .then(res.json('delete success!'))
    .catch(res.json('delete err!'));
};

module.exports = { getUserById, updateUser, deleteUser };
export {};