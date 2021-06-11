const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const blogSchema = new Schema({
    blogTitle: {
        required: true,
        type: String
    },
    blogContent: {
        required: true,
        type: String
    },
    contentTags: [String],
    contentCategory: String,
    likes: {
        type: Number,
        default: 0
    },
    author: {
        default: "Brandon Myers",
        type: String
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Blog', blogSchema);