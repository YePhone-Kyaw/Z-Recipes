import { useCallback, useEffect, useState } from "react";
import RecipeCard from "../components/RecipeCard";
import axios from "../helpers/axios";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import type { Recipe } from "../types/Recipe";

export default function Profile() {
  const { user } = useAuth();
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchMyRecipes = useCallback(async () => {
    const response = await axios.get("/api/recipes/myRecipes");
    if (response.status === 200) {
      setRecipes(response.data);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchMyRecipes();
  }, [fetchMyRecipes]);

  const onDeleted = (id: string) => {
    setRecipes((prev) => prev.filter((r) => r._id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-lime-50">
      <div className="bg-gradient-to-r from-amber-500 to-orange-400 py-10 px-6 text-center shadow-md">
        <div className="text-5xl mb-3">👨‍🍳</div>
        <h1 className="text-3xl font-extrabold text-white drop-shadow mb-1">
          Welcome, {user?.name}!
        </h1>
        <p className="text-amber-100 text-sm">Your personal recipe collection</p>
      </div>

      <div className="max-w-7xl mx-auto px-5 py-10">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-bold text-gray-700">
            My Recipes
            <span className="ml-2 text-sm font-normal text-gray-400">
              ({recipes.length} {recipes.length === 1 ? "recipe" : "recipes"})
            </span>
          </h2>
          <button
            onClick={() => navigate("/recipes/create")}
            className="bg-amber-500 hover:bg-amber-600 text-white font-bold px-5 py-2 rounded-full shadow text-sm transition-colors duration-200"
          >
            + New Recipe
          </button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-24">
            <div className="text-4xl animate-bounce">🍽️</div>
          </div>
        ) : recipes.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <span className="text-7xl mb-5">🍳</span>
            <h2 className="text-xl font-bold text-gray-500 mb-2">No recipes yet</h2>
            <p className="text-gray-400 text-sm mb-6">Start sharing your delicious creations!</p>
            <button
              onClick={() => navigate("/recipes/create")}
              className="bg-amber-500 hover:bg-amber-600 text-white font-bold px-7 py-2.5 rounded-full shadow text-sm transition-colors"
            >
              Create your first recipe →
            </button>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {recipes.map((recipe) => (
              <RecipeCard
                key={recipe._id}
                recipe={recipe}
                onDeleted={onDeleted}
                showActions={true}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
