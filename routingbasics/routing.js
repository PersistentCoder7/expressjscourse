let express = require("express");
let app = express();

let router = express.Router();;

router.get("/",function (req, res, next){
    res.send("Hello");

});
// for route path abcd. abcccd, abccd ..
router.get("/abc+d",function (req, res, next){
    res.send("Hello");

});

app.use ("/", router)

app.listen (3000, function (){
    console.log ('App started');
}) 