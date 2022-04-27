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
}