require('dotenv').config();
const dbUrl = process.env.DB_CONNECTION_STRING;
const express = require('express');
const bodyParser = require('body-parser');

// Mongoose
const mongoose = require('mongoose');
const connect = mongoose.connect(dbUrl);
const Discussion = require('../models/discussion');
const Group = require('../models/groups');
// Create router
const discussionRouter = express.Router();

discussionRouter.use(bodyParser.json());

// Configure routes
// discussionRouter
//    .route('/')
//    .all((req, res, next) => {
//       res.statusCode = 200;
//       res.setHeader('Content-Type', 'text/plain');
//       next();
//    })
//    .get((req, res, next) => {
//       connect.then((data) => {
//          console.log('Connected to server');
//          if (data) {
//             Discussion.find({}).then((discussion) => {
//                console.log('Finding');
//                res.statusCode = 200;
//                res.setHeader('Content-Type', 'application/json');
//                res.json(discussion);
//                res.end();
//                console.log('Found successfully');
//             });
//          } else {
//             console.log('No data');
//             res.status(500).json('fail');
//          }
//       });
//    })
//    .post((req, res, next) => {
//       console.log(req.body);
//       Discussion.create(req.body)
//          .then(
//             (discussion) => {
//                console.log('Discussion Created ', discussion);
//                res.statusCode = 200;
//                res.setHeader('Content-Type', 'application/json');
//                res.json(discussion);
//             },
//             (err) => next(err)
//          )
//          .catch((err) => next(err));
//    })
//    .put((req, res, next) => {
//       Discussion.findOneAndUpdate({ _id: req.body.id }, req.body, { new: true })
//          .then((discussion) => {
//             console.log('Discussion Updated', discussion);
//             res.statusCode = 200;
//             res.setHeader('Content-Type', 'application/json');
//             res.json(discussion);
//          })
//          .catch((err) => next(err));
//    })
//    .patch((req, res, next) => {
//       Discussion.findOneAndUpdate(
//          { _id: req.body.id },
//          { $set: req.body },
//          { new: true }
//       )
//          .then((discussion) => {
//             console.log('Discussion Updated', discussion);
//             res.statusCode = 200;
//             res.setHeader('Content-Type', 'application/json');
//             res.json(discussion);
//          })
//          .catch((err) => next(err));
//    })
//    .delete((req, res, next) => {
//       Discussion.deleteMany({})
//          .then((response) => {
//             console.log('All Discussions Deleted');
//             res.statusCode = 200;
//             res.setHeader('Content-Type', 'application/json');
//             res.json(response);
//          })
//          .catch((err) => next(err));
//    });

// discussionRouter
//    .route('/:discussionId')
//    .all((req, res, next) => {
//       res.statusCode = 200;
//       res.setHeader('Content-Type', 'text/plain');
//       next();
//    })
//    .get((req, res, next) => {
//       Discussion.findById(req.params.discussionId)
//          .then((discussion) => {
//             res.statusCode = 200;
//             res.setHeader('Content-Type', 'application/json');
//             res.json(discussion);
//          })
//          .catch((err) => next(err));
//    })
//    .post((req, res, next) => {
//       Discussion.create(req.body)
//          .then((discussion) => {
//             console.log('Discussion Created', discussion);
//             res.statusCode = 200;
//             res.setHeader('Content-Type', 'application/json');
//             res.json(discussion);
//          })
//          .catch((err) => next(err));
//    })
//    .put((req, res, next) => {
//       Discussion.findOneAndUpdate(
//          { _id: req.params.discussionId },
//          { $set: req.body },
//          { new: true }
//       )
//          .then((discussion) => {
//             res.statusCode = 200;
//             res.setHeader('Content-Type', 'application/json');
//             res.json(discussion);
//          })
//          .catch((err) => next(err));
//    })
//    .delete((req, res, next) => {
//       Discussion.findByIdAndDelete(req.params.discussionId)
//          .then((response) => {
//             res.statusCode = 200;
//             res.setHeader('Content-Type', 'application/json');
//             res.json(response);
//          })
//          .catch((err) => next(err));
//    });

