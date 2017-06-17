const chatService = require('../services/chat.service');
const userService = require('../services/user.service');

module.exports = function(io, socket){
    socket.on('sendChatMessage', (data) => {
        sendChatMessage(data, io, socket)
    });
    socket.on('getChatHistory', () => getChatMessages(socket));
} 

function sendChatMessage(data, io, socket){
    var user = userService.getUserById(socket.id);
    data.user = user;
    data.message = data.message.substr(0,500)
    chatService.addChatMessage(data)
    .then(() => {
        io.sockets.emit('chatMessage', data);
    })
}

function getChatMessages(socket){
    chatService
    .getChatHistory()
    .then((data)=>{
        socket.emit('allChatHistory', data);
    })
}