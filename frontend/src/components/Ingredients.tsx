export default function Ingredients({ ingredients }: { ingredients: string[] }) {
  return (
    <ul className="list-disc list-inside text-gray-800 text-sm space-y-1">
      {!!ingredients.length &&
        ingredients.map((ingredient, i) => (
          <li key={i}>{ingredient}</li>
        ))}
    </ul>
  );
}
