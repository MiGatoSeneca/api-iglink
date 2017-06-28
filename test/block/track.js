var supertest = require("supertest");
var should = require("should");

var apiserver = supertest.agent("http://localhost:3000");

var test_count = 0;

describe("Track",function(){

  describe("Track Session (POST /track/session/:fingerprint/:brand/)",function(){
    this.timeout(5000);

    it("Si fingerprint va vacío devuelve: {error:404,code:NOT_FOUND}",function(done){

      var name = Math.floor(Date.now()).toString()+test_count;
      test_count++;
      var fingerprint = name+"fingerprint";
      var email = name+"@fakeemail.com";
      var password = name;
      var brand = name;

      apiserver
        .get("/track/session//"+brand+"/")
        .expect("Content-type",/json/)
        .end(function(err,res){
          if(res.statusCode != 404){done(res.body.message);}
          res.body.code.should.equal("NOT_FOUND");
          done();
        });
    });
    it("Si brand va vacío devuelve: {error:404,code:NOT_FOUND}",function(done){
      var name = Math.floor(Date.now()).toString()+test_count;
      test_count++;
      var fingerprint = name+"fingerprint";
      var email = name+"@fakeemail.com";
      var password = name;
      var brand = name;

      apiserver
        .get("/track/session/"+fingerprint+"/")
        .expect("Content-type",/json/)
        .end(function(err,res){
          if(res.statusCode != 404){done(res.body.message);}
          res.body.code.should.equal("NOT_FOUND");
          done();
        });
    });


    it("Si el fingerprint tiene formato no válido devuelvedevuelve: {error:401,code:FINGERPRINT_FORMAT_NOT_VALID}",function(done){

      var name = Math.floor(Date.now()).toString()+test_count;
      test_count++;
      var fingerprint_fail = "F41l!"+name+"fingerprint";
      var email = name+"@fakeemail.com";
      var password = name;
      var brand = name;

      apiserver
        .get("/track/session/"+fingerprint_fail+"/"+brand)
        .expect("Content-type",/json/)
        .end(function(err,res){
          if(res.statusCode != 401){done(res.body.message);}
          res.body.code.should.equal("FINGERPRINT_FORMAT_NOT_VALID");
          done();
        });
    });

    it("Si brand tiene formato no válido devuelve: {error:401,code:BRAND_FORMAT_NOT_VALID}",function(done){

      var name = Math.floor(Date.now()).toString()+test_count;
      test_count++;
      var fingerprint = name+"fingerprint";
      var email = name+"@fakeemail.com";
      var password = name;
      var brand_fail = "F41l!"+name;

      apiserver
        .get("/track/session/"+fingerprint+"/"+brand_fail)
        .expect("Content-type",/json/)
        .end(function(err,res){
          if(res.statusCode != 401){done(res.body.message);}
          res.body.code.should.equal("BRAND_FORMAT_NOT_VALID");
          done();
        });
    });


    it("fingerprint llama a sesion, se almacena en la base de datos y devuelve: {status:200,code:SESSION_CREATED}",function(done){
      var name = Math.floor(Date.now()).toString()+test_count;
      test_count++;
      var fingerprint = name+"fingerprint";
      var email = name+"@fakeemail.com";
      var password = name;
      var brand = name;

      apiserver
        .get("/track/session/"+fingerprint+"/"+brand+"/")
        .expect("Content-type",/json/)
        .end(function(err,res){
          if(res.statusCode != 200){done("[/track/session/"+fingerprint+"/"+brand+"/] "+res.body.message);}
          res.body.code.should.equal("SESSION_CREATED");
          done();
        });
    });


    it("fingerprint llama a sesion, se almacena en la base de datos y devuelve para segmento all: {count_users:1, count_sessions:1}",function(done){
      var name = Math.floor(Date.now()).toString()+test_count;
      test_count++;
      var fingerprint = name+"fingerprint";
      var email = name+"@fakeemail.com";
      var password = name;
      var brand = name;

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
                .get("/track/session/"+fingerprint+"/"+brand+"/")
                .expect("Content-type",/json/)
                .end(function(err,res){
                  if(res.statusCode != 200){done("[/track/session/"+fingerprint+"/"+brand+"/] "+res.body.message);}
                  apiserver
                    .get("/track/segment/"+fingerprint+"/"+brand+"/system/all")
                    .expect("Content-type",/json/)
                    .end(function(err,res){
                      if(res.statusCode != 200){done("[/track/session/"+fingerprint+"/"+brand+"/] "+res.body.message);}
                      apiserver
                        .get("/app/"+sessionKey+"/brand/"+brand+"/segment/system/all")
                        .expect("Content-type",/json/)
                        .end(function(err,res){
                          if(res.statusCode != 200){done("[/app/"+sessionKey+"/brand/"+brand+"/segment/system/all] "+res.body.message);}
                          res.body.data.countUsers.should.equal(1);
                          res.body.data.countSessions.should.equal(1);
                          apiserver
                            .delete("/app/"+sessionKey+"/brand/"+brand)
                            .expect("Content-type",/json/)
                            .expect(200)
                            .end(function(err,res){
                              res.statusCode.should.equal(200);
                              done();
                            });
                        });
                    });
                });
            });
        });
    });

    it("fingerprint llama a sesion 2 veces, se almacena en la base de datos y devuelve para segmento all: {count_users:1, count_sessions:2}",function(done){
      var name = Math.floor(Date.now()).toString()+test_count;
      test_count++;
      var fingerprint = name+"fingerprint";
      var email = name+"@fakeemail.com";
      var password = name;
      var brand = name;

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
                .get("/track/session/"+fingerprint+"/"+brand+"/")
                .expect("Content-type",/json/)
                .end(function(err,res){
                  if(res.statusCode != 200){done("[/track/session/"+fingerprint+"/"+brand+"/] "+res.body.message);}
                  apiserver
                    .get("/track/session/"+fingerprint+"/"+brand+"/")
                    .expect("Content-type",/json/)
                    .end(function(err,res){
                      if(res.statusCode != 200){done("[/track/session/"+fingerprint+"/"+brand+"/] "+res.body.message);}
                      apiserver
                        .get("/track/segment/"+fingerprint+"/"+brand+"/system/all")
                        .expect("Content-type",/json/)
                        .end(function(err,res){
                          if(res.statusCode != 200){done("[/track/session/"+fingerprint+"/"+brand+"/] "+res.body.message);}
                          apiserver
                            .get("/app/"+sessionKey+"/brand/"+brand+"/segment/system/all")
                            .expect("Content-type",/json/)
                            .end(function(err,res){
                              if(res.statusCode != 200){done("[/app/"+sessionKey+"/brand/"+brand+"/segment/system/all] "+res.body.message);}
                              res.body.data.countUsers.should.equal(1);
                              res.body.data.countSessions.should.equal(2);
                              apiserver
                                .delete("/app/"+sessionKey+"/brand/"+brand)
                                .expect("Content-type",/json/)
                                .expect(200)
                                .end(function(err,res){
                                  res.statusCode.should.equal(200);
                                  done();
                                });
                            });
                        });
                    });
                });
            });
        });
    });


    it("fingerprint_1 llama a sesion 2 veces y fingerprint_2 llama a sesion 1 vez, se almacena en la base de datos y devuelve para segmento all: {count_users:2, count_sessions:3}",function(done){
      var name = Math.floor(Date.now()).toString()+test_count;
      test_count++;
      var fingerprint_1 = "1"+name+"fingerprint";
      var fingerprint_2 = "2"+name+"fingerprint";
      var email = name+"@fakeemail.com";
      var password = name;
      var brand = name;

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
                .get("/track/session/"+fingerprint_1+"/"+brand+"/")
                .expect("Content-type",/json/)
                .end(function(err,res){
                  if(res.statusCode != 200){done("[/track/session/"+fingerprint_1+"/"+brand+"/] "+res.body.message);}
                  apiserver
                    .get("/track/session/"+fingerprint_1+"/"+brand+"/")
                    .expect("Content-type",/json/)
                    .end(function(err,res){
                      if(res.statusCode != 200){done("[/track/session/"+fingerprint_1+"/"+brand+"/] "+res.body.message);}
                      apiserver
                        .get("/track/session/"+fingerprint_2+"/"+brand+"/")
                        .expect("Content-type",/json/)
                        .end(function(err,res){
                          if(res.statusCode != 200){done("[/track/session/"+fingerprint_2+"/"+brand+"/] "+res.body.message);}
                          apiserver
                            .get("/track/segment/"+fingerprint_1+"/"+brand+"/system/all")
                            .expect("Content-type",/json/)
                            .end(function(err,res){
                              if(res.statusCode != 200){done("[/track/session/"+fingerprint_2+"/"+brand+"/] "+res.body.message);}
                              apiserver
                                .get("/track/segment/"+fingerprint_2+"/"+brand+"/system/all")
                                .expect("Content-type",/json/)
                                .end(function(err,res){
                                  if(res.statusCode != 200){done("[/track/session/"+fingerprint_2+"/"+brand+"/] "+res.body.message);}
                                  apiserver
                                    .get("/app/"+sessionKey+"/brand/"+brand+"/segment/system/all")
                                    .expect("Content-type",/json/)
                                    .end(function(err,res){
                                      if(res.statusCode != 200){done("[/app/"+sessionKey+"/brand/"+brand+"/segment/system/all] "+res.body.message);}
                                      res.body.data.countUsers.should.equal(2);
                                      res.body.data.countSessions.should.equal(3);
                                      apiserver
                                        .delete("/app/"+sessionKey+"/brand/"+brand)
                                        .expect("Content-type",/json/)
                                        .expect(200)
                                        .end(function(err,res){
                                          res.statusCode.should.equal(200);
                                          done();
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    });

  });
  describe("Track Segment (POST /track/segment/:fingerprint/:brand/:type/:slug)",function(){

    this.timeout(5000);

    it("Si fingerprint va vacío devuelve: {status:404,code:NOT_FOUND}",function(done){

      var name = Math.floor(Date.now()).toString()+test_count;
      test_count++;
      var fingerprint = name+"fingerprint";
      var email = name+"@fakeemail.com";
      var password = name;
      var brand = name;
      var type = name+"type";
      var slug = name+"slug";

      apiserver
        .get("/track/segment//"+brand+"/"+type+"/"+slug)
        .expect("Content-type",/json/)
        .end(function(err,res){
          if(res.statusCode != 404){done(res.body.message);}
          res.body.code.should.equal("NOT_FOUND");
          done();
        });
    });

    it("Si brand va vacío devuelve: {status:404,code:NOT_FOUND}",function(done){

      var name = Math.floor(Date.now()).toString()+test_count;
      test_count++;
      var fingerprint = name+"fingerprint";
      var email = name+"@fakeemail.com";
      var password = name;
      var brand = name;
      var type = name+"type";
      var slug = name+"slug";

      apiserver
        .get("/track/segment/"+fingerprint+"//"+type+"/"+slug)
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
      var fingerprint = name+"fingerprint";
      var email = name+"@fakeemail.com";
      var password = name;
      var brand = name;
      var type = name+"type";
      var slug = name+"slug";

      apiserver
        .get("/track/segment/"+fingerprint+"/"+brand+"//"+slug)
        .expect("Content-type",/json/)
        .end(function(err,res){
          if(res.statusCode != 404){done(res.body.message);}
          res.body.code.should.equal("NOT_FOUND");
          done();
        });
    });

    it("Si slug va vacío devuelve: {status:404,code:NOT_FOUND}",function(done){

      var name = Math.floor(Date.now()).toString()+test_count;
      test_count++;
      var fingerprint = name+"fingerprint";
      var email = name+"@fakeemail.com";
      var password = name;
      var brand = name;
      var type = name+"type";
      var slug = name+"slug";

      apiserver
        .get("/track/segment/"+fingerprint+"/"+brand+"/"+type)
        .expect("Content-type",/json/)
        .end(function(err,res){
          if(res.statusCode != 404){done(res.body.message);}
          res.body.code.should.equal("NOT_FOUND");
          done();
        });
    });

    it("Si fingerprint tiene formato no válido devuelve: {status:401,code:FINGERPRINT_FORMAT_NOT_VALID}",function(done){

      var name = Math.floor(Date.now()).toString()+test_count;
      test_count++;
      var fingerprint_fail = "F41l!"+name+"fingerprint";
      var email = name+"@fakeemail.com";
      var password = name;
      var brand = name;
      var type = name+"type";
      var slug = name+"slug";

      apiserver
        .get("/track/segment/"+fingerprint_fail+"/"+brand+"/"+type+"/"+slug)
        .expect("Content-type",/json/)
        .end(function(err,res){
          if(res.statusCode != 401){done(res.body.message);}
          res.body.code.should.equal("FINGERPRINT_FORMAT_NOT_VALID");
          done();
        });
    });

    it("Si brand tiene formato no válido devuelve: {status:401,code:BRAND_FORMAT_NOT_VALID}",function(done){

      var name = Math.floor(Date.now()).toString()+test_count;
      test_count++;
      var fingerprint = name+"fingerprint";
      var email = name+"@fakeemail.com";
      var password = name;
      var brand_fail = "F41l!"+name;
      var type = name+"type";
      var slug = name+"slug";

      apiserver
        .get("/track/segment/"+fingerprint+"/"+brand_fail+"/"+type+"/"+slug)
        .expect("Content-type",/json/)
        .end(function(err,res){
          if(res.statusCode != 401){done(res.body.message);}
          res.body.code.should.equal("BRAND_FORMAT_NOT_VALID");
          done();
        });
    });

    it("Si type tiene formato no válido devuelve: {status:401,code:SEGMENT_TYPE_FORMAT_NOT_VALID}",function(done){

      var name = Math.floor(Date.now()).toString()+test_count;
      test_count++;
      var fingerprint = name+"fingerprint";
      var email = name+"@fakeemail.com";
      var password = name;
      var brand = name;
      var type_fail = "F41l!"+name+"type";
      var slug = name+"slug";

      apiserver
        .get("/track/segment/"+fingerprint+"/"+brand+"/"+type_fail+"/"+slug)
        .expect("Content-type",/json/)
        .end(function(err,res){
          if(res.statusCode != 401){done(res.body.message);}
          res.body.code.should.equal("SEGMENT_TYPE_FORMAT_NOT_VALID");
          done();
        });
    });

    it("Si slug tiene formato no válido devuelve: {status:401,code:SEGMENT_SLUG_FORMAT_NOT_VALID}",function(done){

      var name = Math.floor(Date.now()).toString()+test_count;
      test_count++;
      var fingerprint = name+"fingerprint";
      var email = name+"@fakeemail.com";
      var password = name;
      var brand = name;
      var type = name+"type";
      var slug_fail = "F41l!"+name+"slug";

      apiserver
        .get("/track/segment/"+fingerprint+"/"+brand+"/"+type+"/"+slug_fail)
        .expect("Content-type",/json/)
        .end(function(err,res){
          if(res.statusCode != 401){done(res.body.message);}
          res.body.code.should.equal("SEGMENT_SLUG_FORMAT_NOT_VALID");
          done();
        });
    });

    it("Al añadir un usuario al segmento devuelve: {status:200, code:SEGMENT_CREATED}",function(done){
      var name = Math.floor(Date.now()).toString()+test_count;
      test_count++;
      var fingerprint = name+"fingerprint";
      var email = name+"@fakeemail.com";
      var password = name;
      var brand = name;
      var type = name+"type";
      var slug = name+"slug";

      apiserver
        .get("/track/segment/"+fingerprint+"/"+brand+"/"+type+"/"+slug)
        .expect("Content-type",/json/)
        .end(function(err,res){
          if(res.statusCode != 200){done("[/track/segment/"+fingerprint+"/"+brand+"/"+type+"/"+slug+"] "+res.body.message);}
          res.body.code.should.equal("SEGMENT_CREATED");
          done();
        });
    });


    it("fingerprint_1 llama a sesion 1 vez y llama a segmento, fingerprint_2 llama a sesion 1 vez, se almacena en la base de datos y devuelve para ese segmento: {count_users:1, count_sessions:1}",function(done){
      var name = Math.floor(Date.now()).toString()+test_count;
      test_count++;
      var fingerprint_1 = "1"+name+"fingerprint";
      var fingerprint_2 = "2"+name+"fingerprint";
      var email = name+"@fakeemail.com";
      var password = name;
      var brand = name;
      var type = name+"type";
      var slug = name+"slug";

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
                .get("/track/session/"+fingerprint_1+"/"+brand+"/")
                .expect("Content-type",/json/)
                .end(function(err,res){
                  if(res.statusCode != 200){done("[/track/session/"+fingerprint_1+"/"+brand+"/] "+res.body.message);}
                  apiserver
                    .get("/track/segment/"+fingerprint_1+"/"+brand+"/"+type+"/"+slug)
                    .expect("Content-type",/json/)
                    .end(function(err,res){
                      if(res.statusCode != 200){done("[/track/segment/"+fingerprint_1+"/"+brand+"/"+type+"/"+slug+"] "+res.body.message);}
                      apiserver
                        .get("/track/session/"+fingerprint_2+"/"+brand+"/")
                        .expect("Content-type",/json/)
                        .end(function(err,res){
                          if(res.statusCode != 200){done("[/track/segment/"+fingerprint_1+"/"+brand+"/"+type+"/"+slug+"] "+res.body.message);}
                          apiserver
                            .get("/app/"+sessionKey+"/brand/"+brand+"/segment/"+type+"/"+slug)
                            .expect("Content-type",/json/)
                            .end(function(err,res){
                              if(res.statusCode != 200){done("[/app/"+sessionKey+"/brand/"+brand+"/segment/"+type+"/"+slug+"] "+res.body.message);}
                              res.body.data.countUsers.should.equal(1);
                              res.body.data.countSessions.should.equal(1);
                              apiserver
                                .delete("/app/"+sessionKey+"/brand/"+brand)
                                .expect("Content-type",/json/)
                                .expect(200)
                                .end(function(err,res){
                                  res.statusCode.should.equal(200);
                                  done();
                                });
                            });
                        });
                    });
                });
            });
        });
    });



    it("fingerprint_1 llama a sesion 2 veces y llama a segmento, fingerprint_2 llama a sesion 1 vez, se almacena en la base de datos y devuelve para ese segmento: {count_users:1, count_sessions:2}",function(done){
      var name = Math.floor(Date.now()).toString()+test_count;
      test_count++;
      var fingerprint_1 = "1"+name+"fingerprint";
      var fingerprint_2 = "2"+name+"fingerprint";
      var email = name+"@fakeemail.com";
      var password = name;
      var brand = name;
      var type = name+"type";
      var slug = name+"slug";

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
                .get("/track/session/"+fingerprint_1+"/"+brand+"/")
                .expect("Content-type",/json/)
                .end(function(err,res){
                  if(res.statusCode != 200){done("[/track/session/"+fingerprint_1+"/"+brand+"/] "+res.body.message);}
                  apiserver
                    .get("/track/segment/"+fingerprint_1+"/"+brand+"/"+type+"/"+slug)
                    .expect("Content-type",/json/)
                    .end(function(err,res){
                      if(res.statusCode != 200){done("[/track/segment/"+fingerprint_1+"/"+brand+"/"+type+"/"+slug+"] "+res.body.message);}
                      apiserver
                        .get("/track/session/"+fingerprint_2+"/"+brand+"/")
                        .expect("Content-type",/json/)
                        .end(function(err,res){
                          if(res.statusCode != 200){done("[/track/session/"+fingerprint_2+"/"+brand+"/] "+res.body.message);}
                          apiserver
                            .get("/track/session/"+fingerprint_1+"/"+brand+"/")
                            .expect("Content-type",/json/)
                            .end(function(err,res){
                              if(res.statusCode != 200){done("[/track/session/"+fingerprint_1+"/"+brand+"/] "+res.body.message);}
                              apiserver
                                .get("/app/"+sessionKey+"/brand/"+brand+"/segment/"+type+"/"+slug)
                                .expect("Content-type",/json/)
                                .end(function(err,res){
                                  if(res.statusCode != 200){done("[/app/"+sessionKey+"/brand/"+brand+"/segment/"+type+"/"+slug+"] "+res.body.message);}
                                  res.body.data.countUsers.should.equal(1);
                                  res.body.data.countSessions.should.equal(2);
                                  apiserver
                                    .delete("/app/"+sessionKey+"/brand/"+brand)
                                    .expect("Content-type",/json/)
                                    .expect(200)
                                    .end(function(err,res){
                                      res.statusCode.should.equal(200);
                                      done();
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    });


    it("fingerprint_1 llama a sesion 2 veces y llama a segmento all 2 veces, llama a segmento 2 veces, fingerprint_2 llama a sesion 1 vez y a all 1 vez, se almacena en la base de datos y devuelve para ese segmento: {count_users:1, count_sessions:2}, para all:  {count_users:2, count_sessions:3}",function(done){
      var name = Math.floor(Date.now()).toString()+test_count;
      test_count++;
      var fingerprint_1 = "1"+name+"fingerprint";
      var fingerprint_2 = "2"+name+"fingerprint";
      var email = name+"@fakeemail.com";
      var password = name;
      var brand = name;
      var type = name+"type";
      var slug = name+"slug";

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
                .get("/track/session/"+fingerprint_1+"/"+brand+"/")
                .expect("Content-type",/json/)
                .end(function(err,res){
                  if(res.statusCode != 200){done("[/track/session/"+fingerprint_1+"/"+brand+"/] "+res.body.message);}
                  apiserver
                    .get("/track/segment/"+fingerprint_1+"/"+brand+"/system/all")
                    .expect("Content-type",/json/)
                    .end(function(err,res){
                      if(res.statusCode != 200){done("[/track/segment/"+fingerprint_1+"/"+brand+"/"+type+"/"+slug+"] "+res.body.message);}
                      apiserver
                        .get("/track/session/"+fingerprint_2+"/"+brand+"/")
                        .expect("Content-type",/json/)
                        .end(function(err,res){
                          if(res.statusCode != 200){done("[/track/session/"+fingerprint_2+"/"+brand+"/] "+res.body.message);}
                          apiserver
                          .get("/track/segment/"+fingerprint_2+"/"+brand+"/system/all")
                            .expect("Content-type",/json/)
                            .end(function(err,res){
                              if(res.statusCode != 200){done("[/track/session/"+fingerprint_1+"/"+brand+"/] "+res.body.message);}
                              apiserver
                                .get("/track/session/"+fingerprint_1+"/"+brand+"/")
                                .expect("Content-type",/json/)
                                .end(function(err,res){
                                  if(res.statusCode != 200){done("[/track/session/"+fingerprint_1+"/"+brand+"/] "+res.body.message);}
                                  apiserver
                                    .get("/track/segment/"+fingerprint_1+"/"+brand+"/system/all")
                                    .expect("Content-type",/json/)
                                    .end(function(err,res){
                                      if(res.statusCode != 200){done("[/track/session/"+fingerprint_1+"/"+brand+"/] "+res.body.message);}
                                      apiserver
                                        .get("/track/segment/"+fingerprint_1+"/"+brand+"/"+type+"/"+slug)
                                        .expect("Content-type",/json/)
                                        .end(function(err,res){
                                          if(res.statusCode != 200){done("[/track/session/"+fingerprint_1+"/"+brand+"/] "+res.body.message);}

                                          apiserver
                                            .get("/app/"+sessionKey+"/brand/"+brand+"/segment/"+type+"/"+slug)
                                            .expect("Content-type",/json/)
                                            .end(function(err,res){
                                              if(res.statusCode != 200){done("[/app/"+sessionKey+"/brand/"+brand+"/segment/"+type+"/"+slug+"] "+res.body.message);}
                                              res.body.data.countUsers.should.equal(1);
                                              res.body.data.countSessions.should.equal(2);
                                              apiserver
                                                .get("/app/"+sessionKey+"/brand/"+brand+"/segment/system/all")
                                                .expect("Content-type",/json/)
                                                .end(function(err,res){
                                                  if(res.statusCode != 200){done("[/app/"+sessionKey+"/brand/"+brand+"/segment/"+type+"/"+slug+"] "+res.body.message);}
                                                  res.body.data.countUsers.should.equal(2);
                                                  res.body.data.countSessions.should.equal(3);
                                                  apiserver
                                                    .delete("/app/"+sessionKey+"/brand/"+brand)
                                                    .expect("Content-type",/json/)
                                                    .expect(200)
                                                    .end(function(err,res){
                                                      res.statusCode.should.equal(200);
                                                      done();
                                                    });
                                                });
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    });



  });

  describe("Track Conversion (POST /track/conversion/:fingerprint/:brand/:slug)",function(){

    this.timeout(5000);

    it("Si fingerprint va vacío devuelve: {status:404,code:NOT_FOUND}",function(done){

      var name = Math.floor(Date.now()).toString()+test_count;
      test_count++;
      var fingerprint = name+"fingerprint";
      var email = name+"@fakeemail.com";
      var password = name;
      var brand = name;
      var slug = name+"slug";

      apiserver
        .get("/track/conversion//"+brand+"/"+slug)
        .expect("Content-type",/json/)
        .end(function(err,res){
          if(res.statusCode != 404){done(res.body.message);}
          res.body.code.should.equal("NOT_FOUND");
          done();
        });
    });

    it("Si brand va vacío devuelve: {status:404,code:NOT_FOUND}",function(done){

      var name = Math.floor(Date.now()).toString()+test_count;
      test_count++;
      var fingerprint = name+"fingerprint";
      var email = name+"@fakeemail.com";
      var password = name;
      var brand = name;
      var slug = name+"slug";

      apiserver
        .get("/track/conversion/"+fingerprint+"//"+slug)
        .expect("Content-type",/json/)
        .end(function(err,res){
          if(res.statusCode != 404){done(res.body.message);}
          res.body.code.should.equal("NOT_FOUND");
          done();
        });
    });

    it("Si slug va vacío devuelve: {status:404,code:NOT_FOUND}",function(done){

      var name = Math.floor(Date.now()).toString()+test_count;
      test_count++;
      var fingerprint = name+"fingerprint";
      var email = name+"@fakeemail.com";
      var password = name;
      var brand = name;
      var slug = name+"slug";

      apiserver
        .get("/track/conversion/"+fingerprint+"/"+brand+"/")
        .expect("Content-type",/json/)
        .end(function(err,res){
          if(res.statusCode != 404){done(res.body.message);}
          res.body.code.should.equal("NOT_FOUND");
          done();
        });
    });


    it("Si fingerprint tiene formato no válido devuelve: {status:401,code:FINGERPRINT_FORMAT_NOT_VALID}",function(done){

      var name = Math.floor(Date.now()).toString()+test_count;
      test_count++;
      var fingerprint_fail = "F41l!"+name+"fingerprint";
      var email = name+"@fakeemail.com";
      var password = name;
      var brand = name;
      var slug = name+"slug";

      apiserver
        .get("/track/conversion/"+fingerprint_fail+"/"+brand+"/"+slug)
        .expect("Content-type",/json/)
        .end(function(err,res){
          if(res.statusCode != 401){done(res.body.message);}
          res.body.code.should.equal("FINGERPRINT_FORMAT_NOT_VALID");
          done();
        });
    });

    it("Si brand tiene formato no válido devuelve: {status:401,code:BRAND_FORMAT_NOT_VALID}",function(done){

      var name = Math.floor(Date.now()).toString()+test_count;
      test_count++;
      var fingerprint = name+"fingerprint";
      var email = name+"@fakeemail.com";
      var password = name;
      var brand_fail = "F41l!"+name;
      var slug = name+"slug";

      apiserver
        .get("/track/conversion/"+fingerprint+"/"+brand_fail+"/"+slug)
        .expect("Content-type",/json/)
        .end(function(err,res){
          if(res.statusCode != 401){done(res.body.message);}
          res.body.code.should.equal("BRAND_FORMAT_NOT_VALID");
          done();
        });
    });

    it("Si slug tiene formato no válido devuelve: {status:401,code:CONVERSION_SLUG_FORMAT_NOT_VALID}",function(done){

      var name = Math.floor(Date.now()).toString()+test_count;
      test_count++;
      var fingerprint = name+"fingerprint";
      var email = name+"@fakeemail.com";
      var password = name;
      var brand = name;
      var slug_fail = "F41l!"+name+"slug";

      apiserver
        .get("/track/conversion/"+fingerprint+"/"+brand+"/"+slug_fail)
        .expect("Content-type",/json/)
        .end(function(err,res){
          if(res.statusCode != 401){done(res.body.message);}
          res.body.code.should.equal("CONVERSION_SLUG_FORMAT_NOT_VALID");
          done();
        });
    });

    it("Al añadir un usuario a la conversion devuelve: {status:200, code:CONVERSION_CREATED}",function(done){
      var name = Math.floor(Date.now()).toString()+test_count;
      test_count++;
      var fingerprint = name+"fingerprint";
      var email = name+"@fakeemail.com";
      var password = name;
      var brand = name;
      var slug = name+"slug";

      apiserver
        .get("/track/conversion/"+fingerprint+"/"+brand+"/"+slug)
        .expect("Content-type",/json/)
        .end(function(err,res){
          if(res.statusCode != 200){done("[/track/conversion/"+fingerprint+"/"+brand+"/"+slug+"] "+res.body.message);}
          res.body.code.should.equal("CONVERSION_CREATED");
          done();
        });
    });

    it("fingerprint_1 llama a sesion 2 veces y llama a segmento all 2 veces, llama a segmento 2 veces,llama a conversion 2 veces, fingerprint_2 llama a sesion 1 vez y a all 1 vez, se almacena en la base de datos y devuelve para ese segmento: {countUsers:1, countUserConverted:1, countConversions:2, countSessions:2}, para all:  {countUsers:2, countUserConverted:1, countConversions:2, countSessions:3}",function(done){
      var name = Math.floor(Date.now()).toString()+test_count;
      test_count++;
      var fingerprint_1 = "1"+name+"fingerprint";
      var fingerprint_2 = "2"+name+"fingerprint";
      var email = name+"@fakeemail.com";
      var password = name;
      var brand = name;
      var type = name+"type";
      var slug = name+"slug";
      var conversion_slug = name+"conversion_slug";

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
                .get("/track/session/"+fingerprint_1+"/"+brand+"/")
                .expect("Content-type",/json/)
                .end(function(err,res){
                  if(res.statusCode != 200){done("[/track/session/"+fingerprint_1+"/"+brand+"/] "+res.body.message);}
                  apiserver
                    .get("/track/segment/"+fingerprint_1+"/"+brand+"/system/all")
                    .expect("Content-type",/json/)
                    .end(function(err,res){
                      if(res.statusCode != 200){done("[/track/segment/"+fingerprint_1+"/"+brand+"/"+type+"/"+slug+"] "+res.body.message);}
                      apiserver
                        .get("/track/session/"+fingerprint_2+"/"+brand+"/")
                        .expect("Content-type",/json/)
                        .end(function(err,res){
                          if(res.statusCode != 200){done("[/track/session/"+fingerprint_2+"/"+brand+"/] "+res.body.message);}
                          apiserver
                          .get("/track/segment/"+fingerprint_2+"/"+brand+"/system/all")
                            .expect("Content-type",/json/)
                            .end(function(err,res){
                              if(res.statusCode != 200){done("[/track/session/"+fingerprint_1+"/"+brand+"/] "+res.body.message);}
                              apiserver
                                .get("/track/session/"+fingerprint_1+"/"+brand+"/")
                                .expect("Content-type",/json/)
                                .end(function(err,res){
                                  if(res.statusCode != 200){done("[/track/session/"+fingerprint_1+"/"+brand+"/] "+res.body.message);}
                                  apiserver
                                    .get("/track/segment/"+fingerprint_1+"/"+brand+"/system/all")
                                    .expect("Content-type",/json/)
                                    .end(function(err,res){
                                      if(res.statusCode != 200){done("[/track/session/"+fingerprint_1+"/"+brand+"/] "+res.body.message);}
                                      apiserver
                                        .get("/track/conversion/"+fingerprint_1+"/"+brand+"/"+conversion_slug)
                                        .expect("Content-type",/json/)
                                        .end(function(err,res){
                                          if(res.statusCode != 200){done("[//track/conversion/"+fingerprint_1+"/"+brand+"/"+conversion_slug+"/] "+res.body.message);}
                                          apiserver
                                            .get("/track/conversion/"+fingerprint_1+"/"+brand+"/"+conversion_slug)
                                            .expect("Content-type",/json/)
                                            .end(function(err,res){
                                              if(res.statusCode != 200){done("[/track/conversion/"+fingerprint_1+"/"+brand+"/"+conversion_slug+"/] "+res.body.message);}
                                              apiserver
                                                .get("/track/segment/"+fingerprint_1+"/"+brand+"/"+type+"/"+slug)
                                                .expect("Content-type",/json/)
                                                .end(function(err,res){
                                                  if(res.statusCode != 200){done("[/track/session/"+fingerprint_1+"/"+brand+"/] "+res.body.message);}
                                                  apiserver
                                                    .get("/app/"+sessionKey+"/brand/"+brand+"/segment/"+type+"/"+slug)
                                                    .expect("Content-type",/json/)
                                                    .end(function(err,res){
                                                      if(res.statusCode != 200){done("[/app/"+sessionKey+"/brand/"+brand+"/segment/"+type+"/"+slug+"] "+res.body.message);}
                                                      res.body.data.countUsers.should.equal(1);
                                                      res.body.data.countSessions.should.equal(2);
                                                      res.body.data.countConversions.should.equal(2);
                                                      res.body.data.countUserConverted.should.equal(1);
                                                      apiserver
                                                        .get("/app/"+sessionKey+"/brand/"+brand+"/segment/system/all")
                                                        .expect("Content-type",/json/)
                                                        .end(function(err,res){
                                                          if(res.statusCode != 200){done("[/app/"+sessionKey+"/brand/"+brand+"/segment/"+type+"/"+slug+"] "+res.body.message);}
                                                          res.body.data.countUsers.should.equal(2);
                                                          res.body.data.countSessions.should.equal(3);
                                                          res.body.data.countConversions.should.equal(2);
                                                          res.body.data.countUserConverted.should.equal(1);
                                                          apiserver
                                                            .delete("/app/"+sessionKey+"/brand/"+brand)
                                                            .expect("Content-type",/json/)
                                                            .expect(200)
                                                            .end(function(err,res){
                                                              res.statusCode.should.equal(200);
                                                              done();
                                                            });
                                                        });
                                                    });
                                                });
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    });

  });

});
