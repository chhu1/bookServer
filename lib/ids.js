var fs = require('fs');
var storePath = __dirname + '/ids.json';

setId = function(key, cb) {
    fs.readFile(storePath, function(err, data) {
        if (err !== null) {
            cb(err);
            return;
        }
        var ids = JSON.parse(data);
        ids[key]++;
        fs.writeFile(storePath, JSON.stringify(ids), function(err) {
            if (err !== null) {
                cb(err);
                return;
            }
            cb(null, ids[key]);
        });
    });
}

module.exports = setId;
