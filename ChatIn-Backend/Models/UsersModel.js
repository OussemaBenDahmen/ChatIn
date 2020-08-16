const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  password: String,
  email: String,
  picture: Object,
  role: String,
});

const UserModel = mongoose.model("Users", UserSchema);

module.exports = UserModel;
