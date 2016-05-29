#packages
express = require 'express'
bodyparser = require 'body-parser'
connection = require './connection'
routes = require './routes'

#configure app and get data from post
app = express()
app.use bodyparser.urlencoded(extended: true)
app.use bodyparser.json()

#set port
port = process.env.PORT || 1337

#set  and routes routes
router = express.Router()
connection.init()
routes.configure(app, router)

#start server
server = app.listen(port)
console.log 'Server started on port ' + port