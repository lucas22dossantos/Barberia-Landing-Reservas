import React from "react";

export default function Footer() {
  return (
    <footer>
      <nav className="flex justify-between items-center px-6 py-4 bg-[#151313] text-white  max-w-6xl mx-auto">
        <h1 className="text-2xl font-semibold tracking-wide">
          BlackGold Barbers
        </h1>
        <div className="hidden md:flex items-center gap-6">
          <ul className="hidden md:flex gap-6 text-lg items-center">
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

        <p>© 2025 BlackGold Barbers. Todos los derechos reservados</p>
      </nav>

      <hr className="border-t border-white/20 w-full" />
    </footer>
  );
}
