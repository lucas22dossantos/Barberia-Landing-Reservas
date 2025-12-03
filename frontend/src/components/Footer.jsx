import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Footer() {
  const location = useLocation();
  const sections = [
    { id: "inicio", label: "Inicio" },
    { id: "servicios", label: "Servicios" },
    { id: "galeria", label: "Galería" },
    { id: "nosotros", label: "Nosotros" },
    { id: "contacto", label: "Contacto" },
  ];

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
            {sections.map((section) => (
              <li key={section.id}>
                {location.pathname === "/" ? (
                  <a
                    href={`#${section.id}`}
                    className="hover:text-yellow-400 cursor-pointer transition text-sm"
                  >
                    {section.label}
                  </a>
                ) : (
                  <Link
                    to="/"
                    state={{ scrollTo: section.id }}
                    className="hover:text-yellow-400 cursor-pointer transition text-sm"
                  >
                    {section.label}
                  </Link>
                )}
              </li>
            ))}
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
