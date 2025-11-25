import { Link, useLocation } from "react-router-dom";
import React from "react";

export default function Navbar() {
  const location = useLocation();

  return (
    <header id="inicio">
      <nav className="flex justify-between items-center px-6 py-4 bg-[#151313] text-white max-w-6xl mx-auto">
        <h1 className="text-2xl font-semibold tracking-wide">
          BlackGold Barbers
        </h1>

        <div className="hidden md:flex items-center gap-6">
          <ul className="hidden md:flex gap-6 text-lg items-center">
            {["inicio", "servicios", "galeria", "nosotros", "contacto"].map(
              (section) => (
                <li key={section}>
                  {/* Si estamos en el home, usar ancla (#) */}
                  {location.pathname === "/" ? (
                    <a
                      href={`#${section}`}
                      className="group hover:text-yellow-400 transition text-sm relative inline-block"
                    >
                      <span className="relative z-10">
                        {section.charAt(0).toUpperCase() + section.slice(1)}
                      </span>
                      <span className="absolute left-0 bottom-0 bg-[#bfa16a] w-full scale-x-0 origin-left transform transition-transform duration-200 group-hover:scale-x-100" />
                    </a>
                  ) : (
                    // Si estamos fuera del home, volver al home y hacer scroll automático
                    <Link
                      to="/"
                      state={{ scrollTo: section }}
                      className="group hover:text-yellow-400 transition text-sm relative inline-block"
                    >
                      <span className="relative z-10">
                        {section.charAt(0).toUpperCase() + section.slice(1)}
                      </span>
                      <span className="absolute left-0 bottom-0 bg-[#bfa16a] w-full scale-x-0 origin-left transform transition-transform duration-200 group-hover:scale-x-100" />
                    </Link>
                  )}
                </li>
              )
            )}
          </ul>

          <Link
            to="/reservar"
            className="text-[#2f2b27] bg-[#bfa16a] px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#a78d5f] transition"
          >
            Reservar ahora
          </Link>
        </div>

        <button className="md:hidden text-white text-3xl">☰</button>
      </nav>

      <hr className="border-t border-white/20 w-full" />
    </header>
  );
}
