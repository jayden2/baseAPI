var Movie, connection;

connection = require('../connection');

function Movie() {
  this.getAllMovies = function(res) {
    connection.acquire(function(err, con) {
      con.query('SELECT * FROM movies ORDER BY updated_at DESC', function(err, result) {
        con.release();
        res.send(result);
      });
    });
  };
  this.getSingleMovie = function(id, res) {
    connection.acquire(function(err, con) {
      con.query('SELECT * FROM movies WHERE id = ?', [id], function(err, result) {
        con.release();
        res.send(result);
      });
    });
  };
  this.getUserMovies = function(id, res) {
    connection.acquire(function(err, con) {
      con.query('SELECT * FROM movies WHERE user_id = ?', [id], function(err, result) {
        con.release();
        res.send(result);
      });
    });
  };
  this.createMovie = function(movie, res) {
    connection.acquire(function(err, con) {
      var timenow;
      timenow = new Date();
      con.query('INSERT INTO movies (title, rating, description, score, review, cover, year, genre, user_id, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [movie.title, movie.rating, movie.description, movie.score, movie.review, movie.cover, movie.year, movie.genre, movie.user_id, moment(timenow).format('YYYY-MM-DD HH:mm:ss')], function(err, result) {
        con.release();
        if (err) {
          return res.status(403).send({
            success: false,
            message: 'failed creating movie review'
          });
        } else {
          res.send({
            success: true,
            message: 'movie review created successfully'
          });
        }
      });
    });
  };
  this.updateMovie = function(movie, id, res) {
    connection.acquire(function(err, con) {
      con.query('UPDATE movies SET title = ?, rating = ?, description = ?, score = ?, review = ?, cover = ?, year = ?, genre = ? WHERE id = ?', [movie.title, movie.rating, movie.description, movie.score, movie.review, movie.cover, movie.year, movie.genre, id], function(err, result) {
        con.release();
        if (err) {
          return res.status(403).send({
            success: false,
            message: 'failed updating movie review'
          });
        } else {
          res.send({
            success: true,
            message: 'movie review updated successfully'
          });
        }
      });
    });
  };
  this.deleteMovie = function(id, res) {
    connection.acquire(function(err, con) {
      con.query('DELETE FROM movies WHERE id = ?', [id], function(err, result) {
        con.release();
        if (err) {
          return res.status(403).send({
            success: false,
            message: 'failed deleting movie review'
          });
        } else {
          res.send({
            success: true,
            message: 'movie review deleted successfully'
          });
        }
      });
    });
  };
};

module.exports = new Movie();
