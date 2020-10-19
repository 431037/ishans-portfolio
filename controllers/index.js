const express = require("express");
const router = express.Router();

module.exports.displayHome = (req, res, next) => {
  res.render("portfolio/home", {title: " Home Page"});
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
