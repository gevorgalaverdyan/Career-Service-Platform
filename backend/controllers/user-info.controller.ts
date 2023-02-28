const db = require('..models');
const User = db.user;
const Role = db.role;

const getUserById = async (req, res) => {
    User.findOne({
        _id: (req.params.id)
    })
    .populate('roles', '-__v')
    .exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err});
            return;
        }

        if (!user) {
            return res.status(404).send({ message: 'User Not Found'})
        }

        res.status(200).json({
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email
        });
    });
};
module.exports = {getUserById};