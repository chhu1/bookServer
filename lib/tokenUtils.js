var jwt = require('jwt-simple');
var constant = require('../constant/constant');

function addRelativeDays(days, date) {
    var d = date || new Date().getTime();
    return parseInt(d) + days * 24 * 3600 * 1000;
}

var setToken = function(userId) {
    return jwt.encode({
        iss: userId,
        exp: addRelativeDays(7)
    }, constant.tokenString);
}

var getToken = function(token) {
    return jwt.decode(token, constant.tokenString);
}

module.exports = {
    setToken: setToken,
    getToken: getToken
};
