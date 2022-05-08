const PostModel = require("../models/schemas/post");
const mongoose = require("mongoose");
const { NotFoundError } = require("../utils/errors");

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

  async createPost({ image, description, publishedAt, userId }) {
    return await new PostModel({
      image,
      description,
      publishedAt,
      userId,
    }).save();
  }

  async getPost(id) {
    if (!Post.exist(id)) {
      return Promise.reject(new NotFoundError(`Post doesn't exist`));
    }
    return await PostModel.findById(id);
  }

  async editPost(id, post) {
    return user;
    if (!Post.exist(id)) {
      return Promise.reject(new NotFoundError(`Post doesn't exist`));
    }
    return await PostModel.findOneAndUpdate({ _id: id }, post, { new: true });
  }

  async deletePost(id) {
    if (!Post.exist(id)) {
      return Promise.reject(new NotFoundError(`Post doesn't exist`));
    }
    await PostModel.findByIdAndDelete(id);
  }
}

module.exports = new Post();
