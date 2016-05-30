jwt = require 'jsonwebtoken'
bcrypt = require 'bcrypt-nodejs'
connection = require '../connection'
secretPassword = 'superSpecialSecretPasswordThatNooneWouldEverGuess1'
#get, create, update and delte
#function User() {
User = ->
	#get all users
	#do connection, select all from users
	@getAllUsers = (res) ->
		connection.acquire (err, con) ->
			con.query 'SELECT id, username, email FROM users', (err, result) ->
				con.release()
				res.send result
				return
			return
		return
	#get one user
	#do connection, select one user from database
	@getSingleUser = (id, res) ->
		connection.acquire (err, con) ->
			con.query 'SELECT id, username, password FROM users WHERE id = ?', [id], (err, result) ->
				con.release()
				res.send result
				return
			return
		return
	#check if email already exists when we create a user
	#do connection, count users from database who have that username
	@checkValidEmail = (email, res) ->
		connection.acquire (err, con) ->
			con.query 'SELECT COUNT(id) AS user_count FROM users WHERE email = ?', [email], (err, result) ->
				con.release()
				res.send result
				return
			return
		return
	#check if user exists when a user tries to login
	#do connection, count if user exists
	@checkValidUser = (app, user, res) ->
		connection.acquire (err, con) ->
			con.query 'SELECT *, COUNT(id) as user_count FROM users WHERE email = ?', [user.email], (err, result) ->
				con.release()
				pwd = hashPassword(user.password)
				#if username doesnt exist, dont auth
				if result[0].user_count != 1
					res.send
						success: false
						message: 'Authentication failed. User not found.'
				else if result[0].user_count == 1
					#if password doesnt match, dont auth
					if !bcrypt.compareSync result[0].password, pwd
						res.send
							success: false
							message: 'Authentication failed. Wrong password.'
					else
						#create token that expires in 7 days
						token = jwt.sign(user, secretPassword, expiresIn: '7 days')
						#send token to user
						res.send
							success: true
							message: 'Token Get!',
							token: token
				return
			return
		return
	@verifyUser = (req, res, next) ->
		#log api request
		console.log 'API Accessed.'
		#store token, and get it from where it was sent from
		token = req.body.token || req.query.token || req.headers['x-access-token']
		#decode token
		if token
			jwt.verify token, secretPassword, (err, decode) ->
				if err
					#if token password is out of date or is incorrect then send authentication failure
					return res.status(403).send(
						success: false
						message: 'Failed to authenticate token.')
				else
					#if token verified save to request for use in other routes
					req.decode = decode
					next()
				return
		else
			#if no token was sent
			return res.status(403).send(
				success: false
				message: 'No token given. Please send request with a token.')
		return
	#do connection, insert user data into database
	@createUser = (user, res) ->
		pwd = hashPassword(user.password)
		connection.acquire (err, con) ->
			con.query 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [user.username, user.email, pwd], (err, result) ->
				con.release()
				#error check if succesful query or not
				if err
					res.send
						status: 1
						message: 'failed creating user'
				else
					res.send
						status: 0
						message: 'user created successfully'
				return
			return
		return

	#update
	#do connection, update user data item with id
	@updateUser = (user, id, res) ->
		pwd = hashPassword(user.password)
		connection.acquire (err, con) ->
			con.query 'UPDATE users SET username = ?, email = ?, password = ? WHERE id = ?', [user.username, user.email, pwd, id], (err, result) ->
				con.release()
				#error check if successful query or not
				if err
					res.send
						status: 1
						message: 'user update failed'
				else
					res.send
						status: 0
						message: 'user updated successfully'
				return
			return
		return

	#delete
	#do connection, delete user data with id
	@deleteUser = (id, res) ->
		connection.acquire (err, con) ->
			con.query 'DELETE FROM users WHERE id = ?', [id], (err, result) ->
				con.release()
				#error check if successful query or not
				if err
					res.send
						status: 1
						message: 'failed deleting user'
				else
					res.send
						status: 0
						message: 'user deleted successfully'
				return
			return
		return

	#create hash
	hashPassword = (pwd) ->
		hash = bcrypt.hashSync pwd
		return hash

module.exports = new User()