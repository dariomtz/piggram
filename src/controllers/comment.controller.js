const CommentModel = require("../models/schemas/comment");
const User = require("./user.controller");
const Post = require("./post.controller");
const { NotFoundError, InvalidInputError } = require("../utils/errors");

class Comment {
    async getByPost(postId){
        console.log(postId);
        let doc = await CommentModel.find({postId}, {postId: 0, publishedAt:0, __v:0}).populate(
            "userId",
            ["username", "name", "image"]
        );
        if(doc)doc.reverse();
        return doc || [];
    }

    async create({text, userId, postId}){
        return await new CommentModel({
            text,
            userId,
            postId
        }).save();
    }

    async delete(commentId, userId){
        let comment = await CommentModel.findById(commentId);
        console.log(comment['userId'],userId)
        if(comment['userId'].valueOf() !== userId.valueOf()){
            return Promise.reject(new Error(`You cant delete other user comments`));
        }
        comment.delete();
    }
}


module.exports = new Comment();