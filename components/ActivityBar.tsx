"use client";

// ── components/ActivityBar.tsx ────────────────────────────────────────────────
// Modified: Added gear (Settings) + sparkle (Copilot) icons at the bottom.
// Tooltips read shortcut labels from the command registry.
// ─────────────────────────────────────────────────────────────────────────────

import { FileId } from "@/lib/fileContents";
import { useAppActions, useAppState } from "@/lib/AppStateContext";
import { COMMAND_MAP } from "@/lib/commands";

const FILE_TO_PANEL: Record<FileId, string> = {
  "about-me.ts":  "explorer",
  "projects.ts":  "projects",
  "skills.json":  "skills",
  "experience.md":"experience",
  "contact.js":   "contact",
};

interface Props {
  activeFile: FileId;
  onFileOpen: (f: FileId) => void;
}

const ICONS: { fileId: FileId; label: string; svg: React.ReactNode }[] = [
  {
    fileId: "about-me.ts",
    label: "Explorer",
    svg: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 3h7l2 3h9v14H3z" />
      </svg>
    ),
  },
  {
    fileId: "projects.ts",
    label: "Projects",
    svg: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
        <line x1="12" y1="12" x2="12" y2="17" />
        <line x1="9" y1="14.5" x2="15" y2="14.5" />
      </svg>
    ),
  },
  {
    fileId: "skills.json",
    label: "Skills",
    svg: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    fileId: "experience.md",
    label: "Experience",
    svg: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    ),
  },
  {
    fileId: "contact.js",
    label: "Contact",
    svg: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
];

/** Tooltip component for activity bar icons */
function Tooltip({ label }: { label: string }) {
  return (
    <span
      className="absolute left-[calc(var(--activity-w)+8px)] text-[11px] px-2 py-1 rounded-[3px] whitespace-nowrap pointer-events-none z-[100] border opacity-0 group-hover:opacity-100 transition-opacity duration-150"
      style={{
        background:  "var(--bg-tooltip)",
        color:       "var(--text-tooltip)",
        borderColor: "var(--border)",
      }}
    >
      {label}
    </span>
  );
}

export default function ActivityBar({ activeFile, onFileOpen }: Props) {
  const activePanel = FILE_TO_PANEL[activeFile];
  const actions     = useAppActions();
  const { activePanelId } = useAppState();

  const copilotShortcut  = COMMAND_MAP["toggle-copilot"]?.shortcut ?? "Ctrl+Shift+I";
  const settingsShortcut = COMMAND_MAP["open-settings"]?.shortcut ?? "Ctrl+,";

  return (
    <div
      className="flex flex-col items-center py-2 flex-shrink-0 z-10 border-r border-black bg-activity w-[var(--activity-w)]"
      role="navigation"
      aria-label="Activity Bar"
    >
      {/* Navigation icons */}
      {ICONS.map(({ fileId, label, svg }) => {
        const panel    = FILE_TO_PANEL[fileId];
        const isActive = activePanel === panel;
        return (
          <div
            key={fileId}
            role="button"
            tabIndex={0}
            aria-label={label}
            aria-pressed={isActive}
            className={`group relative w-12 h-[52px] flex items-center justify-center cursor-pointer transition-colors duration-150 ${
              isActive
                ? "text-text-active activity-icon-active"
                : "text-text-secondary hover:text-text-active"
            }`}
            onClick={() => onFileOpen(fileId)}
            onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") onFileOpen(fileId); }}
          >
            {svg}
            <Tooltip label={label} />
          </div>
        );
      })}

      {/* Bottom section: Copilot + Settings */}
      <div className="mt-auto flex flex-col items-center pb-2 gap-1">
        {/* Copilot (sparkle) */}
        <div
          role="button"
          tabIndex={0}
          aria-label={`AI Copilot (${copilotShortcut})`}
          aria-expanded={activePanelId === "copilot"}
          className={`group relative w-12 h-[44px] flex items-center justify-center cursor-pointer transition-colors duration-150 ${
            activePanelId === "copilot"
              ? "text-text-active activity-icon-active"
              : "text-text-secondary hover:text-text-active"
          }`}
          onClick={() => actions.togglePanel("copilot")}
          onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") actions.togglePanel("copilot"); }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/>
          </svg>
          <Tooltip label={`AI Copilot (${copilotShortcut})`} />
        </div>

        {/* Settings (gear) */}
        <div
          role="button"
          tabIndex={0}
          aria-label={`Settings (${settingsShortcut})`}
          aria-expanded={activePanelId === "settings"}
          className={`group relative w-12 h-[44px] flex items-center justify-center cursor-pointer transition-colors duration-150 ${
            activePanelId === "settings"
              ? "text-text-active activity-icon-active"
              : "text-text-secondary hover:text-text-active"
          }`}
          onClick={() => actions.togglePanel("settings")}
          onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") actions.togglePanel("settings"); }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
          </svg>
          <Tooltip label={`Settings (${settingsShortcut})`} />
        </div>
      </div>
    </div>
  );
}
