var Movie, connection;

connection = require('../connection');

function Movie() {
  this.getAllMovies = function(res) {
    connection.acquire(function(err, con) {
      con.query('SELECT * FROM movies', function(err, result) {
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
      con.query('INSERT INTO movies (title, rating, description, review, cover, year, user_id) VALUES (?, ?, ?, ?, ?, ?, ?)', [movie.title, movie.rating, movie.description, movie.review, movie.cover, movie.year, movie.user_id], function(err, result) {
        con.release();
        if (err) {
          res.send({
            status: 1,
            message: 'failed creating movie review'
          });
        } else {
          res.send({
            status: 0,
            message: 'movie review created successfully'
          });
        }
      });
    });
  };
  this.updateMovie = function(movie, id, res) {
    connection.acquire(function(err, con) {
      con.query('UPDATE movies SET title = ?, rating = ?, description = ?, review = ?, cover = ?, year = ? WHERE id = ?', [movie.title, movie.rating, movie.description, movie.review, movie.cover, movie.year, id], function(err, result) {
        con.release();
        if (err) {
          res.send({
            status: 1,
            message: 'failed updating movie review'
          });
        } else {
          res.send({
            status: 0,
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
          res.send({
            status: 1,
            message: 'failed deleting movie review'
          });
        } else {
          res.send({
            status: 0,
            message: 'movie review deleted successfully'
          });
        }
      });
    });
  };
};

module.exports = new Movie();
