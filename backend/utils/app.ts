const express = require('express');
const { errorHandler } = require('../middleware/errorMiddleware');
const cookieSession = require('cookie-session');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

function createServer() {
  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use(
    cookieSession({
      name: 'career-service-platform-session',
      secret: 'COOKIE_SECRET',
      httpOnly: true,
    })
  );

  app.use(errorHandler);

  // routes
  require('../routes/auth.routes')(app);
  require('../routes/user-info.routes')(app);
  require('../routes/job.routes')(app);
  require('../routes/application.routes')(app);
  require('../routes/resume.routes')(app, upload);

  return app;
}

module.exports = createServer ;
