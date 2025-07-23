import { useCallback, useEffect, useState } from "react";
import type { Recipe } from "../components/RecipeCard";
import RecipeCard from "../components/RecipeCard";
import Pagination from "../components/Pagination";
import { useLocation, useNavigate } from "react-router-dom";

export default function Home() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [links, setLinks] = useState(null);

  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search);
  const pageUrl = searchQuery.get("page");
  const page = Number(pageUrl);
  const navigate = useNavigate();

  const fetchRecipes = useCallback(async () => {
    const response = await fetch(
      "http://localhost:4000/api/recipes?page=" + page
    );
    if (response.ok) {
      const data = await response.json();
      setLinks(data.links);
      setRecipes(data.data);
      window.scroll({ top: 0, left: 0, behavior: "smooth" });
    }
  }, [page]);

  useEffect(() => {
    fetchRecipes();
  }, [fetchRecipes]);

  const onDeleted = (id: string) => {
    //handle delete on client side
    if (recipes.length === 1 && page > 1) {
      navigate("/?page=" + (page - 1));
    } else {
      setRecipes((prevState) =>
        prevState.filter((recipe) => recipe._id !== id)
      );
      fetchRecipes();
    }
  };
  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-amber-50 to-lime-100 pt-16 px-5">
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 my-10">
        {!!recipes.length &&
          recipes.map((recipe) => (
            <RecipeCard
              key={recipe._id}
              recipe={recipe}
              onDeleted={onDeleted}
            />
          ))}
      </div>
      {!!links && <Pagination links={links} page={page || 1} />}
    </div>
  );
}
