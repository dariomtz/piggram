const {LikeModel} = require("../models/schemas/like");
const User = require("./user.controller");
const Post = require("./post.controller");

class Like {
    async getByPost(postId){
        let doc = await LikeModel.find({postId},{_id:0,postId:0})
        .populate('UserId',['username','name','description','image']);
        return doc || [];
    }

    async getByUser(userId){
        let doc = await LikeModel.find({userId},{_id:0,userId:0}).populate('postId');
        return doc || [];
    }

    async find(postId,userId){
        let doc = await LikeModel.findOne({userId,postId},{_id:0})
        .populate('UserId',['username','name','description','image'])
        .populate('postId');
        return doc || {};
    }

    async exist(postId,userId){
        try{
            let doc = await LikeModel.findOne({userId,postId},{_id:0})
            return doc !== null;
        }
        catch(err){
            return false;
        }
    }

    async add(postId,userId){
        if(!(await Post.exist(postId))){
            return Promise.reject(new Error(`Post doesn't exist`));
        }
        if(!(await User.exist(userId))){
            return Promise.reject(new Error(`User doesn't exist`));
        }
        if(Like.exists(postId,userId)){
            return Promise.reject(new Error(`Like already exist`));
        }
        try{
            return await LikeModel({postId,userId}).save();
        }
        catch(err){
            return Promise.reject(new Error(`Unable to add like from user ${userId} to post ${postId}`));
        }
    }

    async remove(postId,userId){
        if(!(await Post.exist(postId))){
            return Promise.reject(new Error(`Post doesn't exist`));
        }
        if(!(await User.exist(userId))){
            return Promise.reject(new Error(`User doesn't exist`));
        }
        await LikeModel.deleteOne({postId,userId});
        return;
    }
}