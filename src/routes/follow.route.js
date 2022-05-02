const router = require("express").Router();
const Follow = require("../controllers/follow.controller");
const {handleErrorAsync} = require("../utils/hof"); 

const {isAuthenticated} =require("../midlewares/auth.midleware");

router.use(isAuthenticated);

//Path: /follows

router.get('/:id/followers', handleErrorAsync(async(req, res)=>{
    let id = req.params.id;
    let followers = await Follow.getFollowers(id);
    res.send({followers});
}));

router.get('/:id/following', handleErrorAsync(async(req, res)=>{
    let id = req.params.id;
    let following = await Follow.getFollowing(id);
    res.send({following});
}));

router.post('/:id',handleErrorAsync(async (req,res)=>{
    let followee = req.params.id;
    let follow = await Follow.add(req.user._id, followee);
    res.send({follow});
}) )

router.delete('/:id',handleErrorAsync(async(req,res)=>{
    let followee = req.params.id;
    await Follow.remove(req.user._id,followee);
    res.send();
}))

module.exports = router;