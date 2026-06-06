"use client";

// ── components/ShortcutsToast.tsx ─────────────────────────────────────────────
// F1 toast — bottom-right notification listing all keyboard shortcuts.
// Auto-dismisses after 8 seconds. Accessible: role="alert", aria-live="polite".
// Shortcut list sourced from lib/commands.ts (single source of truth).
// ─────────────────────────────────────────────────────────────────────────────

import { useEffect, useRef } from "react";
import { useAppState, useAppActions } from "@/lib/AppStateContext";
import { SHORTCUT_COMMANDS } from "@/lib/commands";

const AUTO_DISMISS_MS = 8000;

export default function ShortcutsToast() {
  const { toastVisible } = useAppState();
  const actions = useAppActions();
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (toastVisible) {
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => actions.hideToast(), AUTO_DISMISS_MS);
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [toastVisible, actions]);

  return (
    <div
      role="alert"
      aria-live="polite"
      aria-atomic="true"
      className={`
        fixed bottom-10 right-5 z-50 w-[300px] rounded-[6px] overflow-hidden
        border shadow-2xl
        transition-all duration-250
        ${toastVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}
      `}
      style={{
        background:  "var(--bg-sidebar)",
        borderColor: "var(--border)",
        boxShadow:   "0 8px 32px rgba(0,0,0,0.35)",
        transition:  "opacity 250ms ease, transform 250ms ease",
      } as React.CSSProperties}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-4 py-3 border-b"
        style={{ borderColor: "var(--border)", background: "var(--bg-editor)" }}
      >
        <div className="flex items-center gap-2">
          <span>⌨</span>
          <span className="text-[12px] font-semibold" style={{ color: "var(--text-active)" }}>
            Keyboard Shortcuts
          </span>
        </div>
        <button
          onClick={actions.hideToast}
          className="text-[13px] w-5 h-5 flex items-center justify-center rounded"
          style={{ color: "var(--text-muted)" }}
          aria-label="Dismiss shortcuts help"
        >
          ✕
        </button>
      </div>

      {/* Shortcuts list */}
      <div className="px-4 py-3 flex flex-col gap-0">
        {SHORTCUT_COMMANDS.map((cmd, i) => (
          <div
            key={cmd.id}
            className="flex items-center justify-between py-[7px] text-[11px]"
            style={{
              borderBottom: i < SHORTCUT_COMMANDS.length - 1
                ? "1px solid var(--border-light)"
                : "none",
            }}
          >
            <div className="flex items-center gap-2">
              <span className="w-4 text-center">{cmd.icon}</span>
              <span style={{ color: "var(--text-secondary)" }}>{cmd.label}</span>
            </div>
            {cmd.shortcut && (
              <span className="kbd">{cmd.shortcut}</span>
            )}
          </div>
        ))}
      </div>

      {/* Auto-dismiss progress bar */}
      <div
        className="h-[2px] w-full"
        style={{ background: "var(--border-light)" }}
      >
        {toastVisible && (
          <div
            className="h-full"
            style={{
              background: "var(--accent)",
              width: "100%",
              animation: `shrink ${AUTO_DISMISS_MS}ms linear forwards`,
            }}
          />
        )}
      </div>

      <style>{`
        @keyframes shrink {
          from { width: 100%; }
          to   { width: 0%; }
        }
      `}</style>
    </div>
  );
}
