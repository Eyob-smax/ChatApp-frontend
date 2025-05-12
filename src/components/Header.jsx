import { Trash2 } from "lucide-react";
import { deleteAllMessages } from "../service/api";

export default function Header() {
  return (
    <header className="header flex items-center justify-between px-8 font-semibold text-[25px] w-full shadow-md bg-white-50 h-[81px]">
      <h1 className="font-kanit">Eyu-Kal</h1>
      <button
        onClick={() => {
          deleteAllMessages(
            JSON.parse(sessionStorage.getItem("user_data")).username
          );
          window.location.reload();
        }}
        className="p-4 rounded-full ring-1 ring-slate-300 shadow-2xl shadow-slate-900/5"
      >
        <Trash2 />
      </button>
    </header>
  );
}
