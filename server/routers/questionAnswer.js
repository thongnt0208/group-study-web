const express = require('express');
const bodyParser = require('body-parser');

// Mongoose
const mongoose = require('mongoose');
const dbUrl = 'mongodb://localhost:27017/GroupStudy';
const connect = mongoose.connect(dbUrl);
const QuestionAnswer = require('../models/questionAnswer');

// Create router
const questionAnswerRouter = express.Router();

questionAnswerRouter.use(bodyParser.json());

// Configure routes
questionAnswerRouter.route('/')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        next();
    })
    .get((req, res, next) => {
        connect.then((data) => {
            console.log('Connected to server');
            if (data) {
                QuestionAnswer.find({}).then((questionAnswer) => {
                    console.log("Finding");
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(questionAnswer);
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
        QuestionAnswer.create(req.body)
            .then((questionAnswer) => {
                console.log('QuestionAnswer Created', questionAnswer);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(questionAnswer);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .put((req, res, next) => {
        QuestionAnswer.findOneAndUpdate({ _id: req.body.id }, req.body, { new: true })
            .then((questionAnswer) => {
                console.log('QuestionAnswer Updated', questionAnswer);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(questionAnswer);
            })
            .catch((err) => next(err));
    })
    .patch((req, res, next) => {
        QuestionAnswer.findOneAndUpdate({ _id: req.body.id }, { $set: req.body }, { new: true })
            .then((questionAnswer) => {
                console.log('QuestionAnswer Updated', questionAnswer);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(questionAnswer);
            })
            .catch((err) => next(err));
    })
    .delete((req, res, next) => {
        QuestionAnswer.deleteMany({})
            .then((response) => {
                console.log('All QuestionAnswers Deleted');
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(response);
            })
            .catch((err) => next(err));
    });

module.exports = questionAnswerRouter;
