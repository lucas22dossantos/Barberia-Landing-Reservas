import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function Dashboard() {
  const [metrics, setMetrics] = useState({
    hoy: 0,
    proximas: 0,
    mensajes: 0,
  });
  const [proximasCitas, setProximasCitas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const hoyStr = new Date().toISOString().split("T")[0];

      // 1. Citas de hoy
      const { count: citasHoy } = await supabase
        .from("reservas")
        .select("*", { count: "exact", head: true })
        .eq("fecha", hoyStr);

      // 2. Citas próximas (desde mañana en adelante)
      const { count: citasProximas } = await supabase
        .from("reservas")
        .select("*", { count: "exact", head: true })
        .gt("fecha", hoyStr);

      // 3. Próximas citas para la tabla (las 5 más recientes futuras)
      const { data: citasData } = await supabase
        .from("reservas")
        .select(`
          hora,
          nombre,
          servicios(nombre),
          barberos(nombre),
          fecha
        `)
        .gte("fecha", hoyStr)
        .order("fecha", { ascending: true })
        .order("hora", { ascending: true })
        .limit(5);

      setMetrics({
        hoy: citasHoy || 0,
        proximas: citasProximas || 0,
        mensajes: 0, // Por ahora 0 o implementar tabla mensajes
      });

      setProximasCitas(citasData || []);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-white">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Panel de administración</h2>

        <button className="bg-[#bfa16a] text-black px-4 py-2 rounded-lg font-semibold hover:bg-[#d4bb7d] transition">
          + Nueva cita
        </button>
      </div>

      <p className="text-sm text-gray-400 mb-8">
        Todo lo esencial de la barbería en una sola vista.
      </p>

      {/* MÉTRICAS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-[#111] p-6 rounded-xl border border-[#222]">
          <p className="text-gray-400 text-sm">Citas de hoy</p>
          <p className="text-4xl font-bold">{metrics.hoy}</p>
        </div>

        <div className="bg-[#111] p-6 rounded-xl border border-[#222]">
          <p className="text-gray-400 text-sm">Citas próximas</p>
          <p className="text-4xl font-bold">{metrics.proximas}</p>
        </div>

        <div className="bg-[#111] p-6 rounded-xl border border-[#222]">
          <p className="text-gray-400 text-sm">Mensajes nuevos</p>
          <p className="text-4xl font-bold">{metrics.mensajes}</p>
        </div>
      </div>

      {/* PRÓXIMAS CITAS */}
      <div className="bg-[#111] p-6 rounded-xl border border-[#222] mb-8 overflow-x-auto">
        <div className="flex justify-between mb-4">
          <h3 className="text-xl font-semibold">Próximas citas</h3>
          <button className="text-sm underline hover:text-[#bfa16a]">Ver todas</button>
        </div>

        <table className="w-full text-left text-sm min-w-[500px]">
          <thead>
            <tr className="text-gray-400 border-b border-[#333]">
              <th className="py-2">Fecha/Hora</th>
              <th>Cliente</th>
              <th>Servicio</th>
              <th>Barbero</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr><td colSpan="4" className="py-4 text-center text-gray-500">Cargando citas...</td></tr>
            ) : proximasCitas.length === 0 ? (
              <tr><td colSpan="4" className="py-4 text-center text-gray-500">No hay citas programadas</td></tr>
            ) : (
              proximasCitas.map((row, i) => (
                <tr
                  key={i}
                  className={`${
                    i % 2 === 1 ? "bg-[#1a1a1a]" : ""
                  } border-b border-[#222]`}
                >
                  <td className="py-2">{row.fecha} · {row.hora}</td>
                  <td>{row.nombre}</td>
                  <td>{row.servicios?.nombre || "—"}</td>
                  <td>{row.barberos?.nombre || "Cualquiera"}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* ACCIONES RÁPIDAS (Placeholders por ahora) */}
      <div className="bg-[#111] p-6 rounded-xl border border-[#222] mb-8">
        <h3 className="text-xl font-semibold mb-4">Acciones rápidas</h3>

        <div className="flex flex-col gap-3">
          <button className="bg-[#1b1b1b] p-4 rounded-lg text-left hover:bg-[#222] transition">
            Ver agenda de hoy
          </button>
          <button className="bg-[#1b1b1b] p-4 rounded-lg text-left hover:bg-[#222] transition">
            Editar servicios
          </button>
          <button className="bg-[#1b1b1b] p-4 rounded-lg text-left hover:bg-[#222] transition">
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
