var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');
var books = require('./routes/books');

var app = express();


const MongoClient = require('mongodb').MongoClient;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'booksdb';

app.use(function (req, res, next) {
  if (!app.db) {
    console.log("Connecting to Server")
    MongoClient.connect(url).then(client => {
      console.log("Connected correctly to server");
      const db = client.db(dbName);
      console.log("Getting the DB Object");
      app.db = db;
      next()
    }, error => {
      console.log(error)
      next()
    });

  } else {
    next()
  }
})

app.use('/', index);
app.use('/users', users);
app.use('/books', books);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
