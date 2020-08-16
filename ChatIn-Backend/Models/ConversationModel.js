const mongoose = require("mongoose");

const ConversationSchema = new mongoose.Schema({
  Conversation_name: String,
  UsersId: Object,
});

const ConversationModel = mongoose.model("Conversations", ConversationSchema);

module.exports = ConversationModel;
