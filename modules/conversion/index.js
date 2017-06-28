/**
 *
 * @category    conversions
 * @package     segments
 * @version     1.0.0
 * @copyright   Copyright (c) 2017 - All rights reserved.
 * @author      Converfit Team <development@converfit.com>
 * @link        https://www.converfit.com
 *
 */

/**
 * Module exports.
 * @public
 */

exports.add = conversionAdd;
exports.list = conversionList;
exports.get = conversionGet;

/**
 * Module dependencies.
 * @private
 */

var model = require('../../models/conversion');
var segment = require('../../modules/segment');
var winston = require('winston');

winston.info('Module conversions Loaded');


//console.log("Init Conversions Analizer");




function conversionAdd(conversion){
  return new Promise(function(resolve, reject){
    model.insert(conversion)
    .then(function(){
      resolve({created:true});
    })
    .catch(function(err){
      reject(err);
    });
  });
}

function conversionList(brand,opt){
  return new Promise(function(resolve, reject){
    var response = {};
    model.list(brand,opt.start,opt.end)
    .then(function(conversions){
      response.conversions = conversions;
      resolve(response);
    })
    .catch(function(err){
      reject(err);
    });
  });

}


function conversionGet(brand,slug,opt){
  return new Promise(function(resolve, reject){
    var response = {};
    model.countConversions(brand,slug,opt.start,opt.end)
    .then(function(countConversions){
      response.countConversions = countConversions;
      return model.countUserConverted(brand,slug,opt.start,opt.end);
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
