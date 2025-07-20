import { useEffect, useState } from "react";
import type { Recipe } from "../components/RecipeCard";
import RecipeCard from "../components/RecipeCard";
import Pagination from "../components/Pagination";
import { useLocation } from "react-router-dom";

export default function Home() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [links, setLinks] = useState(null);
  
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search);
  const pageUrl = searchQuery.get("page"); 
  const page = Number(pageUrl);

  useEffect(() => {
    const fetchRecipes = async () => {
      const response = await fetch(
        "http://localhost:4000/api/recipes?page=" + page
      );
      if (response.ok) {
        const data = await response.json();
        setLinks(data.links);
        setRecipes(data.data);

        window.scroll({ top: 0, left: 0, behavior: "smooth" });
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
      {!!links && <Pagination links={links} page={ page || 1 } />}
    </div>
  );
}
