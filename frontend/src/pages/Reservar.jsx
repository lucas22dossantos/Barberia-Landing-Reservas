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
  // estado de errores
  const [errors, setErrors] = useState({});

  // función para validar el formulario
  const validarFormulario = () => {
    const nuevosErrores = {};

    // Servicio
    if (!form.servicio) {
      nuevosErrores.servicio = "Debes seleccionar un servicio.";
    }

    // Hora y fecha con horarios del local
    if (!form.hora) {
      nuevosErrores.hora = "Debes elegir un horario.";
    } else if (form.fecha) {
      const fechaSeleccionada = new Date(form.fecha);
      const diaSemana = fechaSeleccionada.getDay(); // 0 = Domingo, 1 = Lunes...

      const [hora, minutos] = form.hora.split(":").map(Number);
      const totalMinutos = hora * 60 + minutos;

      let apertura, cierre;

      // Domingo
      if (diaSemana === 0) {
        apertura = 10 * 60; // 10:00
        cierre = 16 * 60; // 16:00
      }
      // Lunes a Sábado
      else {
        apertura = 9 * 60; // 09:00
        cierre = 19 * 60; // 19:00
      }

      if (totalMinutos < apertura || totalMinutos > cierre) {
        nuevosErrores.hora = `El horario disponible para ese día es de ${
          apertura / 60
        }:00 a ${cierre / 60}:00.`;
      }
    }

    // Nombre (sin números, mínimo 3)
    if (!form.nombre.trim()) {
      nuevosErrores.nombre = "El nombre es obligatorio.";
    } else if (!/^[A-Za-zÁÉÍÓÚÑáéíóúñ\s]+$/.test(form.nombre)) {
      nuevosErrores.nombre = "El nombre solo puede contener letras.";
    } else if (form.nombre.trim().length < 3) {
      nuevosErrores.nombre = "El nombre debe tener al menos 3 caracteres.";
    }

    // Teléfono — SOLO NÚMEROS — exactamente 10 dígitos
    const digitosTelefono = form.telefono.replace(/\D/g, ""); // quita todo lo que no es número

    if (!form.telefono.trim()) {
      nuevosErrores.telefono = "El teléfono es obligatorio.";
    } else if (!/^[0-9]+$/.test(form.telefono)) {
      nuevosErrores.telefono = "Solo se permiten números.";
    } else if (digitosTelefono.length !== 10) {
      nuevosErrores.telefono = "El teléfono debe tener exactamente 10 números.";
    }

    // Email
    if (!form.email.trim()) {
      nuevosErrores.email = "El correo es obligatorio.";
    } else if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/.test(form.email)
    ) {
      nuevosErrores.email = "Correo inválido.";
    }

    setErrors(nuevosErrores);

    return Object.keys(nuevosErrores).length === 0;
  };

  const location = useLocation();
  const dataEdit = location.state || null;

  const [servicios, setServicios] = useState([]);
  const [barberos, setBarberos] = useState([]);

  const [form, setForm] = useState({
    servicio: dataEdit?.servicio?.id || "",
    barbero: dataEdit?.barbero?.id || "",
    fecha: dataEdit?.fecha || "",
    hora: dataEdit?.hora || "",
    nombre: dataEdit?.nombre || "",
    telefono: dataEdit?.telefono || "",
    email: dataEdit?.email || "",
    notas: dataEdit?.notas || "",
  });

  const servicioActual = servicios.find((s) => s.id === form.servicio);
  const barberoActual = barberos.find((b) => b.id === form.barbero) || null;

  const navigate = useNavigate();

  // Cargar servicios y barberos al iniciar
  useEffect(() => {
    fetchServicios();
    fetchBarberos();
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

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

  const [isChecking, setIsChecking] = useState(false);

  // Aquí ya no usamos servicios "quemados"
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validarFormulario()) {
      return;
    }

    setIsChecking(true);
    setErrors({});

    try {
      const barberoId = form.barbero === "" ? null : form.barbero;

      // Verificar disponibilidad en Supabase
      let query = supabase
        .from("reservas")
        .select("id")
        .eq("fecha", form.fecha)
        .eq("hora", form.hora)
        .neq("estado", "cancelada"); // Excluir canceladas

      // Si seleccionó un barbero específico, chequear solo para ese
      if (barberoId) {
        query = query.eq("barbero_id", barberoId);
      }

      const { data: existingReservations, error: checkError } = await query;

      if (checkError) throw checkError;

      // Si hay reservas existentes para ese slot
      // (Si barberoId es null, significa que estamos viendo si ALGUIEN está ocupado. 
      // Por simplicidad en este MVP, si no elige barbero, permitimos si hay al menos un barbero total libre.
      // Pero como no sabemos cuántos barberos hay activos fácilmente sin otro fetch, 
      // asumiremos que si barberoId es NULL, chequeamos si hay alguien con barbero_id NULL o si todos están ocupados.
      // Regla de negocio: Si elige barbero, se valida ese. Si no elige, se valida que no haya una reserva 'genérica' o que el slot no esté saturado.)
      
      if (existingReservations && existingReservations.length > 0) {
        // Si seleccionó barbero y ya tiene cita
        if (barberoId) {
          setErrors({ hora: "Este barbero ya tiene una cita a esta hora." });
          setIsChecking(false);
          return;
        } 
        // Si no seleccionó barbero but hay una reserva sin barbero asignado o saturación (lógica simple)
        else {
          // Si hay reservas pero no se especificó barbero, podríamos ser más permisivos 
          // pero para evitar conflictos, diremos que el horario está ocupado si hay reservas "sin barbero"
          const hasGenericReserva = existingReservations.some(r => r.barbero_id === null);
          if (hasGenericReserva) {
            setErrors({ hora: "Este horario ya no está disponible." });
            setIsChecking(false);
            return;
          }
        }
      }

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
    } catch (err) {
      console.error("Error checking availability:", err);
      setErrors({ general: "Error al verificar disponibilidad. Intenta de nuevo." });
    } finally {
      setIsChecking(false);
    }
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
                    className="w-full p-3 rounded-lg bg-[#262525] text-sm"
                    value={form.servicio}
                    onChange={handleChange}
                  >
                    <option value="">Selecciona</option>

                    {servicios.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.nombre}
                      </option>
                    ))}
                  </select>
                  {/* Mostrar error si existe */}
                  {errors.servicio && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.servicio}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs mb-1">Barbero</label>
                  <select
                    name="barbero"
                    className="w-full p-3 rounded-lg bg-[#262525] text-sm"
                    value={form.barbero}
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
                    value={form.fecha}
                    onChange={handleChange}
                  />
                  {/* Mostrar error si existe */}
                  {errors.fecha && (
                    <p className="text-red-500 text-xs mt-1">{errors.fecha}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs mb-1">Hora</label>
                  <input
                    type="time"
                    name="hora"
                    className="w-full p-3 rounded-lg bg-[#262525] text-sm"
                    value={form.hora}
                    onChange={handleChange}
                  />
                  {/* Mostrar error si existe */}
                  {errors.hora && (
                    <p className="text-red-500 text-xs mt-1">{errors.hora}</p>
                  )}
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
                    value={form.nombre}
                    onChange={handleChange}
                  />
                  {/* Mostrar error si existe */}
                  {errors.nombre && (
                    <p className="text-red-500 text-xs mt-1">{errors.nombre}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs mb-1">Teléfono</label>
                  <input
                    type="tel"
                    name="telefono"
                    className="w-full p-3 rounded-lg bg-[#262525] text-sm"
                    placeholder="(555) 123-4567"
                    value={form.telefono}
                    onChange={handleChange}
                  />
                  {/* Mostrar error si existe */}
                  {errors.telefono && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.telefono}
                    </p>
                  )}
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
                  value={form.email}
                  onChange={handleChange}
                />
                {/* Mostrar error si existe */}
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                )}
              </div>

              {/* Notas */}
              <div>
                <label className="block text-xs mb-1">Notas (opcional)</label>
                <textarea
                  name="notas"
                  rows="2"
                  className="w-full p-3 rounded-lg bg-[#262525] text-sm"
                  placeholder="Notas para el barbero..."
                  value={form.notas}
                  onChange={handleChange}
                ></textarea>
              </div>

              {/* Botones */}
              <div className="flex gap-3 mt-3">
                <button
                  type="submit"
                  disabled={isChecking}
                  className={`bg-[#bfa16a] text-[#2f2b27] px-4 py-2 rounded-lg text-sm font-semibold w-full sm:w-auto
             hover:bg-[#a78c5c] hover:scale-105 transition-all duration-200 cursor-pointer ${
               isChecking ? "opacity-50 cursor-not-allowed" : ""
             }`}
                >
                  {isChecking ? "Verificando..." : "Continuar"}
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
