"use client";

// ── components/FileExplorer.tsx ───────────────────────────────────────────────
// Modified: Sidebar toggle from AppStateContext (Ctrl+B).
// Desktop: smooth width transition (0 ↔ 240px).
// Mobile: absolute overlay drawer with backdrop click to close.
// ─────────────────────────────────────────────────────────────────────────────

import { useState } from "react";
import { FILES, FileId } from "@/lib/fileContents";
import { useAppState, useAppActions } from "@/lib/AppStateContext";

interface Props {
  activeFile: FileId | null;
  onFileOpen: (f: FileId) => void;
}

function ExtBadge({ ext }: { ext: string }) {
  const colours: Record<string, string> = {
    ts:   "#3178c6",
    js:   "#f0db4f",
    json: "#dbb879",
    md:   "#aaa",
  };
  const c = colours[ext] ?? "#888";
  return (
    <span
      className="inline-block w-2 h-2 rounded-full flex-shrink-0"
      style={{ background: c }}
    />
  );
}

export default function FileExplorer({ activeFile, onFileOpen }: Props) {
  const [folderOpen, setFolderOpen] = useState(true);
  const { sidebarOpen } = useAppState();
  const actions = useAppActions();

  const handleFileClick = (fid: FileId) => {
    onFileOpen(fid);
    // On mobile, close sidebar after navigation
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      actions.setSidebar(false);
    }
  };

  const content = (
    <div
      className="flex flex-col overflow-hidden h-full"
      aria-label="File Explorer"
      aria-expanded={sidebarOpen}
    >
      {/* Header */}
      <div className="px-4 pt-[14px] pb-2 text-[11px] font-bold tracking-[0.1em] uppercase flex-shrink-0 text-text-secondary">
        Explorer
      </div>

      {/* Root folder row */}
      <div
        className="flex items-center gap-[6px] px-3 py-[5px] text-[13px] cursor-pointer select-none hover:bg-hover text-text-primary"
        onClick={() => setFolderOpen((o) => !o)}
        role="button"
        aria-expanded={folderOpen}
        aria-label="Toggle PORTFOLIO folder"
      >
        <span className="text-[10px] text-text-secondary">
          {folderOpen ? "▾" : "▸"}
        </span>
        <span className="text-[12px] text-text-secondary">📁</span>
        <span className="font-semibold text-[12px] tracking-[0.04em]">PORTFOLIO</span>
      </div>

      {/* File list */}
      {folderOpen && (
        <div className="overflow-y-auto flex-1" role="tree">
          {FILES.map((f) => {
            const ext      = f.id.split(".").pop() ?? "";
            const isActive = activeFile === f.id;
            return (
              <div
                key={f.id}
                role="treeitem"
                aria-selected={isActive}
                tabIndex={0}
                className={`flex items-center gap-2 py-[6px] pr-3 pl-8 text-[13px] cursor-pointer select-none transition-colors duration-100 ${
                  isActive
                    ? "bg-selected text-text-active"
                    : "text-text-primary hover:bg-hover"
                }`}
                onClick={() => handleFileClick(f.id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") handleFileClick(f.id);
                }}
              >
                <ExtBadge ext={ext} />
                <span className="text-[14px] flex-shrink-0">{f.icon}</span>
                <span>{f.id}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* ── Desktop: smooth width transition ──────────────────────────────── */}
      <div
        className="hidden md:flex flex-col flex-shrink-0 overflow-hidden border-r border-border-light bg-sidebar transition-[width] duration-200 ease-in-out"
        style={{ width: sidebarOpen ? "var(--explorer-w)" : "0px" }}
      >
        <div style={{ width: "var(--explorer-w)", minWidth: "var(--explorer-w)" }} className="h-full">
          {content}
        </div>
      </div>

      {/* ── Mobile: absolute overlay drawer ───────────────────────────────── */}
      <>
        {/* Backdrop */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-20 md:hidden"
            style={{ background: "var(--bg-modal-backdrop)" }}
            onClick={() => actions.setSidebar(false)}
            aria-hidden="true"
          />
        )}
        {/* Drawer */}
        <div
          className={`
            md:hidden fixed top-0 left-0 h-full z-30 flex flex-col overflow-hidden
            border-r bg-sidebar border-border-light transition-transform duration-200
            w-[var(--explorer-w)]
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          `}
        >
          {content}
        </div>
      </>
    </>
  );
}
