const GrpMsgModel = require("../Models/GrpMsgModel");
exports.GrpPost = (data) => {
  const newMsg = new GrpMsgModel({
    senderId: data.User,
    value: data.myMessage,
    GroupeId: data.GroupeId,
  });

  newMsg.save();
};

exports.GrpGet = async (req, res) => {
  const AllMessages = await GrpMsgModel.find().populate("senderId GroupeId");
  res = AllMessages;

  return res;
};
