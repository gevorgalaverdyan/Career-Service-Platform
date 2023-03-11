const verifyJWT = require('../middleware/VerifyJWT');
const resumeController = require('../controllers/resume.controller');

module.exports = function(app, upload) {
  app.post(
    '/resume/:studentId',
    [verifyJWT.verifyToken, upload.single('resume')],
    resumeController.createResume
  );
};
