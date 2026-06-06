"use client";

import { FILES, FileId, FILE_MAP } from "@/lib/fileContents";

interface Props {
  activeFile: FileId | null;
  onTabClick: (f: FileId) => void;
}

const EXT_COLOUR: Record<string, string> = {
  ts:   "#3178c6",
  js:   "#f0db4f",
  json: "#dbb879",
  md:   "#9aa",
};

export default function EditorTabs({
  activeFile,
  onTabClick,
}: Props) {
  return (
    <div className="flex items-end overflow-x-auto flex-shrink-0 border-b border-black h-[var(--tab-h)] bg-tab-inactive [&::-webkit-scrollbar]:h-0 ">
      {FILES.map((file) => {
        const fid = file.id;
        const ext = fid.split(".").pop() ?? "";
        const colour = EXT_COLOUR[ext] ?? "#888";
        const isActive = fid === activeFile;

        return (
          <div
            key={fid}
            className={`flex items-center gap-2 px-4 h-[35px] border-r border-black text-[13px] cursor-pointer whitespace-nowrap transition-colors duration-150 flex-shrink-0 select-none ${
              isActive
                ? "tab-active bg-tab-active text-text-active"
                : "bg-tab-inactive text-text-secondary hover:bg-tab-active hover:text-text-primary"
            }`}
            onClick={() => onTabClick(fid)}
          >
            <span style={{ color: colour, fontSize: 14 }}>{file.icon}</span>
            <span>{fid}</span>
          </div>
        );
      })}
    </div>
  );
}
