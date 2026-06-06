"use client";

// ── components/CopilotPanel.tsx ───────────────────────────────────────────────
// IDE AI Chat UI — styled like GitHub Copilot Chat / Cursor AI.
// Updated to match the user's mock layout and colors dynamically using theme tokens.
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useRef, useEffect, useCallback } from "react";
import { useAppState, useAppActions } from "@/lib/AppStateContext";
import FocusTrap from "./FocusTrap";

// ── Types ─────────────────────────────────────────────────────────────────────

type Role = "user" | "assistant";

interface CodeBlock {
  lang: string;
  code: string;
}

interface Message {
  id: string;
  role: Role;
  content: string;
  codeBlock?: CodeBlock;
  timestamp: Date;
  streaming?: boolean;
}

// ── Canned Q&A responses ──────────────────────────────────────────────────────

interface QA {
  keywords: string[];
  answer: string;
  code?: CodeBlock;
}

const QA_PAIRS: QA[] = [
  {
    keywords: ["skills", "stack", "tech", "technologies", "languages"],
    answer:
      "Rohan's primary stack is **TypeScript + React + Next.js** on the frontend, **Node.js + Express** on the backend, and **PostgreSQL / MongoDB** for data. He also works with Docker, Redis, and AWS for deployment.",
    code: {
      lang: "json",
      code: `{
  "languages":  ["TypeScript", "JavaScript", "Python", "Java"],
  "frontend":   ["React", "Next.js", "TailwindCSS", "D3.js"],
  "backend":    ["Node.js", "Express", "Socket.IO"],
  "databases":  ["PostgreSQL", "MongoDB", "Redis"],
  "devops":     ["Docker", "GitHub Actions", "AWS", "Nginx"]
}`,
    },
  },
  {
    keywords: ["project", "projects", "built", "work", "portfolio"],
    answer:
      "Rohan has shipped **4 major projects**: Code Context Navigator (VS Code extension), Multiplayer Battleship (real-time game), Safe Neighborhood Map (hackathon winner), and a full Web IDE with subdomain hosting.",
  },
  {
    keywords: ["experience", "background", "edu", "degree", "university"],
    answer:
      "He's completing a **B.E. in Information Technology** at Savitribai Phule Pune University (CGPA 8.6 / 10). He's also an active open-source contributor with 400+ GitHub commits and a hackathon lead who won Best Social Impact at PuneTech 2024.",
  },
  {
    keywords: ["contact", "hire", "email", "reach", "available", "job"],
    answer:
      "Rohan is **open to full-time SDE roles, internships, and open-source collaboration**. Best way to reach him is via email at `rohannagare.dev@gmail.com` or LinkedIn.",
  },
  {
    keywords: ["theme", "dark", "color", "ui", "design"],
    answer:
      "This portfolio supports **10 VS Code themes** — from Dark+, Dracula, and Tokyo Night to GitHub Light and Solarized. Press `Ctrl+K Ctrl+T` to switch themes, or open Settings with `Ctrl+,`.",
    code: {
      lang: "ts",
      code: `// Available themes
const themes = [
  "vscode-dark", "monokai",     "dracula",
  "github-dark", "github-light","one-dark-pro",
  "solarized-dark", "solarized-light",
  "nord",        "tokyo-night"
];`,
    },
  },
  {
    keywords: ["about", "who", "introduce", "rohan", "person"],
    answer:
      "Rohan Nagare is a **final-year IT engineering student** from Pune who loves building developer tools, AI-powered applications, and scalable full-stack systems. He describes himself as a keyboard-driven developer who lives in the terminal.",
  },
  {
    keywords: ["shortcut", "keyboard", "hotkey", "ctrl"],
    answer:
      "Here are the key shortcuts in this portfolio:",
    code: {
      lang: "bash",
      code: `Ctrl+Shift+P  # Command Palette
Ctrl+B        # Toggle Sidebar  
Ctrl+K Ctrl+T # Change Theme
Ctrl+Shift+F  # Search Portfolio
Ctrl+,        # Settings
F1            # Show all shortcuts`,
    },
  },
  {
    keywords: ["copilot", "ai", "chat", "you", "what are you"],
    answer:
      "I'm the **Portfolio Copilot** — a simulated AI chat built into this VS Code-themed portfolio. Ask me anything about Rohan's skills, projects, experience, or how to navigate this site!",
  },
];

