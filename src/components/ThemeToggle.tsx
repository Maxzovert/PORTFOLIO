import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="fixed top-4 right-4 sm:top-6 sm:right-6 md:top-8 md:right-8 z-50 p-3 sm:p-4 rounded-full glass-card hover:scale-110 transition-all duration-300 group touch-manipulation"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <Sun className="w-5 h-5 sm:w-6 sm:h-6 text-accent group-hover:rotate-180 transition-transform duration-500" />
      ) : (
        <Moon className="w-5 h-5 sm:w-6 sm:h-6 text-primary group-hover:-rotate-12 transition-transform duration-500" />
      )}
    </button>
  );
};

export default ThemeToggle;
