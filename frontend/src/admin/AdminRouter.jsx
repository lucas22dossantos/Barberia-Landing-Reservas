import { Routes, Route } from "react-router-dom";
import AdminLayout from "./layout/AdminLayout";
import Dashboard from "./pages/Dashboard";
import Reservas from "./pages/Reservas";
import Citas from "./pages/Citas";
import Sericios from "./pages/Servicios";
import Ajustes from "./pages/Ajustes";

import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

export default function AdminRouter() {
  return (
    <Routes>
      {/* login */}
      <Route path="/admin/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      {/* panel de admin */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route path="/admin" element={<Dashboard />} />
        <Route path="citas" element={<Citas />} />
        <Route path="Servicios" element={<Sericios />} />
        <Route path="Ajustes" element={<Ajustes />} />
        <Route path="/admin/reservas" element={<Reservas />} />
      </Route>
    </Routes>
  );
}
