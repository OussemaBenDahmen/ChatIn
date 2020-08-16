const MsgModel = require("../Models/MsgModel");

module.exports = {
  get: (req, res) => {
    MsgModel.find().then((data) => {
      const Mesages = data.map((el) => el.value);
      console.log(Mesages);
      res.send(Mesages);
    });
  },
  post: (req, res) => {
    const newMsg = new MsgModel(req.body);
    newMsg.save();
  },
};
