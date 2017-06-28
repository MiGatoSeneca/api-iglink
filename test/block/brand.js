var supertest = require("supertest");
var should = require("should");

var apiserver = supertest.agent("http://localhost:3000");

var test_count = 0;

describe("Brand",function(){

  describe("Brand (PUT /:sessionKey/brand/:brand)",function(){

    it("Actualiza la timezone de una brand, devuelve: {status:200,code:BRAND_UPDATED}",function(done){
      var name = Math.floor(Date.now()).toString()+test_count;
      test_count++;
      var email = name+"@fakeemail.com";
      var password = name;
      var brand = name;
      var timezone = 'Europe/Madrid';

      apiserver
        .post("/signup")
        .send({brand:brand, email : email, password : password})
        .expect("Content-type",/json/)
        .end(function(err,res){
          if(res.statusCode != 200){done("/signup "+res.body.message);}
          apiserver
            .post("/login")
            .send({email : email, password : password})
            .expect("Content-type",/json/)
            .end(function(err,res){
              if(res.statusCode != 200){done("/login "+res.body.message);}
              var sessionKey = res.body.data.sessionKey;
              apiserver
                .put("/"+sessionKey+"/brand/"+brand)
                .send({timezone : timezone})
                .expect("Content-type",/json/)
                .end(function(err,res){
                  if(res.statusCode != 200){done("/"+sessionKey+"/brand/"+brand+" "+res.body.message);}
                  res.body.code.should.equal("BRAND_UPDATED");
                  apiserver
                    .get("/"+sessionKey+"/brand/"+brand)
                    .expect("Content-type",/json/)
                    .end(function(err,res){
                      if(res.statusCode != 200){done("/"+sessionKey+"/brand/"+brand+" "+res.body.message);}
                      res.body.data.timezone.should.equal(timezone);
                      done();
                    });
                });
            });
        });
    });

    it("Actualiza la subscription de una brand, devuelve: {status:200,code:BRAND_UPDATED}",function(done){
      var name = Math.floor(Date.now()).toString()+test_count;
      test_count++;
      var email = name+"@fakeemail.com";
      var password = name;
      var brand = name;
      var subscription = 'pro';

      apiserver
        .post("/signup")
        .send({brand:brand, email : email, password : password})
        .expect("Content-type",/json/)
        .end(function(err,res){
          if(res.statusCode != 200){done("/signup "+res.body.message);}
          apiserver
            .post("/login")
            .send({email : email, password : password})
            .expect("Content-type",/json/)
            .end(function(err,res){
              if(res.statusCode != 200){done("/login "+res.body.message);}
              var sessionKey = res.body.data.sessionKey;
              apiserver
                .put("/"+sessionKey+"/brand/"+brand)
                .send({subscription : subscription})
                .expect("Content-type",/json/)
                .end(function(err,res){
                  if(res.statusCode != 200){done("/"+sessionKey+"/brand/"+brand+" "+res.body.message);}
                  res.body.code.should.equal("BRAND_UPDATED");

                  apiserver
                    .get("/"+sessionKey+"/brand/"+brand)
                    .expect("Content-type",/json/)
                    .end(function(err,res){
                      if(res.statusCode != 200){done("/"+sessionKey+"/brand/"+brand+" "+res.body.message);}
                      res.body.data.subscription.should.equal(subscription);
                      done();
                    });
                });
            });
        });
    });

    it("Actualiza la timezone y la subscription de una brand, devuelve: {status:200,code:BRAND_UPDATED}",function(done){
      var name = Math.floor(Date.now()).toString()+test_count;
      test_count++;
      var email = name+"@fakeemail.com";
      var password = name;
      var brand = name;
      var timezone = 'Europe/Madrid';
      var subscription = 'pro';

      apiserver
        .post("/signup")
        .send({brand:brand, email : email, password : password})
        .expect("Content-type",/json/)
        .end(function(err,res){
          if(res.statusCode != 200){done("/signup "+res.body.message);}
          apiserver
            .post("/login")
            .send({email : email, password : password})
            .expect("Content-type",/json/)
            .end(function(err,res){
              if(res.statusCode != 200){done("/login "+res.body.message);}
              var sessionKey = res.body.data.sessionKey;
              apiserver
                .put("/"+sessionKey+"/brand/"+brand)
                .send({subscription : subscription,timezone : timezone})
                .expect("Content-type",/json/)
                .end(function(err,res){
                  if(res.statusCode != 200){done("/"+sessionKey+"/brand/"+brand+" "+res.body.message);}
                  res.body.code.should.equal("BRAND_UPDATED");

                  apiserver
                    .get("/"+sessionKey+"/brand/"+brand)
                    .expect("Content-type",/json/)
                    .end(function(err,res){
                      if(res.statusCode != 200){done("/"+sessionKey+"/brand/"+brand+" "+res.body.message);}
                      res.body.data.timezone.should.equal(timezone);
                      res.body.data.subscription.should.equal(subscription);
                      done();
                    });
                });
            });
        });
    });

    it("Devuelve error para timezone no válida al actualizar, devuelve: {status:401,code:TIMEZONE_FORMAT_NOT_VALID}",function(done){
      var name = Math.floor(Date.now()).toString()+test_count;
      test_count++;
      var email = name+"@fakeemail.com";
      var password = name;
      var brand = name;
      var timezone_fail = 'fail';
      var subscription = 'pro';

      apiserver
        .post("/signup")
        .send({brand:brand, email : email, password : password})
        .expect("Content-type",/json/)
        .end(function(err,res){
          if(res.statusCode != 200){done("/signup "+res.body.message);}
          apiserver
            .post("/login")
            .send({email : email, password : password})
            .expect("Content-type",/json/)
            .end(function(err,res){
              if(res.statusCode != 200){done("/login "+res.body.message);}
              var sessionKey = res.body.data.sessionKey;
              apiserver
                .put("/"+sessionKey+"/brand/"+brand)
                .send({subscription : subscription,timezone : timezone_fail})
                .expect("Content-type",/json/)
                .end(function(err,res){
                  if(res.statusCode != 401){done("/"+sessionKey+"/brand/"+brand+" "+res.body.message);}
                  res.body.code.should.equal("TIMEZONE_FORMAT_NOT_VALID");
                  done();
                });
            });
        });
    });

    it("Devuelve error para subscription no válida al actualizar, devuelve: {status:401,code:SUBSCRIPTION_FORMAT_NOT_VALID}",function(done){
      var name = Math.floor(Date.now()).toString()+test_count;
      test_count++;
      var email = name+"@fakeemail.com";
      var password = name;
      var brand = name;
      var timezone = 'Europe/Madrid';
      var subscription_fail = 'fail';

      apiserver
        .post("/signup")
        .send({brand:brand, email : email, password : password})
        .expect("Content-type",/json/)
        .end(function(err,res){
          if(res.statusCode != 200){done("/signup "+res.body.message);}
          apiserver
            .post("/login")
            .send({email : email, password : password})
            .expect("Content-type",/json/)
            .end(function(err,res){
              if(res.statusCode != 200){done("/login "+res.body.message);}
              var sessionKey = res.body.data.sessionKey;
              apiserver
                .put("/"+sessionKey+"/brand/"+brand)
                .send({subscription : subscription_fail,timezone : timezone})
                .expect("Content-type",/json/)
                .end(function(err,res){
                  if(res.statusCode != 401){done("/"+sessionKey+"/brand/"+brand+" "+res.body.message);}
                  res.body.code.should.equal("SUBSCRIPTION_FORMAT_NOT_VALID");
                  done();
                });
            });
        });
    });

    it("Actualiza los datos de una brand con sessionKey no válida, devuelve: {status:401,code:SESSIONKEY_NOT_VALID}",function(done){
      var name = Math.floor(Date.now()).toString()+test_count;
      test_count++;
      var email = name+"@fakeemail.com";
      var password = name;
      var brand = name;
      var timezone = 'Europe/Madrid';
      var sessionKey_fail = name;

      apiserver
        .post("/signup")
        .send({brand:brand, email : email, password : password})
        .expect("Content-type",/json/)
        .end(function(err,res){
          if(res.statusCode != 200){done("/signup "+res.body.message);}
          apiserver
            .put("/"+sessionKey_fail+"/brand/"+brand)
            .send({timezone : timezone})
            .expect("Content-type",/json/)
            .end(function(err,res){
              if(res.statusCode != 401){done("/"+sessionKey_fail+"/brand/"+brand+" "+res.body.message);}
              res.body.code.should.equal("SESSIONKEY_NOT_VALID");
              done();
            });
        });

    });

    it("Elimina una brand devuelve: {status:200,code:BRAND_DELETED}",function(done){
      var name = Math.floor(Date.now()).toString()+test_count;
      test_count++;
      var email = name+"@fakeemail.com";
      var password = name;
      var brand = name;
      var timezone = 'Europe/Madrid';
      var sessionKey_fail = name;

      apiserver
        .post("/signup")
        .send({brand:brand, email : email, password : password})
        .expect("Content-type",/json/)
        .end(function(err,res){
          if(res.statusCode != 200){done("/signup "+res.body.message);}
          apiserver
            .post("/login")
            .send({email : email, password : password})
            .expect("Content-type",/json/)
            .end(function(err,res){
              if(res.statusCode != 200){done("/login "+res.body.message);}
              var sessionKey = res.body.data.sessionKey;
              apiserver
                .delete("/"+sessionKey+"/brand/"+brand)
                .expect("Content-type",/json/)
                .end(function(err,res){
                  if(res.statusCode != 200){done("/"+sessionKey+"/brand/"+brand+" "+res.body.message);}
                  res.body.code.should.equal("BRAND_DELETED");
                  done();
                });
            });
        });

    });

    it("Elimina una brand erronea devuelve: {status:401,code:SESSIONKEY_NOT_VALID}",function(done){
      var name = Math.floor(Date.now()).toString()+test_count;
      test_count++;
      var email = name+"@fakeemail.com";
      var password = name;
      var brand = name;
      var brand_fail = "fail"+name;
      var timezone = 'Europe/Madrid';
      var sessionKey_fail = name;

      apiserver
        .post("/signup")
        .send({brand:brand, email : email, password : password})
        .expect("Content-type",/json/)
        .end(function(err,res){
          if(res.statusCode != 200){done("/signup "+res.body.message);}
          apiserver
            .post("/login")
            .send({email : email, password : password})
            .expect("Content-type",/json/)
            .end(function(err,res){
              if(res.statusCode != 200){done("/login "+res.body.message);}
              var sessionKey = res.body.data.sessionKey;
              apiserver
                .delete("/"+sessionKey+"/brand/"+brand_fail)
                .expect("Content-type",/json/)
                .end(function(err,res){
                  if(res.statusCode != 401){done("/"+sessionKey+"/brand/"+brand+" "+res.body.message);}
                  res.body.code.should.equal("SESSIONKEY_NOT_VALID");
                  done();
                });
            });
        });

    });

  });

});
