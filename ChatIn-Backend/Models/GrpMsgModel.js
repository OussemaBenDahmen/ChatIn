const mongoose = require("mongoose");
const ObjectId = require("mongoose").Schema.Types.ObjectId;
const GrpMsgSchema = new mongoose.Schema({
  value: { type: String },
  senderId: {
    type: ObjectId,
    ref: "Users",
  },

  GroupeId: {
    type: ObjectId,
    ref: "Groupes",
  },

  date: { type: Date, default: Date.now },
});

const GrpMsgModel = mongoose.model("GrpMsgs", GrpMsgSchema);

module.exports = GrpMsgModel;
