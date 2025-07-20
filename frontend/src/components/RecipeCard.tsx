import axios from "axios";
import Ingredients from "./Ingredients";
import { Bounce, toast, ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";

export type Recipe = {
  _id: string;
  title: string;
  description: string;
  ingredients: string[];
  createdAt: string;
};

export default function RecipeCard({
  recipe,
  onDeleted,
}: {
  recipe: Recipe;
  onDeleted: (id: string) => void;
}) {
  const handleDelete = async () => {
    const res = await axios.delete(
      "http://localhost:4000/api/recipes/" + recipe._id
    );
    if (res.status === 200) {
      toast.success("Recipe was successfully deleted!");
      onDeleted(recipe._id);
    }
  };
  return (
    <div
      key={recipe._id}
      className="bg-white rounded-xl shadow-lg p-6 flex flex-col hover:shadow-2xl transition-shadow duration-200 border border-pink-100"
    >
      <ToastContainer
        position="top-center"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Bounce}
      />
      <h2 className="text-xl font-bold text-pink-600 mb-2 flex items-center gap-2">
        <span role="img" aria-label="cake">
          🍰
        </span>{" "}
        {recipe.title}
      </h2>
      <p className="text-gray-700 mb-3">{recipe.description}</p>
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <span className="block text-sm font-semibold text-gray-500 mb-1">
          Ingredients:
        </span>
        <Ingredients ingredients={recipe.ingredients} />
      </div>
      <div className="mt-auto text-xs text-gray-400 pt-2 border-t border-pink-50 flex items-center justify-between">
        <span>Posted: {recipe.createdAt}</span>
        <div className="flex gap-2">
          <Link
            to={`/recipes/edit/${recipe._id}`}
            className="flex items-center gap-1 px-3 py-1 bg-pink-50 text-pink-500 border border-pink-200 rounded-full shadow hover:bg-pink-100 hover:text-pink-700 transition-all duration-200 font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-pink-200"
            title="Edit Recipe"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 112.828 2.828L11.828 15.828a2 2 0 01-2.828 0L9 13z" />
            </svg>
            Edit
          </Link>
          <button
            onClick={handleDelete}
            className="flex items-center gap-1 px-3 py-1 bg-pink-100 text-pink-600 border border-pink-300 rounded-full shadow hover:bg-pink-200 hover:text-pink-700 transition-all duration-200 font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-pink-300"
            title="Delete Recipe"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
