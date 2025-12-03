import { Outlet, NavLink } from "react-router-dom";

export default function AdminLayout() {
  return (
    <div className="flex min-h-screen bg-[#0f0f0f] text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-[#111] border-r border-[#222] p-6 flex flex-col">
        <h1 className="text-xl font-bold mb-8">BlackGold Admin</h1>

        <nav className="flex flex-col gap-2">
          <NavLink
            to="/admin"
            end
            className={({ isActive }) =>
              `p-3 rounded-lg text-sm ${
                isActive ? "bg-[#bfa16a] text-black" : "hover:bg-[#1b1b1b]"
              }`
            }
          >
            Panel general
          </NavLink>

          <NavLink
            to="/admin/citas"
            className={({ isActive }) =>
              `p-3 rounded-lg text-sm ${
                isActive ? "bg-[#bfa16a] text-black" : "hover:bg-[#1b1b1b]"
              }`
            }
          >
            Citas
          </NavLink>

          <NavLink
            to="/admin/servicios"
            className={({ isActive }) =>
              `p-3 rounded-lg text-sm ${
                isActive ? "bg-[#bfa16a] text-black" : "hover:bg-[#1b1b1b]"
              }`
            }
          >
            Servicios
          </NavLink>

          <NavLink
            to="/admin/ajustes"
            className={({ isActive }) =>
              `p-3 rounded-lg text-sm ${
                isActive ? "bg-[#bfa16a] text-black" : "hover:bg-[#1b1b1b]"
              }`
            }
          >
            Ajustes
          </NavLink>
        </nav>
      </aside>

      {/* Content */}
      <main className="flex-1 p-10">
        <Outlet />
      </main>
    </div>
  );
}
