/**
 *
 * @category    brand
 * @package     brand
 * @version     0.1.0
 * @copyright   Copyright (c) 2017 - All rights reserved.
 * @author      Converfit Team <development@converfit.com>
 * @link        https://www.converfit.com
 *
 */

/**
 * Module exports.
 * @public
 */
 exports.brand = validatorBrand;
 exports.email = validatorEmail;
 exports.password = validatorPassword;
 exports.sessionKey= validatorSessionKey;
 exports.sessionKeyforBrand = validatorsessionKeyforBrand;
 exports.subscription = validatorSubscription;
 exports.clickType = validatorClickType;
 exports.clickId = validatorClickId;


/**
 * Module dependencies.
 * @private
 */

var winston = require('winston');
var validator = require('validator');
var Promise = require('promise');
var moment = require('moment-timezone');
var subscription = require('../../modules/subscription');
var modelAdmin = require('../../models/admin');

function validatorSubscription(str){
  if(!validator.isIn(str,subscription.names())){
    var err = new Error('Subscription ('+str+') format not valid');
    err.code = "SUBSCRIPTION_FORMAT_NOT_VALID";
    err.status = 401;
    throw err;
  }
}


function validatorClickType(str){
  var field_message = "Click type";
  var field_code = "CLICK_TYPE"
  if(str === undefined){
    var err = new Error(field_message+' is missing');
    err.code = field_code+"_IS_MISSING";
    err.status = 401;
    throw err;
  }
  if(validator.isEmpty(str)){
    var err = new Error(field_message+' is missing');
    err.code = field_code+"_IS_MISSING";
    err.status = 401;
    throw err;
  }
  if(!((str=="post")||(str=="permalink"))){
    var err = new Error(field_message+' format not valid length not valid {post,permalink} ('+str+')');
    err.code = field_code+"_FORMAT_NOT_VALID";
    err.status = 401;
    throw err;
  }
}


function validatorClickId(str){
  var field_message = "Click id";
  var field_code = "CLICK_ID"
  if(str === undefined){
    var err = new Error(field_message+' is missing');
    err.code = field_code+"_IS_MISSING";
    err.status = 401;
    throw err;
  }
  if(validator.isEmpty(str)){
    var err = new Error(field_message+' is missing');
    err.code = field_code+"_IS_MISSING";
    err.status = 401;
    throw err;
  }
  if(!validator.isLength(str,{min:3,max:75})){
    var err = new Error(field_message+' format not valid length not valid [3,75] ('+str.length+')');
    err.code = field_code+"_FORMAT_NOT_VALID";
    err.status = 401;
    throw err;
  }
  if(!validator.isAlphanumeric(str)){
    var err = new Error(field_message+' format not valid length only alphanumeric');
    err.code = field_code+"_FORMAT_NOT_VALID";
    err.status = 401;
    throw err;
  }

}



function validatorBrand(str){
  var field_message = "Brand";
  var field_code = "BRAND"
  if(str === undefined){
    var err = new Error(field_message+' is missing');
    err.code = field_code+"_IS_MISSING";
    err.status = 401;
    throw err;
  }
  if(validator.isEmpty(str)){
    var err = new Error(field_message+' is missing');
    err.code = field_code+"_IS_MISSING";
    err.status = 401;
    throw err;
  }
  if(!validator.isLowercase(str)){
    var err = new Error(field_message+' format not valid needs lowercase');
    err.code = field_code+"_FORMAT_NOT_VALID";
    err.status = 401;
    throw err;
  }
  if(!validator.isLength(str,{min:3,max:75})){
    var err = new Error(field_message+' format not valid length not valid [3,75] ('+str.length+')');
    err.code = field_code+"_FORMAT_NOT_VALID";
    err.status = 401;
    throw err;
  }
  if(!validator.isAlphanumeric(str)){
    var err = new Error(field_message+' format not valid length only alphanumeric');
    err.code = field_code+"_FORMAT_NOT_VALID";
    err.status = 401;
    throw err;
  }

}


function validatorEmail(str){
  var field_message = "Email";
  var field_code = "EMAIL"
  if(str === undefined){
    var err = new Error(field_message+' is missing');
    err.code = field_code+"_IS_MISSING";
    err.status = 401;
    throw err;
  }
  if(validator.isEmpty(str)){
    var err = new Error(field_message+' is missing');
    err.code = field_code+"_IS_MISSING";
    err.status = 401;
    throw err;
  }
  if(!validator.isLength(str,{min:3,max:255})){
    var err = new Error(field_message+' format not valid length not valid [3,255]');
    err.code = field_code+"_FORMAT_NOT_VALID";
    err.status = 401;
    throw err;
  }
  if(!validator.isEmail(str)){
    var err = new Error(field_message+' format not valid not email');
    err.code = field_code+"_FORMAT_NOT_VALID";
    err.status = 401;
    throw err;
  }
}

function validatorFingerprint(str){
  var field_message = "Fingerprint";
  var field_code = "FINGERPRINT"
  if(str === undefined){
    var err = new Error(field_message+' is missing');
    err.code = field_code+"_IS_MISSING";
    err.status = 401;
    throw err;
  }
  if(validator.isEmpty(str)){
    var err = new Error(field_message+' is missing');
    err.code = field_code+"_IS_MISSING";
    err.status = 401;
    throw err;
  }
  if(!validator.isLength(str,{min:0,max:255})){
    var err = new Error(field_message+' format not valid length not valid [0,255]');
    err.code = field_code+"_FORMAT_NOT_VALID";
    err.status = 401;
    throw err;
  }
  if(!validator.matches(str,/^[A-Za-z0-9]*$/)){
    var err = new Error(field_message+' format not valid not email');
    err.code = field_code+"_FORMAT_NOT_VALID";
    err.status = 401;
    throw err;
  }

}


