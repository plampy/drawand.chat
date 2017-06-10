const Promise = require('es6-promise').Promise;

const passport = require('passport');
const Strategy = require('passport-http-bearer').Strategy;

module.exports = {
    initializeAuthStrategy: initializeAuthStrategy,
    getUserFromToken: getUserFromToken,
    authenticateUser: authenticateUser,
    registerUser: registerUser
}

function initializeAuthStrategy(passport){
    passport.use(new Strategy((token, callback) => {
        getUserFromToken
        .then(callback);
    }));
}

function getUserFromToken(token){
    return new Promise((resolve, reject) => {
        resolve({});
    });
}

function authenticateUser(authData){
    return new Promise((resolve, reject) => {
        resolve({});
    });
}

function registerUser(regData){
    return new Promise((resolve, reject) => {
        resolve({});
    });
}