const mongoose = require('mongoose');

const counter = mongoose.model('counter', {
  _id: { type: String, required: true },
  seq: { type: Number, default: 0 },
});

module.exports = counter;
export {};