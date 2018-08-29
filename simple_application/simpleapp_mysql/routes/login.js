var express = require('express');
var router = express.Router();

//mysql imports and declarations
var mysql = require('mysql');
var pool  = mysql.createPool({
  connectionLimit : 10,
  host            : 'localhost',
  user            : 'root',
  password        : 'parthjj',
  database        : 'testdb'
});




router.post('/', function(req, res, next) {
  var username= req.body.email;
  var password= req.body.password;

  // firing the query and getting the results.
  pool.query('select * from user where username="' + username + '" and password="' + password + '"',
    function (error, results, fields) {
      if (error) throw error;
      console.log('The row fetched is: ', results[0]);
      if (results.length>0) {
        // there is a user with this credentials
        console.log("valid");
        req.session.user={username:username}
        res.redirect("/home");
      }else {
        // no user exists with this credentials.
        console.log("invalid");
        res.render("index",{message:"Please login with valid Credentials"})
      }
    });
  


  // // checking values from database instead of hard coded. 
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
