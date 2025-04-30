import React from "react";
import { useNavigate } from "react-router-dom";
export default function Login() {
  const navigate = useNavigate();
  function submitAction(formData) {
    console.log(formData)
    const data = {
      username: formData.get("username"),
      password: formData.get("password"),
    };
    if (
      (data.username === "eyoba" || data.username === "kalye") &&
      data.password === "eyukal"
    ) {
      sessionStorage.setItem("logged_in", true);
      sessionStorage.setItem("user_data", JSON.stringify(data));
      navigate("/chat");
    }
  }

  return (
    <div className="h-screen bg-amber-100 flex items-center justify-center flex-col">
      <h1 className="text-[24px] font-bold mb-5">Login</h1>
      <form
        action={submitAction}
        className="items-center justify-center flex-col w-[70%]"
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="username" className="mt-3 font-light">
            Username
          </label>
          <input
            name="username"
            id="username"
            type="text"
            className="bg-white py-2 px-2"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="mt-3 font-light" htmlFor="password">
            Password
          </label>
          <input
            name="password"
            id="password"
            className="bg-white  py-2 px-2"
            type="password"
          />
        </div>

        <div className="mt-8">
          <button
            type="submit"
            className="flex items-center justify-center w-full py-3 bg-amber-500 rounded-4xl text-[20px] font-semibold"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
