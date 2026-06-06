// ── lib/commands.ts ──────────────────────────────────────────────────────────
// Central command registry — single source of truth for every action.
// CommandPalette, ShortcutsToast, SettingsPanel, and tooltips all import here.
// ─────────────────────────────────────────────────────────────────────────────

export type CommandCategory = "navigation" | "view" | "theme" | "settings" | "help";

export interface Command {
  id: string;
  label: string;
  description?: string;
  /** Display string shown in UI, e.g. "Ctrl+Shift+P" */
  shortcut?: string;
  /** Machine-readable primary key combo, e.g. ["ctrl","shift","p"] */
  shortcutKeys?: string[];
  /** Second key in a chord (for Ctrl+K → Ctrl+T), e.g. ["ctrl","t"] */
  chordKey?: string[];
  category: CommandCategory;
  icon: string;
}

// ── Ordered command list ──────────────────────────────────────────────────────
export const COMMANDS: Command[] = [
  // Navigation
  {
    id: "navigate-about",
    label: "Go to About",
    description: "Open about-me.ts",
    category: "navigation",
    icon: "👤",
  },
  {
    id: "navigate-projects",
    label: "Go to Projects",
    description: "Open projects.ts",
    category: "navigation",
    icon: "💼",
  },
  {
    id: "navigate-skills",
    label: "Go to Skills",
    description: "Open skills.json",
    category: "navigation",
    icon: "⚡",
  },
  {
    id: "navigate-experience",
    label: "Go to Experience",
    description: "Open experience.md",
    category: "navigation",
    icon: "📄",
  },
  {
    id: "navigate-contact",
    label: "Go to Contact",
    description: "Open contact.js",
    category: "navigation",
    icon: "✉️",
  },

  // View
  {
    id: "toggle-sidebar",
    label: "Toggle Sidebar",
    description: "Show or hide the file explorer panel",
    shortcut: "Ctrl+B",
    shortcutKeys: ["ctrl", "b"],
    category: "view",
    icon: "◧",
  },
  {
    id: "toggle-copilot",
    label: "Toggle AI Copilot",
    description: "Show or hide the AI Copilot panel",
    shortcut: "Ctrl+Shift+I",
    shortcutKeys: ["ctrl", "shift", "i"],
    category: "view",
    icon: "✨",
  },
  {
    id: "open-command-palette",
    label: "Open Command Palette",
    description: "Search and run commands",
    shortcut: "Ctrl+Shift+P",
    shortcutKeys: ["ctrl", "shift", "p"],
    category: "view",
    icon: "⌨",
  },
  {
    id: "open-search",
    label: "Search Portfolio",
    description: "Search across all sections",
    shortcut: "Ctrl+Shift+F",
    shortcutKeys: ["ctrl", "shift", "f"],
    category: "view",
    icon: "🔍",
  },

  // Theme
  {
    id: "open-theme-selector",
    label: "Change Color Theme",
    description: "Select a theme for the editor",
    shortcut: "Ctrl+K Ctrl+T",
    shortcutKeys: ["ctrl", "k"],
    chordKey: ["ctrl", "t"],
    category: "theme",
    icon: "🎨",
  },

  // Settings
  {
    id: "open-settings",
    label: "Open Settings",
    description: "Preferences and keyboard shortcuts",
    shortcut: "Ctrl+,",
    shortcutKeys: ["ctrl", ","],
    category: "settings",
    icon: "⚙️",
  },

  // Help
  {
    id: "show-shortcuts",
    label: "Keyboard Shortcuts",
    description: "Show all available keyboard shortcuts",
    shortcut: "F1",
    shortcutKeys: ["f1"],
    category: "help",
    icon: "❓",
  },
];

export const COMMAND_MAP = Object.fromEntries(COMMANDS.map((c) => [c.id, c])) as Record<string, Command>;

export const CATEGORY_LABELS: Record<CommandCategory, string> = {
  navigation: "Navigation",
  view:       "View",
  theme:      "Theme",
  settings:   "Settings",
  help:       "Help",
};

/** Commands that have keyboard shortcuts (for display in settings/toast) */
export const SHORTCUT_COMMANDS = COMMANDS.filter((c) => c.shortcut);
