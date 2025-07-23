import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Bounce, toast, ToastContainer } from "react-toastify";

interface ApiError {
  name?: { msg : string };
  email?: { msg : string };
  password?: { msg : string };
  confirmPassword?: { msg : string };
}

export default function SignUpForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<ApiError | null>(null);

  const navigate = useNavigate();

  const register = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      setError(null);
    if (password !== confirmPassword) {
      setError({confirmPassword : {msg : "Passwords do not match!"}});
      return;
    }

    const data = {
      name,
      email,
      password,
    };

    const response = await axios.post(
      "http://localhost:4000/api/users/register", data, { withCredentials : true });
      if (response.status == 200) {
        toast.success('Your account has been successfully created!');
        setTimeout(() => {
          navigate('/');
        }, 2000);
      }
    } catch (e) {
      if (axios.isAxiosError(e)) {
        setError(e.response?.data.errors);
        
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 to-lime-100 py-10 px-2">
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
        onSubmit={register}
        className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md border border-amber-100"
      >
        <h2 className="text-3xl font-bold text-amber-600 mb-6 text-center flex items-center gap-2 justify-center">
          <span role="img" aria-label="sparkles">
            🍊
          </span>{" "}
          Create Your Account
        </h2>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1 text-gray-700">
            Name
          </label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            className="w-full px-4 py-2 border border-amber-200 rounded focus:outline-none focus:ring-2 focus:ring-amber-300 bg-amber-50 placeholder-amber-300"
            placeholder="Your Name"
            autoComplete="off"
          />
          {error?.name && <div className="text-red-500 text-sm mt-2">{error.name.msg}</div>}
        </div>
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
          {error?.email && <div className="text-red-500 text-sm mt-2">{error.email.msg}</div>}

        </div>
        <div className="mb-4">
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
          {error?.password && <div className="text-red-500 text-sm mt-2">{error.password.msg}</div>}

        </div>
        <div className="mb-6">
          <label className="block text-sm font-semibold mb-1 text-gray-700">
            Confirm Password
          </label>
          <input
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            type="password"
            className="w-full px-4 py-2 border border-amber-200 rounded focus:outline-none focus:ring-2 focus:ring-amber-300 bg-amber-50 placeholder-amber-300"
            placeholder="••••••••"
            autoComplete="off"
          />
          {error?.confirmPassword && <div className="text-red-500 text-sm mt-2">{error.confirmPassword.msg}</div>}
        </div>
        <button
          type="submit"
          className="w-full bg-amber-500 hover:bg-lime-500 text-white font-bold py-2 rounded-lg shadow transition-colors duration-200 text-lg mb-4"
        >
          Sign Up
        </button>
        <div className="text-center text-sm text-gray-500 mt-2">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-amber-600 hover:text-lime-600 hover:underline font-semibold"
          >
            Log in
          </Link>
        </div>
      </form>
    </div>
  );
}
