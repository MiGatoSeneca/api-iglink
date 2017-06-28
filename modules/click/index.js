/**
 *
 * @category    Module click
 * @package     Module click
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

 exports.add = clickAdd;

/**
 * Module dependencies.
 * @private
 */

 var model = require('../../models/click');
 var winston = require('winston');

 var moment = require('moment-timezone');



function clickAdd(brand,clickType,clickId){
  return new Promise(function(resolve, reject){
    var click = {
      brand:brand,
      clickType:clickType,
      clickId:clickId
    }
    model.insert(click)
    .then(function(){
      resolve({});
    })
    .catch(function(err){
      reject(err);
    });
  });
}
