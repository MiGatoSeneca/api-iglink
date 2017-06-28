var supertest = require("supertest");
var should = require("should");
var randomstring = require("randomstring");

// This agent refers to PORT where program is running.

var server = supertest.agent("http://localhost:3000");

// UNIT test begin

describe("Nothing to test",function(){
  describe("Nothing",function(){
    it("Nothing",function(done){
      done();
    });
  });
});
