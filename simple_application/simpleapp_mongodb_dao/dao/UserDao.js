var UserDao = function(){

    this.getUser = function (username, password, db, existsCallBack, doesNotExistCallBal) {

        // here we will write our DB Code to fetch the givenuser.
        const collection = db.collection('user');
        console.log("Collection:", collection);
        console.log("username and password entered:", username, ":", password);
        // Find some documents
        collection.find({ "username": username, "password":password }).toArray(function (err, docs) {

            if (err) {
                console.log("DB Error:", err)
            }

            console.log("Found the following records");
            console.log(docs);

            // do the redirection stuff here.
            if (docs.length > 0) {
                //exist
                existsCallBack(docs)
                // console.log("valid");
                // req.session.user = { username: username }
                // res.redirect("/home");

            } else {
                //does not exist.. .redirect.
                doesNotExistCallBal(docs)
                // console.log("invalid");
                // res.render("index", { message: "Please login with valid Credentials" })
            }
            // callback(docs);
        });
    }
}

module.exports  = UserDao;