const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const UserSchema = mongoose.Schema(
  {
    username: {
      type: String,
    },
    email: {
      type: String,
    },
    displayName: {
      type: String,
    },
    created: {
      type: Date,
      default: Date.now,
    },
    updated: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: "users",
  }
);

let options = {missingPasswordError: "No password"};
UserSchema.plugin(passportLocalMongoose, options);

module.exports.User = mongoose.model("User", UserSchema);
