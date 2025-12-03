import { Link } from "react-router-dom";
import React from "react";

const Hero = () => {
  return (
    <section
      className="
        relative w-full min-h-[90vh] text-white flex items-center
        bg-[#141313]
        bg-[url('/img/hero.webp')] bg-cover bg-center
        lg:bg-none
      "
    >
      {/* Overlay solo en mobile/tablet */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm lg:hidden"></div>

      <div
        className="
          max-w-6xl mx-auto px-6 w-full 
          flex flex-col lg:flex-row 
          items-center justify-between gap-10
          relative z-10
        "
      >
        {/* Texto */}
        <div className="flex flex-col gap-6 max-w-xl text-center lg:text-left">
          <span className="text-white/70 text-sm sm:text-base">
            Artesanía clásica. Estilo moderno.
          </span>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
            Cortes precisos, afeitados con toalla caliente y grooming premium.
          </h1>

          <p className="text-white/70 text-base sm:text-lg lg:text-base">
            Reserva tu silla con nuestros barberos senior y sal sintiéndote en
            tu mejor versión.
          </p>

          {/* Botones */}
          <div className="flex gap-4 items-center justify-center lg:justify-start flex-wrap">
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

        {/* Imagen solo en desktop grande */}
        <img
          src="/img/hero.webp"
          alt="Barbería"
          className="
            hidden lg:block
            w-[450px] h-[380px]
            xl:w-[520px] xl:h-[420px]
            object-cover rounded-xl
          "
        />
      </div>
    </section>
  );
};

export default Hero;
