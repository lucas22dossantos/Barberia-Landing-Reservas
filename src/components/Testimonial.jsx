import React from "react";

const testimoniosData = [
  {
    texto:
      "“El mejor fade que me han hecho en años. La atención al detalle es impresionante.”",
    nombre: "Juan Pérez",
    img: "/public/img/perfil-01.webp",
  },
  {
    texto: "“Ambiente agradable y cortes perfectos. Siempre salgo satisfecho.”",
    nombre: "Mario López",
    img: "/public/img/perfil-02.webp",
  },
  {
    texto:
      "“Profesionales de verdad, con productos de calidad y gran paciencia.”",
    nombre: "Carlos Ramírez",
    img: "/public/img/perfil-03.webp",
  },
];

export default function Testimonial() {
  return (
    <section className="py-12 bg-[#2f2b27]">
      <div className="max-w-4xl md:max-w-5xl lg:max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-bold mb-2 text-white">
          Lo que dicen los clientes
        </h2>
        <p className="text-[#9a9a9a] mb-6">
          Opiniones reales de quienes confían en nuestro oficio.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {testimoniosData.map((testimonio, index) => (
            <div
              key={index}
              className="bg-[#141313] p-6 rounded-xl shadow-lg flex flex-col hover:shadow-2xl transition duration-300"
            >
              <p className="text-[#9a9a9a] mb-6">{testimonio.texto}</p>
              <div className="flex items-center mt-auto">
                <img
                  src={testimonio.img}
                  alt={testimonio.nombre}
                  className="w-12 h-12 rounded-xl object-cover"
                />
                <p className="text-white font-semibold ml-3">
                  {testimonio.nombre}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
