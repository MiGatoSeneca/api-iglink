/**
 *
 * @category    Model sessions
 * @package     Model sessions
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

/**
  * Module dependencies.
  * @private
  */

var moment = require('moment-timezone');
var winston = require('winston');
var db = require('../../models/db');

function drop(){
  db.userSession.sync({force: true});
}


function insert(session){
  return db.userSession.create({
    fingerprint: session.fingerprint,
    brand: session.brand
  });
}
