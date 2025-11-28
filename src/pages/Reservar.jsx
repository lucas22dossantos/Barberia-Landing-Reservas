import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";

// Supabase
import { supabase } from "../lib/supabaseClient";

//components
import Steps from "../components/Steps";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Reservar() {
  const location = useLocation();
  const { servicio } = location.state || {}; // recibimos el servicio pasado

  const [servicios, setServicios] = useState([]);
  const [barberos, setBarberos] = useState([]);

  const [form, setForm] = useState({
    servicio: "",
    barbero: "",
    fecha: "",
    hora: "",
    nombre: "",
    telefono: "",
    email: "",
    notas: "",
  });

  const servicioActual = servicios.find((s) => s.id === form.servicio);
  const barberoActual = barberos.find((b) => b.id === form.barbero) || null;

  const navigate = useNavigate();

  // Cargar servicios y barberos al iniciar
  useEffect(() => {
    fetchServicios();
    fetchBarberos();
  }, []);

  // Pre-cargar servicio elegido
  useEffect(() => {
    if (servicio) {
      setForm((prev) => ({
        ...prev,
        servicio: servicio.id, // ponemos el id en el select
      }));
    }
  }, [servicio]);

  const fetchServicios = async () => {
    const { data, error } = await supabase
      .from("servicios")
      .select("*")
      .eq("activo", true);

    if (!error) setServicios(data);
  };

  const fetchBarberos = async () => {
    const { data, error } = await supabase
      .from("barberos")
      .select("*")
      .eq("activo", true);

    if (!error) setBarberos(data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Aquí ya no usamos servicios "quemados"
  const handleSubmit = (e) => {
    e.preventDefault();

    const servicioSeleccionado = servicios.find((s) => s.id === form.servicio);
    const barberoSeleccionado =
      form.barbero === ""
        ? { id: null, nombre: "Cualquiera" }
        : barberos.find((b) => b.id === form.barbero);

    navigate("/confirmar", {
      state: {
        ...form,
        barbero: barberoSeleccionado,
        servicio: servicioSeleccionado,
      },
    });
  };

  return (
    <>
      <Navbar />

      <div className="bg-[#151313] text-white min-h-screen pb-20 pt-10">
        {/* Paso */}
        <div className="max-w-5xl mx-auto mt-4 px-4">
          <Steps currentStep={1} />

          {/* Título */}
          <h1 className="text-3xl md:text-4xl font-bold mt-4">
            Reserva tu próxima cita
          </h1>
          <p className="text-gray-400 mt-2 text-sm md:text-base">
            Elige el servicio, horario y completa tus datos. Te enviaremos la
            confirmación por correo o WhatsApp.
          </p>
        </div>

        {/* Contenido */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          <div className="max-w-5xl mx-auto mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
            {/* FORMULARIO */}
            <form
              className="bg-[#1c1b1a] p-4 md:p-6 rounded-xl md:col-span-2 space-y-4"
              onSubmit={handleSubmit}
            >
              <h2 className="text-lg font-semibold mb-2">
                Detalles de la cita
              </h2>

              {/* Servicio + Barbero */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs mb-1">Servicio</label>
                  <select
                    name="servicio"
                    value={form.servicio}
                    className="w-full p-3 rounded-lg bg-[#262525] text-sm"
                    onChange={handleChange}
                  >
                    <option value="">Selecciona</option>

                    {servicios.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.nombre}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs mb-1">Barbero</label>
                  <select
                    name="barbero"
                    className="w-full p-3 rounded-lg bg-[#262525] text-sm"
                    onChange={handleChange}
                  >
                    <option value="">Cualquiera</option>
                    {barberos.map((b) => (
                      <option key={b.id} value={b.id}>
                        {b.nombre}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Fecha + Hora */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs mb-1">Fecha</label>
                  <input
                    type="date"
                    name="fecha"
                    className="w-full p-3 rounded-lg bg-[#262525] text-sm"
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label className="block text-xs mb-1">Hora</label>
                  <input
                    type="time"
                    name="hora"
                    className="w-full p-3 rounded-lg bg-[#262525] text-sm"
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Nombre + Teléfono */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs mb-1">Nombre</label>
                  <input
                    type="text"
                    name="nombre"
                    className="w-full p-3 rounded-lg bg-[#262525] text-sm"
                    placeholder="Juan Pérez"
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label className="block text-xs mb-1">Teléfono</label>
                  <input
                    type="tel"
                    name="telefono"
                    className="w-full p-3 rounded-lg bg-[#262525] text-sm"
                    placeholder="(555) 123-4567"
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Correo */}
              <div>
                <label className="block text-xs mb-1">Correo</label>
                <input
                  type="email"
                  name="email"
                  className="w-full p-3 rounded-lg bg-[#262525] text-sm"
                  placeholder="juan@example.com"
                  onChange={handleChange}
                />
              </div>

              {/* Notas */}
              <div>
                <label className="block text-xs mb-1">Notas (opcional)</label>
                <textarea
                  name="notas"
                  rows="2"
                  className="w-full p-3 rounded-lg bg-[#262525] text-sm"
                  placeholder="Notas para el barbero..."
                  onChange={handleChange}
                ></textarea>
              </div>

              {/* Botones */}
              <div className="flex gap-3 mt-3">
                <button
                  type="submit"
                  className="bg-[#bfa16a] text-[#2f2b27] px-4 py-2 rounded-lg text-sm font-semibold w-full sm:w-auto"
                >
                  Continuar
                </button>
                <a
                  href="/"
                  className="px-4 py-2 bg-gray-600/30 border border-gray-600 rounded-lg text-sm w-full sm:w-auto text-center"
                >
                  Volver
                </a>
              </div>
            </form>

            {/* RESUMEN */}
            <div className="bg-[#1c1b1a] p-5 rounded-xl h-fit">
              <h2 className="text-xl font-semibold mb-4">Resumen rápido</h2>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between border-b border-gray-600/30 pb-2">
                  <span>Servicio</span>
                  <span className="font-semibold">
                    {servicioActual ? servicioActual.nombre : "—"}
                  </span>
                </div>

                <div className="flex justify-between border-b border-gray-600/30 pb-2">
                  <span>Duración estimada</span>
                  <span className="font-semibold">
                    {servicioActual ? `${servicioActual.duracion} min` : "—"}
                  </span>
                </div>

                <div className="flex justify-between border-b border-gray-600/30 pb-2">
                  <span>Fecha</span>
                  <span className="font-semibold">
                    {form.fecha || "—"} {form.hora ? `· ${form.hora}` : ""}
                  </span>
                </div>

                <div className="flex justify-between border-b border-gray-600/30 pb-2">
                  <span>Barbero</span>
                  <span className="font-semibold">
                    {barberoActual
                      ? barberoActual.nombre
                      : "Cualquiera disponible"}
                  </span>
                </div>

                <div className="flex justify-between font-semibold text-lg pt-2">
                  <span>Precio estimado</span>
                  <span>
                    {servicioActual ? `$${servicioActual.precio}` : "—"}
                  </span>
                </div>

                <div className="mt-4 bg-[#262525] p-3 rounded-lg text-gray-300 text-sm flex items-center gap-2">
                  <span>🔔</span> Cancelación gratuita hasta 3 horas antes
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <Footer />
    </>
  );
}
