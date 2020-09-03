const express = require("express");

const UserModel = require("../Models/UsersModel");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.post("/Login", (req, res) => {
  UserModel.find({
    UserName: req.body.UserName,
    Password: req.body.Password,
  }).then((data) => {
    if (data.length === 0) {
      res.status(500).json({ message: "Not Found" });
      console.log("notfound");
    }
    const mydata = { ...data[0]._doc };
    console.log(mydata);
    const token = jwt.sign(mydata, process.env.SECRET_KEY);
    res.cookie("token", token, { httpOnly: "true" });
    res.status(200).json(mydata);
  });
});

router.post("/Logout", (req, res) => {
  console.log(req.body);
  res.cookie("token", "", { maxAge: -0 });
  res.status(200).json({ message: "goodbye" });
});

router.post("/SignUp", (req, res) => {
  console.log(res.body);
  let newUser = new UserModel(req.body);
  newUser.role = "User";
  console.log("object", newUser);
  const token = jwt.sign({ ...newUser }, process.env.SECRET_KEY);
  res.cookie("token", token, { httpOnly: "true" });
  res.send(newUser);
  newUser.save();
});

module.exports = router;
