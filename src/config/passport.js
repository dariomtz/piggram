const passport = require('passport');
const User = require('../controllers/user.controller');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook');

passport.serializeUser(function (user, done) {
    //TODO: Replace local for MongoDB implementation
    done(null, user.id);
    });

passport.deserializeUser(function (id, done) {
    //TODO: Replace local for MongoDB implementation
    User.find(id)
    .then(user => done(null, user))
    .catch(err => done(err));
    });


//Google strategy
passport.use(
new GoogleStrategy(
    {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:3000/auth/google/callback',
    },
    function (accessToken, refreshToken, profile, done) {
        //TODO: replace local implementation for MongoDB implementation
        User.find(profile.id)
        .then((user)=>{
            done(null,user);
        })
        .catch((err)=>{
            User.create({
                id: profile.id,
                email: profile.emails[0].value,
                timestamp: Date.now(),
                name:  profile.displayName,
                imagenUrl: profile.photos[0].value
            }).then(user=>done(null, user)
            ).catch(err=>done(err));
            
        })
    })
);

//Facebook strategy
passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: 'http://localhost:3000/auth/facebook/callback'
  },
  function(accessToken, refreshToken, profile, done) {
    //TODO: replace local implementation for MongoDB implementation
    console.log(profile);
    User.find(profile.id)
    .then((user)=>{
        done(null,user);
    })
    .catch((err)=>{
        User.create({
            id: profile.id,
            email: profile.email,
            timestamp: Date.now(),
            name:  profile.displayName,
            imagenUrl: profile.profileUrl,
        }).then(user=>done(null, user)
        ).catch(err=>done(err));
        
    })
  })
);