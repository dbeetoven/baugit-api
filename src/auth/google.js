const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const config = require('../config/config');

passport.use(
  new GoogleStrategy(
    {
      clientID: config.googleCLientId,
      clientSecret: config.googleClientSecret,
      callbackURL: config.googleCallBack,
    },
    (accessToken, refreshToken, profile, done) => {
      return done(err, profile);
    },
  ),
);

passport.serializeUser(function(user, done) {
  done(null, user)
})
passport.deserializeUser(function(obj, done) {
  done(null, obj)
})
module.exports = passport;
