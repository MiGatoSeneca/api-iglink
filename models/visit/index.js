/**
 *
 * @category    Model click
 * @package     Model click
 * @version     1.0.0
 * @copyright   Copyright (c) 2017 - All rights reserved.
 * @author      iglink Team <development@iglink.co>
 * @link        https://iglink.co
 *
 */

/**
  * Module exports.
  * @public
  */

exports.insert = insert;

/**
  * Module dependencies.
  * @private
  */

var winston = require('winston');
var db = require('../../models/db');

//drop();

function drop(){
  db.visit.sync({force: true});
}


function insert(visit){
  return db.visit.create({
    brand: visit.brand
  });
  return tmp;
}
