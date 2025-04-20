import React, { useEffect, useState } from "react";
import "./Main.css";
import Footer from "./Footer";
import MessageBubble from "./MessageBubble";
import socket from "../../service/ioConnection.js";

export default function Main() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const handleIncomingMessage = (data) => {
      setMessages((prev) => [...prev, { message: data, isUser: false }]);
    };

    socket.on("message", handleIncomingMessage);

    return () => {
      socket.off("message", handleIncomingMessage);
    };
  }, []);

  useEffect(() => {
    if (!messages.length) return;
    const last = messages[messages.length - 1];
    if (last?.isUser) socket.emit("message", last.message);
  }, [messages.length]);

  return (
    <main className="main-container bg-[url('/src/assets/images/chat-app.png')] bg-cover bg-center w-full h-full flex-col flex-1 items-end justify-center pt-2">
      <div className="w-[94%] h-[73vh] mx-auto overflow-scroll">
        {messages.map((item, index) => (
          <MessageBubble
            key={`msg-${index}`}
            text={item.message}
            isUser={item.isUser}
          />
        ))}
      </div>
      <Footer setMessages={setMessages} />
    </main>
  );
}
