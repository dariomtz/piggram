const router = require("express").Router();
const {isAuthenticated} =require("../midlewares/auth.midleware");

router.use(isAuthenticated);

router.get('/:id',async (req,res)=>{
    let {id} = req.params;
    
})

module.exports = router;