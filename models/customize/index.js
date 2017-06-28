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

exports.list = listCustomize;
exports.add = addCustomize;
exports.update = updateCustomize;
exports.get = getCustomize;
exports.delete = deleteCustomize;


/**
  * Module dependencies.
  * @private
  */

var winston = require('winston');
var db = require('../../models/db');


function addCustomize(customize){
  return db.customize.create(customize);
}

function deleteCustomize(brand,slug,segmentType,segmentSlug){
  return new Promise(function(resolve, reject){

    db.customize.destroy({
      where:{
        brand:brand,
        slug:slug,
        segmentType:segmentType,
        segmentSlug:segmentSlug
      }
    })
    .then(function(res){
      resolve(res);
    })
    .catch(function(err){
      reject(err);
    });
  });
}


function listCustomize(brand,slug){
  return db.customize.findAll({
    where : {
      brand : brand,
      slug:slug
    }
  });
}

function getCustomize(brand,slug,segmentType,segmentSlug){
  return db.customize.findOne({
    where : {
      brand : brand,
      slug : slug,
      segmentType : segmentType,
      segmentSlug : segmentSlug
    }
  });
}

function updateCustomize(brand,slug,segmentType,segmentSlug,data){
  return new Promise(function(resolve, reject){
    db.customize.update(data,
    {
      where : {
        brand : brand,
        slug : slug,
        segmentType : segmentType,
        segmentSlug : segmentSlug
      }
    })
    .then(function(res){
      console.log(res)
      resolve(res);
    })
    .catch(function(err){
      reject(err);
    });
  });
}
