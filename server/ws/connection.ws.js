const userService = require('../services/user.service');

module.exports = function(io, socket){
    socket.on('disconnect', function(){
        //TODO: pass the right data
        userService.removeConnectedUser(socket.id);
        io.sockets.emit('userDisconnected', {id: socket.id });
    })
}