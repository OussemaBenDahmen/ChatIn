const mongoose = require("mongoose");

const GroupeSchema = new mongoose.Schema({
  Groupe_name: String,
  UsersId: Object,
});

const GroupeModel = mongoose.model("Groupes", GroupeSchema);

module.exports = GroupeModel;
