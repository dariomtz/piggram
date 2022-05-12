const router = require("express").Router();
const passport = require("passport");
const userController = require("../controllers/user.controller");
const { handleErrorAsync, handleError } = require("../utils/hof");
const { isRegistered } = require("../midlewares/auth.midleware");
const { InvalidInputError } = require("../utils/errors");
// path: auth/

// path: auth/
// GET /verifyLogin
router.get("/verifyLogin", isRegistered, (req, res) => {
  res.send({ response: "Logged In", status: 200 });
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
router.get(
  "/facebook/login",
  passport.authenticate("facebook", { scope: ["public_profile", "email"] })
);

//GET /facebook/callback
router.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    failureRedirect: "/login",
    failureMessage: true,
  }),
  (req, res) => {
    // Successful authentication, redirect home.
    res.redirect(`${process.env.FRONTEND_URL}/home`);
  }
);

router.get("/test", (req, res) => {
  res.send(req.user);
});

//Create user with email
//POST /signup
router.post(
  "/signup",
  handleErrorAsync(async (req, res) => {
    const { username, password, password2 } = req.body;
    await userController.createWithEmail({
      email: username,
      password,
      password2,
    });
    res.send();
  })
);

router.post(
  "/login",
  passport.authenticate("local", { failureRedirect: "/auth/failed" }),
  (req, res) => {
    res.send();
  }
);

router.get(
  "/failed",
  handleError((req, res) => {
    throw new InvalidInputError("email or password invalid");
  })
);

module.exports = router;
