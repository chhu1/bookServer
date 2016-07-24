var url = require('url');
var mongoose = require('mongoose');
var constant = require('../constant/constant');
var tokenUtils = require('../lib/tokenUtils');
var User = require('../models/User')(mongoose);

module.exports = function validToken(req, res, next) {
    var parsedUrl = url.parse(req.url, true)
    var token = (req.body && req.body.token) || parsedUrl.query.token;
    var userId = (req.body && req.body.userId) || parsedUrl.query.userId;
    if (token && userId) {
        var decoded = tokenUtils.getToken(token);
        if (decoded.exp <= Date.now() || decoded.iss != userId) {
            res.json({ status: 0, errorMsg: constant.errorMsg['10000'], errorCode: 10000 });
        } else {
            User.findOne({ 'userId': decoded.iss }, function(err, user) {
                if (!err && user) {
                    req.resUser = user
                    return next()
                }
                res.json({ status: 0, errorMsg: constant.errorMsg['10000'], errorCode: 10000 });
            });
        }
    } else {
        if (req.url in constant.noTokenApis) {
            return next();
        }
        res.json({ status: 0, errorMsg: constant.errorMsg['10000'], errorCode: 10000 });
    }
}
