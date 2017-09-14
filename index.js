/**
 * @title   Shell's Link Checker
 * @author  Jon Taylor
 * @since   0.1
 */
'use strict';

// Getting Required Modules
const
  express = require('express'),
  app = express(),
  mongoose = require('mongoose'),
  http = require('http').Server(app),
  io = require('socket.io')(http),
  port = process.env.port || 3000,
  cookieParser = require('cookie-parser'),
  user = require('./user');

// Mongoose Setup
mongoose.connect('mongodb://localhost/b4b', {useMongoClient: true});
mongoose.Promise = global.Promise;

// Express Middleware
// Pug
// Body-Parser
// Static Files
app.set('view engine', 'pug');
app.set('views', `${__dirname}/view/pug/`);
app.use('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use('/js/', express.static(`${__dirname}/view/js`));
app.use('/css/', express.static(`${__dirname}/view/css`));
app.use('/fonts/', express.static(`${__dirname}/view/fonts`));

// Socket IO
io.on('connection', (socket) => {

  require('./sockets')(socket);
});

// Root Connection really should be the only connection.
app.get('/*', (req, res) => {
  res.render(`index`);
  res.end();
});

// Start Server
http.listen(port, () => {
  console.log(`Shell's Link Checker has taken Port ${port}`);
});