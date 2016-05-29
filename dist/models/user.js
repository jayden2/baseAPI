var User, connection, jwt;

jwt = require('jsonwebtoken');

connection = require('../connection');

function User() {
  this.getAllUsers = function(res) {
    connection.acquire(function(err, con) {
      con.query('SELECT * FROM users', function(err, result) {
        con.release();
        res.send(result);
      });
    });
  };
  this.getSingleUser = function(id, res) {
    connection.acquire(function(err, con) {
      con.query('SELECT * FROM users WHERE id = ?', [id], function(err, result) {
        con.release();
        res.send(result);
      });
    });
  };
  this.checkValidEmail = function(email, res) {
    connection.acquire(function(err, con) {
      con.query('SELECT COUNT(id) AS user_count FROM users WHERE email = ?', [email], function(err, result) {
        con.release();
        res.send(result);
      });
    });
  };
  this.checkValidUser = function(app, user, res) {
    connection.acquire(function(err, con) {
      con.query('SELECT *, COUNT(id) as user_count FROM users WHERE email = ?', [user.email], function(err, result) {
        var token;
        con.release();
        if (result[0].user_count !== 1) {
          res.send({
            success: false,
            message: 'Authentication failed. User not found.'
          });
        } else if (result[0].user_count === 1) {
          if (user.password !== result[0].password) {
            res.send({
              success: false,
              message: 'Authentication failed. Wrong password.'
            });
          } else {
            token = jwt.sign(user, 'superSecret', {
              expiresIn: '7 days'
            });
            res.send({
              success: true,
              message: 'Token Get!',
              token: token
            });
          }
        }
      });
    });
  };
  this.createUser = function(user, res) {
    connection.acquire(function(err, con) {
      con.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [user.username, user.email, user.password], function(err, result) {
        con.release();
        if (err) {
          res.send({
            status: 1,
            message: 'failed creating user'
          });
        } else {
          res.send({
            status: 0,
            message: 'user created successfully'
          });
        }
      });
    });
  };
  this.updateUser = function(user, id, res) {
    connection.acquire(function(err, con) {
      con.query('UPDATE users SET username = ?, email = ?, password = ? WHERE id = ?', [user.username, user.email, user.password, id], function(err, result) {
        con.release();
        if (err) {
          res.send({
            status: 1,
            message: 'user update failed'
          });
        } else {
          res.send({
            status: 0,
            message: 'user updated successfully'
          });
        }
      });
    });
  };
  this.deleteUser = function(id, res) {
    connection.acquire(function(err, con) {
      con.query('DELETE FROM users WHERE id = ?', [id], function(err, result) {
        con.release();
        if (err) {
          res.send({
            status: 1,
            message: 'failed deleting user'
          });
        } else {
          res.send({
            status: 0,
            message: 'user deleted successfully'
          });
        }
      });
    });
  };
};

module.exports = new User();
