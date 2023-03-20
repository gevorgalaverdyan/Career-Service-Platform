const verifyJWT = require('../middleware/VerifyJWT');
const resumeController = require('../controllers/resume.controller');

module.exports = function(app, upload) {
  app.post(
    '/resume/upload/:studentId',
    [verifyJWT.verifyToken, upload.single('resume')],
    resumeController.createResume
  );
  
  app.put(
    '/resume/update/:studentId',
    [verifyJWT.verifyToken, upload.single('resume')],
    resumeController.updateResume
  );

  app.delete(
    '/resume/delete/:studentId',
    [verifyJWT.verifyToken, upload.single('resume')],
    resumeController.deleteResume
  );
};
