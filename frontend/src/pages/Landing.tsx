import { Link } from "react-router-dom";
import { useEffect } from "react";
import { landingFeatures, sampleRecipes, steps } from "../constants";

export default function Landing() {
  useEffect(() => {
    document.title = "Z Recipes – Share & Discover Delicious Recipes";
  }, []);

  return (
    <div className="min-h-screen w-full bg-theme text-theme-secondary flex flex-col transition-colors duration-200">

      <section className="flex-1 flex flex-col items-center justify-center text-center px-6 py-24">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 text-amber-500 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
            <span>🍊</span> Community Recipe Sharing
          </div>

          <h1 className="text-5xl sm:text-6xl font-extrabold leading-tight mb-6 text-theme-primary">
            Discover & Share
            <span className="block text-amber-500">Delicious Recipes</span>
          </h1>

          <p className="text-lg text-theme-muted mb-10 max-w-xl mx-auto leading-relaxed">
            Join a community of home cooks. Post your favourite recipes,
            discover new dishes, and save the ones you love — all in one place.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/sign-up"
              className="w-full sm:w-auto px-8 py-3.5 bg-amber-500 hover:bg-amber-400 text-gray-950 font-bold rounded-xl text-base transition-colors shadow-lg shadow-amber-500/20"
            >
              Get Started
            </Link>
            <Link
              to="/login"
              className="w-full sm:w-auto px-8 py-3.5 border border-theme text-theme-secondary hover:text-theme-primary font-medium rounded-xl text-base transition-colors"
            >
              Sign In
            </Link>
          </div>
        </div>
      </section>

      <section className="border-y border-theme-subtle bg-theme-surface py-8 px-6">
        <div className="max-w-4xl mx-auto grid grid-cols-3 gap-4 text-center">
          {[
            { value: "500+", label: "Recipes Shared" },
            { value: "200+", label: "Home Cooks" },
            { value: "1 k+", label: "Favourites Saved" },
          ].map((s) => (
            <div key={s.label}>
              <p className="text-2xl sm:text-3xl font-extrabold text-amber-500">{s.value}</p>
              <p className="text-xs sm:text-sm text-theme-muted mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 px-6 bg-theme-alt">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-extrabold text-theme-primary mb-3">
            Everything you need
          </h2>
          <p className="text-theme-muted text-sm max-w-md mx-auto">
            A simple, focused set of features built around sharing the food you love.
          </p>
        </div>
        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6">
          {landingFeatures.map((f) => (
            <div
              key={f.title}
              className="bg-theme-surface border border-theme-subtle rounded-2xl p-6 flex flex-col items-center gap-4 text-center shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="text-4xl">{f.icon}</div>
              <h3 className="text-base font-semibold text-theme-primary">{f.title}</h3>
              <p className="text-sm text-theme-muted leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-extrabold text-theme-primary mb-3">
            How it works
          </h2>
          <p className="text-theme-muted text-sm max-w-md mx-auto">
            Up and running in three easy steps.
          </p>
        </div>
        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8">
          {steps.map((s) => (
            <div key={s.num} className="flex flex-col items-center text-center gap-3">
              <span className="text-5xl font-black text-amber-500/20 leading-none select-none">
                {s.num}
              </span>
              <h3 className="text-base font-semibold text-theme-primary">{s.title}</h3>
              <p className="text-sm text-theme-muted leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 px-6 bg-theme-alt">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-extrabold text-theme-primary mb-3">
            What's cooking?
          </h2>
          <p className="text-theme-muted text-sm max-w-md mx-auto">
            A taste of what the community is sharing right now.
          </p>
        </div>
        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6">
          {sampleRecipes.map((r) => (
            <div
              key={r.title}
              className="bg-theme-surface border border-theme-subtle rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="h-32 bg-amber-500/10 flex items-center justify-center text-6xl">
                {r.emoji}
              </div>
              <div className="p-4">
                <span className="text-xs font-medium text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded-full">
                  {r.tag}
                </span>
                <h4 className="text-sm font-semibold text-theme-primary mt-2 mb-1">
                  {r.title}
                </h4>
                <div className="flex items-center justify-between text-xs text-theme-muted">
                  <span>by {r.author}</span>
                  <span>⏱ {r.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-2xl mx-auto text-center bg-theme-surface border border-theme-subtle rounded-3xl p-10 shadow-sm">
          <div className="text-4xl mb-4">🍽️</div>
          <h2 className="text-3xl font-extrabold text-theme-primary mb-3">
            Ready to start cooking?
          </h2>
          <p className="text-theme-muted text-sm mb-8">
            Join Z Recipes today and become part of a growing community of food lovers.
          </p>
          <Link
            to="/sign-up"
            className="inline-block px-10 py-3.5 bg-amber-500 hover:bg-amber-400 text-gray-950 font-bold rounded-xl transition-colors shadow-lg shadow-amber-500/20"
          >
            Create Free Account
          </Link>
        </div>
      </section>

      <footer className="border-t border-theme-subtle py-6 text-center text-sm text-theme-muted">
        © {new Date().getFullYear()} Z Recipes. All rights reserved.
      </footer>
    </div>
  );
}
