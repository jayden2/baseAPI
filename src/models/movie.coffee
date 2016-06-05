connection = require '../connection'
#get, create, update and delte
#function Movie() {
Movie = ->
	#get all movie reviews
	#do connection, select all from movies
	@getAllMovies = (res) ->
		connection.acquire (err, con) ->
			con.query 'SELECT * FROM movies', (err, result) ->
				con.release()
				res.send result
				return
			return
		return
	#get a single movie review
	#do connection, movie review from id
	@getSingleMovie = (id, res) ->
		connection.acquire (err, con) ->
			con.query 'SELECT * FROM movies WHERE id = ?', [id] ,(err, result) ->
				con.release()
				res.send result
				return
			return
		return
	#get all movie reviews from a single user
	#do connection, select all from movies from a single user
	@getUserMovies = (id, res) ->
		connection.acquire (err, con) ->
			con.query 'SELECT * FROM movies WHERE user_id = ?', [id] ,(err, result) ->
				con.release()
				res.send result
				return
			return
		return
	#create
	#do connection, insert movie data into database
	@createMovie = (movie, res) ->
		connection.acquire (err, con) ->
			con.query 'INSERT INTO movies (title, rating, description, score, review, cover, year, genre, user_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
			[movie.title, movie.rating, movie.description, movie.score, movie.review, movie.cover, movie.year, movie.genre, movie.user_id], (err, result) ->
				con.release()
				#error check if succesful query or not
				if err
					return res.status(403).send(
						success: false
						message: 'failed creating movie review')
				else
					res.send
						success: true
						message: 'movie review created successfully'
				return
			return
		return

	#update
	#do connection, update movie item with id
	@updateMovie = (movie, id, res) ->
		connection.acquire (err, con) ->
			con.query 'UPDATE movies SET title = ?, rating = ?, description = ?, score = ?, review = ?, cover = ?, year = ?, genre = ? WHERE id = ?',
			[movie.title, movie.rating, movie.description, movie.score, movie.review, movie.cover, movie.year, movie.genre, id], (err, result) ->
				con.release()
				#error check if successful query or not
				if err
					return res.status(403).send(
						success: false
						message: 'failed updating movie review')
				else
					res.send
						success: true
						message: 'movie review updated successfully'
				return
			return
		return

	#delete
	#do connection, delete movie with id
	@deleteMovie = (id, res) ->
		connection.acquire (err, con) ->
			con.query 'DELETE FROM movies WHERE id = ?', [id], (err, result) ->
				con.release()
				#error check if successful query or not
				if err
					return res.status(403).send(
						success: false
						message: 'failed deleting movie review')
				else
					res.send
						success: true
						message: 'movie review deleted successfully'
				return
			return
		return
	return

module.exports = new Movie()