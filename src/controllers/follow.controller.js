const FollowModel = require("../models/schemas/follow");
const mongoose = require('mongoose');
const User = require("./user.controller");
const {NotFoundError,InvalidInputError} = require('../utils/errors');

class Follow {
    
    async getFollowers(id){
        if(!mongoose.isValidObjectId(id)){
            return Promise.reject(new InvalidInputError(`Invalid user ID`));
        }
        let doc = await FollowModel.find({'followee':id},{followee:0,_id:0})
        .populate('follower',['username','name','description','image']);
        if(doc === null){
            return [];
        }
        return doc;
    }

    async getFollowing(id){
        if(!mongoose.isValidObjectId(id)){
            return Promise.reject(new InvalidInputError(`Invalid user ID`));
        }
        let doc = await FollowModel.find({'follower':id},{follower:0,_id:0})
        .populate('followee',['username','name','description','image']);
        if(doc == null){
            return [];
        }
        return doc;
    }

    async find(follower, followee){
        if(!mongoose.isValidObjectId(follower)){
            return Promise.reject(new InvalidInputError(`Invalid follower ID`));
        }
        if(!mongoose.isValidObjectId(followee)){
            return Promise.reject(new InvalidInputError(`Invalid followee ID`));
        }
        let doc = await FollowModel.findOne({follower, followee})
        .populate('followee',['username','name','description','image'])
        .populate('follower',['username','name','description','image']);
        return doc || {};
    }

    async exist(follower, followee){
        let doc = await FollowModel.findOne({follower, followee});
        return doc !== null;
    }

    async add(follower, followee){
        console.log(follower, ' ',followee);
        if(follower === followee){
            return Promise.reject(new InvalidInputError(`A user can't follow himself`));
        }
        if(!(await User.exist(follower))){
            return Promise.reject(new NotFoundError(`Follower user doesn't exist`));
        }
        if(!(await User.exist(followee))){
            return Promise.reject(new NotFoundError(`Followee user doesn't exist`));
        } 
        if(await this.exist(follower, followee)){
            return Promise.reject(new Error(`Already Following user`));
        }
        let follow = new FollowModel({follower, followee});
        return await follow.save();
    }

    async remove(follower, followee){
        if(!(await User.exist(follower))){
            return Promise.reject(new NotFoundError(`Follower user doesn't exist`));
        }
        if(!(await User.exist(followee))){
            return Promise.reject(new NotFoundError(`Followee user doesn't exist`));
        } 
        await FollowModel.deleteOne({follower,followee});
        return null;
    }
}

module.exports = new Follow();