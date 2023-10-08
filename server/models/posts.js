const mongoose = require('mongoose');

const PostsSchema = new mongoose.Schema({
    moduleid: {
        type: String,
        required: true
    },
    posts: [{
        author: String,
        authoremail: String,
        post: String,
        createdAt: {type: Date, default: Date.now},
        comments: [{
            cauthor: String,
            comment: String,
            createdAt: {type: Date, default: Date.now},
        }]
    }]
    //versionKey:false,
});

const PostsModel = mongoose.model("posts", PostsSchema);
module.exports = PostsModel;