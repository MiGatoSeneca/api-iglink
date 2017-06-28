var supertest = require("supertest");
var should = require("should");
var randomstring = require("randomstring");

// This agent refers to PORT where program is running.

var apiserver = supertest.agent("http://localhost:3000");

// UNIT test begin

var test_count = 0;

describe("Segment",function(){
  describe("App Segment ADD [POST] /:sessionKey/brand/:brand/custom)",function(){
    describe("ERRORES formato y campos vacíos",function(){
      it("Si sessionKey va vacío devuelve: {status:404,code:NOT_FOUND}",function(done){
        var name = Math.floor(Date.now()).toString()+test_count;
        test_count++;
        var fingerprint = name+"fingerprint";
        var email = name+"@fakeemail.com";
        var password = name;
        var slug = name+"slug";
        var cssTarget = name+"cssTarget";
        var action = name+"cssTarget";
        var search = name+"search";
        var position = 1000;

        apiserver
          .post("/access/signup")
          .send({brand:brand, email : email, password : password})
          .expect("Content-type",/json/)
          .end(function(err,res){
            if(res.statusCode != 200){done(res.body.message);}
            apiserver
              .post("/access/login")
              .send({email : email, password : password})
              .expect("Content-type",/json/)
              .end(function(err,res){
                if(res.statusCode != 200){done(res.body.message);}
                var sessionKey = res.body.data.sessionKey;
                apiserver
                  .post("/app//brand/"+brand+"/custom/"+type+"/all")
                  .send({
                    slug : slug,
                    cssTarget : cssTarget,
                    action : action,
                    search : search,
                    position : position
                  })
                  .expect("Content-type",/json/)
                  .end(function(err,res){
                    if(res.statusCode != 404){done("[/track/session/"+fingerprint+"/"+brand+"/] "+res.body.message);}
                    res.body.data.countUsers.should.equal(0);
                    apiserver
                      .get("/track/segment/"+fingerprint+"/"+brand+"/system/all")
                      res.body.data.countUsers.should.equal(0);
                      res.body.data.countSessions.should.equal(0);
                      done();
                  });
              });
          });
      });
      it("Si brand va vacío devuelve: {status:404,code:NOT_FOUND}",function(done){
        done();
      });
      it("Si type va vacío devuelve: {status:404,code:NOT_FOUND}",function(done){
        done();
      });
      it("Si slug va vacío devuelve: {status:404,code:NOT_FOUND}",function(done){
        done();
      });
      it("Si sessionKey tiene formato no válido devuelve: {status:401,code:SESSIONKEY_NOT_VALID}",function(done){
        done();
      });
      it("Si brand tiene formato no válido devuelve: {status:401,code:BRAND_NOT_VALID}",function(done){
        done();
      });
      it("Si type tiene formato no válido devuelve: {status:401,code:TYPE_NOT_VALID}",function(done){
        done();
      });
      it("Si slug tiene formato no válido devuelve: {status:401,code:SLUG_NOT_VALID}",function(done){
        done();
      });
    });

    describe("Casos de uso",function(){
      it("Si slug tiene formato no válido devuelve: {status:401,code:SLUG_NOT_VALID}",function(done){
        done();
      });
    });
  });
});
