import { useCallback, useEffect, useState } from "react";
import RecipeCard from "../components/RecipeCard";
import Pagination from "../components/Pagination";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../helpers/axios";
import type { Recipe } from "../types/Recipe";

export default function Home() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [links, setLinks] = useState(null);
  const [favouriteIds, setFavouriteIds] = useState<string[]>([]);

  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search);
  const pageUrl = searchQuery.get("page");
  const page = Number(pageUrl) ? Number(pageUrl) : 1;
  const navigate = useNavigate();

  const fetchRecipes = useCallback(async () => {
    const response = await axios.get("/api/recipes?page=" + page);
    if (response.status == 200) {
      const data = await response.data;
      setLinks(data.links);
      setRecipes(data.data);
      window.scroll({ top: 0, left: 0, behavior: "smooth" });
    }
  }, [page]);

  const fetchFavouriteIds = useCallback(async () => {
    const response = await axios.get("/api/users/favourites");
    if (response.status === 200) {
      const recipes = response.data;
      setFavouriteIds(recipes.map((recipe: Recipe) => recipe._id));
    }
  }, []);

  useEffect(() => {
    fetchRecipes();
    fetchFavouriteIds();
  }, [fetchRecipes, fetchFavouriteIds]);

  const onDeleted = (id: string) => {
    if (recipes.length === 1 && page > 1) {
      navigate("/?page=" + (page - 1));
    } else {
      setRecipes((prevState) => prevState.filter((recipe) => recipe._id !== id));
      fetchRecipes();
    }
  };

  const onFavouriteToggle = async (id: string) => {
    const response = await axios.post(`/api/users/favourites/${id}`);
    if (response.status === 200) {
      setFavouriteIds(response.data.favourites.map((id: { toString(): string } | string) => id.toString()));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-lime-50">
      <div className="bg-gradient-to-r from-amber-500 to-orange-400 py-10 px-6 text-center shadow-md">
        <h1 className="text-3xl md:text-4xl font-extrabold text-white drop-shadow mb-2 tracking-tight">
          🍊 Discover Delicious Recipes
        </h1>
        <p className="text-amber-100 text-sm md:text-base max-w-xl mx-auto">
          Handcrafted recipes from our community — find your next favourite dish.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-5 py-10">
        {recipes.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <span className="text-7xl mb-4">🍽️</span>
            <h2 className="text-xl font-bold text-gray-500 mb-2">No recipes yet</h2>
            <p className="text-gray-400 text-sm">Be the first to share something delicious!</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {recipes.map((recipe) => (
              <RecipeCard
                key={recipe._id}
                recipe={recipe}
                onDeleted={onDeleted}
                showActions={false}
                isFavourited={favouriteIds.includes(recipe._id)}
                onFavouriteToggle={onFavouriteToggle}
              />
            ))}
          </div>
        )}

        {!!links && (
          <div className="mt-12">
            <Pagination links={links} page={page || 1} />
          </div>
        )}
      </div>
    </div>
  );
}
