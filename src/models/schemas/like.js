const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
    likedAt:{
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

const Like = mongoose.model('Like', likeSchema);

module.exports = Like;