var express = require("express");
var app = express();

var cookieParser = require("cookie-parser");

app.use(cookieParser());

app.use(function(req,res,next) {
    console.log("Reading All Requests from everywhere!!!");
})

app.use("/myroute",function(req,res,next) {
    console.log("mounting route here");
})

app.get("/myroute",function(req,res,next) {
    console.log("get 1");
},function(req,res,next) {
    console.log("get 2");
})

app.post("/myroute",function(req,res,next) {
    console.log("post1");
})
app.post("/myroute",function(req,res,next) {
    console.log("post2");
})

var router = express.Router();

router.use("/routing",function(req,res,next) {
    console.log("mounting route here");
})

router.get("/routing",function(req,res,next) {
    console.log("get 1");
},function(req,res,next) {
    console.log("get 2");
})

router.post("/routing",function(req,res,next) {
    console.log("post1");
})
router.post("/routing",function(req,res,next) {
    console.log("post2");
})

app.use("/", router);

app.use(function (err,req,res,next){
    if (err) {
        console.log("error:", err);
        res.status(500).send("Something went wrong");
    }
})

app.listen(3000, function (){
    console.log ("Application Started");
})