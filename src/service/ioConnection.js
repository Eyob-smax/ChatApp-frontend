import { io } from "socket.io-client";

const socket = io("https://chat-app-frontend-vert-seven.vercel.app", {
  transports: ["websocket"],
});
export default socket;
