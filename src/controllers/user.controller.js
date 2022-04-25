const UserModel = require('../models/schemas/user');
const axios = require('axios').default;

class User {

  async findByPassportId(id) {
    let doc = await UserModel.findOne({passportID:id}).lean();
    //console.log('find',doc);
    if(doc == null){
      return Promise.reject(new Error(`User with id ${id} not found`));
    }
    return doc;
  }

  async create(userData) {
    if(userData['username']== null){

      userData['username'] = (await axios({method:'get',url:'https://randomuser.me/api/?inc=login'})).data['results'][0]['login']['username'];
      console.log(userData['username']);
    }
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

  async existById(id){
    let doc = await UserModel.findById(id);
    return doc != null;
  }
};

module.exports = new User();