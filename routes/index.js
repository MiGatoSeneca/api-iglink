var express = require('express');
var router = express.Router();

var moment = require('moment-timezone');

var validator = require('../modules/validator');



router.get('/', function(req, res, next) {
  res.render('index');
});

module.exports = router;
