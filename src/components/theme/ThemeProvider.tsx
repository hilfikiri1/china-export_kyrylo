"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { isThemeSwitcherEnabled } from "@/config/features";
import {
  applyTheme,
  getStoredTheme,
  persistTheme,
  resolveTheme,
  type Theme,
} from "@/lib/theme";

type ThemeContextValue = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  enabled: boolean;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

function readInitialTheme(enabled: boolean): Theme {
  if (!enabled) return "dark";
  if (typeof document === "undefined") return "dark";
  const attr = document.documentElement.getAttribute("data-theme");
  if (attr === "light" || attr === "dark") return attr;
  return resolveTheme(getStoredTheme());
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const enabled = isThemeSwitcherEnabled;
  const [theme, setThemeState] = useState<Theme>(() => readInitialTheme(enabled));

  const setTheme = useCallback(
    (next: Theme) => {
      if (!enabled) return;

      const root = document.documentElement;
      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (!reducedMotion) {
        root.classList.add("theme-transitioning");
        window.setTimeout(() => {
          root.classList.remove("theme-transitioning");
        }, 220);
      }

      applyTheme(next);
      persistTheme(next);
      setThemeState(next);
    },
    [enabled],
  );

  const toggleTheme = useCallback(() => {
    setTheme(theme === "dark" ? "light" : "dark");
  }, [setTheme, theme]);

  const value = useMemo(
    () => ({ theme, setTheme, toggleTheme, enabled }),
    [theme, setTheme, toggleTheme, enabled],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}
