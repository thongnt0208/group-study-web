require('dotenv').config();
const dbUrl = process.env.DB_CONNECTION_STRING;
const express = require('express');
const bodyParser = require('body-parser');

// Mongoose
const mongoose = require('mongoose');
const connect = mongoose.connect(dbUrl);
const GroupCategory = require('../models/groupCategory');

// Create router
const groupCategoryRouter = express.Router();

groupCategoryRouter.use(bodyParser.json());

// Configure routes
groupCategoryRouter.route('/')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        next();
    })
    .get((req, res, next) => {
        connect.then((data) => {
            console.log('Connected to server');
            if (data) {
                GroupCategory.find({}).then((groupCategory) => {
                    console.log("Finding");
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(groupCategory);
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
        GroupCategory.create(req.body)
            .then((groupCategory) => {
                console.log('GroupCategory Created', groupCategory);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(groupCategory);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .put((req, res, next) => {
        GroupCategory.findOneAndUpdate({ _id: req.body.id }, req.body, { new: true })
            .then((groupCategory) => {
                console.log('GroupCategory Updated', groupCategory);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(groupCategory);
            })
            .catch((err) => next(err));
    })
    .patch((req, res, next) => {
        GroupCategory.findOneAndUpdate({ _id: req.body.id }, { $set: req.body }, { new: true })
            .then((groupCategory) => {
                console.log('GroupCategory Updated', groupCategory);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(groupCategory);
            })
            .catch((err) => next(err));
    })
    .delete((req, res, next) => {
        GroupCategory.deleteMany({})
            .then((response) => {
                console.log('All GroupCategories Deleted');
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(response);
            })
            .catch((err) => next(err));
    });

module.exports = groupCategoryRouter;
