class ModelUserMock {
  static ans = null;
  static populates = true;
  static saveAns = null;

  static find(a) {
    ModelUserMock.ans.filter((element) => {
      return element.username.includes("happy");
    });
    return ModelUserMock.ans;
  }

  static findOne(a) {
    return ModelUserMock.ans;
  }

  static findOneAndUpdate(a, b) {
    ModelUserMock.ans = ModelUserMock.ans.filter((id) => id._id === a._id);
    for (const key in ModelUserMock.ans) ModelUserMock.ans[key] = b[key];
    return ModelUserMock.ans;
  }

  static findById(a, b) {
    return ModelUserMock.ans.filter((id) => id._id === a);
  }
  static findOneAndRemove(a) {
    const index = ModelUserMock.ans.findIndex((id) => id._id === a._id);
    return ModelUserMock.ans.splice(index, 1);
  }

  save(a) {
    return ModelUserMock.saveAns;
  }

  static deleteOne(a) {
    return this.ans;
  }
}
module.exports = ModelUserMock;
