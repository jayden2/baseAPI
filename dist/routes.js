var movie, user;

movie = require('./models/movie');

user = require('./models/user');

module.exports = {
  configure: function(app, router) {
    router.get('/', function(req, res) {
      return res.json({
        message: 'Base API up and running! What would you like sir?'
      });
    });
    router.get('/users/', function(req, res) {
      return user.getAllUsers(res);
    });
    router.get('/users/:id/', function(req, res) {
      return user.getSingleUser(req.params.id, res);
    });

    /*
    	checkValidEmail
    	checkValidUser
     */
    router.post('/users/', function(req, res) {
      return user.createUser(req.body, res);
    });
    router.put('/users/:id/', function(req, res) {
      return user.updateUser(req.body, req.params.id, res);
    });
    router["delete"]('/users/:id/', function(req, res) {
      return user.deleteUser(req.params.id, res);
    });
    router.get('/movies/', function(req, res) {
      return movie.getAllMovies(res);
    });
    router.get('/movies/:id/', function(req, res) {
      return movie.getSingleMovie(req.params.id, res);
    });
    router.get('/users/:id/movies/', function(req, res) {
      return movie.getUserMovies(req.params.id, res);
    });
    router.post('/movies/', function(req, res) {
      return movie.createMovie(req.body, res);
    });
    router.put('/movies/:id/', function(req, res) {
      return movie.updateMovie(req.body, req.params.id, res);
    });
    router["delete"]('/movies/:id/', function(req, res) {
      return movie.deleteMovie(req.params.id, res);
    });
    return app.use('/api', router);
  }
};
