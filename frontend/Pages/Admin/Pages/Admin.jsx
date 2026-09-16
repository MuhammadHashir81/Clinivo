import { useState } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import { api } from "../../../services/api";
// ---------- Sidebar ----------

const navItems = [
  { key: "dashboard", label: "Dashboard", icon: "icons.grid" },
  { key: "doctors", label: "Doctors", icon: "icons.grid" },
  { key: "receptionists", label: "Receptionists", icon: "icons.grid" },
  { key: "appointments", label: "Appointments", icon: "icons.grid" },
];

function Sidebar() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // ---------- Logout ----------

  const handleLogout = async () => { 
    try {
      const response = await api.post('/auth/logout')
      console.log(response)
      window.location.href = '/admin/sign-in'
    } catch (error) {
      console.log(error)
      
    }
    
  }

  return (
    <aside className="w-60 shrink-0 bg-card border-r border-border h-screen sticky top-0 flex flex-col">

      {/* ---------- Logo ---------- */}

      <div className="px-6 py-5 border-b border-border">
        <p className="text-xl font-semibold text-primary font-inter">
          Clinivo
        </p>

        <p className="text-xs text-muted-foreground mt-0.5">
          Admin panel
        </p>
      </div>

      {/* ---------- Navigation ---------- */}

      <nav className="flex-1 px-3 py-4 space-y-1">

        {navItems.map((item) => (
          <NavLink
            key={item.key}
            to={item.key}
            className={({ isActive }) =>
              `cursor-pointer w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition ${
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-foreground hover:bg-muted"
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}

      </nav>

      {/* ---------- Logout Button ---------- */}

      <div className="px-3 pb-3">

        <button
          onClick={handleLogout}
          disabled={loading}
          className=" cursor-pointer w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-500 hover:bg-red-500/10 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >

          <LogOut size={18} />

          <span>
            {loading ? "Logging out..." : "Logout"}
          </span>

        </button>

      </div>

      {/* ---------- Admin Profile ---------- */}

      <div className="px-4 py-4 border-t border-border">

        <div className="flex items-center gap-3">

          <div className="w-9 h-9 rounded-full bg-secondary text-primary flex items-center justify-center text-sm font-semibold font-inter">
            A
          </div>

          <div className="min-w-0">

            <p className="text-sm font-medium text-foreground truncate">
              Admin
            </p>

            <p className="text-xs text-muted-foreground truncate">
              admin@clinivo.pk
            </p>

          </div>

        </div>

      </div>

    </aside>
  );
}

// ---------- Admin Layout ----------

const Admin = () => {
  return (
    <div className="flex min-h-screen bg-background font-roboto">

      <Sidebar />

      <main className="flex-1 min-w-0">
        <Outlet />
      </main>

    </div>
  );
};

export default Admin;