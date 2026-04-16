import type { Recipe } from "../components/RecipeCard";

interface RecipeCardProps {
  recipe: Recipe;
  onDeleted?: (id: string) => void;
  showActions?: boolean;
  isFavourited?: boolean;
  onFavouriteToggle?: (id: string) => void;
}

export type { RecipeCardProps as default };
