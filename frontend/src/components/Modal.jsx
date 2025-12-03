import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  autoClose = 2500,
}) {
  // 🔔 Cierre automático (si se desea)
  useEffect(() => {
    if (!isOpen || !autoClose) return;
    const timer = setTimeout(onClose, autoClose);
    return () => clearTimeout(timer);
  }, [isOpen, autoClose, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Fondo oscuro */}
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Contenedor del modal */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 18 }}
          >
            <div className="bg-[#1c1b1a] rounded-xl shadow-xl max-w-md w-full p-6 relative border border-white/10">
              {/* Botón cerrar */}
              <button
                className="absolute top-3 right-3 text-gray-400 hover:text-white transition"
                onClick={onClose}
              >
                ✕
              </button>

              {/* Título */}
              {title && (
                <motion.h2
                  className="text-lg font-semibold mb-4"
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {title}
                </motion.h2>
              )}

              {/* Contenido dinámico */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                {children}
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
