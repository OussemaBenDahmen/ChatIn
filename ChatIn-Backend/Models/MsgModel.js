const mongoose = require("mongoose");
const ObjectId = require("mongoose").Schema.Types.ObjectId;
const MsgSchema = new mongoose.Schema({
  value: { type: String },
  senderId: {
    type: ObjectId,
    ref: "Users",
  },

  recieverId: {
    type: ObjectId,
    ref: "Users",
  },
  date: { type: Date, default: Date.now },
  groupeId: {
    type: ObjectId,
    ref: "Groupes",
  },
});

const MsgModel = mongoose.model("Msgs", MsgSchema);

module.exports = MsgModel;
