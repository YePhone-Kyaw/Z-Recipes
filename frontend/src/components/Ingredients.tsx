export default function Ingredients({ ingredients }: { ingredients: string[] }) {
  return (
    <ul className="flex flex-wrap items-center gap-2 max-w-full text-gray-800 text-xs">
      {ingredients.map((ingredient, i) => (
        <li
          className="bg-pink-200 px-3 py-1 rounded-full shadow-sm text-pink-900 font-medium whitespace-nowrap"
          key={i}
        >
          {ingredient}
        </li>
      ))}
    </ul>
  );
}
