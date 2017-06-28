/**
 *
 * @category    Model db
 * @package     Model db
 * @version     0.1.0
 * @copyright   Copyright (c) 2017 - All rights reserved.
 * @author      Converfit Team <development@converfit.com>
 * @link        https://www.converfit.com
 *
 */


/**
  * Module dependencies.
  * @private
  */

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
exports.sequelize = sequelize;


const click = sequelize.define('click', {
  idClick: {
    type: Sequelize.INTEGER(32),
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  brand: {
    type: Sequelize.STRING(255),
    allowNull: false,
    defaultValue: 'nobrand'
  },
  clickType: {
    type: Sequelize.STRING(255),
    allowNull: false,
    defaultValue: 'noclicktype'
  },
  clickId: {
    type: Sequelize.STRING(255),
    allowNull: false,
    defaultValue: 'noclickid'
  }
});
click.sync();
exports.click = click;

const visit = sequelize.define('visit', {
  idVisit: {
    type: Sequelize.INTEGER(32),
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  brand: {
    type: Sequelize.STRING(255),
    allowNull: false,
    defaultValue: 'nobrand'
  }
});
visit.sync();
exports.visit = visit;


/**
  * Database definitions.
  * @public
  */

/*
const brand = sequelize.define('brand', {
  brand: {
    type: Sequelize.STRING(255),
    allowNull: false,
    primaryKey: true
  },
  subscription: {
    type: Sequelize.STRING(255),
    allowNull: false,
    defaultValue: 'free'
  },
  status: {
    type: Sequelize.STRING(255),
    allowNull: false,
    defaultValue: 'active'
  }
});
brand.sync();
exports.brand = brand;

const admin = sequelize.define('admin', {
  email: {
    type: Sequelize.STRING(255),
    allowNull: false,
    primaryKey: true
  },
  password: {
    type: Sequelize.STRING(255),
    allowNull: false
  },
  sessionKey: {
    type: Sequelize.STRING(255),
    allowNull: false,
    defaultValue: ''
  },
  status: {
    type: Sequelize.STRING(255),
    allowNull: false,
    defaultValue: 'active'
  }
});
admin.sync();
exports.admin = admin;

const adminBrand = sequelize.define('adminBrand', {
  eb: {
    type: Sequelize.STRING(512),
    allowNull: false,
    primaryKey: true
  },
  email: {
    type: Sequelize.STRING(255),
    allowNull: false
  },
  brand: {
    type: Sequelize.STRING(255),
    allowNull: false
  }
});
adminBrand.sync();
exports.adminBrand = adminBrand;



const userSession = sequelize.define('userSession', {
  id_session: {
    type: Sequelize.INTEGER(32),
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  fingerprint: {
    type: Sequelize.STRING(255),
    allowNull: false,
    defaultValue: 'no_fingerprint'
  },
  brand: {
    type: Sequelize.STRING(255),
    allowNull: false,
    defaultValue: 'no_brand'
  }
});
userSession.sync();
exports.userSession = userSession;

const userSegment = sequelize.define('userSegment2', {
  fbts: {
    type: Sequelize.STRING(512),
    allowNull: false,
    primaryKey: true
  },
  bts: {
    type: Sequelize.STRING(512),
    allowNull: false,
    primaryKey: true
  },
  fingerprint: {
    type: Sequelize.STRING(255),
    allowNull: false,
    defaultValue: 'no_fingerprint'
  },
  brand: {
    type: Sequelize.STRING(255),
    allowNull: false,
    defaultValue: 'no_brand'
  },
  type: {
    type: Sequelize.STRING(255),
    allowNull: false,
    defaultValue: 'no_type'
  },
  slug: {
    type: Sequelize.STRING(255),
    allowNull: false,
    defaultValue: 'no_slug'
  },
  hits: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
    defaultValue: '0'
  }
});
userSegment.sync();
exports.userSegment = userSegment;

const userConversion = sequelize.define('userConversion', {
  id_user_sconversion: {
    type: Sequelize.INTEGER(32),
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  fingerprint: {
    type: Sequelize.STRING(255),
    allowNull: false,
    defaultValue: 'no_fingerprint'
  },
  brand: {
    type: Sequelize.STRING(255),
    allowNull: false,
    defaultValue: 'no_brand'
  },
  slug: {
    type: Sequelize.STRING(255),
    allowNull: false,
    defaultValue: 'no_slug'
  }
});
userConversion.sync();
exports.userConversion = userConversion;


const custom = sequelize.define('custom', {
  bs: {
    type: Sequelize.STRING(512),
    allowNull: false,
    primaryKey: true
  },
  brand: {
    type: Sequelize.STRING(255),
    allowNull: false,
    defaultValue: 'no_brand'
  },
  slug: {
    type: Sequelize.STRING(255),
    allowNull: false,
    defaultValue: 'no_slug'
  },
  cssTarget: {
    type: Sequelize.STRING(255),
    allowNull: false,
    defaultValue: 'no_css_target'
  },
  action: {
    type: Sequelize.STRING(255),
    allowNull: false,
    defaultValue: 'no_css_target'
  },
  search: {
    type: Sequelize.STRING(512),
    allowNull: false,
    defaultValue: 'no_css_target'
  },
  position: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
    defaultValue: 1000
  }
});
custom.sync();
exports.custom = custom;

const customize = sequelize.define('customize', {
  id_customize: {
    type: Sequelize.INTEGER(32),
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  brand: {
    type: Sequelize.STRING(255),
    allowNull: false,
    defaultValue: 'no_brand'
  },
  slug: {
    type: Sequelize.STRING(255),
    allowNull: false,
    defaultValue: 'no_slug'
  },
  segmentType: {
    type: Sequelize.STRING(255),
    allowNull: false,
    defaultValue: 'no_segment_type'
  },
  segmentSlug: {
    type: Sequelize.STRING(255),
    allowNull: false,
    defaultValue: 'no_segment_slug'
  },
  content: {
    type: Sequelize.STRING(512),
    allowNull: false,
    defaultValue: 'no_content'
  },
  active: {
    type: Sequelize.INTEGER(1),
    allowNull: false,
    defaultValue: 1
  },
  test: {
    type: Sequelize.INTEGER(1),
    allowNull: false,
    defaultValue: 0
  },
  position: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
    defaultValue: 1000
  }
});

customize.sync();
exports.customize = customize;
*/
