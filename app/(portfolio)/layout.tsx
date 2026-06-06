"use client";

// ── app/(portfolio)/layout.tsx ────────────────────────────────────────────────
// Main layout: wraps everything in AppStateProvider + ThemeProvider.
// Mounts all overlays (CommandPalette, ThemeSelector, Panels, Toast).
// Registers global keyboard shortcuts via usePortfolioShortcuts.
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useCallback, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import TitleBar from "@/components/TitleBar";
import ActivityBar from "@/components/ActivityBar";
import FileExplorer from "@/components/FileExplorer";
import StatusBar from "@/components/StatusBar";
import EditorTabs from "@/components/EditorTabs";
import CommandPalette from "@/components/CommandPalette";
import ThemeSelector from "@/components/ThemeSelector";
import SettingsPanel from "@/components/SettingsPanel";
import SearchPanel from "@/components/SearchPanel";
import CopilotPanel from "@/components/CopilotPanel";
import ShortcutsToast from "@/components/ShortcutsToast";
import ThemeProvider from "@/components/ThemeProvider";
import { AppStateProvider } from "@/lib/AppStateContext";
import { usePortfolioShortcuts } from "@/lib/useKeyboardShortcuts";
import { FileId, FILE_MAP } from "@/lib/fileContents";

const PATH_TO_FILE: Record<string, FileId> = {
  "/":           "about-me.ts",
  "/projects":   "projects.ts",
  "/skills":     "skills.json",
  "/experience": "experience.md",
  "/contact":    "contact.js",
};

const FILE_TO_PATH: Record<FileId, string> = {
  "about-me.ts":  "/",
  "projects.ts":  "/projects",
  "skills.json":  "/skills",
  "experience.md":"/experience",
  "contact.js":   "/contact",
};

// Inner layout — must be a child of AppStateProvider to access context
function PortfolioLayoutInner({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router   = useRouter();

  const activeFile: FileId = PATH_TO_FILE[pathname] ?? "about-me.ts";
  const [openFiles, setOpenFiles] = useState<FileId[]>([activeFile]);

  useEffect(() => {
    const fid = PATH_TO_FILE[pathname] ?? "about-me.ts";
    setOpenFiles((prev) => (prev.includes(fid) ? prev : [...prev, fid]));
  }, [pathname]);

  const handleFileOpen = useCallback(
    (fid: FileId) => {
      setOpenFiles((prev) => (prev.includes(fid) ? prev : [...prev, fid]));
      router.push(FILE_TO_PATH[fid]);
    },
    [router]
  );

  const handleTabClose = useCallback(
    (fid: FileId) => {
      setOpenFiles((prev) => {
        const next = prev.filter((f) => f !== fid);
        if (fid === activeFile) {
          const idx    = prev.indexOf(fid);
          const newFid = next[Math.min(idx, next.length - 1)];
          router.push(newFid ? FILE_TO_PATH[newFid] : "/");
        }
        return next;
      });
    },
    [activeFile, router]
  );

  const currentLang = FILE_MAP[activeFile].language;

  // Register all keyboard shortcuts (Ctrl+B, Ctrl+Shift+P, etc.)
  usePortfolioShortcuts(router);

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-editor">
      {/* Theme provider applies CSS variables on activeTheme change */}
      <ThemeProvider />

      {/* ── Title bar ────────────────────────────────────────────────────── */}
      <TitleBar />

      {/* ── Main workspace ───────────────────────────────────────────────── */}
      <div className="flex flex-1 overflow-hidden relative">
        <ActivityBar activeFile={activeFile} onFileOpen={handleFileOpen} />
        <FileExplorer activeFile={activeFile} onFileOpen={handleFileOpen} />

        {/* Editor column */}
        <div className="flex-1 flex flex-col overflow-hidden bg-editor min-w-0">
          <EditorTabs
            openFiles={openFiles}
            activeFile={activeFile}
            onTabClick={(fid) => router.push(FILE_TO_PATH[fid])}
            onTabClose={handleTabClose}
          />
          <div className="flex-1 overflow-y-auto">
            {children}
          </div>
        </div>

        {/* ── Right-side panels (one at a time, slide from right) ─────────── */}
        <SettingsPanel />
        <SearchPanel />
        <CopilotPanel activeFile={activeFile} />
      </div>

      {/* ── Status bar ───────────────────────────────────────────────────── */}
      <StatusBar activeFile={activeFile} language={currentLang} />

      {/* ── Global overlays (z-50+, mounted outside flex layout) ────────── */}
      <CommandPalette />
      <ThemeSelector />
      <ShortcutsToast />
    </div>
  );
}

// Outer layout — provides AppStateContext to everything
export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppStateProvider>
      <PortfolioLayoutInner>{children}</PortfolioLayoutInner>
    </AppStateProvider>
  );
}
