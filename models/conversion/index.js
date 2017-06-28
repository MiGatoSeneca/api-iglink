/**
 *
 * @category    db.userConversion conversion
 * @package     db.userConversion conversion
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

exports.insert = insert;
exports.list = list;
exports.countConversions = countConversions;
exports.countUserConverted = countUserConverted;

/**
  * Module dependencies.
  * @private
  */

var moment = require('moment-timezone');
var winston = require('winston');
var db = require('../../models/db');


function drop(){
  db.userConversion.sync({force: true});
}



function insert(conversion){
  return db.userConversion.create({
    fingerprint: conversion.fingerprint,
    brand: conversion.brand,
    slug: conversion.slug
  });
}

function list(brand,start,end){
  return db.userConversion.findAll({
    attributes: [
      [db.sequelize.literal('distinct slug'),'slug']
    ],
    where: {
      brand : brand,
      updatedAt : {
        $lte : end,
        $gte : start
      }
    }
  });
}


function countUserConverted(brand,slug,start,end){
  return db.userConversion.aggregate('fingerprint','count',{
    distinct: true,
    where: {
      brand : brand,
      slug : slug,
      createdAt : {
        $lte : end,
        $gte : start
      }
    }
  });
}
function countConversions(brand,slug,start,end){
  return db.userConversion.aggregate('fingerprint','count',{
    where: {
      brand : brand,
      slug : slug,
      createdAt : {
        $lte : end,
        $gte : start
      }
    }
  });
}
