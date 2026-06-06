"use client";

// ── lib/useKeyboardShortcuts.ts ───────────────────────────────────────────────
// Global keyboard shortcut hook. Registers one window keydown listener.
// Uses a single ref for all handlers to avoid stale closures and
// prevent the listener from being re-registered on every render.
// ─────────────────────────────────────────────────────────────────────────────

import { useEffect, useRef } from "react";
import { useAppActions } from "./AppStateContext";
import { useRouter } from "next/navigation";

/** Returns true if the event matches the given modifier+key combo */
function matches(
  e: KeyboardEvent,
  ctrl: boolean,
  shift: boolean,
  key: string
): boolean {
  return (
    e.ctrlKey === ctrl &&
    e.shiftKey === shift &&
    !e.altKey &&
    !e.metaKey &&
    e.key.toLowerCase() === key.toLowerCase()
  );
}

/**
 * Convenience hook — wires up ALL portfolio shortcuts from AppStateContext.
 * Call ONCE inside a component that is a child of AppStateProvider.
 */
export function usePortfolioShortcuts(
  _router: ReturnType<typeof useRouter>
): void {
  const actions = useAppActions();

  // Store the latest actions in a ref so the event listener
  // always calls the current version without needing to re-register.
  const actionsRef = useRef(actions);
  useEffect(() => {
    actionsRef.current = actions;
  });

  // Chord state — lives outside the handler to persist across events
  const pendingChord = useRef<string | null>(null);
  const chordTimer   = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    function clearChord() {
      pendingChord.current = null;
      if (chordTimer.current) {
        clearTimeout(chordTimer.current);
        chordTimer.current = null;
      }
    }

    function onKeyDown(e: KeyboardEvent) {
      const a = actionsRef.current;

      // ── Guard: don't fire when typing in inputs (except Escape or command shortcuts) ──
      const target = e.target as HTMLElement;
      const tag    = target.tagName;
      if (
        (tag === "INPUT" || tag === "TEXTAREA" || target.isContentEditable) &&
        e.key !== "Escape"
      ) {
        const isCommand = e.ctrlKey || e.metaKey || e.key === "F1";
        if (!isCommand) {
          return;
        }
      }

      // ── Escape — close everything ─────────────────────────────────────────
      if (e.key === "Escape") {
        e.preventDefault();
        clearChord();
        a.closeAllOverlays();
        return;
      }

      // ── Chord resolution: Ctrl+K was pressed, waiting for second key ──────
      if (pendingChord.current === "ctrl+k") {
        if (matches(e, true, false, "t")) {
          e.preventDefault();
          clearChord();
          a.openThemeSelector();
          return;
        }
        // Any other key cancels the chord (don't preventDefault)
        clearChord();
      }

      // ── Ctrl+K — start chord ──────────────────────────────────────────────
      if (matches(e, true, false, "k")) {
        e.preventDefault();
        pendingChord.current = "ctrl+k";
        if (chordTimer.current) clearTimeout(chordTimer.current);
        chordTimer.current = setTimeout(clearChord, 1500);
        return;
      }

      // ── Ctrl+Shift+P — Command Palette ────────────────────────────────────
      if (matches(e, true, true, "p")) {
        e.preventDefault();
        a.openCommandPalette();
        return;
      }

      // ── Ctrl+Shift+F — Search ─────────────────────────────────────────────
      if (matches(e, true, true, "f")) {
        e.preventDefault();
        a.togglePanel("search");
        return;
      }

      // ── Ctrl+Shift+I — Copilot ────────────────────────────────────────────
      if (matches(e, true, true, "i")) {
        e.preventDefault();
        a.togglePanel("copilot");
        return;
      }

      // ── Ctrl+B — Toggle Sidebar ───────────────────────────────────────────
      if (matches(e, true, false, "b")) {
        e.preventDefault();
        a.toggleSidebar();
        return;
      }

      // ── Ctrl+, — Settings ─────────────────────────────────────────────────
      if (matches(e, true, false, ",")) {
        e.preventDefault();
        a.togglePanel("settings");
        return;
      }

      // ── F1 — Help / Shortcuts ─────────────────────────────────────────────
      if (e.key === "F1") {
        e.preventDefault();
        a.showToast();
        return;
      }
    }

    window.addEventListener("keydown", onKeyDown, { capture: true });
    return () => {
      window.removeEventListener("keydown", onKeyDown, { capture: true });
      clearChord();
    };
    // Empty dep array: register once on mount, clean up on unmount.
    // actionsRef is always current via the useEffect above.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
