"use client";

// ── components/ThemeSelector.tsx ──────────────────────────────────────────────
// Centered modal showing all 10 themes as selectable cards with color swatches.
// Arrow keys navigate, Enter selects. Hover previews theme live, Escape reverts.
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useEffect, useCallback, type KeyboardEvent } from "react";
import { useAppState, useAppActions } from "@/lib/AppStateContext";
import { THEME_LIST, applyTheme, THEMES, DEFAULT_THEME_ID, type Theme } from "@/lib/themes";
import FocusTrap from "./FocusTrap";

function ThemeCard({
  theme,
  isActive,
  isHighlighted,
  onClick,
  onHover,
}: {
  theme: Theme;
  isActive: boolean;
  isHighlighted: boolean;
  onClick: () => void;
  onHover: () => void;
}) {
  const t = theme.tokens;
  const swatches = [t.bgEditor, t.bgSidebar, t.accent, t.textPrimary, t.tokKeyword];

  return (
    <button
      role="option"
      aria-selected={isActive}
      aria-pressed={isActive}
      className="flex flex-col gap-2 p-3 rounded-[6px] cursor-pointer text-left transition-colors duration-100 border w-full"
      style={{
        background:   isHighlighted ? "var(--bg-selected)" : "var(--bg-hover)",
        borderColor:  isActive ? "var(--accent)" : isHighlighted ? "var(--border-focus)" : "var(--border-light)",
        outline:      "none",
      }}
      onClick={onClick}
      onMouseEnter={onHover}
    >
      {/* Swatch strip */}
      <div className="flex gap-1 h-[8px] rounded overflow-hidden w-full">
        {swatches.map((color, i) => (
          <div key={i} className="flex-1" style={{ background: color }} />
        ))}
      </div>

      {/* Theme name */}
      <div className="flex items-center justify-between">
        <span
          className="text-[12px] font-medium"
          style={{ color: isActive ? "var(--accent)" : "var(--text-primary)" }}
        >
          {theme.label}
        </span>
        {isActive && (
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"
            style={{ color: "var(--accent)", flexShrink: 0 }}>
            <polyline points="20 6 9 17 4 12" stroke="currentColor" strokeWidth="3"
              strokeLinecap="round" strokeLinejoin="round" fill="none"/>
          </svg>
        )}
      </div>
    </button>
  );
}

export default function ThemeSelector() {
  const { themeSelectorOpen, activeTheme } = useAppState();
  const actions = useAppActions();

  const [highlighted, setHighlighted] = useState(0);
  // Track the "original" theme so Escape can revert a live preview
  const [previewTheme, setPreviewTheme] = useState<string | null>(null);

  useEffect(() => {
    if (themeSelectorOpen) {
      const idx = THEME_LIST.findIndex((t) => t.id === activeTheme);
      setHighlighted(idx >= 0 ? idx : 0);
      setPreviewTheme(null);
    }
  }, [themeSelectorOpen, activeTheme]);

  const close = useCallback(() => {
    // Revert any live preview
    if (previewTheme) {
      const orig = THEMES[previewTheme] ?? THEMES[DEFAULT_THEME_ID];
      applyTheme(orig);
    }
    actions.closeThemeSelector();
    setPreviewTheme(null);
  }, [actions, previewTheme]);

  const select = useCallback(
    (themeId: string) => {
      actions.setTheme(themeId);
      setPreviewTheme(null);
      actions.closeThemeSelector();
    },
    [actions]
  );

  function handleHover(theme: Theme) {
    if (!previewTheme) setPreviewTheme(activeTheme);
    applyTheme(theme);
  }

  function handleKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlighted((h) => Math.min(h + 1, THEME_LIST.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlighted((h) => Math.max(h - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      select(THEME_LIST[highlighted].id);
    } else if (e.key === "Escape") {
      close();
    }
  }

  if (!themeSelectorOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "var(--bg-modal-backdrop)" }}
      onClick={(e) => { if (e.target === e.currentTarget) close(); }}
      role="presentation"
    >
      <FocusTrap
        active={themeSelectorOpen}
        className="w-full max-w-[520px] rounded-[8px] overflow-hidden border shadow-2xl fade-in flex flex-col"
        style={{
          background:  "var(--bg-sidebar)",
          borderColor: "var(--border)",
          maxHeight:   "80vh",
        } as React.CSSProperties}
      >
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Select Color Theme"
          onKeyDown={handleKeyDown}
          className="flex flex-col overflow-hidden"
        >
          {/* Header */}
          <div
            className="flex items-center justify-between px-5 py-4 border-b flex-shrink-0"
            style={{ borderColor: "var(--border)" }}
          >
            <div className="flex items-center gap-2">
              <span>🎨</span>
              <span
                className="text-[13px] font-semibold"
                style={{ color: "var(--text-active)" }}
              >
                Select Color Theme
              </span>
            </div>
            <button
              onClick={close}
              className="flex items-center justify-center w-6 h-6 rounded transition-colors duration-100"
              style={{ color: "var(--text-secondary)" }}
              aria-label="Close theme selector"
            >
              ✕
            </button>
          </div>

          {/* Theme grid */}
          <div
            className="overflow-y-auto p-4"
            role="listbox"
            aria-label="Available themes"
          >
            <div className="grid grid-cols-2 gap-2">
              {THEME_LIST.map((theme, idx) => (
                <ThemeCard
                  key={theme.id}
                  theme={theme}
                  isActive={theme.id === activeTheme}
                  isHighlighted={idx === highlighted}
                  onClick={() => select(theme.id)}
                  onHover={() => handleHover(theme)}
                />
              ))}
            </div>
          </div>

          {/* Footer hint */}
          <div
            className="px-5 py-3 text-[11px] border-t flex-shrink-0"
            style={{
              color:       "var(--text-muted)",
              borderColor: "var(--border)",
              background:  "var(--bg-editor)",
            }}
          >
            <span className="kbd">↑↓</span> navigate &nbsp;
            <span className="kbd">Enter</span> apply &nbsp;
            <span className="kbd">Esc</span> cancel
          </div>
        </div>
      </FocusTrap>
    </div>
  );
}
