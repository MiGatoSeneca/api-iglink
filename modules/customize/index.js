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

exports.add = addCustomize;
exports.get = getCustomize;
exports.list = listCustomize;
exports.update = updateCustomize;
exports.delete = deleteCustomize;

/**
 * Module dependencies.
 * @private
 */

var winston = require('winston');
var model = require('../../models/customize');
var modelSegment = require('../../models/segment');


function addCustomize(brand,slug,data){
  var customize = data;
  customize.brand = brand;
  customize.slug = slug;
  return new Promise(function(resolve, reject){
    model.add(customize)
    .then(function(res){
      if(res === 0){
        var error = {
          status : 404,
          code : "CUSTOMIZE_CREATION_ERROR",
          message : "Customize creation error"
        };
        reject(error);
      }else{
        resolve({created:true});
      }
    })
    .catch(function(err){
      reject(err);
    });
  });
}

function listCustomize(brand,slug){
  return model.list(brand,slug);
}

function deleteCustomize(brand,slug,segmentType,segmentSlug){

  return new Promise(function(resolve, reject){
    model.delete(brand,slug,segmentType,segmentSlug)
    .then(function(res){
      if(res == 0){
        var error = {
          status : 404,
          code : "CUSTOMIZE_NOT_FOUND",
          message : "Customize not found"
        };
        reject(error);
      }else{
        resolve();
      }
    })
    .catch(function(err){
      reject(err);
    });
  });

}


function updateCustomize(brand,slug,segmentType,segmentSlug,data){
  return new Promise(function(resolve, reject){

    model.update(brand,slug,segmentType,segmentSlug,data)
    .then(function(res){
      if(res[0]>0){
        resolve({updated:true});
      }else{
        resolve({updated:false});
      }
    })
    .catch(function(err){
      reject(err);
    });
  });
}

function getCustomize(brand,slug,segmentType,segmentSlug,opt){
  console.log("getCustomize");
  return new Promise(function(resolve, reject){
    var response = {};
    model.get(brand,slug,segmentType,segmentSlug,opt.start,opt.end)
    .then(function(data){
      if(data === null){
        var error = {
          status : 404,
          code : "CUSTOMIZE_NOT_FOUND",
          message : "Customize not found"
        };
        reject(error);
      }
      response = data.dataValues;
      return modelSegment.countSessions(brand,"utm_customize",slug,opt.start,opt.end);
    })
    .then(function(countSessions){
      response.countSessions = countSessions;
      return modelSegment.countUsers(brand,"utm_customize",slug,opt.start,opt.end);
    })
    .then(function(countUsers){
      response.countUsers = countUsers;
      return modelSegment.countConversions(brand,"utm_customize",slug,opt.start,opt.end);
    })
    .then(function(countConversions){
      response.countConversions = countConversions;
      return modelSegment.countUserConverted(brand,"utm_customize",slug,opt.start,opt.end);
    })
    .then(function(countUserConverted){
      response.countUserConverted = countUserConverted;
      resolve(response);
    })
    .catch(function(err){
      reject(err);
    });
  });
}
