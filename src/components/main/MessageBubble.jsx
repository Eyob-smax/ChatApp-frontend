import React, { useEffect, useRef, useState } from "react";
import Options from "./Options";

export default function MessageBubble({
  text,
  isUser,
  time = Date.now(),
  deleteMessage,
  editMessage,
  messageId,
  username,
}) {
  const [showOption, setShowOption] = useState(false);
  const buttonRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (buttonRef.current && !buttonRef.current.contains(e.target)) {
        setShowOption(false);
      }
    };

    document.addEventListener("touchstart", handleOutsideClick);
    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("touchstart", handleOutsideClick);
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const timerRef = useRef(null);
  function handleStartPressing() {
    timerRef.current = setTimeout(() => {
      setShowOption(true);
    }, 300);
  }

  function handleEndPressing() {
    clearInterval(timerRef.current);
    // setShowOption(false);
  }
  return (
    <div
      ref={buttonRef}
      onTouchStart={(e) => {
        e.stopPropagation();
        handleStartPressing();
      }}
      onTouchEnd={(e) => {
        e.stopPropagation();
        handleEndPressing();
      }}
      className={`w-[100%] relative flex items-center pt-3 ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      {showOption && (
        <Options
          editMessage={editMessage}
          deleteMessage={deleteMessage}
          messageId={messageId}
          username={username}
        />
      )}
      <div
        className={`message-bubble ${
          isUser ? "bg-[#FD329B] text-white " : "bg-white text-black"
        } whitespace-pre-wrap relative rounded-[25px] px-5 py-3 mb-2 w-[70%]  break-words`}
      >
        <p
          className={`absolute top-[100%] text-white  left-[77%]  text-[13px] `}
        >
          {time}
        </p>
        <p>{text}</p>
      </div>
    </div>
  );
}
