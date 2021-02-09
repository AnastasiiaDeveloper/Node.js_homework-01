const { Schema, model } = require("mongoose");

const users = new Schema({
  email: String,
  password: String,
  subscription: {
    type: String,
    enum: ["free", "pro", "premium"],
    default: "free",
  },
  token: String,
});
module.exports = model("User", users);
