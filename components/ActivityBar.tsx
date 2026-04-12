"use client";

import { FileId } from "@/lib/fileContents";

type Panel = "explorer" | "projects" | "skills" | "experience" | "contact";

interface Props {
  activePanel: Panel | null;
  onPanelChange: (p: Panel) => void;
  onFileOpen: (f: FileId) => void;
}

const ICONS: { id: Panel; label: string; svg: React.ReactNode }[] = [
  {
    id: "explorer",
    label: "Explorer",
    svg: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 3h7l2 3h9v14H3z" />
      </svg>
    ),
  },
  {
    id: "projects",
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
    id: "skills",
    label: "Skills",
    svg: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    id: "experience",
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
    id: "contact",
    label: "Contact",
    svg: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
];

// Maps each panel to its corresponding file
const PANEL_TO_FILE: Record<Panel, FileId> = {
  explorer: "about-me.ts",
  projects: "projects.ts",
  skills: "skills.json",
  experience: "experience.md",
  contact: "contact.js",
};

export default function ActivityBar({ activePanel, onPanelChange, onFileOpen }: Props) {
  const handleClick = (id: Panel) => {
    onPanelChange(id);
    onFileOpen(PANEL_TO_FILE[id]);
  };

  return (
    <div className="activity-bar">
      {ICONS.map(({ id, label, svg }) => (
        <div
          key={id}
          className={`activity-icon${activePanel === id ? " active" : ""}`}
          onClick={() => handleClick(id)}
        >
          {svg}
          <span className="activity-tooltip">{label}</span>
        </div>
      ))}
    </div>
  );
}
