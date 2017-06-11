const socketIo = require('socket.io');

const userService = require('../services/user.service');

const random = require('../lib/helpers/random');

const connectionWs = require('./connection.ws');
const drawWs = require('./draw.ws');
const chatWs = require('./chat.ws');
const userWs = require('./user.ws');

module.exports = function (server){
    var ioRef = socketIo(server);

    ioRef.on('connection', function(socket){
        var newUser = {
            id: socket.id,
            username: random.randomUsername(),
            socket: socket,
            x: 0,
            y: 0,
            active: false,
            chipColor: random.randomColor()
        };
        var safeUser = userService.addConnectedUser(newUser);
        ioRef.sockets.emit('userConnected', safeUser)

        //All websocket actions
        drawWs(ioRef, socket);
        chatWs(ioRef, socket);
        userWs(ioRef, socket);
        connectionWs(ioRef, socket);
    })    
}