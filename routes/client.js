let express = require("express");
let router = express.Router();

let Client = require("../models/Client");

router.get("/list", (req, res) => {
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
});

router.get("/add", (req, res, next) => {
  res.render("client/add", {title: "Add Client"});
});

router.post("/add", (req, res) => {
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
});

router.get("/edit/:id", (req, res) => {
  let id = req.params.id;
  Client.findById(id, (err, clientToEdit) => {
    if (err) {
      res.end(err);
    } else {
      res.render("client/edit", {title: "Edit Client", data: clientToEdit});
    }
  });
});

router.post("/edit/:id", (req, res) => {
  let id = req.params.id;
  let updatedClient = new Client({
    _id: id,
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    number: req.body.number,
  });

  Client.updateOne({_id: id}, updatedClient, (err) => {
    if (err) {
      res.end(err);
    } else {
      res.redirect("/client/list");
    }
  });
});

router.get("/delete/:id", (req, res) => {
  let id = req.params.id;

  Client.deleteOne({_id: id}, (err) => {
    if (err) res.end(err);
    else res.redirect("/client/list");
  });
});

module.exports = router;
