/**
 *
 * @category    Module session
 * @package     Module session
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

 exports.add = sessionAdd;

/**
 * Module dependencies.
 * @private
 */

 var segment = require('../../modules/segment');
 var model = require('../../models/session');
 var brands = require('../../modules/brand');
 var winston = require('winston');

 var moment = require('moment-timezone');



function sessionAdd(fingerprint,brand){
  return new Promise(function(resolve, reject){
    var session = {
      fingerprint:fingerprint,
      brand:brand
    }
    model.insert(session)
    .then(function(){
      resolve({created:true});
    })
    .catch(function(err){
      reject(err);
    });
  });
}



function sessionDetection(req,res){
  //console.log("[START] sessionDetection");
  //console.log("[1] Comprobar no exite o si la sesión actual está caducada");

  if((req.cookies[req.brand]["cf_last_update"] === undefined) || (req.cookies[req.brand]["cf_last_update"] < moment().subtract(20, 'minutes').format('YYYY-MM-DD HH:mm:ss'))){
    //console.log("[1.true] Añadir hit al sessiono user/session");
    sessionSet(req);
    segment.set(req,res,"user","session");
  }
  cfcookie.set(req,res,"cf_last_update",moment().format('YYYY-MM-DD HH:mm:ss'));
}


function sessionInit(req,res){

}
