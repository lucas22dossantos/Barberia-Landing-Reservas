import { useState } from "react";

export default function Servicios() {
  const [categoria, setCategoria] = useState("Todos");

  const [servicios, setServicios] = useState([
    {
      id: 1,
      nombre: "Corte clásico",
      descripcion: "Corte limpio con tijera y máquina, acabado sencillo.",
      precio: 15,
      duracion: 30,
      categoria: "Cortes",
      popular: true,
      activo: true,
    },
    {
      id: 2,
      nombre: "Corte degradado (fade)",
      descripcion: "Degradado a máquina con definición en contornos.",
      precio: 18,
      duracion: 40,
      categoria: "Cortes",
      popular: false,
      activo: true,
    },
    {
      id: 3,
      nombre: "Corte + barba",
      descripcion: "Corte completo y diseño de barba con navaja.",
      precio: 22,
      duracion: 45,
      categoria: "Paquetes",
      popular: false,
      activo: true,
    },
    {
      id: 4,
      nombre: "Arreglo de barba",
      descripcion: "Perfilado, recorte y acabado con toalla caliente.",
      precio: 12,
      duracion: 25,
      categoria: "Barba",
      popular: false,
      activo: true,
    },
    {
      id: 5,
      nombre: "Afeitado clásico",
      descripcion: "Afeitado a navaja con toalla caliente y productos premium.",
      precio: 14,
      duracion: 30,
      categoria: "Barba",
      popular: false,
      activo: true,
    },
    {
      id: 6,
      nombre: "Corte niño",
      descripcion: "Corte para menores de 12 años.",
      precio: 10,
      duracion: 25,
      categoria: "Cortes",
      popular: false,
      activo: true,
    },
  ]);

  const categorias = ["Todos", "Cortes", "Barba", "Paquetes"];

  const serviciosFiltrados =
    categoria === "Todos"
      ? servicios
      : servicios.filter((s) => s.categoria === categoria);

  const [modalEditar, setModalEditar] = useState(null);

  const guardarServicio = () => {
    setServicios((prev) =>
      prev.map((s) => (s.id === modalEditar.id ? modalEditar : s))
    );
    setModalEditar(null);
  };

  const eliminarServicio = (id) => {
    if (confirm("¿Seguro que deseas eliminar este servicio?")) {
      setServicios((prev) => prev.filter((s) => s.id !== id));
    }
  };

  return (
    <div className="text-white px-8 py-6">
      <h1 className="text-3xl font-bold mb-2">Selecciona tu servicio</h1>
      <p className="text-gray-400 mb-8">
        Elige uno o varios servicios para tu próxima cita.
      </p>

      <div className="bg-[#1a1816] p-6 rounded-2xl shadow-xl border border-[#bfa16a]/10">
        {/* FILTROS */}
        <div className="flex gap-3 mb-6">
          {categorias.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoria(cat)}
              className={`
                px-4 py-2 rounded-lg text-sm transition
                ${
                  categoria === cat
                    ? "bg-[#bfa16a] text-black font-semibold"
                    : "bg-[#2b2724] text-gray-300 hover:bg-[#3a3430]"
                }
              `}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* LISTA DE SERVICIOS */}
        <div className="space-y-4">
          {serviciosFiltrados.map((servicio) => (
            <div
              key={servicio.id}
              className="
                bg-[#1e1b19] p-5 rounded-xl flex justify-between items-center
                border border-transparent hover:border-[#bfa16a]/30
                hover:bg-[#25211f] transition cursor-pointer
              "
            >
              {/* INFO */}
              <div className="w-1/2">
                <h3 className="font-semibold text-lg">{servicio.nombre}</h3>
                <p className="text-gray-400 text-sm">{servicio.descripcion}</p>

                {servicio.popular && (
                  <span className="text-xs text-[#bfa16a] font-medium mt-1 inline-block">
                    ★ Popular
                  </span>
                )}
              </div>

              {/* PRECIO */}
              <div className="flex flex-col items-center w-24">
                <span className="bg-[#2a2522] px-3 py-1 rounded-lg font-semibold">
                  ${servicio.precio}
                </span>
              </div>

              {/* DURACIÓN */}
              <div className="flex flex-col items-center w-24">
                <span className="bg-[#2a2522] px-3 py-1 rounded-lg text-gray-300">
                  {servicio.duracion} min
                </span>
              </div>

              {/* ACCIONES */}
              <div className="flex flex-col gap-2 w-24 text-right">
                <button
                  onClick={() => setModalEditar(servicio)}
                  className="
      flex items-center justify-center
      px-3 py-1.5 rounded-md text-sm font-medium
      bg-[#35312d] text-gray-100
      border border-transparent
      hover:border-[#bfa16a]
      hover:text-[#bfa16a]
      transition-all duration-200
    "
                >
                  Editar
                </button>

                <button
                  onClick={() => eliminarServicio(servicio.id)}
                  className="
      flex items-center justify-center
      px-3 py-1.5 rounded-md text-sm font-medium
      bg-[#35312d] text-red-300
      border border-transparent
      hover:border-red-500
      hover:text-red-400
      transition-all duration-200
    "
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MODAL EDITAR */}
      {modalEditar && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4">
          <div className="bg-[#1c1a18] p-6 rounded-2xl w-[400px] border border-[#bfa16a]/20">
            <h2 className="text-xl mb-4 font-semibold">Editar servicio</h2>

            <input
              type="text"
              value={modalEditar.nombre}
              onChange={(e) =>
                setModalEditar({ ...modalEditar, nombre: e.target.value })
              }
              className="w-full bg-[#2b2724] p-3 rounded-lg mb-3 text-gray-200"
            />

            <textarea
              value={modalEditar.descripcion}
              onChange={(e) =>
                setModalEditar({
                  ...modalEditar,
                  descripcion: e.target.value,
                })
              }
              className="w-full bg-[#2b2724] p-3 rounded-lg mb-3 text-gray-200 h-24"
            />

            <input
              type="number"
              value={modalEditar.precio}
              onChange={(e) =>
                setModalEditar({ ...modalEditar, precio: +e.target.value })
              }
              className="w-full bg-[#2b2724] p-3 rounded-lg mb-3 text-gray-200"
            />

            <input
              type="number"
              value={modalEditar.duracion}
              onChange={(e) =>
                setModalEditar({ ...modalEditar, duracion: +e.target.value })
              }
              className="w-full bg-[#2b2724] p-3 rounded-lg mb-3 text-gray-200"
            />

            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={() => setModalEditar(null)}
                className="text-gray-300 hover:text-gray-200"
              >
                Cancelar
              </button>

              <button
                onClick={guardarServicio}
                className="
                  bg-[#bfa16a] text-black px-5 py-2 rounded-lg font-semibold
                  hover:bg-[#d8bc7f] transition
                "
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
