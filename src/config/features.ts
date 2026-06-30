/** Experimental feature flags (public env vars only). */
export const isThemeSwitcherEnabled =
  process.env.NEXT_PUBLIC_ENABLE_THEME_SWITCHER === "true";
