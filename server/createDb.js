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
         'Chat',
         'Group',
         'GroupCategory',
         'Discussion',
         'User',
         'QuestionAnswer',
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
      const usersCollection = db.collection('User');
      const chatCollection = db.collection('Chat');
      const groupsCollection = db.collection('Group');
      const groupCategoryCollection = db.collection('GroupCategory');
      const discussionCollection = db.collection('Discussion');
      const questionAnswerCollection = db.collection('QuestionAnswer');


   })
   .catch((err) => {
      console.error(err);
   });
