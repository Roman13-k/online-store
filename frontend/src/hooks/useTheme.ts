"use client";
import { useEffect } from "react";
import useLocalStorage from "./useLocalStorage";

export type Theme = "light" | "dark" | "warm";

export default function useTheme(initValue: Theme): [Theme, (t: Theme) => void] {
  const [theme, setTheme] = useLocalStorage<Theme>("theme", initValue);

  useEffect(() => {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    if (theme === "dark" || theme === "warm") {
      applyTheme(theme);
    } else if (theme === "light") {
      applyTheme("light");
    } else if (prefersDark) {
      setTheme("dark");
      applyTheme("dark");
    } else {
      setTheme("light");
      applyTheme("light");
    }
  }, []);

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  function applyTheme(theme: Theme) {
    const root = document.documentElement;
    root.classList.remove("dark", "warm");

    if (theme === "dark") {
      root.classList.add("dark");
    } else if (theme === "warm") {
      root.classList.add("warm");
    }
  }

  return [theme, setTheme];
}
