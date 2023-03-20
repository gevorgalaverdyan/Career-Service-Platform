const express = require('express');
const path = require('path');
const dotenv = require('dotenv').config();
const PORT = process.env.PORT || 8000;
const { errorHandler } = require('./middleware/errorMiddleware');
const cookieSession = require('cookie-session');

const db = require('./models/index');
const dbConfig = require('./config/db.config');

const firebase = require('firebase/app');
const firebaseConfig = require('./config/firebase.config');
const multer = require('multer');

firebase.initializeApp(firebaseConfig);
const upload = multer({ storage: multer.memoryStorage() });

const dbConnectionString = `${dbConfig.ATLAS}`;
/** Connect to database */
db.mongoose
  .connect(dbConnectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Successfully connect to MongoDB.');
    db.initial();
  })
  .catch(err => {
    console.error('Connection error', err);
    process.exit();
  });

export const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cookieSession({
    name: 'career-service-platform-session',
    secret: 'COOKIE_SECRET',
    httpOnly: true,
  })
);

// routes
require('./routes/auth.routes')(app);
require('./routes/user-info.routes')(app);
require('./routes/job.routes')(app);
require('./routes/application.routes')(app);
require('./routes/resume.routes')(app, upload);

//server Frontend
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));

  app.get('*', (req, res) =>
    res.sendFile(__dirname, '../', 'frontend', 'build', 'index.html')
  );
} else {
  app.get('/', (req, res) => {
    res.status(200).json({ message: 'Welcome to  Careers Concordia API' });
  });
}

app.use(errorHandler);
app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));

export {};