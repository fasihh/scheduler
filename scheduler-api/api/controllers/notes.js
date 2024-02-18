const mongoose = require('mongoose');

const handleError = require('../utils/err');
const Note = require('../models/note');

// all of these operations are almost completely similar to the task ones

module.exports.getNotesByUser = (req, res, bext) => {
    Note.find({ creator: req.userData.userId })
    .sort({ createdAt: -1 })
    .populate('creator', '_id username')
    .exec()
    .then(notes => {
        return res.status(200).json({
            creator: notes[0].creator,
            count: notes.length,
            notes: notes.map(note => {
                return {
                    _id: note._id,
                    title: note.title,
                    content: note.content,
                    timestamps: {
                        createdAt: note.createdAt,
                        updatedAt: note.updatedAt
                    }     
                };
            })
        });
    })
    // no notes found error
    .catch(err => res.status(200).json({
        count: 0,
        notes: []
    }));
}

module.exports.getNoteById = (req, res, next) => {
    Note.find({ _id: req.params.noteId })
    .exec()
    .then(note => {
        // check if same creator as user in token
        if (note[0].creator !== req.userData.userId) return res.status(403).json({ message: 'permission denied' });
        return res.status(200).json(note);
    })
    .catch(err => handleError(res, err));
}

module.exports.createNote = (req, res, next) => {
    const note = new Note({
        _id: new mongoose.Types.ObjectId(),
        creator: req.userData.userId,
        title: req.body.title,
        content: req.body.content,
    });

    note.save()
    .then(result => res.status(201).json({
        message: 'note created',
        note: note
    }))
    .catch(err => handleError(res, err));
}

module.exports.deleteNoteById = (req, res, next) => {
    const id = req.params.noteId;

    // check current task's creator id matches user id
    Note.findById(id)
    .exec()
    .then(note => {
        if (note.creator != req.userData.userId) 
            return res.status(403).json({ message: 'permission denied' });

        Note.deleteOne({ _id: id })
        .exec()
        .then(result => res.status(200).json({ message: `note created by ${req.userData.username} has been deleted` }))
        .catch(err => handleError(res, err));
    })
    .catch(err => handleError(res, err));
}

module.exports.updateNoteById = (req, res, next) => {
    const id = req.params.noteId;

    Note.findById(id)
    .exec()
    .then(note => {
        if (note.creator != req.userData.userId) 
            return res.status(403).json({ message: 'permission denied' }) ;

        // making a copy of the req.body 
        const updateOps = {};
        for (const ops in req.body) updateOps[ops] = req.body[ops];

        Note.updateOne({ _id: id }, { $set: updateOps })
        .exec()
        .then(result => res.status(200).json({ message: 'note updated' }))
        .catch(err => handleError(res, err));
    })
    .catch(err => handleError(res, err));
}