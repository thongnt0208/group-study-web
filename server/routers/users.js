require("dotenv").config();
const dbUrl = process.env.DB_CONNECTION_STRING;
const express = require("express");
const bodyParser = require("body-parser");
const multer = require('multer');
const upload = multer();

// Mongoose
const mongoose = require("mongoose");
const connect = mongoose.connect(dbUrl);
const Users = require("../models/users");

// Create router
const usersRouter = express.Router();

usersRouter.use(bodyParser.json());

// Configure routes

//REGISTER API
usersRouter
  .route("/register")
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    console.log(dbUrl);
    next();
  })
  .post((req, res, next) => {
    const { email } = req.body;
    Users.findOne({ email: email }) // Check if the email already exists in the database
      .then((existingUser) => {
        if (existingUser) {
          res.status(409).json({ error: "Email already exists!" });
        } else {
          Users.create(req.body)
            .then((user) => {
              console.log("Create: ", user);
              res.status(200);
              res.setHeader("Content-Type", "application/json");
              res.json(user);
            })
            .catch((err) => {
              res.status(500).json({ error: "Failed to create new document!" });
            });
        }
      })
      .catch((err) => {
        res.status(500).json({ error: "Failed to check for duplicate email!" });
      });
  });
//NOT VALIDATE YET
// .post((req, res, next) => {
//   Users.create(req.body)
//     .then((user) => {
//       console.log("Create: ", user);
//       res.status(200);
//       res.setHeader("Content-Type", "application/json");
//       res.json(user);
//     })
//     .catch((err) => {
//       res.status(500).json({ error: "Failed to create new document!" });
//     });
// });

//VIEW PROFILE API
usersRouter
  .route("/view-profile")
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    next();
  })
  .get((req, res, next) => {
    const profileId = req.query.profileId;
    connect.then((data) => {
      if (data) {
        // Find a group by Id with status === true
        Users.findById(profileId)
          .then((profile) => {
            console.log("Finding", profileId);
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json(profile);
            res.end();
            console.log("Found a ", profile, " successfully");
          })
          .catch((err) => next(err));
      } else {
        console.log("No data");
        res.status(500).json("fail");
      }
    });
  });

//EDIT PROFILE API
usersRouter
  .route("/edit-profile")
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    console.log(dbUrl);
    next();
  })
  .patch(upload.single('avatar'), (req, res, next) => {
    const profileId = req.query.profileId;
    const data = req.body;
    const updatedData = {
      id: req.body.profileId,
      name: req.body.name,
      email: req.body.email,
      avatar: req.files ? req.files.avatar : null,
    };
    Users.findOne({ email: updatedData.email })
      .then((currentUser) => {
        if (currentUser && currentUser.id !== updatedData.id) {
          res.json({ error: "Email already exists!" });
          res.end();
        } else {
          updateUserProfile();
        }
      })
      .catch((err) => {
        console.log(data);
        res.json({ error: err});
      });

    function updateUserProfile() {
      Users.findByIdAndUpdate(profileId, updatedData, { new: true })
        .then((users) => {
          console.log("User Updated", users);
          res.status(200).json({ message: "Update successfully!", users });
          res.end();
        })
        .catch((err) => {
          res.statusCode = 500;
          res.json({ error: err.message });
        });
    }
  });

//NOT VALIDATE YET
// .patch((req, res, next) => {
//   const profileId = req.query.profileId;
//   const updatedData = req.body;
//   console.log(id);
//   Users.findByIdAndUpdate(profileId, updatedData, { new: true })
//     .then((users) => {
//       console.log("Users Updated", updatedData);
//       res.statusCode = 200;
//       res.setHeader("Content-Type", "application/json");
//       res.json(users);
//     })
//     .catch((err) => {
//       res.statusCode = 500;
//       res.json({ error: err.message });
//     });
// });

//REMOVE PROFILE API
usersRouter
  .route("/remove-profile")
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    console.log(dbUrl);
    next();
  })
  .patch((req, res, next) => {
    const profileId = req.query.profileId;
    const updatedData = req.body;
    Users.findByIdAndUpdate(profileId, updatedData, { new: true })
      .then((users) => {
        console.log("Users Updated", users);
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(users);
      })
      .catch((err) => next(err));
  });

module.exports = usersRouter;
