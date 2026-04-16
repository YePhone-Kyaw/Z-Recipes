import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "../helpers/axios";
import { useAuth } from "../hooks/useAuth";

export default function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
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
        { to: "/", label: "Home" },
        { to: "/about", label: "About" },
        { to: "/favourites", label: "Favourites" },
        { to: "/profile", label: "Profile" },
        { to: "/recipes/create", label: "Create Recipe" },
      ]
    : [
        { to: "/login", label: "Sign in" },
        { to: "/sign-up", label: "Sign up" },
      ];

  const isActive = (path: string) =>
    location.pathname === path;

  const linkClass = (path: string) =>
    `px-4 py-2 rounded-lg transition-colors duration-200 font-medium block text-sm ${
      isActive(path)
        ? "bg-amber-500 text-white"
        : "hover:bg-gray-800 hover:text-amber-200 text-gray-200"
    }`;

  return (
    <nav className="bg-gray-900 text-gray-100 px-6 py-3 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="text-xl font-extrabold tracking-wide text-amber-400 flex items-center gap-2 hover:text-amber-300 transition-colors">
          <span role="img" aria-label="orange">🍊</span>
          Z-Recipes
        </Link>

        <div className="hidden lg:flex items-center gap-1">
          <ul className="flex items-center gap-1">
            {navLinks.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className={linkClass(link.to)}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {user && (
            <div className="flex items-center gap-3 ml-4 pl-4 border-l border-gray-700">
              <span className="text-sm text-amber-300 font-semibold">{user.name}</span>
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-lg text-sm font-medium bg-gray-800 hover:bg-red-900/50 hover:text-red-300 text-gray-300 transition-colors duration-200"
              >
                Log out
              </button>
            </div>
          )}
        </div>

        <button
          className="lg:hidden flex flex-col justify-center items-center gap-1.5 p-2 rounded hover:bg-gray-800 transition-colors"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-0.5 bg-gray-100 transition-transform duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-6 h-0.5 bg-gray-100 transition-opacity duration-300 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-0.5 bg-gray-100 transition-transform duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {menuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/40 z-40"
          onClick={() => setMenuOpen(false)}
        />
      )}

      <ul
        className={`absolute lg:hidden left-0 right-0 top-full bg-gray-900/98 z-50 px-4 transition-all duration-300 ease-in-out
          ${menuOpen ? "opacity-100 translate-y-0 pointer-events-auto pb-4" : "opacity-0 -translate-y-2 pointer-events-none"}`}
      >
        {user && (
          <li className="px-4 py-3 border-b border-gray-700 mb-2 text-amber-300 font-semibold text-sm">
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
          <li className="mt-2 pt-2 border-t border-gray-700">
            <button
              onClick={() => { setMenuOpen(false); handleLogout(); }}
              className="w-full text-left px-4 py-2 rounded-lg text-sm font-medium text-gray-300 hover:bg-red-900/50 hover:text-red-300 transition-colors duration-200"
            >
              Log out
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
}
