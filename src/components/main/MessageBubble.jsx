import React from "react";

export default function MessageBubble({ text, isUser, time = "01:20 PM" }) {
  return (
    <div
      className={`w-[100%] flex items-center pt-3 ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`message-bubble ${
          isUser ? "bg-[#FD329B] text-white " : "bg-white text-black"
        } relative rounded-[25px] px-5 py-3 mb-2 w-[70%] `}
      >
        <p
          className={`absolute top-[59%] text-balck left-[77%] font-extralight text-[12px] `}
        >
          {time}
        </p>
        <p>{text}</p>
      </div>
    </div>
  );
}
