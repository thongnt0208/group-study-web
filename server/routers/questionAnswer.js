require('dotenv').config();
const dbUrl = process.env.DB_CONNECTION_STRING;
const express = require('express');
const bodyParser = require('body-parser');

// Mongoose
const mongoose = require('mongoose');
const connect = mongoose.connect(dbUrl);
const QuestionAnswer = require('../models/questionAnswer');
const Discussion = require('../models/discussion');
const Group = require('../models/groups');

// Create router
const questionAnswerRouter = express.Router();

questionAnswerRouter.use(bodyParser.json());

//==============================================================================
//===============================QUESTIONS========================================
//==============================================================================
questionAnswerRouter
   .route('/')
   .all((req, res, next) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/plain');
      next();
   })
   // VIEW ALL QUESTIONS
   .get((req, res, next) => {
      QuestionAnswer.find({})
         .then((questionAnswers) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(questionAnswers);
         })
         .catch((err) => next(err));
   })
   //ADD NEW QUESTION
   .post((req, res, next) => {
      QuestionAnswer.create(req.body)
         .then((questionAnswer) => {
            // Update the questionAnswer ID in the discussion
            Discussion.findByIdAndUpdate(
               req.body.discussionId,
               { $push: { qAndAs: questionAnswer._id } },
               { new: true }
            )
               .then(() => {
                  res.statusCode = 200;
                  res.setHeader('Content-Type', 'application/json');
                  res.json(questionAnswer);
               })
               .catch((err) => next(err));
         })
         .catch((err) => next(err));
   })
   //DELETE ALL QUESTIONS
   .delete((req, res, next) => {
      QuestionAnswer.deleteMany({})
         .then(() => {
            // Update the questionAnswer references in discussions and groups
            Discussion.updateMany({}, { $set: { qAndAs: [] } })
               .then(() => {
                  Group.updateMany({}, { $set: { discussions: [] } })
                     .then(() => {
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        res.json({
                           message: 'All questions deleted successfully.',
                        });
                     })
                     .catch((err) => next(err));
               })
               .catch((err) => next(err));
         })
         .catch((err) => next(err));
   });

questionAnswerRouter
   .route('/questions/:questionId')
   .all((req, res, next) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/plain');
      next();
   })
   //VIEW QUESTION BY ID
   .get((req, res, next) => {
      QuestionAnswer.findById(req.params.questionId)
         .then((questionAnswer) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(questionAnswer);
         })
         .catch((err) => next(err));
   })
   //EDIT QUESTION BY ID
   .put((req, res, next) => {
      QuestionAnswer.findByIdAndUpdate(
         req.params.questionId,
         { $set: req.body },
         { new: true }
      )
         .then((questionAnswer) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(questionAnswer);
         })
         .catch((err) => next(err));
   })
   //DELETE QUESTION BY ID
   .delete((req, res, next) => {
      QuestionAnswer.findByIdAndDelete(req.params.questionId)
         .then((questionAnswer) => {
            // Update the questionAnswer references in discussions and groups
            Discussion.updateMany(
               { qAndAs: req.params.questionId },
               { $pull: { qAndAs: req.params.questionId } }
            )
               .then(() => {
                  Group.updateMany(
                     { discussions: req.params.questionId },
                     { $pull: { discussions: req.params.questionId } }
                  )
                     .then(() => {
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        res.json(questionAnswer);
                     })
                     .catch((err) => next(err));
               })
               .catch((err) => next(err));
         })
         .catch((err) => next(err));
   });

//==============================================================================
//===============================ANSWERS========================================
//==============================================================================
questionAnswerRouter
   .route('/questions/:questionId/answers')
   .all((req, res, next) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/plain');
      next();
   })
   //VIEW ALL ANSWERS
   .get((req, res, next) => {
      QuestionAnswer.findById(req.params.questionId)
         .then((questionAnswer) => {
            console.log('questionAnswer:', questionAnswer);
            if (questionAnswer) {
               res.statusCode = 200;
               res.setHeader('Content-Type', 'application/json');
               res.json(questionAnswer.answers);
            } else {
               const err = new Error('Question not found');
               err.status = 404;
               return next(err);
            }
         })
         .catch((err) => {
            console.log('Error:', err);
            next(err);
         });
   })
   //ADD NEW ANSWER TO QUESTION
   .post((req, res, next) => {
      const newAnswer = req.body;
      QuestionAnswer.findByIdAndUpdate(
         req.params.questionId,
         { $push: { answers: newAnswer } },
         { new: true }
      )
         .then((questionAnswer) => {
            if (questionAnswer) {
               res.statusCode = 200;
               res.setHeader('Content-Type', 'application/json');
               res.json(questionAnswer.answers);
            } else {
               const err = new Error('Question not found');
               err.status = 404;
               return next(err);
            }
         })
         .catch((err) => next(err));
   });

questionAnswerRouter
   .route('/questions/:questionId/answers/:answerId')
   .all((req, res, next) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/plain');
      next();
   })
   //VIEW ANSWER BY ID
   .get((req, res, next) => {
      const { questionId, answerId } = req.params;
      QuestionAnswer.findOne(
         { _id: questionId, 'answers._id': answerId },
         { 'answers.$': 1 }
      )
         .then((questionAnswer) => {
            if (questionAnswer && questionAnswer.answers.length > 0) {
               res.statusCode = 200;
               res.setHeader('Content-Type', 'application/json');
               res.json(questionAnswer.answers[0]);
            } else {
               const err = new Error('Answer not found');
               err.status = 404;
               return next(err);
            }
         })
         .catch((err) => next(err));
   })
   //EDIT ANSWER BY ID
   .put((req, res, next) => {
      const { questionId, answerId } = req.params;
      QuestionAnswer.findOneAndUpdate(
         { _id: questionId, 'answers._id': answerId },
         { $set: { 'answers.$': req.body } },
         { new: true }
      )
         .then((questionAnswer) => {
            if (questionAnswer) {
               res.statusCode = 200;
               res.setHeader('Content-Type', 'application/json');
               res.json(questionAnswer.answers);
            } else {
               const err = new Error('Question or answer not found');
               err.status = 404;
               return next(err);
            }
         })
         .catch((err) => next(err));
   })
   //DELETE ANSWER BY ID
   .delete((req, res, next) => {
      const { questionId, answerId } = req.params;
      QuestionAnswer.findOneAndUpdate(
         { _id: questionId },
         { $pull: { answers: { _id: answerId } } },
         { new: true }
      )
         .then((questionAnswer) => {
            if (questionAnswer) {
               res.statusCode = 200;
               res.setHeader('Content-Type', 'application/json');
               res.json(questionAnswer.answers);
            } else {
               const err = new Error('Question or answer not found');
               err.status = 404;
               return next(err);
            }
         })
         .catch((err) => next(err));
   });

module.exports = questionAnswerRouter;
