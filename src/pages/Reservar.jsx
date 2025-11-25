import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
//components
import Steps from "../components/Steps";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Reservar() {
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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    navigate("/confirmar", {
      state: {
        ...form,
        precio: 45,
        duracion: "45 minutos",
      },
    });
  };

  // animacion
  const pageVariants = {
    initial: { x: "100%", opacity: 0 }, // entra desde la derecha
    in: { x: 0, opacity: 1 }, // posición normal
    out: { x: "-100%", opacity: 0 }, // sale hacia la izquierda
  };

  const pageTransition = {
    type: "tween",
    ease: "easeInOut",
    duration: 1,
  };

  return (
    <>
      <Navbar />

      <div className="bg-[#151313] text-white min-h-screen pb-20 pt-10">
        {/* Paso */}
        <div className="max-w-5xl mx-auto mt-10">
          <Steps currentStep={1} />

          {/* Título */}
          <h1 className="text-4xl font-bold">Reserva tu próxima cita</h1>
          <p className="text-gray-400 mt-2">
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
          <div className="max-w-5xl mx-auto mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* FORMULARIO */}

            <form
              className="bg-[#1c1b1a] p-3 rounded-xl md:col-span-2 space-y-3"
              onSubmit={handleSubmit}
            >
              <h2 className="text-base font-semibold mb-1">
                Detalles de la cita
              </h2>

              {/* Servicio + Barbero */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs mb-1">Servicio</label>
                  <select
                    name="servicio"
                    className="w-full p-2 rounded-lg bg-[#262525] text-sm"
                    onChange={handleChange}
                  >
                    <option value="">Selecciona</option>
                    <option>Corte Signature</option>
                    <option>Corte Clásico</option>
                    <option>Afeitado Completo</option>
                    <option>Barba + Corte</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs mb-1">Barbero</label>
                  <select
                    name="barbero"
                    className="w-full p-2 rounded-lg bg-[#262525] text-sm"
                    onChange={handleChange}
                  >
                    <option>Cualquiera</option>
                    <option>Barbero 1</option>
                    <option>Barbero 2</option>
                  </select>
                </div>
              </div>

              {/* Fecha + Hora */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs mb-1">Fecha</label>
                  <input
                    type="date"
                    name="fecha"
                    className="w-full p-2 rounded-lg bg-[#262525] text-sm"
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label className="block text-xs mb-1">Hora</label>
                  <input
                    type="time"
                    name="hora"
                    className="w-full p-2 rounded-lg bg-[#262525] text-sm"
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Nombre + Teléfono */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs mb-1">Nombre</label>
                  <input
                    type="text"
                    name="nombre"
                    className="w-full p-2 rounded-lg bg-[#262525] text-sm"
                    placeholder="Juan Pérez"
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label className="block text-xs mb-1">Teléfono</label>
                  <input
                    type="tel"
                    name="telefono"
                    className="w-full p-2 rounded-lg bg-[#262525] text-sm"
                    placeholder="(555) 123-4567"
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs mb-1">Correo</label>
                <input
                  type="email"
                  name="email"
                  className="w-full p-2 rounded-lg bg-[#262525] text-sm"
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
                  className="w-full p-2 rounded-lg bg-[#262525] text-sm"
                  placeholder="Notas para el barbero..."
                  onChange={handleChange}
                ></textarea>
              </div>

              {/* Botones */}
              <div className="flex gap-3 mt-1">
                <button
                  type="submit"
                  className="bg-[#bfa16a] text-[#2f2b27] px-4 py-2 rounded-lg text-sm font-semibold"
                >
                  Continuar
                </button>
                <a
                  href="/"
                  className="px-4 py-2 bg-gray-600/30 border border-gray-600 rounded-lg text-sm"
                >
                  Volver
                </a>
              </div>
            </form>

            {/* RESUMEN */}
            <div className="bg-[#1c1b1a] p-6 rounded-xl h-fit">
              <h2 className="text-xl font-semibold mb-4">Resumen rápido</h2>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between border-b border-gray-600/30 pb-2">
                  <span>Servicio</span>
                  <span className="font-semibold">{form.servicio || "—"}</span>
                </div>

                <div className="flex justify-between border-b border-gray-600/30 pb-2">
                  <span>Duración estimada</span>
                  <span className="font-semibold">45 minutos</span>
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
                    {form.barbero || "Cualquiera disponible"}
                  </span>
                </div>

                <div className="flex justify-between font-semibold text-lg pt-2">
                  <span>Precio estimado</span>
                  <span>$45</span>
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
