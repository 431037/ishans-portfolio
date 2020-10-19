let mongoose = require("mongoose");

let clientModel = mongoose.Schema(
  {
    username: String,
    email: String,
    number: String,
  },
  {
    collection: "clients",
  }
);

module.exports = mongoose.model("Client", clientModel);
