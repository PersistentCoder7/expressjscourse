let express = require("express");
let app = express();

let router = express.Router();

router.get("/test", function(req,res,next) {
    res.send ("response1");
    console.log("First Message");
    next();
}, function(req,res,next){
    console.log("Second Message");
    next();
})

router.get("/test", function(req,res,next){
    console.log("Third Message");
})

var c1 = function (req,res,next) {
    console.log("c1");
    next();
}
var c2 = function (req,res,next) {
    console.log("c2");
    next();
}
var c3 = function (req,res,next) {
    console.log("c3");
    next();
}

router.get("/ctest",[c1,c2],c3, function (req,res,next){
    console.log("c4");
})


app.use ("/", router)

app.listen (3000, function (){
    console.log ('App started');
}) 