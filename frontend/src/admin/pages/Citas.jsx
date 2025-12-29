import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function Citas() {
  const [citas, setCitas] = useState([]);
  const [barberos, setBarberos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalEditar, setModalEditar] = useState(null);

  // Filtros
  const [filtroEstado, setFiltroEstado] = useState("");
  const [filtroBarbero, setFiltroBarbero] = useState("");
  const [busqueda, setBusqueda] = useState("");
  const [filtroFecha, setFiltroFecha] = useState("");

  useEffect(() => {
    fetchInitialData();
  }, []);

  useEffect(() => {
    fetchCitas();
  }, [filtroEstado, filtroBarbero, filtroFecha]);

  const fetchInitialData = async () => {
    const { data: barberosData } = await supabase.from("barberos").select("*");
    setBarberos(barberosData || []);
  };

  const fetchCitas = async () => {
    setLoading(true);
    try {
      let query = supabase
        .from("reservas")
        .select(`
          *,
          servicios(nombre),
          barberos(nombre)
        `)
        .order("fecha", { ascending: false })
        .order("hora", { ascending: false });

      if (filtroEstado) query = query.eq("estado", filtroEstado.toLowerCase());
      if (filtroBarbero) query = query.eq("barbero_id", filtroBarbero);
      if (filtroFecha) query = query.eq("fecha", filtroFecha);

      const { data, error } = await query;
      if (error) throw error;
      setCitas(data || []);
    } catch (error) {
      console.error("Error fetching citas:", error);
    } finally {
      setLoading(false);
    }
  };

  const cambiarEstado = async (id, nuevoEstado) => {
    try {
      const { error } = await supabase
        .from("reservas")
        .update({ estado: nuevoEstado.toLowerCase() })
        .eq("id", id);
      
      if (error) throw error;
      fetchCitas();
    } catch (error) {
      alert("Error al actualizar el estado");
    }
  };

  const eliminarCita = async (id) => {
    if (confirm("¿Seguro que deseas eliminar esta cita?")) {
      try {
        const { error } = await supabase.from("reservas").delete().eq("id", id);
        if (error) throw error;
        fetchCitas();
      } catch (error) {
        alert("Error al eliminar la cita");
      }
    }
  };

  const abrirEditar = (cita) => {
    setModalEditar({
      ...cita,
      cliente: cita.nombre, // mapeamos nombre a cliente para el modal
    });
  };

  const guardarEdicion = async () => {
    try {
      const { error } = await supabase
        .from("reservas")
        .update({
          nombre: modalEditar.cliente,
          estado: modalEditar.estado.toLowerCase(),
        })
        .eq("id", modalEditar.id);

      if (error) throw error;
      setModalEditar(null);
      fetchCitas();
    } catch (error) {
      alert("Error al guardar cambios");
    }
  };

  const hoy = new Date().toISOString().split("T")[0];

  const filtrarHoy = () => {
    setFiltroFecha(hoy);
  };

  const getEstadoColor = (estado) => {
    switch (estado?.toLowerCase()) {
      case "completada":
        return "bg-green-800 text-green-300";
      case "pendiente":
        return "bg-yellow-800 text-yellow-300";
      case "cancelada":
        return "bg-red-800 text-red-300";
      default:
        return "bg-gray-700 text-gray-300";
    }
  };

  const resetFiltros = () => {
    setFiltroEstado("");
    setFiltroBarbero("");
    setBusqueda("");
    setFiltroFecha("");
  };

  const citasFiltradas = citas.filter((c) => {
    return busqueda
      ? c.nombre.toLowerCase().includes(busqueda.toLowerCase())
      : true;
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
          {barberos.map((b) => (
            <option key={b.id} value={b.id}>{b.nombre}</option>
          ))}
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

      <div className="bg-[#1c1a18] p-6 rounded-xl shadow-xl border border-[#2b2724] overflow-x-auto">
        <table className="w-full border-separate border-spacing-y-2 min-w-[800px]">
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
            {loading ? (
               <tr><td colSpan="7" className="py-8 text-center text-gray-500">Cargando citas...</td></tr>
            ) : citasFiltradas.length === 0 ? (
              <tr><td colSpan="7" className="py-8 text-center text-gray-500">No se encontraron citas</td></tr>
            ) : (
              citasFiltradas.map((cita) => (
                <tr
                  key={cita.id}
                  className="bg-[#252220] hover:bg-[#2f2b27] transition-all rounded-lg"
                >
                  <td className="py-4 px-3 rounded-l-lg font-medium">{cita.fecha}</td>
                  <td className="py-4 px-3 font-medium">{cita.hora}</td>
                  <td className="px-3">{cita.nombre}</td>
                  <td className="px-3 text-gray-300">{cita.servicios?.nombre || "—"}</td>
                  <td className="px-3">{cita.barberos?.nombre || "Cualquiera"}</td>
                  <td className="px-3">
                    <span className={`px-3 py-1 text-xs rounded-lg font-semibold capitalize ${getEstadoColor(cita.estado)}`}>
                      {cita.estado}
                    </span>
                  </td>

                  {/* ACCIONES */}
                  <td className="px-3 rounded-r-lg">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => abrirEditar(cita)}
                        className="px-2 py-1 text-sm rounded-md bg-blue-900/40 text-blue-300 hover:bg-blue-900/60 transition"
                      >
                        Editar
                      </button>

                      <button
                        onClick={() => cambiarEstado(cita.id, "Completada")}
                        className="px-2 py-1 text-sm rounded-md bg-green-900/40 text-green-300 hover:bg-green-900/60 transition"
                      >
                        Completar
                      </button>

                      <button
                        onClick={() => cambiarEstado(cita.id, "Cancelada")}
                        className="px-2 py-1 text-sm rounded-md bg-red-900/40 text-red-300 hover:bg-red-900/60 transition"
                      >
                        Cancelar
                      </button>

                      <button
                        onClick={() => eliminarCita(cita.id)}
                        className="px-2 py-1 text-sm rounded-md bg-gray-700/40 text-gray-300 hover:bg-gray-700/60 transition"
                      >
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* MODAL EDITAR */}
      {modalEditar && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-[#1c1a18] p-6 rounded-xl w-[400px] border border-[#2b2724] shadow-lg">
            <h2 className="text-xl mb-5 font-semibold">Editar cita</h2>

            <label className="text-sm text-gray-400">Cliente</label>
            <input
              type="text"
              value={modalEditar.cliente}
              onChange={(e) =>
                setModalEditar({ ...modalEditar, cliente: e.target.value })
              }
              className="w-full bg-[#2b2724] p-2 rounded mb-4 text-white focus:outline-none focus:ring-1 focus:ring-[#bfa16a]"
            />

            <label className="text-sm text-gray-400">Estado</label>
            <select
              value={modalEditar.estado}
              onChange={(e) =>
                setModalEditar({ ...modalEditar, estado: e.target.value })
              }
              className="w-full bg-[#2b2724] p-2 rounded mb-4 text-white focus:outline-none focus:ring-1 focus:ring-[#bfa16a] capitalize"
            >
              <option value="pendiente">Pendiente</option>
              <option value="completada">Completada</option>
              <option value="cancelada">Cancelada</option>
            </select>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setModalEditar(null)}
                className="px-4 py-2 rounded bg-gray-700 hover:bg-gray-600 transition"
              >
                Cancelar
              </button>

              <button
                onClick={guardarEdicion}
                className="px-4 py-2 rounded bg-[#bfa16a] text-black hover:bg-[#d6b87a] transition font-semibold"
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
