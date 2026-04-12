"use client";

import { useState, useCallback } from "react";
import TitleBar from "@/components/TitleBar";
import ActivityBar from "@/components/ActivityBar";
import FileExplorer from "@/components/FileExplorer";
import EditorTabs from "@/components/EditorTabs";
import EditorArea from "@/components/EditorArea";
import StatusBar from "@/components/StatusBar";
import { FileId, FILE_MAP } from "@/lib/fileContents";

type Panel = "explorer" | "projects" | "skills" | "experience" | "contact";

export default function PortfolioPage() {
  const [activePanel, setActivePanel] = useState<Panel | null>("explorer");
  const [openFiles, setOpenFiles] = useState<FileId[]>(["about-me.ts"]);
  const [activeFile, setActiveFile] = useState<FileId | null>("about-me.ts");

  // Open a file: add to tab list if not already open, make it active
  const handleFileOpen = useCallback((fid: FileId) => {
    setOpenFiles((prev) =>
      prev.includes(fid) ? prev : [...prev, fid]
    );
    setActiveFile(fid);
  }, []);

  // Close a tab
  const handleTabClose = useCallback(
    (fid: FileId) => {
      setOpenFiles((prev) => {
        const next = prev.filter((f) => f !== fid);
        if (activeFile === fid) {
          // switch to adjacent tab
          const idx = prev.indexOf(fid);
          const newActive = next[Math.min(idx, next.length - 1)] ?? null;
          setActiveFile(newActive);
        }
        return next;
      });
    },
    [activeFile]
  );

  const currentLang = activeFile ? FILE_MAP[activeFile].language : "plaintext";

  return (
    <div className="vscode-shell">
      {/* ── Title bar ─────────────────────────────── */}
      <TitleBar />

      {/* ── Main workspace ────────────────────────── */}
      <div className="main-area">
        {/* Activity bar */}
        <ActivityBar
          activePanel={activePanel}
          onPanelChange={setActivePanel}
          onFileOpen={handleFileOpen}
        />

        {/* File explorer sidebar — toggles with activity bar */}
        {activePanel && (
          <FileExplorer
            activeFile={activeFile}
            onFileOpen={handleFileOpen}
          />
        )}

        {/* Editor column */}
        <div className="editor-container">
          {/* Tab bar */}
          <EditorTabs
            openFiles={openFiles}
            activeFile={activeFile}
            onTabClick={setActiveFile}
            onTabClose={handleTabClose}
          />

          {/* Editor content */}
          <EditorArea activeFile={activeFile} />
        </div>
      </div>

      {/* ── Status bar ────────────────────────────── */}
      <StatusBar activeFile={activeFile} language={currentLang} />
    </div>
  );
}
