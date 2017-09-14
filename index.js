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
  pug = require('pug'),
  User = require('./user');

// Mongoose Setup
mongoose.connect('mongodb://localhost/b4b', {useMongoClient: true});
mongoose.Promise = global.Promise;

// Express Middleware
// Pug
// Body-Parser
// Static Files
// Cookie-Parser
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
app.use(cookieParser());

// Socket IO
io.on('connection', (socket) => {
  socket.emit('request user session');
  socket.on('requested user session', function(session) {
    let html = '';
    if(session) {
      let user = io.user[session];
      user.readToken(session);
      if(user.error) {
        socket.user = null;
        html = pug.compileFile('view/pug/loginMenu.pug')();
        this.emit('requested', 'tag', 'menu', html);
      } else {
        socket.user = user;
        if(io.sockets.connected[user.socket])
          io.sockets.connected[user.socket].disconnect();
        socket.user.socket = socket.id;
        let html = pug.compileFile('view/pug/menu.pug')();
        this.emit('requested', 'tag', 'menu', html);
        socket.emit('update user session', socket.user.session);
      }
    } else {
      html = pug.compileFile('view/pug/loginMenu.pug')();
      this.emit('requested', 'tag', 'menu', html);
    }
    require('./sockets')(socket);
  });
});

// Checking for a session.
app.all('*', (req, res, next) => {
  let user = null;
  if(req.cookies.session) {
    io.user[req.cookies.session] = new User();
  }
  next();
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