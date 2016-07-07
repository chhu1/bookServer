module.exports = function(mongoose) {
    var Schema = mongoose.Schema,
        User;

    User = new Schema({
        userId: {
            type: Number,
            required: true,
        },
        username: {
            type: String,
            required: false,
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        realname: {
            type: String,
            required: false,
        },
        phone: {
            type: String,
            required: false,
        },
        idCard: {
            type: String,
            required: false,
        },
        createdAt: {
            type: Date,
            required: true,
            default: Date.now
        },
        updatedAt: {
            type: Date,
            required: false,
            default: Date.now
        }
    });
    return mongoose.model('User', User);
}
