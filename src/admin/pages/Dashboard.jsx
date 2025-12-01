export default function Dashboard() {
  return (
    <div className="text-white">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Panel de administración</h2>

        <button className="bg-[#bfa16a] text-black px-4 py-2 rounded-lg font-semibold">
          + Nueva cita
        </button>
      </div>

      <p className="text-sm text-gray-400 mb-8">
        Todo lo esencial de la barbería en una sola vista.
      </p>

      {/* MÉTRICAS */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-[#111] p-6 rounded-xl border border-[#222]">
          <p className="text-gray-400 text-sm">Citas de hoy</p>
          <p className="text-4xl font-bold">8</p>
        </div>

        <div className="bg-[#111] p-6 rounded-xl border border-[#222]">
          <p className="text-gray-400 text-sm">Citas próximas</p>
          <p className="text-4xl font-bold">4</p>
        </div>

        <div className="bg-[#111] p-6 rounded-xl border border-[#222]">
          <p className="text-gray-400 text-sm">Mensajes nuevos</p>
          <p className="text-4xl font-bold">2</p>
        </div>
      </div>

      {/* PRÓXIMAS CITAS */}
      <div className="bg-[#111] p-6 rounded-xl border border-[#222] mb-8">
        <div className="flex justify-between mb-4">
          <h3 className="text-xl font-semibold">Próximas citas</h3>
          <button className="text-sm underline">Ver todas</button>
        </div>

        <table className="w-full text-left text-sm">
          <thead>
            <tr className="text-gray-400 border-b border-[#333]">
              <th className="py-2">Hora</th>
              <th>Cliente</th>
              <th>Servicio</th>
              <th>Barbero</th>
            </tr>
          </thead>

          <tbody>
            {[
              {
                h: "16:00",
                c: "Juan Pérez",
                s: "Corte Signature",
                b: "Carlos",
              },
              { h: "17:00", c: "Luis Gómez", s: "Corte + Barba", b: "Diego" },
              {
                h: "17:30",
                c: "Miguel Torres",
                s: "Afeitado clásico",
                b: "Cualquier",
              },
              {
                h: "18:15",
                c: "David Ruiz",
                s: "Arreglo de barba",
                b: "Carlos",
              },
            ].map((row, i) => (
              <tr
                key={i}
                className={`${
                  i % 2 === 1 ? "bg-[#1a1a1a]" : ""
                } border-b border-[#222]`}
              >
                <td className="py-2">{row.h}</td>
                <td>{row.c}</td>
                <td>{row.s}</td>
                <td>{row.b}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ACCIONES RÁPIDAS */}
      <div className="bg-[#111] p-6 rounded-xl border border-[#222] mb-8">
        <h3 className="text-xl font-semibold mb-4">Acciones rápidas</h3>

        <div className="flex flex-col gap-3">
          <button className="bg-[#1b1b1b] p-4 rounded-lg text-left hover:bg-[#222]">
            Ver agenda de hoy
          </button>
          <button className="bg-[#1b1b1b] p-4 rounded-lg text-left hover:bg-[#222]">
            Editar servicios
          </button>
          <button className="bg-[#1b1b1b] p-4 rounded-lg text-left hover:bg-[#222]">
            Actualizar galería
          </button>
        </div>
      </div>

      {/* NOTAS DEL DÍA */}
      <div className="bg-[#111] p-6 rounded-xl border border-[#222]">
        <h3 className="text-xl font-semibold mb-2">Notas del día</h3>
        <p className="text-gray-400 text-sm mb-3">
          Recuerda algo importante para hoy
        </p>

        <div className="bg-[#1a1a1a] p-4 rounded-lg text-sm">
          Ejemplo: Bloquear turnos de 19:00 a 20:00 por mantenimiento.
        </div>
      </div>
    </div>
  );
}
