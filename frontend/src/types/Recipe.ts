export type Recipe = {
  _id: string;
  title: string;
  photo: string;
  description: string;
  ingredients: string[];
  createdAt: string;
  author?: { _id: string; name: string };
};
