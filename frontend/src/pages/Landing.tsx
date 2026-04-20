import { Link } from "react-router-dom";
import { useEffect } from "react";

export default function Landing() {

  useEffect(() => {
    document.title = "Z Recipes – Share & Discover Delicious Recipes";
  }, []);

  return (
    <div className="min-h-screen w-full bg-gray-950 text-white flex flex-col">
      <section className="flex-1 flex flex-col items-center justify-center text-center px-6 py-20">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
            <span>🍊</span> Community Recipe Sharing
          </div>

          <h1 className="text-5xl sm:text-6xl font-extrabold leading-tight mb-6">
            Discover & Share
            <span className="block text-amber-400">Delicious Recipes</span>
          </h1>

          <p className="text-lg text-gray-400 mb-10 max-w-xl mx-auto">
            Join a community of home cooks. Post your favourite recipes,
            discover new dishes, and save the ones you love — all in one place.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/sign-up"
              className="w-full sm:w-auto px-8 py-3.5 bg-amber-500 hover:bg-amber-400 text-gray-950 font-bold rounded-xl text-base transition-colors shadow-lg shadow-amber-500/20"
            >
              Get Started
            </Link>
            <Link
              to="/login"
              className="w-full sm:w-auto px-8 py-3.5 border border-gray-700 hover:border-gray-500 text-gray-300 hover:text-white font-medium rounded-xl text-base transition-colors"
            >
              Sign In
            </Link>
          </div>
        </div>
      </section>

      <section className="border-t border-gray-800 py-16 px-6">
        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          <div className="flex flex-col items-center gap-3">
            <div className="text-3xl">📖</div>
            <h3 className="text-base font-semibold text-white">
              Browse Recipes
            </h3>
            <p className="text-sm text-gray-500">
              Explore hundreds of recipes shared by home cooks from all around
              the world.
            </p>
          </div>
          <div className="flex flex-col items-center gap-3">
            <div className="text-3xl">❤️</div>
            <h3 className="text-base font-semibold text-white">
              Save Favourites
            </h3>
            <p className="text-sm text-gray-500">
              Heart any recipe to save it to your personal favourites list for
              quick access.
            </p>
          </div>
          <div className="flex flex-col items-center gap-3">
            <div className="text-3xl">✍️</div>
            <h3 className="text-base font-semibold text-white">
              Share Your Own
            </h3>
            <p className="text-sm text-gray-500">
              Post your own recipes with photos, ingredients, and step-by-step
              instructions.
            </p>
          </div>
        </div>
      </section>

      <footer className="border-t border-gray-800 py-6 text-center text-sm text-gray-600">
        © {new Date().getFullYear()} Z Recipes. All rights reserved.
      </footer>
    </div>
  );
}
