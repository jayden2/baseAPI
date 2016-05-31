mysql = require('mysql')

#create connection pool
#function Connection() {
Connection = ->
	@pool = null
	#initiase connection pool with username, password database etc
	@init = ->
		@pool = mysql.createPool(
			connectionLimit: 10
			host: 'https://student.mydesign.central.wa.edu.au'
			user: '041501736_base'
			password: '#Cyur851'
			database: '041501736_moviebase')
	#connect and get callback
	@acquire = (callback) ->
		@pool.getConnection (err, connection) ->
			callback err, connection
			return
		return
	return

module.exports = new Connection()