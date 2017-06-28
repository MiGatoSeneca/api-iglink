/**
 *
 * @category    db.userSegment segment
 * @package     db.userSegment conversion
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
exports.listByType = listByType;
exports.countSessions = countSessions;
exports.countUsers = countUsers;
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
  db.userSegment.sync({force: true});
}



function insert(segment){

  return db.userSegment.upsert({
    fbts: segment.fingerprint+"::"+segment.brand+"::"+segment.type+"::"+segment.slug,
    bts: segment.brand+"::"+segment.type+"::"+segment.slug,
    fingerprint: segment.fingerprint,
    brand: segment.brand,
    type: segment.type,
    slug: segment.slug
  });
}

function listByType(brand,type,start,end){

  return db.userSegment.findAll({
    attributes: [
      [db.sequelize.literal('distinct type'),'type'],
      'slug'
    ],
    where: {
      brand : brand,
      type : type,
      updatedAt : {
        $lte : end,
        $gte : start
      }
    }
  });
}

function list(brand,start,end){
  return db.userSegment.findAll({
    attributes: [
      [db.sequelize.literal('distinct type'),'type'],
      'slug'
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

function countSessions(brand,type,slug,start,end){
  const tempSQL = db.sequelize.dialect.QueryGenerator.selectQuery('userSegment2s',{
    attributes: ['fingerprint'],
    distinct: true,
    where: {
      brand: brand,
      type: type,
      slug: slug
    }
  })
  .slice(0,-1);

  return db.userSession.aggregate('fingerprint','count',{
    where: {
      brand : brand,
      createdAt : {
        $lte : end,
        $gte : start
      },
      fingerprint: {
        $in: db.sequelize.literal('(' + tempSQL + ')'),
      }
    }
  });
}

function countUsers(brand,type,slug,start,end){
  const tempSQL = db.sequelize.dialect.QueryGenerator.selectQuery('userSegment2s',{
    attributes: ['fingerprint'],
    distinct: true,
    where: {
      brand: brand,
      type: type,
      slug: slug
    }
  })
  .slice(0,-1);

  return db.userSession.aggregate('fingerprint','count',{
    distinct: true,
    where: {
      brand : brand,
      createdAt : {
        $lte : end,
        $gte : start
      },
      fingerprint: {
        $in: db.sequelize.literal('(' + tempSQL + ')'),
      }
    }
  });
}


function countUserConverted(brand,type,slug,start,end){
  const tempSQL = db.sequelize.dialect.QueryGenerator.selectQuery('userSegment2s',{
    attributes: ['fingerprint'],
    distinct: true,
    where: {
      brand: brand,
      type: type,
      slug: slug
    }
  })
  .slice(0,-1);

  return db.userConversion.aggregate('fingerprint','count',{
    distinct: true,
    where: {
      brand : brand,
      createdAt : {
        $lte : end,
        $gte : start
      },
      fingerprint: {
        $in: db.sequelize.literal('(' + tempSQL + ')'),
      }
    }
  });
}
function countConversions(brand,type,slug,start,end){
  const tempSQL = db.sequelize.dialect.QueryGenerator.selectQuery('userSegment2s',{
    attributes: ['fingerprint'],
    distinct: true,
    where: {
      brand: brand,
      type: type,
      slug: slug
    }
  })
  .slice(0,-1);

  return db.userConversion.aggregate('fingerprint','count',{
    where: {
      brand : brand,
      createdAt : {
        $lte : end,
        $gte : start
      },
      fingerprint: {
        $in: db.sequelize.literal('(' + tempSQL + ')'),
      }
    }
  });
}
