var express = require('express');
var router = express.Router();

var moment = require('moment-timezone');

var brands = require('../../modules/brand');
var admins = require('../../modules/admin');
var sessions = require('../../modules/session');
var segments = require('../../modules/segment');
var conversions = require('../../modules/conversion');
var validator = require('../../modules/validator');

router.get('/session/:fingerprint/:brand', function(req, res, next) {

  validator.fingerprint(req.params.fingerprint);
  validator.brand(req.params.brand);



  sessions.add(req.params.fingerprint,req.params.brand)
  .then(function(response){
    console.log("then sessions.add");
    if(response.created){
      var response = {
        status : 200,
        code : "SESSION_CREATED",
        message : "Session created"
      }
      res.status(response.status).jsonp(response);
    }else{
      var response = {
        status : 400,
        code : "SESSION_CREATING_ERROR",
        message : "Session creating error"
      }
      res.status(response.status).jsonp(response);

    }

  })
  .catch(function(err){
    next(err);
  });

});

router.get('/segment/:fingerprint/:brand/:type/:slug', function(req, res, next) {

  validator.fingerprint(req.params.fingerprint);
  validator.brand(req.params.brand);
  validator.segmentType(req.params.type);
  validator.segmentSlug(req.params.slug);


  var segment = {
    fingerprint : req.params.fingerprint,
    brand : req.params.brand,
    type : req.params.type,
    slug : req.params.slug
  }
  segments.add(segment)
  .then(function(response){
    console.log("then segment.add");
    if(response.created){
      var response = {
        status : 200,
        code : "SEGMENT_CREATED",
        message : "Segment created"
      }
      res.status(response.status).jsonp(response);
    }else{
      var response = {
        status : 400,
        code : "SEGMENT_CREATING_ERROR",
        message : "Segment creating error"
      }
      res.status(response.status).jsonp(response);
    }
  })
  .catch(function(err){
    next(err);
  });

});

router.get('/conversion/:fingerprint/:brand/:slug', function(req, res, next) {
  validator.fingerprint(req.params.fingerprint);
  validator.brand(req.params.brand);
  validator.conversionSlug(req.params.slug);


  var conversion = {
    fingerprint : req.params.fingerprint,
    brand : req.params.brand,
    slug : req.params.slug
  }
  conversions.add(conversion)
  .then(function(response){
    console.log("then conversion.add");
    if(response.created){
      var response = {
        status : 200,
        code : "CONVERSION_CREATED",
        message : "Segment created"
      }
      res.status(response.status).jsonp(response);
    }else{
      var response = {
        status : 400,
        code : "CONVERSION_CREATING_ERROR",
        message : "Segment creating error"
      }
      res.status(response.status).jsonp(response);
    }
  })
  .catch(function(err){
    next(err);
  });

});

module.exports = router;
