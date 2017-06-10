const chatService = require('../services/chat.service');

module.exports = function(io, socket){
    socket.on('sendChatMessage', sendChatMessage);
    socket.on('getChatMessages', getChatMessages);
}

function sendChatMessage(data){
    
}

function getChatMessages(data){

}