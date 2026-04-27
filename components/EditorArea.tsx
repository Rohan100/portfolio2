"use client";

import { FileId } from "@/lib/fileContents";
import AboutPageUI from "./pages/AboutPage";
import ProjectsPageUI from "./pages/ProjectsPage";
import SkillsPageUI from "./pages/SkillsPage";
import ExperiencePageUI from "./pages/ExperiencePage";
import ContactPageUI from "./pages/ContactPage";

interface Props {
  activeFile: FileId | null;
}

const FILE_TO_UI: Record<FileId, React.ReactNode> = {
  "about-me.ts":  <AboutPageUI />,
  "projects.ts":  <ProjectsPageUI />,
  "skills.json":  <SkillsPageUI />,
  "experience.md":<ExperiencePageUI />,
  "contact.js":   <ContactPageUI />,
};

export default function EditorArea({ activeFile }: Props) {
  if (!activeFile) {
    return (
      <div className="flex-1 flex flex-col overflow-hidden bg-editor">
        <div className="flex flex-col items-center justify-center h-full gap-4 text-text-muted">
          <div className="text-[64px] opacity-15">⌨️</div>
          <div className="text-[20px] font-semibold text-text-secondary">
            Rohan Nagare
          </div>
          <div className="text-[13px]">Select a file from the explorer to get started</div>
          <div className="flex gap-3 mt-2">
            <a
              href="https://github.com/rohannagare"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-[6px] text-[13px] no-underline text-tok-variable"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/rohannagare"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-[6px] text-[13px] no-underline text-tok-variable"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-editor">
      {/* Breadcrumb */}
      <div className="flex items-center gap-[6px] px-4 py-[7px] text-[12px] border-b flex-shrink-0 text-text-secondary border-border-light bg-editor">
        <span>portfolio</span>
        <span className="text-text-muted">›</span>
        <span className="text-text-primary">{activeFile}</span>
      </div>

      {/* Rich UI content */}
      <div
        key={activeFile}
        className="flex-1 overflow-y-auto overflow-x-hidden py-6 relative fade-in"
      >
        {FILE_TO_UI[activeFile]}
      </div>
    </div>
  );
}
