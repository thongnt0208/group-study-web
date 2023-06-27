require('dotenv').config();
const dbUrl = process.env.DB_CONNECTION_STRING;
const express = require('express');
const bodyParser = require('body-parser');

// Mongoose
const mongoose = require('mongoose');
const connect = mongoose.connect(dbUrl);
const Chat = require('../models/chat');
const Groups = require('../models/groups');

// Create router
const chatRouter = express.Router();

chatRouter.use(bodyParser.json());

// Configure routes
chatRouter.route('/')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        next();
    })
    // GET A GROUP CHAT HISTORY
    // input: group id
    // output: chat list
    .get((req, res, next) => {
        const groupId = req.query.groupId;
        let chatList = [];
        Groups.findById(groupId).then((group) => {
            if (group) {
                //group exist 
                if (group.chat) {
                    //there are chats
                    Promise.all(() => {
                        group.chat.forEach(chatId => {
                            chatList.push(Chat.findById(chatId))
                        });
                    }).then(() => {
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        res.json(chatList);
                    }).catch((err) => {
                        res.statusCode = 500;
                        res.json({ error: err.message });
                    })
                }
            } else {
                res.status(404).json({ error: 'Group not found' });
            }
        })
    })
    .post((req, res, next) => {
        console.log(req.body);
        Chat.create(req.body)
            .then((chat) => {
                console.log('Chat Created', chat);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(chat);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .put((req, res, next) => {
        Chat.findOneAndUpdate({ _id: req.body.id }, req.body, { new: true })
            .then((chat) => {
                console.log('Chat Updated', chat);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(chat);
            })
            .catch((err) => next(err));
    })
    .patch((req, res, next) => {
        Chat.findOneAndUpdate({ _id: req.body.id }, { $set: req.body }, { new: true })
            .then((chat) => {
                console.log('Chat Updated', chat);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(chat);
            })
            .catch((err) => next(err));
    })
    .delete((req, res, next) => {
        Chat.deleteMany({})
            .then((response) => {
                console.log('All Chats Deleted');
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(response);
            })
            .catch((err) => next(err));
    });


// -------------CHAT----------------

chatRouter.route('/chats').get((req, res, next) => {

})

module.exports = chatRouter;
