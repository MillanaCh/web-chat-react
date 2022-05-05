import React from "react";
import { Route, Routes } from "react-router-dom";
import { Dashboard } from "../pages/Dashboard";
import Login from "../pages/Login";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard/>} />
      <Route path="/signin" element={<Login />} />
    </Routes>
  );
}
