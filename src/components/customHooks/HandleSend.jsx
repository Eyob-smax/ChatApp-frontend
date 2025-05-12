import { nanoid } from "nanoid";
import socket from "../../service/ioConnection";

export default function useHandleSend(setMessages, newMessage) {
  const messageId = nanoid();
  const messageObj = {
    messageId: messageId,
    message: newMessage,
    isUser: true,
    username: JSON.parse(sessionStorage.getItem("user_data")).username,
    time: new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
  };

  setMessages((prev) => [...prev, messageObj]);
  socket.emit("new-message", { newMessage, messageId });
  return messageObj;
}
