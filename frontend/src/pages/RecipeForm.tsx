import { useState } from "react";
import plus from "../assets/plus.svg";
import Ingredients from "../components/Ingredients";

export default function RecipeForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [newIngredient, setNewIngredient] = useState("");

  const addIngredient = () => {
    setIngredients((prevState) => [newIngredient, ...prevState]);
    setNewIngredient("");
  };

  const createRecipe = (e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const recipe = {
      title,
      description,
      ingredients
    }
    console.log(recipe);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-pink-100 py-10 px-2">
      <form className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-lg border border-pink-100" onSubmit={createRecipe}>
        <h2 className="text-2xl font-bold text-pink-600 mb-6 text-center flex items-center gap-2 justify-center">
          <span role="img" aria-label="cake">
            🍰
          </span>{" "}
          Add a New Recipe
        </h2>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1 text-gray-700">
            Title
          </label>
          <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
            type="text"
            className="w-full px-4 py-2 border border-pink-200 rounded focus:outline-none focus:ring-2 focus:ring-pink-300"
            placeholder="e.g. Strawberry Cake"
            // required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1 text-gray-700">
            Description
          </label>
          <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 border border-pink-200 rounded focus:outline-none focus:ring-2 focus:ring-pink-300 resize-none min-h-[80px]"
            placeholder="How to make this recipe..."
            // required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1 text-gray-700">
            Ingredients
          </label>
          <div className=" flex items-center gap-3">
            <input
              value={newIngredient}
              onChange={(e) => setNewIngredient(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addIngredient();
                }
              }}
              type="text"
              className="w-full px-4 py-2 border border-pink-200 rounded focus:outline-none focus:ring-2 focus:ring-pink-300"
              placeholder="Ingredients"
              // required
            />
            <img
              className="cursor-pointer"
              src={plus}
              onClick={addIngredient}
            />
          </div>
          <div className="flex gap-2 mt-5">
            <h4>Ingredients - </h4>
            <Ingredients ingredients={ingredients} />
          </div>
        </div>
        <div className="mb-6">
          <label className="block text-sm font-semibold mb-1 text-gray-700">
            Image (optional)
          </label>
          <input
            type="file"
            accept="image/*"
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-pink-50 file:text-pink-700 hover:file:bg-pink-100"
          />
        </div>
        <div className="flex gap-5 items-center">
        <button
            type="submit"
            className="w-full bg-white border border-pink-300 text-pink-500 hover:bg-pink-50 font-bold py-2 rounded-lg shadow transition-colors duration-200 text-lg mt-2"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 rounded-lg shadow transition-colors duration-200 text-lg"
          >
            Submit Recipe
          </button>
          
        </div>
      </form>
    </div>
  );
}
