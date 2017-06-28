/**
 *
 * @category    segments
 * @package     segments
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

 exports.add = segmentAdd;
 exports.get = segmentGet;
 exports.listByType = segmentListByType;
 exports.list = segmentList;

/**
 * Module dependencies.
 * @private
 */

 var model = require('../../models/segment');
 var winston = require('winston');

 var moment = require('moment-timezone');
 var jsonfile = require('jsonfile')



function segmentAdd(segment){
  return new Promise(function(resolve, reject){
    model.insert(segment)
    .then(function(){
      resolve({created:true});
    })
    .catch(function(err){
      reject(err);
    });
  });

}


function segmentListByType(brand,type,opt){
  return new Promise(function(resolve, reject){
    var response = {};
    model.listByType(brand,type,opt.start,opt.end)
    .then(function(segments){
      response.segments = segments;
      resolve(response);
    })
    .catch(function(err){
      reject(err);
    });
  });

}


function segmentList(brand,opt){
  return new Promise(function(resolve, reject){
    var response = {};
    console.log("start model.list");

    model.list(brand,opt.start,opt.end)
    .then(function(segments){
      response.segments = segments;
      resolve(response);
    })
    .catch(function(err){
      reject(err);
    });
  });

}


function segmentGet(brand,type,slug,opt){
  return new Promise(function(resolve, reject){
    var response = {};
    model.countSessions(brand,type,slug,opt.start,opt.end)
    .then(function(countSessions){
      response.countSessions = countSessions;
      return model.countUsers(brand,type,slug,opt.start,opt.end);
    })
    .then(function(countUsers){
      response.countUsers = countUsers;
      return model.countConversions(brand,type,slug,opt.start,opt.end);
    })
    .then(function(countConversions){
      response.countConversions = countConversions;
      return model.countUserConverted(brand,type,slug,opt.start,opt.end);
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
