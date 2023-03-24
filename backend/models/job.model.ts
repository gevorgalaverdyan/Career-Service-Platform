const mongoose = require('mongoose');
const counter = require('./counter.model');

const jobSchema = mongoose.Schema({
  jobId: { type: String },
  employer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  title: String,
  company: String,
  description: String,
  deadline: String,
});

jobSchema.pre('save', function (next) {
  var doc = this;
  counter
    .findByIdAndUpdate(
      { _id: 'jobId' },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    )
    .then(function (count) {
      doc.jobId = count.seq;
      next();
    })
    .catch(function (error) {
      console.error('counter error-> : ' + error);
      throw error;
    });
});

const Job = mongoose.model('Job', new mongoose.Schema(jobSchema));

module.exports = Job;
export {};