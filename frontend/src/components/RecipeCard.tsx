import axios from "../helpers/axios";
import Ingredients from "./Ingredients";
import { Bounce, toast, ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";
import type RecipeCardProps from "../types/RecipeCardProps";

export default function RecipeCard({
  recipe,
  onDeleted,
  showActions = false,
  isFavourited = false,
  onFavouriteToggle,
}: RecipeCardProps) {
  const handleDelete = async () => {
    const res = await axios.delete("/api/recipes/" + recipe._id);
    if (res.status === 200) {
      toast.success("Recipe was successfully deleted!");
      onDeleted?.(recipe._id);
    }
  };

  return (
    <div className="bg-theme-surface rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-theme flex flex-col group">
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

      <div className="relative h-52 bg-gradient-to-br from-amber-50 to-orange-100 dark:from-gray-700 dark:to-gray-800 overflow-hidden flex-shrink-0">
        {recipe.photo ? (
          <img
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            src={import.meta.env.VITE_BACKEND_ASSET_URL + recipe.photo}
            alt={recipe.title} 
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-7xl drop-shadow-sm">🍽️</span>
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

        {onFavouriteToggle && (
          <button
            onClick={() => onFavouriteToggle(recipe._id)}
            className="absolute top-3 right-3 w-9 h-9 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md hover:bg-white hover:scale-110 transition-all duration-200"
            title={isFavourited ? "Remove from favourites" : "Add to favourites"}
          >
            <svg
              className="w-5 h-5 transition-colors duration-200"
              fill={isFavourited ? "#ef4444" : "none"}
              stroke={isFavourited ? "#ef4444" : "#9ca3af"}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </button>
        )}
      </div>

      <div className="p-5 flex flex-col">
        <h2 className="text-lg font-bold text-theme-primary mb-1 leading-tight line-clamp-1">
          {recipe.title}
        </h2>
        <p className="text-theme-muted text-sm mb-4 line-clamp-2 leading-relaxed">
          {recipe.description}
        </p>

        <div className="mb-4">
          <p className="text-xs font-semibold text-theme-muted uppercase tracking-wider mb-2">
            Ingredients
          </p>
          <Ingredients ingredients={recipe.ingredients} />
        </div>

        <div className="mt-auto pt-3 border-t border-theme-subtle">
          <div className="flex w-full justify-between">
            <span className="text-xs text-gray-400 flex items-center gap-1">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {recipe.createdAt.split("T")[0]}
            </span>
            {recipe.author?.name && (
              <span className="text-xs text-gray-400 flex items-center gap-1">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                {recipe.author.name}
              </span>
            )}
          </div>

          {showActions && (
            <div className="flex gap-2 mt-5">
              <Link
                to={`/recipes/edit/${recipe._id}`}
                className="flex items-center gap-1 px-3 py-1 bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-700 rounded-full hover:bg-amber-100 dark:hover:bg-amber-900/50 transition-all duration-200 font-semibold text-xs"
                title="Edit Recipe"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 112.828 2.828L11.828 15.828a2 2 0 01-2.828 0L9 13z" />
                </svg>
                Edit
              </Link>
              <button
                onClick={handleDelete}
                className="flex items-center gap-1 px-3 py-1 bg-red-50 dark:bg-red-900/30 text-red-500 dark:text-red-400 border border-red-200 dark:border-red-700 rounded-full hover:bg-red-100 dark:hover:bg-red-900/50 transition-all duration-200 font-semibold text-xs"
                title="Delete Recipe"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
