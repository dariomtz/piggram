const FollowModel = require("../models/schemas/follow");
const User = require("./user.controller");

class Follow {
    
    async getFollowers(id){
        let doc = await FollowModel.find({'followee':id},{followee:0,_id:0}).populate('follower',['username','name','description','image']);
        if(doc == null){
            return [];
        }
        return doc;
    }

    async getFollowing(id){
        let doc = await FollowModel.find({'follower':id},{follower:0,_id:0}).populate('followee',['username','name','description','image']);
        if(doc == null){
            return [];
        }
        return doc;
    }

    async followUser(follower, followee){
        if(!User.existById(follower)){
            return Promise.reject(new Error(`Follower user doesn't exist`));
        }
        if(!User.existById(followee)){
            return Promise.reject(new Error(`Followee user doesn't exist`));
        } 
        let exist = await FollowModel.findOne({follower,followee}).exec();
        if(exist){
            return Promise.reject(new Error(`Already Following user`));
        }
        let follow = new FollowModel({follower, followee});
        return await follow.save();
    }

    async UnfollowUser(follower, followee){
        if(!User.existById(follower)){
            return Promise.reject(new Error(`Follower user doesn't exist`));
        }
        if(!User.existById(followee)){
            return Promise.reject(new Error(`Followee user doesn't exist`));
        }
        let res = await FollowModel.deleteOne({follower,followee});
        console.log(res);
        return;
    }
}

module.exports = new Follow();