const UserModel = require("../models/schemas/user");
const mongoose = require("mongoose");
const axios = require("axios").default;
const { InvalidInputError } = require("../utils/errors");

class User {
  async findByPassportId(id) {
    let doc = await UserModel.findOne({ passportID: id }).lean();
    if (doc === null) {
      return Promise.reject(new Error(`User with id ${id} not found`));
    }
    return doc;
  }

  async create(userData) {
    if (userData["username"] === undefined) {
      userData["username"] = (
        await axios({
          method: "get",
          url: "https://randomuser.me/api/?inc=login",
        })
      ).data["results"][0]["login"]["username"];
      console.log(userData["username"]);
    }
    var user = new UserModel(userData);
    let doc;
    try {
      doc = await user.save();
    } catch (err) {
      return Promise.reject(new Error(`Unable to create the user`));
    }
    console.log("create", doc);
    return doc;
  }
  async list() {
    return await UserModel.find({});
  }

  async getById(id) {
    if (!mongoose.isValidObjectId(id)) {
      return Promise.reject(new InvalidInputError(`Invalid user ID`));
    }
    let doc = await UserModel.findById(id);

    return doc;
  }
  async getUser(email) {
    return User.findOne({ email }).exec();
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

  async saveProfilePicture(id, url) {
    if (!mongoose.isValidObjectId(id)) {
      return Promise.reject(new InvalidInputError(`Invalid user ID`));
    }
    let user = await UserModel.findById(id);
    user.image = url;
    await user.save();
  }

  async getProfilePicture(id) {
    if (!mongoose.isValidObjectId(id)) {
      return Promise.reject(new InvalidInputError(`Invalid user ID`));
    }
    const data = await UserModel.findById(id);
    return data.image || "";
  }

  findUsers(name, username) {
    let result;

    if (typeof name !== "undefined") {
      result = findOne({ name: name });
      return result;
    }

    if (typeof username !== "undefined") {
      result = findOne({ username: username });
      return result;
    }

    return Promise.reject(new InvalidInputError(`Invalid user ID`));
  }
}

module.exports = new User();
