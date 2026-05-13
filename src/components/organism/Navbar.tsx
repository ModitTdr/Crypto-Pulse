import { Activity, HomeIcon, LayoutDashboard, LogOut, Settings } from "lucide-react";
import { Link, NavLink, useNavigate } from "react-router"
import { logOut } from "@/features/authentication/services/authService";
import Button from "../atom/Button";

const Navbar = () => {
  const navigate = useNavigate();
  const navLinks = [
    { link: '/dashboard', label: 'Home', icon: HomeIcon },
    { link: '/portfolio', label: 'Portfolio', icon: LayoutDashboard },
    { link: '/settings', label: 'Settings', icon: Settings },
  ];

  const handleLogout = async () => {
    await logOut();
    navigate("/login");
  };

  return (
    <header className="w-full sticky top-0 z-50 bg-background/80 backdrop-blur-sm">
      <nav className="h-15 flex items-center justify-between px-10 border-b border-black/5">
        <Link to="/" className="font-bold tracking-[0.2em] uppercase flex items-center gap-2 font-sora">
          <Activity size={18} />
          Crypto<span className="opacity-30 -ml-2 font-sora">Pulse</span>
        </Link>

        <div className="flex items-center gap-10">
          <ul className="flex items-center gap-10">
            {navLinks.map((item) => (
              <li key={item.link}>
                <NavLink
                  to={item.link}
                  className={
                    ({ isActive }) =>
                      `text-xs font-bold uppercase tracking-[0.2em] transition-opacity duration-300
                       ${isActive ? 'opacity-100 text-primary' : 'opacity-30 hover:opacity-100'}`
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            className="w-auto p-0 opacity-30 hover:opacity-100 text-xs font-bold uppercase tracking-[0.2em] flex items-center gap-2"
          >
            <LogOut size={14} />
            Logout
          </Button>
        </div>
      </nav>
    </header>
  )
}

export default Navbar