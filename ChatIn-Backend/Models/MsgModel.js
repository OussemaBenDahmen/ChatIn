const mongoose = require("mongoose");

const MsgSchema = new mongoose.Schema({
  senderId: String,
  value: Object,
  date: String,
});

const MsgModel = mongoose.model("Msgs", MsgSchema);

module.exports = MsgModel;
