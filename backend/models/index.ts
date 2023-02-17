const mongoose = require('mongoose');

mongoose.set('strictQuery', false);
mongoose.Promise = global.Promise;

const user = require('./user.model');
const role = require('./role.model');

const ROLES = ['student', 'employee', 'admin'];

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
  ROLES,
  initial,
};

export { db };
