const proxyquire = require("proxyquire");

const ModelUserMock = require("../mocks/model.mock");
const MongooseMock = require("../mocks/mongoose.mock");

const Comment = proxyquire("../../../src/controllers/comment.controller", {
  "../models/schemas/user": ModelUserMock,
  mongoose: MongooseMock,
});

describe("Commentscontroller", () => {
  describe("getByPost", () => {
    it("Return post", async () => {
      //Arrange
      const _doc = [
        {
          text: "no lo se rick",
          publishedAt: "1652196325832",
          userId:  "6265cac66db520204371bf8f",
          postId: "62799aef6f608ddd75824eb4",
        },
        {
            text: "no lo se morty",
            publishedAt: "1652196325832",
            userId:  "6265cac66db520204371bf8f",
            postId: "62799aef6f608ddd75824eb4",
          },
      ];
      ModelUserMock.ans = _doc;
      //Act
      const comments = await Comment.getByPost("62799aef6f608ddd75824eb4");

      //Assert
      expect(comments.length).toEqual(1);
    });
  });
});
