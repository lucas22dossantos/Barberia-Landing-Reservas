import { motion } from "framer-motion";

export default function Steps({ currentStep }) {
  return (
    <div className="relative flex gap-6 mb-8">
      {/* Fondo animado */}
      <motion.div
        className="absolute top-0 bottom-0 bg-[#bfa16a] rounded-full z-0"
        layout
        transition={{
          type: "spring",
          stiffness: 100, // menos rigidez, más suave
          damping: 25, // más amortiguación, más suave
          mass: 0.5, // hace que se mueva más lentamente
        }}
        style={{
          width: "auto",
          height: "100%",
          left: currentStep === 1 ? 0 : "calc(100% + 1.5rem)",
        }}
      />

      {/* Paso 1 */}
      <span
        className={`px-3 py-1 rounded-full text-sm transition-all duration-300 ${
          currentStep === 1 ? "bg-[#bfa16a] text-[#2f2b27]" : "text-gray-400"
        }`}
      >
        Paso 1 · Detalles de la cita
      </span>

      {/* Paso 2 */}
      <span
        className={`px-3 py-1 rounded-full text-sm transition-all duration-300 ${
          currentStep === 2 ? "bg-[#bfa16a] text-[#2f2b27]" : "text-gray-400"
        }`}
      >
        Paso 2 · Confirmación
      </span>
    </div>
  );
}
