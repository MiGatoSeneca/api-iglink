var express = require('express');
var router = express.Router();

var moment = require('moment-timezone');
var request = require("request")
var getUrls = require('get-urls');
var getEmails = require('get-emails');
var whoisParser = require('parse-whois');
var whois = require('whois');
var emojiStrip = require('emoji-strip');

var conf = require('../../config/app.js');

var clicks = require('../../modules/click');
var visits = require('../../modules/visit');
var validator = require('../../modules/validator');


router.get('/click/:brand/:clickType/:clickId/', function(req, res, next) {

  validator.brand(req.params.brand);
  validator.clickType(req.params.clickType);
  validator.clickId(req.params.clickId);

  clicks.add(req.params.brand,req.params.clickType,req.params.clickId)
  .then(function(){
    var response = {
      status : 200,
      code : "CLICK_CREATED",
      message : "click created"
    }
    res.status(response.status).jsonp(response);
  })
  .catch(function(err){
    next(err);
  });

});



router.get('/visit/:brand/', function(req, res, next) {

  validator.brand(req.params.brand);


  visits.add(req.params.brand)
  .then(function(){
    var response = {
      status : 200,
      code : "VISIT_CREATED",
      message : "visit created"
    }
    res.status(response.status).jsonp(response);
  })
  .catch(function(err){
    next(err);
  });

});

router.get('/posts/:brand/0',function(req,res){
  var data = {
    url: "https://www.instagram.com/"+req.params.brand+"/?__a=1",
    json: true
  };
  request(data,function(error, response, data){
    var url_found=false;
    var count = 1;
    var posts_count = 0;
    var last_id = null;
    if (!error && response.statusCode === 200) {
      var posts = new Array();
      var iguser = {};
      var igposts = data.user.media.nodes;
      if(typeof igposts != "undefined"){
        for ( var igpost of igposts){
          if(typeof igpost.caption != "undefined"){
            igpost.caption = igpost.caption.replace(/\n/g, " ");
            igpost.caption=emojiStrip(igpost.caption);
            urls = getUrls(igpost.caption,{stripWWW:false});
            var url = "";
            var post_url_found = false;
            for ( var url of urls){
              if((url!="")&&(!post_url_found)){
                igpost.url=url;
                igpost.count=count;
                posts_count++;
                count++;
                posts.push(igpost);
                url_found = true;
                post_url_found = true;
              }
            }
          }
          last_id=igpost.id;
        }
      }
    }
    var data = {};
    data.last_id = last_id;
    data.posts = [];
    data.posts_count = posts_count;

    if(url_found){
      data.posts = posts;
    }
    if(last_id !== null){
      res.status(200).jsonp(data);
    }else{
      res.status(404).jsonp({});
    }
  });
});


router.get('/posts/:brand/:id',function(req,res){
  var data = {
    url: "https://www.instagram.com/"+req.params.brand+"/?__a=1&max_id="+req.params.id,
    json: true
  };
  request(data,function(error, response, data){
    var url_found=false;
    var count = 1;
    var posts_count = 0;
    var last_id = null;
    if (!error && response.statusCode === 200) {
      var posts = new Array();
      var iguser = {};
      var igposts = data.user.media.nodes;
      if(typeof igposts != "undefined"){
        for ( var igpost of igposts){
          if(typeof igpost.caption != "undefined"){
            igpost.caption = igpost.caption.replace(/\n/g, " ");
            igpost.caption=emojiStrip(igpost.caption);
            urls = getUrls(igpost.caption,{stripWWW:false});
            var url = "";
            var post_url_found = false;
            for ( var url of urls){
              if((url!="")&&(!post_url_found)){
                igpost.url=url;
                igpost.count=count;
                posts_count++;
                count++;
                posts.push(igpost);
                url_found = true;
                post_url_found = true;
              }
            }
          }
          last_id=igpost.id;
        }
      }
    }
    var data = {};
    data.last_id = last_id;
    data.posts = [];
    data.posts_count = posts_count;

    if(url_found){
      data.posts = posts;
    }
    if(last_id !== null){
      res.status(200).jsonp(data);
    }else{
      res.status(404).jsonp({});
    }
  });
});



module.exports = router;
