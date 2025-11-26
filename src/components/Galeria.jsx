import React from "react";
import useReveal from "../hooks/useReveal";

const galeriaData = [
  { src: "/img/galeria-01.webp", alt: "Corte Signature" },
  { src: "/img/galeria-02.webp", alt: "Skin Fade" },
  { src: "/img/galeria-03.webp", alt: "Afeitado Toalla Caliente" },
  { src: "/img/galeria-04.webp", alt: "Perfilado y Barba" },
  { src: "/img/galeria-05.webp", alt: "Corte + Barba" },
  { src: "/img/galeria-06.webp", alt: "Corte Niños" },
];

export default function Galeria() {
  return (
    <section id="galeria" className="py-16 bg-[#1a1a1a]">
      <div className="max-w-6xl mx-auto px-6">
        <h1 className="text-4xl font-bold mb-4 text-white">Galería</h1>
        <p className="text-[#9a9a9a] mb-8">
          Descubre algunos de nuestros trabajos más destacados.
        </p>

        {(() => {
          const [ref, visible] = useReveal({ threshold: 0.12 });
          return (
            <div
              ref={ref}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
            >
              {galeriaData.map((img, index) => (
                <div
                  key={index}
                  style={{ animationDelay: `${index * 80}ms` }}
                  className={`${
                    visible ? "animate-fadeInUp" : "opacity-0"
                  } overflow-hidden rounded-xl shadow-lg transform transition duration-300`}
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-48 sm:h-52 md:h-56 object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
              ))}
            </div>
          );
        })()}
      </div>
    </section>
  );
}
