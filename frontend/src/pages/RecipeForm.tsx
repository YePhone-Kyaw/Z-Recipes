export default function RecipeForm() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-pink-100 py-10 px-2">
      <form
        className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-lg border border-pink-100"
      >
        <h2 className="text-2xl font-bold text-pink-600 mb-6 text-center flex items-center gap-2 justify-center">
          <span role="img" aria-label="cake">🍰</span> Add a New Recipe
        </h2>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1 text-gray-700">Title</label>
          <input
            type="text"
            className="w-full px-4 py-2 border border-pink-200 rounded focus:outline-none focus:ring-2 focus:ring-pink-300"
            placeholder="e.g. Strawberry Cake"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1 text-gray-700">Description</label>
          <textarea
            className="w-full px-4 py-2 border border-pink-200 rounded focus:outline-none focus:ring-2 focus:ring-pink-300 resize-none min-h-[80px]"
            placeholder="How to make this recipe..."
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1 text-gray-700">Ingredients</label>
          <div className="space-y-2">
            <input
              type="text"
              className="w-full px-4 py-2 border border-pink-200 rounded focus:outline-none focus:ring-2 focus:ring-pink-300"
              placeholder="Ingredient 1"
              required
            />
            <input
              type="text"
              className="w-full px-4 py-2 border border-pink-200 rounded focus:outline-none focus:ring-2 focus:ring-pink-300"
              placeholder="Ingredient 2"
              required
            />
            <input
              type="text"
              className="w-full px-4 py-2 border border-pink-200 rounded focus:outline-none focus:ring-2 focus:ring-pink-300"
              placeholder="Ingredient 3"
              required
            />
          </div>
        </div>
        <div className="mb-6">
          <label className="block text-sm font-semibold mb-1 text-gray-700">Image (optional)</label>
          <input
            type="file"
            accept="image/*"
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-pink-50 file:text-pink-700 hover:file:bg-pink-100"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 rounded-lg shadow transition-colors duration-200 text-lg"
        >
          Submit Recipe
        </button>
      </form>
    </div>
  );
}
