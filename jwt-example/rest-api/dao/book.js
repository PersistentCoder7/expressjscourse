var Q = require ("q");

var BooksDao = function() {
    
    this.addBook = function(db, bookInfo) {
        var def= Q.defer();        
        db.collection("books").insert(bookInfo).then((success)=>{
            def.resolve(success)
        }, error=>{
            def.reject(error)
        })
        return def.promise;
    }

    this.getBooks = function(db) {
        var def = Q.defer();
        db.collection("books").find({}).toArray()
            .then(data=>{
                def.resolve(data)
            }, error=>{
                def.reject (error)
            })
        return def.promise;
    }

    this.getBook = function(db, isbn) {
        var def = Q.defer();
        db.collection("books").findOne({isbn:isbn})
            .then(bookInfo=>{
                def.resolve(bookInfo);
            }, error=>{
                def.reject(error);
            })
        return def.promise;
    }

    this.updateBook = function (db, isbn, bookInfo) {
        var def = Q.defer();
        db.collection("books").update({isbn:isbn},bookInfo)
            .then(success=>{
                def.resolve (success)
            }, error=>{
                def.reject( error);
            })
        
        return def.promise;
    }
    this.removeBook = function(db, isbn) {
        var def = Q.defer();
        db.collection("books").remove({isbn:isbn})
            .then(success=>{
                def.resolve(success)
            }, error=>{
                def.reject(error)
            })
        return def.promise;
    }
    this.removeAll = function(db) {
        var def = Q.defer();
        db.collection("books").remove({})
            .then(success=>{
                def.resolve(success)
            }, error=>{
                def.reject(error)
            })
        return def.promise;
    }
}

module.exports = BooksDao;