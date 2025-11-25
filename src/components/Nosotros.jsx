import React from "react";

export default function Nosotros() {
  return (
    <section className="py-16" id="nosotros">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center gap-8">
        {/* Imagen */}
        <div className="md:w-3/4">
          <img
            src="/img/nosotros.webp"
            alt="Nosotros"
            className="w-full h-[300px] rounded-xl object-cover shadow-lg"
          />
        </div>

        {/* Texto */}
        <div className="md:w-1/2 text-white">
          <h2 className="text-4xl font-bold mb-4">Nosotros</h2>
          <p className="text-[#9a9a9a] mb-6">
            Con raíces en la tradición y visión contemporánea. Combinamos
            técnicas old-school con estilo actual.
          </p>
          <ul className="list-disc list-inside space-y-2 text-white">
            <li>Fundada en 2012 en el corazón del distrito</li>
            <li>Barberos maestros con 10+ años de experiencia</li>
            <li>Productos premium y sanitización meticulosa</li>
            <li>Atendemos sin cita, pero preferimos reservas</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
