const UserModel = require("../models/schemas/user");
const mongoose = require("mongoose");
const axios = require("axios").default;
const { InvalidInputError, NotFoundError } = require("../utils/errors");

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
    if (!User.exist(id)) {
      return Promise.reject(new NotFoundError(`Invalid user ID`));
    }
    console.log("buscando por ID");
    let doc = await UserModel.findById(id, {
      passportID: 0,
      createdAt: 0,
      __v: 0,
      resgitrationCompleted: 0,
      password: 0,
    });

    return doc;
  }
  async getUser(email) {
    return await UserModel.findOne({ email });
  }

  async update(id, propertiesToUpdate) {
    const user = await UserModel.findOneAndUpdate(
      { _id: id },
      propertiesToUpdate,
      {
        new: true,
      }
    );
    if (!user) {
      return Promise.reject(new NotFoundError(`user with the id: ${id}`));
    }
    return user;
  }
  async delete(id) {
    const user = await UserModel.findOneAndRemove({ _id: id });
    if (user) {
      return "Borrado";
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

  async findUserByUsername(username) {
    const result = await UserModel.find({ username: { $regex: username } });
    if (result === null) {
      return [];
    }
    return result;
  }
  async findUserByName(name) {
    const result = await UserModel.find({ name: { $regex: name } });
    if (result === null) {
      return [];
    }
    return result;
  }
}

module.exports = new User();
