"use client";

import { useState, useEffect } from "react";

const currentlyDoing = [
  "Building a VS Code Extension — Code Context Navigator",
  "Exploring Large Language Models and RAG pipelines",
  "Contributing to open-source developer tooling",
];

const interests = [
  { icon: "🌐", label: "Full-Stack Web Development" },
  { icon: "🤖", label: "Artificial Intelligence & ML" },
  { icon: "🛠️", label: "Developer Tools & DX" },
  { icon: "⚡", label: "Competitive Programming" },
];

const stats = [
  { label: "GitHub Contributions",      value: "400+", icon: "📊" },
  { label: "VS Code Extension Installs", value: "200+", icon: "🔌" },
  { label: "LeetCode Problems",          value: "450+", icon: "🧩" },
  { label: "Projects Shipped",           value: "10+",  icon: "🚀" },
];

export default function AboutPageUI() {
  const [blink,     setBlink]     = useState(true);
  const [typedText, setTypedText] = useState("");
  const fullName = "Rohan Nagare";

  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      setTypedText(fullName.slice(0, i + 1));
      i++;
      if (i >= fullName.length) clearInterval(id);
    }, 80);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const id = setInterval(() => setBlink((b) => !b), 530);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="p-8 flex flex-col gap-7 max-w-[820px] font-mono text-[13px]">
      {/* ── Hero ─────────────────────────────────────────── */}
      <div className="flex items-start gap-7">
        {/* Avatar */}
        <div className="relative flex-shrink-0">
          <div
            className="w-[84px] h-[84px] rounded-full flex items-center justify-center text-[40px] relative z-10"
            style={{
              background: "linear-gradient(135deg,#094771,#007acc)",
              boxShadow: "0 0 0 2px var(--border), 0 8px 24px rgba(0,122,204,0.25)",
            }}
          >
            👨‍💻
          </div>
          {/* Ring */}
          <div className="absolute inset-[-4px] rounded-full border-2 border-accent opacity-50 ring-pulse" />
          {/* Online dot */}
          <span
            className="absolute bottom-1 right-1 w-[14px] h-[14px] bg-[#4ec9b0] rounded-full border-2 border-editor z-20 pulse-green"
            title="Available for opportunities"
          />
        </div>

        {/* Text */}
        <div className="flex-1">
          <span className="inline-block text-[11px] italic mb-1 tok-comment">
            // Software Developer
          </span>
          <h1
            className="text-[28px] font-bold mb-[6px] tracking-[-0.5px] leading-[1.2] text-text-active font-sans"
          >
            {typedText}
            <span
              className="font-light ml-[2px] transition-opacity duration-100 text-accent"
              style={{ opacity: blink ? 1 : 0 }}
            >
              |
            </span>
          </h1>
          <p className="text-[12px] mb-[10px] flex items-center gap-1 text-text-secondary">
            <span>📍</span> Pune, India
          </p>
          <p className="text-[13px] leading-[1.7] max-w-[520px] mb-4 text-text-secondary font-sans">
            Final year IT Engineering student passionate about Web Development, AI, and building
            innovative developer tools that make engineers&#39; lives easier.
          </p>

          {/* Action buttons */}
          <div className="flex gap-[10px] flex-wrap">
            <a
              href="https://github.com/rohannagare"
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-[6px] px-4 py-[7px] rounded text-[12px] no-underline cursor-pointer border transition-all duration-150 bg-accent text-white border-accent hover:bg-accent-light font-mono"
            >
              <GithubIcon /> GitHub
            </a>
            <a
              href="https://linkedin.com/in/rohannagare"
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-[6px] px-4 py-[7px] rounded text-[12px] no-underline cursor-pointer border transition-all duration-150 font-mono"
              style={{ background: "rgba(0,119,181,0.12)", color: "#0077b5", borderColor: "#0077b5" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(0,119,181,0.2)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(0,119,181,0.12)")}
            >
              <LinkedinIcon /> LinkedIn
            </a>
            <a
              href="mailto:rohannagare.dev@gmail.com"
              className="inline-flex items-center gap-[6px] px-4 py-[7px] rounded text-[12px] no-underline cursor-pointer border transition-all duration-150 text-text-secondary border-border hover:bg-hover hover:text-text-primary font-mono"
            >
              <MailIcon /> Email Me
            </a>
          </div>
        </div>
      </div>

      {/* ── Stats ─────────────────────────────────────────── */}
      <div className="grid grid-cols-4 gap-3">
        {stats.map((s) => (
          <div
            key={s.label}
            className="flex flex-col gap-1 rounded-[6px] px-4 py-[14px] border border-border-light bg-sidebar transition-colors duration-150 cursor-default hover:border-accent hover:bg-[rgba(0,122,204,0.06)]"
          >
            <span className="text-[16px]">{s.icon}</span>
            <span className="text-[22px] font-bold text-tok-variable font-sans">
              {s.value}
            </span>
            <span className="text-[11px] text-text-muted">{s.label}</span>
          </div>
        ))}
      </div>

      {/* ── Currently Doing ───────────────────────────────── */}
      <div className="rounded-[6px] px-5 py-4 border border-border-light bg-sidebar">
        <div className="text-[13px] mb-3">
          <span className="inline-block w-2 h-2 rounded-full mr-[6px] align-middle bg-[#4ec9b0]" />
          <span className="tok-variable">currentlyDoing</span>
          <span className="tok-punctuation"> = [</span>
        </div>
        <div className="flex flex-col gap-[6px]">
          {currentlyDoing.map((item, i) => (
            <div key={i} className="flex gap-[10px] items-start pl-2">
              <span className="flex-shrink-0 w-6 text-[13px] text-tok-keyword">[{i}]</span>
              <span className="text-[13px] leading-[1.5] tok-string">
                <span className="text-tok-string">&quot;</span>{item}<span className="text-tok-string">&quot;</span>
              </span>
            </div>
          ))}
        </div>
        <div className="mt-[10px] text-[13px] tok-punctuation">];</div>
      </div>

      {/* ── Interests ────────────────────────────────────── */}
      <div className="rounded-[6px] px-5 py-4 border border-border-light bg-sidebar">
        <div className="text-[13px] mb-3">
          <span className="inline-block w-2 h-2 rounded-full mr-[6px] align-middle bg-tok-function" />
          <span className="tok-variable">interests</span>
          <span className="tok-punctuation"> = [</span>
        </div>
        <div className="flex flex-wrap gap-2 mb-1">
          {interests.map((item) => (
            <div
              key={item.label}
              className="inline-flex items-center gap-[6px] px-3 py-[5px] rounded-[20px] text-[12px] border border-[rgba(86,156,214,0.3)] text-text-primary transition-colors duration-150 cursor-default hover:border-tok-keyword"
              style={{ background: "rgba(86,156,214,0.1)" }}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </div>
          ))}
        </div>
        <div className="mt-[10px] text-[13px] tok-punctuation">];</div>
      </div>

      {/* ── Fun Fact ──────────────────────────────────────── */}
      <div
        className="text-[12px] px-4 py-3 border-l-[3px] rounded-r-[4px] text-text-secondary"
        style={{ background: "rgba(106,153,85,0.08)", borderLeftColor: "var(--tok-comment)" }}
      >
        <span className="tok-comment">// funFact:</span>{" "}
        <span className="tok-string">
          &quot;I wrote my first program at 15 and haven&apos;t stopped since.&quot;
        </span>
      </div>
    </div>
  );
}

function GithubIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

function LinkedinIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}
