import { useState } from "react";

type Theme = "dark" | "light";

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.classList.remove("dark", "light");
  root.classList.add(theme);
  localStorage.setItem("theme", theme);
}

export function useTheme() {
  const [isDark, setIsDark] = useState(
    () => (localStorage.getItem("theme") || "dark") === "dark"
  );

  const toggleTheme = () => {
    const next: Theme = isDark ? "light" : "dark";
    applyTheme(next);
    setIsDark(next === "dark");
  };

  return { isDark, toggleTheme };
}
