export default function Politicas() {
  return (
    <section className="bg-[#151313] text-white min-h-screen py-16 px-6">
      <div className="max-w-3xl mx-auto">
        {/* TÍTULO */}
        <h1 className="text-3xl font-bold mb-6 text-[#bfa16a]">
          Políticas de Cancelación y Puntualidad
        </h1>

        {/* CAJA PRINCIPAL */}
        <div className="bg-[#1c1b1a] border border-[#2a2927] p-6 rounded-xl shadow-md space-y-6">
          {/* Sección 1 */}
          <div>
            <h2 className="text-xl font-semibold mb-2 text-[#bfa16a]">
              Cancelación gratuita
            </h2>
            <p className="text-gray-300 text-sm leading-relaxed">
              Podés cancelar tu cita sin costo hasta{" "}
              <strong className="text-white">3 horas antes</strong> de la hora
              reservada. Esto nos ayuda a reacomodar turnos y ofrecer el horario
              a otro cliente.
            </p>
          </div>

          {/* Sección 2 */}
          <div>
            <h2 className="text-xl font-semibold mb-2 text-[#bfa16a]">
              Cancelaciones tardías
            </h2>
            <p className="text-gray-300 text-sm leading-relaxed">
              Si necesitás cancelar dentro de las últimas 3 horas antes de tu
              cita, te pedimos avisar igualmente por WhatsApp o correo para
              evitar tiempos muertos. No hay cargos, pero afecta la
              disponibilidad de horarios.
            </p>
          </div>

          {/* Sección 3 */}
          <div>
            <h2 className="text-xl font-semibold mb-2 text-[#bfa16a]">
              No presentación (no-show)
            </h2>
            <p className="text-gray-300 text-sm leading-relaxed">
              Si no te presentás a tu cita y no avisás, simplemente el turno se
              libera. No se aplican cargos. Te pedimos avisar para mantener una
              buena organización de la agenda.
            </p>
          </div>

          {/* Sección 4 */}
          <div>
            <h2 className="text-xl font-semibold mb-2 text-[#bfa16a]">
              Reprogramación de turnos
            </h2>
            <p className="text-gray-300 text-sm leading-relaxed">
              Podés reprogramar tu cita para otro día sin costo, siempre que
              haya disponibilidad. La reprogramación también debe realizarse
              dentro del margen de 3 horas previas.
            </p>
          </div>

          {/* Sección 5 */}
          <div>
            <h2 className="text-xl font-semibold mb-2 text-[#bfa16a]">
              Puntualidad
            </h2>
            <p className="text-gray-300 text-sm leading-relaxed">
              Te pedimos llegar{" "}
              <strong className="text-white">5 a 10 minutos antes</strong>. Si
              llegás tarde, el servicio podría acortarse para no retrasar a los
              siguientes clientes.
            </p>
          </div>
        </div>

        {/* BOTÓN VOLVER */}
        <div className="text-center mt-10">
          <a
            href="/"
            className="inline-block px-6 py-3 bg-[#bfa16a] text-[#2f2b27] rounded-lg font-semibold text-sm hover:bg-[#d8b779] transition"
          >
            Volver al inicio
          </a>
        </div>
      </div>
    </section>
  );
}
