const router = require('express').Router();
const path = require('path');
const passport = require('passport');
// path: auth/

// GET /login
router.get('/login', (req, res) => {
    res.sendFile(path.resolve('src/public/html/login.html'));
  });

// GET /google/login
router.get('/google/login', passport.authenticate('google', { scope:
    ['profile', 'email'] }));

// GET /google/callback
router.get('/google/callback',passport.authenticate('google'), (req, res)=> {
    //console.log(req.query.code);
    // Successful authentication, redirect home.
    res.redirect('/');
    }
    );


// GET /verifyLogin
router.get('/verifyLogin',(req,res)=>{
    if(req.user != null){
        res.send('Logged In');
        return;
    }
    res.status(401).send('Not Authorized')
})

// GET /logout
router.get('/logout',(req,res)=>{
    req.logOut();
    req.session = null;
    res.redirect('/');
})

module.exports = router;
