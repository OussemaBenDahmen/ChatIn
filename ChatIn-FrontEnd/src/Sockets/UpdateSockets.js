import socketIo from "socket.io-client";
import { ServerURI } from "../ApiRequests/Config";
const socket = socketIo.connect(ServerURI);

export const UpdateSocket = (payload) => {
  socket.emit("Update", payload);
};
