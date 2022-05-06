const proxyquire = require('proxyquire');

const ModelMock = require('../mocks/model.mock');
const MongooseMock = require("../mocks/mongoose.mock");
const ControllerMock = require("../mocks/controller.mock");

const userControllerMock = new ControllerMock();
const {NotFoundError,InvalidInputError} = require('../../../src/utils/errors');
const Follow = proxyquire("../../../src/controllers/follow.controller", {
    "../models/schemas/follow":ModelMock,
    "mongoose":MongooseMock,
    "./user.controller":userControllerMock
});

describe('followController',()=>{
    describe('getFollowers',()=>{
        it('Return list of followers',async ()=> {
            //Arrange
            const _doc = [
                {_id:0,follower:{'username':'a','name':'a','description':'a','image':'a'}},
                {_id:1,follower:{'username':'b','name':'b','description':'b','image':'b'}},
                {_id:2,follower:{'username':'c','name':'c','description':'c','image':'c'}}];

            ModelMock.ans =_doc
            MongooseMock.ans = true;
            //Act
            const followers = await Follow.getFollowers(0);

            //Assert
            expect(followers.length).toEqual(_doc.length);
            for(let i = 0; i< _doc.length; i++)
                expect(followers[i]["follower"]).toEqual(_doc[i].follower);
            
        });

        it('Return empty list', async ()=>{
            //Arrange
            ModelMock.ans = null;
            MongooseMock.ans = true;

            //Act
            const followers = await Follow.getFollowers(0);

            //Assert
            expect(followers.length).toBe(0);
            expect(followers).toEqual([]);
        });

        it("To be rejected with invalid id",async()=>{
            //Arrange
            ModelMock.ans = null;
            MongooseMock.ans = false;

            //Act

            //Assert
            await expectAsync(Follow.getFollowers(0)).toBeRejected();
        });

        it("To throw an InvalidInputError with invalid id",async()=>{
            //Arrange
            ModelMock.ans = null;
            MongooseMock.ans = false;

            //Act
            Follow.getFollowers(0).then(()=>{
                expect(false).toBeTrue();
            },(err)=>{
                expect(err).toEqual(new InvalidInputError(`Invalid user ID`));
            })
        })
    }),
    describe('getFollowing',()=>{
        it('Return list of following',async ()=> {
            //Arrange
            const _doc = [
                {_id:0,followee:{'username':'a','name':'a','description':'a','image':'a'}},
                {_id:1,followee:{'username':'b','name':'b','description':'b','image':'b'}},
                {_id:2,followee:{'username':'c','name':'c','description':'c','image':'c'}}];

            ModelMock.ans =_doc
            MongooseMock.ans = true;
            //Act
            const ans = await Follow.getFollowing(0);

            //Assert
            expect(ans.length).toEqual(_doc.length);
            for(let i = 0; i< _doc.length; i++)
                expect(ans[i]["follower"]).toEqual(_doc[i].follower);
            
        });

        it('Return empty list', async ()=>{
            //Arrange
            ModelMock.ans = null;
            MongooseMock.ans = true;

            //Act
            const followers = await Follow.getFollowing(0);

            //Assert
            expect(followers.length).toBe(0);
            expect(followers).toEqual([]);
        });

        it("To be rejected with invalid id",async()=>{
            //Arrange
            ModelMock.ans = null;
            MongooseMock.ans = false;

            //Act

            //Assert
            await expectAsync(Follow.getFollowing(0)).toBeRejected();
        });

        it("To throw an InvalidInputError with invalid id",async()=>{
            //Arrange
            ModelMock.ans = null;
            MongooseMock.ans = false;

            //Act
            Follow.getFollowing(0).then(()=>{
                expect(false).toBeTrue();
            },(err)=>{
                expect(err).toEqual(new InvalidInputError(`Invalid user ID`));
            })
        })
    });
    describe("find",()=>{
        it("return a follow",async()=>{
            //Arrange
            const _doc = {followedAt:0,
                followee:{username:"a",name:"a",description:"a",image:"a"},
                followee:{username:"b",name:"b",description:"b",image:"b"}
            }
            ModelMock.ans = _doc;
            MongooseMock.ans = true;

            //Act
            const ans = await Follow.find(0,1);

            //Assert
            expect(ans.length).toBe(_doc.length);
            expect(ans).toEqual(_doc);

        })
        it("Return an empty follow", async()=>{
            //Arrange
            const _doc = null;
            ModelMock.ans = _doc;
            MongooseMock.ans = true;

            //Act
            const ans = await Follow.find(0,1);

            //Assert
            expect(ans).toEqual({});
        })
        it("Reject a Promise for invalid follower id", async()=>{
            //Arrange
            const _doc = null;
            ModelMock.ans = _doc;
            MongooseMock.ans =[false,true];
            MongooseMock.pos = 0;

            //Act

            //Assert
            await expectAsync(Follow.find(0,1)).toBeRejected();
        })

        it("Throw an InvalidInputErro for invaild follower id", async()=>{
            //Arrange
            const _doc = null;
            ModelMock.ans = _doc;
            MongooseMock.ans =[false,true];
            MongooseMock.pos = 0;

            //Act
            Follow.find(0,1).then(()=>{
                expect(false).toBeTrue();
            },(err)=>{
                //Assert
                expect(err).toEqual(new InvalidInputError(`Invalid follower ID`));
            })
        })

        it("Reject a Promise for invalid follower id", async()=>{
            //Arrange
            const _doc = null;
            ModelMock.ans = _doc;
            MongooseMock.ans =[true,false];
            MongooseMock.pos = 0;

            //Act

            //Assert
            await expectAsync(Follow.find(0,1)).toBeRejected();
        })

        it("Throw an InvalidInputErro for invaild follower id", async()=>{
            //Arrange
            const _doc = null;
            ModelMock.ans = _doc;
            MongooseMock.ans =[true,false];
            MongooseMock.pos = 0;

            //Act
            Follow.find(0,1).then(()=>{
                //Assert
                expect(false).toBeTrue();
            },(err)=>{
                //Assert
                expect(err).toEqual(new InvalidInputError(`Invalid followee ID`));
            })
        })
    })
    describe("exist",()=>{
        it("Return true when exist",async()=>{
            //Arrange
            const _doc = {}
            ModelMock.ans = _doc;
            ModelMock.populates = false;

            //Act
            const ans = await Follow.exist(0,1);

            //Assert
            expect(ans).toBeTrue();
        })
        it("Return false when doesnt exist",async()=>{
            //Arrange
            const _doc = null;
            ModelMock.ans = _doc;
            ModelMock.populates = false;

            //Act
            const ans = await Follow.exist(0,1);

            //Assert
            expect(ans).toBeFalse();
        })
    })
    describe("add", ()=>{
        it("Returns a new follow when created",async()=>{
            //Arrange
            const _doc = {followedAt: 231231,follower:0,followee:1}
            ModelMock.ans = null;
            ModelMock.populates = false;
            ModelMock.saveAns = _doc;
            userControllerMock.ans.exist = [true,true];
            userControllerMock.indx.exist = 0;

            //Act
            const ans = await Follow.add(0,1);

            //Assert
            expect(ans).toEqual(_doc);
        })
        it("Throws an input Error when follower and followee are the same",async()=>{
            //Arrange
            const _doc = null;
            ModelMock.ans = null;
            ModelMock.populates = false;
            ModelMock.saveAns = _doc;
            userControllerMock.ans.exist = [true,true];
            userControllerMock.indx.exist = 0;

            //Act
            Follow.add(0,0).then(()=>{
                expect(false).toBeTrue();
            },(err)=>{
                //Assert
                expect(err).toEqual(new InvalidInputError(`A user can't follow himself`))
            })

            
        })

        it("Throws a NotFoundError when follower doesnt exist",async()=>{
            //Arrange
            const _doc = null;
            ModelMock.ans = null;
            ModelMock.populates = false;
            ModelMock.saveAns = _doc;
            userControllerMock.ans.exist = [false,true];
            userControllerMock.indx.exist = 0;

            //Act
            Follow.add(0,1).then(()=>{
                expect(false).toBeTrue();
            },(err)=>{
                //Assert
                expect(err).toEqual(new NotFoundError(`Follower user doesn't exist`))
            })

            
        })
        it("Throws a NotFoundError when followee doesnt exist",async()=>{
            //Arrange
            const _doc = null;
            ModelMock.ans = null;
            ModelMock.populates = false;
            ModelMock.saveAns = _doc;
            userControllerMock.ans.exist = [true,false];
            userControllerMock.indx.exist = 0;

            //Act
            Follow.add(0,1).then(()=>{
                expect(false).toBeTrue();
            },(err)=>{
                //Assert
                expect(err).toEqual(new NotFoundError(`Followee user doesn't exist`))
            })

            
        })

        it("Throws an input Error when follow already exist",async()=>{
            //Arrange
            ModelMock.ans = {followedAt: 231231,follower:0,followee:1};
            ModelMock.populates = false;
            ModelMock.saveAns = null;
            userControllerMock.ans.exist = [true,true];
            userControllerMock.indx.exist = 0;

            //Act
            Follow.add(0,1).then(()=>{
                expect(false).toBeTrue();
            },(err)=>{
                //Assert
                expect(err).toEqual(new Error(`Already Following user`))
            })

            
        })
    })
    describe("remove",()=>{
        it("Return null when follow is removed",async()=>{
            //Arrange
            ModelMock.ans = null;
            userControllerMock.ans.exist = [true,true];
            userControllerMock.indx.exist = 0;

            //Act
            const ans = await Follow.remove(0,1);

            //Assert
            expect(ans).toBeNull();

        })

        it("Throw NotFoundError when follower doesnt exist",async()=>{
            //Arrange
            ModelMock.ans = null;
            userControllerMock.ans.exist = [false,true];
            userControllerMock.indx.exist = 0;

            //Act
            Follow.remove(0,1).then(()=>{
                expect(false).toBeTrue();
            },(err)=>{
                //Assert
                expect(err).toEqual(new NotFoundError(`Follower user doesn't exist`));
            })

        })
        it("Throw NotFoundError when followee doesn't exist",async()=>{
            //Arrange
            ModelMock.ans = null;
            userControllerMock.ans.exist = [true,false];
            userControllerMock.indx.exist = 0;

            //Act
            Follow.remove(0,1).then(()=>{
                expect(false).toBeTrue();
            },(err)=>{
                //Assert
                expect(err).toEqual(new NotFoundError(`Followee user doesn't exist`));
            })

        })
    })

})