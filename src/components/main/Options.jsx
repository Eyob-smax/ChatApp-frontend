import React from "react";
import { Trash2, Pencil } from "lucide-react";
export default function Options() {
  return (
    <div className=" absolute bg-white rounded-xl list-none px-3 z-10 py-2 top-0">
      <div className="w-[180px]">
        <div className="flex py-3 gap-3">
          <Trash2 /> <span>delete</span>
        </div>
        <div className="flex py-3 gap-3">
          <Pencil /> <span>edit</span>
        </div>
        <div></div>
      </div>
    </div>
  );
}
