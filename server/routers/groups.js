require("dotenv").config();
const dbUrl = process.env.DB_CONNECTION_STRING;
const express = require("express"),
  bodyParser = require("body-parser");

//mongoose
const mongoose = require("mongoose");
const connect = mongoose.connect(dbUrl);
const Groups = require("../models/groups");

//create router
const groupsRouter = express.Router();

groupsRouter.use(bodyParser.json());

//config routes

// (View Groups List)
groupsRouter
  .route("/")
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    next();
  })
  .get((req, res, next) => {
    connect.then((data) => {
      console.log("Connected to server");
      if (data) {
        Groups.find({}).then((group) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(group);
          res.end();
          console.log("Finded Groups List successful");
        });
      } else {
        res.status(500).json("fail");
      }
    });
  })
  .post((req, res, next) => {
    console.log(req.body);
    Groups.create(req.body)
      .then((group) => {
        console.log("Group Created ", group);
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(group);
      })
      .catch((err) => {
        res.status(500).json({ err: "Failed to create new group!" });
      });
  })
  .patch((req, res, next) => {
    Groups.findOneAndUpdate(
      { _id: req.body.id },
      { $set: req.body },
      { new: true }
    )
      .then((group) => {
        console.log("Promotion Updated ", group);
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(group);
      })
      .catch((err) => next(err));
  });

// Group by ID
groupsRouter
  .route("/:id")
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    next();
  })
  .get((req, res, next) => {
    const groupId = req.params.id;
    connect.then((data) => {
      console.log("Connected to server");
      if (data) {
        // Find a group by Id with status === true
        Groups.findById(groupId)
          .then((group) => {
            console.log("Finding");
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json(group);
            res.end();
            console.log("Found a group successfully");
          })
          .catch((err) => next(err));
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
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(group);
        res.end();
      })
      .catch((err) => next(err));
  })
  .delete((req, res, next) => {
    const groupId = req.params.id;

    Groups.findByIdAndRemove(groupId)
      .then((response) => {
        console.log("Group deleted");
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(response);
        res.end();
        console.log("Deleted a group successfully");
      })
      .catch((err) => next(err));
  });

// Remove a member by id (Remove Member from Group)
groupsRouter
  .route("/:id/:memberId")
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
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
          return res.status(404).send("Group not found");
        }

        // Find the index of the member to remove
        const memberIndex = group.members.findIndex(
          (member) => member.userId.toString() === memberId
        );

        // Check if the member exists in the group
        if (memberIndex === -1) {
          return res.status(404).send("Member not found in the group");
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
        res.status(500).send("Internal Server Error");
      });
  });

// Group by category

module.exports = groupsRouter;
