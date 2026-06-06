"use client";

// ── components/pages/SettingsPage.tsx ─────────────────────────────────────────
// Workbench settings page. Rendered inside the settings.json editor tab.
// Includes visual cards for the 10 themes with hover preview, preference toggles,
// and keyboard shortcuts list.
// ─────────────────────────────────────────────────────────────────────────────

import { useState } from "react";
import { useAppState, useAppActions } from "@/lib/AppStateContext";
import { THEME_LIST, THEMES, applyTheme } from "@/lib/themes";
import { SHORTCUT_COMMANDS } from "@/lib/commands";

interface ThemeDetails {
  emoji: string;
  author: string;
  emojiBg: string;
}

const THEME_DETAILS: Record<string, ThemeDetails> = {
  "vscode-dark":    { emoji: "💻", author: "Microsoft",          emojiBg: "#1e1e1e" },
  "monokai":        { emoji: "🥥", author: "monokai",            emojiBg: "#272822" },
  "dracula":        { emoji: "🧛", author: "Dracula Theme",      emojiBg: "#282a36" },
  "github-dark":    { emoji: "🐱", author: "GitHub",             emojiBg: "#24292f" },
  "github-light":   { emoji: "🐱", author: "GitHub",             emojiBg: "#f6f8fa" },
  "one-dark-pro":   { emoji: "⚛️", author: "binaryify",          emojiBg: "#282c34" },
  "solarized-dark": { emoji: "☀️", author: "Ethan Schoonover",   emojiBg: "#002b36" },
  "solarized-light":{ emoji: "☀️", author: "Ethan Schoonover",   emojiBg: "#fdf6e3" },
  "nord":           { emoji: "❄️", author: "arcticicestudio",    emojiBg: "#2e3440" },
  "tokyo-night":    { emoji: "🏮", author: "enkia",              emojiBg: "#1a1b26" },
};

function Toggle({
  label,
  description,
  value,
  onChange,
  id,
}: {
  label: string;
  description?: string;
  value: boolean;
  onChange: (v: boolean) => void;
  id: string;
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-3 border-b border-border-light">
      <div className="flex flex-col gap-[2px] flex-1 min-w-0 font-sans">
        <label
          htmlFor={id}
          className="text-[12.5px] cursor-pointer font-semibold text-text-primary"
        >
          {label}
        </label>
        {description && (
          <span className="text-[11px] text-text-muted">
            {description}
          </span>
        )}
      </div>
      <button
        id={id}
        role="switch"
        aria-checked={value}
        onClick={() => onChange(!value)}
        className={`vsc-switch flex-shrink-0 ${value ? "on" : ""}`}
        aria-label={label}
      />
    </div>
  );
}

