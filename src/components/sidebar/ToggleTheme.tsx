import { Lightbulb, LightbulbOff } from "lucide-react";
import { useState, useEffect } from "react";

const ToggleTheme = () => {
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "light",
  );
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, []);
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  return (
    <button
      onClick={toggleTheme}
      className="w-1/2 py-2 border dark:border-white/20 rounded-md dark:hover:bg-white/10 hover:bg-black/10 transition-all flex items-center justify-center gap-2"
    >
      {theme === "light" ? (
        <>
          <span>
            <LightbulbOff />
          </span>
          {"Dark"}
        </>
      ) : (
        <>
          <span>
            <Lightbulb />
          </span>
          {"Light"}
        </>
      )}
    </button>
  );
};

export default ToggleTheme;
