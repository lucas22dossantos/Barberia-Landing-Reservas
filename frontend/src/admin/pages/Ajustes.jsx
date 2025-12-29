import { useState, useEffect } from "react";
import SettingsCard from "../components/SettingsCard";
import ToggleSwitch from "../components/ToggleSwitch";

// Supabase
import { supabase } from "../../lib/supabaseClient";

export default function Ajustes() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    // Información de la barbería
    nombre: "BlackGold Barbería",
    telefono: "+54 3765 000000",
    url: "https://blackgoldbarberia.com",
    correo: "contacto@blackgoldbarberia.com",
    direccion: "Calle Principal 123, Ciudad",

    // Horarios y reservas
    diasAtencion: "Lunes a sábado",
    horario: "10:00 - 20:00",
    permitirReservas: true,
    tiempoEntre: "10 min",
    tiempoMinimo: "2 horas",
    confirmacionAutomatica: false,

    // Notificaciones
    recordatorioCorreo: false,
    mensajeAgradecimiento: false,
    remitenteCorreo: "BlackGold Barbería",
    textoRecordatorio:
      "Hola, te recordamos tu cita en BlackGold Barbería. Si no puedes asistir, contáctanos con antelación.",
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const { data: config, error } = await supabase
        .from("configuracion")
        .select("*")
        .eq("id", 1)
        .single();

      if (error) {
        if (error.code !== "PGRST116") { // single() error for no rows
          console.error("Error fetching settings:", error);
        }
      } else if (config) {
        setData({
          nombre: config.nombre_negocio || "",
          telefono: config.telefono || "",
          url: config.url_sitio || "",
          correo: config.correo || "",
          direccion: config.direccion || "",
          diasAtencion: config.dias_atencion || "",
          horario: config.horario || "",
          permitirReservas: config.permitir_reservas,
          tiempoMinimo: config.tiempo_minimo || "",
          tiempoEntre: config.tiempo_entre || "",
          confirmacionAutomatica: config.confirmacion_automatica,
          recordatorioCorreo: config.recordatorio_correo,
          mensajeAgradecimiento: config.mensaje_agradecimiento,
          remitenteCorreo: config.remitente_correo || "",
          textoRecordatorio: config.texto_recordatorio || "",
        });
      }
    } catch (err) {
      console.error("fetchSettings exception:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field, value) => {
    setData({ ...data, [field]: value });
  };

  const handleGuardar = async () => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from("configuracion")
        .upsert({
          id: 1,
          nombre_negocio: data.nombre,
          telefono: data.telefono,
          url_sitio: data.url,
          correo: data.correo,
          direccion: data.direccion,
          dias_atencion: data.diasAtencion,
          horario: data.horario,
          permitir_reservas: data.permitirReservas,
          tiempo_minimo: data.tiempoMinimo,
          tiempo_entre: data.tiempoEntre,
          confirmacion_automatica: data.confirmacionAutomatica,
          recordatorio_correo: data.recordatorioCorreo,
          mensaje_agradecimiento: data.mensajeAgradecimiento,
          remitente_correo: data.remitenteCorreo,
          texto_recordatorio: data.textoRecordatorio,
          updated_at: new Date().toISOString(),
        });

      if (error) throw error;
      alert("Ajustes guardados correctamente");
    } catch (error) {
      console.error("Error guardando ajustes:", error);
      alert("Error al guardar los ajustes. Asegúrate de que la tabla 'configuracion' existe.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    fetchSettings();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-white">
        Cargando ajustes...
      </div>
    );
  }

  return (
    <div className="text-gray-200 p-8 flex flex-col gap-8">
      {/* Título */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-semibold">Ajustes del sistema</h1>

        <div className="flex gap-3">
          <button
            onClick={handleReset}
            className="px-4 py-2 rounded-md bg-[#3a3531] hover:bg-[#4a4541]"
          >
            Descartar cambios
          </button>

          <button
            onClick={handleGuardar}
            className="px-4 py-2 rounded-md bg-[#bfa16a] text-black font-semibold hover:bg-[#d4bb7d]"
          >
            Guardar ajustes
          </button>
        </div>
      </div>

      {/* Información de la barbería */}
      <SettingsCard
        title="Información de la barbería"
        descripcion="Estos datos se muestran en tu landing y en los recordatorios de cita."
      >
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 text-sm">Nombre comercial</label>
            <input
              type="text"
              value={data.nombre}
              onChange={(e) => handleChange("nombre", e.target.value)}
              className="w-full p-2 rounded-md bg-[#2b2724] border border-[#3a3531]"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm">Correo de contacto</label>
            <input
              type="text"
              value={data.correo}
              onChange={(e) => handleChange("correo", e.target.value)}
              className="w-full p-2 rounded-md bg-[#2b2724] border border-[#3a3531]"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm">Teléfono</label>
            <input
              type="text"
              value={data.telefono}
              onChange={(e) => handleChange("telefono", e.target.value)}
              className="w-full p-2 rounded-md bg-[#2b2724] border border-[#3a3531]"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm">Dirección corta</label>
            <input
              type="text"
              value={data.direccion}
              onChange={(e) => handleChange("direccion", e.target.value)}
              className="w-full p-2 rounded-md bg-[#2b2724] border border-[#3a3531]"
            />
          </div>

          <div className="col-span-2">
            <label className="block mb-1 text-sm">URL del sitio</label>
            <input
              type="text"
              value={data.url}
              onChange={(e) => handleChange("url", e.target.value)}
              className="w-full p-2 rounded-md bg-[#2b2724] border border-[#3a3531]"
            />
          </div>
        </div>
      </SettingsCard>

      {/* Horario y reservas */}
      <SettingsCard
        title="Horario y reservas"
        descripcion="Define cuándo aceptas citas y el comportamiento del formulario."
      >
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 text-sm">Días de atención</label>
            <input
              type="text"
              value={data.diasAtencion}
              onChange={(e) => handleChange("diasAtencion", e.target.value)}
              className="w-full p-2 rounded-md bg-[#2b2724] border border-[#3a3531]"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm">
              Horario visible en la web
            </label>
            <input
              type="text"
              value={data.horario}
              onChange={(e) => handleChange("horario", e.target.value)}
              className="w-full p-2 rounded-md bg-[#2b2724] border border-[#3a3531]"
            />
          </div>

          {/* Toggle switches */}
          <div className="flex items-center justify-between col-span-2 py-2">
            <span>Permitir reservas online</span>
            <ToggleSwitch
              value={data.permitirReservas}
              onChange={(v) => handleChange("permitirReservas", v)}
            />
          </div>

          <div className="flex items-center justify-between col-span-2 py-2">
            <span>Tiempo mínimo antes de reservar</span>
            <input
              type="text"
              value={data.tiempoMinimo}
              onChange={(e) => handleChange("tiempoMinimo", e.target.value)}
              className="w-28 p-2 rounded-md bg-[#2b2724] border border-[#3a3531] text-center"
            />
          </div>

          <div className="flex items-center justify-between col-span-2 py-2">
            <span>Tiempo entre citas</span>
            <input
              type="text"
              value={data.tiempoEntre}
              onChange={(e) => handleChange("tiempoEntre", e.target.value)}
              className="w-28 p-2 rounded-md bg-[#2b2724] border border-[#3a3531] text-center"
            />
          </div>

          <div className="flex items-center justify-between col-span-2 py-2">
            <span>Confirmación automática</span>
            <ToggleSwitch
              value={data.confirmacionAutomatica}
              onChange={(v) => handleChange("confirmacionAutomatica", v)}
            />
          </div>
        </div>
      </SettingsCard>

      {/* Notificaciones */}
      <SettingsCard
        title="Notificaciones al cliente"
        descripcion="Configura correos y mensajes automáticos."
      >
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center justify-between col-span-2 py-2">
            <span>Recordatorio por correo</span>
            <ToggleSwitch
              value={data.recordatorioCorreo}
              onChange={(v) => handleChange("recordatorioCorreo", v)}
            />
          </div>

          <div className="flex items-center justify-between col-span-2 py-2">
            <span>Mensaje de agradecimiento</span>
            <ToggleSwitch
              value={data.mensajeAgradecimiento}
              onChange={(v) => handleChange("mensajeAgradecimiento", v)}
            />
          </div>

          <div className="col-span-2">
            <label className="block mb-1 text-sm">
              Nombre del remitente en correos
            </label>
            <input
              type="text"
              value={data.remitenteCorreo}
              onChange={(e) => handleChange("remitenteCorreo", e.target.value)}
              className="w-full p-2 rounded-md bg-[#2b2724] border border-[#3a3531]"
            />
          </div>

          <div className="col-span-2">
            <label className="block mb-1 text-sm">
              Texto breve del recordatorio
            </label>
            <textarea
              rows="3"
              value={data.textoRecordatorio}
              onChange={(e) =>
                handleChange("textoRecordatorio", e.target.value)
              }
              className="w-full p-2 rounded-md bg-[#2b2724] border border-[#3a3531]"
            />
          </div>
        </div>
      </SettingsCard>

      <div className="flex justify-end gap-3 mt-5">
        <button
          onClick={handleReset}
          className="px-4 py-2 rounded-md bg-[#3a3531] hover:bg-[#4a4541]"
        >
          Restablecer valores
        </button>

        <button
          onClick={handleGuardar}
          className="px-4 py-2 rounded-md bg-[#bfa16a] text-black font-semibold hover:bg-[#d4bb7d]"
        >
          Guardar ajustes
        </button>
      </div>
    </div>
  );
}
