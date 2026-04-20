import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "../helpers/axios";
import { useAuth } from "../hooks/useAuth";
import { useTheme } from "../hooks/useTheme";

export default function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    const res = await axios.post("/api/users/logout");
    if (res.status == 200) {
      logout();
      navigate("/login");
    }
  };

  const navLinks = user
    ? [
        { to: "/about", label: "About" },
        { to: "/favourites", label: "Favourites" },
        { to: "/profile", label: "Profile" },
        { to: "/recipes/create", label: "Create Recipe" },
      ]
    : [
        { to: "/login", label: "Sign in" },
        { to: "/sign-up", label: "Sign up" },
      ];

  const isActive = (path: string) => location.pathname === path;

  const linkClass = (path: string) =>
    `px-4 py-2 rounded-lg transition-colors duration-200 font-medium block text-sm text-nav hover-nav ${
      isActive(path) ? "!bg-amber-500 !text-white" : ""
    }`;

  return (
    <nav className="bg-nav border-b border-nav px-6 py-4 sticky top-0 z-50 transition-colors duration-200">
      <div className="flex items-center justify-between">
        <Link
          to="/home"
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <img src="/logo.svg" className="w-20 object-contain" alt="Z-Recipes" />
          <span className="text-xl font-extrabold text-amber-500 tracking-wide">
            Z-Recipes
          </span>
        </Link>

        <div className="hidden lg:flex items-center gap-1">
          <ul className="flex items-center gap-1">
            <button
              onClick={toggleTheme}
              className="px-2 py-2 rounded-lg text-xl hover-nav transition-colors"
              aria-label="Toggle theme"
            >
              {isDark ? "☀️" : "🌙"}
            </button>
            {navLinks.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className={linkClass(link.to)}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {user && (
            <div className="flex items-center gap-3 ml-4 pl-4 border-l divider-nav">
              <span className="text-sm text-amber-500 font-semibold">
                {user.name}
              </span>
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-lg text-sm font-medium text-nav hover-nav hover:text-red-500 transition-colors duration-200"
              >
                Log out
              </button>
            </div>
          )}
        </div>

        <div className="lg:hidden flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="p-2 rounded hover-nav transition-colors text-xl"
            aria-label="Toggle theme"
          >
            {isDark ? "☀️" : "🌙"}
          </button>
          <button
            className="flex flex-col justify-center items-center gap-1.5 p-2 rounded hover-nav transition-colors"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            <span className={`block w-6 h-0.5 bar-nav transition-transform duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block w-6 h-0.5 bar-nav transition-opacity duration-300 ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block w-6 h-0.5 bar-nav transition-transform duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>
      </div>

      {menuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/40 z-40"
          onClick={() => setMenuOpen(false)}
        />
      )}

      <ul
        className={`absolute lg:hidden left-0 right-0 top-full bg-nav border-b border-nav z-50 px-4 transition-all duration-300 ease-in-out
          ${menuOpen ? "opacity-100 translate-y-0 pointer-events-auto pb-4" : "opacity-0 -translate-y-2 pointer-events-none"}`}
      >
        {user && (
          <li className="px-4 py-3 border-b divider-nav mb-2 text-amber-500 font-semibold text-sm">
            👋 {user.name}
          </li>
        )}
        {navLinks.map((link) => (
          <li key={link.to}>
            <Link
              to={link.to}
              className={linkClass(link.to) + " my-0.5"}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          </li>
        ))}
        {user && (
          <li className="mt-2 pt-2 border-t divider-nav">
            <button
              onClick={() => { setMenuOpen(false); handleLogout(); }}
              className="w-full text-left px-4 py-2 rounded-lg text-sm font-medium text-nav hover-nav hover:text-red-500 transition-colors duration-200"
            >
              Log out
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
}
