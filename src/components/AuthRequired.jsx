import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export default function AuthRequired() {
  const auth = localStorage.getItem("logged_in") === "true";
  console.log(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth) {
      navigate("/", { state: "You have to login first" });
    }
  }, [auth, navigate]);

  return auth ? <Outlet /> : <Login />;
}
