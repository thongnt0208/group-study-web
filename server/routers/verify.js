const User = require('../models/users');
const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
const bcrypt = require('bcrypt');
const secretKey = '12345-67890-09876-54321';


 let generateToken = function (user) {
    console.log('User ne: ', user);
    let payload = {
        _id: user._id,
        username: user.username,
        role: user.role,
        status: user.status
    };
    return jwt.sign(payload, secretKey, {
        expiresIn: 3600
    });
};


exports.verifyOrdinaryUser = function (req, res, next) {
    // Check header for the token
    var token = req.headers.authorization;

    // Decode token
    if (token) {
        // Extract the token from the "Bearer" prefix
        token = token.replace('Bearer ', '');

        // Verify the token
        jwt.verify(token, secretKey, function (err, decoded) {
            if (err) {
                err = new Error('You are not authenticated!');
                err.status = 401;
                return next(err);
            } else {
                console.log(decoded);
                // If everything is good, save the decoded token to the request for use in other routes
                req.decoded = decoded;
                next();
            }
        });
    } else {
        // If there is no token
        let err = new Error('No token provided!');
        err.status = 403;
        return next(err);
    }
};


exports.verifyAdmin = function (req, res, next) {
    if (!req.decoded || !req.decoded._id) {
        const err = new Error('Invalid token or missing user ID');
        err.status = 401;
        return next(err);
    }

    User.findById(req.decoded._id)
        .then(user => {
            if (user && user.admin) {
                return next();
            } else {
                const err = new Error('You are not authorized to perform such actions!');
                err.status = 401;
                return next(err);
            }
        })
        .catch(err => next(err));
};

exports.createUser = function (req, res, next) {
    let newUsername = req.body.username;
    let newPassword = req.body.password;
    let newUser = req.body;
    console.log(newUser);

    User.findOne({ username: newUsername })
        .then(user => {
            if (user) {
                const err = new Error('Username already exists!');
                err.status = 409;
                return next(err);
            } else {
                bcrypt.hash(newPassword, 10, function (err, hash) {
                    if (err) {
                        return next(err);
                    }
                    newUser.password = hash;
                    console.log(newUser);
                    User.create(newUser)
                        .then(user => {
                            res.status(201).json({ message: 'User created successfully!', user });
                        })
                        .catch(err => next(err));
                });
            }
        })
        .catch(err => next(err));
};

exports.loginUser = function (req, res, next) {
    const { username, password } = req.body;
    User.findOne({ username })
        .then(user => {
            if (!user) {
                const err = new Error('Authentication failed. User not found.');
                err.status = 401;
                return next(err);
            }
            bcrypt.compare(password, user.password, function (err, result) {
                if (err) {
                    return next(err);
                }
                if (result) {
                    const token = generateToken(user);
                    localStorage.setItem('token', token);
                    res.status(200).json({ message: 'Authentication successful!', token });
                } else {
                    const err = new Error('Authentication failed. Wrong password.');
                    err.status = 401;
                    return next(err);
                }
            });
        })
        .catch(err => next(err));
};

