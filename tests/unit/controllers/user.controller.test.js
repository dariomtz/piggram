const proxyquire = require("proxyquire");

const ModelMock = require("../mocks/model.mock");
const MongooseMock = require("../mocks/mongoose.mock");
const ControllerMock = require("../mocks/controller.mock");

const userControllerMock = new ControllerMock();
const {
  NotFoundError,
  InvalidInputError,
} = require("../../../src/utils/errors");
const User = proxyquire("../../../src/controllers/user.controller", {
  "../models/schemas/follow": ModelMock,
  mongoose: MongooseMock
});

describe("followController", () => {
  describe("getUser", () => {
    it("Return list of followers", async () => {
      //Arrange
      const _doc = [
        {
          _id: new ObjectId("6265cac66db520204371bf8f"),
          passportID: "109310569731870332613",
          username: "whiteleopard660",
          email: "ma.gonzalezp33@gmail.com",
          name: "Miguel Angel Gonzalez",
          description: "Hey I'm using piggram",
          image:
            "https://lh3.googleusercontent.com/a/AATXAJzeqwPIytu-DFc_zkIJieNRCEyhpWzcKnXCEH1Y=s96-c",
          createdAt: "2022-04-24T22:10:14.153Z",
          __v: 0,
          resgitrationCompleted: false,
        },
        {
          _id: new ObjectId("6275d38d64a2569382f7622a"),
          passportID: "137780008797920",
          username: "blacktiger723",
          email: "migofbacc@outlook.com",
          name: "Miguel Gonzalez",
          description: "Hey Im using piggram",
          image:
            "https://scontent.fgdl9-1.fna.fbcdn.net/v/t1.30497-1/84628273_176159830277856_972693363922829312_n.jpg?stp=c15.0.50.50a_cp0_dst-jpg_p50x50&_nc_cat=1&ccb=1-6&_nc_sid=12b3be&_nc_ohc=PBej-6r-wm4AX8WR364&_nc_ht=scontent.fgdl9-1.fna&edm=AP4hL3IEAAAA&oh=00_AT-N-XHpw10hmDqWOclrDdIszHPLViSCp4D9Ti7e8S-rFA&oe=629CE519",
          createdAt: "2022-05-07T02:03:57.876Z",
          resgitrationCompleted: false,
          __v: 0,
        },
      ];
      ModelMock.ans = _doc;
      MongooseMock.ans = true;
      //Act
      const followers = await User.

      //Assert
      expect(followers.length).toEqual(_doc.length);
      for (let i = 0; i < _doc.length; i++)
        expect(followers[i]["follower"]).toEqual(_doc[i].follower);
    });

    it("Return empty list", async () => {
      //Arrange
      ModelMock.ans = null;
      MongooseMock.ans = true;

      //Act
      const followers = await Follow.getFollowers(0);

      //Assert
      expect(followers.length).toBe(0);
      expect(followers).toEqual([]);
    });

    it("To be rejected with invalid id", async () => {
      //Arrange
      ModelMock.ans = null;
      MongooseMock.ans = false;

      //Act

      //Assert
      await expectAsync(Follow.getFollowers(0)).toBeRejected();
    });

    it("To throw an InvalidInputError with invalid id", async () => {
      //Arrange
      ModelMock.ans = null;
      MongooseMock.ans = false;

      //Act
      Follow.getFollowers(0).then(
        () => {
          expect(false).toBeTrue();
        },
        (err) => {
          expect(err).toEqual(new InvalidInputError(`Invalid user ID`));
        }
      );
    });
  }),
    describe("getFollowing", () => {
      it("Return list of following", async () => {
        //Arrange
        const _doc = [
          {
            _id: 0,
            followee: {
              username: "a",
              name: "a",
              description: "a",
              image: "a",
            },
          },
          {
            _id: 1,
            followee: {
              username: "b",
              name: "b",
              description: "b",
              image: "b",
            },
          },
          {
            _id: 2,
            followee: {
              username: "c",
              name: "c",
              description: "c",
              image: "c",
            },
          },
        ];

        ModelMock.ans = _doc;
        MongooseMock.ans = true;
        //Act
        const ans = await Follow.getFollowing(0);

        //Assert
        expect(ans.length).toEqual(_doc.length);
        for (let i = 0; i < _doc.length; i++)
          expect(ans[i]["follower"]).toEqual(_doc[i].follower);
      });

      it("Return empty list", async () => {
        //Arrange
        ModelMock.ans = null;
        MongooseMock.ans = true;

        //Act
        const followers = await Follow.getFollowing(0);

        //Assert
        expect(followers.length).toBe(0);
        expect(followers).toEqual([]);
      });

      it("To be rejected with invalid id", async () => {
        //Arrange
        ModelMock.ans = null;
        MongooseMock.ans = false;

        //Act

        //Assert
        await expectAsync(Follow.getFollowing(0)).toBeRejected();
      });

      it("To throw an InvalidInputError with invalid id", async () => {
        //Arrange
        ModelMock.ans = null;
        MongooseMock.ans = false;

        //Act
        Follow.getFollowing(0).then(
          () => {
            expect(false).toBeTrue();
          },
          (err) => {
            expect(err).toEqual(new InvalidInputError(`Invalid user ID`));
          }
        );
      });
    });
  describe("find", () => {
    it("return a follow", async () => {
      //Arrange
      const _doc = {
        followedAt: 0,
        followee: { username: "a", name: "a", description: "a", image: "a" },
        followee: { username: "b", name: "b", description: "b", image: "b" },
      };
      ModelMock.ans = _doc;
      MongooseMock.ans = true;

      //Act
      const ans = await Follow.find(0, 1);

      //Assert
      expect(ans.length).toBe(_doc.length);
      expect(ans).toEqual(_doc);
    });
    it("Return an empty follow", async () => {
      //Arrange
      const _doc = null;
      ModelMock.ans = _doc;
      MongooseMock.ans = true;

      //Act
      const ans = await Follow.find(0, 1);

      //Assert
      expect(ans).toEqual({});
    });
    it("Reject a Promise for invalid follower id", async () => {
      //Arrange
      const _doc = null;
      ModelMock.ans = _doc;
      MongooseMock.ans = [false, true];
      MongooseMock.pos = 0;

      //Act

      //Assert
      await expectAsync(Follow.find(0, 1)).toBeRejected();
    });

    it("Throw an InvalidInputErro for invaild follower id", async () => {
      //Arrange
      const _doc = null;
      ModelMock.ans = _doc;
      MongooseMock.ans = [false, true];
      MongooseMock.pos = 0;

      //Act
      Follow.find(0, 1).then(
        () => {
          expect(false).toBeTrue();
        },
        (err) => {
          //Assert
          expect(err).toEqual(new InvalidInputError(`Invalid follower ID`));
        }
      );
    });

    it("Reject a Promise for invalid follower id", async () => {
      //Arrange
      const _doc = null;
      ModelMock.ans = _doc;
      MongooseMock.ans = [true, false];
      MongooseMock.pos = 0;

      //Act

      //Assert
      await expectAsync(Follow.find(0, 1)).toBeRejected();
    });

    it("Throw an InvalidInputErro for invaild follower id", async () => {
      //Arrange
      const _doc = null;
      ModelMock.ans = _doc;
      MongooseMock.ans = [true, false];
      MongooseMock.pos = 0;

      //Act
      Follow.find(0, 1).then(
        () => {
          //Assert
          expect(false).toBeTrue();
        },
        (err) => {
          //Assert
          expect(err).toEqual(new InvalidInputError(`Invalid followee ID`));
        }
      );
    });
  });
  describe("exist", () => {
    it("Return true when exist", async () => {
      //Arrange
      const _doc = {};
      ModelMock.ans = _doc;
      ModelMock.populates = false;

      //Act
      const ans = await Follow.exist(0, 1);

      //Assert
      expect(ans).toBeTrue();
    });
    it("Return false when doesnt exist", async () => {
      //Arrange
      const _doc = null;
      ModelMock.ans = _doc;
      ModelMock.populates = false;

      //Act
      const ans = await Follow.exist(0, 1);

      //Assert
      expect(ans).toBeFalse();
    });
  });
  describe("add", () => {
    it("Returns a new follow when created", async () => {
      //Arrange
      const _doc = { followedAt: 231231, follower: 0, followee: 1 };
      ModelMock.ans = null;
      ModelMock.populates = false;
      ModelMock.saveAns = _doc;
      userControllerMock.ans.exist = [true, true];
      userControllerMock.indx.exist = 0;

      //Act
      const ans = await Follow.add(0, 1);

      //Assert
      expect(ans).toEqual(_doc);
    });
    it("Throws an input Error when follower and followee are the same", async () => {
      //Arrange
      const _doc = null;
      ModelMock.ans = null;
      ModelMock.populates = false;
      ModelMock.saveAns = _doc;
      userControllerMock.ans.exist = [true, true];
      userControllerMock.indx.exist = 0;

      //Act
      Follow.add(0, 0).then(
        () => {
          expect(false).toBeTrue();
        },
        (err) => {
          //Assert
          expect(err).toEqual(
            new InvalidInputError(`A user can't follow himself`)
          );
        }
      );
    });

    it("Throws a NotFoundError when follower doesnt exist", async () => {
      //Arrange
      const _doc = null;
      ModelMock.ans = null;
      ModelMock.populates = false;
      ModelMock.saveAns = _doc;
      userControllerMock.ans.exist = [false, true];
      userControllerMock.indx.exist = 0;

      //Act
      Follow.add(0, 1).then(
        () => {
          expect(false).toBeTrue();
        },
        (err) => {
          //Assert
          expect(err).toEqual(new NotFoundError(`Follower user doesn't exist`));
        }
      );
    });
    it("Throws a NotFoundError when followee doesnt exist", async () => {
      //Arrange
      const _doc = null;
      ModelMock.ans = null;
      ModelMock.populates = false;
      ModelMock.saveAns = _doc;
      userControllerMock.ans.exist = [true, false];
      userControllerMock.indx.exist = 0;

      //Act
      Follow.add(0, 1).then(
        () => {
          expect(false).toBeTrue();
        },
        (err) => {
          //Assert
          expect(err).toEqual(new NotFoundError(`Followee user doesn't exist`));
        }
      );
    });

    it("Throws an input Error when follow already exist", async () => {
      //Arrange
      ModelMock.ans = { followedAt: 231231, follower: 0, followee: 1 };
      ModelMock.populates = false;
      ModelMock.saveAns = null;
      userControllerMock.ans.exist = [true, true];
      userControllerMock.indx.exist = 0;

      //Act
      Follow.add(0, 1).then(
        () => {
          expect(false).toBeTrue();
        },
        (err) => {
          //Assert
          expect(err).toEqual(new Error(`Already Following user`));
        }
      );
    });
  });
  describe("remove", () => {
    it("Return null when follow is removed", async () => {
      //Arrange
      ModelMock.ans = null;
      userControllerMock.ans.exist = [true, true];
      userControllerMock.indx.exist = 0;

      //Act
      const ans = await Follow.remove(0, 1);

      //Assert
      expect(ans).toBeNull();
    });

    it("Throw NotFoundError when follower doesnt exist", async () => {
      //Arrange
      ModelMock.ans = null;
      userControllerMock.ans.exist = [false, true];
      userControllerMock.indx.exist = 0;

      //Act
      Follow.remove(0, 1).then(
        () => {
          expect(false).toBeTrue();
        },
        (err) => {
          //Assert
          expect(err).toEqual(new NotFoundError(`Follower user doesn't exist`));
        }
      );
    });
    it("Throw NotFoundError when followee doesn't exist", async () => {
      //Arrange
      ModelMock.ans = null;
      userControllerMock.ans.exist = [true, false];
      userControllerMock.indx.exist = 0;

      //Act
      Follow.remove(0, 1).then(
        () => {
          expect(false).toBeTrue();
        },
        (err) => {
          //Assert
          expect(err).toEqual(new NotFoundError(`Followee user doesn't exist`));
        }
      );
    });
  });
});
