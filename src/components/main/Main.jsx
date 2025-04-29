import React, { useState, useEffect } from "react";
import Footer from "./Footer";
import MessageBubble from "./MessageBubble";
import socket from "../../service/ioConnection.js";
import useSendMessage from "../customHooks/useSendMessage.jsx";
import { getPreviousMessages } from "../../service/api.js";

export default function Main() {
  const [messages, setMessages] = useState([]);
  const [messageObjData, setMessageObjData] = useState({});
  useSendMessage(messageObjData);

  function deleteMessage(id) {}

  function editMessage(id) {}

  useEffect(() => {
    (async () => {
      const result = await getPreviousMessages();
      console.log("this is the result", result);
      const mapped = result.map((item) => ({
        ...item,
        isUser:
          item.username ===
          JSON.parse(sessionStorage.getItem("user_data")).username,
      }));
      setMessages(mapped);
    })();
  }, []);

  useEffect(() => {
    const handleIncomingMessages = (data) => {
      setMessages((prev) => [
        ...prev,
        {
          message: data,
          username: JSON.parse(sessionStorage.getItem("user_data")).username,
          isUser: false,
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

  const handleSendMessage = (newMessage) => {
    const messageObj = {
      message: newMessage,
      isUser: true,
      username: JSON.parse(sessionStorage.getItem("user_data")).username,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, messageObj]);
    socket.emit("new-message", newMessage);
    setMessageObjData(messageObj);
  };

  return (
    <main className="bg-[url('/src/assets/images/chat-app.png')] bg-cover bg-center w-full h-full flex flex-col flex-1 items-end justify-center pt-2">
      <div className="w-[94%] h-[73vh] mx-auto overflow-y-auto">
        {messages.map((item, index) => (
          <MessageBubble
            key={index}
            text={item.message}
            isUser={item.isUser}
            time={item.time}
            deleteMessage={deleteMessage}
            editMessage={editMessage}
            // messaId={}
          />
        ))}
      </div>
      <Footer
        setMessages={setMessages}
        handleTyping={() => {}}
        handleSend={handleSendMessage}
      />
    </main>
  );
}
