const mongoose = require('mongoose');

// all the properties held by the task object in the database
const taskSchema = mongoose.Schema({
    _id: mongoose.Schema.ObjectId,
    creator: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    content: String,
    deadline: String,
    done: Boolean,
    priority: { type: Number, required: true, default: 1 }
}, { versionKey: false, timestamps: true });

module.exports = mongoose.model('Task', taskSchema);