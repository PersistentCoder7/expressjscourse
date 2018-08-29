var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var jwt = require('jsonwebtoken');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var booksRouter = require('./routes/books');

const MongoClient = require('mongodb').MongoClient;
var Q = require ("q");

var secret = "s3cr33t";
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function (req, res, next) {
  if (!app.db) {
    // Use connect method to connect to the Server
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
  }else {
    next()
  }
})

/*
rest-example
var jwt = require('jsonwebtoken');

var secret = "helloworld1234";

var token = jwt.sign(userInfo, secret);
jwt.verify(token, secret, function (err, decoded) {
            if (err) {
                def.reject(err);
            } else {
                def.resolve(decoded);
                // req.decoded = decoded;
                // next();
            }
        });

*/

/// generate token at Login:

app.use('/login/', function (req, res, next) {

  var token = req.headers['x-access-token'];

  if (token) {
    jwt.verify(token, secret, function (err, decoded) {
      if (err) {
        res.status(500).json({
          "status": "error",
          "messafe": "Invalid Token"
        })
        // next();
      } else {
        res.status(500).json({
          "status": "error",
          "message": "Already Logged In",
        })
        // next();

      }
    });

  } else {
    // generate login here...
    var username = req.body.username;
    var password = req.body.password;

    console.log("validating:",username, password);

    if (username == "admin" && password == "admin") { // just for testing.
      var userInfo = {
        username: username,
        password: password
      }


      var token = jwt.sign(userInfo, secret);
      console.log("TOKEN", token);

      res.status(200).json({
        "status": "Success",
        "message": "User Valid, Token Sent",
        "token": token
      })

    } else {
      res.status(500).json({
        "status": "Error",
        "message": "User Not valid"
      })
    }
  }
  //next()
}) 

app.use(function(req,res,next){
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  if (token) {
    jwt.verify(token, secret, function (err, decoded) {
      if (err) {
        res.status(500).json({
          "status": "error",
          "message": "Invalid Token"
        })
        // next();
      } else {
        console.log("Token is Verified:", decoded)
        req.decoded = decoded
        next()
      }
    });
    
  } else {
    res.status(500).json({
      "status": "error",
      "messafe": "Authentication Failed"
    })

  }
  //next()
})

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/books', booksRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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


const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'booksdb';



module.exports = app;
