const socket = require("socket.io");
const { get, post } = require("./Controllers/MsgController");
const server = require("./server");
const io = socket(server);

const msgs = [];
io.on("connection", (socket) => {
  io.emit("messages", msgs);

  io.emit("LogIn-Notification", "Someone Joined");

  socket.on("SendMessage", (data) => {
    msgs.push(data);
    // const newMessage = new MsgModel(data);
    // newMessage.save().then(() => console.log("sent"));

    post(data, "res");
    io.emit("messages", msgs);
  });

  socket.on("disconnect", () => {
    io.emit("LogIn-Notification", "someone is out");
  });
});

module.exports = io;
