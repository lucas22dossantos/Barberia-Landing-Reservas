import { useState } from "react";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const API_URL = import.meta.env.VITE_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/api/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "No se pudo procesar la solicitud.");
      }

      // ✅ Solo muestra éxito. El backend se encarga del correo.
      setSuccess(true);
    } catch (err) {
      setError(err.message || "Error inesperado.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex justify-center items-center px-4">
      <div className="w-full max-w-md bg-[#111] p-10 rounded-xl shadow-lg border border-white/10">
        {/* Header */}
        <h2 className="text-white font-semibold text-lg mb-1">
          BlackGold Barbería • Panel
        </h2>
        <h1 className="text-2xl font-bold text-white mb-4">
          Restablecer contraseña
        </h1>
        <p className="text-gray-400 text-sm mb-6">
          Ingresa el correo con el que accedes al panel para enviarte un enlace
          de recuperación.
        </p>

        {/* Success Message */}
        {success && (
          <p className="bg-green-500/20 text-green-400 border border-green-500 px-4 py-2 rounded mb-5">
            Si el correo existe, te enviamos un enlace para restablecer tu
            contraseña. Revisa también tu carpeta de spam.
          </p>
        )}

        {/* Error Message */}
        {error && (
          <p className="bg-red-500/20 text-red-400 border border-red-500 px-4 py-2 rounded mb-5">
            {error}
          </p>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-sm text-gray-300">Correo electrónico</label>
            <input
              type="email"
              className="w-full mt-1 px-4 py-3 bg-[#1a1a1a] border border-[#333] rounded text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#bfa16a]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <p className="text-sm text-gray-400 mt-2">
            Te enviaremos un enlace para crear una nueva contraseña. Revisa
            también tu carpeta de spam.
          </p>

          <button
            type="submit"
            className="w-full py-3 bg-[#c8ab69] text-black font-semibold rounded-lg hover:bg-[#d4bb80] transition disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Enviando..." : "Enviar enlace de restablecimiento"}
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-400 mt-6">
          ¿Recordaste tu contraseña?{" "}
          <Link
            to="/admin/login"
            className="text-[#c8ab69] hover:text-[#e6c784]"
          >
            Volver a iniciar sesión
          </Link>
        </p>
      </div>
    </div>
  );
}
