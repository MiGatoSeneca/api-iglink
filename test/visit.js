var supertest = require("supertest");
var should = require("should");
var randomstring = require("randomstring");

// This agent refers to PORT where program is running.

var apiserver = supertest.agent("http://localhost:3001");

// UNIT test begin

var test_count = 0;

describe("Visit",function(){
  describe("Visit ADD [GET] /app/visit/:brand)",function(){

    describe("Error",function(){
      it("Si brand va vacío devuelve: {status:404,code:NOT_FOUND}",function(done){
        var name = Math.floor(Date.now()).toString()+test_count;
        test_count++;
        var brand = name+"brand";
        apiserver
          .get("/app/visit//")
          .expect("Content-type",/json/)
          .end(function(err,res){
            if(res.statusCode != 404){done(res.body.message);}
            res.body.code.should.equal("NOT_FOUND");
            done();
          });
      });
    });

    describe("Success",function(){

      it("Si visit tiene formato válido devuelve: {status:200,code:VISIT_CREATED}",function(done){
        var name = Math.floor(Date.now()).toString()+test_count;
        test_count++;
        var brand = name+"brand";
        apiserver
          .get("/app/visit/"+brand)
          .expect("Content-type",/json/)
          .end(function(err,res){
            if(res.statusCode != 200){done(res.body.message);}
            res.body.code.should.equal("VISIT_CREATED");
            done();
          });
      });
    });
  });
});
