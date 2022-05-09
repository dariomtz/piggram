const router = require("express").Router();
const {isAuthenticated} =require("../midlewares/auth.midleware");
const Like = require("../controllers/like.controller");
const {handleErrorAsync} = require("../utils/hof"); 

router.use(isAuthenticated);

router.get('/post/:postId', handleErrorAsync(async (req,res)=>{
    let {postId} = req.params;
    let likes = await Like.getByPost(postId)
    res.send(likes);
}))

router.get('/user/:userId',handleErrorAsync(async (req,res)=>{
    let {userId} = req.params;
    let likes = await Like.getByUser(userId);
    res.send(likes);
    
}))

router.get('/post/:postId/count',handleErrorAsync(async (req,res)=>{
    let {postId} = req.params;
    let count = await Like.getCountByPost(postId)
    res.send({count});
}))

router.get('/:postId',handleErrorAsync(async (req,res)=>{
    let {postId} = req.params;
    let liked = await Like.exist(postId,req.user._id);
    console.log(liked);
    res.send(liked);
}))

router.post('/:postId',handleErrorAsync(async (req,res)=>{
    let {postId} = req.params;
    let like = await Like.add(postId,req.user._id);
    res.send(like);
}))

router.delete('/:postId',handleErrorAsync(async (req,res)=>{
    let {postId} = req.params;
    await Like.remove(postId, req.user._id);
    res.send();
}))

module.exports = router;