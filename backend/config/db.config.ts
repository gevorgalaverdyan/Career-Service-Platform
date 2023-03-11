module.exports = {
  ATLAS: `mongodb+srv://DB_User:CSP@careerserviceplatform.oyvurkm.mongodb.net/?retryWrites=true&w=majority`,
  LOCAL: {
    // 'mongodb://${dbConfig.USERNAME}:${dbConfig.PASSWORD}@${dbConfig.HOST}:${dbConfig.PORT}'
    HOST: 'localhost',
    PORT: 27017,
    DB: 'career_service_db',
    USERNAME: 'root',
    PASSWORD: 'rootpassword',
  },
};
