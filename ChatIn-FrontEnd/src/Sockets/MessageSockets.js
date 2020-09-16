import socketIo from "socket.io-client";
import { ServerURI } from "../ApiRequests/Config";
const socket = socketIo.connect(ServerURI);

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
