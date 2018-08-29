var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var counter = req.cookies.counter;

  
  if (counter) {
     counter = Number.parseInt(counter) + 1;
  }else {
    counter = 0;
  }

  console.log("counter:",counter);
  res.cookie("counter",counter,{maxAge:9000,httpOnly:true}).render('index', { title: 'My' });
});

module.exports = router;
