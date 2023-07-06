require("dotenv").config();
const dbUrl = process.env.DB_CONNECTION_STRING;
const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const upload = multer();
const Verify = require("../routers/verify");

// Mongoose
const mongoose = require("mongoose");
const connect = mongoose.connect(dbUrl);
const Users = require("../models/users");
const { useNavigate } = require("react-router-dom");

// Create router
const usersRouter = express.Router();

usersRouter.use(bodyParser.json());

// Configure routes

//VIEW PROFILE API
usersRouter
  .route("/")
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
            if (profile.status != false) {
              res.json(profile);
            } else {
              console.log("Profile ", profile.name, "is not valid");
            }
            res.end();
            console.log("Found a ", profile, " successfully");
          })
          .catch((err) => next(err));
      } else {
        console.log("No data");
        res.status(500).json("fail");
      }
    });
  })
  //EDIT PROFILE API
  .patch( upload.none(), async (req, res) => {
    try {
      const profileId = req.query.profileId;
      const user = await Users.findOne({ _id: profileId });
  
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
  
      const { username, email } = req.body;
  
      // Check if new data is provided, otherwise keep the old data
      if (username) {
        user.username = username;
      }
  
      if (email) {
        // Find if there are any users with the same email
        const existingUser = await Users.findOne({ email });
  
        if (existingUser && existingUser._id.toString() !== profileId) {
          return res.status(400).json({ error: "Email already exists" });
        }
  
        user.email = email;
      }
  
      await user.save();
  
      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  })

  //REMOVE PROFILE API
  .delete((req, res, next) => {
    const profileId = req.query.profileId;
    const status = req.body.status;
    Users.findByIdAndUpdate(profileId, { status }, { new: true })
      .then((users) => {
        console.log(status);
        console.log("Users Updated", users);
        res.statusCode = 200;
        res.json(users);
      })
      .catch((err) => {
        res.statusCode = 500;
        res.json({ error: err.message });
      });
  });

//REGISTER API
usersRouter
  .route("/register")
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    console.log(dbUrl);
    next();
  })
  .post(Verify.createUser, (req, res, next) => {
    const { email } = req.body;
    console.log("Created an account for ", email);

    // Users.findOne({ email: email }) // Check if the email already exists in the database
    //   .then((existingUser) => {
    //     if (existingUser) {
    //       res.status(409).json({ error: "Email already exists!" });
    //     } else {
    //       Users.create(req.body)
    //         .then((user) => {
    //           console.log("Create: ", user);
    //           res.status(200);
    //           res.setHeader("Content-Type", "application/json");
    //           res.json(user);
    //         })
    //         .catch((err) => {
    //           res.status(500).json({ error: "Failed to create new document!" });
    //         });
    //     }
    //   })
    //   .catch((err) => {
    //     res.status(500).json({ error: "Failed to check for duplicate email!" });
    //   });
  });

usersRouter.route("/login").post(Verify.loginUser, (req, res, next) => {
  res.redirect("/groups");
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

module.exports = usersRouter;
