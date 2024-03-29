const verifyJWT = require('../middleware/VerifyJWT');
const jobController = require('../controllers/job-controller');

module.exports = function (app) {
  app.get('/job/:id', [verifyJWT.verifyToken], jobController.getJobById);

  app.get('/job', [verifyJWT.verifyToken], jobController.getAllJobs);

  app.post('/job', [verifyJWT.verifyToken], jobController.createJob);

  app.put('/job/:id', [verifyJWT.verifyToken], jobController.editJob);

  app.delete('/job/:id', [verifyJWT.verifyToken], jobController.deleteJob);


};
export {};