// ADD DISCUSSION TO MULTIPLE GROUPS
// discussionRouter.route('/add-to-groups').post((req, res, next) => {
//    const { discussionId, groupIds } = req.body;

//    // Find the discussion by its ID
//    Discussion.findById(discussionId)
//       .then((discussion) => {
//          if (!discussion) {
//             return res.status(404).json({ error: 'Discussion not found' });
//          }

//          // Update each group with the discussion ObjectId
//          const updatePromises = groupIds.map((groupId) => {
//             return Groups.findById(groupId)
//                .then((group) => {
//                   if (!group) {
//                      console.log(`Group not found for ID: ${groupId}`);
//                      return;
//                   }

//                   group.discussions.push(discussion._id);
//                   return group.save();
//                })
//                .catch((err) => {
//                   console.error(
//                      `Failed to update Group with ID: ${groupId}`,
//                      err
//                   );
//                });
//          });

//          // Wait for all group updates to complete
//          Promise.all(updatePromises)
//             .then(() => {
//                console.log('Discussion added to multiple groups');
//                res.status(200).json({
//                   message: 'Discussion added to multiple groups',
//                });
//             })
//             .catch((err) => {
//                console.error(
//                   'Failed to add Discussion to multiple groups:',
//                   err
//                );
//                res.status(500).json({
//                   error: 'Failed to add Discussion to multiple groups',
//                });
//             });
//       })
//       .catch((err) => {
//          console.error('Failed to find Discussion:', err);
//          res.status(500).json({ error: 'Failed to find Discussion' });
//       });
// });

discussionRouter
   .route('/')
   .all((req, res, next) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/plain');
      next();
   })
   // VIEW ALL DISCUSSION
   .get((req, res, next) => {
      connect.then((data) => {
         console.log('Connected to server');
         if (data) {
            Discussion.find({}).then((discussion) => {
               console.log('Finding');
               res.statusCode = 200;
               res.setHeader('Content-Type', 'application/json');
               res.json(discussion);
               res.end();
               console.log('Found successfully');
            });
         } else {
            console.log('No data');
            res.status(500).json('fail');
         }
      });
   })
   // CREATE A DISCUSSION
   .post((req, res, next) => {
      Discussion.create(req.body)
         .then((discussion) => {
            console.log('Discussion Created', discussion);

            // Update the discussion array in the groups collection
            const groupId = req.body.groupId; // Assuming you pass the groupId in the request body
            return Group.findByIdAndUpdate(groupId, {
               $push: { discussions: discussion._id },
            }).then(() => discussion);
         })
         .then((discussion) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(discussion);
         })
         .catch((err) => next(err));
   })
   //DELETE ALL DISCUSSION
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

discussionRouter
   .route('/:discussionId')
   .all((req, res, next) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/plain');
      next();
   })
   //VIEW DISCUSSION BY ID
   .get((req, res, next) => {
      Discussion.findById(req.params.discussionId)
         .then((discussion) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(discussion);
         })
         .catch((err) => next(err));
   })
   // EDIT DISCUSSION BY ID
   .put((req, res, next) => {
      Discussion.findByIdAndUpdate(
         req.params.discussionId,
         { $set: req.body },
         { new: true }
      )
         .then((discussion) => {
            console.log('Discussion Updated', discussion);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(discussion);
         })
         .catch((err) => next(err));
   })
   //DELETE DISCUSSION BY ID
   .delete((req, res, next) => {
      Discussion.findByIdAndDelete(req.params.discussionId)
         .then((deletedDiscussion) => {
            // Update the discussion array in the group collection
            return Group.updateOne(
               { discussions: req.params.discussionId },
               { $pull: { discussions: req.params.discussionId } }
            ).then(() => deletedDiscussion);
         })
         .then((deletedDiscussion) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(deletedDiscussion);
         })
         .catch((err) => next(err));
   });
module.exports = discussionRouter;
