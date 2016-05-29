mysql = require('mysql')

#create connection pool
#function Connection() {
Connection = ->
	@pool = null
	#initiase connection pool with username, password database etc
	@init = ->
		@pool = mysql.createPool(
			connectionLimit: 10
			host: 'localhost'
			user: 'root'
			password: ''
			database: 'movie_base')
	#connect and get callback
	@acquire = (callback) ->
		@pool.getConnection (err, connection) ->
			callback err, connection
			return
		return
	return

module.exports = new Connection()