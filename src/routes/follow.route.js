const router = require("express").Router();
const Follow = require("../controllers/follow.controller");
const {handleErrorAsync} = require("../utils/hof"); 

const {isRegistered} =require("../midlewares/auth.midleware");

router.use(isRegistered);

router.get('/:id/followers', handleErrorAsync(async(req, res)=>{
    let id = req.params.id;
    let followers = await Follow.getFollowers(id);
    res.send(followers);
}));

router.get('/:id/count/followers', handleErrorAsync(async(req, res)=>{
    let id = req.params.id;
    let follows = await Follow.getCountFollowers(id);
    res.send({follows});
}));

router.get('/:id/following', handleErrorAsync(async(req, res)=>{
    let id = req.params.id;
    let following = await Follow.getFollowing(id);
    res.send(following);
}));

router.get('/:id/count/following', handleErrorAsync(async(req, res)=>{
    let id = req.params.id;
    let follows = await Follow.getCountFollowing(id);
    res.send({follows});
}));

router.post('/:id',handleErrorAsync(async (req,res)=>{
    let followee = req.params.id;
    let follow = await Follow.add(req.user._id.valueOf(), followee);
    res.status(200).send({follow});
}) )

router.delete('/:id',handleErrorAsync(async(req,res)=>{
    let followee = req.params.id;
    await Follow.remove(req.user._id,followee);
    res.send();
}))

router.get('/:id/find',handleErrorAsync(async(req,res)=>{
    let followee = req.params.id;
    const exist = await Follow.exist(req.user._id,followee);
    res.send(exist);
}))

module.exports = router;