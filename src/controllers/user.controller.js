const UserModel = require('../models/schemas/user');

class User {

  async findByPassportId(id) {
    let doc = await UserModel.findOne({passportID:id}).lean();
    console.log('find',doc);
    if(doc == null){
      return Promise.reject(new Error(`User with id ${id} not found`));
    }
    return doc;
  }

  async create(userData) {
    var user = new UserModel(userData);
    let doc;
    try{
         doc = await user.save();
    }catch(err){
      return Promise.reject(new Error(`Unable to create the user`));
    }
    console.log('create',doc);
    return doc;
  }

  async exist(id){
    let doc = await UserModel.findById(id);
    return doc != null;
  }
};

module.exports = new User();