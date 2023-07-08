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

// // Configure routes
// questionAnswerRouter
//    .route('/')
//    .all((req, res, next) => {
//       res.statusCode = 200;
//       res.setHeader('Content-Type', 'text/plain');
//       next();
//    })
//    //VIEW ALL QUESTIONS
//    .get((req, res, next) => {
//       connect.then((data) => {
//          console.log('Connected to server');
//          if (data) {
//             QuestionAnswer.find({}).then((questionAnswer) => {
//                console.log('Finding');
//                res.statusCode = 200;
//                res.setHeader('Content-Type', 'application/json');
//                res.json(questionAnswer);
//                res.end();
//                console.log('Found successfully');
//             });
//          } else {
//             console.log('No data');
//             res.status(500).json('fail');
//          }
//       });
//    })
//    //CREATE NEW QUESTION
//    .post((req, res, next) => {})
//    .put((req, res, next) => {
//       QuestionAnswer.findOneAndUpdate({ _id: req.body.id }, req.body, {
//          new: true,
//       })
//          .then((questionAnswer) => {
//             console.log('QuestionAnswer Updated', questionAnswer);
//             res.statusCode = 200;
//             res.setHeader('Content-Type', 'application/json');
//             res.json(questionAnswer);
//          })
//          .catch((err) => next(err));
//    })
//    .patch((req, res, next) => {
//       QuestionAnswer.findOneAndUpdate(
//          { _id: req.body.id },
//          { $set: req.body },
//          { new: true }
//       )
//          .then((questionAnswer) => {
//             console.log('QuestionAnswer Updated', questionAnswer);
//             res.statusCode = 200;
//             res.setHeader('Content-Type', 'application/json');
//             res.json(questionAnswer);
//          })
//          .catch((err) => next(err));
//    })
//    //delete all questions
//    .delete((req, res, next) => {
//       QuestionAnswer.deleteMany({})
//          .then((response) => {
//             console.log('All QuestionAnswers Deleted');
//             res.statusCode = 200;
//             res.setHeader('Content-Type', 'application/json');
//             res.json(response);
//          })
//          .catch((err) => next(err));
//    });

// questionAnswerRouter
//    .route('/questions/:questionId')
//    .all((req, res, next) => {
//       res.statusCode = 200;
//       res.setHeader('Content-Type', 'text/plain');
//       next();
//    })
//    // VIEW QUESTION BY ID
//    .get((req, res, next) => {
//       connect.then(() => {
//          console.log('Connected to server');
//          QuestionAnswer.findById(req.params.questionId)
//             .then((questionAnswer) => {
//                console.log('Finding question');
//                res.statusCode = 200;
//                res.setHeader('Content-Type', 'application/json');
//                res.json(questionAnswer);
//                console.log('Found question successfully');
//             })
//             .catch((err) => next(err));
//       });
//    })
//    //UPDATE QUESTION BY ID
//    .put((req, res, next) => {
//       QuestionAnswer.findByIdAndUpdate(
//          req.params.questionId,
//          { $set: req.body },
//          { new: true }
//       )
//          .then((questionAnswer) => {
//             console.log('QuestionAnswer Updated', questionAnswer);
//             res.statusCode = 200;
//             res.setHeader('Content-Type', 'application/json');
//             res.json(questionAnswer);
//          })
//          .catch((err) => next(err));
//    })
//    //DELETE QUESTION BY ID
//    .delete((req, res, next) => {
//       QuestionAnswer.findByIdAndDelete(req.params.questionId)
//          .then((response) => {
//             console.log('QuestionAnswer Deleted');
//             res.statusCode = 200;
//             res.setHeader('Content-Type', 'application/json');
//             res.json(response);
//          })
//          .catch((err) => next(err));
//    });

// questionAnswerRouter
//    .route('/questions/:questionId/answers')
//    .all((req, res, next) => {
//       res.statusCode = 200;
//       res.setHeader('Content-Type', 'text/plain');
//       next();
//    })
//    //add answer to question
//    .post((req, res, next) => {
//       QuestionAnswer.findById(req.params.questionId)
//          .then((questionAnswer) => {
//             if (questionAnswer) {
//                questionAnswer.answers.push(req.body);
//                questionAnswer
//                   .save()
//                   .then((updatedQuestionAnswer) => {
//                      console.log(
//                         'Answer Added to Question',
//                         updatedQuestionAnswer
//                      );
//                      res.statusCode = 200;
//                      res.setHeader('Content-Type', 'application/json');
//                      res.json(updatedQuestionAnswer);
//                   })
//                   .catch((err) => next(err));
//             } else {
//                res.status(404).json('Question not found');
//             }
//          })
//          .catch((err) => next(err));
//    });

// questionAnswerRouter
//    .route('/questions/:questionId/answers/:answerId')
//    .all((req, res, next) => {
//       res.statusCode = 200;
//       res.setHeader('Content-Type', 'text/plain');
//       next();
//    })
//    .put((req, res, next) => {
//       QuestionAnswer.findOneAndUpdate(
//          {
//             _id: req.params.questionId,
//             'answers._id': req.params.answerId,
//          },
//          { $set: { 'answers.$': req.body } },
//          { new: true }
//       )
//          .then((questionAnswer) => {
//             console.log('Answer Updated', questionAnswer);
//             res.statusCode = 200;
//             res.setHeader('Content-Type', 'application/json');
//             res.json(questionAnswer);
//          })
//          .catch((err) => next(err));
//    })
//    .delete((req, res, next) => {
//       QuestionAnswer.findByIdAndUpdate(
//          req.params.questionId,
//          { $pull: { answers: { _id: req.params.answerId } } },
//          { new: true }
//       )
//          .then((questionAnswer) => {
//             console.log('Answer Removed from Question', questionAnswer);
//             res.statusCode = 200;
//             res.setHeader('Content-Type', 'application/json');
//             res.json(questionAnswer);
//          })
//          .catch((err) => next(err));
//    });

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
   .route('/:questionId')
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

module.exports = questionAnswerRouter;
