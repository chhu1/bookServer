var util = require('util');
var crypto = require('crypto');

var setId = require('../lib/ids');
var validSession = require('./SessionController');
var UtilController = require('./UtilController');
var constant = require('../constant/constant');
var validator = require('../lib/validator');

UserController = function(app, mongoose, config) {
    var User = mongoose.model('User');

    app.post('/user/register.do', UtilController.preTreat, validSession, function(req, res, next) {
        var email = req.body.email;
        var password = req.body.password;
        if (!validator({ isEmail: true })(email)) {
            res.json({ status: 0, errorMsg: constant.errorMsg['10001'], errorCode: 10001 })
        }
        if (!validator({ minLength: 6, maxLength: 16 })(password)) {
            res.json({ status: 0, errorMsg: constant.errorMsg['10002'], errorCode: 10002 })
        }
        User.findOne({ email: email }, function(err, userInfo) {
            if (err) {
                req.resError = err;
                next();
            } else {
                if (userInfo) {
                    res.json({ status: 0, errorMsg: constant.errorMsg['10003'], errorCode: 10003 })
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
    }, UtilController.errorHandler)
}

// req.session.user = password;

module.exports = UserController;
