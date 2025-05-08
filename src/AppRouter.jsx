import React from "react";
import { Route, Routes } from "react-router";
import App from "./App";
import Dashboard from "./pages/Dashboard";

export default function AppRouter() {
  return (
    <Routes>
      <Route index element={<App />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}
