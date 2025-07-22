import { Link } from "react-router-dom";

export default function LoginForm() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 to-lime-100 py-10 px-2">
      <form className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md border border-amber-100">
        <h2 className="text-3xl font-bold text-amber-600 mb-6 text-center flex items-center gap-2 justify-center">
          <span role="img" aria-label="sparkles">✨</span> Welcome Back
        </h2>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1 text-gray-700">Email</label>
          <input
            type="email"
            className="w-full px-4 py-2 border border-amber-200 rounded focus:outline-none focus:ring-2 focus:ring-amber-300 bg-amber-50 placeholder-amber-300"
            placeholder="you@email.com"
            autoComplete="off"
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-semibold mb-1 text-gray-700">Password</label>
          <input
            type="password"
            className="w-full px-4 py-2 border border-amber-200 rounded focus:outline-none focus:ring-2 focus:ring-amber-300 bg-amber-50 placeholder-amber-300"
            placeholder="••••••••"
            autoComplete="off"
          />
        </div>
        <button
          type="button"
          className="w-full bg-amber-500 hover:bg-lime-500 text-white font-bold py-2 rounded-lg shadow transition-colors duration-200 text-lg mb-4"
        >
          Log In
        </button>
        <div className="text-center text-sm text-gray-500 mt-2">
          Don't have an account? <Link to="/sign-up" className="text-amber-600 hover:text-lime-600 hover:underline font-semibold">Sign up</Link>
        </div>
      </form>
    </div>
  );
} 