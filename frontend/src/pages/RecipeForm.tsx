import { useCallback, useEffect, useState } from "react";
import plus from "../assets/plus.svg";
import Ingredients from "../components/Ingredients";
import axios from "../helpers/axios";
import { useNavigate, useParams } from "react-router-dom";
import { Bounce, toast, ToastContainer } from "react-toastify";

export default function RecipeForm() {
  const { id } = useParams();
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [newIngredient, setNewIngredient] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string[]>([]);
  const navigate = useNavigate();

  const fetchRecipes = useCallback(async () => {
    if (id) {
      const response = await axios.get("/api/recipes/" + id);
      if (response.status === 200) {
        const data = await response.data;
        setTitle(data.title);
        setDescription(data.description);
        setIngredients(data.ingredients);
      }
    }
  }, [id]);

  useEffect(() => {
    fetchRecipes();
  }, [fetchRecipes]);

  const addIngredient = () => {
    setIngredients((prevState) => [newIngredient, ...prevState]);
    setNewIngredient("");
  };

  const createRecipe = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const recipe = {
        title,
        description,
        ingredients,
      };

      //server request
      let res;
      if (id) {
        // Update api
        res = await axios.patch("/api/recipes/" + id, recipe);
      } else {
        // Create api
        res = await axios.post("/api/recipes", recipe);
      }

      // File send to backend
      if (file) {
        const formData = new FormData;
        formData.set("photo", file);
        // Image upload
        const uploadResponse = await axios.post(`/api/recipes/${res.data._id}/upload`, formData, {
          headers : {
            Accept : "multipart/form-data"
          }
        });
        console.log(uploadResponse);
      }

      
      if (res.status === 200) {
        if (id) {
          toast.success("Recipe updated successfully!");
        } else {
          toast.success("Recipe created successfully!");
        }
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    } catch (e) {
      if (axios.isAxiosError(e)) {
        setError(Object.keys(e.response?.data.errors));
      } else {
        console.error(e);
      }
    }
  };

  const upload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setFile(file);

    const fileReader = new FileReader();

    fileReader.onload = (e) => {
      const result = e.target?.result as string;
      setPreview(result);
    }

    fileReader.readAsDataURL(file);
  }

  return (
    <div className="flex items-center justify-center bg-gradient-to-br from-amber-50 to-lime-100 min-h-screen">
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
      <form
        className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-lg border border-amber-100 my-10"
        onSubmit={createRecipe}
      >
        <h2 className="text-2xl font-bold text-amber-600 mb-6 text-center flex items-center gap-2 justify-center">
          <span role="img" aria-label="cake">
            🍰
          </span>{" "}
          {id ? "Edit Your Recipe" : "Add a New Recipe"}
        </h2>
        {!!error.length && (
          <div className="mb-6 bg-amber-100 border border-amber-300 text-amber-700 rounded-lg px-4 py-3">
            <ul className="list-disc list-inside">
              {error.map((err, i) => (
                <li key={i}>{err} is invalid.</li>
              ))}
            </ul>
          </div>
        )}
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1 text-gray-700">
            Title
          </label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            className="w-full px-4 py-2 border border-amber-200 rounded focus:outline-none focus:ring-2 focus:ring-amber-300"
            placeholder="e.g. Strawberry Cake"
            // required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1 text-gray-700">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 border border-amber-200 rounded focus:outline-none focus:ring-2 focus:ring-amber-300 resize-none min-h-[80px]"
            placeholder="How to make this recipe..."
            // required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1 text-gray-700">
            Ingredients
          </label>
          <div className=" flex items-center gap-3">
            <input
              value={newIngredient}
              onChange={(e) => setNewIngredient(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addIngredient();
                }
              }}
              type="text"
              className="w-full px-4 py-2 border border-amber-200 rounded focus:outline-none focus:ring-2 focus:ring-amber-300"
              placeholder="Ingredients"
              // required
            />
            <img
              className="cursor-pointer"
              src={plus}
              onClick={addIngredient}
            />
          </div>
          <div className="flex flex-col gap-2 mt-5">
            <h4 className="font-semibold text-sm text-gray-700 mb-1">Ingredients</h4>
            <Ingredients
              ingredients={ingredients}
              onRemove={(idx: number) => setIngredients(ingredients.filter((_, i) => i !== idx))}
            />
          </div>
        </div>
        <div className="mb-6">
          <label className="block text-sm font-semibold mb-1 text-gray-700">
            Image (optional)
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={upload}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-amber-50 file:text-amber-700 hover:file:bg-amber-100"
          />
          {preview && <img src={preview} />}
        </div>
        <div className="flex gap-5 items-center">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="w-full bg-white border border-amber-300 text-amber-500 hover:bg-amber-50 font-bold py-2 rounded-lg shadow transition-colors duration-200 text-lg mt-2"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="w-full bg-amber-500 hover:bg-lime-500 text-white font-bold py-2 rounded-lg shadow transition-colors duration-200 text-lg"
          >
            {id ? "Update Recipe" : "Submit Recipe"}
          </button>
        </div>
      </form>
    </div>
  );
}
