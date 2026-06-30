"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/theme/ThemeProvider";
import { useMessages } from "@/i18n/LocaleProvider";
import { cn } from "@/lib/utils";

type ThemeToggleProps = {
  className?: string;
  variant?: "desktop" | "mobile";
};

export function ThemeToggle({ className, variant = "desktop" }: ThemeToggleProps) {
  const { theme, toggleTheme, enabled } = useTheme();
  const messages = useMessages();

  if (!enabled) return null;

  const isDark = theme === "dark";
  const label = isDark
    ? messages.theme.switchToLight
    : messages.theme.switchToDark;

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={label}
      aria-pressed={!isDark}
      title={label}
      className={cn(
        "theme-toggle inline-flex items-center justify-center rounded-lg border transition-colors",
        "border-border-subtle bg-surface-hover text-text-secondary",
        "hover:bg-surface-secondary hover:text-text-primary",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-light focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        variant === "desktop" ? "h-9 w-9" : "h-10 w-10",
        className,
      )}
    >
      {isDark ? (
        <Sun className="h-4 w-4" aria-hidden />
      ) : (
        <Moon className="h-4 w-4" aria-hidden />
      )}
    </button>
  );
}
