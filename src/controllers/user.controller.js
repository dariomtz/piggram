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

  async exist(id) {
    if (!mongoose.isValidObjectId(id)) {
      return false;
    }
    let doc = await UserModel.findById(id);
    return doc !== null;
  }
}

module.exports = new User();
