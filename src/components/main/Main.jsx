import React, { useState, useRef } from "react";
import Footer from "./Footer";
import MessageBubble from "./MessageBubble";
import socket from "../../service/ioConnection.js";
import useSendMessage from "../customHooks/useSendMessage.jsx";
import useGetAllMessage from "../customHooks/useGetAllMessage.jsx";
import { deleteMessageById } from "../../service/api.js";
import { editMessage } from "../../service/api.js";
import useIncomingMessage from "../customHooks/useIncomingMessage.jsx";
import useEditMessage from "../customHooks/useEditMessage.jsx";
import useDeleteMessage from "../customHooks/useDeleteMessage.jsx";
import HandleSend from "../customHooks/HandleSend.jsx";

export default function Main() {
  const [messages, setMessages] = useState([]);
  const [messageObjData, setMessageObjData] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const [editedText, setEditedText] = useState("");
  const bubbleRef = useRef(null);
  const messageRef = useRef(null);
  const messageBubbleContainer = useRef(null);
  useSendMessage(messageObjData);
  useGetAllMessage(setMessages);
  useIncomingMessage(setMessages);
  useEditMessage(setMessages);
  useDeleteMessage(setMessages);

  function deleteMessage(id) {
    deleteMessageById(id);
    socket.emit("delete-message", { id });
    setMessages((prev) => prev.filter((item) => item.messageId !== id));
  }

  async function editMessageById(id) {
    bubbleRef.current = messages.find((item) => item.messageId === id);
    setIsEdit(true);
  }

  const handleSendMessage = (newMessage) => {
    const messageObj = HandleSend(setMessages, newMessage);
    setMessageObjData(messageObj);
    setTimeout(() => {
      if (messageBubbleContainer.current) {
        messageBubbleContainer.current.scrollTo({
          top: messageBubbleContainer.current.scrollHeight,
          behavior: "smooth",
        });
      }
    }, 10);
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
        if (result.success === true) {
          socket.emit("edit-message", {
            id: bubbleRef.current.messageId,
            editedText,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
    setEditedText("");
  }
  return (
    <main className="bg-[url('/src/assets/images/chat-app.png')] bg-cover bg-center w-full h-full flex flex-col flex-1 items-end justify-center pt-2">
      <div
        ref={messageBubbleContainer}
        className="w-[94%] h-[73vh] mx-auto overflow-y-auto"
      >
        {messages.map((item, index) => (
          <MessageBubble
            ref={messageRef}
            key={index}
            text={item.message}
            isUser={item.isUser}
            time={item.time}
            edited={item.edited}
            deleteMessage={deleteMessage}
            editMessage={editMessageById}
            username={item.username}
            messageId={item.messageId}
            lastMessage={index === messages.length - 1}
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
