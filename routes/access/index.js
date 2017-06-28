var express = require('express');
var router = express.Router();

var moment = require('moment-timezone');

var brands = require('../../modules/brand');
var admins = require('../../modules/admin');
var sessions = require('../../modules/session');
var segments = require('../../modules/segment');
var conversions = require('../../modules/conversion');
var validator = require('../../modules/validator');


router.post('/signup', function(req, res, next) {
  validator.brand(req.body.brand);
  validator.email(req.body.email);
  validator.password(req.body.password);

  admins.signup(req.body.brand,req.body.email,req.body.password)
  .then(function(){
    var response = {
      status : 200,
      code : "ADMIN_&_BRAND_CREATED",
      message : "Admin & brand created"
    }
    res.status(response.status).jsonp(response);
  })
  .catch(function(err){
    next(err);
  });
});


router.post('/login', function(req, res, next) {
  validator.email(req.body.email);
  validator.password(req.body.password);

  admins.login(req.body.email,req.body.password)
  .then(function(data){
    var response = {
      status : 200,
      code : "LOGIN_SUCCESS",
      message : "Login Success",
      data : {
        sessionKey : data.sessionKey
      }
    }
    res.status(response.status).jsonp(response);
  })
  .catch(function(err){
    next(err);
  });
});



module.exports = router;
