import React, { useState } from "react";
import { LuSend } from "react-icons/lu";
// import { MessageContext } from "../context/context";

export default function Footer({ setMessages }) {
  const [m, setM] = useState("");

  function getFormData(e) {
    e.preventDefault();
    setMessages((prev) => [...prev, { message: m, isUser: true }]);
    e.target.reset();
  }

  return (
    <footer className="message-section bg-white w-[94%] mx-auto rounded-[26px] shadow-md mt-4 h-[70px] self-end flex items-center justify-between px-4">
      <form
        onSubmit={getFormData}
        className="bg-white w-[94%]  m-auto self-end flex items-center justify-between"
      >
        <div className="w-[70%] h-[80%] flex items-center justify-between px-4">
          <input
            type="text"
            onChange={(e) => setM(e.target.value)}
            placeholder="Type a message..."
            className="w-full h-full px-4 rounded-[14px]focus:outline-none outline-none text-[20px]"
          />
        </div>
        <button className="w-[69px] h-[51px] rounded-[14px] ring-1 ring-balck flex items-center justify-center bg-white shadow-md">
          <LuSend type="submit" className="text-[#FD329B] text-[26px]" />
        </button>
      </form>
    </footer>
  );
}
