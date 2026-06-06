"use client";

// ── components/SettingsPanel.tsx ──────────────────────────────────────────────
// Right-side slide-in panel. Full-screen on mobile (<768px).
// Sections: Appearance, Editor, Layout, Keyboard Shortcuts.
// All settings persist via AppStateContext → localStorage.
// ─────────────────────────────────────────────────────────────────────────────

import { useAppState, useAppActions } from "@/lib/AppStateContext";
import { THEMES } from "@/lib/themes";
import { SHORTCUT_COMMANDS } from "@/lib/commands";
import FocusTrap from "./FocusTrap";

function SectionHeader({ title }: { title: string }) {
  return (
    <div
      className="px-5 py-3 text-[10px] uppercase tracking-widest font-bold border-b"
      style={{ color: "var(--text-muted)", borderColor: "var(--border)", background: "var(--bg-editor)" }}
    >
      {title}
    </div>
  );
}

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
    <div className="flex items-center justify-between gap-4 px-5 py-3">
      <div className="flex flex-col gap-[2px] flex-1 min-w-0">
        <label
          htmlFor={id}
          className="text-[12px] cursor-pointer"
          style={{ color: "var(--text-primary)" }}
        >
          {label}
        </label>
        {description && (
          <span className="text-[11px]" style={{ color: "var(--text-muted)" }}>
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

export default function SettingsPanel() {
  const {
    activePanelId,
    activeTheme,
    animationsEnabled,
    compactMode,
    sidebarDefaultOpen,
  } = useAppState();
  const actions = useAppActions();

  const isOpen = activePanelId === "settings";
  const theme  = THEMES[activeTheme];

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 md:hidden"
          style={{ background: "var(--bg-modal-backdrop)" }}
          onClick={() => actions.setActivePanel(null)}
          aria-hidden="true"
        />
      )}

      <FocusTrap
        active={isOpen}
        className={`
          fixed top-0 right-0 h-full z-40 flex flex-col overflow-hidden
          border-l transition-transform duration-250
          w-full md:w-[360px]
          ${isOpen ? "translate-x-0" : "translate-x-full"}
        `}
        style={{
          background:  "var(--bg-sidebar)",
          borderColor: "var(--border)",
          transition:  "transform 250ms ease",
        } as React.CSSProperties}
      >
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Settings"
          className="flex flex-col h-full overflow-hidden"
        >
          {/* Header */}
          <div
            className="flex items-center justify-between px-5 py-4 border-b flex-shrink-0"
            style={{ borderColor: "var(--border)", background: "var(--bg-editor)" }}
          >
            <div className="flex items-center gap-2">
              <span>⚙️</span>
              <span className="text-[13px] font-semibold" style={{ color: "var(--text-active)" }}>
                Settings
              </span>
            </div>
            <button
              onClick={() => actions.setActivePanel(null)}
              className="flex items-center justify-center w-6 h-6 rounded text-[14px] transition-colors duration-100"
              style={{ color: "var(--text-secondary)" }}
              aria-label="Close Settings"
            >
              ✕
            </button>
          </div>

          {/* Scrollable content */}
          <div className="flex-1 overflow-y-auto">

            {/* ── Appearance ─────────────────────────────────────────────── */}
            <SectionHeader title="Appearance" />
            <div className="px-5 py-4 flex flex-col gap-3">
              <div className="flex flex-col gap-1">
                <span className="text-[11px]" style={{ color: "var(--text-muted)" }}>
                  Color Theme
                </span>
                <div className="flex items-center gap-2">
                  {/* Current theme swatch */}
                  <div className="flex gap-1 h-[8px] rounded overflow-hidden flex-1">
                    {theme && [
                      theme.tokens.bgEditor,
                      theme.tokens.bgSidebar,
                      theme.tokens.accent,
                      theme.tokens.textPrimary,
                      theme.tokens.tokKeyword,
                    ].map((color, i) => (
                      <div key={i} className="flex-1" style={{ background: color }} />
                    ))}
                  </div>
                  <span className="text-[12px]" style={{ color: "var(--text-primary)" }}>
                    {theme?.label ?? activeTheme}
                  </span>
                </div>
                <button
                  onClick={actions.openThemeSelector}
                  className="mt-1 px-3 py-2 rounded text-[12px] border text-left transition-colors duration-100"
                  style={{
                    background:  "var(--bg-activity)",
                    borderColor: "var(--border)",
                    color:       "var(--text-primary)",
                  }}
                >
                  🎨 Change Color Theme
                  <span className="kbd ml-2">Ctrl+K Ctrl+T</span>
                </button>
              </div>
            </div>

            {/* ── Editor ─────────────────────────────────────────────────── */}
            <SectionHeader title="Editor" />
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

            {/* ── Layout ─────────────────────────────────────────────────── */}
            <SectionHeader title="Layout" />
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

            {/* ── Keyboard Shortcuts ──────────────────────────────────────── */}
            <SectionHeader title="Keyboard Shortcuts" />
            <div className="px-5 py-3 flex flex-col gap-0">
              {SHORTCUT_COMMANDS.map((cmd, i) => (
                <div
                  key={cmd.id}
                  className="flex items-center justify-between py-[9px] text-[12px]"
                  style={{
                    borderBottom: i < SHORTCUT_COMMANDS.length - 1
                      ? `1px solid var(--border-light)`
                      : "none",
                  }}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-[14px] w-5 text-center">{cmd.icon}</span>
                    <span style={{ color: "var(--text-primary)" }}>{cmd.label}</span>
                  </div>
                  {cmd.shortcut && (
                    <span className="kbd">{cmd.shortcut}</span>
                  )}
                </div>
              ))}
            </div>

          </div>
        </div>
      </FocusTrap>
    </>
  );
}
