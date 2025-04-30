import React, { useState, useEffect } from "react";
import Footer from "./Footer";
import MessageBubble from "./MessageBubble";
import socket from "../../service/ioConnection.js";
import useSendMessage from "../customHooks/useSendMessage.jsx";
import { getPreviousMessages } from "../../service/api.js";
import { deleteMessageById } from "../../service/api.js";
import { nanoid } from "nanoid";

export default function Main() {
  const [messages, setMessages] = useState([]);
  const [messageObjData, setMessageObjData] = useState({});
  useSendMessage(messageObjData);

  async function deleteMessage(id) {
    const result = await deleteMessageById(id);
    if (!result.success) {
      alert("something went wrong with deleteing an error");
      console.log(result);
    }
    setMessages((prev) => prev.filter((item) => item.id !== id));
  }

  async function editMessage(id) {
    console.log(id);
  }

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
    const handleIncomingMessages = ({ messageId, newMessage }) => {
      setMessages((prev) => [
        ...prev,
        {
          messageId,
          message: newMessage,
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
    const messageId = nanoid();
    const messageObj = {
      messageId,
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
            messaId={item?._id || `${item.time}-${item.message}-${item.isUser}`}
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
