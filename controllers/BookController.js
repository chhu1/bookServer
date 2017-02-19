var url = require('url');
var util = require('util');
var mongoose = require('mongoose');

var validToken = require('./tokenController');
var tokenUtils = require('../lib/tokenUtils');
var constant = require('../constant/constant');
var UtilController = require('./UtilController');
var Book = require('../models/Book')(mongoose);

var BookController = function(app, mongoose, config) {
    app.get('/book/list.do', UtilController.preTreat, validToken, function(req, res, next) {
        var query = url.parse(req.url, true).query,
            pageNumber = query.pageNumber,
            pageSize = query.pageSize ? query.pageSize : 10,
            userObj = query.userId ? { userId: query.userId } : {};
        if (pageNumber === undefined) {
            res.json({ status: 0, errorMsg: constant.errorMsg['10005'], errorCode: 10005 })
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

    // category
    //  1: 小说
    //  2: 经济学
    // app.get('/book/set.do', UtilController.preTreat, function(req, res, next) {
    //     var bookModel = new Book();
    //     bookModel.name = '让数字说话：审计，就这么简单';
    //     bookModel.desc = '全新修订7万字，豆瓣评分9.0，影响了无数“四大”人的专业奇书！张连起、冯定豪、武卫、吴溪、莫小莫等业内大咖鼎力推荐';
    //     bookModel.userId = 1000002;
    //     bookModel.categoryId = 2;
    //     bookModel.author = '孙含晖';
    //     bookModel.company = '机械工业出版社';
    //     setId('bookId', function(err, id) {
    //         if (err) {
    //             req.resError = err;
    //             next();
    //         } else {
    //             bookModel.bookId = id;
    //             bookModel.save(function(err) {
    //                 if (err) {
    //                     req.resError = err;
    //                     next();
    //                 } else {
    //                     res.json({ status: 1, msg: '', data: {} });
    //                 }
    //             })
    //         }
    //     })
    // }, UtilController.errorHandler);
}

module.exports = BookController;
