const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const ws = require('./server/ws');
const authService = require('./server/services/auth.service');
const passport = require('passport');

authService.initializeAuthStrategy(passport);

//API routes
const api = require('./server/api');

const app = express();

//Parser for POSTed data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));

//Static files served from __DIR/dist/
app.use(express.static(path.join(__dirname, 'dist')));

//use api routes
app.use('/api', api);

//All other requests get the angular app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
})

//set port
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

//Create server
const server = http.createServer(app);

//set websocket actions on server
ws(server);

//listen
server.listen(port);

//post listen events
server.on('error', (err) => {
    console.error(err);
    throw err;
})
server.on('listening', () => {
    console.log('listening on ' + server.address().port);
})

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}