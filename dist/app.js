var app, bodyparser, connection, express, port, router, routes, server;

express = require('express');

bodyparser = require('body-parser');

connection = require('./connection');

routes = require('./routes');

app = express();

app.use(bodyparser.urlencoded({
  extended: true
}));

app.use(bodyparser.json());

port = process.env.PORT || 1337;

router = express.Router();

connection.init();

routes.configure(app, router);

server = app.listen(port);

console.log('Server started on port ' + port);
