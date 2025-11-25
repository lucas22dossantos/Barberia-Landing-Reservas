import { useLocation } from "react-router-dom";
import React, { useEffect } from "react";
// Componentes
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Servicios from "../components/Servicios";
import Galeria from "../components/Galeria";
import Testimonial from "../components/Testimonial";
import Nosotros from "../components/Nosotros";
import Contacto from "../components/Contacto";
import Footer from "../components/Footer";

function App() {
  const location = useLocation();

  // Detectar si venimos desde otra página y scroll automático
  useEffect(() => {
    if (!location.state || !location.state.scrollTo) return;

    const section = location.state.scrollTo;

    // Esperar un momentito para que el DOM cargue
    setTimeout(() => {
      const target = document.getElementById(section);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });

        // limpiar el state para evitar que dispare scroll si volvés al home nuevamente
        window.history.replaceState({}, document.title);
      }
    }, 250);
  }, [location]);

  // Scroll suave para anclas internas con offset si el nav está fijo
  useEffect(() => {
    // Intercepta clicks en enlaces con hash para hacer scroll suave con offset si es necesario
    const handleAnchorClick = (e) => {
      const anchor = e.target.closest && e.target.closest("a");
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (!href || !href.startsWith("#")) return;

      const id = href.slice(1);
      const target = document.getElementById(id);
      if (target) {
        e.preventDefault();

        // Si el nav está fijo, calcular offset para que el contenido no quede oculto
        const nav = document.querySelector("nav");
        let offset = 0;
        if (nav) {
          const style = window.getComputedStyle(nav);
          if (style.position === "fixed") offset = nav.offsetHeight;
        }

        const top =
          target.getBoundingClientRect().top + window.pageYOffset - offset - 8; // pequeño margen
        window.scrollTo({ top, behavior: "smooth" });

        // Actualizar el hash sin salto
        try {
          history.replaceState && history.replaceState(null, "", `#${id}`);
        } catch (err) {
          // no hacer nada si falla
        }
      }
    };

    document.addEventListener("click", handleAnchorClick);
    return () => document.removeEventListener("click", handleAnchorClick);
  }, []);

  return (
    <>
      <Navbar />
      <Hero />
      <Servicios />
      <Galeria />
      <Testimonial />
      <Nosotros />
      <Contacto />
      <Footer />
    </>
  );
}

export default App;
