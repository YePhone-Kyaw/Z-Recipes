export type Recipe = {
    _id: string;
    title: string;
    description: string;
    ingredients: string[];
    createdAt: string;
}

export default function RecipeCard({ recipe } : { recipe : Recipe  }) {
   
  return (
    <div
          key={recipe._id}
            className="bg-white rounded-xl shadow-lg p-6 flex flex-col hover:shadow-2xl transition-shadow duration-200 border border-pink-100"
          >
            <h2 className="text-xl font-bold text-pink-600 mb-2 flex items-center gap-2">
              <span role="img" aria-label="cake">
                🍰
              </span>{" "}
              {recipe.title}
            </h2>
            <p className="text-gray-700 mb-3">{recipe.description}</p>
            <div className="mb-3">
              <span className="block text-sm font-semibold text-gray-500 mb-1">
                Ingredients:
              </span>
              <ul className="list-disc list-inside text-gray-800 text-sm space-y-1">
                {!!recipe.ingredients.length && recipe.ingredients.map((ingredient, i) => (
                  <li key={i}>{ingredient}</li>
                ))}
              </ul>
            </div>
            <div className="mt-auto text-xs text-gray-400 pt-2 border-t border-pink-50">
              Posted: {(recipe.createdAt)}
            </div>
          </div>
  )
}
