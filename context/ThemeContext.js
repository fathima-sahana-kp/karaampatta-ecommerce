
"use client";

import { createContext, useContext, useEffect, useState } from "react";

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("dark");
  const [isLoaded, setIsLoaded] = useState(false);

  // Get theme from cookie when app loads
  useEffect(() => {
    async function loadTheme() {
      try {
        const response = await fetch("/api/theme");
        const data = await response.json();
        const savedTheme = data.theme || localStorage.getItem("theme") || "dark";
        setTheme(savedTheme);
        localStorage.setItem("theme", savedTheme);
      } catch (error) {
        const savedTheme = localStorage.getItem("theme") || "dark";
        setTheme(savedTheme);
      } finally {
        setIsLoaded(true);
      }
    }

    loadTheme();
  }, []);

  // Apply theme to document
  useEffect(() => {
    if (!isLoaded) return;
    document.documentElement.classList.toggle("light-mode", theme === "light");
  }, [theme, isLoaded]);

  // Change theme and save it
  const toggleTheme = async () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);

    try {
      await fetch("/api/theme", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ theme: newTheme }) });
    } catch (error) {
      console.error("Theme cookie save failed:", error);
    }
  };

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  return useContext(ThemeContext);
}
