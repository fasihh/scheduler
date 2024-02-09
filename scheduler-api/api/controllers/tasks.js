const mongoose = require('mongoose');

const handleError = require('../utils/err');

const Task = require('../models/task');

module.exports.getTasksByUser = (req, res, next) => {
    // find all tasks that match the creator id with the authenticated user id
    Task.find({ creator: req.userData.userId })
    .populate('creator', '_id username') // populate creator id field with some creator info
    .exec()
    .then(tasks => {
        return res.status(200).json({
            creator: tasks[0].creator,
            count: tasks.length,
            tasks: tasks.map(task => {
                return {
                    _id: task._id,
                    title: task.title,
                    content: task.content,
                    duration: task.duration,
                    done: task.done,
                    timestamps: {
                        createdAt: task.createdAt,
                        updatedAt: task.updatedAt
                    }     
                };
            })
        });
    })
    .catch(err => handleError(res, err));
}

module.exports.updateTaskById = (req, res, next) => {
    const id = req.params.taskId;

    // check current task's creator id matches user id
    Task.findById(id)
    .exec()
    .then(task => {
        if (task.creator != req.userData.userId) 
            return res.status(403).json({ message: 'permission denied' });

        // making a copy of the req.body 
        const updateOps = {};
        for (const ops in req.body) updateOps[ops] = req.body[ops];

        // updating whatever properties in updateOps
        Task.updateOne({ _id: id }, { $set: updateOps })
        .exec()
        .then(result => res.status(200).json({ message: 'task updated' }))
        .catch(err => handleError(res, err));
    })
    .catch(err => handleError(res, err));
}

module.exports.deleteTaskById = (req, res, next) => {
    const id = req.params.taskId;

    // check current task's creator id matches user id
    Task.findById(id)
    .exec()
    .then(task => {
        if (task.creator != req.userData.userId) 
            return res.status(403).json({ message: 'permission denied' });

        Task.deleteOne({ _id: id })
        .exec()
        .then(result => res.status(200).json({ message: `task created by ${req.userData.username} has been deleted` }))
        .catch(err => handleError(res, err));
    })
    .catch(err => handleError(res, err));
}

module.exports.createTask = (req, res, next) => {
    const task = new Task({
        _id: new mongoose.Types.ObjectId(),
        creator: req.userData.userId,
        title: req.body.title,
        content: req.body.content || '',
        duration: req.body.duration,
        done: false
    });

    task.save()
    .then(result => {
        return res.status(201).json({
            message: 'task created',
            task: task
        });
    })
    .catch(err => handleError(res, err));
}