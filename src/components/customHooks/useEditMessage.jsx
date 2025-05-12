import socket from "../../service/ioConnection";
import { useEffect } from "react";

export default function useEditMessage(setMessages) {
  useEffect(() => {
    const onEditMessage = ({ id, editedText }) => {
      setMessages((prev) => {
        return prev.map((item) =>
          item.messageId === id
            ? { ...item, message: editedText, edited: true }
            : item
        );
      });
    };
    socket.on("edit-message", onEditMessage);
    return () => socket.off("edit-message", onEditMessage);
  }, []);
}
