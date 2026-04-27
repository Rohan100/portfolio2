"use client";

import { useState } from "react";
import { FILES, FileId } from "@/lib/fileContents";

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

  return (
    <div className="flex flex-col overflow-hidden flex-shrink-0 transition-[width] duration-200 ease-in-out border-r w-[var(--explorer-w)] bg-sidebar border-border-light">
      {/* Header */}
      <div className="px-4 pt-[14px] pb-2 text-[11px] font-bold tracking-[0.1em] uppercase flex-shrink-0 text-text-secondary">
        Explorer
      </div>

      {/* Root folder row */}
      <div
        className="flex items-center gap-[6px] px-3 py-[5px] text-[13px] cursor-pointer select-none hover:bg-hover text-text-primary"
        onClick={() => setFolderOpen((o) => !o)}
      >
        <span className="text-[10px] text-text-secondary">
          {folderOpen ? "▾" : "▸"}
        </span>
        <span className="text-[12px] text-text-secondary">📁</span>
        <span className="font-semibold text-[12px] tracking-[0.04em]">PORTFOLIO</span>
      </div>

      {/* File list */}
      {folderOpen && (
        <div className="overflow-y-auto flex-1">
          {FILES.map((f) => {
            const ext = f.id.split(".").pop() ?? "";
            const isActive = activeFile === f.id;
            return (
              <div
                key={f.id}
                className={`flex items-center gap-2 py-1 pr-3 pl-8 text-[13px] cursor-pointer select-none transition-colors duration-100 ${
                  isActive
                    ? "bg-selected text-text-active"
                    : "text-text-primary hover:bg-hover"
                }`}
                onClick={() => onFileOpen(f.id)}
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
}
