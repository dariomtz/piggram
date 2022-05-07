const {PostModel} = require("../models/schemas/post");
const mongoose = require('mongoose');

class Post {

    async findById(id){
        let doc = await PostModel.findById(id);
        if(doc === null){
            return Promise.reject(new Error(`Post with id ${id} not found`));
          }
        return doc;
    }

    async exist(id){
        if(!mongoose.isValidObjectId(id)){
            return false;
        }
        let doc = await PostModel.findById(id);
        return doc !== null;
    }

    async savePostPicture(id, url) {
        if (!mongoose.isValidObjectId(id)) {
          return Promise.reject(new InvalidInputError(`Invalid user ID`));
        }
        let user = await UserModel.findById(id);
        user.image = url;
        await user.save(); 
      }
    
      async getPostPicture(id) {
        if (!mongoose.isValidObjectId(id)) {
          return Promise.reject(new InvalidInputError(`Invalid user ID`));
        }
        const data = await UserModel.findById(id);
        return data.image || '';
      }
}

module.exports = new Post();