const bcrypt = require("bcrypt");
const User = require("../models/model");

class Auth {
  login(passport) {
    console.log("login");

    return passport.authenticate("local", {
      successRedirect: "/admin",
      failureRedirect: "/login",
      session: true,
      failureFlash: true,
    });
  }

  logout(req, res, next) {
    req.logout((err) => {
      if (err) {
        return next(err);
      }
      res.redirect("/");
    });
  }

  register(req, res, next) {
    const { name, email, password } = req.body;
    bcrypt.hash(password, 10).then((hashedPassword) => {
      const admin = false;

      User.create({
        name,
        admin,
        hashedPassword,
        email,
      })
        .then(() => {
          res.redirect("/login");
        })
        .catch((err) => {
          console.log(err);
          res.redirect("/register");
        });
    });
  }

  createUser(name, email, hashedPassword, res) {}

  checkLogged(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect("/admin/login");
  }

  checkNotLogged(req, res, next) {
    if (req.isAuthenticated()) return res.redirect("/admin");
    next();
  }
}

const auth = new Auth();

module.exports = auth;
