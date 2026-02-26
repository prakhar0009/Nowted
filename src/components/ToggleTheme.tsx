import { Lightbulb, LightbulbOff } from "lucide-react";
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
      className="w-[50%] py-2 border dark:border-white/20 rounded-md dark:hover:bg-white/10 hover:bg-black/10 transition-all flex items-center justify-center gap-2"
    >
      {theme === "light" ? (
        <>
          <span>
            <Lightbulb />
          </span>
          {"Light"}
        </>
      ) : (
        <>
          <span>
            <LightbulbOff />
          </span>
          {"Dark"}
        </>
      )}
    </button>
  );
};

export default ToggleTheme;
