const GroupeModel = require("../Models/GroupeModel");
const jwt = require("jsonwebtoken");

module.exports = {
  Create: (req, res) => {
    let mytoken = req.cookies.token;
    let decoded = jwt.verify(mytoken, process.env.SECRET_KEY);
    let Data = {
      GroupeName: req.body.GroupeName,
      Users: req.body.CheckedUsers,
      GroupeCreator: { ...decoded },
    };

    const newGroupe = new GroupeModel(Data);

    newGroupe.save().then((data) => {
      GroupeModel.findById({ _id: data._id })
        .populate("GroupeCreator")
        .then((data) => {
          res.json(data);
        });
    });
  },
  Edit: (req, res) => {
    GroupeModel.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      (err, data) => {
        if (err) {
          console.log(err);
        }
        res.json(data);
      }
    );
  },
  Delete: (req, res) => {
    GroupeModel.findByIdAndDelete({ _id: req.params.id }).then((data) => {
      console.log(data);
      res.json(data);
    });
  },
  GetAll: (req, res) => {
    let mytoken = req.cookies.token;
    let decoded = jwt.verify(mytoken, process.env.SECRET_KEY);
    let UserId = decoded._id;
    GroupeModel.find({
      $or: [{ GroupeCreator: UserId }, { Users: UserId }],
    })
      .populate("GroupeCreator Users", "_id UserName")
      .then((data) => res.json(data));
  },
  GetOne: (req, res) => {
    GroupeModel.findOne({ _id: req.body._id })
      .populate("Users", "_id UserName")
      .then((data) => res.json(data));
  },
};
