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

exports.signup = signup;
exports.login = login;
exports.addBrand = addBrand;
exports.createSessionKey = createSessionKey;

/**
 * Module dependencies.
 * @private
 */

var winston = require('winston');
var sha1 = require('sha1');
var Promise = require('promise');

var modelAdmin = require('../../models/admin');
var modelBrand = require('../../models/brand');



function signup(brand,email,password){
  return new Promise(function(resolve, reject){
    var admin = {
      email : email,
      password : sha1(password)
    }

    modelAdmin.existsEmail(admin.email)
    .then(function(response){
      if(response.exists){
        var err = new Error('email in use');
        err.code ="EMAIL_IN_USE";
        err.status = 401;
        reject(err);
      }
      return modelBrand.existsBrand(brand);
    })
    .then(function(response){
      if(response.exists){
        var err = new Error('brand in use');
        err.code ="BRAND_IN_USE";
        err.status = 401;
        reject(err);
      }
      return modelAdmin.addAdmin(admin)
    })
    .then(function(){
      return modelBrand.addBrand(brand)
    })
    .then(function(){
      return modelAdmin.addAdminBrand(admin.email,brand);
    })
    .then(function(){
      resolve();
    })
    .catch(function(err){
      reject(err);
    })


  });
}


function login(email,password){
  return new Promise(function(resolve, reject){
    var admin = {
      email : email,
      password : sha1(password)
    }

    modelAdmin.existsEmailPasswordActive(admin.email,admin.password)
    .then(function(response){
      if(!response.exists){
        var err = new Error('email or password not valid');
        err.code ="EMAIL_OR_PASSWORD_NOT_VALID";
        err.status = 401;
        throw err;
        reject(err);
      }
      return modelAdmin.createSessionKey(admin.email);
    })
    .then(function(response){
      resolve(response);
    })
    .catch(function(err){
      reject(err);
    });
  });
}

function addBrand(){
  return modelAdmin.addBrand(brand)
}
function createSessionKey(){

}
