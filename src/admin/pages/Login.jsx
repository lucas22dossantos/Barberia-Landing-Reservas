import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("admin@blackgoldbarberia.com");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email === "admin@blackgoldbarberia.com" && password === "123456") {
      localStorage.setItem("auth", "true");
      navigate("/admin");
    } else {
      setError("Credenciales incorrectas");
    }
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] flex justify-center items-center py-10">
      {/* CONTENEDOR PRINCIPAL */}
      <div className="w-[900px] h-[560px] bg-white/10 backdrop-blur-xl rounded-xl overflow-hidden flex shadow-2xl border border-white/20 relative">
        {/* LEFT SIDE */}
        <div className="w-1/2 h-full relative">
          <img
            src="/img/barberia-login.webp"
            alt="Barbería"
            className="h-full w-full object-cover opacity-80"
          />

          <div className="absolute inset-0 bg-black/40"></div>

          {/* Branding */}
          <div className="absolute top-4 left-4 text-white">
            <div className="flex items-center gap-2">
              <div className="bg-white text-black font-bold w-8 h-8 flex items-center justify-center rounded">
                BG
              </div>
              <div>
                <h2 className="font-semibold text-lg">BlackGold Barbería</h2>
                <p className="text-sm text-gray-300">
                  Barbería premium. Control interno de citas y servicios.
                </p>
              </div>
            </div>
          </div>

          {/* Panel privado */}
          <div className="absolute bottom-4 left-4 bg-black/40 backdrop-blur-md p-3 rounded-lg text-white max-w-xs">
            <h3 className="font-semibold text-lg">Panel privado</h3>
            <p className="text-sm text-gray-300 mt-1">
              Solo personal autorizado puede acceder.
            </p>
          </div>
        </div>

        {/* RIGHT SIDE (FORM) */}
        <div className="w-1/2 h-full flex flex-col justify-center p-10 bg-[#0c0c0c]">
          <div>
            <h1 className="text-2xl font-bold mb-1 text-white">
              Iniciar sesión
            </h1>
            <p className="text-sm text-gray-400 mb-6">
              Ingresa con tus credenciales de administrador.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex-1 flex flex-col justify-center space-y-5"
          >
            {error && (
              <p className="bg-red-500/20 border border-red-500 text-red-400 px-4 py-2 rounded">
                {error}
              </p>
            )}

            <div>
              <label className="text-sm text-gray-300">
                Correo electrónico
              </label>
              <input
                type="email"
                className="w-full mt-1 px-4 py-3 bg-[#1a1a1a] border border-[#2a2a2a] rounded text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#bfa16a]"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="text-sm text-gray-300">Contraseña</label>
              <input
                type="password"
                className="w-full mt-1 px-4 py-3 bg-[#1a1a1a] border border-[#2a2a2a] rounded text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#bfa16a]"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* Opciones */}
            <div className="flex justify-between items-center">
              <label className="flex items-center gap-2 text-sm text-gray-400 cursor-pointer">
                <input
                  type="checkbox"
                  className="accent-[#bfa16a]"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                />
                Recordarme
              </label>

              <Link
                to="/forgot-password"
                className="text-sm text-[#c8ab69] hover:text-[#e6c784]"
              >
                Olvidé mi contraseña
              </Link>
            </div>

            {/* Botón */}
            <button
              type="submit"
              className="w-full py-3 bg-[#c8ab69] text-[#2f2b27] font-semibold rounded-lg hover:bg-[#d4bb80] transition"
            >
              Entrar al panel
            </button>
          </form>

          <p className="text-xs text-gray-500 text-center mt-4">
            Acceso exclusivo para personal autorizado.
          </p>
        </div>
      </div>
    </div>
  );
}
