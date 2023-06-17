const express = require('express');
const bodyParser = require('body-parser');

// Mongoose
const mongoose = require('mongoose');
const dbUrl = 'mongodb://localhost:27017/GroupStudy';
const connect = mongoose.connect(dbUrl);
const Discussion = require('../models/discussion');

// Create router
const discussionRouter = express.Router();

discussionRouter.use(bodyParser.json());

// Configure routes
discussionRouter.route('/')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        next();
    })
    .get((req, res, next) => {
        connect.then((data) => {
            console.log('Connected to server');
            if (data) {
                Discussion.find({}).then((discussion) => {
                    console.log("Finding");
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(discussion);
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
        Discussion.create(req.body)
            .then((discussion) => {
                console.log('Discussion Created', discussion);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(discussion);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .put((req, res, next) => {
        Discussion.findOneAndUpdate({ _id: req.body.id }, req.body, { new: true })
            .then((discussion) => {
                console.log('Discussion Updated', discussion);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(discussion);
            })
            .catch((err) => next(err));
    })
    .patch((req, res, next) => {
        Discussion.findOneAndUpdate({ _id: req.body.id }, { $set: req.body }, { new: true })
            .then((discussion) => {
                console.log('Discussion Updated', discussion);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(discussion);
            })
            .catch((err) => next(err));
    })
    .delete((req, res, next) => {
        Discussion.deleteMany({})
            .then((response) => {
                console.log('All Discussions Deleted');
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(response);
            })
            .catch((err) => next(err));
    });

module.exports = discussionRouter;
