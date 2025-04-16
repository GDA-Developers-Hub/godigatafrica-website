"use client";

import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggleButton() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <button
      onClick={toggleTheme}
      className="relative w-14 h-7 rounded-full bg-gray-700 flex items-center p-1 cursor-pointer transition-colors"
    >
      <div
        className={`w-5 h-5 rounded-full flex items-center justify-center transition-transform duration-300 ${
          theme === "dark" ? "bg-gray-300 text-gray-800 translate-x-7" : "bg-amber-400 text-amber-800"
        }`}
      >
        {theme === "dark" ? <Moon size={13} /> : <Sun size={13} />}
      </div>
    </button>
  );
}
