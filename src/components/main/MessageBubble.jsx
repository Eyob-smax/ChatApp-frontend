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
  edited,
  lastMessage,
}) {
  const [showOption, setShowOption] = useState(false);
  const buttonRef = useRef(null);
  const [showDetails, setShowDetail] = useState(false);
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
      onClick={() => setShowDetail((prev) => !prev)}
      onTouchStart={(e) => {
        e.stopPropagation();
        handleStartPressing();
      }}
      onTouchEnd={(e) => {
        e.stopPropagation();
        handleEndPressing();
      }}
      className={`w-[100%] relative flex flex-col justify-center pt-3 ${
        isUser ? "items-end" : "items-start"
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
        } whitespace-pre-wrap relative rounded-[25px] px-5 py-3 mb-0 w-[70%]  break-words`}
      >
        <p>{text}</p>
      </div>
      {(showDetails || lastMessage) && (
        <p
          className={`text-[13px] px-3 ${
            isUser ? "text-white" : "text-black font-semibold"
          } my-0`}
        >
          <span>
            {time} {edited && "edited"}
          </span>
        </p>
      )}
    </div>
  );
}
