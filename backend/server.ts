const express = require('express');
//const colors = require('colors');
const dotenv = require('dotenv').config();
const path = require('path');
const PORT = process.env.PORT || 8000;
// const { errorHandler } = require('./middleware/errorMiddleware');
const dbConfig = require('./config/db.config');

const { db } = require('./models/index');

// const dbConnectionString = `mongodb://${dbConfig.USERNAME}:${dbConfig.PASSWORD}@${dbConfig.HOST}:${dbConfig.PORT}`;
const dbConnectionString = `mongodb+srv://root:kgKn3iRJRsGm0wiU@careerserviceplatform.s0mkfuf.mongodb.net/?retryWrites=true&w=majority`;
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

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
require('./routes/auth.routes')(app);

//server Frontend
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));

  app.get('*', (req, res) =>
    res.sendFile(__dirname, '../', 'frontend', 'build', 'index.html')
  );
} else {
  app.get('/', (req, res) => {
    res.status(200).json({ message: 'Welcome to Support Desk API' });
  });
}

// app.use(errorHandler);
app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
