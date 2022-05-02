const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    image: {
        type: String,
        required: true
    },
    description: {
        type: String,
        max: 300
    },
    publishedAt:{
        type: Date,
        default: () => Date.now()
    },
    userId:{
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

const PostModel = mongoose.model('Post', postSchema);

module.exports = PostModel;