import React, { useEffect } from "react";
import socket from "../../service/ioConnection.js";

export default function useSendMessage({ message }) {
  useEffect(() => {
    if (message) {
      socket.emit("message", message);
    }
  }, [message]);
}
