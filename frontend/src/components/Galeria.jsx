import React from "react";
import useReveal from "../hooks/useReveal";

const galeriaData = [
  { src: "/img/galeria-01.webp", alt: "Corte Signature", loading: "lazy" },
  { src: "/img/galeria-02.webp", alt: "Skin Fade", loading: "lazy" },
  {
    src: "/img/galeria-03.webp",
    alt: "Afeitado Toalla Caliente",
    loading: "lazy",
  },
  { src: "/img/galeria-04.webp", alt: "Perfilado y Barba", loading: "lazy" },
  { src: "/img/galeria-05.webp", alt: "Corte + Barba", loading: "lazy" },
  { src: "/img/galeria-06.webp", alt: "Corte Niños", loading: "lazy" },
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
              className="
    grid grid-cols-1 
    sm:grid-cols-2 
    lg:grid-cols-3 
    gap-4 sm:gap-5 lg:gap-6
  "
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
                    loading={img.loading}
                    className="
          w-full object-cover transition-transform duration-300 hover:scale-105
          h-48 sm:h-56 lg:h-64
        "
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
