const PostModel = require("../models/schemas/post");
const mongoose = require("mongoose");
const { NotFoundError } = require("../utils/errors");
const userController = require("./user.controller");

class Post {
  async findById(id) {
    let doc = await PostModel.findById(id);
    if (doc === null) {
      return Promise.reject(new Error(`Post with id ${id} not found`));
    }
    return doc;
  }

  async exist(id) {
    if (!mongoose.isValidObjectId(id)) {
      return false;
    }
    let doc = await PostModel.findById(id);
    return doc !== null;
  }

  async createPost({ image, description, userId }) {
    return await new PostModel({
      image,
      description,
      userId,
    }).save();
  }

  async getPost(id) {
    if (!this.exist(id)) {
      return Promise.reject(new NotFoundError(`Post doesn't exist`));
    }
    return await PostModel.findById(id).populate("userId",['username','name','image']);
  }

  async editPost(id, post) {
    return user;
    if (!Post.exist(id)) {
      return Promise.reject(new NotFoundError(`Post doesn't exist`));
    }
    return await PostModel.findOneAndUpdate({ _id: id }, post, { new: true });
  }

  async deletePost(id) {
    if (!this.exist(id)) {
      return Promise.reject(new NotFoundError(`Post doesn't exist`));
    }
    await PostModel.findByIdAndDelete(id);
  }

  async getFeed() {
    return await PostModel.find({}).populate("userId", [
      "username",
      "name",
      "image",
    ]).sort({publishedAt: -1});
  }

  async getPostsByUser(id) {
    if (!userController.exist(id)) {
      return Promise.reject(new NotFoundError(`User does not exist`));
    }
    return await PostModel.find({ userId: id });
  }
}

module.exports = new Post();
