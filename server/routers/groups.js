require('dotenv').config();
const dbUrl = process.env.DB_CONNECTION_STRING;
const express = require('express'),
   bodyParser = require('body-parser');

//mongoose
const mongoose = require('mongoose');
const connect = mongoose.connect(dbUrl);
const Groups = require('../models/groups');
const User = require('../models/users');
const Discussion = require('../models/discussion');

//create router
const groupsRouter = express.Router();

groupsRouter.use(bodyParser.json());

//------------------- Config routes ---------------------

//VIEW A GROUP DETAIL API
groupsRouter
   .route('/')
   .all((req, res, next) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/plain');
      next();
   })
   .get((req, res, next) => {
      const groupId = req.query.groupId;

      //View all groups
      if (!groupId) {
         connect.then((data) => {
            if (data) {
               Groups.find({}).then((group) => {
                  res.statusCode = 200;
                  res.setHeader('Content-Type', 'application/json');
                  res.json(group);
                  res.end();
                  console.log('Finded Groups List successful');
               });
            } else {
               res.status(500).json('fail');
            }
         });
      }
      //View A Group detail
      if (groupId) {
         connect.then((data) => {
            if (data) {
               // Find a group by Id with status === true
               Groups.findById(groupId)
                  .then((group) => {
                     console.log('Finding');
                     res.statusCode = 200;
                     res.setHeader('Content-Type', 'application/json');
                     res.json(group);
                     res.end();
                     console.log('Found a group successfully');
                  })
                  .catch((err) => next(err));
            } else {
               console.log('No data');
               res.status(500).json('fail');
            }
         });
      }
   })
   // EDIT A GROUP
   .patch((req, res, next) => {
      const groupId = req.query.groupId;
      const updatedData = req.body;
      Groups.findByIdAndUpdate(groupId, updatedData, { new: true })
         .then((group) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(group);
            res.end();
         })
         .catch((err) => {
            res.statusCode = 500;
            res.json({ error: err.message });
         });
   })
   //CREATE GROUP
   .post((req, res, next) => {
      console.log(req.body);
      Groups.create(req.body)
         .then((group) => {
            console.log('Group Created ', group);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(group);
         })
         .catch((err) => {
            res.status(500).json({ err: 'Failed to create new group!' });
         });
   })
   // REMOVE A GROUP
   .delete((req, res, next) => {
      const groupId = req.query.groupId;
      const updatedData = req.body;
      // change status everywhen delete
      Groups.findByIdAndUpdate(groupId, { $set: updatedData }, { new: true })
         .then((group) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(group);
            res.end();
         })
         .catch((err) => {
            res.statusCode = 500;
            res.json({ error: err.message });
         });
   });

//------------------ Group by ID ----------------------

// Remove a member by id (Remove Member from Group)
groupsRouter
   .route('/:id/:memberId')
   .all((req, res, next) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/plain');
      next();
   })
   .delete((req, res, next) => {
      const groupId = req.params.id;
      const memberId = req.params.memberId;

      // Find the group by the member's userId
      Groups.findById(groupId)
         .then((group) => {
            // Check if the group exists
            if (!group) {
               return res.status(404).send('Group not found');
            }

            // Find the index of the member to remove
            const memberIndex = group.members.findIndex(
               (member) => member.userId.toString() === memberId
            );

            // Check if the member exists in the group
            if (memberIndex === -1) {
               return res.status(404).send('Member not found in the group');
            }

            // Remove the member from the group
            group.members.splice(memberIndex, 1);

            // Save the updated group
            return group.save();
         })
         .then(() => {
            res.send(
               `Removed member with ID ${memberId} from group with ID ${groupId}`
            );
         })
         .catch((error) => {
            console.error(error);
            res.status(500).send('Internal Server Error');
         });
   });

// Group by category

//INVITE A MEMBER TO A GROUP API
groupsRouter
   .route('/invite-member')
   .all((req, res, next) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/plain');
      next();
   })
   .post(async (req, res) => {
      try {
         const groupId = req.query.groupId;
         const { userId, name } = req.body;

         // Find the group by ID
         const group = await Groups.findById(groupId);

         if (!group) {
            return res.status(404).json({ error: 'Group not found' });
         }

         // Find the user by ID
         const user = await User.findById(userId);

         if (!user) {
            return res.status(404).json({ error: 'User not found' });
         }

         // Add the member to the group
         group.members.push({ userId, name });
         await group.save();

         // Add the joined group to the user's joinedGroups array
         user.joinedGroups.push(groupId);
         await user.save();

         res.status(200).json({ message: 'Member invited successfully' });
      } catch (error) {
         res.status(500).json({ error: 'Failed to invite member' });
      }
   });

// ADD DISCUSSION TO GROUP
groupsRouter.route('/add-discussion/:groupId').post((req, res, next) => {
   const groupId = req.params.groupId;
   const discussionData = req.body;

   Discussion.create(discussionData)
      .then((discussion) => {
         // Check if the discussion was created successfully
         if (!discussion) {
            return res
               .status(500)
               .json({ error: 'Failed to create discussion' });
         }

         Groups.findById(groupId)
            .then((group) => {
               // Check if the group exists
               if (!group) {
                  return res.status(404).json({ error: 'Group not found' });
               }

               // Add the discussion's objectId to the group's discussions array
               group.discussions.push(discussion._id);
               return group.save();
            })
            .then(() => {
               res.statusCode = 200;
               res.setHeader('Content-Type', 'application/json');
               res.json({
                  success: true,
                  message: 'Discussion added to group successfully',
               });
            })
            .catch((err) => {
               res.status(500).json({
                  error: 'Failed to add discussion to group',
               });
            });
      })
      .catch((err) => {
         res.status(500).json({ error: 'Failed to create discussion' });
      });
});

module.exports = groupsRouter;
