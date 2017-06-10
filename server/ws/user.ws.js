const userService = require('../services/user.service');

const intervalTimeout = 500;
let intervalRef;

module.exports = function(io, socket){
    socket.on('getAllConnectedUsers', () => {
        socket.emit('allConnectedUsers', userService.getUsersState())
    })    
    socket.on('setUserInactive', (data) => {
        var user = userService.updateUser({id: socket.id, active: false})
        io.emit('userUpdate', user);
    })
    socket.on('changeUsername', (data) => {
        var user = userService.updateUser({id: socket.id, username: data.username});
        io.emit('userUpdate', user);
    })
}