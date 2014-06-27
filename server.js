'use strict';

var express = require('express'),
    path = require('path'),
    http = require('http'),
    app = express(),
    server = http.createServer(app),
    io = require('socket.io').listen(server),
    fs = require('fs'),
    mongoose = require('mongoose');

/**
 * Main application file
 */

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var config = require('./lib/config/config');
var db = mongoose.connect(config.mongo.uri, config.mongo.options);

// Bootstrap models
var modelsPath = path.join(__dirname, 'lib/models');
fs.readdirSync(modelsPath).forEach(function (file) {
  if (/(.*)\.(js$|coffee$)/.test(file)) {
    require(modelsPath + '/' + file);
  }
});

// Populate empty DB with sample data
// require('./lib/config/dummydata');

// Passport Configuration
var passport = require('./lib/config/passport');

// Setup Express
require('./lib/config/express')(app);
require('./lib/routes')(app);

require('./lib/config/sockets')(io);
// Start server
server.listen(config.port, config.ip, function () {
  console.log('Express server listening on %s:%d, in %s mode', config.ip, config.port, app.get('env'));
});

// var io = require('socket.io').listen(server);

// io.sockets.on('connection', function(socket) {
//   socket.on('ferret', function (name, fn) {
//     fn('woot');
//   });

//   socket.on('createItem', function(data) {
//     socket.broadcast.emit('onItemCreated', data);
//   });

//   socket.on('updateItem', function(data) {
//     socket.broadcast.emit('onItemUpdated', data);
//   });

//   socket.on('deleteItem', function(data){
//     socket.broadcast.emit('onItemDeleted', data);
//   });
// });

// Expose app
exports = module.exports = app;
