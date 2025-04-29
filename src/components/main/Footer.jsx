import React, { useState } from "react";
import { FaPaperPlane } from "react-icons/fa";

export default function Footer({ handleSend }) {
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      handleSend(message);
      setMessage("");
    }
  };

  return (
    <footer className="message-section bg-white w-[94%] mx-auto rounded-[26px] shadow-md mt-4 h-[70px] self-end flex items-center justify-between px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-[94%] m-auto self-end flex items-center justify-between"
      >
        <div className="w-[70%] h-[80%] flex items-center justify-between px-4">
          <input
            type="text"
            name="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSubmit(e);
              } else {
                // Optional: Handle typing indicator here if needed
              }
            }}
            placeholder="Type a message..."
            className="w-full h-full px-4 rounded-[14px] focus:outline-none outline-none text-[20px]"
          />
        </div>
        <button
          type="submit"
          className="w-[69px] h-[51px] rounded-[14px] ring-1 ring-black flex items-center justify-center bg-white shadow-md"
        >
          <FaPaperPlane className="text-[#FD329B] text-[26px]" />
        </button>
      </form>
    </footer>
  );
}
