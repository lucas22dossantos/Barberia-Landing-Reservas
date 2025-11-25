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

  // animacion
  const pageVariants = {
    initial: { x: "100%", opacity: 0 }, // entra desde la derecha
    in: { x: 0, opacity: 1 }, // posición normal
    out: { x: "-100%", opacity: 0 }, // sale hacia la izquierda
  };

  const pageTransition = {
    type: "tween",
    ease: "easeInOut",
    duration: 0.5,
  };

  // Modal state
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  // Función para manejar la confirmación vía WhatsApp
  const [modalType, setModalType] = React.useState("success"); // success | error

  const handleConfirm = () => {
    if (!data.telefono && !data.email) {
      setModalType("error");
      setIsModalOpen(true);
      return;
    }

    setModalType("success");
    setIsModalOpen(true);

    const telefonoBarberia = "54911000000";
    const mensaje = encodeURIComponent(
      `Hola! Quiero confirmar mi cita.\n\n` +
        `• Nombre: ${data.nombre}\n` +
        `• Servicio: ${data.servicio.nombre}\n` +
        `• Fecha: ${data.fecha}\n` +
        `• Hora: ${data.hora}\n` +
        `• Barbero: ${data.barbero}\n\n` +
        `¿Cómo puedo realizar el pago para asegurar mi turno?`
    );

    window.open(`https://wa.me/${telefonoBarberia}?text=${mensaje}`);
  };

  return (
    <>
      <Navbar />

      <section className="bg-[#151313] text-white min-h-screen pb-20 pt-10">
        {/* PASOS */}
        <div className="max-w-5xl mx-auto mt-10">
          <Steps currentStep={2} />

          {/* TÍTULO */}
          <h1 className="text-3xl font-bold">Confirma tu cita</h1>
          <p className="text-gray-400 mt-1 text-sm">
            Revisa que todo esté correcto antes de confirmar. Podrás modificar o
            cancelar tu reserva más adelante.
          </p>
        </div>

        {/* CONTENIDO */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          <div className="max-w-5xl mx-auto mt-6 grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* COLUMNA 1 */}
            <div className="md:col-span-2 space-y-3">
              {/* AVISO VERDE */}
              <div className="bg-green-800/40 border border-green-700 text-green-300 px-3 py-2 rounded-lg text-xs">
                ✓ Casi listo, solo falta confirmar
              </div>

              {/* RESUMEN */}
              <div className="bg-[#1c1b1a] p-3 rounded-xl">
                <h2 className="text-lg font-semibold mb-2">
                  Resumen de tu visita
                </h2>

                <div className="space-y-1 text-gray-300 text-xs mb-3">
                  <p>
                    • {data.nombre} para un {data.servicio.nombre}.
                  </p>
                  <p>
                    • El {data.fecha} a las {data.hora}.
                  </p>
                  <p>• Barbero: {data.barbero}.</p>
                  <p>
                    • Te avisaremos por WhatsApp y correo cuando la cita quede
                    confirmada.
                  </p>
                </div>

                {/* NOTAS */}
                <div>
                  <h3 className="text-sm font-semibold mb-1">
                    Notas para tu barbero
                  </h3>
                  <div className="bg-[#262525] border border-[#3a3a39] rounded-lg p-2 text-xs text-gray-300">
                    {data.notas || "Sin notas adicionales."}
                  </div>
                </div>

                {/* BOTONES */}
                <div className="flex gap-3 mt-3">
                  <button
                    onClick={handleConfirm}
                    className="bg-[#bfa16a] text-[#2f2b27] px-4 py-2.5 rounded-lg font-semibold hover:bg-[#d8b779] transition text-sm"
                  >
                    Confirmar cita
                  </button>

                  <button
                    onClick={() => navigate("/reservar", { state: data })}
                    className="px-4 py-2.5 bg-gray-600/30 border border-gray-600 rounded-lg hover:bg-[#2a2927] transition text-sm"
                  >
                    Editar detalles
                  </button>
                </div>

                <p className="text-xs text-gray-500 mt-2">
                  Al confirmar aceptas nuestras políticas de puntualidad y
                  cancelación.
                </p>

                <div className="mt-2 flex gap-2 text-xs underline text-gray-400 cursor-pointer">
                  <span onClick={() => navigate("/")}>Volver al inicio</span>
                  <span onClick={() => navigate("/Politicas")}>
                    Ver políticas de cancelación
                  </span>
                </div>
              </div>
            </div>

            {/* COLUMNA 2 — DETALLES */}
            <div className="bg-[#1c1b1a] p-3 rounded-xl h-fit text-xs">
              <h2 className="text-sm font-semibold mb-2">Detalles finales</h2>
              <p className="text-gray-400 text-xs mb-2">
                Esto es lo que verás en tu correo y WhatsApp.
              </p>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between border-b border-gray-600/30 pb-1">
                  <span>Cliente</span>
                  <strong>{data.nombre}</strong>
                </div>

                <div className="flex justify-between border-b border-gray-600/30 pb-1">
                  <span>Servicio</span>
                  <strong>{data.servicio.nombre}</strong>
                </div>

                <div className="flex justify-between border-b border-gray-600/30 pb-1">
                  <span>Barbero</span>
                  <strong>{data.barbero}</strong>
                </div>

                <div className="flex justify-between border-b border-gray-600/30 pb-1">
                  <span>Fecha</span>
                  <strong>
                    {data.fecha} · {data.hora}
                  </strong>
                </div>

                <div className="flex justify-between border-b border-gray-600/30 pb-1">
                  <span>Duración estimada</span>
                  <strong>{data.servicio.duracion}</strong>
                </div>

                <div className="flex justify-between border-b border-gray-600/30 pb-1">
                  <span>Precio</span>
                  <strong>${data.servicio.precio}</strong>
                </div>

                <div className="flex justify-between border-b border-gray-600/30 pb-1">
                  <span>Confirmación por</span>
                  <strong>WhatsApp y correo</strong>
                </div>

                <div className="flex justify-between border-b border-gray-600/30 pb-1">
                  <span>Dirección</span>
                  <strong>Av. Principal 123, Ciudad</strong>
                </div>

                <div className="mt-2 bg-[#262525] p-2 rounded-lg text-gray-300 flex items-center gap-1 text-xs">
                  🔔 Cancelación gratuita hasta 3 horas antes
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        {/* Modal */}
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
