"use client";

import { useState } from "react";

interface Project {
  name: string;
  description: string;
  techStack: string[];
  highlights: string[];
  github: string;
  status: "active" | "complete" | "in-progress";
}

const projects: Project[] = [
  {
    name: "Code Context Navigator",
    description:
      "A VS Code extension that intelligently maps code dependencies, generates semantic summaries of functions, and provides instant context navigation across large codebases.",
    techStack: ["TypeScript", "VS Code API", "Tree-sitter", "LLM"],
    highlights: [
      "Semantic code graph generation",
      "AI-powered function summaries",
      "Cross-file dependency tracking",
    ],
    github: "https://github.com/rohannagare",
    status: "active",
  },
  {
    name: "Multiplayer Battleship Game",
    description:
      "Real-time multiplayer Battleship with rooms, spectators, in-game chat, and a match replay system — built entirely with Node.js and Socket.IO.",
    techStack: ["Node.js", "Socket.IO", "React", "TypeScript"],
    highlights: ["< 50 ms round-trip latency", "Room-based matchmaking", "Live spectator mode"],
    github: "https://github.com/rohannagare",
    status: "complete",
  },
  {
    name: "Safe Neighborhood Map",
    description:
      "A community-driven safety heatmap that aggregates incident reports with D3.js visualisations. Built in 24 hours at a hackathon.",
    techStack: ["React", "D3.js", "Node.js", "MongoDB"],
    highlights: [
      "Hackathon winner — Best Social Impact",
      "Real-time incident clustering",
      "Interactive heatmap overlays",
    ],
    github: "https://github.com/rohannagare",
    status: "complete",
  },
  {
    name: "Web IDE with Subdomain Hosting",
    description:
      "A browser-based IDE where each user project gets its own live subdomain. Supports Monaco editor, terminal emulation, and one-click Docker deployments.",
    techStack: ["Next.js", "Monaco Editor", "Docker", "Nginx", "PostgreSQL"],
    highlights: [
      "Wildcard subdomain routing",
      "Isolated container sandboxing",
      "Collaborative editing (WIP)",
    ],
    github: "https://github.com/rohannagare",
    status: "in-progress",
  },
];

const statusConfig = {
  active:       { label: "● Active",      color: "#4ec9b0", bg: "rgba(78,201,176,0.12)" },
  complete:     { label: "✓ Complete",    color: "#b5cea8", bg: "rgba(181,206,168,0.12)" },
  "in-progress":{ label: "⟳ In Progress", color: "#dcdcaa", bg: "rgba(220,220,170,0.12)" },
};

const techColors: Record<string, string> = {
  TypeScript:     "#3178c6",
  JavaScript:     "#f0db4f",
  "Node.js":      "#68a063",
  React:          "#61dafb",
  "Next.js":      "#ffffff",
  "Socket.IO":    "#010101",
  "D3.js":        "#f9a03c",
  MongoDB:        "#47a248",
  PostgreSQL:     "#336791",
  Docker:         "#2496ed",
  Nginx:          "#009639",
  "VS Code API":  "#007acc",
  "Tree-sitter":  "#569cd6",
  LLM:            "#ce9178",
  "Monaco Editor":"#007acc",
};

export default function ProjectsPageUI() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div className="px-9 pt-7 pb-6 flex flex-col gap-[6px] font-mono text-[13px]">
      {/* Header */}
      <div className="mb-4">
        <div className="text-[14px] mb-2">
          <span className="tok-keyword">const</span>{" "}
          <span className="tok-variable">projects</span>
          <span className="tok-punctuation">: </span>
          <span className="tok-type">Project</span>
          <span className="tok-punctuation">[] = [</span>
        </div>
        <p className="text-[12px] italic pl-1 text-text-muted font-sans">
          Things I&apos;ve built — from weekend hacks to shipped products.
        </p>
      </div>

      {/* Grid */}
      <div className="flex flex-col gap-[10px] mb-3">
        {projects.map((project, i) => {
          const status = statusConfig[project.status];
          const isOpen = expanded === project.name;

          return (
            <div
              key={project.name}
              className={`rounded-[6px] px-5 py-4 cursor-pointer border transition-colors duration-150 ${
                isOpen
                  ? "border-accent bg-[rgba(0,122,204,0.05)]"
                  : "border-border-light bg-sidebar hover:bg-hover"
              }`}
              onClick={() => setExpanded(isOpen ? null : project.name)}
            >
              {/* Top row */}
              <div className="flex items-start gap-3">
                <div className="text-[16px] flex-shrink-0 w-7 pt-[2px]">
                  <span className="tok-number">{i}</span>
                  <span className="tok-punctuation">.</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-[10px] mb-[6px] flex-wrap">
                    <span className="text-[15px] font-semibold text-text-active font-sans">
                      {project.name}
                    </span>
                    <span
                      className="text-[11px] px-2 py-[2px] rounded-[12px] font-mono"
                      style={{ color: status.color, background: status.bg }}
                    >
                      {status.label}
                    </span>
                  </div>
                  <p className="text-[12px] leading-[1.6] text-text-secondary font-sans">
                    {project.description}
                  </p>
                </div>
                <span className="flex-shrink-0 text-[14px] pt-[2px] transition-transform duration-200 text-text-muted">
                  {isOpen ? "▾" : "▸"}
                </span>
              </div>

              {/* Tech pills */}
              <div className="flex flex-wrap gap-[6px] mt-3 pl-10">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="text-[11px] px-2 py-[2px] rounded-[3px] border opacity-85 hover:opacity-100 transition-opacity duration-150"
                    style={{
                      borderColor: techColors[tech] ?? "#555",
                      color:       techColors[tech] ?? "#d4d4d4",
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Expanded highlights */}
              {isOpen && (
                <div className="mt-[14px] pl-10 flex flex-col gap-[6px] fade-in">
                  <div className="text-[12px] mb-1 tok-comment">// highlights</div>
                  {project.highlights.map((h, hi) => (
                    <div key={hi} className="flex gap-2 text-[12px] text-text-primary">
                      <span className="tok-operator">→</span>
                      <span>{h}</span>
                    </div>
                  ))}
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-[6px] mt-2 px-3 py-[5px] rounded no-underline text-[12px] border transition-all duration-150 bg-editor border-border text-text-secondary hover:border-text-secondary hover:text-text-active"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <GithubIcon /> View on GitHub
                  </a>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-1 text-[13px]">
        <span className="tok-punctuation">];</span>
        <span className="tok-comment"> // {projects.length} projects total</span>
      </div>
    </div>
  );
}

function GithubIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}
