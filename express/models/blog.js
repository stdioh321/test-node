const mongoose = require('mongoose');
const { connection } = require('../db/mongoose');

const Schema = mongoose.Schema;

const blogSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    snipped: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: [true, "OBRIGATORIO"]
    }
}, { timestamps: true });

// blogSchema.pre("save", function(next) {
//     let blog = this;
//     blog.title = blog.title.toUpperCase();
//     next();
// });

// const Schema = new mongoose.Schema({
//     deleted: {
//         type: Boolean,
//         default: false
//     },
//     withdrawer: String,
//     launchDate: Date,
//     reason: String,
//     date: {
//         type: Date,
//         default: Date.now
//     },
//     value: Number
// });

const Blog = connection.model('Blog', blogSchema);

module.exports = Blog;