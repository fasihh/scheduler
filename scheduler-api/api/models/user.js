const mongoose = require('mongoose');

// user schema dictates the properties that a user object has in the database
const userSchema = mongoose.Schema({
    _id: mongoose.Schema.ObjectId,
    username: { type: String, required: true },
    password: { type: String, required: true }
}, { versionKey: false, timestamps: true });

module.exports = mongoose.model('User', userSchema);