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
      req.body,
      (err, data) => {
        res.json(data);
      }
    );
  },
  getLogged: (req, res) => {
    let mytoken = req.cookies.token;

    let decoded = jwt.verify(mytoken, process.env.SECRET_KEY);

    UserModel.findOne({ _id: decoded._id }, (err, data) => {
      if (err) {
        res.status(401).send("err");
      }
      res.send(data);
    });
  },
};
