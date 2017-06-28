/**
 *
 * @category    Model Admin
 * @package     Model Admin
 * @version     1.0.0
 * @copyright   Copyright (c) 2017 - All rights reserved.
 * @author      Pablo Gutiérrez <pablo@converfit.com>
 * @link        https://www.conver.fit
 *
 */

/**
  * Module exports.
  * @public
  */

exports.addAdmin = addAdmin;
exports.addAdminBrand = addAdminBrand;
exports.existsEmail = existsEmail;
exports.existsEmailPasswordActive = existsEmailPasswordActive;
exports.createSessionKey = createSessionKey;
exports.checksessionKeyforBrand = checksessionKeyforBrand;

/**
  * Module dependencies.
  * @private
  */

var winston = require('winston');
var sha1 = require('sha1');
var Promise = require('promise');
var db = require('../../models/db');





function drop(){
  model.sync({force: true});
}

function existsEmail(email){
  return new Promise(function(resolve, reject){
    db.admin.findById(email)
    .then(function(res){
      if(res === null){
        resolve({exists:false});
      }else{
        resolve({exists:true});
      }
    })
    .catch(function(err){
      reject(err);
    });
  });
}

function existsEmailPasswordActive(email,password){
  return new Promise(function(resolve, reject){
    db.admin.findOne({
      where : {
        email : email,
        password : password,
        status : "active"
      }
    })
    .then(function(res){
      if(res === null){
        resolve({exists:false});
      }else{
        resolve({exists:true});
      }
    })
    .catch(function(err){
      reject(err);
    });
  });
}

function createSessionKey(email){
  return new Promise(function(resolve, reject){
    var sessionKey = sha1(Math.floor(Date.now()).toString()+email);

    db.admin.update({
      sessionKey : sessionKey
    },
    {
      where : {
        email : email
      }
    })
    .then(function(res){
      resolve({sessionKey:sessionKey});
    })
    .catch(function(err){
      reject(err);
    });
  });
}

function checksessionKeyforBrand(sessionKey,brand){
  console.log("checksessionKeyforBrand");
  return new Promise(function(resolve, reject){

    db.admin.findOne({
      where : {
        sessionKey : sessionKey
      }
    })
    .then(function(res){
      if(res === null){
        resolve({exists:false});
      }else{
        return db.adminBrand.findById(res.email+"::"+brand);
      }
    })
    .then(function(res){
      if(res === null){
        resolve({exists:false});
      }else{
        resolve({exists:true});
      }
    })
    .catch(function(err){
      reject(err);
    });
  });
}


function addAdmin(admin){
  return db.admin.create(admin);
}

function addAdminBrand(email,brand){
  return db.adminBrand.create({
    eb : email+"::"+brand,
    email : email,
    brand : brand
  });
}
