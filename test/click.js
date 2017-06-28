var supertest = require("supertest");
var should = require("should");
var randomstring = require("randomstring");

// This agent refers to PORT where program is running.

var apiserver = supertest.agent("http://localhost:3001");

// UNIT test begin

var test_count = 0;

describe("Click",function(){
  describe("Click ADD [GET] /app/click/:brand/:type/:id/)",function(){

    describe("Error",function(){
      it("Si brand va vacío devuelve: {status:404,code:NOT_FOUND}",function(done){
        var name = Math.floor(Date.now()).toString()+test_count;
        test_count++;
        var brand = name+"brand";
        var type = "post";
        var id = name+"id";
        apiserver
          .get("/app/click//"+type+"/"+id)
          .expect("Content-type",/json/)
          .end(function(err,res){
            if(res.statusCode != 404){done(res.body.message);}
            res.body.code.should.equal("NOT_FOUND");
            done();
          });
      });


      it("Si type va vacío devuelve: {status:404,code:NOT_FOUND}",function(done){
        var name = Math.floor(Date.now()).toString()+test_count;
        test_count++;
        var brand = name+"brand";
        var type = "post";
        var id = name+"id";
        apiserver
          .get("/app/click/"+brand+"//"+id)
          .expect("Content-type",/json/)
          .end(function(err,res){
            if(res.statusCode != 404){done(res.body.message);}
            res.body.code.should.equal("NOT_FOUND");
            done();
          });
      });

      it("Si id va vacío devuelve: {status:404,code:NOT_FOUND}",function(done){
        var name = Math.floor(Date.now()).toString()+test_count;
        test_count++;
        var brand = name+"brand";
        var type = "post";
        var id = name+"id";
        apiserver
          .get("/app/click/"+brand+"/"+type+"//")
          .expect("Content-type",/json/)
          .end(function(err,res){
            if(res.statusCode != 404){done(res.body.message);}
            res.body.code.should.equal("NOT_FOUND");
            done();
          });
      });
      it("Si type no tiene formato válido devuelve: {status:401,code:CLICK_TYPE_NOT_VALID}",function(done){
        var name = Math.floor(Date.now()).toString()+test_count;
        test_count++;
        var brand = name+"brand";
        var type = "fail";
        var id = name+"id";
        apiserver
        .get("/app/click/"+brand+"/"+type+"/"+id+"/")
          .expect("Content-type",/json/)
          .end(function(err,res){
            if(res.statusCode != 401){done(res.body.message);}
            res.body.code.should.equal("CLICK_TYPE_FORMAT_NOT_VALID");
            done();
          });
      });
    });

    describe("Success",function(){

      it("Si click tiene formato válido devuelve: {status:200,code:CLICK_CREATED}",function(done){
        var name = Math.floor(Date.now()).toString()+test_count;
        test_count++;
        var brand = name+"brand";
        var type = "post";
        var id = name+"id";
        apiserver
          .get("/app/click/"+brand+"/"+type+"/"+id+"/")
          .expect("Content-type",/json/)
          .end(function(err,res){
            if(res.statusCode != 200){done(res.body.message);}
            res.body.code.should.equal("CLICK_CREATED");
            done();
          });
      });
    });
  });
});
