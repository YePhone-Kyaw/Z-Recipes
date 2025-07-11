import { useEffect, useState } from "react";
import type { Recipe } from "../components/RecipeCard";
import  RecipeCard from "../components/RecipeCard";

export default function Home() {


    const [recipes, setRecipes] = useState<Recipe[]>([]);


  useEffect(() => {
    const fetchRecipes = async () => {
      const response = await fetch("http://localhost:4000/api/recipes");
      if (response.ok) {
        const data = await response.json();
        setRecipes(data);
      }
    };
    fetchRecipes();
  }, []);
  return (
    <div className="min-h-screen p-4">
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {recipes.length && recipes.map((recipe) => (
          <RecipeCard key={recipe._id} recipe={recipe}/>
        ))}
      </div>
    </div>
  );
}
