const mongoose = require('mongoose');

// all properties for notes
const noteSchema = mongoose.Schema({
    _id: mongoose.Schema.ObjectId,
    creator: { type: String, ref: 'User',  required: true },
    title: { type: String, required: true },
    content: String
}, { timestamps: true, versionKey: false });

module.exports = mongoose.model('Note', noteSchema);