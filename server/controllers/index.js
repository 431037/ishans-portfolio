const express = require("express");
const router = express.Router();
const passport = require("passport");

const userModel = require("../models/User");
const User = userModel.User;

module.exports.displayHome = (req, res, next) => {
  res.render("portfolio/home", {
    title: " Home Page",
    displayName: req.user ? req.user.displayName : "",
  });
};

module.exports.displayAbout = (req, res, next) => {
  res.render("portfolio/about", {title: " About"});
};

module.exports.displayProjects = (req, res, next) => {
  res.render("portfolio/projects", {title: " Projects"});
};
module.exports.displayServices = (req, res, next) => {
  res.render("portfolio/services", {title: " Services"});
};

module.exports.displayContact = (req, res, next) => {
  res.render("portfolio/contact", {title: " Contact"});
};

module.exports.displayLoginPage = (req, res, next) => {
  if (!req.user) {
    res.render("auth/login", {
      title: "Login",
      messages: req.flash("loginMessage"),
      displayName: req.user ? req.user.displayName : "",
    });
  } else {
    return res.redirect("/");
  }
};
module.exports.processLoginPage = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      console.log(err);
      return next(err);
    }

    if (!user) {
      req.flash("loginMessage", "Authentication Error");
      return res.redirect("/login");
    }

    req.logIn(user, (err) => {
      if (err) {
        console.log(err);
        return next(err);
      }
      return res.redirect("/client/list");
    });
  })(req, res, next);
};

module.exports.displayRegisterPage = (req, res, next) => {
  if (!req.user) {
    res.render("auth/register", {
      title: "Register",
      messages: req.flash("registerMessage"),
      displayName: req.user ? req.user.displayName : "",
    });
  } else {
    return res.redirect("/");
  }
};
module.exports.processRegisterPage = (req, res, next) => {
  let newUser = new User({
    username: req.body.username,
    email: req.body.email,
    displayName: req.body.displayName,
  });

  User.register(newUser, req.body.password, (err) => {
    if (err) {
      console.log(err);
      if (err.name == "UserExistsError") {
        console.log("User exists");
        req.flash("registerMessage", "Registration Error: User already exists");
      }
      return res.render("auth/register", {
        title: "Register",
        messages: req.flash("registerMessage"),
        displayName: req.user ? req.user.displayName : "",
      });
    } else {
      return passport.authenticate("local")(req, res, () => {
        res.redirect("/login");
      });
    }
  });
};

module.exports.logout = (req, res, next) => {
  req.logout();
  res.redirect("/login");
};
