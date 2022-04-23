const router = require("express").Router();
const Follow = require("../controllers/follow.controller");

const {isAuthenticated} =require("../midlewares/auth.midleware");

router.use(isAuthenticated);

router.get('/:id', async(req, res)=>{
    let id = req.params.id;
    let followers = await Follow.getFollowers(id);
    console.log(followers);
    res.send({followers});
});


router.post('/:id', async (req,res)=>{
    let id = req.params.id;
    console.log('id',id);
    let follow = await Follow.followUser(req.user._id, id);
    res.send({follow});
})

module.exports = router;