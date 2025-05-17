import { io } from "socket.io-client";

const socket = io("https://eyoba.up.railway.app", {
  transports: ["websocket"],
});
export default socket;
