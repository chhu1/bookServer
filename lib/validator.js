module.exports = function(opts) {
    return function(val) {
        if (!val) {
            return false;
        }
        if (opts.isEmail && !(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(val))) {
            return false;
        }
        return true;
    };
};
