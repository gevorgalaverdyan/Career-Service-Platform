const express = require('express');
const path = require('path');
const dotenv = require('dotenv').config();
const PORT = process.env.PORT || 8000;
const createServer = require('./utils/app')
// import createServer from './utils/app.js';

const db = require('./models/index');
const dbConfig = require('./config/db.config');

const firebase = require('firebase/app');
const firebaseConfig = require('./config/firebase.config');

firebase.initializeApp(firebaseConfig);

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
  .catch((err) => {
    console.error('Connection error', err);
    process.exit();
  });

const app = createServer();

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

app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
