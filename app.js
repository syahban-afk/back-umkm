const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./Routes/index');
const usersRouter = require('./Routes/users');
const adminsRouter = require('./Routes/admins');
const eventsRouter = require('./Routes/events');
const feedbackRouter = require('./Routes/feedback');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/admins', adminsRouter);
app.use('/api/events', eventsRouter);
app.use('/api/feedback', feedbackRouter);

module.exports = app;

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
