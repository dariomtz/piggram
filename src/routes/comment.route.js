const router = require("express").Router();
const {isRegistered} =require("../midlewares/auth.midleware");
const Comment = require("../controllers/comment.controller");
const {handleErrorAsync} = require("../utils/hof"); 


router.use(isRegistered);

//path: comment/
router.get("/:postId", handleErrorAsync(async (req,res)=>{
    let {postId} = req.params;
    let comments = await Comment.getByPost(postId);
    res.send(comments);
}))

router.post("/",handleErrorAsync(async (req,res)=>{
    const comment = await Comment.create({
        userId: req.user._id,
        ...req.body
    });
    return res.send(comment);
}))

router.delete("/:commentId",handleErrorAsync(async (req,res)=>{
    let {commentId} = req.params;
    await Comment.delete(commentId, req.user._id);
    res.send();
}))

module.exports = router;