import { Link, useLocation } from "react-router-dom";
import React from "react";

const Hero = () => {
  return (
    <section className="relative w-full min-h-[80vh]  bg-[#141313] text-white flex items-center">
      <div
        className="max-w-6xl mx-auto px-6 w-full flex items-center justify-between gap-10 
      
        animate-fadeIn"
      >
        <div className="flex flex-col gap-6 max-w-lg">
          <span className="text-white/70">
            Artesanía clásica. Estilo moderno.
          </span>

          <h1 className="text-3xl md:text-4xl font-bold leading-tight">
            Cortes precisos, afeitados con toalla caliente y grooming premium en
            un espacio refinado.
          </h1>

          <p className="text-white/70">
            Reserva tu silla con nuestros barberos senior y sal sintiéndote en
            tu mejor versión.
          </p>

          {/* Botones */}
          <div className="flex gap-4 items-center flex-wrap">
            <Link
              to="/reservar"
              className="bg-[#bfa16a] text-[#2f2b27] px-6 py-3 rounded-lg font-semibold hover:bg-[#a78d5f] transition"
            >
              Reservar ahora
            </Link>

            <a
              href="#servicios"
              className="bg-[#2f2b27] px-6 py-3 rounded-lg font-semibold hover:bg-[#3a3632] transition inline-block"
            >
              Ver servicios
            </a>

            <div className="bg-[#2f2b27]/70 px-5 py-2 rounded-xl backdrop-blur-sm text-sm">
              ⭐ Calificación <span className="font-bold">4.9/5</span>
            </div>
          </div>
        </div>

        {/* Imagen */}
        <img
          src="/img/hero.webp"
          alt="Barbería"
          className="w-80 h-80 md:w-[500px] md:h-[400px] object-cover rounded-xl hidden md:block"
        />
      </div>
    </section>
  );
};

export default Hero;
