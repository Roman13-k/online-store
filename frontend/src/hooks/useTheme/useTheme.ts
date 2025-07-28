"use client";
import { useEffect } from "react";
import useLocalStorage from "../useLocalStorage/useLocalStorage";

export type Theme = "light" | "dark" | "warm";

export default function useTheme(initValue: Theme): [Theme, (t: Theme) => void] {
  const [theme, setTheme, isInitialized] = useLocalStorage<Theme>("theme", initValue);

  useEffect(() => {
    if (!isInitialized) return;

    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    if (!localStorage.getItem("theme")) {
      const defaultTheme = prefersDark ? "dark" : initValue;
      setTheme(defaultTheme);
      applyTheme(defaultTheme);
    } else {
      applyTheme(theme);
    }
  }, [isInitialized]);

  useEffect(() => {
    if (isInitialized) {
      applyTheme(theme);
    }
  }, [theme, isInitialized]);

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
