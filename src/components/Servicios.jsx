import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useReveal from "../hooks/useReveal";

// Supabase
import { supabase } from "../lib/supabaseClient";

export default function Servicios() {
  const [servicios, setServicios] = useState([]);

  useEffect(() => {
    const fetchServicios = async () => {
      const { data, error } = await supabase
        .from("servicios")
        .select("*")
        .limit(6);

      if (error) {
        console.error("Error al cargar los servicios:", error);
      } else {
        setServicios(data);
      }
    };

    fetchServicios();
  }, []);

  return (
    <section className="py-12 bg-[#2f2b27] min-h-screen">
      <div id="servicios" className="max-w-6xl mx-auto px-6">
        <h1 className="text-4xl sm:text-3xl font-bold mb-4 text-white">
          Servicios
        </h1>

        <p className="text-[#9a9a9a] mb-12">
          Cortes de precisión, fades detallados y afeitados tradicionales con
          toalla caliente.
        </p>

        {(() => {
          const [ref, visible] = useReveal({ threshold: 0.12 });
          return (
            <div
              ref={ref}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
            >
              {servicios.map((servicio, index) => (
                <div key={index} className="h-full">
                  <div
                    style={{ animationDelay: `${index * 100}ms` }}
                    className={`${
                      visible ? "animate-fadeInUp" : "opacity-0"
                    } bg-[#141313] p-4 rounded-xl shadow-lg transition-transform duration-300 transform hover:-translate-y-1 hover:scale-[1.02] hover:shadow-2xl flex flex-col h-full`}
                  >
                    <h2 className="text-2xl sm:text-xl font-semibold mb-2 text-white">
                      {servicio.nombre}
                    </h2>

                    <p className="text-[#9a9a9a] mb-4 text-base sm:text-sm">
                      {servicio.descripcion}
                    </p>

                    <p className="text-xl sm:text-lg font-bold mb-4 text-white">
                      {servicio.precio}
                    </p>

                    <Link
                      to="/reservar"
                      state={{ servicio: servicio }}
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
