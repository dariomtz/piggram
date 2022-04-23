const FollowModel = require("../models/schemas/follow");
const User = require("./user.controller");

class Follow {
    
    async getFollowers(id){
        let doc = await FollowModel.find({'followee':id})
        if(doc == null){
            return [];
        }
        return doc;
    }

    async getFollowing(id){
        let doc = await FollowModel.find({'follower':id})
        if(doc == null){
            return [];
        }
        return doc;
    }

    async followUser(follower, followee){
        if(!User.exist(follower)){
            return Promise.reject(new Error(`Follower user doesn't exist`));
        }
        if(!User.exist(followee)){
            return Promise.reject(new Error(`Followee user doesn't exist`));
        }
        let follow = new FollowModel({follower, followee});
        return await follow.save();
    }
}

module.exports = new Follow();