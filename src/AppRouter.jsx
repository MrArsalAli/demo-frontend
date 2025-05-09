import React from "react";
import { Route, Routes } from "react-router";
import App from "./App";
import { ThemeProvider } from "./components/theme-provider.jsx";
import Layout from "./components/layout.jsx";
import Appointments from "./pages/appointments.jsx";
import Patients from "./pages/patients.jsx";
import Staff from "./pages/staff.jsx";
import Inventory from "./pages/inventory.jsx";
import Billing from "./pages/billing.jsx";
import Settings from "./pages/settings.jsx";
import Dashboard from "./pages/Dashboard.jsx";

export default function AppRouter() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="hospital-theme">
      <Layout>
        <Routes>
          <Route index element={<App />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/patients" element={<Patients />} />
          <Route path="/staff" element={<Staff />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/billing" element={<Billing />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Layout>
    </ThemeProvider>
  );
}
