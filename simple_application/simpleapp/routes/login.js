var express = require('express');
var router = express.Router();


router.post('/', function(req, res, next) {
  var username= req.body.email;
  var password= req.body.password;

  if (username == "admin@admin.com" && password == "admin@admin.com") {
      console.log("valid");
      req.session.user={username:username}
      res.redirect("/home");

  }else {
    console.log("invalid");
    res.render("index",{message:"Please login with valid Credentials"})

  }

});

module.exports = router;
