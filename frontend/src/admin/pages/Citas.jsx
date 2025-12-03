import { useState } from "react";

export default function Citas() {
  const [citas, setCitas] = useState([
    {
      id: 1,
      fecha: "2025-12-01",
      hora: "10:00",
      cliente: "Juan Pérez",
      servicio: "Corte clásico",
      barbero: "Carlos",
      estado: "Completada",
    },
    {
      id: 2,
      fecha: "2025-12-01",
      hora: "11:00",
      cliente: "Luis Gómez",
      servicio: "Corte + Barba",
      barbero: "Diego",
      estado: "Pendiente",
    },
    {
      id: 3,
      fecha: "2025-12-02",
      hora: "12:30",
      cliente: "Marcos Díaz",
      servicio: "Corte degradado",
      barbero: "Carlos",
      estado: "Pendiente",
    },
    {
      id: 4,
      fecha: "2025-12-03",
      hora: "16:00",
      cliente: "Miguel Torres",
      servicio: "Afeitado clásico",
      barbero: "Cualquier",
      estado: "Pendiente",
    },
    {
      id: 5,
      fecha: "2025-12-03",
      hora: "17:30",
      cliente: "David Ruiz",
      servicio: "Arreglo de barba",
      barbero: "Diego",
      estado: "Cancelada",
    },
  ]);

  const [modalEditar, setModalEditar] = useState(null);

  const cambiarEstado = (id, nuevoEstado) => {
    setCitas((prev) =>
      prev.map((c) => (c.id === id ? { ...c, estado: nuevoEstado } : c))
    );
  };

  const eliminarCita = (id) => {
    if (confirm("¿Seguro que deseas eliminar esta cita?")) {
      setCitas((prev) => prev.filter((c) => c.id !== id));
    }
  };

  const abrirEditar = (cita) => {
    setModalEditar(cita);
  };

  const guardarEdicion = () => {
    setCitas((prev) =>
      prev.map((c) => (c.id === modalEditar.id ? modalEditar : c))
    );
    setModalEditar(null);
  };

  const hoy = new Date().toISOString().split("T")[0];

  const filtrarHoy = () => {
    setFiltroFecha(hoy);
  };

  const getEstadoColor = (estado) => {
    switch (estado) {
      case "Completada":
        return "bg-green-800 text-green-300";
      case "Pendiente":
        return "bg-yellow-800 text-yellow-300";
      case "Cancelada":
        return "bg-red-800 text-red-300";
      default:
        return "bg-gray-700 text-gray-300";
    }
  };

  const [filtroEstado, setFiltroEstado] = useState("");
  const [filtroBarbero, setFiltroBarbero] = useState("");
  const [busqueda, setBusqueda] = useState("");
  const [filtroFecha, setFiltroFecha] = useState("");

  const resetFiltros = () => {
    setFiltroEstado("");
    setFiltroBarbero("");
    setBusqueda("");
    setFiltroFecha("");
  };

  const citasFiltradas = citas.filter((c) => {
    return (
      (filtroEstado ? c.estado === filtroEstado : true) &&
      (filtroBarbero ? c.barbero === filtroBarbero : true) &&
      (busqueda
        ? c.cliente.toLowerCase().includes(busqueda.toLowerCase())
        : true) &&
      (filtroFecha ? c.fecha === filtroFecha : true)
    );
  });

  return (
    <div className="text-white">
      <h1 className="text-3xl font-bold mb-8">Citas</h1>

      {/* FILTROS */}
      <div className="bg-[#1c1a18] p-4 rounded-xl shadow-md mb-6 flex flex-wrap gap-4 items-center">
        {/* FECHA */}
        <div className="flex items-center gap-2">
          <input
            type="date"
            className="bg-[#2b2724] text-gray-200 px-3 py-2 rounded-md"
            value={filtroFecha}
            onChange={(e) => setFiltroFecha(e.target.value)}
          />

          <button
            onClick={filtrarHoy}
            className="text-sm bg-[#bfa16a] text-black px-3 py-2 rounded-md hover:bg-[#d4b985] transition"
          >
            Hoy
          </button>
        </div>

        {/* Estado */}
        <select
          className="bg-[#2b2724] text-gray-200 px-3 py-2 rounded-md"
          value={filtroEstado}
          onChange={(e) => setFiltroEstado(e.target.value)}
        >
          <option value="">Estado: Todos</option>
          <option value="Pendiente">Pendiente</option>
          <option value="Completada">Completada</option>
          <option value="Cancelada">Cancelada</option>
        </select>

        {/* Barbero */}
        <select
          className="bg-[#2b2724] text-gray-200 px-3 py-2 rounded-md"
          value={filtroBarbero}
          onChange={(e) => setFiltroBarbero(e.target.value)}
        >
          <option value="">Barbero: Todos</option>
          <option value="Carlos">Carlos</option>
          <option value="Diego">Diego</option>
          <option value="Cualquier">Cualquier</option>
        </select>

        {/* Búsqueda */}
        <input
          type="text"
          placeholder="Buscar cliente..."
          className="bg-[#2b2724] text-gray-200 px-3 py-2 rounded-md w-48"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />

        {/* Reset */}
        <button
          onClick={resetFiltros}
          className="text-sm text-gray-300 hover:text-white ml-auto"
        >
          Restablecer filtros
        </button>
      </div>

      <div className="bg-[#1c1a18] p-6 rounded-xl shadow-xl border border-[#2b2724]">
        <table className="w-full border-separate border-spacing-y-2">
          <thead>
            <tr className="text-gray-400 text-sm">
              <th className="py-2">Fecha</th>
              <th className="pb-3">Hora</th>
              <th className="pb-3">Cliente</th>
              <th className="pb-3">Servicio</th>
              <th className="pb-3">Barbero</th>
              <th className="pb-3">Estado</th>
              <th className="pb-3 text-right">Acciones</th>
            </tr>
          </thead>

          <tbody>
            {citasFiltradas.map((cita) => (
              <tr
                key={cita.id}
                className="
                  bg-[#252220] 
                  hover:bg-[#2f2b27] 
                  transition-all
                  rounded-lg
                "
              >
                <td className="py-4 px-3 rounded-l-lg font-medium">
                  {cita.fecha}
                </td>

                <td className="py-4 px-3 rounded-l-lg font-medium">
                  {cita.hora}
                </td>

                <td className="px-3">{cita.cliente}</td>

                <td className="px-3 text-gray-300">{cita.servicio}</td>

                <td className="px-3">{cita.barbero}</td>

                <td className="px-3">
                  <span
                    className={`px-3 py-1 text-xs rounded-lg font-semibold ${getEstadoColor(
                      cita.estado
                    )}`}
                  >
                    {cita.estado}
                  </span>
                </td>

                {/* ACCIONES */}
                <td className="px-3 rounded-r-lg">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => abrirEditar(cita)}
                      className="
                        px-2 py-1 text-sm rounded-md
                        bg-blue-900/40 text-blue-300
                        hover:bg-blue-900/60
                        transition
                      "
                    >
                      Editar
                    </button>

                    <button
                      onClick={() => cambiarEstado(cita.id, "Completada")}
                      className="
                        px-2 py-1 text-sm rounded-md
                        bg-green-900/40 text-green-300
                        hover:bg-green-900/60
                        transition
                      "
                    >
                      Completar
                    </button>

                    <button
                      onClick={() => cambiarEstado(cita.id, "Cancelada")}
                      className="
                        px-2 py-1 text-sm rounded-md
                        bg-red-900/40 text-red-300
                        hover:bg-red-900/60
                        transition
                      "
                    >
                      Cancelar
                    </button>

                    <button
                      onClick={() => eliminarCita(cita.id)}
                      className="
                        px-2 py-1 text-sm rounded-md
                        bg-gray-700/40 text-gray-300
                        hover:bg-gray-700/60
                        transition
                      "
                    >
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL EDITAR */}
      {modalEditar && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-[#1c1a18] p-6 rounded-xl w-[400px] border border-[#2b2724] shadow-lg">
            <h2 className="text-xl mb-5 font-semibold">Editar cita</h2>

            <label className="text-sm text-gray-400">Cliente</label>
            <input
              type="text"
              value={modalEditar.cliente}
              onChange={(e) =>
                setModalEditar({ ...modalEditar, cliente: e.target.value })
              }
              className="w-full bg-[#2b2724] p-2 rounded mb-4"
            />

            <label className="text-sm text-gray-400">Estado</label>
            <select
              value={modalEditar.estado}
              onChange={(e) =>
                setModalEditar({ ...modalEditar, estado: e.target.value })
              }
              className="w-full bg-[#2b2724] p-2 rounded mb-4"
            >
              <option>Pendiente</option>
              <option>Completada</option>
              <option>Cancelada</option>
            </select>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setModalEditar(null)}
                className="px-4 py-2 rounded bg-gray-700 hover:bg-gray-600"
              >
                Cancelar
              </button>

              <button
                onClick={guardarEdicion}
                className="px-4 py-2 rounded bg-[#bfa16a] text-black hover:bg-[#d6b87a]"
              >
                Guardar cambios
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
