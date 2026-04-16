"use client";

import { FileId } from "@/lib/fileContents";

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

export default function ActivityBar({ activeFile, onFileOpen }: Props) {
  const activePanel = FILE_TO_PANEL[activeFile];

  return (
    <div className="flex flex-col items-center py-1 flex-shrink-0 z-10 border-r border-black bg-activity w-[var(--activity-w)]">
      {ICONS.map(({ fileId, label, svg }) => {
        const panel = FILE_TO_PANEL[fileId];
        const isActive = activePanel === panel;
        return (
          <div
            key={fileId}
            className={`relative w-12 h-12 flex items-center justify-center cursor-pointer transition-colors duration-150 ${
              isActive
                ? "text-text-active activity-icon-active"
                : "text-text-secondary hover:text-text-active"
            }`}
            onClick={() => onFileOpen(fileId)}
          >
            {svg}
            {/* Tooltip */}
            <span
              className="absolute left-[calc(var(--activity-w)+8px)] bg-[#090909] text-[#ccc] text-[11px] px-2 py-1 rounded-[3px] whitespace-nowrap pointer-events-none opacity-0 z-[100] transition-opacity duration-150 border border-[#424242] group-hover:opacity-100"
              style={{ opacity: 0 }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = "1")}
            >
              {label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
