const verifyJWT = require('../middleware/VerifyJWT');
const resumeController = require('../controllers/resume.controller');

module.exports = function (app, upload) {
  app.post(
    '/resume/upload/:studentId',
    [verifyJWT.verifyToken, upload.single('resume')],
    resumeController.uploadResume
  );

  app.delete(
    '/resume/delete/:studentId',
    [verifyJWT.verifyToken, upload.single('resume')],
    resumeController.deleteResume
  );

  app.get(
    '/resume/:studentId',
    [verifyJWT.verifyToken],
    resumeController.getResume
  );
};
export {};
