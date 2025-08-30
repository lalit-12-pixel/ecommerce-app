const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/User");
require("dotenv").config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails[0].value;
        let user = await User.findOne({ email });

        if (!user) {
          user = await User.create({
            googleId: profile.id,
            name: profile.displayName,
            email,
            isVerified: true,
          });
        } else if (!user.googleId) {
          user.googleId = profile.id;
          user.avatar = user.avatar || profile.photos?.[0]?.value;
          user.isVerified = true;
          await user.save();
        }

        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

passport.serializeUser((user, done) => done(null, user._id));

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id).lean();
    done(null, user || false);
  } catch (err) {
    done(err, null);
  }
});

// Middleware to sync req.user into req.session.user
function syncUserToSession(req, res, next) {
  if (req.user) {
    req.session.user = req.user;       // <- crucial
    req.session.isLoggedIn = true;
  }
  next();
}

module.exports = { passport, syncUserToSession };
