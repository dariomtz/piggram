const router = require("express").Router();
const {isAuthenticated} =require("../midlewares/auth.midleware");
const Like = require("../controllers/like.controller");

router.use(isAuthenticated);

router.get('/post/:postId',async (req,res)=>{
    let {postId} = req.params;
    let likes = await Like.getByPost(postId)
    res.send(likes);
})

router.get('/user/:userId',async (req,res)=>{
    let {userId} = req.params;
    let likes = await Like.getByUser(userId);
    res.send(likes);
    
})

router.post('/:postId',async (req,res)=>{
    let {postId} = req.params;
    let like = await Like.add(postId,req.user._id);
    res.send(like);
})

router.delete('/:postId',async (req,res)=>{
    let {postId} = req.params;
    await Like.remove(postId, req.user._id);
    res.send();
})

module.exports = router;