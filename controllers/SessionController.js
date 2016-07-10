var constant = require('../constant/constant');

module.exports = function validSession(req, res, next) {
    if (!req.session.user) {
        if (req.url in constant.noSessionApis) {
            next();
        } else {
            res.json({ status: 0, errorMsg: constant.errorMsg['10000'], errorCode: 10000 });
        }
    } else {
        next();
    }
}
