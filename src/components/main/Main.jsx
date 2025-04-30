import React, { useState, useEffect, useRef } from "react";
import Footer from "./Footer";
import MessageBubble from "./MessageBubble";
import socket from "../../service/ioConnection.js";
import useSendMessage from "../customHooks/useSendMessage.jsx";
import { getPreviousMessages } from "../../service/api.js";
import { deleteMessageById } from "../../service/api.js";
import { nanoid } from "nanoid";
import { editMessage } from "../../service/api.js";

export default function Main() {
  const [messages, setMessages] = useState([]);
  const [messageObjData, setMessageObjData] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const [editedText, setEditedText] = useState("");
  const messageRef = useRef(null);
  useSendMessage(messageObjData);

  function deleteMessage(id) {
    deleteMessageById(id)
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });

    setMessages((prev) => prev.filter((item) => item.messageId !== id));
  }

  const bubbleRef = useRef(null);

  async function editMessageById(id) {
    console.log("asdjkhflaksjdhfsdjk", id);
    bubbleRef.current = messages.find((item) => item.messageId === id);
    console.log(bubbleRef.current);
    setIsEdit(true);
  }

  useEffect(() => {
    (async () => {
      const result = await getPreviousMessages();
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
          messageId: messageId,
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
    setMessageObjData(messageObj);
  };

  function editSendHandler() {
    setMessages((prev) =>
      prev.map((item) => {
        if (item.messageId === bubbleRef.current.messageId) {
          return {
            ...item,
            message: editedText,
            edited: true,
          };
        }
        return item;
      })
    );
    setIsEdit(false);
    editMessage(bubbleRef.current.messageId, editedText)
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
    setEditedText("");
  }

  return (
    <main className="bg-[url('/src/assets/images/chat-app.png')] bg-cover bg-center w-full h-full flex flex-col flex-1 items-end justify-center pt-2">
      <div className="w-[94%] h-[73vh] mx-auto overflow-y-auto">
        {messages.map((item, index) => (
          <MessageBubble
            ref={messageRef}
            key={index}
            text={item.message}
            isUser={item.isUser}
            time={item.time}
            deleteMessage={deleteMessage}
            editMessage={editMessageById}
            username={item.username}
            messageId={item.messageId}
          />
        ))}
      </div>
      {isEdit && (
        <div className="h-[90px] w-[80%] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-[6px] bg-white z-100 flex items-center justify-between px-4">
          <input
            type="text"
            onChange={(e) => setEditedText(e.target.value)}
            defaultValue={bubbleRef.current?.message}
            className="rounded-[8px] shadow-2xl shadow-slate-950/5 ring-[#f9f9f9] w-[90%] py-3 px-4 mx-2 text-[20px]"
          />

          <button
            onClick={editSendHandler}
            className="bg-[#FD329B] text-white rounded-[6px] px-4 py-2"
          >
            Edit
          </button>
        </div>
      )}
      <Footer
        setMessages={setMessages}
        handleTyping={() => {}}
        handleSend={handleSendMessage}
      />
    </main>
  );
}
