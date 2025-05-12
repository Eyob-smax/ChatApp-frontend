import { useEffect } from "react";
import socket from "../../service/ioConnection";

export default function useIncomingMessage(setMessages) {
  useEffect(() => {
    const handleIncomingMessages = ({ messageId, newMessage }) => {
      setMessages((prev) => [
        ...prev,
        {
          messageId: messageId,
          message: newMessage,
          isUser: false,
          edited: false,
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
    };

    socket.on("new-message", handleIncomingMessages);
    return () => {
      socket.off("new-message", handleIncomingMessages);
    };
  }, []);
}
