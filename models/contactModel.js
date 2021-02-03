const { Schema, model } = require("mongoose");

const contacts = new Schema({
  name: String,
  mail: String,
  phone: String,
  subscription: String,
  password: String,
  token: String,
});
module.exports = model("Contacts", contacts);
