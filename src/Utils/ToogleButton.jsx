import React, { useContext } from "react";
import { ThemeContext } from "./ThemeProvider";
import { Sun, Moon } from "lucide-react";

const ToggleButton = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button
      onClick={toggleTheme}
      className="relative w-12 h-6 sm:w-14 sm:h-7 rounded-full bg-blue-300 flex items-center p-1 cursor-pointer transition-colors"
    >
      <div
        className={`
          w-4 h-4 sm:w-5 sm:h-5 
          rounded-full flex items-center justify-center 
          transition-transform duration-300 ease-in-out
          ${theme === "dark" 
            ? "bg-yellow-300 text-gray-800 translate-x-6 sm:translate-x-7" 
            : "bg-white text-black translate-x-0"
          }
        `}
      >
        {theme === "dark" 
          ? <Moon className="w-3 h-3 sm:w-4 sm:h-4" /> 
          : <Sun className="w-3 h-3 sm:w-4 sm:h-4" />
        }
      </div>
    </button>
  );
};

export default ToggleButton;