export default function SettingsPageUI() {
  const {
    activeTheme,
    animationsEnabled,
    compactMode,
    sidebarDefaultOpen,
  } = useAppState();
  const actions = useAppActions();

  // Track the original theme for hover previews
  const [originalTheme, setOriginalTheme] = useState<string | null>(null);

  const handleHover = (themeId: string) => {
    if (!originalTheme) {
      setOriginalTheme(activeTheme);
    }
    const theme = THEMES[themeId];
    if (theme) {
      applyTheme(theme);
    }
  };

  const handleMouseLeave = () => {
    if (originalTheme) {
      const orig = THEMES[originalTheme];
      if (orig) {
        applyTheme(orig);
      }
      setOriginalTheme(null);
    }
  };

  const handleSelect = (themeId: string) => {
    actions.setTheme(themeId);
    setOriginalTheme(null); // lock in selected theme
  };

  return (
    <div
      className="flex flex-col max-w-[820px] font-mono text-[13px]"
      style={{
        padding: "var(--space-8)",
        gap:     "var(--space-8)",
      }}
    >
      {/* ── Page Header ────────────────────────────────────────────────── */}
      <div className="flex flex-col gap-1">
        <div className="text-[14px]">
          <span className="tok-keyword">const</span>{" "}
          <span className="tok-variable">settings</span>
          <span className="tok-punctuation">: </span>
          <span className="tok-type">SettingsRegistry</span>
          <span className="tok-punctuation"> = &#123;</span>
        </div>
        <p className="text-[12px] italic pl-1 text-text-muted font-sans">
          // Customize workbench appearance, color themes, and default editor behavior.
        </p>
      </div>

      {/* ── Color Theme Grid ───────────────────────────────────────────── */}
      <div className="flex flex-col gap-4">
        <div className="text-[11px] font-bold uppercase tracking-widest text-text-secondary">
          COLOR THEME
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {THEME_LIST.map((theme) => {
            const details = THEME_DETAILS[theme.id] || { emoji: "🎨", author: "Community", emojiBg: "var(--bg-editor)" };
            const isActive = theme.id === activeTheme;

            return (
              <button
                key={theme.id}
                type="button"
                onClick={() => handleSelect(theme.id)}
                onMouseEnter={() => handleHover(theme.id)}
                onMouseLeave={handleMouseLeave}
                className="flex items-center gap-4 rounded-xl border p-4 cursor-pointer select-none text-left transition-all duration-150"
                style={{
                  background:  isActive ? "var(--bg-selected)" : "var(--bg-sidebar)",
                  borderColor: isActive ? "var(--accent)" : "var(--border-light)",
                  boxShadow:   isActive ? "0 4px 12px rgba(0,0,0,0.15)" : "none",
                }}
              >
                {/* Theme Avatar */}
                <div className="relative">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-[22px] relative flex-shrink-0 shadow-inner"
                    style={{ background: details.emojiBg }}
                  >
                    {details.emoji}
                  </div>
                  {isActive && (
                    <div
                      className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-white text-[9px] shadow-md z-10 border border-editor"
                      style={{
                        background: "var(--accent)",
                        borderColor: "var(--bg-sidebar)",
                      }}
                    >
                      ✓
                    </div>
                  )}
                </div>

                {/* Theme Meta Info */}
                <div className="flex flex-col gap-1 overflow-hidden font-sans">
                  <div className="text-[14px] font-bold text-text-active truncate">
                    {theme.label}
                  </div>
                  <div className="text-[11px] text-text-secondary truncate">
                    {details.author}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Workbench preferences ───────────────────────────────────────── */}
      <div className="flex flex-col gap-2 pt-4 border-t border-border-light">
        <div className="text-[11px] font-bold uppercase tracking-widest text-text-secondary pb-1">
          WORKBENCH PREFERENCES
        </div>

        <Toggle
          id="setting-animations"
          label="Enable Animations"
          description="Smooth transitions and micro-animations"
          value={animationsEnabled}
          onChange={actions.setAnimations}
        />
        <Toggle
          id="setting-compact"
          label="Compact Mode"
          description="Reduce spacing and font sizes"
          value={compactMode}
          onChange={actions.setCompact}
        />
        <Toggle
          id="setting-sidebar-default"
          label="Sidebar Open by Default"
          description="Show sidebar when the page loads"
          value={sidebarDefaultOpen}
          onChange={(v) => {
            actions.setSidebarDefault(v);
            actions.setSidebar(v);
          }}
        />
      </div>

      {/* ── Keyboard Shortcuts ──────────────────────────────────────────── */}
      <div className="flex flex-col gap-3 pt-4 border-t border-border-light">
        <div className="text-[11px] font-bold uppercase tracking-widest text-text-secondary">
          KEYBOARD SHORTCUTS
        </div>

        <div className="flex flex-col gap-1">
          {SHORTCUT_COMMANDS.map((cmd, i) => (
            <div
              key={cmd.id}
              className="flex items-center justify-between py-2.5 text-[12.5px] border-b border-border-light font-sans"
              style={{
                borderBottom: i < SHORTCUT_COMMANDS.length - 1 ? "1px solid var(--border-light)" : "none",
              }}
            >
              <div className="flex items-center gap-2">
                <span className="text-[15px] w-5 text-center">{cmd.icon}</span>
                <span className="text-text-primary font-medium">{cmd.label}</span>
              </div>
              {cmd.shortcut && (
                <span className="kbd">{cmd.shortcut}</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Page Ending */}
      <div className="tok-punctuation pb-2">&#125;;</div>
    </div>
  );
}
