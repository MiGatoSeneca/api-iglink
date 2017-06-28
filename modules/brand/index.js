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

exports.detection = brandDetection;

exports.add = add;
exports.update = update;
exports.get = get;
exports.delete = deleteBrand;

/**
 * Module dependencies.
 * @private
 */

var winston = require('winston');
var model = require('../../models/brand');

//winston.log ("Init cookie Factory");
var brands = {};

loadBrands();

function loadBrands(){
  model.selectAll()
  .then(function(results){
    for(var key in results){
      brands[results[key].brand] = {};
      brands[results[key].brand]["timezone"] = results[key].timezone;
    }
  })
  .catch(function(err){
    winston.error(err);
  });
}
function add(brand){
  return model.add(brand);
}

function deleteBrand(brand){

  return new Promise(function(resolve, reject){
    model.delete(brand)
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

function brandDetection(req,res){

  if(req.params === undefined){req.params = {};}
  if(req.params.brand === undefined){req.params.brand = 'no_brand';}

  req.brand = req.params.brand;
  req.brand_timezone = "GMT";

  get(req.brand)
  .then(function(response){
    if(response !== null){
      req.brand_timezone = response.timezone;
    }
    var response = {
      status : 200,
      code : "GET_BRAND_SUCCESS",
      message : "Get brand success",
      data : {
        brand : req.brand,
        timezone : req.brand_timezone
      }
    }
    res.status(200).jsonp(response);
  })
  .catch(function(err){
    var response = {
      status : 200,
      code : "GET_BRAND_SUCCESS",
      message : "Get brand success",
      data : {
        brand : req.brand,
        timezone : req.brand_timezone
      }
    }
    res.status(200).jsonp(response);
  });
}

function update(brand,data){
  return new Promise(function(resolve, reject){
    var updateData = {};
    if(data.timezone !== undefined){updateData.timezone=data.timezone};
    if(data.subscription !== undefined){updateData.subscription=data.subscription};
    model.update(brand,updateData)
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

function get(brand){
  return new Promise(function(resolve, reject){
    model.get(brand)
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
