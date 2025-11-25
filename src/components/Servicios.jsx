// import { Link, useLocation } from "react-router-dom";
// import React from "react";
// import useReveal from "../hooks/useReveal";

// const serviciosData = [
//   {
//     titulo: "Corte Signature",
//     descripcion: "Consulta, corte y peinado con productos premium.",
//     precio: "$45",
//   },
//   {
//     titulo: "Skin Fade",
//     descripcion: "Fade al ras con acabado detallado y estilo.",
//     precio: "$55",
//   },
//   {
//     titulo: "Afeitado Toalla Caliente",
//     descripcion: "Afeitado a navaja con ritual de toalla caliente y bálsamo.",
//     precio: "$40",
//   },
//   {
//     titulo: "Perfilado y Barba",
//     descripcion: "Líneas limpias, forma y acabado para una barba impecable.",
//     precio: "$25",
//   },
//   {
//     titulo: "Corte + Barba",
//     descripcion: "Corte completo con arreglo de barba y toalla caliente.",
//     precio: "$65",
//   },
//   {
//     titulo: "Corte Niños",
//     descripcion: "Cortes atentos y pacientes para menores de 12 años.",
//     precio: "$30",
//   },
// ];

// export default function Servicios() {
//   return (
//     <section className="py-12 bg-[#2f2b27] min-h-screen">
//       <div id="servicios" className="max-w-6xl mx-auto px-6">
//         <h1 className="text-4xl font-bold mb-4 text-white">Servicios</h1>
//         <p className="text-[#9a9a9a] mb-12">
//           Cortes de precisión, fades detallados y afeitados tradicionales con
//           toalla caliente.
//         </p>

//         {/* reveal the grid so items animate when visible */}
//         {(() => {
//           const [ref, visible] = useReveal({ threshold: 0.12 });
//           return (
//             <div ref={ref} className="grid md:grid-cols-3 gap-4">
//               {serviciosData.map((servicio, index) => (
//                 <div key={index} className="h-full">
//                   <div
//                     style={{ animationDelay: `${index * 100}ms` }}
//                     className={`${
//                       visible ? "animate-fadeInUp" : "opacity-0"
//                     } bg-[#141313] p-4 rounded-xl shadow-lg transition-transform duration-300 transform hover:-translate-y-1 hover:scale-[1.02] hover:shadow-2xl flex flex-col h-full`}
//                   >
//                     <h2 className="text-2xl font-semibold mb-2 text-white">
//                       {servicio.titulo}
//                     </h2>
//                     <p className="text-[#9a9a9a] mb-4">
//                       {servicio.descripcion}
//                     </p>
//                     <p className="text-xl font-bold mb-4 text-white">
//                       {servicio.precio}
//                     </p>
//                     <button className="bg-[#bfa16a] text-[#2f2b27] px-6 py-3 rounded-lg font-semibold hover:bg-[#a78d5f] transition mt-auto hover:scale-105 active:scale-95">
//                       Reservar
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           );
//         })()}
//       </div>
//     </section>
//   );
// }

import { Link, useLocation } from "react-router-dom";
import React from "react";
import useReveal from "../hooks/useReveal";

const serviciosData = [
  {
    titulo: "Corte Signature",
    descripcion: "Consulta, corte y peinado con productos premium.",
    precio: "$45",
  },
  {
    titulo: "Skin Fade",
    descripcion: "Fade al ras con acabado detallado y estilo.",
    precio: "$55",
  },
  {
    titulo: "Afeitado Toalla Caliente",
    descripcion: "Afeitado a navaja con ritual de toalla caliente y bálsamo.",
    precio: "$40",
  },
  {
    titulo: "Perfilado y Barba",
    descripcion: "Líneas limpias, forma y acabado para una barba impecable.",
    precio: "$25",
  },
  {
    titulo: "Corte + Barba",
    descripcion: "Corte completo con arreglo de barba y toalla caliente.",
    precio: "$65",
  },
  {
    titulo: "Corte Niños",
    descripcion: "Cortes atentos y pacientes para menores de 12 años.",
    precio: "$30",
  },
];

export default function Servicios() {
  return (
    <section className="py-12 bg-[#2f2b27] min-h-screen">
      <div id="servicios" className="max-w-6xl mx-auto px-6">
        <h1 className="text-4xl font-bold mb-4 text-white">Servicios</h1>
        <p className="text-[#9a9a9a] mb-12">
          Cortes de precisión, fades detallados y afeitados tradicionales con
          toalla caliente.
        </p>

        {/* reveal the grid so items animate when visible */}
        {(() => {
          const [ref, visible] = useReveal({ threshold: 0.12 });
          return (
            <div ref={ref} className="grid md:grid-cols-3 gap-4">
              {serviciosData.map((servicio, index) => (
                <div key={index} className="h-full">
                  <div
                    style={{ animationDelay: `${index * 100}ms` }}
                    className={`${
                      visible ? "animate-fadeInUp" : "opacity-0"
                    } bg-[#141313] p-4 rounded-xl shadow-lg transition-transform duration-300 transform hover:-translate-y-1 hover:scale-[1.02] hover:shadow-2xl flex flex-col h-full`}
                  >
                    <h2 className="text-2xl font-semibold mb-2 text-white">
                      {servicio.titulo}
                    </h2>
                    <p className="text-[#9a9a9a] mb-4">
                      {servicio.descripcion}
                    </p>
                    <p className="text-xl font-bold mb-4 text-white">
                      {servicio.precio}
                    </p>

                    {/* BOTÓN FUNCIONAL */}
                    <Link
                      to="/reservar"
                      className="bg-[#bfa16a] text-[#2f2b27] px-6 py-3 rounded-lg font-semibold hover:bg-[#a78d5f] transition mt-auto hover:scale-105 active:scale-95 text-center"
                    >
                      Reservar
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          );
        })()}
      </div>
    </section>
  );
}
