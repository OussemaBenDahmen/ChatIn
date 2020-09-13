import socketIo from "socket.io-client";
const socket = socketIo.connect("http://localhost:5000");

export const UpdateSocket = (payload) => {
  socket.emit("Update", payload);
};
