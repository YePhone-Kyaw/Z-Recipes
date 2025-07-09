
const recipes = [
  {
    title: "Strawberry Cake",
    description: "How to make a strawberry cake",
    ingredients: ["Flour", "Strawberry", "Eggs"],
    postedAt: "2024-06-01T10:30:00Z"
  },
  {
    title: "Chocolate Chip Cookies",
    description: "How to make classic chocolate chip cookies",
    ingredients: ["Flour", "Sugar", "Butter", "Eggs", "Chocolate Chips"],
    postedAt: "2024-06-02T14:15:00Z"
  },
  {
    title: "Banana Pancakes",
    description: "How to make fluffy banana pancakes",
    ingredients: ["Flour", "Banana", "Eggs", "Milk", "Baking Powder"],
    postedAt: "2024-06-03T08:00:00Z"
  }
];

function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  return date.toLocaleString(undefined, {
    year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
  });
}

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-pink-100 py-10 px-4">
      <div className="max-w-5xl mx-auto grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {recipes.map((recipe, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl shadow-lg p-6 flex flex-col hover:shadow-2xl transition-shadow duration-200 border border-pink-100"
          >
            <h2 className="text-xl font-bold text-pink-600 mb-2 flex items-center gap-2">
              <span role="img" aria-label="cake">🍰</span> {recipe.title}
            </h2>
            <p className="text-gray-700 mb-3">{recipe.description}</p>
            <div className="mb-3">
              <span className="block text-sm font-semibold text-gray-500 mb-1">Ingredients:</span>
              <ul className="list-disc list-inside text-gray-800 text-sm space-y-1">
                {recipe.ingredients.map((ing, i) => (
                  <li key={i}>{ing}</li>
                ))}
              </ul>
            </div>
            <div className="mt-auto text-xs text-gray-400 pt-2 border-t border-pink-50">
              Posted: {formatDate(recipe.postedAt)}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
