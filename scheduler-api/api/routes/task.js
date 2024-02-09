const express = require('express');
const router = express.Router();

const TaskController = require('../controllers/tasks');
const checkAuth = require('../auth/checkAuth');

// get all user tasks
router.get('/', checkAuth, TaskController.getTasksByUser);

// delete post by Id
router.delete('/:taskId', checkAuth, TaskController.deleteTaskById);

// update post by Id
router.patch('/:taskId', checkAuth, TaskController.updateTaskById);

// create task
router.post('/', checkAuth, TaskController.createTask);

module.exports = router;
