"use client";

import { FileId, FILE_MAP } from "@/lib/fileContents";

interface Props {
  openFiles: FileId[];
  activeFile: FileId | null;
  onTabClick: (f: FileId) => void;
  onTabClose: (f: FileId) => void;
}

const EXT_COLOUR: Record<string, string> = {
  ts:   "#3178c6",
  js:   "#f0db4f",
  json: "#dbb879",
  md:   "#9aa",
};

export default function EditorTabs({
  openFiles,
  activeFile,
  onTabClick,
  onTabClose,
}: Props) {
  if (openFiles.length === 0)
    return (
      <div className="flex-shrink-0 border-b border-black h-[var(--tab-h)] bg-tab-inactive" />
    );

  return (
    <div className="flex items-end overflow-x-auto flex-shrink-0 border-b border-black h-[var(--tab-h)] bg-tab-inactive [&::-webkit-scrollbar]:h-0">
      {openFiles.map((fid) => {
        const info = FILE_MAP[fid];
        const ext = fid.split(".").pop() ?? "";
        const colour = EXT_COLOUR[ext] ?? "#888";
        const isActive = fid === activeFile;

        return (
          <div
            key={fid}
            className={`flex items-center gap-2 px-[14px] h-[35px] border-r border-black text-[13px] cursor-pointer whitespace-nowrap transition-colors duration-150 flex-shrink-0 select-none ${
              isActive
                ? "tab-active bg-tab-active text-text-active"
                : "bg-tab-inactive text-text-secondary hover:bg-tab-active hover:text-text-primary"
            }`}
            onClick={() => onTabClick(fid)}
          >
            <span style={{ color: colour, fontSize: 14 }}>{info.icon}</span>
            <span>{fid}</span>
            <span
              className={`flex items-center justify-center w-4 h-4 rounded-[3px] text-[14px] leading-none transition-opacity duration-150 hover:bg-[#555] ${
                isActive ? "opacity-100" : "opacity-0 hover:opacity-100"
              }`}
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
