const express = require('express');
const bodyParser = require('body-parser');

// Mongoose
const mongoose = require('mongoose');
const dbUrl = 'mongodb://localhost:27017/GroupStudy';
const connect = mongoose.connect(dbUrl);
const Users = require('../models/users');

// Create router
const usersRouter = express.Router();

usersRouter.use(bodyParser.json());

// Configure routes
usersRouter.route('/')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        next();
    })
    .get((req, res, next) => {
        connect.then((data) => {
            console.log('Connected to server');
            if (data) {
                Users.find({}).then((users) => {
                    console.log("Finding");
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(users);
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
        Users.create(req.body)
            .then((users) => {
                console.log('Users Created', users);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(users);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .put((req, res, next) => {
        Users.findOneAndUpdate({ _id: req.body.id }, req.body, { new: true })
            .then((users) => {
                console.log('Users Updated', users);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(users);
            })
            .catch((err) => next(err));
    })
    .patch((req, res, next) => {
        Users.findOneAndUpdate({ _id: req.body.id }, { $set: req.body }, { new: true })
            .then((users) => {
                console.log('Users Updated', users);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(users);
            })
            .catch((err) => next(err));
    })
    .delete((req, res, next) => {
        Users.deleteMany({})
            .then((response) => {
                console.log('All Users Deleted');
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(response);
            })
            .catch((err) => next(err));
    });

module.exports = usersRouter;
