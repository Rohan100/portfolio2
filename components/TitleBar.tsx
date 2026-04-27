"use client";

export default function TitleBar() {
  const menus = ["File", "Edit", "View", "Go", "Run", "Terminal", "Help"];

  return (
    <div
      className="flex items-center justify-between px-4 flex-shrink-0 select-none border-b border-black h-[var(--titlebar-h)] bg-titlebar text-text-primary"
      style={{ WebkitAppRegion: "drag" } as React.CSSProperties}
    >
      {/* Menu items */}
      <div className="flex gap-4 text-[12px]">
        {menus.map((m) => (
          <span
            key={m}
            className="cursor-pointer px-[6px] py-[2px] rounded-[3px] transition-colors duration-150 hover:bg-[#505050]"
          >
            {m}
          </span>
        ))}
      </div>

      {/* Centered title */}
      <span className="absolute left-1/2 -translate-x-1/2 text-[12px] pointer-events-none text-text-secondary">
        Rohan Nagare — Portfolio
      </span>

      {/* Window dots */}
      <div
        className="flex gap-[7px] items-center"
        style={{ WebkitAppRegion: "no-drag" } as React.CSSProperties}
      >
        <div className="w-3 h-3 rounded-full cursor-pointer transition-opacity duration-200 hover:opacity-80 bg-[#ff5f57]" title="Close" />
        <div className="w-3 h-3 rounded-full cursor-pointer transition-opacity duration-200 hover:opacity-80 bg-[#ffbd2e]" title="Minimize" />
        <div className="w-3 h-3 rounded-full cursor-pointer transition-opacity duration-200 hover:opacity-80 bg-[#28c840]" title="Maximize" />
      </div>
    </div>
  );
}
