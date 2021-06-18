// Import environment constiables
require("dotenv").config()

// Import other packages
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session')
var passport = require('passport')

// Define exxpress app 
var app = express();


//IMPORT ROUTES
var apiRouter = require('./routes/apiRouter');

// initialize passport strategy
require('./auth/passport-config')

// passport middleware
app.use(session({ secret: "cats", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Configure Express App
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


// USE ROUTES
app.use('/api', apiRouter);

// serve the react application
app.use(express.static('../client/build'))

// catch any non-specific urls
app.get('*', (req, res)=>{
  res.sendFile(path.resolve(__dirname,'../client/build','index.html'))
})
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
  res.send('error');
});

module.exports = app;
