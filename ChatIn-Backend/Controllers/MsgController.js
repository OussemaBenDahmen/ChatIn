const MsgModel = require("../Models/MsgModel");
exports.post = (data, res) => {
  const newMsg = new MsgModel({
    senderId: data.User,
    value: data.myMessage,
    recieverId: data.recieverId,
    groupeId: data.groupeId,
  });

  newMsg.save().then((data) =>
    MsgModel.findById({ _id: data._id })
      .populate("senderId recieverId groupeId")
      .then((msg) => {
        res(msg);
      })
  );
};

exports.get = async (req, res) => {
  const AllMessages = await MsgModel.find().populate(
    "senderId recieverId groupeId"
  );
  res = AllMessages;

  return res;
};
