require('dotenv').config();
const dbUrl = process.env.DB_CONNECTION_STRING;
const express = require('express'),
    bodyParser = require('body-parser')

//mongoose
const mongoose = require('mongoose');
const connect = mongoose.connect(dbUrl);
const Groups = require('../models/groups');

//create router
const groupsRouter = express.Router();


groupsRouter.use(bodyParser.json());

//config routes
groupsRouter.route('/')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        next();
    })
    .get((req, res, next) => {
        connect.then((data) => {
            console.log('Connected to server');
            if (data) {
                Groups.find({}).then((group) => {
                    console.log("Finding");
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(group);
                    res.end();
                    console.log("Finded successful");
                })
            } else {
                console.log("No data");
                res.status(500).json("fail");
            }
        })
    })
    .post((req, res, next) => {
        console.log(req.body);
        Groups.create(req.body)
            .then((group) => {
                console.log('Promotion Created ', group);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(group);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .patch((req, res, next) => {
        Groups.findOneAndUpdate({ _id: req.body.id }, { $set: req.body }, { new: true })
            .then((group) => {
                console.log('Promotion Updated ', group);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(group);
            })
            .catch((err) => next(err));
    })
    .delete((req, res, next) => {
        Groups.deleteMany({})
            .then((response) => {
                console.log('All Promotions Deleted');
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(response);
            })
            .catch((err) => next(err));
    });



// Group by ID
groupsRouter.route('/:id')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        next();
    })
    .get((req, res, next) => {
        const groupId = req.params.id;
        connect.then((data) => {
            console.log('Connected to server');
            if (data) {
                Groups.findById(groupId).then((group) => {
                    console.log("Finding");
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(group);
                    res.end();
                    console.log("Found a group successfully");
                }).catch((err) => next(err));
            } else {
                console.log("No data");
                res.status(500).json("fail");
            }
        });
    })
    .patch((req, res, next) => {
        const groupId = req.params.id;
        const updatedData = req.body;

        Groups.findByIdAndUpdate(groupId, { $set: updatedData }, { new: true })
            .then((group) => {
                console.log('Group updated:', group);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(group);
                res.end();
                console.log("Edited a group successfully");
            })
            .catch((err) => next(err));
    })
    .delete((req, res, next) => {
        const groupId = req.params.id;

        Groups.findByIdAndRemove(groupId)
            .then((response) => {
                console.log('Group deleted');
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(response);
                res.end();
                console.log("Deleted a group successfully");
            })
            .catch((err) => next(err));
    });




module.exports = groupsRouter; 