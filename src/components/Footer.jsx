import React from "react";

export default function Footer() {
  return (
    <footer className="bg-[#151313] text-white">
      <nav className="flex flex-col md:flex-row justify-between items-center gap-4 px-6 py-6 max-w-6xl mx-auto">
        {/* LOGO */}
        <h1 className="text-xl md:text-2xl font-semibold tracking-wide text-center md:text-left">
          BlackGold Barbers
        </h1>

        {/* MENÚ */}
        <div>
          <ul className="flex flex-col md:flex-row items-center gap-3 md:gap-6 text-base">
            <li>
              <a
                href="#inicio"
                className="hover:text-yellow-400 cursor-pointer transition text-sm"
              >
                Inicio
              </a>
            </li>
            <li>
              <a
                href="#servicios"
                className="hover:text-yellow-400 cursor-pointer transition text-sm"
              >
                Servicios
              </a>
            </li>
            <li>
              <a
                href="#galeria"
                className="hover:text-yellow-400 cursor-pointer transition text-sm"
              >
                Galería
              </a>
            </li>
            <li>
              <a
                href="#nosotros"
                className="hover:text-yellow-400 cursor-pointer transition text-sm"
              >
                Nosotros
              </a>
            </li>
            <li>
              <a
                href="#contacto"
                className="hover:text-yellow-400 cursor-pointer transition text-sm"
              >
                Contacto
              </a>
            </li>
          </ul>
        </div>

        {/* COPYRIGHT */}
        <p className="text-xs text-center md:text-right opacity-70">
          © 2025 BlackGold Barbers. Todos los derechos reservados
        </p>
      </nav>

      <hr className="border-t border-white/20 w-full" />
    </footer>
  );
}
