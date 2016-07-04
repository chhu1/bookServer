var express = require('express'),
    http = require('http'),
    path = require('path'),
    mongoose = require('mongoose'),
    mongoStore = require('connect-mongo')(express),
    config = require('config'),
    utils = require('./lib/utils');

var app = express();

//connection url for future use
mongoose = utils.connectToDatabase(mongoose, config.db);

// Application setups
app.configure('all', function() {
    app.set('port', 3000);
    app.use(express.logger('dev'));
    app.use(express.cookieParser());
    app.use(express.session({
        secret: "golb",
        cookie: { maxAge: 24 * 60 * 60 * 1000 },
        store: new mongoStore({
            url: utils.dbConnectionUrl(config.db)
        })
    }));
    app.use(express.bodyParser());
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

// Register models
require('./models/User')(mongoose);

// Register Controllers
['User'].forEach(function(controller) {
    require('./controllers/' + controller + 'Controller')(app, mongoose, config);
});

process.on('uncaughtException', function(err) {
    console.log(err);
});

// Create server and listen application port specified above
http.createServer(app).listen(app.get('port'), function() {
    console.log("Express server listening on port " + app.get('port'));
});
