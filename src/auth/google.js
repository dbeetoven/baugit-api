const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const config = require("../config/config");
var User = require('../models/auth.model');

passport.use(
  new GoogleStrategy(
    {
      clientID: config.googleCLientId,
      clientSecret: config.googleClientSecret,
      callbackURL: config.googleCallBack,
    },
    function (accessToken, refreshToken, profile, done) {
      User.findOrCreate(
        { userid: profile.id },
        { name: profile.displayName, userid: profile.id },
        function (err, user) {
          return done(err, user);
        }
      );
    }
  )
);

module.exports = passport;
