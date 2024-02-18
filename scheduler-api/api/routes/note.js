const express = require('express');
const router = express.Router();

const NotesController = require('../controllers/notes');
const checkAuth = require('../auth/checkAuth');

// get all notes by user
router.get('/', checkAuth, NotesController.getNotesByUser);
// get note by user
router.get('/:noteId', checkAuth, NotesController.getNoteById);

// create new note
router.post('/', checkAuth, NotesController.createNote);

// delete note by user
router.delete('/:noteId', checkAuth, NotesController.deleteNoteById);

// update note by user
router.patch('/:noteId', checkAuth, NotesController.updateNoteById);

module.exports = router;
