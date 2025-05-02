import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export default function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  if (!mounted) return null;

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      className={`
        relative overflow-hidden transition-all duration-300
        bg-gradient-to-br from-orange-500 dark:to-pink-600 dark:from-blue-500 to-purple-600
        hover:from-orange-600 dark:hover:to-pink-700 dark:hover:from-blue-600 hover:to-purple-700
        border-0 shadow-lg rounded-full
      `}
    >
      <div className="absolute inset-0 flex items-center justify-center transition-transform duration-500">
        <Sun
          className={`
            h-5 w-5 text-white absolute transition-all duration-300
            ${
              theme === "light" ? "opacity-100 scale-100" : "opacity-0 scale-75"
            }
          `}
        />
        <Moon
          className={`
            h-5 w-5 text-white absolute transition-all duration-300
            ${theme === "dark" ? "opacity-100 scale-100" : "opacity-0 scale-75"}
          `}
        />
      </div>
      <div
        className={`
          absolute inset-0 bg-white/20 dark:bg-black/20 
          rounded-full transition-all duration-500
          ${theme === "light" ? "translate-x-0" : "translate-x-full"}
        `}
      />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
