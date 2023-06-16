
const mockData = require('./mock-data/mockdata.json')

const { MongoClient } = require('mongodb');
const url = "mongodb://localhost:27017/GroupStudy";

MongoClient.connect(url)
    .then(client => {
        const db = client.db(); // Get the default database
        console.log('Database was created!');

        const collections = ['chat', 'groups', 'groupCategory', 'discussion', 'users', 'questionAnswer'];

        const createCollectionPromises = collections.map(collectionName => {
            return db.createCollection(collectionName)
                .then(() => {
                    console.log(`Collection '${collectionName}' created successfully.`);
                });
        });

        return Promise.all(createCollectionPromises)
            .then(() => {
                return client;
            });
    })
    //mockdata
    .then(client => {
        const db = client.db("GroupStudy"); // Specify the database name
        // Specify the collection name
        const usersCollection = db.collection("users");
        const chatCollection = db.collection("chat");
        const groupsCollection = db.collection("groups");
        const groupCategoryCollection = db.collection("groupCategory");
        const discussionCollection = db.collection("discussion");
        const questionAnswerCollection = db.collection("questionAnswer");

        // Insert mock data
        return Promise.all([
            usersCollection.insertMany(mockData.users),
            chatCollection.insertMany(mockData.chat),
            groupsCollection.insertMany(mockData.groups),
            groupCategoryCollection.insertMany(mockData.groupCategory),
            discussionCollection.insertMany(mockData.discussion),
            questionAnswerCollection.insertMany(mockData.questionAnswer)
        ])
            .then(results => {
                const insertedCounts = results.map(result => result.insertedCount);
                console.log(`${insertedCounts.reduce((sum, count) => sum + count, 0)} mock data inserted successfully.`);
                return client.close();
            });
    })
    .catch(err => {
        console.error(err);
    });