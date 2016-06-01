var User, bcrypt, connection, jwt, secretPassword;

jwt = require('jsonwebtoken');

bcrypt = require('bcrypt-nodejs');

connection = require('../connection');

secretPassword = 'superSpecialSecretPasswordThatNooneWouldEverGuess1';

User = function() {
  var hashPassword;
  this.getAllUsers = function(res) {
    connection.acquire(function(err, con) {
      con.query('SELECT id, username, email FROM users', function(err, result) {
        con.release();
        res.send(result);
      });
    });
  };
  this.getSingleUser = function(id, res) {
    connection.acquire(function(err, con) {
      con.query('SELECT id, username, email FROM users WHERE id = ?', [id], function(err, result) {
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
          if (!bcrypt.compareSync(user.password, result[0].password)) {
            res.send({
              success: false,
              message: 'Authentication failed. Wrong password.'
            });
          } else {
            token = jwt.sign(user, secretPassword, {
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
  this.verifyUser = function(req, res, next) {
    var token;
    console.log('API Accessed.');
    token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (token) {
      jwt.verify(token, secretPassword, function(err, decode) {
        if (err) {
          return res.status(403).send({
            success: false,
            message: 'Failed to authenticate token.'
          });
        } else {
          req.decode = decode;
          next();
        }
      });
    } else {
      return res.status(403).send({
        success: false,
        message: 'No token given. Please send request with a token.'
      });
    }
  };
  this.createUser = function(user, res) {
    var pwd;
    pwd = hashPassword(user.password);
    connection.acquire(function(err, con) {
      con.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [user.username, user.email, pwd], function(err, result) {
        con.release();
        if (err) {
          return res.status(403).send({
            success: false,
            message: 'failed creating user'
          });
        } else {
          res.send({
            success: true,
            message: 'user created successfully'
          });
        }
      });
    });
  };
  this.updateUser = function(user, id, res) {
    var pwd;
    pwd = hashPassword(user.password);
    connection.acquire(function(err, con) {
      con.query('UPDATE users SET username = ?, email = ?, password = ? WHERE id = ?', [user.username, user.email, pwd, id], function(err, result) {
        con.release();
        if (err) {
          return res.status(403).send({
            success: false,
            message: 'user update failed'
          });
        } else {
          res.send({
            success: true,
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
          return res.status(403).send({
            success: false,
            message: 'failed deleting user'
          });
        } else {
          res.send({
            success: true,
            message: 'user deleted successfully'
          });
        }
      });
    });
  };
  hashPassword = function(pwd) {
    var hash;
    hash = bcrypt.hashSync(pwd);
    return hash;
  };
};

module.exports = new User();
