import React, { useEffect, useState, useRef } from "react";
import Footer from "./Footer";
import MessageBubble from "./MessageBubble";
import socket from "../../service/ioConnection.js";

export default function Main() {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [remoteTyping, setRemoteTyping] = useState(false);
  const typingTimeoutRef = useRef(null);

  useEffect(() => {
    const handleIncomingMessage = (data) => {
      setMessages((prev) => [...prev, { message: data, isUser: false }]);
    };
    const handleRemoteTyping = () => {
      setRemoteTyping(true);
      clearTimeout(typingTimeoutRef.current);
      typingTimeoutRef.current = setTimeout(() => {
        setRemoteTyping(false);
      }, 3000);
    };
    const handleRemoteStopTyping = () => {
      setRemoteTyping(false);
    };

    socket.on("message", handleIncomingMessage);
    socket.on("typing", handleRemoteTyping);
    socket.on("stopTyping", handleRemoteStopTyping);

    return () => {
      socket.off("message", handleIncomingMessage);
      socket.off("typing", handleRemoteTyping);
      socket.off("stopTyping", handleRemoteStopTyping);
      clearTimeout(typingTimeoutRef.current);
    };
  }, []);

  function handleTyping() {
    if (!isTyping) {
      setIsTyping(true);
      socket.emit("typing");
    }

    clearTimeout(typingTimeoutRef.current);
    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(false);
      socket.emit("stopTyping");
    }, 3000);
  }

  useEffect(() => {
    if (!messages.length) return;
    const last = messages[messages.length - 1];
    if (last?.isUser) {
      socket.emit("message", last.message);
      // When message is sent, stop typing indicator
      setIsTyping(false);
      socket.emit("stopTyping");
    }
  }, [messages.length]);

  return (
    <main className="bg-[url('/src/assets/images/chat-app.png')] bg-cover bg-center w-full h-full flex flex-col flex-1 items-end justify-center pt-2">
      <div className="w-[94%] h-[73vh] mx-auto overflow-y-auto">
        {messages.map((item, index) => (
          <MessageBubble key={index} text={item.message} isUser={item.isUser} />
        ))}
        {remoteTyping && (
          <div className="bg-gray-200 py-2 px-3 rounded-full inline-block my-1 mx-2 text-sm text-gray-600">
            <span>Other user is typing...</span>
          </div>
        )}
      </div>
      <Footer setMessages={setMessages} handleTyping={handleTyping} />
    </main>
  );
}
