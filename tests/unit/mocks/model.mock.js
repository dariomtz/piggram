class ModelMock {
  static ans = null;
  static populates = true;
  static saveAns = null;
  static find(a, b) {
    return { populate: (a, b) => ModelMock.ans };
  }

  static findOne(a) {
    return this.populates
      ? {
          populate: (a, b) => {
            return { populate: (a, b) => ModelMock.ans };
          },
        }
      : ModelMock.ans;
  }

  save(a) {
    return ModelMock.saveAns;
  }

  static deleteOne(a) {
    return this.ans;
  }
}
module.exports = ModelMock;
