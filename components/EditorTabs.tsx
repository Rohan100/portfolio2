"use client";

import { FileId, FILE_MAP } from "@/lib/fileContents";

interface Props {
  openFiles: FileId[];
  activeFile: FileId | null;
  onTabClick: (f: FileId) => void;
  onTabClose: (f: FileId) => void;
}

// File-extension → accent colour
const EXT_COLOUR: Record<string, string> = {
  ts: "#3178c6",
  js: "#f0db4f",
  json: "#dbb879",
  md: "#9aa",
};

export default function EditorTabs({
  openFiles,
  activeFile,
  onTabClick,
  onTabClose,
}: Props) {
  if (openFiles.length === 0) return <div className="tab-bar" />;

  return (
    <div className="tab-bar">
      {openFiles.map((fid) => {
        const info = FILE_MAP[fid];
        const ext = fid.split(".").pop() ?? "";
        const colour = EXT_COLOUR[ext] ?? "#888";
        const isActive = fid === activeFile;

        return (
          <div
            key={fid}
            className={`editor-tab${isActive ? " active" : ""}`}
            onClick={() => onTabClick(fid)}
          >
            <span style={{ color: colour, fontSize: 14 }}>{info.icon}</span>
            <span>{fid}</span>
            <span
              className="tab-close"
              onClick={(e) => {
                e.stopPropagation();
                onTabClose(fid);
              }}
            >
              ✕
            </span>
          </div>
        );
      })}
    </div>
  );
}
