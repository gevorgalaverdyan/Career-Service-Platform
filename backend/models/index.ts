const mongoose = require('mongoose');

mongoose.set('strictQuery', false);
mongoose.Promise = global.Promise;

const user = require('./user.model');
const role = require('./role.model');
const job = require('./job.model');
const application = require('./application.model');
const resume = require('./resume.model');
const counter = require('./counter.model');

const ROLES = ['student', 'employer', 'admin'];

function initial(): void {
  role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      ROLES.forEach((elm) => {
        new role({
          name: elm,
        }).save((err) => {
          if (err) {
            console.log('error', err);
          }

          console.log(`added "${elm}" to roles collection.`);
        });
      });
    }
  });
}

const db = {
  mongoose,
  role,
  user,
  job,
  application,
  resume,
  ROLES,
  counter,
  initial,
};

module.exports = db;
export{};