const config = require('./config.js');
const createError = require('http-errors');
const express = require('express');
const logger = require('morgan');
const users = require('./app/users');
const tasks = require('./app/tasks');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', function (req, res) {
  res.json({
    message: 'it works !!'
  });
});
app.use('/', [users, tasks]);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;