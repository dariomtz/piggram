const proxyquire = require("proxyquire");

const ModelMock = require("../mocks/model.mock");
const MongooseMock = require("../mocks/mongoose.mock");

const Post = proxyquire("../../../src/controllers/post.controller", {
  "../models/schemas/post": ModelMock,
  "mongoose": MongooseMock,
  
});

describe('postController',()=>{
    describe('findById',()=>{
        it('Return post when found',async()=>{
            //Arrange
            const _doc = {"text":"postadsadasd", "image":"dsadsadsa.com",userId:"dadsada"};
            ModelMock.ans = _doc;
            //Act
            const post = await Post.findById("dad");
            //Assert
            expect(post).toEqual(_doc);
        });
    });
    describe('exist',()=>{
        it('Returns true when exist', async()=>{
            MongooseMock.ans=true;
            ModelMock.ans = {};
            //Act
            const exist = await Post.exist("dasdad");
            //Assert
            expect(exist).toBeTrue();
        });
    });
    describe("createPost",()=>{
        it("Return new post when created",async()=>{
            //Arrange
            const _doc = {image:"adasd", description:"adasdsa", userId:"adsadas"};
            ModelMock.saveAns = _doc;
            //Act
            const post = await Post.createPost({image:"adasd", description:"adasdsa", userId:"adsadas"});
            //Assert
            expect(post).toEqual(_doc);
        });
    });
    describe("getPost",()=>{
        it("return post when found", async()=>{
            //Arrange
            const res = {image:"adasd", description:"adasdsa", userId:"adsadas"};
            const _doc = {populate:(a,b)=>res};
            ModelMock.ans = _doc;
            MongooseMock.ans = true;
            //Act
            const post = await Post.getPost("adsad");

            //Assert
            expect(post).toEqual(res);
        });
    });
    describe("deletePost",()=>{
        it("delete a post when found",async()=>{
            //Arrange
            ModelMock.deleted = false;
            MongooseMock.ans = true;
            ModelMock.ans = {image:"adasd", description:"adasdsa", userId:"adsadas"};

            //Act
            await Post.deletePost("dadasd");

            //Assert
            expect(ModelMock.deleted).toBeTrue();
        })
    })
});