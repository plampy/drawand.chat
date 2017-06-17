const Promise = require('es6-promise').Promise;
const inMem = require('../in-mem');
const chatHistoryLength = 500;

module.exports = {
    getChatHistory: function() {
        return new Promise((res, rej) => {
            res(inMem.chatMessages.slice(-chatHistoryLength));
        })
    },
    addChatMessage: function(data) {
        return new Promise((res, rej) => {
            inMem.chatMessages.push(data);
            res();
        })
    }
};