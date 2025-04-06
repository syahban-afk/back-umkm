const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./Routes/index');
const usersRouter = require('./Routes/users');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', indexRouter);
app.use('/api/users', usersRouter);
app.use("/uploads", express.static("uploads"));

module.exports = app;

const DB_PORT = process.env.DB_PORT;
app.listen(DB_PORT, () => {
    console.log(`Server is running on port ${DB_PORT}`);
    console.log(`http://localhost:${DB_PORT}`);
});
