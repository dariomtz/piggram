class ModelMock {
  static ans = null;
  static populates = true;
  static single = false;
  static saveAns = null;
  static deleted = false;
  static saved = false;
  static populateFind = true;
  static find(a, b) {
    return this.populateFind?{ populate: (a, b) => ModelMock.ans }: ModelMock.ans;
  }

  static findById(a){return this.ans}

  static findOne(a) {
    return this.populates
      ? {
          populate: (a, b) => {
            return this.single? ModelMock.ans:{ populate: (a, b) => ModelMock.ans };
          },
        }
      : ModelMock.ans;
  }

  save(a=null) {
    return ModelMock.saveAns;
  }

  static deleteOne(a) {
    return this.ans;
  }

  static findOneAndUpdate(a,b,c){
    return this.ans;
  }

  static findOneAndRemove(a){
    return this.ans;
  }

  static findByIdAndDelete(a){
    this.deleted = true;
  }

}
module.exports = ModelMock;
