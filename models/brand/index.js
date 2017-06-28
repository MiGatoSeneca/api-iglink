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

exports.selectAll = selectAll;
exports.addBrand = addBrand;
exports.existsBrand = existsBrand;
exports.update = update;
exports.get = get;
exports.delete = deleteBrand;

/**
  * Module dependencies.
  * @private
  */

var winston = require('winston');
var db = require('../../models/db');

var Sequelize = require('sequelize');
var mysqlconfig = require('../../config/mysql.js');

const sequelize = new Sequelize(mysqlconfig.database, mysqlconfig.user, mysqlconfig.password, {
  host: mysqlconfig.host,
  dialect: 'mysql',
  pool: {
    max: mysqlconfig.pool.max,
    min: mysqlconfig.pool.min,
    idle: mysqlconfig.pool.idle
  },
});
console.log(db);


function addBrand(brand){
  return db.brand.create({
    brand: brand
  });
}

function deleteBrand(brand){
  return new Promise(function(resolve, reject){

    db.brand.destroy({
      where:{
        brand:brand
      }
    })
    .then(function(res){
      if(res==0){
        resolve(0);
      }
      return db.adminBrand.destroy({
        where:{
          brand:brand
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


function drop(){
  db.brand.sync({force: true});
}

function existsBrand(brand){
  return new Promise(function(resolve, reject){
    db.brand.findById(brand)
    .then(function(res){
      if(res === null){
        resolve({exists:false});
      }else{
        resolve({exists:true});
      }
    })
    .catch(function(err){
      reject(err);
    });
  });
}
function selectAll(){
  //[1] Buscar todos los datos
  return db.brand.findAll();
}

function selectById(brand){
  //[1] Comprobar que los datos de findbyId son correctos
  //[1.true] buscar cookie en la base de datos

  return db.brand.findById(brand);
}

function get(brand){
  return db.brand.findById(brand);
}

function update(brand,data){
  console.log("[Model][Brand] update")
  return new Promise(function(resolve, reject){
    db.brand.update(data,
    {
      where : {
        brand : brand
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
