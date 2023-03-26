const mongoose = require('mongoose');
const counter = require('./counter.model');

const applicationSchema = mongoose.Schema({
  applicationId: { type: String },
  job: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
  },
  candidate: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  status: {
    type: String,
        enum : ['PENDING','HIRED', 'DECLINED'],
        default: 'PENDING'
  },
  createdOn: String,
});

applicationSchema.pre('save', function(next) {
  var doc = this;
  counter
    .findByIdAndUpdate(
      { _id: 'applicationId' },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    )
    .then(function(count) {
      doc.applicationId = count.seq;
      next();
    })
    .catch(function(error) {
      console.error('counter error-> : ' + error);
      throw error;
    });
});

const Application = mongoose.model(
  'Application',
  new mongoose.Schema(applicationSchema)
);

module.exports = Application;
export {};