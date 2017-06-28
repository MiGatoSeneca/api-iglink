/**
 *
 * @category    Module visit
 * @package     Module visit
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

 exports.add = visitAdd;

/**
 * Module dependencies.
 * @private
 */

 var model = require('../../models/visit');
 var winston = require('winston');


function visitAdd(brand){
  return new Promise(function(resolve, reject){
    var visit = {
      brand:brand
    }
    model.insert(visit)
    .then(function(){
      resolve({});
    })
    .catch(function(err){
      reject(err);
    });
  });
}
