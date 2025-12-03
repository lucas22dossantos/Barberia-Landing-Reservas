import { motion } from "framer-motion";

export default function Steps({ currentStep }) {
  return (
    <div
      className="
        relative flex items-center justify-center
        gap-3 sm:gap-6
      "
    >
      {/* Fondo animado */}
      <motion.div
        className="absolute top-0 bottom-0 bg-[#bfa16a] rounded-full z-0"
        layout
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 25,
          mass: 0.5,
        }}
        style={{
          width: "auto",
          height: "100%",
          left: currentStep === 1 ? 0 : "calc(100% + 1rem)",
        }}
      />

      {/* Paso 1 */}
      <span
        className={`
          px-3 py-1 rounded-full text-sm sm:text-base whitespace-nowrap
          relative z-10 transition-all duration-300
          ${currentStep === 1 ? "bg-[#bfa16a] text-[#2f2b27]" : "text-gray-400"}
        `}
      >
        Paso 1 · Detalles
      </span>

      {/* Paso 2 */}
      <span
        className={`
          px-3 py-1 rounded-full text-sm sm:text-base whitespace-nowrap
          relative z-10 transition-all duration-300
          ${currentStep === 2 ? "bg-[#bfa16a] text-[#2f2b27]" : "text-gray-400"}
        `}
      >
        Paso 2 · Confirmación
      </span>
    </div>
  );
}
