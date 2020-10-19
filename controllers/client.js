const express = require("express");
const router = express.Router();

let Client = require("../models/Client");
const User = require("../models/User");

module.exports.clientList = (req, res, next) => {
  Client.find({})
    .sort([["username", 1]])
    .exec(function (err, clientList) {
      if (err) {
        return console.error(err);
      } else {
        res.render("client/list", {
          title: "Client List",
          clientList: clientList,
        });
      }
    });
};
module.exports.addPage = (req, res, next) => {
  res.render("client/add", {title: "Add Client"});
};
module.exports.processAddPage = (req, res, next) => {
  const {username, email, password, number} = req.body;
  let newClient = new Client({
    username,
    email,
    password,
    number,
  });

  Client.create(newClient, (err, client) => {
    if (err) {
      res.end(err);
    } else {
      res.redirect("list");
    }
  });
};
module.exports.editPage = (req, res, next) => {
  let id = req.params.id;
  Client.findById(id, (err, clientToEdit) => {
    if (err) {
      res.end(err);
    } else {
      res.render("client/edit", {title: "Edit Client", data: clientToEdit});
    }
  });
};
module.exports.processEditPage = (req, res, next) => {
  let id = req.params.id;
  const {username, email, number, password} = req.body;
  let updatedClient = new Client({
    _id: id,
    username,
    email,
    number,
    password,
  });

  Client.updateOne({_id: id}, updatedClient, (err) => {
    if (err) {
      res.end(err);
    } else {
      res.redirect("/client/list");
    }
  });
};

module.exports.deleteClient = (req, res, next) => {
  let id = req.params.id;

  Client.deleteOne({_id: id}, (err) => {
    if (err) res.end(err);
    else res.redirect("/client/list");
  });
};
