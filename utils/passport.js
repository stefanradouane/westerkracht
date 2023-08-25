const LocalStrategy = require("passport-local").Strategy;
const passport = require("passport");
const User = require("../models/model");
const bcrypt = require("bcrypt");

// Failed login message to be used in the failure callback
const errorMsg = "Email of wachtwoord is onjuist";
const failure = (done) => done(null, false, { message: errorMsg });

const authUser = (email, password, done) => {
  User.findOne({ email: email }).then((user) => {
    if (user == null) return failure(done); // No user found
    if (!user.admin) return failure(done); // User is not an admin
    bcrypt.compare(password, user.hashedPassword, (err, result) => {
      return result === true ? done(null, user) : failure(done); // Password match
    });
  });
};

// Serialize and deserialize the user id to push into the session
passport.serializeUser((user, done) => done(null, user._id.toString()));
passport.deserializeUser((id, done) => done(null, id));

// Use the local strategy
passport.use(new LocalStrategy({ usernameField: "email" }, authUser));

module.exports = passport;
