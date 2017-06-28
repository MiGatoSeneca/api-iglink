var supertest = require("supertest");
var should = require("should");

var apiserver = supertest.agent("http://localhost:3000");

var test_count = 0;

describe("Access",function(){

  describe("Signup (GET /signup)",function(){

    it("Dar de alta una nueva cuenta devuelve: {status:200 , code: BRAND_IS_MISSING}",function(done){
      var name = Math.floor(Date.now()).toString()+test_count;
      test_count++;
      var email = name+"@fakeemail.com";
      var password = name;
      var brand = name;

      apiserver
        .post("/signup")
        .send({brand:brand, email : email, password : password})
        .expect("Content-type",/json/)
        .end(function(err,res){
          if(res.statusCode != 200){done(res.body.message);}
          res.body.code.should.equal("ADMIN_&_BRAND_CREATED");
          done();

        });
    });

    it("Dar de alta una nueva cuenta sin email: {status:401 , code: EMAIL_IS_MISSING}",function(done){
      var name = Math.floor(Date.now()).toString()+test_count;
      test_count++;
      var password = name;
      var brand = name;

      apiserver
        .post("/signup")
        .send({brand:brand, password : password})
        .expect("Content-type",/json/)
        .end(function(err,res){
          if(res.statusCode != 401){done(res.body.message);}
          res.body.code.should.equal("EMAIL_IS_MISSING");
          done();

        });
    });


    it("Dar de alta una nueva cuenta sin password: {status:401 , code:BRAND_IS_MISSING}",function(done){
      var name = Math.floor(Date.now()).toString()+test_count;
      test_count++;
      var email = name+"@fakeemail.com";
      var password = name;

      apiserver
        .post("/signup")
        .send({email : email, password : password})
        .expect("Content-type",/json/)
        .end(function(err,res){
          if(res.statusCode != 401){done(res.body.message);}
          res.body.code.should.equal("BRAND_IS_MISSING");
          done();

        });
    });

    it("Dar de alta una nueva cuenta sin password: {status:401 , code: PASSWORD_IS_MISSING}",function(done){
      var name = Math.floor(Date.now()).toString()+test_count;
      test_count++;
      var email = name+"@fakeemail.com";
      var brand = name;

      apiserver
        .post("/signup")
        .send({brand:brand, email : email})
        .expect("Content-type",/json/)
        .end(function(err,res){
          if(res.statusCode != 401){done(res.body.message);}
          res.body.code.should.equal("PASSWORD_IS_MISSING");
          done();

        });
    });


    it("Dar de alta una nueva cuenta con email duplicado: {status:401 , code: EMAIL_IN_USE}",function(done){
      var name = Math.floor(Date.now()).toString()+test_count;
      test_count++;
      var email = name+"@fakeemail.com";
      var password = name;
      var brand = name;

      apiserver
        .post("/signup")
        .send({brand:brand, email : email, password : password})
        .expect("Content-type",/json/)
        .end(function(err,res){
          if(res.statusCode != 200){done(res.body.message);}
          apiserver
            .post("/signup")
            .send({brand:brand, email : email, password : password})
            .expect("Content-type",/json/)
            .end(function(err,res){
              if(res.statusCode != 401){done(res.body.message);}
              res.body.code.should.equal("EMAIL_IN_USE");
              done();
            });

        });
    });


    it("Dar de alta una nueva cuenta con brand duplicado: {status:401 , code: BRAND_IN_USE}",function(done){
      var name = Math.floor(Date.now()).toString()+test_count;
      test_count++;
      var email1 = name+"1@fakeemail.com";
      var email2 = name+"2@fakeemail.com";
      var password = name;
      var brand = name;

      apiserver
        .post("/signup")
        .send({brand:brand, email : email1, password : password})
        .expect("Content-type",/json/)
        .end(function(err,res){
          if(res.statusCode != 200){done(res.body.message);}
          apiserver
            .post("/signup")
            .send({brand:brand, email : email2, password : password})
            .expect("Content-type",/json/)
            .end(function(err,res){
              if(res.statusCode != 401){done(res.body.message);}
              res.body.code.should.equal("BRAND_IN_USE");
              done();
            });
        });
    });

    it("Dar de alta una nueva cuenta y logearse devuelve {status:200 , sessionKey: xxxx}",function(done){
      var name = Math.floor(Date.now()).toString()+test_count;
      test_count++;
      var email = name+"@fakeemail.com";
      var password = name;
      var brand = name;

      apiserver
        .post("/signup")
        .send({brand:brand, email : email, password : password})
        .expect("Content-type",/json/)
        .end(function(err,res){
          if(res.statusCode != 200){done(res.body.message);}
          apiserver
            .post("/login")
            .send({email : email, password : password})
            .expect("Content-type",/json/)
            .end(function(err,res){
              if(res.statusCode != 200){done(res.body.message);}
              res.body.data.should.have.property('sessionKey');
              done();
            });
        });
    });

    it("Dar de alta una nueva cuenta y logearse mal con email {status:401 , code: EMAIL_OR_PASSWORD_NOT_VALID}",function(done){
      var name = Math.floor(Date.now()).toString()+test_count;
      test_count++;
      var email = name+"@fakeemail.com";
      var email_fail = "fail"+name+"@fakeemail.com";
      var password = name;
      var brand = name;

      apiserver
        .post("/signup")
        .send({brand:brand, email : email, password : password})
        .expect("Content-type",/json/)
        .end(function(err,res){
          if(res.statusCode != 200){done(res.body.message);}
          apiserver
            .post("/login")
            .send({email : email_fail, password : password})
            .expect("Content-type",/json/)
            .end(function(err,res){
              if(res.statusCode != 401){done(res.body.message);}
              res.body.code.should.equal("EMAIL_OR_PASSWORD_NOT_VALID");
              done();
            });
        });
    });

    it("Dar de alta una nueva cuenta y logearse mal con password {status:401 , code: EMAIL_OR_PASSWORD_NOT_VALID}",function(done){
      var name = Math.floor(Date.now()).toString()+test_count;
      test_count++;
      var email = name+"@fakeemail.com";
      var password = name;
      var password_fail = "fail"+name;
      var brand = name;

      apiserver
        .post("/signup")
        .send({brand:brand, email : email, password : password})
        .expect("Content-type",/json/)
        .end(function(err,res){
          if(res.statusCode != 200){done(res.body.message);}
          apiserver
            .post("/login")
            .send({email : email, password : password_fail})
            .expect("Content-type",/json/)
            .end(function(err,res){
              if(res.statusCode != 401){done(res.body.message);}
              res.body.code.should.equal("EMAIL_OR_PASSWORD_NOT_VALID");
              done();
            });
        });
    });

    it("Dar de alta una nueva cuenta y logearse mal con password y conrtaseña {status:401 , code: EMAIL_OR_PASSWORD_NOT_VALID}",function(done){
      var name = Math.floor(Date.now()).toString()+test_count;
      test_count++;
      var email = name+"@fakeemail.com";
      var email_fail = "fail"+name+"@fakeemail.com";
      var password = name;
      var password_fail = "fail"+name;
      var brand = name;

      apiserver
        .post("/signup")
        .send({brand:brand, email : email, password : password})
        .expect("Content-type",/json/)
        .end(function(err,res){
          if(res.statusCode != 200){done(res.body.message);}
          apiserver
            .post("/login")
            .send({email : email_fail, password : password_fail})
            .expect("Content-type",/json/)
            .end(function(err,res){
              if(res.statusCode != 401){done(res.body.message);}
              res.body.code.should.equal("EMAIL_OR_PASSWORD_NOT_VALID");
              done();
            });
        });
    });


  });


});
