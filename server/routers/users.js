require("dotenv").config();
const dbUrl = process.env.DB_CONNECTION_STRING;
const express = require("express");
const bodyParser = require("body-parser");

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
  })
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
    console.log(dbUrl);
    next();
  })
  .get((req, res, next) => {
    const profileId = req.query.profileId;
    Users.findById(profileId)
      .then((user) => {
        if (user) {
          res.statusCode = 200;
          res.json(user);
        } else {
          res.statusCode = 500;
          res.json({ message: "User not found" });
        }
      })
      .catch((err) => {
        res.statusCode = 500;
        res.json({ error: err.message });
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
  .patch((req, res, next) => {
    const profileId = req.query.profileId;
    const updatedData = req.body;
    console.log(id);
    Users.findByIdAndUpdate(profileId, updatedData, { new: true })
      .then((users) => {
        console.log("Users Updated", updatedData);
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(users);
      })
      .catch((err) => {
        res.statusCode = 500;
        res.json({ error: err.message });
      });
  });

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

//DRAFT
// .get((req, res, next) => {
//     connect.then((data) => {
//         console.log('Connected to server');
//         if (data) {
//             Users.find({}).then((users) => {
//                 console.log("Finding");
//                 res.statusCode = 200;
//                 res.setHeader('Content-Type', 'application/json');
//                 res.json(users);
//                 res.end();
//                 console.log("Found successfully");
//             });
//         } else {
//             console.log("No data");
//             res.status(500).json("fail");
//         }
//     });
// })
// .post((req, res, next) => {
//     console.log(req.body);
//     Users.create(req.body)
//         .then((users) => {
//             console.log('Users Created', users);
//             res.statusCode = 200;
//             res.setHeader('Content-Type', 'application/json');
//             res.json(users);
//         }, (err) => next(err))
//         .catch((err) => next(err));
// })
// .put((req, res, next) => {
//     Users.findOneAndUpdate({ _id: req.body.id }, req.body, { new: true })
//         .then((users) => {
//             console.log('Users Updated', users);
//             res.statusCode = 200;
//             res.setHeader('Content-Type', 'application/json');
//             res.json(users);
//         })
//         .catch((err) => next(err));
// })
// .patch((req, res, next) => {
//     Users.findOneAndUpdate({ _id: req.body.id }, { $set: req.body }, { new: true })
//         .then((users) => {
//             console.log('Users Updated', users);
//             res.statusCode = 200;
//             res.setHeader('Content-Type', 'application/json');
//             res.json(users);
//         })
//         .catch((err) => next(err));
// })
// .delete((req, res, next) => {
//     Users.deleteMany({})
//         .then((response) => {
//             console.log('All Users Deleted');
//             res.statusCode = 200;
//             res.setHeader('Content-Type', 'application/json');
//             res.json(response);
//         })
//         .catch((err) => next(err));
// });