function getResponse(input: string): { answer: string; code?: CodeBlock } {
  const lower = input.toLowerCase();
  const match = QA_PAIRS.find((qa) =>
    qa.keywords.some((k) => lower.includes(k))
  );
  if (match) return { answer: match.answer, code: match.code };
  return {
    answer:
      "Great question! I don't have a specific answer for that, but feel free to browse the sections in the sidebar — About, Projects, Skills, Experience, and Contact. Or try `Ctrl+Shift+F` to search!",
  };
}

function uid() {
  return Math.random().toString(36).slice(2);
}

// ── Models Registry ───────────────────────────────────────────────────────────

const MODELS = [
  "Gemini 3.5 Flash (Medium)",
  "Gemini 3.5 Pro (Large)",
  "Claude 3.5 Sonnet",
  "GPT-4o"
];

// ── Sub-components ────────────────────────────────────────────────────────────

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(text).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-1 px-2 py-[3px] rounded text-[10px] transition-colors duration-150"
      style={{
        color:       copied ? "var(--status-success)" : "var(--text-muted)",
        background:  "var(--bg-activity)",
        border:      "1px solid var(--border-light)",
      }}
      title="Copy code"
    >
      {copied ? (
        <>
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          Copied
        </>
      ) : (
        <>
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="9" y="9" width="13" height="13" rx="2" />
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
          </svg>
          Copy
        </>
      )}
    </button>
  );
}

function CodeBlock({ block }: { block: CodeBlock }) {
  return (
    <div
      className="rounded-[6px] overflow-hidden border mt-2"
      style={{ borderColor: "var(--border)", background: "var(--bg-editor)" }}
    >
      <div
        className="flex items-center justify-between px-3 py-[6px] border-b"
        style={{ borderColor: "var(--border-light)", background: "var(--bg-activity)" }}
      >
        <span
          className="text-[10px] font-mono uppercase tracking-wider"
          style={{ color: "var(--text-muted)" }}
        >
          {block.lang}
        </span>
        <CopyButton text={block.code} />
      </div>
      <pre
        className="px-4 py-3 text-[11.5px] overflow-x-auto leading-[1.7]"
        style={{
          fontFamily: "var(--font-mono)",
          color:      "var(--text-primary)",
        }}
      >
        <code>{block.code}</code>
      </pre>
    </div>
  );
}

