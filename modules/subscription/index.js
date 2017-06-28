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
 exports.names = names;


/**
 * Module dependencies.
 * @private
 */

var winston = require('winston');
var available_subscriptions = ['free','trial','startup','starter','pro','enterprise']

function names(){
  return available_subscriptions;
}
