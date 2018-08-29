var express = require('express');
var router = express.Router();
var UserDao = require("../dao/UserDao")
var userDao = new UserDao();





router.post('/', function (req, res, next) {
  var db = req.app.db;

  var username = req.body.email;
  var password = req.body.password;

  userDao.getUser(username, password, db,
    function (docs) {
      console.log("valid");
      req.session.user = { username: username }
      res.redirect("/home");

    }, function (docs) {
        console.log("invalid");
        res.render("index", { message: "Please login with valid Credentials" })
    })
});


  // if (username == "admin@admin.com" && password == "admin@admin.com") {
  //     console.log("valid");
  //     req.session.user={username:username}
  //     res.redirect("/home");

  // }else {
  //   console.log("invalid");
  //   res.render("index",{message:"Please login with valid Credentials"})

  // }

// });

module.exports = router;
