var util = require('util');
var constant = require('../constant/constant');

function preTreat(req, res, next) {
    util.log(req.method + " request to url : " + req.route.path);
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', constant.reqDomain);
    res.setHeader('Content-Type', 'application/json');
    next();
}

function errorHandler(req, res, next) {
    util.log(req.resError);
    res.status(500);
    res.json({ status: 0, errorMsg: constant.errorMsg['20000'], errorCode: 20000 });
}

module.exports = {
    preTreat: preTreat,
    errorHandler: errorHandler
}
