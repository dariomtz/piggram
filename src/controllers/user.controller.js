const UserModel = require("../models/schemas/user");
const mongoose = require("mongoose");
const axios = require("axios").default;

class User {
  async findByPassportId(id) {
    let doc = await UserModel.findOne({ passportID: id }).lean();
    if (doc === null) {
      return Promise.reject(new Error(`User with id ${id} not found`));
    }
    return doc;
  }

  // async create(userData) {
  //   if (userData["username"] === undefined) {
  //     userData["username"] = (
  //       await axios({
  //         method: "get",
  //         url: "https://randomuser.me/api/?inc=login",
  //       })
  //     ).data["results"][0]["login"]["username"];
  //     console.log(userData["username"]);
  //   }
  //   var user = new UserModel(userData);
  //   let doc;
  //   try {
  //     doc = await user.save();
  //   } catch (err) {
  //     return Promise.reject(new Error(`Unable to create the user`));
  //   }
  //   console.log("create", doc);
  //   return doc;
  // }
  async list() {
    return await User.find({});
  }

  async getById(id) {
    return User.findbyID(id);
  }
  // get: function (username){
  //   return User.findOne({username})
  // },

  async create(
    passportID,
    username,
    email,
    password,
    name,
    description,
    image,
    createdAt,
    dateOfBirth
  ) {
    // fetch the users
    const user = await User.create({
      passportID,
      username,
      email,
      password,
      name,
      description,
      image,
      createdAt,
      dateOfBirth,
    });
    // append the user to all the users
    // save the users
    // user.save();
    // return the saved user
    return user;
  }

  async update(id, propertiesToUpdate) {
    const user = await User.findOneAndUpdate({ id }, propertiesToUpdate, {
      new: true,
    });
    if (!user) {
      return Promise.reject(new NotFoundError(`user with the id: ${id}`));
    }
    // else return Promise.reject throw new NotFoundError(`user with the username: ${username}`)
    return user;
  }
  async delete(id) {
    const user = await User.findOneAndDelete({ id: id });
    if (user) {
      return user;
    }
    return Promise.reject(new NotFoundError(`user with the id: ${id}`));
  }
  
  async exist(id) {
    if (!mongoose.isValidObjectId(id)) {
      return false;
    }
    let doc = await UserModel.findById(id);
    return doc !== null;
  }
}

module.exports = new User();
