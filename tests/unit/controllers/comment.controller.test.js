const proxyquire = require("proxyquire");

const ModelMock = require("../mocks/model.mock");
const MongooseMock = require("../mocks/mongoose.mock");

const Comment = proxyquire("../../../src/controllers/comment.controller", {
  "../models/schemas/comment": ModelMock,
  mongoose: MongooseMock,
});

describe("CommentsController", () => {
  describe("getByPost", () => {
    it("Return post", async () => {
      //Arrange
      const _doc = [
        {
          text: "no lo se rick",
          publishedAt: "1652196325832",
          userId: "6265cac66db520204371bf8f",
          postId: "62799aef6f608ddd75824eb4",
        },
        {
          text: "no lo se morty",
          publishedAt: "1652196325832",
          userId: "6265cac66db520204371bf8f",
          postId: "62799aef6f608ddd75824eb4",
        },
      ];
      ModelMock.ans = _doc;
      ModelMock.populateFind = true;
      MongooseMock.ans = true;
      //Act
      const comments = await Comment.getByPost("62799aef6f608ddd75824eb4");

      //Assert
      expect(comments.length).toEqual(_doc.length);
      for (let i = 0; i < _doc.length; i++)
        expect(comments[i]).toEqual(_doc[i]);
    });
  });
  describe("create", () => {
    it("returns a new user when created", async () => {
      //Arrannge
      const _doc = {
        text: "hey si",
        publishedAt: "12312312122",
        userId: "6265cac66db520204371bf8f",
        postId: "62799aef6f608ddd75824eb4",
      };
      ModelMock.saveAns = _doc;
      //Act

      const comment = await Comment.create({
        text: "hey si",
        userId: "6265cac66db520204371bf8f",
        postId: "62799aef6f608ddd75824eb4",
      });

      //Assert
      expect(comment).toEqual(_doc);
    });
  });
  describe("delete", () => {
    it("delete comment when called", async () => {
      //Arrange
      var deleted = false;
      const _doc = {
        userId: { valueOf: () => 1 },
        delete: () => {
          deleted = true;
        },
      };
      ModelMock.ans = _doc;
      //Act
      await await Comment.delete({}, { valueOf: () => 1 });
      //Assert
      expect(deleted).toBeTrue();
    });
  });
});
