var express = require('express'),
    cors = require('cors'),
    http = require('http'),
    mongoose = require('mongoose'),
    mongoStore = require('connect-mongo')(express),
    config = require('config'),
    utils = require('./lib/utils');

var app = express();

mongoose = utils.connectToDatabase(mongoose, config.db);

app.configure('all', function() {
    app.set('port', 3000);
    app.use(express.cookieParser());
    app.use(cors({ credentials: true }));
    app.use(express.session({
        secret: "golb",
        resave: true,
        saveUninitialized: false,
        cookie: { maxAge: 24 * 60 * 60 * 1000 },
        store: new mongoStore({
            url: utils.dbConnectionUrl(config.db)
        })
    }));
    app.use(express.bodyParser());
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

require('./models/User')(mongoose);

['User'].forEach(function(controller) {
    require('./controllers/' + controller + 'Controller')(app, mongoose, config);
});

process.on('uncaughtException', function(err) {
    console.log(err);
});

http.createServer(app).listen(app.get('port'), function() {
    console.log("Express server listening on port " + app.get('port'));
});
