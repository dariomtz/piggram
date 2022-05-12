const passport = require("passport");
const User = require("../controllers/user.controller");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook");

passport.serializeUser(function (user, done) {
  done(null, user.passportID);
});

passport.deserializeUser(function (id, done) {
  User.findByPassportId(id)
    .then(user => {
      done(null, user);
    })
    .catch(err => done(err));
});

//Google strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.SERVER}/auth/google/callback`,
    },
    function (accessToken, refreshToken, profile, done) {
      User.findByPassportId(profile.id)
        .then(user => {
          done(null, user);
        })
        .catch(err => {
          User.create({
            passportID: profile.id,
            email: profile.emails[0].value,
            name: profile.displayName,
            description: "Hey I'm using piggram",
            image: profile.photos[0].value,
            //TODO: Get date of birth
          })
            .then(user => done(null, user))
            .catch(err => done(err));
        });
    }
  )
);

//Facebook strategy
passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: `${process.env.SERVER}/auth/facebook/callback`,
      profileFields: ["id", "displayName", "picture", "email", "birthday"],
    },
    function (accessToken, refreshToken, profile, done) {
      User.findByPassportId(profile.id)
        .then(user => {
          done(null, user);
        })
        .catch(err => {
          User.create({
            passportID: profile.id,
            name: profile.displayName,
            description: "Hey Im using piggram",
            email: profile.emails[0].value,
            image: profile.photos[0].value,
          })
            .then(user => done(null, user))
            .catch(err => done(err));
        });
    }
  )
);
