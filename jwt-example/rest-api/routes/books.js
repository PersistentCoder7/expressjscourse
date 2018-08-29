var express = require('express');
var router = express.Router();
var BooksDao = require('../dao/book')
var booksDao = new BooksDao();
var Q = require("q")

/// Create New Book
router.post('/', function(req, res, next) {
    var db = req.app.db;
    booksDao.addBook(db,req.body).then(success=>{        
        res.status(200).json({
            "status":"Success",
            "message":"Data Saved"
        })
    },error=>{
        res.status(500).json({
            "status":"Error",
            "message":error
        })

    })
    
});

/// get all books.
router.get('/', function(req, res, next) {
    var db = req.app.db;
    booksDao.getBooks(db)
        .then(data=>{
            res.status(200).json({
                "status":"Success",
                "data": data
            })
        }, error=>{
            res.status(500).json({
                "status":"Error",
                "message":error
            })
        });

});

/// get a book
router.get('/:isbn', function(req, res, next) {
    var db = req.app.db;   
    var isbn = req.params.isbn;
    booksDao.getBook(db, isbn)
        .then(data=>{
            res.status(200).json({
                "status":"Success",
                "data":data
            })

        }, error=>{
            res.status(500).json({
                "status":"Error",
                "message":error
            })
        })
  
});

/// Update a book
router.put('/:isbn', function(req, res, next) {
    var db = req.app.db;
    
    var isbn = req.params.isbn;
    var bookInfo = req.body;

    booksDao.updateBook(db, isbn, bookInfo)
        .then(data=>{
            res.status(200).json({
                "status":"Success",
                "data":data
            })

        }, error=>{
            res.status(500).json({
                "status":"Error",
                "message":error
            })
        })
  
});

/// Delete
router.delete('/:isbn', function(req, res, next) {

    var db = req.app.db;
    
    var isbn = req.params.isbn;

    booksDao.removeBook(db, isbn)
        .then(data=>{
            res.status(200).json({
                "status":"Success",
                "data":data
            })
        }, error=>{
            res.status(500).json({
                "status":"Error",
                "message":error
            })
        })
});

/// Delete
router.delete('/', function(req, res, next) {

    var db = req.app.db;
    var isbn = req.params.isbn;

    booksDao.removeAll(db)
        .then(data=>{
            res.status(200).json({
                "status":"Success",
                "data":data
            })
        }, error=>{
            res.status(500).json({
                "status":"Error",
                "message":error
            })
        })
});


module.exports = router;
