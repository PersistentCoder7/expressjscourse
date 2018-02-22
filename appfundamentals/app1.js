const express = require("express");
const app = express();
const router = express.Router();


app.locals.myapp = "Testing App";

app.set("view engine", "jade");


app.get('/', function (req, res) {
    var appname = req.app.locals.myapp; 
    res.send("Hello from:"+appname);
})

router.get("/greeting/:message", function(req, res){
    var message = req.params.message;

    res.send (message+" from router");
    
})

router.param("message", function(req,res,next,message){
    // DO YOUR STUFF HERE

    console.log(message);

    next();
})

app.use("/routingtest", router);  


app.listen(3000, function (){
    console.log("App Started");
})