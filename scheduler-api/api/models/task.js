const mongoose = require('mongoose');

// all the properties held by the task object in the database
const taskSchema = mongoose.Schema({
    _id: mongoose.Schema.ObjectId,
    creator: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    content: String,
    duration: String,
    done: Boolean
}, { versionKey: false, timestamps: true });

module.exports = mongoose.model('Task', taskSchema);