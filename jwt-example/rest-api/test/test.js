var assert = require("assert");
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../app");
let should = chai.should();



chai.use(chaiHttp);
describe("Books - JWT Example", function () {
    describe("DELETE ALL - WITHOUT JWT TOKEN", function () {
        it("Should give error", done => {
            console.log("Deleting all data in db first.")
            chai.request(server)
                .delete("/books/")
                .send({})
                .end((err, res) => {
                    //console.log (res)
                    // console.log("err",err);
                    res.should.have.status(500);
                    console.log("Response Body:", res.body);
                    // console.log (result);
                    done()
                })
        })
    })

    describe("LOGIN AND GET JWT TOKEN", function () {
        it("Should give error", done => {
            console.log("Deleting all data in db first.")
            chai.request(server)
                .post("/login/")
                .send({
                    "username": "admin",
                    "password": "admin"
                })
                .end((err, res) => {
                    //console.log (res)
                    // console.log("err",err);
                    console.log("Response Body:", res.body);
                    res.should.have.status(200);
                    var token = res.body.token;
                    console.log("sending token", token);
                    chai.request(server)
                        .delete("/books/")
                        .set("x-access-token",token)
                        //.send({})
                        .end((err, res) => {
                            //console.log (res)
                            // console.log("err",err);
                            res.should.have.status(200);
                            console.log("Response Body:", res.body);
                            // console.log (result);
                            done()
                        })

                    // console.log (result);
                    //done()
                })
        })
    })
})