var express = require('express');
var router = express.Router();


router.post('/', function(req, res, next) {
  var username= req.body.email;
  var password= req.body.password;

  if (username == "admin@admin.com" && password == "admin@admin.com") {
      console.log("valid");
      res.redirect("/home");

  }else {
    console.log("invalid");

  }

  res.send("Got Data");
});

module.exports = router;
