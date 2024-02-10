const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

// user module. this is the format that describes how data will be placed in the database
const User = require('../models/user');

// error handling util
const handleError = require('../utils/err');

module.exports.createUser = (req, res, next) => {
    // check if user by this name already exists
    User.findOne({ username: req.body.username })
    .exec()
    .then(user => {
        // user already exists
        if (user) 
            return res.status(409).json({ message: "user already exists" });

        const newUser = new User({
            _id: new mongoose.Types.ObjectId(),
            username: req.body.username,
            password: req.body.password
        });

        // creating auth token
        const token = jwt.sign(
            {
                userId: user._id,
                username: user.username
            },
            `${process.env.JWT_KEY}`,
            {
                expiresIn: '4h'
            }
        );
    
        newUser.save()
        // sending back a response with OK status and a message
        .then(result => {
            res.status(201).json({ 
                message: 'user created successfully',
                token: `Bearer ${token}`
            });
        })
        .catch(err => handleError(res, err));
    })
    .catch(err => handleError(res, err));
}

module.exports.loginUser = (req, res, next) => {
    User.findOne({ username: req.body.username })
    .exec()
    .then(user => {
        // user doesn't exist
        if (!user) 
            return res.status(401).json({ message: 'auth failed' });

        // creating auth token
        const token = jwt.sign(
            {
                userId: user._id,
                username: user.username
            },
            `${process.env.JWT_KEY}`,
            {
                expiresIn: '4h'
            }
        );

        // send back success message with token
        return res.status(200).json({
            message: 'login successful',
            token: `Bearer ${token}`
        });
    });
}