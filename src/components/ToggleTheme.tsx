import { Moon, Sun } from "lucide-react";
import { useState } from "react";

const ToggleTheme = () => {
  const [theme, setTheme] = useState("light");
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };
  return (
    <button
      onClick={toggleTheme}
      className="w-[50%] py-3 border border-white/20 rounded-md hover:bg-white/5 transition-all flex items-center justify-center gap-2"
    >
      {theme === "light" ? <Moon /> : <Sun />}
    </button>
  );
};

export default ToggleTheme;
