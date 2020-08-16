const express = require("express");
const db = require("../Config");
const UserModel = require("../Models/UsersModel");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.post("/Login", (req, res) => {
  console.log(req.body);
  UserModel.find({ name: req.body.name, password: req.body.password }).then(
    (data) => {
      if (data.length === 0) {
        res.status(500);
      } else {
        const token = jwt.sign({ ...data[0] }, process.env.SECRET_KEY);
        console.log(token);
        res.cookie("token", token, { httpOnly: "true" });
        const mydata = { name: data[0].name, password: data[0].password };
        res.json(mydata);
      }
    }
  );
});

router.post("/add", (req, res) => {
  let newUser = new UserModel(req.body);
  newUser.save();
  console.log("object", newUser);
});

module.exports = router;
