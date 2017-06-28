var mysqlconfig = {
  user: 'converfit',
  password: 'C0nv3rf1t@MySql',
  host: '52.169.9.114',
  port: '3306',
  database: 'iglink',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
};

module.exports = mysqlconfig;
