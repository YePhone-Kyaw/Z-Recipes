import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <nav className="bg-gray-900 text-gray-100 px-6 py-3 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold tracking-wide text-pink-300 flex items-center gap-2">
            <span role="img" aria-label="cake">🍰</span> Z-Recipes
          </h1>
        </div>
        <ul className="flex space-x-8 items-center">
          <li>
            <Link to="/" className="hover:bg-gray-800 hover:text-pink-200 px-4 py-2 rounded transition-colors duration-200 font-medium">Home</Link>
          </li>
          <li>
            <Link to="/about" className="hover:bg-gray-800 hover:text-pink-200 px-4 py-2 rounded transition-colors duration-200 font-medium">About</Link>
          </li>
          <li>
            <Link to="/contact" className="hover:bg-gray-800 hover:text-pink-200 px-4 py-2 rounded transition-colors duration-200 font-medium">Contact</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
