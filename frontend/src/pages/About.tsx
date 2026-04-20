import { useEffect } from "react";
import { features } from "../constants";

export default function About() {
  useEffect(() => {
    document.title = "Z Recipes | About"
  }, []);
  return (
    <div className="min-h-screen bg-theme">
      <div className="bg-gradient-to-r from-amber-500 to-orange-400 py-16 px-6 text-center shadow-md">
        <div className="text-6xl mb-4">🍊</div>
        <h1 className="text-4xl font-extrabold text-white drop-shadow mb-3 tracking-tight">
          About Z-Recipes
        </h1>
        <p className="text-amber-100 max-w-xl mx-auto text-base leading-relaxed">
          A cozy place for food lovers to share, discover, and save recipes from around the world.
        </p>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-14">
        <div className="bg-theme-surface rounded-2xl shadow-sm border border-theme p-8 mb-10 text-center">
          <h2 className="text-2xl font-bold text-theme-primary mb-4">
            Our Story 🍳
          </h2>
          <p className="text-theme-muted leading-relaxed max-w-2xl mx-auto">
            Z-Recipes was built with one simple goal — make it easy for home cooks to share their passion.
            Whether it's your grandma's secret soup or a trendy new dessert, every recipe tells a story.
            We believe good food brings people together, and this platform is here to help that happen.
          </p>
        </div>

        <h2 className="text-2xl font-bold text-theme-primary text-center mb-8">
          What You Can Do ✨
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-14">
          {features.map((f) => (
            <div
              key={f.title}
              className="bg-theme-surface rounded-2xl border border-theme shadow-sm p-6 flex flex-col gap-3 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
            >
              <span className="text-3xl">{f.emoji}</span>
              <h3 className="font-bold text-theme-primary text-base">{f.title}</h3>
              <p className="text-theme-muted text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-amber-400 to-orange-400 rounded-2xl p-8 text-center text-white shadow-md">
          <h2 className="text-2xl font-extrabold mb-2">Hungry for more? 🍽️</h2>
          <p className="text-amber-100 mb-5 text-sm">
            Head back to the home page and explore what the community has been cooking.
          </p>
          <a
            href="/"
            className="inline-block bg-white text-amber-500 font-bold px-8 py-2.5 rounded-full shadow hover:bg-amber-50 transition-colors duration-200 text-sm"
          >
            Browse Recipes →
          </a>
        </div>
      </div>
    </div>
  );
}
