const express = require("express");
const router = express.Router();
const Groupe = require("../Controllers/GroupeController");

//Get All groupes from DB
router.get("/getAll", Groupe.GetAll);

//Get One Groupe By ID from DB
router.post("/GetOne", Groupe.GetOne);

//Create Groupe
router.post("/Create", Groupe.Create);

//EditGroupe
router.put("/Edit/:id", Groupe.Edit);

//Delete Groupe
router.delete("/delete/:id", Groupe.Delete);

module.exports = router;
