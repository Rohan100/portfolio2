"use client";

// ── components/CommandPalette.tsx ─────────────────────────────────────────────
// VS Code-style command palette. Floating top-center modal.
// Keyboard: Arrow keys to navigate, Enter to execute, Escape to close.
// Accessibility: role="dialog", aria-modal, focus trap, aria-activedescendant.
// Commands sourced from lib/commands.ts (single source of truth).
// ─────────────────────────────────────────────────────────────────────────────

import {
  useState,
  useEffect,
  useRef,
  useCallback,
  type KeyboardEvent,
} from "react";
import { useRouter } from "next/navigation";
import { useAppState, useAppActions } from "@/lib/AppStateContext";
import { COMMANDS, CATEGORY_LABELS, type Command, type CommandCategory } from "@/lib/commands";
import FocusTrap from "./FocusTrap";

const FILE_TO_PATH: Record<string, string> = {
  "navigate-about":      "/",
  "navigate-projects":   "/projects",
  "navigate-skills":     "/skills",
  "navigate-experience": "/experience",
  "navigate-contact":    "/contact",
};

function executeCommand(
  cmd: Command,
  actions: ReturnType<typeof useAppActions>,
  router: ReturnType<typeof useRouter>
): void {
  switch (cmd.id) {
    case "navigate-about":
    case "navigate-projects":
    case "navigate-skills":
    case "navigate-experience":
    case "navigate-contact":
      router.push(FILE_TO_PATH[cmd.id]);
      break;
    case "toggle-sidebar":      actions.toggleSidebar(); break;
    case "toggle-copilot":      actions.togglePanel("copilot"); break;
    case "open-command-palette":/* already open */ break;
    case "open-theme-selector": actions.openThemeSelector(); break;
    case "open-search":         actions.togglePanel("search"); break;
    case "open-settings":       router.push("/settings"); break;
    case "show-shortcuts":      actions.showToast(); break;
  }
}

