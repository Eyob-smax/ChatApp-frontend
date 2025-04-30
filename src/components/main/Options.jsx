import React from "react";
import { Trash2, Pencil } from "lucide-react";
export default function Options({
  messageId,
  username,
  deleteMessage,
  editMessage,
}) {
  return (
    <div className=" absolute bg-white rounded-xl list-none px-3 z-10 py-2 top-0">
      <div className="w-[180px]">
        <div
          className="flex py-3 gap-3"
          onTouchEnd={(e) => {
            e.stopPropagation();
            deleteMessage(messageId);
          }}
        >
          <Trash2 /> <span>delete</span>
        </div>
        {username ===
          JSON.parse(sessionStorage.getItem("user_data")).username && (
          <div
            className="flex py-3 gap-3"
            onTouchEnd={() => editMessage(messageId)}
          >
            <Pencil /> <span>edit</span>
          </div>
        )}
        <div></div>
      </div>
    </div>
  );
}
