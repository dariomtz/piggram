const proxyquire = require('proxyquire');
const ControllerMock = require("../mocks/controller.mock");
const ModelMock = require('../mocks/model.mock');
const {NotFoundError,InvalidInputError} = require('../../../src/utils/errors');

const userControllerMock = new ControllerMock();
const postControllerMock = new ControllerMock();

const like = proxyquire("../../../src/controllers/like.controller", {
    "../models/schemas/like":ModelMock,
    "./user.controller":userControllerMock,
    "./post.controller":postControllerMock
});

describe("likeController",()=>{
    describe("getByPost",()=>{
        it("Returns a users list that liked a given post",async()=>{
            //Arrange
            const ans = 
            [
                {'username':'a','name':'a','description':'a','image':'a'},
                {'username':'b','name':'b','description':'b','image':'b'},
                {'username':'c','name':'c','description':'c','image':'c'}
            ]
            ModelMock.ans = ans;
            
            //Act
            const res = await like.getByPost(0);

            //Assert
            expect(res).toEqual(ans);
        })
        it("Returns an empty list when likes not founds",async()=>{
            //Arrange
            ModelMock.ans = null;
            
            //Act
            const res = await like.getByPost(0);

            //Assert
            expect(res).toEqual([]);
        })
    })
    describe("getByUser",()=>{
        it("Returns a posts list that where liked by a user",async()=>{
            //Arrange
            const ans = [
                {'image':'a','description':'a','publishedAt':'a','userId':0},
                {'image':'b','description':'b','publishedAt':'b','userId':1},
                {'image':'c','description':'c','publishedAt':'c','userId':2}
            ]
            ModelMock.ans = ans;
            
            //Act
            const res = await like.getByUser(0);

            //Assert
            expect(res).toEqual(ans);
        })
        it("Returns an empty list when likes not founds",async()=>{
            //Arrange
            ModelMock.ans = null;
            
            //Act
            const res = await like.getByUser(0);

            //Assert
            expect(res).toEqual([]);
        })
    })
    describe("find",()=>{
        it("returns a like if found", async()=>{
            //Arrange
            const ans = {
                likedAt:0,
                userId:{'username':'a','name':'a','description':'a','image':'a'},
                postId:{'image':'a','description':'a','publishedAt':'a','userId':0}}

            ModelMock.ans = ans;
            ModelMock.populates = true;

            //Act

            const res = await like.find(0,0);

            //Assert
            expect(res).toEqual(ans);
        })

        it("returns an empty object if like not found", async()=>{
            //Arrange
            ModelMock.ans = null;
            ModelMock.populates = true;

            //Act

            const res = await like.find(0,0);

            //Assert
            expect(res).toEqual({});
        })
    })
    describe("exist",()=>{
        it("Returns true if like exists",async()=>{
            //Arrange
            const ans = {
                likedAt:0,
                userId:{'username':'a','name':'a','description':'a','image':'a'},
                postId:{'image':'a','description':'a','publishedAt':'a','userId':0}}
            
            ModelMock.ans = ans;
            ModelMock.populates = false;

            //Act
            const res = await like.exist(0,1);

            //Assert
            expect(res).toBeTrue();

        })
        it("Returns false if like doesn't exists",async()=>{
            //Arrange
           
            
            ModelMock.ans = null;
            ModelMock.populates = false;

            //Act
            const res = await like.exist(0,1);

            //Assert
            expect(res).toBeFalse();

        })
    })
    describe("add",()=>{
        it("Creates a new like",async ()=>{
            //Arrange
            const ans = {
                likedAt:0,
                userId:{'username':'a','name':'a','description':'a','image':'a'},
                postId:{'image':'a','description':'a','publishedAt':'a','userId':0}}
            
            ModelMock.ans = null;
            ModelMock.saveAns = ans;
            ModelMock.populates = false;
            userControllerMock.ans.exist = [true];
            userControllerMock.indx.exist = 0;
            postControllerMock.ans.exist = [true];
            postControllerMock.indx.exist = 0;

            //Act

            const res = await like.add(0,1);

            //Assert
            expect(res).toEqual(ans)

        })
        it("Throw a NotFoundError when user doesn't exist",async ()=>{
            //Arrang
            
            ModelMock.ans = null;
            userControllerMock.ans.exist = [false];
            userControllerMock.indx.exist = 0;
            postControllerMock.ans.exist = [true];
            postControllerMock.indx.exist = 0;

            //Act

            like.add(0,1).then(()=>{
                expect(true).toBeFalse();
            },(err)=>{
                expect(err).toEqual(new NotFoundError(`User doesn't exist`));
            })

        })
        it("Throw a NotFoundError when post doesn't exist",async ()=>{
            //Arrang
            
            ModelMock.ans = null;
            userControllerMock.ans.exist = [true];
            userControllerMock.indx.exist = 0;
            postControllerMock.ans.exist = [false];
            postControllerMock.indx.exist = 0;

            //Act

            like.add(0,1).then(()=>{
                expect(true).toBeFalse();
            },(err)=>{
                expect(err).toEqual(new NotFoundError(`Post doesn't exist`));
            })

        })
        it("Throw an InvalidInputError when like already exists",async ()=>{
            //Arrang
            ModelMock.ans = {
                likedAt:0,
                userId:{'username':'a','name':'a','description':'a','image':'a'},
                postId:{'image':'a','description':'a','publishedAt':'a','userId':0}};
            userControllerMock.ans.exist = [true];
            userControllerMock.indx.exist = 0;
            postControllerMock.ans.exist = [true];
            postControllerMock.indx.exist = 0;

            //Act

            like.add(0,1).then(()=>{
                expect(true).toBeFalse();
            },(err)=>{
                expect(err).toEqual(new InvalidInputError(`Like already exists`));
            })
        })
    })
    describe("remove",()=>{
        it("Removes a like",async()=>{
            //Arrange
            ModelMock.ans = null;
            userControllerMock.ans.exist = [true];
            userControllerMock.indx.exist = 0;
            postControllerMock.ans.exist = [true];
            postControllerMock.indx.exist = 0;

            //Act
            const res = await like.remove(0,1);

            //Assert
            expect(res).toBeNull();
        })
        it("Throws NotFoundError when post doesn't exist",async()=>{
            //Arrange
            ModelMock.ans = null;
            userControllerMock.ans.exist = [true];
            userControllerMock.indx.exist = 0;
            postControllerMock.ans.exist = [false];
            postControllerMock.indx.exist = 0;

            //Act
           like.remove(0,1).then(()=>{
               expect(false).toBeTrue();
           },(err)=>{
               expect(err).toEqual(new NotFoundError(`Post doesn't exist`));
           })
        })
        it("Throws NotFoundError when user doesn't exist",async()=>{
            //Arrange
            ModelMock.ans = null;
            userControllerMock.ans.exist = [false];
            userControllerMock.indx.exist = 0;
            postControllerMock.ans.exist = [true];
            postControllerMock.indx.exist = 0;

            //Act
           like.remove(0,1).then(()=>{
               expect(false).toBeTrue();
           },(err)=>{
               expect(err).toEqual(new NotFoundError(`User doesn't exist`));
           })

        })
    })
})