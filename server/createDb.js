require('dotenv').config();

// const mockData = require('./mock-data/mockdata.json');

const { MongoClient } = require('mongodb');
// should put password in environment file
const url = process.env.DB_CONNECTION_STRING;
console.log(url);

MongoClient.connect(url)
   .then((client) => {
      const db = client.db(); // Get the default database
      console.log('Database was created!');

      const collections = [
         'chats',
         'groups',
         'groups-categories',
         'discussions',
         'users',
         'questions-answers',
      ];

      const createCollectionPromises = collections.map((collectionName) => {
         return db.createCollection(collectionName).then(() => {
            console.log(`Collection '${collectionName}' created successfully.`);
         });
      });

      return Promise.all(createCollectionPromises).then(() => {
         return client;
      });
   })
   //mockdata
   .then((client) => {
      const db = client.db('GroupStudy'); // Specify the database name
      // Specify the collection name
      const userssCollection = db.collection('users');
      const chatsCollection = db.collection('chats');
      const groupssCollection = db.collection('groups');
      const groupsCategoriesCollection = db.collection('groups-categories');
      const discussionsCollection = db.collection('discussions');
      const questionsAnswersCollection = db.collection('questions-answers');


   })
   .catch((err) => {
      console.error(err);
   });
