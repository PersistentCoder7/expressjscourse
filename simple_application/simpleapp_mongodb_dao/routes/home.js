var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
  if (req.session.user) {
    var sessionUser = req.session.user;
    res.render("welcome", { user: sessionUser.username });
  } else {
    console.log('Invalid Session');
    res.redirect("/");

  }


  

});

module.exports = router;
