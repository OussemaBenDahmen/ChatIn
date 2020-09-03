const GrpMsgModel = require("../Models/GrpMsgModel");
exports.GrpPost = (data) => {
  console.log(data);
  const newMsg = new GrpMsgModel({
    senderId: data.User,
    value: data.myMessage,
    GroupeId: data.GroupeId,
  });
  console.log(newMsg);
  newMsg.save();
};

exports.GrpGet = async (req, res) => {
  const AllMessages = await GrpMsgModel.find().populate("senderId GroupeId");
  res = AllMessages;

  return res;
};
