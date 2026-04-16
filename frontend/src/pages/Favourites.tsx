import { useCallback, useEffect, useState } from "react";
import RecipeCard from "../components/RecipeCard";
import type { Recipe } from "../components/RecipeCard";
import axios from "../helpers/axios";

export default function Favourites() {
  const [favourites, setFavourites] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchFavourites = useCallback(async () => {
    const response = await axios.get("/api/users/favourites");
    if (response.status === 200) {
      setFavourites(response.data);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchFavourites();
  }, [fetchFavourites]);

  const onFavouriteToggle = async (id: string) => {
    await axios.post(`/api/users/favourites/${id}`);
    setFavourites((prev) => prev.filter((r) => r._id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-lime-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-rose-400 to-pink-400 py-10 px-6 text-center shadow-md">
        <div className="text-5xl mb-3">❤️</div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white drop-shadow mb-2 tracking-tight">
          My Favourites
        </h1>
        <p className="text-rose-100 text-sm md:text-base max-w-md mx-auto">
          All the recipes you've loved — saved in one cozy spot.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-5 py-10">
        {loading ? (
          <div className="flex items-center justify-center py-24">
            <div className="text-4xl animate-bounce">🍽️</div>
          </div>
        ) : favourites.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <span className="text-7xl mb-5">🫶</span>
            <h2 className="text-xl font-bold text-gray-500 mb-2">No favourites yet</h2>
            <p className="text-gray-400 text-sm mb-6">
              Tap the ❤️ on any recipe from the home page to save it here.
            </p>
            <a
              href="/"
              className="inline-block bg-rose-400 hover:bg-rose-500 text-white font-bold px-7 py-2.5 rounded-full shadow transition-colors duration-200 text-sm"
            >
              Browse Recipes →
            </a>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {favourites.map((recipe) => (
              <RecipeCard
                key={recipe._id}
                recipe={recipe}
                showActions={false}
                isFavourited={true}
                onFavouriteToggle={onFavouriteToggle}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
