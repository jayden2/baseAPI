var Connection, mysql;

mysql = require('mysql');

function Connection() {
  this.pool = null;
  this.init = function() {
    return this.pool = mysql.createPool({
      connectionLimit: 10,
      host: 'student.mydesign.central.wa.edu.au',
      user: '041501736_base',
      password: '#Cyur851',
      database: '041501736_moviebase'
    });
  };
  this.acquire = function(callback) {
    this.pool.getConnection(function(err, connection) {
      callback(err, connection);
    });
  };
};

module.exports = new Connection();
