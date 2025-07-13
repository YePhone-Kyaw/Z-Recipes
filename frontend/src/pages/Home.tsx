import { useEffect, useState } from "react";
import type { Recipe } from "../components/RecipeCard";
import RecipeCard from "../components/RecipeCard";
import Pagination from "../components/Pagination";
import { useLocation } from "react-router-dom";

export default function Home() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search);
  const page = searchQuery.get("page");

  const links = {
    nextPage : true,
    previousPage : false,
    currentPage : 1,
    loopableLinks: [
      { number : 1 },
      { number : 2 },
      { number : 3 },
    ]
  }

  useEffect(() => {
    const fetchRecipes = async () => {
      const response = await fetch("http://localhost:4000/api/recipes?page="+page);
      if (response.ok) {
        const data = await response.json();
        setRecipes(data);
      }
    };
    fetchRecipes();
  }, [page]);
  return (
    <div className="min-h-screen p-4">
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {!!recipes.length &&
          recipes.map((recipe) => (
            <RecipeCard key={recipe._id} recipe={recipe} />
          ))}
      </div>
      <Pagination links={links} page={page} />
    </div>
  );
}
