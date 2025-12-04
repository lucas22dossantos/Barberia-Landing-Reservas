import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  // Leer email guardado SI EXISTE
  const savedEmail = localStorage.getItem("rememberEmail") || "";
  // ocultar y mostrar contraseña
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState(savedEmail);
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(Boolean(savedEmail));
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Credenciales incorrectas");
        return;
      }

      // Guardar token real
      localStorage.setItem("token", data.token);

      // Guardar email si se seleccionó "Recordarme"
      if (remember) {
        localStorage.setItem("rememberEmail", email);
      } else {
        localStorage.removeItem("rememberEmail");
      }

      navigate("/admin");
    } catch (err) {
      setError("Error al conectar con el servidor");
      console.error(err);
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

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full mt-1 px-4 py-3 pr-12 bg-[#1a1a1a] border border-[#2a2a2a] rounded text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#bfa16a]"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  aria-label="Contraseña"
                  autoComplete="current-password"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-100"
                  aria-label={
                    showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
                  }
                  title={showPassword ? "Ocultar" : "Mostrar"}
                >
                  {showPassword ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 3l18 18"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M10.584 10.587A3 3 0 0113.415 13.41"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9.88 4.318A9.956 9.956 0 0112 4c4.478 0 8.27 2.943 9.543 7a9.98 9.98 0 01-1.249 2.527M6.228 6.228A9.945 9.945 0 002.457 12c1.273 4.057 5.064 7 9.543 7 1.428 0 2.791-.3 4.02-.845"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  )}
                </button>
              </div>
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
              className="cursor-pointer w-full py-3 bg-[#c8ab69] text-[#2f2b27] font-semibold rounded-lg hover:bg-[#d4bb80] transition"
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
