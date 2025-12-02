import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function ResetPassword() {
  const navigate = useNavigate();
  const [params] = useSearchParams();

  // Token enviado por email
  const token = params.get("token");

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validaciones básicas
    if (password.length < 8) {
      setError("La contraseña debe tener al menos 8 caracteres.");
      return;
    }

    if (password !== confirm) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    // Validación ficticia del token (simulación)
    if (!token || token === "expired") {
      setError("expired");
      return;
    }

    // Éxito (simulado, en backend se cambiaría la contraseña)
    setSuccess("Contraseña cambiada correctamente. Redirigiendo...");
    setTimeout(() => navigate("/admin/login"), 2000);
  };

  return (
    <div className="min-h-screen bg-black flex justify-center items-center p-6">
      <div className="w-[420px] bg-[#111111] p-10 rounded-xl border border-white/10 shadow-2xl">
        {/* Título */}
        <h2 className="text-white font-semibold text-lg mb-1">
          BlackGold Barbería • Panel
        </h2>

        <h1 className="text-2xl font-bold text-white mt-4 mb-2">
          Crear nueva contraseña
        </h1>

        <p className="text-gray-400 text-sm mb-8">
          Ingresa una nueva contraseña para tu cuenta de administrador.
        </p>

        {/* ERROR DE ENLACE VENCIDO (DISEÑO NARANJA) */}
        {error === "expired" && (
          <div className="bg-[#e8a84f]/20 border border-[#e8a84f] text-[#e8a84f] px-4 py-3 rounded-lg mb-6 text-sm">
            <strong>Enlace vencido</strong>
            <p className="mt-1">
              El enlace para restablecer tu contraseña ha expirado. Vuelve a
              solicitar un nuevo enlace desde la opción "Olvidé mi contraseña".
            </p>
          </div>
        )}

        {/* ERROR NORMAL */}
        {error && error !== "expired" && (
          <p className="bg-red-500/20 border border-red-500 text-red-400 px-4 py-2 rounded mb-5">
            {error}
          </p>
        )}

        {/* ÉXITO */}
        {success && (
          <p className="bg-green-500/20 border border-green-500 text-green-400 px-4 py-2 rounded mb-5">
            {success}
          </p>
        )}

        {/* FORMULARIO */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Password */}
          <div>
            <label className="text-sm text-gray-300">Nueva contraseña</label>
            <input
              type="password"
              className="w-full mt-1 px-4 py-3 bg-[#0e0d0d] border border-[#1f1f1f] rounded text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#bfa16a]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <p className="text-xs text-gray-500 mt-1">
              Usa al menos 8 caracteres, combinando letras y números.
            </p>
          </div>

          {/* Confirm */}
          <div>
            <label className="text-sm text-gray-300">
              Confirmar contraseña
            </label>
            <input
              type="password"
              className="w-full mt-1 px-4 py-3 bg-[#0e0d0d] border border-[#1f1f1f] rounded text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#bfa16a]"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
            />
          </div>

          {/* Botón */}
          <button
            type="submit"
            className="w-full py-3 bg-[#c8ab69] text-[#2f2b27] font-semibold rounded-lg hover:bg-[#d4bb80] transition"
          >
            Cambiar contraseña
          </button>
        </form>

        {/* Volver */}
        <p className="text-xs text-gray-500 text-center mt-6">
          ¿Recordaste tu contraseña?{" "}
          <button
            onClick={() => navigate("/admin/login")}
            className="text-[#c8ab69] hover:text-[#e6c784] transition"
          >
            Volver a iniciar sesión
          </button>
        </p>
      </div>
    </div>
  );
}