function RichText({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return (
            <strong key={i} style={{ color: "var(--text-active)", fontWeight: 600 }}>
              {part.slice(2, -2)}
            </strong>
          );
        }
        if (part.startsWith("`") && part.endsWith("`")) {
          return (
            <code
              key={i}
              className="rounded px-[5px] py-[1px] text-[11px] font-mono"
              style={{
                background: "var(--bg-activity)",
                color:      "var(--tok-string)",
                border:     "1px solid var(--border-light)",
              }}
            >
              {part.slice(1, -1)}
            </code>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}

function MessageBubble({ msg }: { msg: Message }) {
  const isUser = msg.role === "user";

  return (
    <div className={`flex gap-3 ${isUser ? "flex-row-reverse" : "flex-row"} items-start`}>
      {!isUser && (
        <div
          className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-[13px] mt-[2px]"
          style={{
            background: "linear-gradient(135deg, var(--accent), var(--tok-type))",
            boxShadow:  "0 2px 8px rgba(0,0,0,0.3)",
          }}
        >
          ✦
        </div>
      )}
      {isUser && (
        <div
          className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold mt-[2px]"
          style={{
            background: "var(--bg-selected)",
            color:      "var(--text-active)",
            border:     "1px solid var(--border)",
          }}
        >
          U
        </div>
      )}

      <div className={`flex flex-col gap-1 max-w-[calc(100%-44px)] ${isUser ? "items-end" : "items-start"}`}>
        <div
          className="rounded-[10px] px-3 py-[9px] text-[12.5px] leading-[1.65]"
          style={
            isUser
              ? {
                  background: "var(--bg-selected)",
                  color:      "var(--text-active)",
                  borderBottomRightRadius: "3px",
                }
              : {
                  background: "var(--bg-hover)",
                  color:      "var(--text-primary)",
                  border:     "1px solid var(--border-light)",
                  borderBottomLeftRadius: "3px",
                }
          }
        >
          {msg.streaming ? (
            <span>
              {msg.content}
              <span
                className="inline-block w-[2px] h-[13px] ml-[2px] align-middle blink-cursor"
                style={{ background: "var(--accent)" }}
              />
            </span>
          ) : (
            <RichText text={msg.content} />
          )}
        </div>

        {!msg.streaming && msg.codeBlock && (
          <div className="w-full">
            <CodeBlock block={msg.codeBlock} />
          </div>
        )}

        <span
          className="text-[10px] px-1"
          style={{ color: "var(--text-muted)" }}
        >
          {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </span>
      </div>
    </div>
  );
}

function TypingIndicator() {
  return (
    <div className="flex gap-3 items-start">
      <div
        className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-[13px]"
        style={{ background: "linear-gradient(135deg, var(--accent), var(--tok-type))" }}
      >
        ✦
      </div>
      <div
        className="rounded-[10px] px-4 py-3 flex gap-[5px] items-center"
        style={{ background: "var(--bg-hover)", border: "1px solid var(--border-light)" }}
      >
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="w-[6px] h-[6px] rounded-full"
            style={{
              background: "var(--text-secondary)",
              animation:  `bounce 1.2s ease-in-out ${i * 0.2}s infinite`,
            }}
          />
        ))}
      </div>
      <style>{`
        @keyframes bounce {
          0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
          40%            { transform: translateY(-5px); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────

interface Props {
  activeFile?: string;
}

export default function CopilotPanel({ activeFile }: Props) {
  const { activePanelId } = useAppState();
  const actions           = useAppActions();
  const isOpen            = activePanelId === "copilot";

  const [messages,           setMessages]           = useState<Message[]>([]);
  const [input,              setInput]              = useState("");
  const [isTyping,           setIsTyping]           = useState(false);
  const [selectedModel,      setSelectedModel]      = useState("Gemini 3.5 Flash (Medium)");
  const [modelDropdownOpen,  setModelDropdownOpen]  = useState(false);

  const bottomRef       = useRef<HTMLDivElement>(null);
  const inputRef        = useRef<HTMLTextAreaElement>(null);
  const threadScrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    if (threadScrollRef.current) {
      threadScrollRef.current.scrollTop = threadScrollRef.current.scrollHeight;
    }
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Focus input when panel opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  // Close dropdown on click outside
  useEffect(() => {
    if (!modelDropdownOpen) return;
    function handleDocumentClick() {
      setModelDropdownOpen(false);
    }
    document.addEventListener("click", handleDocumentClick);
    return () => document.removeEventListener("click", handleDocumentClick);
  }, [modelDropdownOpen]);

  const sendMessage = useCallback(
    (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || isTyping) return;

      const userMsg: Message = {
        id:        uid(),
        role:      "user",
        content:   trimmed,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, userMsg]);
      setInput("");
      setIsTyping(true);

      if (inputRef.current) {
        inputRef.current.style.height = "auto";
      }

      // Simulate thinking delay (800–1400ms)
      const thinkDelay = 800 + Math.random() * 600;
      setTimeout(() => {
        const { answer, code } = getResponse(trimmed);

        // Add streaming placeholder
        const streamId = uid();
        setMessages((prev) => [
          ...prev,
          { id: streamId, role: "assistant", content: "", timestamp: new Date(), streaming: true },
        ]);
        setIsTyping(false);

        // Stream text character by character
        let i = 0;
        const interval = setInterval(() => {
          i += Math.ceil(Math.random() * 4 + 1); // 2–5 chars per tick
          const chunk = answer.slice(0, i);
          const done  = i >= answer.length;
          setMessages((prev) =>
            prev.map((m) =>
              m.id === streamId
                ? { ...m, content: chunk, streaming: !done, codeBlock: done ? code : undefined }
                : m
            )
          );
          if (done) clearInterval(interval);
        }, 22);
      }, thinkDelay);
    },
    [isTyping]
  );

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  }

  const renderInputCard = () => {
    return (
      <div
        className="flex flex-col rounded-xl border p-3 transition-colors duration-150 relative"
        style={{
          background:  "var(--bg-input)",
          borderColor: "var(--border)",
        }}
        onFocusCapture={(e) => {
          (e.currentTarget as HTMLElement).style.borderColor = "var(--border-focus)";
        }}
        onBlurCapture={(e) => {
          (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
        }}
      >
        <textarea
          ref={inputRef}
          rows={1}
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            // Auto-grow
            e.target.style.height = "auto";
            e.target.style.height = Math.min(e.target.scrollHeight, 140) + "px";
          }}
          onKeyDown={handleKeyDown}
          placeholder="Ask anything, @ to mention, / for actions"
          className="w-full bg-transparent outline-none border-none resize-none text-[13px] leading-[1.5] py-[2px] text-text-active placeholder-text-muted"
          style={{
            fontFamily:     "var(--font-inter)",
            minHeight:      "36px",
            maxHeight:      "140px",
            caretColor:     "var(--accent)",
          }}
          aria-label="Chat input"
          disabled={isTyping}
        />
        
        {/* Lower row with controls */}
        <div className="flex items-center justify-between mt-2 pt-1">
          <div className="flex items-center gap-1.5 relative">
            {/* Plus context button */}
            <button
              type="button"
              className="flex items-center justify-center w-6 h-6 rounded text-text-secondary hover:text-text-active hover:bg-hover transition-colors"
              title="Add Context"
              aria-label="Add Context"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
            </button>
            
            {/* Model Selector Dropdown Button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setModelDropdownOpen((prev) => !prev);
              }}
              className="flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] text-text-secondary hover:text-text-active hover:bg-hover border border-border-light transition-colors select-none"
              style={{
                borderColor: "var(--border-light)",
                background:  "var(--bg-sidebar)",
              }}
            >
              <span>{selectedModel}</span>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="opacity-70">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>

            {/* Model Dropdown Menu */}
            {modelDropdownOpen && (
              <div
                className="absolute left-[30px] bottom-[30px] w-[180px] rounded-lg border shadow-lg z-50 flex flex-col py-1 overflow-hidden"
                style={{
                  background:  "var(--bg-editor)",
                  borderColor: "var(--border)",
                }}
              >
                {MODELS.map((model) => (
                  <button
                    key={model}
                    type="button"
                    onClick={() => {
                      setSelectedModel(model);
                      setModelDropdownOpen(false);
                    }}
                    className={`px-3 py-1.5 text-[11.5px] text-left cursor-pointer transition-colors w-full ${
                      selectedModel === model
                        ? "bg-selected text-text-active font-medium"
                        : "text-text-primary hover:bg-hover hover:text-text-active"
                    }`}
                  >
                    {model}
                  </button>
                ))}
              </div>
            )}
          </div>
          
          {/* Action button (mic or send) */}
          <button
            type="button"
            onClick={() => {
              if (input.trim() !== "") {
                sendMessage(input);
              }
            }}
            disabled={(input.trim() === "" && isTyping) || isTyping}
            className="flex-shrink-0 flex items-center justify-center w-7 h-7 rounded-full transition-all duration-150"
            style={{
              background: input.trim() !== "" ? "var(--accent)" : "var(--bg-selected)",
              color:      "#fff",
              cursor:     isTyping || (input.trim() === "") ? "not-allowed" : "pointer",
            }}
            aria-label={input.trim() !== "" ? "Send message" : "Voice input"}
          >
            {input.trim() !== "" ? (
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
              </svg>
            ) : (
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                <line x1="12" y1="19" x2="12" y2="23" />
                <line x1="8" y1="23" x2="16" y2="23" />
              </svg>
            )}
          </button>
        </div>
      </div>
    );
  };

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 md:hidden"
          style={{ background: "var(--bg-modal-backdrop)" }}
          onClick={() => actions.setActivePanel(null)}
          aria-hidden="true"
        />
      )}

      <FocusTrap
        active={isOpen}
        className={`
          fixed top-0 right-0 h-full z-40 flex flex-col overflow-hidden
          border-l w-full md:w-[380px]
          ${isOpen ? "translate-x-0" : "translate-x-full"}
        `}
        style={{
          background:  "var(--bg-sidebar)",
          borderColor: "var(--border)",
          transition:  "transform 280ms cubic-bezier(0.4,0,0.2,1)",
        } as React.CSSProperties}
      >
        <div
          role="dialog"
          aria-modal="true"
          aria-label="AI Agent Chat"
          className="flex flex-col h-full overflow-hidden"
        >
          {/* ── Header ─────────────────────────────────────────────────────── */}
          <div
            className="flex items-center justify-between px-4 py-[10px] flex-shrink-0 border-b"
            style={{ borderColor: "var(--border)", background: "var(--bg-sidebar)" }}
          >
            <span className="text-[13px] font-semibold text-text-primary select-none font-sans">
              Agent
            </span>

            <div className="flex items-center gap-1.5 text-text-secondary">
              {/* New chat button (+) */}
              <button
                onClick={() => setMessages([])}
                className="flex items-center justify-center w-6 h-6 rounded hover:bg-hover hover:text-text-active transition-colors"
                title="New chat"
                aria-label="New chat"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
              </button>

              {/* History button */}
              <button
                onClick={() => alert("History: No past chats recorded.")}
                className="flex items-center justify-center w-6 h-6 rounded hover:bg-hover hover:text-text-active transition-colors"
                title="History"
                aria-label="History"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                  <path d="M3 3v5h5" />
                  <path d="M12 7v5l4 2" />
                </svg>
              </button>

              {/* Menu (...) */}
              <button
                onClick={() => alert("Options: Model selection and custom agent preferences.")}
                className="flex items-center justify-center w-6 h-6 rounded hover:bg-hover hover:text-text-active transition-colors"
                title="More Options"
                aria-label="More Options"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="1" />
                  <circle cx="19" cy="12" r="1" />
                  <circle cx="5" cy="12" r="1" />
                </svg>
              </button>

              {/* Close */}
              <button
                onClick={() => actions.setActivePanel(null)}
                className="flex items-center justify-center w-6 h-6 rounded hover:bg-hover hover:text-text-active transition-colors"
                aria-label="Close Copilot"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
          </div>

          {/* ── Main workspace content wrapper ────────────────────────────── */}
          <div className="flex-1 flex flex-col overflow-hidden relative">
            {messages.length === 0 ? (
              /* Empty State (looks exactly like the image) */
              <div className="flex-1 flex flex-col justify-center px-4 pb-16">
                <h1 className="text-[28px] font-bold tracking-tight mb-5 text-text-active px-2 font-sans select-none">
                  portfolio
                </h1>
                {renderInputCard()}
              </div>
            ) : (
              /* Message Thread List */
              <div className="flex-1 flex flex-col overflow-hidden">
                <div
                  ref={threadScrollRef}
                  className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-5"
                  role="log"
                  aria-label="Chat messages"
                  aria-live="polite"
                >
                  {messages.map((msg) => (
                    <MessageBubble key={msg.id} msg={msg} />
                  ))}
                  {isTyping && <TypingIndicator />}
                  <div ref={bottomRef} />
                </div>
                
                {/* Input Card at the bottom */}
                <div className="px-3 pb-2 pt-1 border-t" style={{ borderColor: "var(--border-light)" }}>
                  {renderInputCard()}
                </div>
              </div>
            )}
            
            {/* Disclaimer Footer (always at the very bottom of the flex container) */}
            <div
              className="px-4 py-3 text-[11px] text-center select-none font-sans"
              style={{ color: "var(--text-muted)" }}
            >
              AI may make mistakes. Double-check all generated code.
            </div>
          </div>

        </div>
      </FocusTrap>
    </>
  );
}
