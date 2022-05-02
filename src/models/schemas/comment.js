const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({

    text: {
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
    },
    postId:{
        type: mongoose.Types.ObjectId,
        ref: 'Post',
        required: true
    }
});

const CommentModel = mongoose.model('Comment', commentSchema);

module.exports = CommentModel;