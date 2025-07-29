import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export default function NavBar() {
  // const { user } = useAuth();
  const auth = useContext(AuthContext);
  if (!auth) {
    return null;
  }
  const { user } = auth;
  console.log(user)
  
  return (
    <nav className="bg-gray-900 text-gray-100 px-6 py-3 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold tracking-wide text-amber-400 flex items-center gap-2">
            <span role="img" aria-label="orange">🍊</span> Z-Recipes
          </h1>
        </div>
        <ul className="flex space-x-8 items-center">
          <li>
            <Link to="/" className="hover:bg-gray-800 hover:text-amber-200 px-4 py-2 rounded transition-colors duration-200 font-medium">Home</Link>
          </li>
          <li>
            <Link to="/about" className="hover:bg-gray-800 hover:text-amber-200 px-4 py-2 rounded transition-colors duration-200 font-medium">About</Link>
          </li>
          <li>
            <Link to="/contact" className="hover:bg-gray-800 hover:text-amber-200 px-4 py-2 rounded transition-colors duration-200 font-medium">Contact</Link>
          </li>
          <li>
            <Link to="/recipes/create" className="hover:bg-gray-800 hover:text-amber-200 px-4 py-2 rounded transition-colors duration-200 font-medium">Create Recipe</Link>
          </li>
          <li>
            <Link to="/login" className="hover:bg-gray-800 hover:text-amber-200 px-4 py-2 rounded transition-colors duration-200 font-medium">Login</Link>
          </li>
          <li>
            <Link to="/sign-up" className="hover:bg-gray-800 hover:text-amber-200 px-4 py-2 rounded transition-colors duration-200 font-medium">Register</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
