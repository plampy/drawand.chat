const drawService = require('../services/draw.service');
const userService = require('../services/user.service');

module.exports = function (io, socket) {
    socket.on('drawAction', (data) => { 
        drawService.pushDrawAction(data);
        if(data.type === "strokePath"){
            var user = userService.updateUser({
                id: socket.id,
                x: data.endX,
                y: data.endY,
                active: true,
                lastDrawAction: new Date()  
            })
            if(user){
                io.sockets.emit('userUpdate', user);
            }
        }
        socket.broadcast.emit('drawAction', data);

    });
    socket.on('getDrawHistory', () => {
        getDrawActions({}, socket);
    })
}

function getDrawActions(data, socket) {
    socket.emit('drawActions', drawService.getDrawActions());
}