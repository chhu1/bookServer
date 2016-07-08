var util = require('util');
var Logger = require('devnull');
var logger = new Logger({ namespacing: 0 });
var User = require('../models/User');
var crypto = require('crypto');
var setId = require('../lib/ids');

UserController = function(app, mongoose, config) {
    var User = mongoose.model('User');

    app.post('/user/register.do?', function(req, res, next) {
        res.setHeader("Access-Control-Allow-Credentials", true);
        res.setHeader("Access-Control-Allow-Origin", "http://localhost:8001");
        res.setHeader("Content-Type", "application/json");
        var email = req.body.email;
        var password = req.body.password;
        var userModel = new User();
        userModel.email = email;
        userModel.password = crypto.createHash('md5').update(password).digest("hex");
        setId('userId', function(id) {
            userModel.userId = id;
            userModel.save(function(err) {
                if (err) {
                    util.log("save error: " + err);
                    res.json({ status: 0, errorMsg: '', errorCode: 0 });
                } else {
                    res.json({ status: 1, data: 'success' });
                }
            })
        });
    })
}

module.exports = UserController;
