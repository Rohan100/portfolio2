"use client";

export default function TitleBar() {
  const menus = ["File", "Edit", "View", "Go", "Run", "Terminal", "Help"];

  return (
    <div className="titlebar">
      <div className="titlebar-menu">
        {menus.map((m) => (
          <span key={m}>{m}</span>
        ))}
      </div>

      <span className="titlebar-title">
        Rohan Nagare — Portfolio
      </span>

      <div className="window-controls">
        <div className="window-dot dot-close" title="Close" />
        <div className="window-dot dot-minimize" title="Minimize" />
        <div className="window-dot dot-maximize" title="Maximize" />
      </div>
    </div>
  );
}
