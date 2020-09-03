const express = require("express");
const router = express.Router();
const UserController = require("../Controllers/UserContorller");

router.get("/get/:id", UserController.get);

router.get("/getAll", UserController.getAll);

router.get("/getLogged", UserController.getLogged);

router.put("/edit/:id", UserController.edit);

module.exports = router;
