import axios from "../helpers/axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const login = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      setError(null);

      const data = {
        email,
        password,
      };

      const response = await axios.post(
        "/api/users/login",
        data,
        { withCredentials: true }
      );
      if (response.status == 200) {
        toast.success("Welcome back!");
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    } catch (e) {
      if (axios.isAxiosError(e)) {
        setError(e.response?.data.error);
      }
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 to-lime-100 py-10 px-2">
      <form
        onSubmit={login}
        className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md border border-amber-100"
      >
        <h2 className="text-3xl font-bold text-amber-600 mb-6 text-center flex items-center gap-2 justify-center">
          <span role="img" aria-label="sparkles">
            ✨
          </span>{" "}
          Welcome Back
        </h2>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1 text-gray-700">
            Email
          </label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            className="w-full px-4 py-2 border border-amber-200 rounded focus:outline-none focus:ring-2 focus:ring-amber-300 bg-amber-50 placeholder-amber-300"
            placeholder="you@email.com"
            autoComplete="off"
          />
          {error && (
            <div className="text-sm text-red-500">{error}</div>
          )}
        </div>
        <div className="mb-6">
          <label className="block text-sm font-semibold mb-1 text-gray-700">
            Password
          </label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className="w-full px-4 py-2 border border-amber-200 rounded focus:outline-none focus:ring-2 focus:ring-amber-300 bg-amber-50 placeholder-amber-300"
            placeholder="••••••••"
            autoComplete="off"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-amber-500 hover:bg-lime-500 text-white font-bold py-2 rounded-lg shadow transition-colors duration-200 text-lg mb-4"
        >
          Log In
        </button>
        <div className="text-center text-sm text-gray-500 mt-2">
          Don't have an account?{" "}
          <Link
            to="/sign-up"
            className="text-amber-600 hover:text-lime-600 hover:underline font-semibold"
          >
            Sign up
          </Link>
        </div>
      </form>
    </div>
  );
}
