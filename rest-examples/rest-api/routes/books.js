var express = require('express');
var router = express.Router();
var BooksDao = require("../dao/BookDao");
var booksDao = new BooksDao();

// post - add
router.post('/', function(req, res, next) {
    var db = req.app.db;
    var bookInfo = req.body;
    booksDao.addBook(db, bookInfo).then(success=>{
        res.status(200).json({
            "status":"Success",
            "message":"Data Saved"
        })
    }, error=>{
        res.status(500).json({
            "status":"Error",
            "message":error
        })
    })
});



/// get - read all

router.get('/', function(req, res, next) {
    var db = req.app.db;

    booksDao.getBooks(db)
        .then(data => {
            res.status(200).json({
                "status": "Success",
                "data": data
            })
        }, error => {
            res.status(500).json({
                "status": "Error",
                "message": error
            })
        })

});



/// get - read particular
router.get('/:isbn', function(req, res, next) {
    var db = req.app.db;

    var isbn = req.params.isbn

    booksDao.getBook(db, isbn)
        .then(data => {
            res.status(200).json({
                "status": "Success",
                "data": data
            })
        }, error => {
            res.status(500).json({
                "status": "Error",
                "message": error
            })
        })

});



/// put - edit
router.put('/:isbn', function(req, res, next) {
    var db = req.app.db;

    var isbn = req.params.isbn
    var bookInfo = req.body

    booksDao.updateBook(db, isbn, bookInfo)
        .then(data => {
            res.status(200).json({
                "status": "Success",
                "data": data
            })
        }, error => {
            res.status(500).json({
                "status": "Error",
                "message": error
            })
        })

});



//// delete - remove
router.delete('/:isbn', function(req, res, next) {
    var db = req.app.db;

    var isbn = req.params.isbn

    booksDao.removeBook(db, isbn)
        .then(data => {
            res.status(200).json({
                "status": "Success",
                "data": data
            })
        }, error => {
            res.status(500).json({
                "status": "Error",
                "message": error
            })
        })

});


/// delete - remove all
router.delete('/', function(req, res, next) {
    var db = req.app.db;

    booksDao.removeAll(db)
        .then(data => {
            res.status(200).json({
                "status": "Success",
                "data": data
            })
        }, error => {
            res.status(500).json({
                "status": "Success",
                "message": error
            })
        })

});
  


module.exports = router;

  
