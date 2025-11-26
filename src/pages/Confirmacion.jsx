import { motion } from "framer-motion";
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

//components
import Modal from "../components/Modal";
import Steps from "../components/Steps";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function BookingConfirm() {
  const location = useLocation();
  const navigate = useNavigate();

  const data = location.state;

  // Si el usuario entra sin datos, volver al inicio
  useEffect(() => {
    if (!data) navigate("/");
  }, [data, navigate]);

  if (!data) return null;

  // Modal state
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [modalType, setModalType] = React.useState("success");

  // Confirmación WhatsApp
  const handleConfirm = () => {
    if (!data.telefono && !data.email) {
      setModalType("error");
      setIsModalOpen(true);
      return;
    }

    setModalType("success");
    setIsModalOpen(true);

    const telefonoBarberia = "3765371474";
    const mensaje = encodeURIComponent(`
    ¡Hola! Quiero confirmar mi turno.

    🧔‍♂️ *Detalles de la cita*
    • Nombre: ${data.nombre}
    • Teléfono: ${data.telefono || "No proporcionado"}
    • Correo: ${data.email || "No proporcionado"}
    • Servicio: ${data.servicio.nombre}
    • Duración: ${data.servicio.duracion}
    • Precio: $${data.servicio.precio}
    • Barbero: ${data.barbero}
    • Fecha: ${data.fecha}
    • Hora: ${data.hora}

    ¿Puedo recibir instrucciones para realizar el pago y asegurar mi turno?
    `);

    window.open(`https://wa.me/${telefonoBarberia}?text=${mensaje}`);
  };

  return (
    <>
      <Navbar />

      <section className="bg-[#151313] text-white min-h-screen pb-20 pt-10">
        {/* PASOS */}
        <div className="max-w-5xl mx-auto mt-6 px-4">
          <Steps currentStep={2} />

          {/* TÍTULO */}
          <h1 className="text-2xl md:text-3xl font-bold">Confirma tu cita</h1>
          <p className="text-gray-400 mt-1 text-xs md:text-sm leading-tight">
            Revisa que todo esté correcto antes de confirmar.
          </p>
        </div>

        {/* CONTENIDO */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div
            className="
            max-w-5xl mx-auto mt-4 px-4 
            grid grid-cols-1 md:grid-cols-3 
            gap-3
          "
          >
            {/* COLUMNA 1 */}
            <div className="md:col-span-2 space-y-3">
              {/* AVISO */}
              <div className="bg-green-800/40 border border-green-700 text-green-300 px-3 py-2 rounded-lg text-xs">
                ✓ Casi listo, solo falta confirmar
              </div>

              {/* RESUMEN */}
              <div className="bg-[#1c1b1a] p-3 rounded-xl">
                <h2 className="text-base md:text-lg font-semibold mb-2">
                  Resumen de tu visita
                </h2>

                <div className="space-y-1 text-gray-300 text-xs mb-3 leading-tight">
                  <p>
                    • {data.nombre} para un {data.servicio.nombre}.
                  </p>
                  <p>
                    • El {data.fecha} a las {data.hora}.
                  </p>
                  <p>• Barbero: {data.barbero}.</p>
                  <p>• Te avisaremos por WhatsApp y correo.</p>
                </div>

                {/* NOTAS */}
                <div>
                  <h3 className="text-sm font-semibold mb-1">
                    Notas para tu barbero
                  </h3>
                  <div className="bg-[#262525] border border-[#3a3a39] rounded-lg p-2 text-xs text-gray-300 leading-tight">
                    {data.notas || "Sin notas adicionales."}
                  </div>
                </div>

                {/* BOTONES */}
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-3">
                  <button
                    onClick={handleConfirm}
                    className="bg-[#bfa16a] text-[#2f2b27] px-4 py-2.5 rounded-lg font-semibold hover:bg-[#d8b779] transition text-sm w-full sm:w-auto"
                  >
                    Confirmar cita
                  </button>

                  <button
                    onClick={() => navigate("/reservar", { state: data })}
                    className="px-4 py-2.5 bg-gray-600/30 border border-gray-600 rounded-lg hover:bg-[#2a2927] transition text-sm w-full sm:w-auto"
                  >
                    Editar detalles
                  </button>
                </div>

                <p className="text-xs text-gray-500 mt-2">
                  Al confirmar aceptas nuestras políticas.
                </p>

                <div className="mt-2 flex gap-3 text-xs underline text-gray-400 cursor-pointer">
                  <span onClick={() => navigate("/")}>Inicio</span>
                  <span onClick={() => navigate("/Politicas")}>Políticas</span>
                </div>
              </div>
            </div>

            {/* COLUMNA 2 — DETALLES */}
            <div className="bg-[#1c1b1a] p-3 rounded-xl h-fit text-xs space-y-2">
              <h2 className="text-sm font-semibold mb-2">Detalles finales</h2>

              <p className="text-gray-400 text-xs mb-2">
                Esto es lo que verás en tu correo y WhatsApp.
              </p>

              <div className="space-y-2 text-xs">
                {[
                  ["Cliente", data.nombre],
                  ["Servicio", data.servicio.nombre],
                  ["Barbero", data.barbero],
                  ["Fecha", `${data.fecha} · ${data.hora}`],
                  ["Duración", data.servicio.duracion],
                  ["Precio", `$${data.servicio.precio}`],
                  ["Confirmación por", "WhatsApp y correo"],
                  ["Dirección", "Av. Principal 123, Ciudad"],
                ].map(([label, value], i) => (
                  <div
                    key={i}
                    className="flex justify-between border-b border-gray-600/30 pb-1"
                  >
                    <span>{label}</span>
                    <strong>{value}</strong>
                  </div>
                ))}

                <div className="mt-2 bg-[#262525] p-2 rounded-lg text-gray-300 flex items-center gap-1 text-xs">
                  🔔 Cancelación gratuita hasta 3 horas antes
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* MODAL */}
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={modalType === "success" ? "Cita confirmada" : "Error"}
        >
          {modalType === "success" ? (
            <>
              <div className="text-green-500 text-4xl mx-auto w-fit mb-3">
                ✓
              </div>
              <p className="text-center text-sm">
                Tu cita ha sido confirmada exitosamente.
              </p>
            </>
          ) : (
            <p className="text-center text-sm text-red-400">
              Por favor ingresa tu teléfono o correo electrónico.
            </p>
          )}
        </Modal>
      </section>

      <Footer />
    </>
  );
}
