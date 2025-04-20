import React from "react";

export default function MessageBubble({ text, isUser }) {
  return (
    <div
      className={`w-[100%] flex items-center pt-3 ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`message-bubble ${
          isUser ? "bg-[#FD329B] text-white " : "bg-white text-black"
        } rounded-[25px] px-5 py-3 mb-2 w-[70%] `}
      >
        <p>{text}</p>
      </div>
    </div>
  );
}
