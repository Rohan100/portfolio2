"use client";

import { useState } from "react";

const skillCategories = [
  {
    key: "languages", label: "Languages", icon: "🔤", color: "#569cd6",
    skills: [
      { name: "TypeScript", level: 90, color: "#3178c6" },
      { name: "JavaScript", level: 92, color: "#f0db4f" },
      { name: "Python",     level: 80, color: "#3572a5" },
      { name: "Java",       level: 70, color: "#b07219" },
      { name: "C++",        level: 65, color: "#f34b7d" },
    ],
  },
  {
    key: "frontend", label: "Frontend", icon: "🎨", color: "#61dafb",
    skills: [
      { name: "React",         level: 92, color: "#61dafb" },
      { name: "Next.js",       level: 88, color: "#d4d4d4" },
      { name: "TailwindCSS",   level: 85, color: "#38bdf8" },
      { name: "D3.js",         level: 70, color: "#f9a03c" },
      { name: "HTML5 / CSS3",  level: 95, color: "#e34c26" },
    ],
  },
  {
    key: "backend", label: "Backend", icon: "⚙️", color: "#68a063",
    skills: [
      { name: "Node.js",   level: 88, color: "#68a063" },
      { name: "Express",   level: 85, color: "#d4d4d4" },
      { name: "REST APIs", level: 90, color: "#4ec9b0" },
      { name: "Socket.IO", level: 80, color: "#010101" },
      { name: "GraphQL",   level: 65, color: "#e535ab" },
    ],
  },
  {
    key: "ai_ml", label: "AI / ML", icon: "🤖", color: "#ce9178",
    skills: [
      { name: "Machine Learning", level: 75, color: "#ff6b6b" },
      { name: "scikit-learn",     level: 72, color: "#f7931e" },
      { name: "Pandas / NumPy",   level: 80, color: "#150458" },
      { name: "LLM Integration",  level: 85, color: "#dcdcaa" },
      { name: "RAG Pipelines",    level: 78, color: "#ce9178" },
      { name: "LangChain",        level: 75, color: "#1c3c3c" },
    ],
  },
  {
    key: "databases", label: "Databases", icon: "🗄️", color: "#b5cea8",
    skills: [
      { name: "PostgreSQL", level: 82, color: "#336791" },
      { name: "MongoDB",    level: 80, color: "#47a248" },
      { name: "Redis",      level: 70, color: "#dc382d" },
      { name: "Supabase",   level: 75, color: "#3ecf8e" },
    ],
  },
  {
    key: "devops_tools", label: "DevOps / Tools", icon: "🐳", color: "#9cdcfe",
    skills: [
      { name: "Docker",       level: 80, color: "#2496ed" },
      { name: "Git / GitHub", level: 92, color: "#f05032" },
      { name: "Linux",        level: 78, color: "#fcc624" },
      { name: "Nginx",        level: 72, color: "#009639" },
      { name: "VS Code",      level: 99, color: "#007acc" },
      { name: "Vercel",       level: 85, color: "#d4d4d4" },
      { name: "AWS (S3, EC2)", level: 68, color: "#ff9900" },
    ],
  },
];

const learningNow = ["Rust", "WebAssembly", "Kubernetes"];

export default function SkillsPageUI() {
  const [activeCategory, setActiveCategory] = useState<string>("languages");
  const active = skillCategories.find((c) => c.key === activeCategory)!;

  return (
    <div className="px-9 pt-7 pb-0 flex flex-col font-mono text-[13px]">
      {/* Header */}
      <div className="text-[14px] mb-5">
        <span className="tok-keyword">const</span>{" "}
        <span className="tok-variable">skills</span>
        <span className="tok-punctuation">: </span>
        <span className="tok-type">SkillMap</span>
        <span className="tok-punctuation"> = &#123;</span>
      </div>

      <div className="flex flex-1">
        {/* Category tabs */}
        <div className="flex flex-col gap-1 w-40 flex-shrink-0 pr-4 border-r border-border-light">
          {skillCategories.map((cat) => {
            const isActive = activeCategory === cat.key;
            return (
              <button
                key={cat.key}
                className="flex items-center gap-2 px-3 py-2 rounded text-[12px] text-left border cursor-pointer transition-all duration-150 font-mono"
                style={{
                  background:   isActive ? "var(--bg-selected)"  : "transparent",
                  color:        isActive ? cat.color              : "var(--text-secondary)",
                  borderColor:  isActive ? cat.color              : "transparent",
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    (e.currentTarget as HTMLElement).style.background = "var(--bg-hover)";
                    (e.currentTarget as HTMLElement).style.color      = "var(--text-primary)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    (e.currentTarget as HTMLElement).style.background = "transparent";
                    (e.currentTarget as HTMLElement).style.color      = "var(--text-secondary)";
                  }
                }}
                onClick={() => setActiveCategory(cat.key)}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Skill bars panel */}
        <div className="flex-1 pl-6">
          <div className="text-[13px] mb-4">
            <span style={{ color: active.color }}>{active.icon} {active.label}</span>
            <span className="tok-punctuation"> = [</span>
          </div>

          <div className="flex flex-col gap-[14px] max-w-[500px]">
            {active.skills.map((skill) => (
              <div key={skill.name} className="flex flex-col gap-[5px]">
                <div className="flex justify-between items-center">
                  <span className="text-[12px] text-text-primary">{skill.name}</span>
                  <span className="text-[11px] font-semibold" style={{ color: skill.color }}>
                    {skill.level}%
                  </span>
                </div>
                <div className="h-[6px] rounded-[3px] overflow-hidden bg-activity">
                  <div
                    className="h-full rounded-[3px] bar-grow"
                    style={{
                      width:      `${skill.level}%`,
                      background: `linear-gradient(90deg, ${skill.color}99, ${skill.color})`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 text-[13px] tok-punctuation">];</div>
        </div>
      </div>

      {/* Currently Learning */}
      <div className="mt-6 pt-5 border-t border-border-light flex flex-col gap-[10px]">
        <div className="tok-comment">{`// currently_learning — always growing 🌱`}</div>
        <div className="flex gap-[10px] flex-wrap">
          {learningNow.map((tech) => (
            <span
              key={tech}
              className="inline-flex items-center gap-2 px-[14px] py-[6px] rounded-[20px] text-[12px] border"
              style={{
                borderColor: "rgba(78,201,176,0.4)",
                color:       "#4ec9b0",
                background:  "rgba(78,201,176,0.08)",
              }}
            >
              <span className="w-[6px] h-[6px] bg-[#4ec9b0] rounded-full flex-shrink-0 pulse-green" />
              {tech}
            </span>
          ))}
        </div>
      </div>

      <div className="tok-punctuation px-0 pb-6 mt-4">&#125;;</div>
    </div>
  );
}
