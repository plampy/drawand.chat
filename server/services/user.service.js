const inMem = require('../in-mem');
const User = require('../models/user');

module.exports = {
    addConnectedUser: addConnectedUser,
    removeConnectedUser: removeConnectedUser,
    getUsersState: getUsersState,
    updateUser: updateUser
};

function getUsersState() {
    return inMem.users.map(user => user.getClientSafeProperties())
}

function updateUser(data) {
    var person = inMem.users.find(x => x.id == data.id);
    if (person) {
        person.x = data.x || person.x;
        person.y = data.y || person.y;
        person.active = data.active;
        person.lastDrawAction = data.lastDrawAction || person.lastDrawAction;
        person.username = data.username || person.username;
    }
    return person.getClientSafeProperties();
}

function addConnectedUser(data) {
    //inMem.users.push(data);
    var user = new User(data);
    inMem.users.push(user);
    return user.getClientSafeProperties();
}

function removeConnectedUser(id) {
    inMem.users = inMem.users.filter(x => x.id !== id);
    
}

