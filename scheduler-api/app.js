const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const app = express();

// api routes
const userRoutes = require('./api/routes/user');
const taskRoutes = require('./api/routes/task');

// db connection
mongoose.connect(
    `mongodb+srv://Scheduler1:${process.env.MONGO_ATLAS_PW}@database.mujdpc5.mongodb.net/?retryWrites=true&w=majority`
);

// morgan used to log API calls
app.use(morgan('dev'));

// body parser to decode incomming JSON strings into objects
app.use(express.json());
// url parser
app.use(express.urlencoded({ extended: false }));

// allows bypass of cors errors
app.use(cors());

// using routes
app.use('/user', userRoutes);
app.use('/tasks', taskRoutes);

module.exports = app;