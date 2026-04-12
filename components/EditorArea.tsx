"use client";

import { useEffect, useRef, useState } from "react";
import { FileId, FILE_MAP } from "@/lib/fileContents";
import SyntaxHighlighter from "./SyntaxHighlighter";

interface Props {
  activeFile: FileId | null;
}

const TYPING_SPEED = 8; // characters per frame tick (ms = 16)

export default function EditorArea({ activeFile }: Props) {
  const [revealCount, setRevealCount] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [fadeKey, setFadeKey] = useState(0);
  const prevFileRef = useRef<FileId | null>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (!activeFile) return;

    // Only run typing animation for about-me.ts on first open
    const isFirstAbout =
      activeFile === "about-me.ts" && prevFileRef.current === null;

    setFadeKey((k) => k + 1);
    prevFileRef.current = activeFile;

    if (isFirstAbout) {
      const totalLen = FILE_MAP[activeFile].content.length;
      let current = 0;
      setRevealCount(0);
      setIsTyping(true);

      const tick = () => {
        current = Math.min(current + TYPING_SPEED, totalLen);
        setRevealCount(current);
        if (current < totalLen) {
          rafRef.current = requestAnimationFrame(tick);
        } else {
          setIsTyping(false);
        }
      };
      rafRef.current = requestAnimationFrame(tick);
      return () => cancelAnimationFrame(rafRef.current);
    } else {
      setIsTyping(false);
      setRevealCount(activeFile ? FILE_MAP[activeFile].content.length : 0);
    }
  }, [activeFile]);

  if (!activeFile) {
    return (
      <div className="editor-container">
        <div className="welcome-screen">
          <div className="welcome-logo">⌨️</div>
          <div className="welcome-title">Rohan Nagare</div>
          <div className="welcome-subtitle">
            Select a file from the explorer to get started
          </div>
          <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
            <a
              href="https://github.com/rohannagare"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "var(--tok-variable)",
                textDecoration: "none",
                fontSize: 13,
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              <GithubIcon /> GitHub
            </a>
            <a
              href="https://linkedin.com/in/rohannagare"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "var(--tok-variable)",
                textDecoration: "none",
                fontSize: 13,
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              <LinkedinIcon /> LinkedIn
            </a>
          </div>
        </div>
      </div>
    );
  }

  const file = FILE_MAP[activeFile];

  return (
    <div className="editor-container">
      {/* Breadcrumb */}
      <div className="breadcrumb">
        <span>portfolio</span>
        <span className="breadcrumb-sep">›</span>
        <span style={{ color: "var(--text-primary)" }}>{activeFile}</span>
      </div>

      {/* Code view */}
      <div key={fadeKey} className="editor-content fade-in">
        <SyntaxHighlighter
          code={file.content}
          language={file.language}
          typing={isTyping}
          revealCount={revealCount}
        />
      </div>
    </div>
  );
}

function GithubIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

function LinkedinIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}
