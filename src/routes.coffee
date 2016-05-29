movie = require './models/movie'
user = require './models/user'

module.exports = configure: (app, router) ->

	#api
	router.get '/', (req, res) ->
		res.json message: 'Base API up and running! What would you like sir?'

	##----------------##
	##--USER ROUTES---##
	##----------------##
	
	#get all users
	router.get '/users/', (req, res) ->
		user.getAllUsers res
	
	#get 1 user
	router.get '/users/:id/', (req, res) ->
		user.getSingleUser req.params.id, res
	
	#authenticate user
	#valid email
	###
	checkValidEmail
	checkValidUser
	###

	#create user
	router.post '/users/', (req, res) ->
		user.createUser req.body, res
	
	#update user
	router.put '/users/:id/', (req, res) ->
		user.updateUser req.body, req.params.id, res
	
	#delete user
	router.delete '/users/:id/', (req, res) ->
		user.deleteUser req.params.id, res

	##----------------##
	##--MOVIE ROUTES--##
	##----------------##

	#get all movies
	router.get '/movies/', (req, res) ->
		movie.getAllMovies res
	
	#get 1 movie
	router.get '/movies/:id/', (req, res) ->
		movie.getSingleMovie req.params.id, res
	
	#get movies from a specfic user
	router.get '/users/:id/movies/', (req, res) ->
		movie.getUserMovies req.params.id, res
	
	#create movie
	router.post '/movies/', (req, res) ->
		movie.createMovie req.body, res
	
	#update movie
	router.put '/movies/:id/', (req, res) ->
		movie.updateMovie req.body, req.params.id, res
	
	#delete movie
	router.delete '/movies/:id/', (req, res) ->
		movie.deleteMovie req.params.id, res

	##GLOBAL ROUTE##
	#prepend all api calls with /api exp: /api/users/
	app.use '/api', router