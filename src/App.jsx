import React from "react";
import "./index.css";
import Header from "./components/Header";
import Main from "./components/main/Main";

export default function App() {
  return (
    <div className="app flex flex-col items-center justify-start min-h-screen bg-gray-50">
      <Header />
      <Main />
    </div>
  );
}
