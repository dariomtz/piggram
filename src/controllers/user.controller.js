const {getJSON, saveJSON} = require('../utils/fileHelpers');
const User = require('../models/schemas/user')

const User = {
    //TODO: Replace local implementation with mongodb version.
  // constructor() {
  //   this.saveData = saveJSON;
  //   this.fetchData = getJSON;
  // }

  list: function (){
    return await User.find({});
  },
  getById: function (id) {
      return User.findbyID(id);
    },
  // get: function (username){
  //   return User.findOne({username})
  // },
  

  create: function(username, email, password, name, description, image, createdAt, dateOfBirth) {
    // fetch the users
    const user = await User.create({username, email, password, name, description, image, createdAt, dateOfBirth})
    // append the user to all the users
    // save the users
    // user.save();
    // return the saved user
    return user;
  },

  update: function (id, propertiesToUpdate){
    const user = await User.findOneAndUpdate({username}, propertiesToUpdate, {new:true});
  if (!user) {
      return Promise.reject(new NotFoundError(`user with the username: ${username}`));
    }
    // else return Promise.reject throw new NotFoundError(`user with the username: ${username}`)
    return user;
  },
  delete: function (id){
    const user = await User.findOneAndDelete({ id: id});
    if (user){
      return user
  }
  return Promise.reject(new NotFoundError(`user with the username: ${username}`));
}
  
};

module.exports = new User();