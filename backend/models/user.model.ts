const mongoose = require('mongoose');
const counter = require('./counter.model');

const userSchema = mongoose.Schema({
  userId: { type: String },
  firstName: String,
  lastName: String,
  company: String,
  email: String,
  password: String,
  roles: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Role',
    },
  ],
});

userSchema.pre('save', function (next) {
  var doc = this;
  counter
    .findByIdAndUpdate(
      { _id: 'userId' },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    )
    .then(function (count) {
      doc.userId = count.seq;
      next();
    })
    .catch(function (error) {
      console.error('counter error-> : ' + error);
      throw error;
    });
});

const User = mongoose.model('User', new mongoose.Schema(userSchema));

module.exports = User;
export{}