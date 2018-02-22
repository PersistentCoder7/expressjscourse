var express = require('express');
var router = express.Router();
var multer = require('multer');

var storage = multer.diskStorage({
    destination: function(req,file,cb) {
        cb(null,"uploads/")
    },
    filename:function(req,file,cb) {
        cb(null, file.originalname);
    }
}); 

var upload = multer({ storage:storage});




router.post('/', upload.single('myFile'),function(req, res, next) {
    var file = req.file;
    console.log (file);
  res.send('respond with a resource');
});

module.exports = router;
