import React from "react";
import "./index.css";
import Header from "./components/Header";
import Main from "./components/main/Main";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import AuthRequired from "./components/AuthRequired";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<AuthRequired />}>
          <Route
            path="/chat"
            element={
              <div className="app flex flex-col items-center justify-start min-h-screen bg-gray-50">
                <Header />
                <Main />
              </div>
            }
          />
        </Route>
      </Routes>
    </Router>
  );
}