export default function CommandPalette() {
  const { commandPaletteOpen } = useAppState();
  const actions = useAppActions();
  const router  = useRouter();

  const [query,       setQuery]       = useState("");
  const [highlighted, setHighlighted] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Filter + group commands by category
  const filtered = query.trim()
    ? COMMANDS.filter(
        (c) =>
          c.label.toLowerCase().includes(query.toLowerCase()) ||
          (c.description ?? "").toLowerCase().includes(query.toLowerCase())
      )
    : COMMANDS;

  // Reset when opened
  useEffect(() => {
    if (commandPaletteOpen) {
      setQuery("");
      setHighlighted(0);
    }
  }, [commandPaletteOpen]);

  const close = useCallback(() => {
    actions.closeCommandPalette();
  }, [actions]);

  function handleKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlighted((h) => Math.min(h + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlighted((h) => Math.max(h - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const cmd = filtered[highlighted];
      if (cmd) {
        executeCommand(cmd, actions, router);
        close();
      }
    } else if (e.key === "Escape") {
      close();
    }
  }

  // Group by category (only for unfiltered / short filters)
  const groups: Partial<Record<CommandCategory, Command[]>> = {};
  filtered.forEach((cmd) => {
    if (!groups[cmd.category]) groups[cmd.category] = [];
    groups[cmd.category]!.push(cmd);
  });

  const categoryOrder: CommandCategory[] = ["navigation", "view", "theme", "settings", "help"];

  if (!commandPaletteOpen) return null;

  return (
    /* Backdrop */
    <div
      className="fixed inset-0 z-50 flex flex-col items-center pt-[12vh] px-4"
      style={{ background: "var(--bg-modal-backdrop)" }}
      onClick={(e) => { if (e.target === e.currentTarget) close(); }}
      role="presentation"
    >
      <FocusTrap
        active={commandPaletteOpen}
        className="w-full max-w-[600px] flex flex-col rounded-[6px] overflow-hidden border shadow-2xl fade-in"
        style={{
          background:   "var(--bg-sidebar)",
          borderColor:  "var(--border)",
          boxShadow:    "0 20px 60px rgba(0,0,0,0.4)",
        } as React.CSSProperties}
      >
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Command Palette"
          onKeyDown={handleKeyDown}
        >
          {/* Search input */}
          <div
            className="flex items-center gap-3 px-4 border-b"
            style={{ borderColor: "var(--border)" }}
          >
            <svg
              width="14" height="14" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" strokeWidth="2"
              strokeLinecap="round" strokeLinejoin="round"
              style={{ color: "var(--text-secondary)", flexShrink: 0 }}
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              ref={inputRef}
              type="text"
              placeholder="Type a command or search..."
              value={query}
              onChange={(e) => { setQuery(e.target.value); setHighlighted(0); }}
              className="flex-1 py-3 text-[13px] bg-transparent outline-none border-none"
              style={{ color: "var(--text-active)", fontFamily: "var(--font-mono)" }}
              aria-label="Search commands"
              aria-autocomplete="list"
              aria-activedescendant={filtered[highlighted] ? `cmd-${filtered[highlighted].id}` : undefined}
              autoComplete="off"
              spellCheck={false}
            />
            <span className="kbd">Esc</span>
          </div>

          {/* Command list */}
          <div
            className="overflow-y-auto max-h-[360px]"
            role="listbox"
            aria-label="Commands"
          >
            {filtered.length === 0 && (
              <div
                className="px-4 py-8 text-center text-[12px] italic"
                style={{ color: "var(--text-muted)" }}
              >
                No commands match &quot;{query}&quot;
              </div>
            )}

            {categoryOrder.map((cat) => {
              const cmds = groups[cat];
              if (!cmds || cmds.length === 0) return null;
              return (
                <div key={cat}>
                  {/* Category header */}
                  <div
                    className="px-4 py-[6px] text-[10px] uppercase tracking-widest font-bold"
                    style={{ color: "var(--text-muted)", background: "var(--bg-editor)" }}
                  >
                    {CATEGORY_LABELS[cat]}
                  </div>
                  {cmds.map((cmd) => {
                    const globalIdx = filtered.indexOf(cmd);
                    const isActive  = globalIdx === highlighted;
                    return (
                      <div
                        key={cmd.id}
                        id={`cmd-${cmd.id}`}
                        role="option"
                        aria-selected={isActive}
                        className="flex items-center gap-3 px-4 py-[10px] cursor-pointer transition-colors duration-100"
                        style={{
                          background: isActive ? "var(--bg-selected)" : "transparent",
                          color:      isActive ? "var(--text-active)" : "var(--text-primary)",
                        }}
                        onMouseEnter={() => setHighlighted(globalIdx)}
                        onClick={() => {
                          executeCommand(cmd, actions, router);
                          close();
                        }}
                      >
                        <span className="text-[16px] w-5 flex-shrink-0 text-center">
                          {cmd.icon}
                        </span>
                        <span className="flex-1 text-[13px]">{cmd.label}</span>
                        {cmd.description && (
                          <span
                            className="text-[11px] hidden sm:block truncate max-w-[160px]"
                            style={{ color: "var(--text-muted)" }}
                          >
                            {cmd.description}
                          </span>
                        )}
                        {cmd.shortcut && (
                          <span className="kbd ml-2 flex-shrink-0">{cmd.shortcut}</span>
                        )}
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>

          {/* Footer */}
          <div
            className="flex items-center gap-4 px-4 py-2 text-[11px] border-t"
            style={{
              color:       "var(--text-muted)",
              borderColor: "var(--border)",
              background:  "var(--bg-editor)",
            }}
          >
            <span><span className="kbd">↑↓</span> navigate</span>
            <span><span className="kbd">Enter</span> select</span>
            <span><span className="kbd">Esc</span> close</span>
          </div>
        </div>
      </FocusTrap>
    </div>
  );
}
