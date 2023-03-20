const mongoose = require('mongoose');

const resumeSchema = mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  resume: String,
});

const Resume = mongoose.model('Resume', new mongoose.Schema(resumeSchema));

module.exports = Resume;
export {};