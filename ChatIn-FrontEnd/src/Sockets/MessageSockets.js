import socketIo from "socket.io-client";
const socket = socketIo.connect("http://localhost:5000");

export const SendMessageSocket = (payload) => {
  socket.emit("SendMessage", payload);
  console.log("Message Sent");
};

export const SendGroupeMessage = (payload) => {
  socket.emit("GroupeMessage", payload);
};

export const TypingSocket = (payload) => {
  socket.emit("Typing", payload);
};
