const mongoose = require('mongoose');

const followSchema = new mongoose.Schema({
    followedAt:{
        type: Date,
        default: () => Date.now()
    },
    follower:{
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    followee:{
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

const FollowModel = mongoose.model('Follow', followSchema);

module.exports = FollowModel;