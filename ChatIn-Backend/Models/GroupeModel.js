const mongoose = require("mongoose");
const ObjectId = require("mongoose").Schema.Types.ObjectId;

const GroupeSchema = new mongoose.Schema({
  GroupeName: String,
  Users: [
    (UserId = {
      type: ObjectId,
      ref: "Users",
    }),
  ],
  GroupeCreator: {
    type: ObjectId,
    ref: "Users",
  },
});

const GroupeModel = mongoose.model("Groupes", GroupeSchema);

module.exports = GroupeModel;
