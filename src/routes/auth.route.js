const router = require("express").Router();
const passport = require("passport");
const userController = require("../controllers/user.controller");
// path: auth/

// path: auth/
// GET /verifyLogin
router.get("/verifyLogin", (req, res) => {
  if (req.user != null) {
    res.send({"response":"Logged In", "status": 200});
    return;
  }
  res.status(401).send({"response":"Not Authorized", "status": 401});
});

// GET /logout
router.get("/logout", (req, res) => {
  req.logOut();
  req.session = null;
  res.redirect(`${process.env.FRONTEND_URL}/`);
});

// GET /google/login
router.get(
  "/google/login",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// GET /google/callback
router.get("/google/callback", passport.authenticate("google"), (req, res) => {
  // Successful authentication, redirect home.
  res.redirect(`${process.env.FRONTEND_URL}/home`);
});

// GET /facebook/login
router.get('/facebook/login',passport.authenticate('facebook',{scope:['public_profile', 'email']})
);

//GET /facebook/callback
router.get('/facebook/callback',
    passport.authenticate('facebook',{failureRedirect: '/login', failureMessage: true}),
    (req, res)=> {
    // Successful authentication, redirect home.
    res.redirect(`${process.env.FRONTEND_URL}/home`);
    }
);

router.get('/test', (req, res)=>{
  res.send(req.user);
})

//Create user with email
//POST /
router.post('/',(req,res)=>{
  const {email, password, password2} = req.body;
  await userController.createWithEmail({email, password, password2});
  res.redirect(`${process.env.FRONTEND_URL}/`);
})


module.exports = router;
