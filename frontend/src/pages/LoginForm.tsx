import axios from "../helpers/axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../hooks/useAuth";


export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();
 const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
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
          login(response.data.user);
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
    <div className="min-h-screen flex items-center justify-center bg-theme py-10 px-2">
      <form
        onSubmit={handleLogin}
        className="bg-theme-surface rounded-2xl shadow-xl p-8 w-full max-w-md border border-theme"
      >
        <h2 className="text-3xl font-bold text-amber-600 mb-6 text-center flex items-center gap-2 justify-center">
          <span role="img" aria-label="sparkles">
            ✨
          </span>{" "}
          Welcome Back
        </h2>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1 text-theme-secondary">
            Email
          </label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            className="input-theme w-full px-4 py-2 border rounded"
            placeholder="you@email.com"
            autoComplete="off"
          />
          {error && (
            <div className="text-sm text-red-500">{error}</div>
          )}
        </div>
        <div className="mb-6">
          <label className="block text-sm font-semibold mb-1 text-theme-secondary">
            Password
          </label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className="input-theme w-full px-4 py-2 border rounded"
            placeholder="••••••••"
            autoComplete="off"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-amber-500 hover:bg-amber-400 text-white font-bold py-2 rounded-lg shadow transition-colors duration-200 text-lg mb-4"
        >
          Log In
        </button>
        <div className="text-center text-sm text-theme-muted mt-2">
          Don't have an account?{" "}
          <Link
            to="/sign-up"
            className="text-amber-500 hover:text-amber-400 hover:underline font-semibold"
          >
            Sign up
          </Link>
        </div>
      </form>
    </div>
  );
}
