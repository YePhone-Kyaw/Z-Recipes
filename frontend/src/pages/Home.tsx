// const recipes = [
//   {
//     title: "Strawberry Cake",
//     description: "How to make a strawberry cake",
//     ingredients: ["Flour", "Strawberry", "Eggs"],
//     postedAt: "2024-06-01T10:30:00Z"
//   },
//   {
//     title: "Chocolate Chip Cookies",
//     description: "How to make classic chocolate chip cookies",
//     ingredients: ["Flour", "Sugar", "Butter", "Eggs", "Chocolate Chips"],
//     postedAt: "2024-06-02T14:15:00Z"
//   },
//   {
//     title: "Banana Pancakes",
//     description: "How to make fluffy banana pancakes",
//     ingredients: ["Flour", "Banana", "Eggs", "Milk", "Baking Powder"],
//     postedAt: "2024-06-03T08:00:00Z"
//   }
// ];
// function formatDate(dateStr: string) {
//   const date = new Date(dateStr);
//   return date.toLocaleString(undefined, {
//     year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
//   });
// }

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
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-pink-100 py-10 px-4">
      <div className="max-w-5xl mx-auto grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {recipes.length && recipes.map((recipe) => (
          <RecipeCard key={recipe._id} recipe={recipe}/>
        ))}
      </div>
    </div>
  );
}
