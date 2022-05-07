class ModelUserMock {
  static ans = null;
  static populates = true;
  static saveAns = null;

  static find() {
    return this.populates
      ? {
          populate: (a, b) => {
            return { populate: (a, b) => ModelUserMock.ans };
          },
        }
      : ModelUserMock.ans;
  }

  static findOne(a) {
    return this.populates
      ? {
          populate: (a, b) => {
            return { populate: (a, b) => ModelUserMock.ans };
          },
        }
      : ModelUserMock.ans;
  }

  static findById(a) {
    return this.populates
      ? {
          populate: (a, b) => {
            return { populate: (a, b) => ModelUserMock.ans };
          },
        }
      : ModelUserMock.ans;
  }

  save(a) {
    return ModelUserMock.saveAns;
  }

  static deleteOne(a) {
    return this.ans;
  }
}
module.exports = ModelUserMock;
