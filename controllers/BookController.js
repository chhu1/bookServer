var url = require('url');
var util = require('util');
var mongoose = require('mongoose');

var validToken = require('./tokenController');
var tokenUtils = require('../lib/tokenUtils');
var constant = require('../constant/constant');
var UtilController = require('./UtilController');
var Book = require('../models/Book')(mongoose);
var validator = require('../lib/validator');

function validBookParams(params) {
    return validator({ minLength: 6 })(params.desc) && validator({ minLength: 6, maxLength: 30 })(params.name) && validator({ minLength: 2, maxLength: 20 })(params.author) && validator({ minLength: 2, maxLength: 20 })(params.company) && validator({ inArray: [1, 2] })(params.categoryId)
}

var BookController = function(app, mongoose, config) {
    app.get('/book/list.do', UtilController.preTreat, validToken, function(req, res, next) {
        var query = url.parse(req.url, true).query,
            pageNumber = query.pageNumber,
            pageSize = query.pageSize ? query.pageSize : 10,
            userObj = query.userId ? { userId: query.userId } : {};
        if (pageNumber === undefined) {
            return res.json({ status: 0, errorMsg: constant.errorMsg['10005'], errorCode: 10005 })
        } else {
            var skipNumber = (pageNumber - 1) * pageSize;
        }
        Book.find(userObj).sort({ bookId: 'asc' }).skip(skipNumber).limit(pageSize).exec(function(err, bookInfo) {
            if (err) {
                req.resError = err;
                next();
            } else {
                res.json({
                    status: 1,
                    msg: '',
                    data: {
                        book: bookInfo
                    }
                });
            }
        });
    }, UtilController.errorHandler);

    app.post('/book/add.do', UtilController.preTreat, validToken, function(req, res, next) {
        var body = req.body,
            bookModel = new Book();
        if (validBookParams(body)) {
            bookModel.desc = body.desc;
            bookModel.name = body.name;
            bookModel.userId = body.userId;
            bookModel.author = body.author;
            bookModel.company = body.company;
            bookModel.categoryId = body.categoryId;
        } else {
            return res.json({ status: 0, errorMsg: constant.errorMsg['10006'], errorCode: 10006 })
        }
        setId('bookId', function(err, id) {
            if (err) {
                req.resError = err;
                next();
            } else {
                bookModel.bookId = id;
                bookModel.save(function(err) {
                    if (err) {
                        req.resError = err;
                        next();
                    } else {
                        res.json({ status: 1, msg: '', data: {} });
                    }
                })
            }
        })
    }, UtilController.errorHandler);
}

module.exports = BookController;
