"use client";

// ── components/SearchPanel.tsx ────────────────────────────────────────────────
// Right-side slide-in search panel. Full-screen on mobile.
// Content indexed from lib/searchIndex.ts (single source of truth).
// Results grouped by section with grep-style display.
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useAppState, useAppActions } from "@/lib/AppStateContext";
import { searchIndex, SEARCH_INDEX, type SearchEntry } from "@/lib/searchIndex";
import FocusTrap from "./FocusTrap";

const SECTION_LABELS: Record<string, string> = {
  about:      "About",
  projects:   "Projects",
  skills:     "Skills",
  experience: "Experience",
  contact:    "Contact",
};

const SECTION_ORDER = ["about", "projects", "skills", "experience", "contact"];

export default function SearchPanel() {
  const { activePanelId } = useAppState();
  const actions = useAppActions();
  const router  = useRouter();

  const isOpen = activePanelId === "search";

  const [query,   setQuery]   = useState("");
  const [results, setResults] = useState<SearchEntry[]>([]);
  const inputRef  = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Debounced search
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setResults(query.trim() ? searchIndex(query) : []);
    }, 150);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query]);

  // Focus input when panel opens
  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setResults([]);
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [isOpen]);

  const close = useCallback(() => actions.setActivePanel(null), [actions]);

  function handleResultClick(entry: SearchEntry) {
    router.push(entry.navigateTo);
    close();
  }

  // Group results by section
  const grouped: Partial<Record<string, SearchEntry[]>> = {};
  results.forEach((r) => {
    if (!grouped[r.sectionId]) grouped[r.sectionId] = [];
    grouped[r.sectionId]!.push(r);
  });

  // Highlight matching text
  function highlight(text: string): React.ReactNode {
    if (!query.trim()) return text;
    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi");
    const parts = text.split(regex);
    return parts.map((part, i) =>
      regex.test(part) ? (
        <mark key={i} style={{ background: "var(--bg-selected)", color: "var(--text-active)", borderRadius: 2 }}>
          {part}
        </mark>
      ) : part
    );
  }

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 md:hidden"
          style={{ background: "var(--bg-modal-backdrop)" }}
          onClick={close}
          aria-hidden="true"
        />
      )}

      <FocusTrap
        active={isOpen}
        className={`
          fixed top-0 right-0 h-full z-40 flex flex-col overflow-hidden
          border-l w-full md:w-[360px]
          transition-transform duration-250
          ${isOpen ? "translate-x-0" : "translate-x-full"}
        `}
        style={{
          background:  "var(--bg-sidebar)",
          borderColor: "var(--border)",
          transition:  "transform 250ms ease",
        } as React.CSSProperties}
      >
        <div
          role="search"
          aria-label="Search Portfolio"
          className="flex flex-col h-full overflow-hidden"
        >
          {/* Header */}
          <div
            className="flex items-center justify-between px-5 py-4 border-b flex-shrink-0"
            style={{ borderColor: "var(--border)", background: "var(--bg-editor)" }}
          >
            <div className="flex items-center gap-2">
              <span>🔍</span>
              <span className="text-[13px] font-semibold" style={{ color: "var(--text-active)" }}>
                Search
              </span>
            </div>
            <button
              onClick={close}
              className="flex items-center justify-center w-6 h-6 rounded text-[14px]"
              style={{ color: "var(--text-secondary)" }}
              aria-label="Close Search"
            >
              ✕
            </button>
          </div>

          {/* Search input */}
          <div
            className="px-4 py-3 border-b flex-shrink-0 flex items-center gap-2"
            style={{ borderColor: "var(--border)", background: "var(--bg-sidebar)" }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
              style={{ color: "var(--text-secondary)", flexShrink: 0 }}>
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              ref={inputRef}
              type="search"
              placeholder="Search portfolio content..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 text-[13px] bg-transparent outline-none border-none"
              style={{
                color:       "var(--text-active)",
                fontFamily:  "var(--font-mono)",
              }}
              aria-label="Search query"
              autoComplete="off"
              spellCheck={false}
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="text-[11px] flex-shrink-0"
                style={{ color: "var(--text-muted)" }}
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>

          {/* Results */}
          <div className="flex-1 overflow-y-auto" role="listbox" aria-label="Search results">
            {/* Empty state — no query */}
            {!query.trim() && (
              <div className="px-5 py-6 flex flex-col gap-3">
                <div className="text-[11px] uppercase tracking-widest font-bold"
                  style={{ color: "var(--text-muted)" }}>
                  Quick Navigation
                </div>
                {SECTION_ORDER.map((sid) => (
                  <button
                    key={sid}
                    onClick={() => {
                      router.push(searchIndex(SECTION_LABELS[sid])?.[0]?.navigateTo ?? "/");
                      close();
                    }}
                    className="flex items-center gap-3 px-3 py-2 rounded text-[12px] text-left transition-colors duration-100 border"
                    style={{
                      background:  "var(--bg-hover)",
                      borderColor: "var(--border-light)",
                      color:       "var(--text-primary)",
                    }}
                  >
                    <span>📂</span>
                    <span>{SECTION_LABELS[sid]}</span>
                  </button>
                ))}
              </div>
            )}

            {/* No results */}
            {query.trim() && results.length === 0 && (
              <div
                className="px-5 py-8 text-center text-[12px] italic"
                style={{ color: "var(--tok-comment)" }}
              >
                {/* No results for &quot;{query}&quot; */}
                No results for &quot;{query}&quot;
              </div>
            )}

            {/* Grouped results */}
            {query.trim() && results.length > 0 &&
              SECTION_ORDER.map((sid) => {
                const entries = grouped[sid];
                if (!entries || entries.length === 0) return null;
                return (
                  <div key={sid}>
                    {/* Section header */}
                    <div
                      className="px-4 py-[6px] text-[10px] uppercase tracking-widest font-bold sticky top-0"
                      style={{
                        color:      "var(--text-muted)",
                        background: "var(--bg-editor)",
                        borderBottom: `1px solid var(--border-light)`,
                      }}
                    >
                      {SECTION_LABELS[sid]}
                      <span className="ml-1 opacity-60">({entries.length})</span>
                    </div>

                    {entries.map((entry) => (
                      <button
                        key={entry.id}
                        role="option"
                        aria-selected={false}
                        onClick={() => handleResultClick(entry)}
                        className="w-full text-left px-4 py-3 flex flex-col gap-[3px] transition-colors duration-100 border-b"
                        style={{
                          borderColor: "var(--border-light)",
                          color:       "var(--text-primary)",
                        }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLElement).style.background = "var(--bg-hover)";
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLElement).style.background = "transparent";
                        }}
                      >
                        <span className="text-[12px] font-mono" style={{ color: "var(--text-active)" }}>
                          {highlight(entry.preview)}
                        </span>
                        <span className="text-[10px]" style={{ color: "var(--tok-comment)" }}>
                          → {entry.navigateTo}
                        </span>
                      </button>
                    ))}
                  </div>
                );
              })
            }
          </div>

          {/* Footer */}
          {results.length > 0 && (
            <div
              className="px-5 py-2 text-[11px] flex-shrink-0 border-t"
              style={{ color: "var(--text-muted)", borderColor: "var(--border)", background: "var(--bg-editor)" }}
            >
              {results.length} result{results.length !== 1 ? "s" : ""} found
            </div>
          )}
        </div>
      </FocusTrap>
    </>
  );
}
