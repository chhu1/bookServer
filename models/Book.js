module.exports = function(mongoose) {
    var Schema = mongoose.Schema,
        Book = new Schema({
            bookId: {
                type: Number,
                required: true
            },
            name: {
                type: String,
                required: true
            },
            desc: {
                type: String,
                required: true
            },
            userId: {
                type: Number,
                required: true
            },
            /*categoryId
            1: 小说
            2: 经济学*/
            categoryId: {
                type: Number,
                required: true
            },
            thumb: {
                type: String,
                required: false
            },
            image: {
                type: String,
                required: false
            },
            author: {
                type: String,
                required: true
            },
            company: {
                type: String,
                required: true
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
    return mongoose.model('Book', Book);
}
