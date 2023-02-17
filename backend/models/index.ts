const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

// db.user = require('./user.model');
const role = require('./role.model');

const ROLES = ['user', 'admin', 'moderator'];

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

module.exports = {};
