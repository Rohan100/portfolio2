"use client";

// ── components/ThemeProvider.tsx ──────────────────────────────────────────────
// Applies theme CSS variables to document.documentElement whenever activeTheme
// changes. Also injects a <style> tag for ::selection (only changeable via JS).
// The FOUC script pre-applies background vars before hydration; this handles
// all subsequent changes after React mounts.
// ─────────────────────────────────────────────────────────────────────────────

import { useEffect, useRef } from "react";
import { useAppState } from "@/lib/AppStateContext";
import { THEMES, DEFAULT_THEME_ID, applyTheme } from "@/lib/themes";

export default function ThemeProvider() {
  const { activeTheme } = useAppState();
  const selectionStyleRef = useRef<HTMLStyleElement | null>(null);

  useEffect(() => {
    const themeId = activeTheme || DEFAULT_THEME_ID;
    const theme   = THEMES[themeId] ?? THEMES[DEFAULT_THEME_ID];

    // Apply all CSS variables to <html>
    applyTheme(theme);

    // ::selection can only be changed via an injected <style> tag
    if (!selectionStyleRef.current) {
      const el = document.createElement("style");
      el.id = "portfolio-selection-style";
      document.head.appendChild(el);
      selectionStyleRef.current = el;
    }
    selectionStyleRef.current.textContent =
      `::selection { background: ${theme.tokens.selectionBg}; color: inherit; }`;
  }, [activeTheme]);

  return null;
}