function validatorPassword(str){
  var field_message = "Password";
  var field_code = "PASSWORD"
  if(str === undefined){
    var err = new Error(field_message+' is missing');
    err.code = field_code+"_IS_MISSING";
    err.status = 401;
    throw err;
  }
  if(validator.isEmpty(str)){
    var err = new Error(field_message+' is missing');
    err.code = field_code+"_IS_MISSING";
    err.status = 401;
    throw err;
  }
  if(!validator.isLength(str,{min:3,max:75})){
    var err = new Error(field_message+' format not valid length not valid [3,75]');
    err.code = field_code+"_FORMAT_NOT_VALID";
    err.status = 401;
    throw err;
  }
  if(!validator.matches(str,/^[ A-Za-z0-9ñÑçÇ<>,;.:-_{}+*¡¿=)(/%$·@|!]*$/)){
    var err = new Error(field_message+' format not valid not email');
    err.code = field_code+"_FORMAT_NOT_VALID";
    err.status = 401;
    throw err;
  }

}


function validatorSessionKey(str){
  var field_message = "sessionKey";
  var field_code = "SESSIONKEY"
  if(str === undefined){
    var err = new Error(field_message+' is missing');
    err.code = field_code+"_IS_MISSING";
    err.status = 401;
    throw err;
  }
  if(validator.isEmpty(str)){
    var err = new Error(field_message+' is missing');
    err.code = field_code+"_IS_MISSING";
    err.status = 401;
    throw err;
  }
  if(!validator.isLength(str,{min:1,max:255})){
    var err = new Error(field_message+' format not valid length not valid [1,255]');
    err.code = field_code+"_FORMAT_NOT_VALID";
    err.status = 401;
    throw err;
  }
  if(!validator.matches(str,/^[A-Za-z0-9]*$/)){
    var err = new Error(field_message+' format not valid');
    err.code = field_code+"_FORMAT_NOT_VALID";
    err.status = 401;
    throw err;
  }
}



function validatorsessionKeyforBrand(sessionKey,brand){
  return new Promise(function(resolve, reject){
    modelAdmin.checksessionKeyforBrand(sessionKey,brand)
    .then(function(response){
      if(!response.exists){
        console.log("sessionKey not valid");
        var err = new Error('sessionKey not valid');
        err.code ="SESSIONKEY_NOT_VALID";
        err.status = 401;
        reject(err);
      }
      resolve();
    })
    .catch(function(err){
      reject(err);
    });
  });

}



function validatorSegmentType(str){
  var field_message = "Segment type";
  var field_code = "SEGMENT_TYPE"
  if(str === undefined){
    var err = new Error(field_message+' is missing');
    err.code = field_code+"_IS_MISSING";
    err.status = 401;
    throw err;
  }
  if(validator.isEmpty(str)){
    var err = new Error(field_message+' is missing');
    err.code = field_code+"_IS_MISSING";
    err.status = 401;
    throw err;
  }
  if(!validator.isLength(str,{min:1,max:255})){
    var err = new Error(field_message+' format not valid length not valid [1,255]');
    err.code = field_code+"_FORMAT_NOT_VALID";
    err.status = 401;
    throw err;
  }
  if(!validator.matches(str,/^[A-Za-z0-9_-]*$/)){
    var err = new Error(field_message+' format not valid');
    err.code = field_code+"_FORMAT_NOT_VALID";
    err.status = 401;
    throw err;
  }
}


function validatorSegmentSlug(str){
  var field_message = "Segment slug";
  var field_code = "SEGMENT_SLUG"
  if(str === undefined){
    var err = new Error(field_message+' is missing');
    err.code = field_code+"_IS_MISSING";
    err.status = 401;
    throw err;
  }
  if(validator.isEmpty(str)){
    var err = new Error(field_message+' is missing');
    err.code = field_code+"_IS_MISSING";
    err.status = 401;
    throw err;
  }
  if(!validator.isLength(str,{min:1,max:255})){
    var err = new Error(field_message+' format not valid length not valid [1,255]');
    err.code = field_code+"_FORMAT_NOT_VALID";
    err.status = 401;
    throw err;
  }
  if(!validator.matches(str,/^[A-Za-z0-9_-]*$/)){
    var err = new Error(field_message+' format not valid');
    err.code = field_code+"_FORMAT_NOT_VALID";
    err.status = 401;
    throw err;
  }
}
function validatorConversionSlug(str){
  var field_message = "Conversion slug";
  var field_code = "CONVERSION_SLUG"
  if(str === undefined){
    var err = new Error(field_message+' is missing');
    err.code = field_code+"_IS_MISSING";
    err.status = 401;
    throw err;
  }
  if(validator.isEmpty(str)){
    var err = new Error(field_message+' is missing');
    err.code = field_code+"_IS_MISSING";
    err.status = 401;
    throw err;
  }
  if(!validator.isLength(str,{min:1,max:255})){
    var err = new Error(field_message+' format not valid length not valid [1,255]');
    err.code = field_code+"_FORMAT_NOT_VALID";
    err.status = 401;
    throw err;
  }
  if(!validator.matches(str,/^[A-Za-z0-9_-]*$/)){
    var err = new Error(field_message+' format not valid');
    err.code = field_code+"_FORMAT_NOT_VALID";
    err.status = 401;
    throw err;
  }
}
