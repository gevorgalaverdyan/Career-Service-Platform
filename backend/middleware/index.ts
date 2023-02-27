const verifyJWT = require('./VerifyJWT');
const verifyRegistration = require('./verifyRegistration');
const errorMiddleware = require('./errorMiddleware');

module.exports = {
  errorMiddleware,
  verifyRegistration,
  verifyJWT,
};
