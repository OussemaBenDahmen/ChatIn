const UserModel = require("../Models/UsersModel");
const jwt = require("jsonwebtoken");

module.exports = {
  get: (req, res) => {
    UserModel.findOne({ _id: req.params.id }, (err, data) => res.json(data));
  },
  getAll: (req, res) => {
    UserModel.find({}, (err, data) => res.json(data));
  },
  edit: (req, res) => {
    UserModel.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      (err, data) => {
        res.json(data);
      }
    );
  },
  getLogged: (req, res) => {
    let mytoken = req.cookies.token;
    console.log(mytoken);
    let decoded = jwt.verify(mytoken, process.env.SECRET_KEY);

    UserModel.findById({ _id: decoded._id }).then((data) => {
      res.send(data);
      console.log(data);
    });
  },
};
