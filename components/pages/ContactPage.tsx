"use client";

import { useState } from "react";

const contactLinks = [
  {
    id: "github",
    icon: <GithubIcon />,
    label: "GitHub",
    value: "github.com/rohannagare",
    href: "https://github.com/rohannagare",
    color: "#d4d4d4",
    bg: "rgba(212,212,212,0.08)",
  },
  {
    id: "linkedin",
    icon: <LinkedinIcon />,
    label: "LinkedIn",
    value: "linkedin.com/in/rohannagare",
    href: "https://linkedin.com/in/rohannagare",
    color: "#0077b5",
    bg: "rgba(0,119,181,0.12)",
  },
  {
    id: "twitter",
    icon: <TwitterIcon />,
    label: "Twitter",
    value: "@rohannagare",
    href: "https://twitter.com/rohannagare",
    color: "#1da1f2",
    bg: "rgba(29,161,242,0.12)",
  },
  {
    id: "email",
    icon: <MailIcon />,
    label: "Email",
    value: "rohannagare.dev@gmail.com",
    href: "mailto:rohannagare.dev@gmail.com",
    color: "#ce9178",
    bg: "rgba(206,145,120,0.12)",
  },
];

const openTo = [
  { icon: "💼", text: "Full-time SDE roles (2025 onwards)" },
  { icon: "🎓", text: "Internship opportunities" },
  { icon: "🌱", text: "Open-source collaboration" },
  { icon: "👥", text: "Pair programming sessions" },
  { icon: "☕", text: "Tech coffee chats" },
];

type CopyState = "idle" | "copied";

export default function ContactPageUI() {
  const [copyState,  setCopyState]  = useState<CopyState>("idle");
  const [activeLink, setActiveLink] = useState<string | null>(null);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("rohannagare.dev@gmail.com").then(() => {
      setCopyState("copied");
      setTimeout(() => setCopyState("idle"), 2000);
    });
  };

  return (
    <div className="px-8 py-8 flex flex-col gap-6 max-w-[700px] font-mono text-[13px]">
      {/* Header comments */}
      <div className="flex flex-col gap-[6px] text-[12px]">
        <div className="tok-comment">{`// Let's connect! All links are real — don't be a stranger 👋`}</div>
        <div className="tok-comment">{`// responseTime: "Usually within 24 hours"`}</div>
        <div className="tok-comment">{`// preferredContact: "LinkedIn DM or email"`}</div>
      </div>

      {/* Identity card */}
      <div className="flex items-center gap-4 rounded-[8px] px-5 py-5 border border-border-light bg-sidebar">
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-[15px] text-white flex-shrink-0"
          style={{ background: "linear-gradient(135deg,#094771,#007acc)" }}
        >
          RN
        </div>
        <div className="flex-1 flex flex-col gap-[4px]">
          <span className="text-[16px] font-bold text-text-active font-sans">
            Rohan Nagare
          </span>
          <span className="text-[12px] flex items-center gap-1 text-text-secondary">
            <span>📍</span> Pune, India
          </span>
        </div>
        <div
          className="flex items-center gap-[6px] text-[11px] rounded-[12px] px-3 py-[6px] border whitespace-nowrap"
          style={{ color: "#4ec9b0", background: "rgba(78,201,176,0.1)", borderColor: "rgba(78,201,176,0.3)" }}
        >
          <span className="w-[6px] h-[6px] bg-[#4ec9b0] rounded-full pulse-green" />
          Available for opportunities
        </div>
      </div>

      {/* Links grid */}
      <div className="grid grid-cols-2 gap-3">
        {contactLinks.map((link) => {
          const isHovered = activeLink === link.id;
          return (
            <a
              key={link.id}
              href={link.href}
              target={link.id !== "email" ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-4 py-4 rounded-[6px] no-underline border transition-all duration-150 cursor-pointer"
              style={{
                background:  isHovered ? link.bg                   : "var(--bg-sidebar)",
                borderColor: isHovered ? link.color                : "var(--border-light)",
              }}
              onMouseEnter={() => setActiveLink(link.id)}
              onMouseLeave={() => setActiveLink(null)}
            >
              <span className="flex-shrink-0 text-[20px] flex items-center" style={{ color: link.color }}>
                {link.icon}
              </span>
              <div className="flex-1 flex flex-col gap-[4px]">
                <span className="text-[11px] tok-property">{link.label}</span>
                <span className="text-[11px] overflow-hidden text-ellipsis whitespace-nowrap tok-string">
                  &quot;{link.value}&quot;
                </span>
              </div>
              <span
                className="transition-transform duration-150"
                style={{
                  color:     link.color,
                  transform: isHovered ? "translateX(3px)" : "translateX(0)",
                }}
              >
                →
              </span>
            </a>
          );
        })}
      </div>

      {/* Quick copy email */}
      <div className="flex flex-col gap-2">
        <span className="tok-comment">// Quick copy</span>
        <div className="flex items-center gap-3 rounded px-4 py-3 text-[12px] border border-border-light bg-sidebar">
          <span className="tok-string flex-1">&quot;rohannagare.dev@gmail.com&quot;</span>
          <button
            className="inline-flex items-center gap-[5px] px-3 py-[6px] rounded-[3px] text-[11px] cursor-pointer border transition-all duration-150 flex-shrink-0 bg-activity border-border text-text-secondary hover:bg-hover hover:text-text-active font-mono"
            onClick={handleCopyEmail}
          >
            {copyState === "copied" ? (
              <><CheckIcon /> Copied!</>
            ) : (
              <><CopyIcon /> Copy</>
            )}
          </button>
        </div>
      </div>

      {/* Open to */}
      <div className="flex flex-col gap-3">
        <div className="text-[13px]">
          <span className="tok-keyword">openTo</span>
          <span className="tok-punctuation">: [</span>
        </div>
        <div className="flex flex-col gap-[8px] pl-4">
          {openTo.map((item) => (
            <div key={item.text} className="flex items-center gap-3 text-[12px]">
              <span>{item.icon}</span>
              <span className="tok-string">&quot;{item.text}&quot;</span>
            </div>
          ))}
        </div>
        <div className="tok-punctuation">],</div>
      </div>

      {/* Tip block */}
      <div
        className="flex flex-col gap-[4px] px-5 py-4 border-l-[3px] rounded-r text-[12px]"
        style={{ background: "rgba(106,153,85,0.06)", borderLeftColor: "var(--tok-comment)" }}
      >
        <div className="tok-comment">{`/**`}</div>
        <div className="tok-comment">{` * Tip: If you're hiring or want to collaborate,`}</div>
        <div className="tok-comment">{` * mention the specific project that caught your eye —`}</div>
        <div className="tok-comment">{` * that gets a much faster reply! 😄`}</div>
        <div className="tok-comment">{` */`}</div>
      </div>
    </div>
  );
}

function GithubIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

function LinkedinIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function TwitterIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}

function CopyIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
