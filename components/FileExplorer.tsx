"use client";

import { useState } from "react";
import { FILES, FileId } from "@/lib/fileContents";

interface Props {
  activeFile: FileId | null;
  onFileOpen: (f: FileId) => void;
}

// Extension → display colour hint
function ExtBadge({ ext }: { ext: string }) {
  const colours: Record<string, string> = {
    ts: "#3178c6",
    js: "#f0db4f",
    json: "#dbb879",
    md: "#aaa",
  };
  const c = colours[ext] ?? "#888";
  return (
    <span
      style={{
        display: "inline-block",
        width: 8,
        height: 8,
        borderRadius: "50%",
        background: c,
        flexShrink: 0,
      }}
    />
  );
}

export default function FileExplorer({ activeFile, onFileOpen }: Props) {
  const [folderOpen, setFolderOpen] = useState(true);

  return (
    <div className="sidebar-panel">
      <div className="sidebar-header">Explorer</div>

      {/* Root folder row */}
      <div
        className="file-tree-folder"
        onClick={() => setFolderOpen((o) => !o)}
      >
        <span style={{ fontSize: 10, color: "var(--text-secondary)" }}>
          {folderOpen ? "▾" : "▸"}
        </span>
        <span style={{ fontSize: 12, color: "var(--text-secondary)" }}>📁</span>
        <span style={{ fontWeight: 600, fontSize: 12, letterSpacing: "0.04em" }}>
          PORTFOLIO
        </span>
      </div>

      {/* File list */}
      {folderOpen && (
        <div className="file-tree">
          {FILES.map((f) => {
            const ext = f.id.split(".").pop() ?? "";
            return (
              <div
                key={f.id}
                className={`file-item${activeFile === f.id ? " active" : ""}`}
                onClick={() => onFileOpen(f.id)}
              >
                <ExtBadge ext={ext} />
                <span className="file-icon">{f.icon}</span>
                <span>{f.id}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
