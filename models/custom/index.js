/**
 *
 * @category    db.brand cfCookie
 * @package     db.brand cfcookie
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

exports.list = listCustom;
exports.add = addCustom;
exports.update = updateCustom;
exports.get = getCustom;
exports.delete = deleteCustom;

exports.addCustomize = addCustomize;
exports.getCustomize = getCustomize;
exports.listCustomize = listCustomize;
exports.updateCustomize = updateCustomize;
exports.deleteCustomize = deleteCustomize;


/**
  * Module dependencies.
  * @private
  */

var winston = require('winston');
var db = require('../../models/db');


function addCustom(custom){
  console.log("addcustom model");
  return db.custom.create(custom);
}

function deleteCustom(brand,slug){
  return new Promise(function(resolve, reject){

    db.custom.destroy({
      where:{
        brand:brand,
        slug:slug
      }
    })
    .then(function(res){
      if(res==0){
        resolve(0);
      }
      return db.customize.destroy({
        where:{
          brand:brand,
          slug:slug
        }
      });
    })
    .then(function(res){
      resolve(1);
    })
    .catch(function(err){
      reject(err);
    });
  });
}


function listCustom(brand){
  console.log("listCustom");
  console.log(db.custom);

  return db.custom.findAll({
    where : {
      brand : brand
    }
  });
}

function getCustom(brand,slug){
  return db.custom.findOne({
    where : {
      brand : brand,
      slug : slug
    }
  });
}

function updateCustom(brand,slug,data){
  return new Promise(function(resolve, reject){
    db.brand.update(data,
    {
      where : {
        brand : brand,
        slug : slug
      }
    })
    .then(function(res){
      console.log("[Model][Brand] res")
      console.log(res)

      resolve(res);
    })
    .catch(function(err){
      reject(err);
    });
  });
}

function addCustomize(){}
function getCustomize(){}
function listCustomize(){}
function updateCustomize(){}
function deleteCustomize(){}
