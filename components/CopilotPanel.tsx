"use client";

// ── components/CopilotPanel.tsx ───────────────────────────────────────────────
// IDE AI Chat UI — styled like GitHub Copilot Chat / Cursor AI.
// Workspace-style layout (side-by-side on desktop, resizable via dragging,
// persisted in localStorage, overlay on mobile).
//
// Integration: POST /api/chat/stream (SSE) via lib/chatApi.ts
//   - Conversation history passed per-request (stateless backend)
//   - Streaming tokens rendered in real time
//   - Full error handling with user-friendly messages & retry
//   - Backend health badge in header
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useRef, useEffect, useCallback } from "react";
import { useAppState, useAppActions } from "@/lib/AppStateContext";
import FocusTrap from "./FocusTrap";
import {
  streamChat,
  checkHealth,
  ChatApiError,
  type HistoryMessage,
} from "@/lib/chatApi";

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
  error?: boolean;        // true when this message is an error notice
  retryable?: boolean;    // show Retry button
}

function uid() {
  return Math.random().toString(36).slice(2);
}

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

function CodeBlockUI({ block }: { block: CodeBlock }) {
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

// ── Markdown Renderer ────────────────────────────────────────────────────────
// Lightweight markdown-to-JSX renderer — no external library.
// Handles: headings (# ## ###), bullet lists (- *), numbered lists (1.),
//          bold (**), italic (*_), inline code (`), links ([text](url)),
//          horizontal rules (---), and paragraph / line breaks.
// ─────────────────────────────────────────────────────────────────────────────

/** Render inline markdown spans: **bold**, *italic*, `code`, [link](url) */
function InlineMarkdown({ text }: { text: string }) {
  // Pattern order matters — longer patterns first
  const TOKEN = /(`[^`]+`|\*\*[^*]+\*\*|\*[^*]+\*|_[^_]+_|\[([^\]]+)\]\(([^)]+)\))/g;
  const parts: React.ReactNode[] = [];
  let last = 0;
  let m: RegExpExecArray | null;

  while ((m = TOKEN.exec(text)) !== null) {
    // Push plain text before this token
    if (m.index > last) parts.push(<span key={last}>{text.slice(last, m.index)}</span>);

    const raw = m[0];

    if (raw.startsWith("`")) {
      parts.push(
        <code
          key={m.index}
          className="rounded px-[5px] py-[1px] text-[11px] font-mono"
          style={{
            background: "var(--bg-activity)",
            color:      "var(--tok-string)",
            border:     "1px solid var(--border-light)",
          }}
        >
          {raw.slice(1, -1)}
        </code>,
      );
    } else if (raw.startsWith("**")) {
      parts.push(
        <strong key={m.index} style={{ color: "var(--text-active)", fontWeight: 600 }}>
          {raw.slice(2, -2)}
        </strong>,
      );
    } else if (raw.startsWith("*") || raw.startsWith("_")) {
      parts.push(
        <em key={m.index} style={{ color: "var(--text-secondary)", fontStyle: "italic" }}>
          {raw.slice(1, -1)}
        </em>,
      );
    } else if (raw.startsWith("[")) {
      // [label](url)
      parts.push(
        <a
          key={m.index}
          href={m[3]}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "var(--accent)", textDecoration: "underline" }}
        >
          {m[2]}
        </a>,
      );
    } else {
      parts.push(<span key={m.index}>{raw}</span>);
    }

    last = m.index + raw.length;
  }

  if (last < text.length) parts.push(<span key={last}>{text.slice(last)}</span>);
  return <>{parts}</>;
}

