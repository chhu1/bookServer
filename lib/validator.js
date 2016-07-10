module.exports = function(opts) {
    return function(val) {
        if (!val) {
            return false;
        }
        if (opts.isEmail && !(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.]+\.[a-zA-Z]{2,4}$/.test(val))) {
            return false;
        }
        if (opts.minLength && val.length < opts.minLength) {
            return false;
        }
        if (opts.maxLength && val.length > opts.maxLength) {
            return false;
        }
        return true;
    }
}
