import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Reservas from "./pages/Reservas";
import Login from "./pages/Login";
import AdminLayout from "./layout/AdminLayout";
import Citas from "./pages/Citas";
import Sericios from "./pages/Servicios";
import Ajustes from "./pages/Ajustes";

export default function AdminRouter() {
  return (
    <Routes>
      <Route path="/admin" element={<AdminLayout />}>
        <Route path="/admin" element={<Dashboard />} />
        <Route path="citas" element={<Citas />} />
        <Route path="Servicios" element={<Sericios />} />
        <Route path="Ajustes" element={<Ajustes />} />
        <Route path="/admin/reservas" element={<Reservas />} />
        <Route path="/admin/login" element={<Login />} />
      </Route>
    </Routes>
  );
}
