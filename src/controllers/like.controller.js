const LikeModel = require("../models/schemas/like");
const User = require("./user.controller");
const Post = require("./post.controller");
const { NotFoundError, InvalidInputError } = require("../utils/errors");

class Like {
  async getByPost(postId) {
    let doc = await LikeModel.find({ postId }, { _id: 0, postId: 0, likedAt:0}).populate(
      "userId",
      ["username", "name", "image"]
    );
    console.log(doc);
    return doc || [];
  }

  async getCountByPost(postId) {
    return (await (this.getByPost(postId))).length;
  }

  async getByUser(userId) {
    let doc = await LikeModel.find({ userId }, { _id: 0, userId: 0,likedAt:0 }).populate(
      "postId"
    );
    return doc || [];
  }

  async find(postId, userId) {
    let doc = await LikeModel.findOne({ userId, postId }, { _id: 0, likedAt:0 })
      .populate("userId", ["username", "name", "image"]);
    return doc;
  }

  async exist(postId, userId) {
    //console.log(postId,userId);
    console.log({ userId, postId });
    let doc = await LikeModel.findOne({ userId, postId }, { _id: 0 });
    console.log(doc);
    return doc !== null;
  }

  async add(postId, userId) {
    if (!(await Post.exist(postId))) {
      return Promise.reject(new NotFoundError(`Post doesn't exist`));
    }
    if (!(await User.exist(userId))) {
      return Promise.reject(new NotFoundError(`User doesn't exist`));
    }
    if (await this.exist(postId, userId)) {
      return Promise.reject(new InvalidInputError(`Like already exists`));
    }
    return await new LikeModel({ postId, userId }).save();
  }

  async remove(postId, userId) {
    if (!(await Post.exist(postId))) {
      return Promise.reject(new NotFoundError(`Post doesn't exist`));
    }
    if (!(await User.exist(userId))) {
      return Promise.reject(new NotFoundError(`User doesn't exist`));
    }
    await LikeModel.deleteOne({ postId, userId });
    return null;
  }
}

module.exports = new Like();
