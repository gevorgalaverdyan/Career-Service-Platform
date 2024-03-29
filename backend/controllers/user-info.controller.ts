const db = require('../models');
const User = db.user;

const getUserById = async (req, res) => {
  User.findOne({
    userId: req.params.id,
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
        userId: user.userId,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        company: user.company,
      });
    });
};

const updateUser = async (req, res) => {
  const { firstName, lastName, email, company, roles } = req.body;

  User.findOneAndUpdate(
    { userId: req.params.id },
    {
      firstName,
      lastName,
      company,
      email,
    },
    { new: true }
  )
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
        company,
        roles,
        userId: user.userId,
      });
    });
};

const deleteUser = async (req, res) => {
  User.deleteOne({ userId: req.params.id })
    .then(res.json('delete success!'))
    .catch(res.json('delete err!'));
};

module.exports = { getUserById, updateUser, deleteUser };
export {};
