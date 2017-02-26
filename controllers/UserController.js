var util = require('util');
var crypto = require('crypto');
var mongoose = require('mongoose');

var setId = require('../lib/ids');
var validToken = require('./tokenController');
var tokenUtils = require('../lib/tokenUtils');
var UtilController = require('./UtilController');
var constant = require('../constant/constant');
var validator = require('../lib/validator');
var User = require('../models/User')(mongoose);

var UserController = function(app, mongoose, config) {
    app.post('/user/register.do', UtilController.preTreat, validToken, function(req, res, next) {
        var email = req.body.email;
        var password = req.body.password;
        if (!validator({ isEmail: true })(email)) {
            return res.json({ status: 0, errorMsg: constant.errorMsg['10001'], errorCode: 10001 })
        }
        if (!validator({ minLength: 6, maxLength: 16 })(password)) {
            return res.json({ status: 0, errorMsg: constant.errorMsg['10002'], errorCode: 10002 })
        }
        User.findOne({ email: email }, function(err, userInfo) {
            if (err) {
                req.resError = err;
                next();
            } else {
                if (userInfo) {
                    return res.json({ status: 0, errorMsg: constant.errorMsg['10003'], errorCode: 10003 })
                } else {
                    var userModel = new User();
                    userModel.email = email;
                    userModel.password = crypto.createHash('md5').update(password).digest("hex");
                    setId('userId', function(err, id) {
                        if (err) {
                            req.resError = err;
                            next();
                        } else {
                            userModel.userId = id;
                            userModel.save(function(err) {
                                if (err) {
                                    req.resError = err;
                                    next();
                                } else {
                                    res.json({ status: 1, msg: '', data: {} });
                                }
                            })
                        }
                    })
                }
            }
        })
    }, UtilController.errorHandler);

    app.post('/user/login.do', UtilController.preTreat, validToken, function(req, res, next) {
        var email = req.body.email;
        var password = req.body.password;
        if (!validator({ isEmail: true })(email)) {
            return res.json({ status: 0, errorMsg: constant.errorMsg['10001'], errorCode: 10001 })
        }
        if (!validator({ minLength: 6, maxLength: 16 })(password)) {
            return res.json({ status: 0, errorMsg: constant.errorMsg['10002'], errorCode: 10002 })
        }
        User.findOne({ email: email }, function(err, userInfo) {
            if (err) {
                req.resError = err;
                next();
            } else {
                if (userInfo && crypto.createHash('md5').update(password).digest("hex") == userInfo.password) {
                    res.json({
                        status: 1,
                        msg: '',
                        data: {
                            userId: userInfo.userId,
                            token: tokenUtils.setToken(userInfo.userId)
                        }
                    });
                } else {
                    res.json({ status: 0, errorMsg: constant.errorMsg['10004'], errorCode: 10004 })
                }
            }
        })
    }, UtilController.errorHandler);
}

module.exports = UserController;
