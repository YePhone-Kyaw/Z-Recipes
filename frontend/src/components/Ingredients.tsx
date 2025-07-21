interface IngredientsProps {
  ingredients: string[];
  onRemove?: (idx: number) => void;
}

export default function Ingredients({ ingredients, onRemove }: IngredientsProps) {
  return (
    <ul className="flex flex-wrap items-center gap-2 max-w-full text-gray-800 text-xs">
      {ingredients.map((ingredient, i) => (
        <li
          key={i}
          className={`bg-pink-200 px-3 py-1 rounded-full shadow-sm text-pink-900 font-medium whitespace-nowrap ${
            onRemove ? 'cursor-pointer hover:bg-pink-300 transition' : ''
          }`}
          onClick={onRemove ? () => onRemove(i) : undefined}
          title={onRemove ? "Remove ingredient" : undefined}
        >
          {ingredient}
          {onRemove && <span className="ml-1 text-pink-500 font-bold">&times;</span>}
        </li>
      ))}
    </ul>
  );
}
