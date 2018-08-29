var express = require('express');
var router = express.Router();

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'testdb';



router.post('/', function (req, res, next) {
  var username = req.body.email;
  var password = req.body.password;

  // put db connection and query here... we will fetch user with given credentials
  MongoClient.connect(url, function (err, client) {
    if (err) {
      console.log("Connection error", err);
    }
    console.log("Connected successfully to server");

    const db = client.db(dbName);

    // we will put the query here...
    // Get the documents collection
    const collection = db.collection('user');
    console.log("Collection:",collection);
    console.log("username and password entered:", username, ":", password);
    // Find some documents
    collection.find({"username":username}).toArray(function (err, docs) {

      if (err) {
        console.log("DB Error:", err)
      }

      console.log("Found the following records");
      console.log(docs);

      // do the redirection stuff here.
      if (docs.length > 0) {
        //exist
        console.log("valid");
        req.session.user = { username: username }
        res.redirect("/home");

      } else {
        //does not exist.. .redirect.
        console.log("invalid");
        res.render("index", { message: "Please login with valid Credentials" })
      }
      // callback(docs);
    });


    client.close();
  });


  // if (username == "admin@admin.com" && password == "admin@admin.com") {
  //     console.log("valid");
  //     req.session.user={username:username}
  //     res.redirect("/home");

  // }else {
  //   console.log("invalid");
  //   res.render("index",{message:"Please login with valid Credentials"})

  // }

});

module.exports = router;
