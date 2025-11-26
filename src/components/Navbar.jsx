import { Link, useLocation } from "react-router-dom";
import React, { useState } from "react";

export default function Navbar() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const sections = ["inicio", "servicios", "galeria", "nosotros", "contacto"];

  return (
    <header id="inicio">
      <nav className="flex justify-between items-center px-6 py-4 bg-[#151313] text-white max-w-6xl mx-auto relative">
        <h1 className="text-2xl font-semibold tracking-wide">
          BlackGold Barbers
        </h1>

        {/* MENU DESKTOP */}
        <div className="hidden md:flex items-center gap-6">
          <ul className="hidden md:flex gap-6 text-lg items-center">
            {sections.map((section) => (
              <li key={section}>
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
            ))}
          </ul>

          <Link
            to="/reservar"
            className="text-[#2f2b27] bg-[#bfa16a] px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#a78d5f] transition"
          >
            Reservar ahora
          </Link>
        </div>

        {/* BOTÓN HAMBURGUESA MOBILE */}
        <button
          className="md:hidden text-white text-3xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

        {/* MENU MOBILE OVERLAY */}
        {menuOpen && (
          <div
            className="
        fixed inset-0 
        bg-[#151313]/95 
        backdrop-blur-sm
        text-white 
        py-8 px-6 
        z-50 
        flex flex-col 
        animate-fadeDown
      "
          >
            {/* BOTÓN CERRAR */}
            <button
              className="text-4xl self-end mb-8"
              onClick={() => setMenuOpen(false)}
            >
              ×
            </button>

            {/* LINKS */}
            <ul className="flex flex-col gap-6 text-xl">
              {sections.map((section) => (
                <li key={section}>
                  {location.pathname === "/" ? (
                    <a
                      href={`#${section}`}
                      className="block hover:text-yellow-400 transition"
                      onClick={() => setMenuOpen(false)}
                    >
                      {section.charAt(0).toUpperCase() + section.slice(1)}
                    </a>
                  ) : (
                    <Link
                      to="/"
                      state={{ scrollTo: section }}
                      className="block hover:text-yellow-400 transition"
                      onClick={() => setMenuOpen(false)}
                    >
                      {section.charAt(0).toUpperCase() + section.slice(1)}
                    </Link>
                  )}
                </li>
              ))}
            </ul>

            {/* Botón reservar */}
            <Link
              to="/reservar"
              className="mt-10 text-center text-[#2f2b27] bg-[#bfa16a] px-6 py-3 rounded-lg text-lg font-semibold hover:bg-[#a78d5f] transition"
              onClick={() => setMenuOpen(false)}
            >
              Reservar ahora
            </Link>
          </div>
        )}
      </nav>

      <hr className="border-t border-white/20 w-full" />
    </header>
  );
}
