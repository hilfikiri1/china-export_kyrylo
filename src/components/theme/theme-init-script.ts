import { THEME_STORAGE_KEY } from "@/lib/theme";
import { isThemeSwitcherEnabled } from "@/config/features";

/** Inline script executed before paint to prevent theme flicker. */
export function getThemeInitScript(enabled = isThemeSwitcherEnabled): string {
  return `(function(){try{var enabled=${enabled};if(!enabled){document.documentElement.setAttribute("data-theme","dark");return;}var k=${JSON.stringify(THEME_STORAGE_KEY)};var s=localStorage.getItem(k);var t=s==="light"||s==="dark"?s:(window.matchMedia("(prefers-color-scheme: light)").matches?"light":"dark");document.documentElement.setAttribute("data-theme",t);}catch(e){document.documentElement.setAttribute("data-theme","dark");}})();`;
}
