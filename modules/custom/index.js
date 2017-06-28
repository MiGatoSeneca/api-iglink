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

exports.add = addCustom;
exports.get = getCustom;
exports.list = listCustom;
exports.update = updateCustom;
exports.delete = deleteCustom;

/**
 * Module dependencies.
 * @private
 */

var winston = require('winston');
var model = require('../../models/custom');
var modelCustomize = require('../../models/customize');
var modelSegment = require('../../models/segment');


function addCustom(brand,data){
  var custom = data;
  custom.brand = brand;
  custom.bs = brand+"::"+data.slug;
  return new Promise(function(resolve, reject){
    model.add(custom)
    .then(function(res){
      if(res === 0){
        resolve({created:false});
      }else{
        resolve({created:true});
      }
    })
    .catch(function(err){
      var error = {
        status : 500,
        code : err.parent.code,
        message : err.errors[0].message,
      }
      reject(error);
    });
  });
}

function listCustom(brand){
  return model.list(brand);
}

function deleteCustom(brand,slug){

  return new Promise(function(resolve, reject){
    model.delete(brand,slug)
    .then(function(res){
      if(res == 0){
        resolve({deleted:false});
      }else{
        resolve({deleted:true});
      }
    })
    .catch(function(err){
      reject(err);
    });
  });

}


function updateCustom(custom,data){
  return new Promise(function(resolve, reject){
    var updateData = {};

    if(data.timezone !== undefined){updateData.timezone=data.timezone};
    if(data.subscription !== undefined){updateData.subscription=data.subscription};

    model.update(custom,updateData)
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

function getCustom(brand,slug,opt){
  return new Promise(function(resolve, reject){
    var response = {};
    model.get(brand,slug)
    .then(function(data){
      response = data.dataValues;
      return modelCustomize.list(brand,response.slug)
    })
    .then(function(data){
      console.log(data);
      response.customizes = [];
      if(data !== []){
        response.customizes = data;
      }
      return modelSegment.countSessions(brand,"utm_custom",slug,opt.start,opt.end);
    })
    .then(function(countSessions){
      response.countSessions = countSessions;
      return modelSegment.countUsers(brand,"utm_custom",slug,opt.start,opt.end);
    })
    .then(function(countUsers){
      response.countUsers = countUsers;
      return modelSegment.countConversions(brand,"utm_custom",slug,opt.start,opt.end);
    })
    .then(function(countConversions){
      response.countConversions = countConversions;
      return modelSegment.countUserConverted(brand,"utm_custom",slug,opt.start,opt.end);
    })
    .then(function(countUserConverted){
      response.countUserConverted = countUserConverted;
      resolve(response);
    })
    .catch(function(err){
      reject(err);
    });
  });


  return new Promise(function(resolve, reject){
    model.get(custom)
    .then(function(res){
      if(res.dataValues !== undefined){
        resolve(res.dataValues);
      }else{
        resolve(null);
      }
    })
    .catch(function(err){
      reject(err);
    });
  });
}


function addCustomSegment(){}
function getCustomSegment(){}
function listCustomSegment(){}
function updateCustomSegment(){}
function deleteCustomSegment(){}
