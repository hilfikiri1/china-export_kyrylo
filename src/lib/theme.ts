export type Theme = "dark" | "light";

export const THEME_STORAGE_KEY = "bbs-theme";

export const THEMES: Theme[] = ["dark", "light"];

export function isTheme(value: string | null | undefined): value is Theme {
  return value === "dark" || value === "light";
}

export function getSystemTheme(): Theme {
  if (typeof window === "undefined") return "dark";
  return window.matchMedia("(prefers-color-scheme: light)").matches
    ? "light"
    : "dark";
}

export function getStoredTheme(): Theme | null {
  if (typeof window === "undefined") return null;
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    return isTheme(stored) ? stored : null;
  } catch {
    return null;
  }
}

export function resolveTheme(stored: Theme | null): Theme {
  return stored ?? getSystemTheme();
}

export function applyTheme(theme: Theme) {
  document.documentElement.setAttribute("data-theme", theme);
}

export function persistTheme(theme: Theme) {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    /* storage unavailable */
  }
}
