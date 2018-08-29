var assert = require("assert");
let chai = require("chai");
let chaiHttp = require("chai-http");
let server=require("../app");
let should = chai.should();



chai.use(chaiHttp);
describe("Books", function(){
    describe ("DELETE ALL", function(){
        it("should remove all first", done=>{
            console.log ("Deleting all data in db first.")
            chai.request(server)
                .delete("/books/")
                .send({})
                .end((err,res)=>{
                    //console.log (res)
                    // console.log("err",err);
                    res.should.have.status(200);
                    console.log("Response Body:", res.body);
                    // console.log (result);
                    done()
                })
        })

    })
    

    describe ("CRUD OPERATIONS", function(){

        var books = [{
            "isbn": "121212",
            "title": "World Is Best",
            "author": "Larry",
            "year": "2016"

        }, {
            "isbn": "121213",
            "title": "Node JS",
            "author": "John",
            "year": "2016"

        }]
        it("Should add Books in DB", (done) => {
            for (book in books) {
                chai.request(server)
                    .post("/books/")
                    .send(books[book])
                    .end((err, res) => {
                        res.should.have.status(200);
                        console.log("Response Body:", res.body);
                        
                    })
            }
            done()
        })
    
        it ("Should Fecth all the Books", (done)=>{
            chai.request(server)
                .get("/books/")
                .end((err, result)=>{
                    result.should.have.status(200);
                    console.log ("Got",result.body.data.length, " docs")
                    //console.log ("Result Body:", result.body);
                    
                    done()
                })
        })

        it ("Should Fetch Particular Book only", (done)=>{
            chai.request(server)
                .get("/books/"+books[1].isbn)
                .end((err, result)=>{                    
                    result.should.have.status(200)
                    console.log("Fetched Particlar Book using /GET/BOOKS/:BOOKID ::::", result.body)
                    done()
                })
        })

        it ("Should Update Partcular Book Only", (done)=>{
            var updatedBook = {
                "isbn": "121213",
                "title": "Node JS",
                "author": "John",
                "year": "2017" /// year is changed
            }
            
            chai.request(server)
                .put("/books/"+books[1].isbn)
                .send(updatedBook)
                .end((err, result)=>{                    
                    result.should.have.status(200)
                    console.log("Updated Particlar Book using /GET/BOOKS/:BOOKID ::::", result.body)
                    done()
                })
        })

        it ("should check data updated in DB", (done)=>{
            chai.request(server)
                .get("/books/"+books[1].isbn)
                .end((err, result)=>{                    
                    result.should.have.status(200)                
                    result.body.data.year.should.eq("2017")
                    console.log("Fetched Particlar Book using /GET/BOOKS/:BOOKID ::::", result.body)    
                    done()
                })
        })

        it("Should Delete Particular Book", (done)=>{
            chai.request(server)
                .delete("/books/"+books[1].isbn)
                .end((err, result)=>{                    
                    result.should.have.status(200)                
                    console.log("Deleted Particlar Book using /GET/BOOKS/:BOOKID ::::", result.body)    
                    done()
                })
        })

        it("Should confirm delete with number of Docs from DB", (done)=>{
            chai.request(server)
                .get("/books/")
                .end((err, result)=>{
                    result.should.have.status(200);
                    result.body.data.length.should.eq(1);
                    console.log ("Got",result.body.data.length, " docs")
                    //console.log ("Result Body:", result.body);
                    done()
                })
        })

    })
    

    
})