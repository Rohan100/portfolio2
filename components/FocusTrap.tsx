"use client";

// ── components/FocusTrap.tsx ──────────────────────────────────────────────────
// Reusable focus trap. Constrains Tab/Shift+Tab to focusable children.
// On mount, focuses the first focusable child (or a specified initial element).
// On unmount, restores focus to the element that was focused before mounting.
// Used by: CommandPalette, ThemeSelector, SettingsPanel, SearchPanel, CopilotPanel.
// ─────────────────────────────────────────────────────────────────────────────

import { useEffect, useRef, type ReactNode } from "react";

const FOCUSABLE_SELECTORS = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  "[tabindex]:not([tabindex='-1'])",
].join(", ");

interface FocusTrapProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Whether the trap is active. When false, nothing is intercepted. */
  active: boolean;
  children: ReactNode;
}

export default function FocusTrap({ active, children, onKeyDown: externalKeyDown, ...rest }: FocusTrapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!active) return;

    // Save the previously focused element so we can restore it on close
    previousFocus.current = document.activeElement as HTMLElement;

    // Focus the first focusable element inside the trap
    const container = containerRef.current;
    if (!container) return;
    const first = container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTORS)[0];
    if (first) {
      // Small defer so the element is fully rendered before focusing
      requestAnimationFrame(() => first.focus());
    }

    return () => {
      // Restore focus on unmount / deactivation
      previousFocus.current?.focus();
    };
  }, [active]);

  function handleKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    externalKeyDown?.(e);
    if (!active || e.key !== "Tab") return;

    const container = containerRef.current;
    if (!container) return;

    const focusable = Array.from(
      container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTORS)
    ).filter((el) => !el.closest("[aria-hidden='true']"));

    if (focusable.length === 0) return;

    const first = focusable[0];
    const last  = focusable[focusable.length - 1];

    if (e.shiftKey) {
      if (document.activeElement === first) {
        e.preventDefault();
        last.focus();
      }
    } else {
      if (document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  }

  return (
    <div ref={containerRef} onKeyDown={handleKeyDown} {...rest}>
      {children}
    </div>
  );
}
