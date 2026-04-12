"use client";

import { FileId, FileLanguage } from "@/lib/fileContents";

/**
 * Lightweight regex-based syntax highlighter.
 * Supports TypeScript/JavaScript, JSON, and Markdown.
 * Returns an array of lines, each containing an array of token spans.
 */

interface Token {
  text: string;
  cls: string;
}

// ——— Token rules ————————————————————————————————————————

const TS_RULES: [RegExp, string][] = [
  [/(\/\/.*)/g, "tok-comment"],
  [/(`(?:[^`\\]|\\.)*`)/g, "tok-string"],
  [/("(?:[^"\\]|\\.)*")/g, "tok-string"],
  [/('(?:[^'\\]|\\.)*')/g, "tok-string"],
  [
    /\b(import|export|from|default|const|let|var|function|return|type|interface|class|extends|implements|new|typeof|keyof|as|await|async|if|else|for|while|switch|case|break|continue|void|null|undefined|true|false|in|of)\b/g,
    "tok-keyword",
  ],
  [
    /\b(string|number|boolean|any|unknown|never|Record|Array|Promise|React|Node)\b/g,
    "tok-type",
  ],
  [/\b([A-Z][A-Za-z0-9_]*)\b(?=\s*[({])/g, "tok-function"],
  [/\b([A-Z][A-Za-z0-9_]*)\b/g, "tok-type"],
  [/\b([a-z_$][a-zA-Z0-9_$]*)\b(?=\s*\()/g, "tok-function"],
  [/\b(\d+\.?\d*)\b/g, "tok-number"],
  [/([{}[\]();,.<>?!])/g, "tok-punctuation"],
  [/([=+\-*/&|^~%]|=>)/g, "tok-operator"],
];

const JSON_RULES: [RegExp, string][] = [
  [/("(?:[^"\\]|\\.)*")(\s*:)/g, "tok-property"],
  [/("(?:[^"\\]|\\.)*")/g, "tok-string"],
  [/\b(true|false|null)\b/g, "tok-keyword"],
  [/\b(\d+\.?\d*)\b/g, "tok-number"],
  [/([{}[\],:])/g, "tok-punctuation"],
];

const MD_RULES: [RegExp, string][] = [
  [/^(#{1,6}\s+.*)$/gm, "tok-md-heading"],
  [/\*\*([^*]+)\*\*/g, "tok-md-bold"],
  [/`([^`]+)`/g, "tok-md-code"],
  [/^(-{3,}|={3,})$/gm, "tok-md-heading"],
  [/^(\s*[-*]\s)/gm, "tok-operator"],
];

// ——— Tokeniser ——————————————————————————————————————————

function escapeHtml(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function tokeniseLine(line: string, lang: FileLanguage): string {
  const rules =
    lang === "json" ? JSON_RULES : lang === "markdown" ? MD_RULES : TS_RULES; // covers typescript + javascript

  // Strategy: build a list of character ranges → token class
  // Then reconstruct the HTML string
  interface Range {
    start: number;
    end: number;
    cls: string;
  }
  const ranges: Range[] = [];

  for (const [pattern, cls] of rules) {
    pattern.lastIndex = 0;
    let m: RegExpExecArray | null;
    while ((m = pattern.exec(line)) !== null) {
      // For JSON property rule the match[1] is the key, match[2] is ":"
      const start = m.index;
      const end = start + m[0].length;

      // Don't overlap existing ranges
      const overlaps = ranges.some((r) => start < r.end && end > r.start);
      if (!overlaps) {
        ranges.push({ start, end, cls });
      }
    }
  }

  // Sort by start position
  ranges.sort((a, b) => a.start - b.start);

  let result = "";
  let cursor = 0;
  for (const { start, end, cls } of ranges) {
    if (start > cursor) {
      result += escapeHtml(line.slice(cursor, start));
    }
    result += `<span class="${cls}">${escapeHtml(line.slice(start, end))}</span>`;
    cursor = end;
  }
  if (cursor < line.length) {
    result += escapeHtml(line.slice(cursor));
  }

  return result;
}

// ——— Component ——————————————————————————————————————————

interface Props {
  code: string;
  language: FileLanguage;
  /** If true, render with a typing cursor at end of last visible line */
  typing?: boolean;
  /** How many characters of code to reveal (for typing animation) */
  revealCount?: number;
}

export default function SyntaxHighlighter({
  code,
  language,
  typing = false,
  revealCount,
}: Props) {
  const displayCode =
    typing && revealCount !== undefined ? code.slice(0, revealCount) : code;

  const lines = displayCode.split("\n");

  return (
    <>
      {lines.map((line, i) => (
        <div className="code-line" key={i}>
          <span className="line-number">{i + 1}</span>
          <span
            className="line-content"
            dangerouslySetInnerHTML={{
              __html: tokeniseLine(line, language),
            }}
          />
          {typing && i === lines.length - 1 && (
            <span className="typing-cursor" />
          )}
        </div>
      ))}
    </>
  );
}
