const express = require('express');
const bodyParser = require('body-parser');

// Mongoose
const mongoose = require('mongoose');
const dbUrl = 'mongodb://localhost:27017/ChatApp';
const connect = mongoose.connect(dbUrl);
const Chat = require('../models/chat');

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
    .get((req, res, next) => {
        connect.then((data) => {
            console.log('Connected to server');
            if (data) {
                Chat.find({}).then((chat) => {
                    console.log("Finding");
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(chat);
                    res.end();
                    console.log("Found successfully");
                });
            } else {
                console.log("No data");
                res.status(500).json("fail");
            }
        });
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

module.exports = chatRouter;
