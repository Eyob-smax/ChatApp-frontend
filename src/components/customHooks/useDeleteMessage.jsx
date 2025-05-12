import { useEffect } from "react";
import socket from "../../service/ioConnection";

export default function useDeleteMessage(setMessages) {
  useEffect(() => {
    const onDeleteMessage = ({ id }) => {
      setMessages((prev) => prev.filter((item) => item.messageId !== id));
    };

    socket.on("delete-message", onDeleteMessage);

    return () => socket.off("delete-message", onDeleteMessage);
  }, [setMessages]);
}
