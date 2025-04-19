"use client";

import { createContext, useEffect, useState, useContext } from "react";

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("system");

  useEffect(() => {
    // Check stored preference
    const stored = localStorage.getItem("theme") || "system";
    setTheme(stored);

    const root = window.document.documentElement;

    const applyTheme = (t) => {
      if (t === "dark") {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }
    };

    const detectSystem = () =>
      window.matchMedia("(prefers-color-scheme: dark)").matches;

    if (stored === "system") {
      applyTheme(detectSystem() ? "dark" : "light");

      // Listen for system theme changes
      const media = window.matchMedia("(prefers-color-scheme: dark)");
      const listener = () => applyTheme(media.matches ? "dark" : "light");
      media.addEventListener("change", listener);
      return () => media.removeEventListener("change", listener);
    } else {
      applyTheme(stored);
    }
  }, [theme]);

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : theme === "dark" ? "system" : "light";
    setTheme(next);
    localStorage.setItem("theme", next);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
