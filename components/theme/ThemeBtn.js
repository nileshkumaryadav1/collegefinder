"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const ThemeToggle = () => {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // current theme could be "system", resolvedTheme is what’s actually applied
  const currentTheme = theme === "system" ? resolvedTheme : theme;

  const toggleTheme = () => {
    if (currentTheme === "light") setTheme("dark");
    else setTheme("light");
  };

  const icon =
    currentTheme === "light"
      ? "🌞"
      : currentTheme === "dark"
      ? "🌙"
      : "🖥️"; // fallback

  return (
    <button
      onClick={toggleTheme}
      className="px-3 py-2 text-sm rounded-md border bg-white dark:bg-gray-800 dark:text-white shadow"
    >
      {icon} {currentTheme}
    </button>
  );
};

export default ThemeToggle;