type MdBlock =
  | { type: "h1" | "h2" | "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "hr" }
  | { type: "p"; text: string };

/** Parse a markdown string into a list of block descriptors. */
function parseMd(raw: string): MdBlock[] {
  const lines = raw.split(/\r?\n/);
  const blocks: MdBlock[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Heading
    const h3 = line.match(/^###\s+(.+)/);
    const h2 = line.match(/^##\s+(.+)/);
    const h1 = line.match(/^#\s+(.+)/);
    if (h3) { blocks.push({ type: "h3", text: h3[1] }); i++; continue; }
    if (h2) { blocks.push({ type: "h2", text: h2[1] }); i++; continue; }
    if (h1) { blocks.push({ type: "h1", text: h1[1] }); i++; continue; }

    // Horizontal rule
    if (/^[-*_]{3,}\s*$/.test(line)) { blocks.push({ type: "hr" }); i++; continue; }

    // Unordered list: lines starting with - or *
    if (/^[-*]\s/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^[-*]\s/.test(lines[i])) {
        items.push(lines[i].replace(/^[-*]\s+/, ""));
        i++;
      }
      blocks.push({ type: "ul", items });
      continue;
    }

    // Ordered list: lines starting with digit.
    if (/^\d+\.\s/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\d+\.\s/.test(lines[i])) {
        items.push(lines[i].replace(/^\d+\.\s+/, ""));
        i++;
      }
      blocks.push({ type: "ol", items });
      continue;
    }

    // Empty line — skip (natural paragraph break between blocks)
    if (line.trim() === "") { i++; continue; }

    // Paragraph — collect consecutive non-special lines
    const paraLines: string[] = [];
    while (
      i < lines.length &&
      lines[i].trim() !== "" &&
      !/^#{1,3}\s/.test(lines[i]) &&
      !/^[-*]\s/.test(lines[i]) &&
      !/^\d+\.\s/.test(lines[i]) &&
      !/^[-*_]{3,}\s*$/.test(lines[i])
    ) {
      paraLines.push(lines[i]);
      i++;
    }
    if (paraLines.length) blocks.push({ type: "p", text: paraLines.join(" ") });
  }

  return blocks;
}

/** Full markdown renderer — converts raw markdown string to styled JSX. */
function MarkdownRenderer({ text }: { text: string }) {
  const blocks = parseMd(text);

  return (
    <div className="flex flex-col gap-[6px]">
      {blocks.map((block, idx) => {
        switch (block.type) {
          case "h1":
            return (
              <p key={idx} className="text-[13.5px] font-bold mt-1" style={{ color: "var(--text-active)" }}>
                <InlineMarkdown text={block.text} />
              </p>
            );
          case "h2":
            return (
              <p key={idx} className="text-[12.5px] font-semibold mt-1" style={{ color: "var(--text-active)" }}>
                <InlineMarkdown text={block.text} />
              </p>
            );
          case "h3":
            return (
              <p
                key={idx}
                className="text-[11.5px] font-semibold uppercase tracking-wide mt-[6px]"
                style={{ color: "var(--accent)" }}
              >
                <InlineMarkdown text={block.text} />
              </p>
            );
          case "ul":
            return (
              <ul key={idx} className="flex flex-col gap-[3px] pl-1">
                {block.items.map((item, j) => (
                  <li key={j} className="flex gap-[7px] items-start text-[12.5px]">
                    <span
                      className="flex-shrink-0 mt-[6px] w-[4px] h-[4px] rounded-full"
                      style={{ background: "var(--accent)", flexShrink: 0 }}
                    />
                    <span style={{ color: "var(--text-primary)" }}>
                      <InlineMarkdown text={item} />
                    </span>
                  </li>
                ))}
              </ul>
            );
          case "ol":
            return (
              <ol key={idx} className="flex flex-col gap-[3px] pl-1">
                {block.items.map((item, j) => (
                  <li key={j} className="flex gap-[7px] items-start text-[12.5px]">
                    <span
                      className="flex-shrink-0 text-[10px] font-mono min-w-[14px] mt-[1px] text-right"
                      style={{ color: "var(--accent)" }}
                    >
                      {j + 1}.
                    </span>
                    <span style={{ color: "var(--text-primary)" }}>
                      <InlineMarkdown text={item} />
                    </span>
                  </li>
                ))}
              </ol>
            );
          case "hr":
            return (
              <hr
                key={idx}
                className="my-1 border-0 h-px"
                style={{ background: "var(--border-light)" }}
              />
            );
          case "p":
          default:
            return (
              <p key={idx} className="text-[12.5px] leading-[1.65]" style={{ color: "var(--text-primary)" }}>
                <InlineMarkdown text={block.text} />
              </p>
            );
        }
      })}
    </div>
  );
}

/** Renders a single message bubble (user or assistant). */
function MessageBubble({
  msg,
  onRetry,
}: {
  msg: Message;
  onRetry?: () => void;
}) {
  const isUser  = msg.role === "user";
  const isError = msg.error === true;

  return (
    <div className={`flex gap-3 ${isUser ? "flex-row-reverse" : "flex-row"} items-start`}>
      {/* Avatar */}
      {!isUser && (
        <div
          className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-[13px] mt-[2px]"
          style={{
            background: isError
              ? "linear-gradient(135deg, #e05a5a, #c0392b)"
              : "linear-gradient(135deg, var(--accent), var(--tok-type))",
            boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
          }}
        >
          {isError ? "!" : "✦"}
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
              : isError
              ? {
                  background: "rgba(224, 90, 90, 0.1)",
                  color:      "#e05a5a",
                  border:     "1px solid rgba(224, 90, 90, 0.3)",
                  borderBottomLeftRadius: "3px",
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
            <span className="text-[12.5px] leading-[1.65]">
              {msg.content}
              <span
                className="inline-block w-[2px] h-[13px] ml-[2px] align-middle blink-cursor"
                style={{ background: "var(--accent)" }}
              />
            </span>
          ) : (
            <MarkdownRenderer text={msg.content} />
          )}
        </div>

        {/* Code block (non-streaming only) */}
        {!msg.streaming && msg.codeBlock && (
          <div className="w-full">
            <CodeBlockUI block={msg.codeBlock} />
          </div>
        )}

        {/* Retry button for retryable errors */}
        {isError && msg.retryable && onRetry && (
          <button
            onClick={onRetry}
            className="flex items-center gap-1 px-2 py-[3px] rounded text-[11px] transition-colors duration-150 mt-1"
            style={{
              color:      "#e05a5a",
              border:     "1px solid rgba(224, 90, 90, 0.4)",
              background: "rgba(224, 90, 90, 0.08)",
            }}
          >
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="1 4 1 10 7 10" />
              <path d="M3.51 15a9 9 0 1 0 .49-3.51" />
            </svg>
            Retry
          </button>
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

/** Small dot in the header showing backend health status. */
function HealthBadge({ healthy }: { healthy: boolean | null }) {
  if (healthy === null) return null; // still checking

  return (
    <span
      title={healthy ? "Backend connected" : "Backend offline — responses may fail"}
      className="flex items-center gap-1 text-[10px] select-none"
      style={{ color: healthy ? "var(--status-success, #4caf50)" : "#e05a5a" }}
    >
      <span
        className="w-[6px] h-[6px] rounded-full"
        style={{
          background: healthy ? "var(--status-success, #4caf50)" : "#e05a5a",
          boxShadow:  healthy ? "0 0 4px var(--status-success, #4caf50)" : "0 0 4px #e05a5a",
        }}
      />
      {healthy ? "Live" : "Offline"}
    </span>
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

  const [messages,          setMessages]          = useState<Message[]>([]);
  const [input,             setInput]             = useState("");
  const [isTyping,          setIsTyping]          = useState(false);
  const [backendHealthy,    setBackendHealthy]    = useState<boolean | null>(null);

  // Layout sizing state: default 350px width, resizable
  const [width,             setWidth]             = useState(350);
  const [isDragging,        setIsDragging]        = useState(false);
  const [isMobile,          setIsMobile]          = useState(false);

  // Refs
  const bottomRef       = useRef<HTMLDivElement>(null);
  const inputRef        = useRef<HTMLTextAreaElement>(null);
  const threadScrollRef = useRef<HTMLDivElement>(null);
  const abortRef        = useRef<AbortController | null>(null);

  // Last user message text — kept for the Retry button
  const lastUserMsgRef  = useRef<string>("");

  // ── Health check on mount ────────────────────────────────────────────────

  useEffect(() => {
    checkHealth().then(setBackendHealthy);
    // Re-check every 30 seconds in case the backend restarts
    const id = setInterval(() => checkHealth().then(setBackendHealthy), 30_000);
    return () => clearInterval(id);
  }, []);

  // ── Responsive layout ────────────────────────────────────────────────────

  useEffect(() => {
    if (typeof window === "undefined") return;
    function checkMobile() { setIsMobile(window.innerWidth < 768); }
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // ── Persist panel width ──────────────────────────────────────────────────

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedWidth = localStorage.getItem("portfolio-copilot-width");
      if (savedWidth) {
        const parsed = parseInt(savedWidth, 10);
        if (!isNaN(parsed) && parsed >= 280 && parsed <= 600) {
          setWidth(parsed);
        }
      }
    }
  }, []);

  useEffect(() => {
    if (!isDragging && typeof window !== "undefined") {
      localStorage.setItem("portfolio-copilot-width", width.toString());
    }
  }, [width, isDragging]);

  // ── Auto-scroll on new messages ──────────────────────────────────────────

  useEffect(() => {
    if (threadScrollRef.current) {
      threadScrollRef.current.scrollTop = threadScrollRef.current.scrollHeight;
    }
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // ── Focus textarea on open ───────────────────────────────────────────────

  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 300);
  }, [isOpen]);

  // ── Cancel any in-flight request when panel closes ───────────────────────

  useEffect(() => {
    if (!isOpen) abortRef.current?.abort();
  }, [isOpen]);

  // ── Build conversation history from current messages ─────────────────────

  function buildHistory(): HistoryMessage[] {
    // Convert the last 10 non-error messages to the OpenAI format
    return messages
      .filter((m) => !m.error && !m.streaming)
      .slice(-10)
      .map((m) => ({ role: m.role, content: m.content }));
  }

  // ── Core send logic ──────────────────────────────────────────────────────

  const sendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || isTyping) return;

      lastUserMsgRef.current = trimmed;

      // Add user message
      const userMsg: Message = {
        id:        uid(),
        role:      "user",
        content:   trimmed,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, userMsg]);
      setInput("");
      setIsTyping(true);

      if (inputRef.current) inputRef.current.style.height = "auto";

      // Create abort controller for this request
      abortRef.current = new AbortController();

      // Add streaming placeholder for assistant
      const streamId = uid();
      setMessages((prev) => [
        ...prev,
        { id: streamId, role: "assistant", content: "", timestamp: new Date(), streaming: true },
      ]);
      setIsTyping(false);

      try {
        await streamChat(
          {
            message: trimmed,
            history: buildHistory(),
          },
          (chunk) => {
            // Append each token to the streaming message
            setMessages((prev) =>
              prev.map((m) =>
                m.id === streamId
                  ? { ...m, content: m.content + chunk }
                  : m,
              ),
            );
          },
          abortRef.current.signal,
        );

        // Mark streaming complete
        setMessages((prev) =>
          prev.map((m) =>
            m.id === streamId ? { ...m, streaming: false } : m,
          ),
        );

      } catch (err) {
        // Remove the empty streaming placeholder
        setMessages((prev) => prev.filter((m) => m.id !== streamId));

        if (err instanceof ChatApiError) {
          const errMsg: Message = {
            id:        uid(),
            role:      "assistant",
            content:   err.message,
            timestamp: new Date(),
            error:     true,
            retryable: err.retryable,
          };
          setMessages((prev) => [...prev, errMsg]);

          // Update health badge if we know backend is unreachable
          if (err.status === undefined) setBackendHealthy(false);
        } else {
          const errMsg: Message = {
            id:        uid(),
            role:      "assistant",
            content:   "Something went wrong. Please try again.",
            timestamp: new Date(),
            error:     true,
            retryable: true,
          };
          setMessages((prev) => [...prev, errMsg]);
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isTyping, messages],
  );

  /** Retry the last user message (called from the error bubble Retry button). */
  const handleRetry = useCallback(() => {
    if (!lastUserMsgRef.current) return;
    // Remove the error message, then re-send
    setMessages((prev) => prev.filter((m) => !m.error));
    sendMessage(lastUserMsgRef.current);
  }, [sendMessage]);

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  }

  // ── Drag-to-resize ───────────────────────────────────────────────────────

  const startDrag = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const newWidth = window.innerWidth - moveEvent.clientX;
      if (newWidth >= 280 && newWidth <= 600) setWidth(newWidth);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  }, []);

  // ── Input card ───────────────────────────────────────────────────────────

  const renderInputCard = () => (
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
          e.target.style.height = "auto";
          e.target.style.height = Math.min(e.target.scrollHeight, 140) + "px";
        }}
        onKeyDown={handleKeyDown}
        placeholder="Ask anything about Rohan — skills, projects, contact…"
        className="w-full bg-transparent outline-none border-none resize-none text-[13px] leading-[1.5] py-[2px] text-text-active placeholder-text-muted"
        style={{
          fontFamily: "var(--font-inter)",
          minHeight:  "36px",
          maxHeight:  "140px",
          caretColor: "var(--accent)",
        }}
        aria-label="Chat input"
        disabled={isTyping}
      />

      {/* Lower row */}
      <div className="flex items-center justify-between mt-2 pt-1">
        <div className="flex items-center gap-1.5">
          {/* Plus / context button */}
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

          {/* Model label (read-only — model set in backend .env) */}
          <span
            className="flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] select-none"
            style={{
              color:       "var(--text-secondary)",
              borderColor: "var(--border-light)",
              background:  "var(--bg-sidebar)",
              border:      "1px solid var(--border-light)",
            }}
            title="LLM model is configured in the backend .env"
          >
            LLaMA 3.3 · Groq
          </span>
        </div>

        {/* Send / mic button */}
        <button
          type="button"
          onClick={() => { if (input.trim()) sendMessage(input); }}
          disabled={!input.trim() || isTyping}
          className="flex-shrink-0 flex items-center justify-center w-7 h-7 rounded-full transition-all duration-150"
          style={{
            background: input.trim() ? "var(--accent)" : "var(--bg-selected)",
            color:      "#fff",
            cursor:     isTyping || !input.trim() ? "not-allowed" : "pointer",
            opacity:    !input.trim() && !isTyping ? 0.5 : 1,
          }}
          aria-label={input.trim() ? "Send message" : "Voice input"}
        >
          {input.trim() ? (
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

  // ── Layout style ─────────────────────────────────────────────────────────

  const containerClass = isMobile
    ? `fixed top-0 right-0 h-full z-40 flex flex-col overflow-hidden w-full`
    : `relative flex flex-col h-full overflow-hidden flex-shrink-0 z-10`;

  const containerStyle = isMobile
    ? ({
        background:  "var(--bg-sidebar)",
        borderColor: "var(--border)",
        transform:   isOpen ? "translateX(0)" : "translateX(100%)",
        transition:  "transform 280ms cubic-bezier(0.4, 0, 0.2, 1)",
      } as React.CSSProperties)
    : ({
        background:  "var(--bg-sidebar)",
        borderColor: "var(--border)",
        borderLeftWidth: isOpen ? "1px" : "0px",
        width:       isOpen ? `${width}px` : "0px",
        visibility:  isOpen ? "visible" : "hidden",
        transition:  isDragging
          ? "none"
          : "width 250ms cubic-bezier(0.4, 0, 0.2, 1), border-left-width 250ms cubic-bezier(0.4, 0, 0.2, 1), visibility 250ms step-end",
      } as React.CSSProperties);

  const innerWrapperStyle = isMobile
    ? { width: "100%", height: "100%", display: "flex", flexDirection: "column" as const }
    : { width: `${width}px`, height: "100%", display: "flex", flexDirection: "column" as const };

  // ── Render ───────────────────────────────────────────────────────────────

  return (
    <>
      {/* Mobile backdrop */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 z-30 md:hidden"
          style={{ background: "var(--bg-modal-backdrop)" }}
          onClick={() => actions.setActivePanel(null)}
          aria-hidden="true"
        />
      )}

      <FocusTrap active={isOpen} className={containerClass} style={containerStyle}>
        <div
          role="dialog"
          aria-modal="true"
          aria-label="AI Agent Chat"
          style={innerWrapperStyle}
        >
          {/* Resize handle (desktop only) */}
          {!isMobile && isOpen && (
            <div
              onMouseDown={startDrag}
              className="absolute left-[-3px] top-0 bottom-0 w-[6px] cursor-col-resize z-50 hover:bg-accent/40 active:bg-accent transition-colors"
            />
          )}

          {/* ── Header ───────────────────────────────────────────────────── */}
          <div
            className="flex items-center justify-between px-4 py-[10px] flex-shrink-0 border-b relative"
            style={{ borderColor: "var(--border)", background: "var(--bg-sidebar)" }}
          >
            <div className="flex items-center gap-2">
              <span className="text-[13px] font-semibold text-text-primary select-none font-sans">
                Agent
              </span>
              <HealthBadge healthy={backendHealthy} />
            </div>

            <div className="flex items-center gap-1.5 text-text-secondary">
              {/* New chat */}
              <button
                onClick={() => {
                  abortRef.current?.abort();
                  setMessages([]);
                  setIsTyping(false);
                  lastUserMsgRef.current = "";
                }}
                className="flex items-center justify-center w-6 h-6 rounded hover:bg-hover hover:text-text-active transition-colors"
                title="New chat"
                aria-label="New chat"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
              </button>

              {/* History */}
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

              {/* Options */}
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

          {/* ── Main content ─────────────────────────────────────────────── */}
          <div className="flex-1 flex flex-col overflow-hidden relative">
            {messages.length === 0 ? (
              /* Empty state */
              <div className="flex-1 flex flex-col justify-center px-4 pb-16">
                <h1 className="text-[28px] font-bold tracking-tight mb-5 text-text-active px-2 font-sans select-none">
                  portfolio
                </h1>
                {renderInputCard()}
              </div>
            ) : (
              /* Message thread */
              <div className="flex-1 flex flex-col overflow-hidden">
                <div
                  ref={threadScrollRef}
                  className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-5"
                  role="log"
                  aria-label="Chat messages"
                  aria-live="polite"
                >
                  {messages.map((msg) => (
                    <MessageBubble
                      key={msg.id}
                      msg={msg}
                      onRetry={msg.error && msg.retryable ? handleRetry : undefined}
                    />
                  ))}
                  {isTyping && <TypingIndicator />}
                  <div ref={bottomRef} />
                </div>

                {/* Input card */}
                <div className="px-3 pb-2 pt-1 border-t" style={{ borderColor: "var(--border-light)" }}>
                  {renderInputCard()}
                </div>
              </div>
            )}

            {/* Disclaimer */}
            <div
              className="px-4 py-3 text-[11px] text-center select-none font-sans"
              style={{ color: "var(--text-muted)" }}
            >
              AI may make mistakes. Double-check important information.
            </div>
          </div>
        </div>
      </FocusTrap>
    </>
  );
}
