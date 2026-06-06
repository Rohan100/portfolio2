// ── lib/themes.ts ────────────────────────────────────────────────────────────
// Single source of truth for all 10 VS Code–inspired themes.
// ThemeProvider reads this and writes CSS variables to document.documentElement.
// The FOUC-prevention inline script in app/layout.tsx inlines a minimal subset.
// ─────────────────────────────────────────────────────────────────────────────

export interface ThemeTokens {
  // ── Backgrounds ────────────────────────────────────
  bgEditor: string;
  bgSidebar: string;
  bgActivity: string;
  bgTitlebar: string;
  bgTabActive: string;
  bgTabInactive: string;
  bgStatusbar: string;
  bgHover: string;
  bgSelected: string;
  bgExplorerH: string;
  bgTooltip: string;
  bgModalBackdrop: string;
  bgInput: string;

  // ── Borders ────────────────────────────────────────
  border: string;
  borderLight: string;
  borderFocus: string;

  // ── Text ───────────────────────────────────────────
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  textActive: string;
  textStatusbar: string;
  textTooltip: string;

  // ── Accent ─────────────────────────────────────────
  accent: string;
  accentLight: string;

  // ── Status ─────────────────────────────────────────
  statusSuccess: string;
  statusWarning: string;
  statusError: string;
  statusInfo: string;

  // ── Scrollbar ──────────────────────────────────────
  scrollbarThumb: string;
  scrollbarThumbHover: string;

  // ── Selection ──────────────────────────────────────
  selectionBg: string;

  // ── Syntax tokens ──────────────────────────────────
  tokKeyword: string;
  tokType: string;
  tokString: string;
  tokNumber: string;
  tokComment: string;
  tokFunction: string;
  tokVariable: string;
  tokParameter: string;
  tokProperty: string;
  tokOperator: string;
  tokPunctuation: string;
  tokTag: string;
  tokAttr: string;
  tokRegex: string;
  tokConstant: string;
  tokMdHeading: string;
  tokMdBold: string;
  tokMdCode: string;
  tokMdItalic: string;
  tokMdLink: string;
}

export interface Theme {
  id: string;
  label: string;
  isDark: boolean;
  tokens: ThemeTokens;
}

// ── Maps ThemeTokens keys → CSS variable names ───────────────────────────────
export const TOKEN_TO_CSS_VAR: Record<keyof ThemeTokens, string> = {
  bgEditor:            "--bg-editor",
  bgSidebar:           "--bg-sidebar",
  bgActivity:          "--bg-activity",
  bgTitlebar:          "--bg-titlebar",
  bgTabActive:         "--bg-tab-active",
  bgTabInactive:       "--bg-tab-inactive",
  bgStatusbar:         "--bg-statusbar",
  bgHover:             "--bg-hover",
  bgSelected:          "--bg-selected",
  bgExplorerH:         "--bg-explorer-h",
  bgTooltip:           "--bg-tooltip",
  bgModalBackdrop:     "--bg-modal-backdrop",
  bgInput:             "--bg-input",
  border:              "--border",
  borderLight:         "--border-light",
  borderFocus:         "--border-focus",
  textPrimary:         "--text-primary",
  textSecondary:       "--text-secondary",
  textMuted:           "--text-muted",
  textActive:          "--text-active",
  textStatusbar:       "--text-statusbar",
  textTooltip:         "--text-tooltip",
  accent:              "--accent",
  accentLight:         "--accent-light",
  statusSuccess:       "--status-success",
  statusWarning:       "--status-warning",
  statusError:         "--status-error",
  statusInfo:          "--status-info",
  scrollbarThumb:      "--scrollbar-thumb",
  scrollbarThumbHover: "--scrollbar-thumb-hover",
  selectionBg:         "--selection-bg",
  tokKeyword:          "--tok-keyword",
  tokType:             "--tok-type",
  tokString:           "--tok-string",
  tokNumber:           "--tok-number",
  tokComment:          "--tok-comment",
  tokFunction:         "--tok-function",
  tokVariable:         "--tok-variable",
  tokParameter:        "--tok-parameter",
  tokProperty:         "--tok-property",
  tokOperator:         "--tok-operator",
  tokPunctuation:      "--tok-punctuation",
  tokTag:              "--tok-tag",
  tokAttr:             "--tok-attr",
  tokRegex:            "--tok-regex",
  tokConstant:         "--tok-constant",
  tokMdHeading:        "--tok-md-heading",
  tokMdBold:           "--tok-md-bold",
  tokMdCode:           "--tok-md-code",
  tokMdItalic:         "--tok-md-italic",
  tokMdLink:           "--tok-md-link",
};

// ── Theme definitions ─────────────────────────────────────────────────────────

const vscodeDark: Theme = {
  id: "vscode-dark",
  label: "VS Code Dark+",
  isDark: true,
  tokens: {
    bgEditor:            "#1e1e1e",
    bgSidebar:           "#252526",
    bgActivity:          "#333333",
    bgTitlebar:          "#3c3c3c",
    bgTabActive:         "#1e1e1e",
    bgTabInactive:       "#2d2d2d",
    bgStatusbar:         "#007acc",
    bgHover:             "#2a2d2e",
    bgSelected:          "#094771",
    bgExplorerH:         "#37373d",
    bgTooltip:           "#252526",
    bgModalBackdrop:     "rgba(0,0,0,0.5)",
    bgInput:             "#3c3c3c",
    border:              "#474747",
    borderLight:         "#3e3e42",
    borderFocus:         "#007acc",
    textPrimary:         "#d4d4d4",
    textSecondary:       "#858585",
    textMuted:           "#6a6a6a",
    textActive:          "#ffffff",
    textStatusbar:       "#ffffff",
    textTooltip:         "#cccccc",
    accent:              "#007acc",
    accentLight:         "#1177bb",
    statusSuccess:       "#4ec9b0",
    statusWarning:       "#dcdcaa",
    statusError:         "#f44747",
    statusInfo:          "#9cdcfe",
    scrollbarThumb:      "#424242",
    scrollbarThumbHover: "#555555",
    selectionBg:         "#264f78",
    tokKeyword:          "#569cd6",
    tokType:             "#4ec9b0",
    tokString:           "#ce9178",
    tokNumber:           "#b5cea8",
    tokComment:          "#6a9955",
    tokFunction:         "#dcdcaa",
    tokVariable:         "#9cdcfe",
    tokParameter:        "#9cdcfe",
    tokProperty:         "#9cdcfe",
    tokOperator:         "#d4d4d4",
    tokPunctuation:      "#d4d4d4",
    tokTag:              "#569cd6",
    tokAttr:             "#9cdcfe",
    tokRegex:            "#d16969",
    tokConstant:         "#4fc1ff",
    tokMdHeading:        "#569cd6",
    tokMdBold:           "#ce9178",
    tokMdCode:           "#ce9178",
    tokMdItalic:         "#ce9178",
    tokMdLink:           "#4ec9b0",
  },
};

const monokai: Theme = {
  id: "monokai",
  label: "Monokai",
  isDark: true,
  tokens: {
    bgEditor:            "#272822",
    bgSidebar:           "#1e1f1c",
    bgActivity:          "#1a1b18",
    bgTitlebar:          "#2d2e2a",
    bgTabActive:         "#272822",
    bgTabInactive:       "#3e3d32",
    bgStatusbar:         "#75715e",
    bgHover:             "#3e3d32",
    bgSelected:          "#49483e",
    bgExplorerH:         "#3e3d32",
    bgTooltip:           "#1e1f1c",
    bgModalBackdrop:     "rgba(0,0,0,0.6)",
    bgInput:             "#3e3d32",
    border:              "#75715e",
    borderLight:         "#49483e",
    borderFocus:         "#a6e22e",
    textPrimary:         "#f8f8f2",
    textSecondary:       "#75715e",
    textMuted:           "#4e4d3e",
    textActive:          "#ffffff",
    textStatusbar:       "#f8f8f2",
    textTooltip:         "#f8f8f2",
    accent:              "#a6e22e",
    accentLight:         "#89c917",
    statusSuccess:       "#a6e22e",
    statusWarning:       "#e6db74",
    statusError:         "#f92672",
    statusInfo:          "#66d9e8",
    scrollbarThumb:      "#49483e",
    scrollbarThumbHover: "#75715e",
    selectionBg:         "#49483e",
    tokKeyword:          "#f92672",
    tokType:             "#66d9e8",
    tokString:           "#e6db74",
    tokNumber:           "#ae81ff",
    tokComment:          "#75715e",
    tokFunction:         "#a6e22e",
    tokVariable:         "#f8f8f2",
    tokParameter:        "#fd971f",
    tokProperty:         "#66d9e8",
    tokOperator:         "#f92672",
    tokPunctuation:      "#f8f8f2",
    tokTag:              "#f92672",
    tokAttr:             "#a6e22e",
    tokRegex:            "#ae81ff",
    tokConstant:         "#ae81ff",
    tokMdHeading:        "#a6e22e",
    tokMdBold:           "#f92672",
    tokMdCode:           "#e6db74",
    tokMdItalic:         "#fd971f",
    tokMdLink:           "#66d9e8",
  },
};

const dracula: Theme = {
  id: "dracula",
  label: "Dracula",
  isDark: true,
  tokens: {
    bgEditor:            "#282a36",
    bgSidebar:           "#21222c",
    bgActivity:          "#191a21",
    bgTitlebar:          "#21222c",
    bgTabActive:         "#282a36",
    bgTabInactive:       "#21222c",
    bgStatusbar:         "#6272a4",
    bgHover:             "#44475a",
    bgSelected:          "#44475a",
    bgExplorerH:         "#44475a",
    bgTooltip:           "#21222c",
    bgModalBackdrop:     "rgba(0,0,0,0.6)",
    bgInput:             "#44475a",
    border:              "#6272a4",
    borderLight:         "#44475a",
    borderFocus:         "#bd93f9",
    textPrimary:         "#f8f8f2",
    textSecondary:       "#6272a4",
    textMuted:           "#44475a",
    textActive:          "#ffffff",
    textStatusbar:       "#f8f8f2",
    textTooltip:         "#f8f8f2",
    accent:              "#bd93f9",
    accentLight:         "#a472e8",
    statusSuccess:       "#50fa7b",
    statusWarning:       "#f1fa8c",
    statusError:         "#ff5555",
    statusInfo:          "#8be9fd",
    scrollbarThumb:      "#44475a",
    scrollbarThumbHover: "#6272a4",
    selectionBg:         "#44475a",
    tokKeyword:          "#ff79c6",
    tokType:             "#8be9fd",
    tokString:           "#f1fa8c",
    tokNumber:           "#bd93f9",
    tokComment:          "#6272a4",
    tokFunction:         "#50fa7b",
    tokVariable:         "#f8f8f2",
    tokParameter:        "#ffb86c",
    tokProperty:         "#8be9fd",
    tokOperator:         "#ff79c6",
    tokPunctuation:      "#f8f8f2",
    tokTag:              "#ff79c6",
    tokAttr:             "#50fa7b",
    tokRegex:            "#ffb86c",
    tokConstant:         "#bd93f9",
    tokMdHeading:        "#bd93f9",
    tokMdBold:           "#ff79c6",
    tokMdCode:           "#f1fa8c",
    tokMdItalic:         "#ffb86c",
    tokMdLink:           "#8be9fd",
  },
};

const githubDark: Theme = {
  id: "github-dark",
  label: "GitHub Dark",
  isDark: true,
  tokens: {
    bgEditor:            "#0d1117",
    bgSidebar:           "#161b22",
    bgActivity:          "#010409",
    bgTitlebar:          "#161b22",
    bgTabActive:         "#0d1117",
    bgTabInactive:       "#161b22",
    bgStatusbar:         "#1f6feb",
    bgHover:             "#1c2128",
    bgSelected:          "#1f3a5f",
    bgExplorerH:         "#1c2128",
    bgTooltip:           "#161b22",
    bgModalBackdrop:     "rgba(0,0,0,0.6)",
    bgInput:             "#1c2128",
    border:              "#30363d",
    borderLight:         "#21262d",
    borderFocus:         "#1f6feb",
    textPrimary:         "#c9d1d9",
    textSecondary:       "#8b949e",
    textMuted:           "#484f58",
    textActive:          "#f0f6fc",
    textStatusbar:       "#ffffff",
    textTooltip:         "#c9d1d9",
    accent:              "#1f6feb",
    accentLight:         "#388bfd",
    statusSuccess:       "#3fb950",
    statusWarning:       "#d29922",
    statusError:         "#f85149",
    statusInfo:          "#58a6ff",
    scrollbarThumb:      "#30363d",
    scrollbarThumbHover: "#484f58",
    selectionBg:         "#1f3a5f",
    tokKeyword:          "#ff7b72",
    tokType:             "#79c0ff",
    tokString:           "#a5d6ff",
    tokNumber:           "#79c0ff",
    tokComment:          "#8b949e",
    tokFunction:         "#d2a8ff",
    tokVariable:         "#ffa657",
    tokParameter:        "#ffa657",
    tokProperty:         "#79c0ff",
    tokOperator:         "#ff7b72",
    tokPunctuation:      "#c9d1d9",
    tokTag:              "#7ee787",
    tokAttr:             "#79c0ff",
    tokRegex:            "#7ee787",
    tokConstant:         "#79c0ff",
    tokMdHeading:        "#1f6feb",
    tokMdBold:           "#ff7b72",
    tokMdCode:           "#a5d6ff",
    tokMdItalic:         "#d2a8ff",
    tokMdLink:           "#58a6ff",
  },
};

const githubLight: Theme = {
  id: "github-light",
  label: "GitHub Light",
  isDark: false,
  tokens: {
    bgEditor:            "#ffffff",
    bgSidebar:           "#f6f8fa",
    bgActivity:          "#eaeef2",
    bgTitlebar:          "#f6f8fa",
    bgTabActive:         "#ffffff",
    bgTabInactive:       "#f6f8fa",
    bgStatusbar:         "#0969da",
    bgHover:             "#eaeef2",
    bgSelected:          "#ddf4ff",
    bgExplorerH:         "#eaeef2",
    bgTooltip:           "#f6f8fa",
    bgModalBackdrop:     "rgba(0,0,0,0.3)",
    bgInput:             "#ffffff",
    border:              "#d0d7de",
    borderLight:         "#e1e4e8",
    borderFocus:         "#0969da",
    textPrimary:         "#24292f",
    textSecondary:       "#57606a",
    textMuted:           "#8c959f",
    textActive:          "#1f2328",
    textStatusbar:       "#ffffff",
    textTooltip:         "#24292f",
    accent:              "#0969da",
    accentLight:         "#218bff",
    statusSuccess:       "#1a7f37",
    statusWarning:       "#9a6700",
    statusError:         "#cf222e",
    statusInfo:          "#0969da",
    scrollbarThumb:      "#d0d7de",
    scrollbarThumbHover: "#8c959f",
    selectionBg:         "#ddf4ff",
    tokKeyword:          "#cf222e",
    tokType:             "#0550ae",
    tokString:           "#0a3069",
    tokNumber:           "#0550ae",
    tokComment:          "#57606a",
    tokFunction:         "#8250df",
    tokVariable:         "#953800",
    tokParameter:        "#953800",
    tokProperty:         "#0550ae",
    tokOperator:         "#cf222e",
    tokPunctuation:      "#24292f",
    tokTag:              "#116329",
    tokAttr:             "#0550ae",
    tokRegex:            "#116329",
    tokConstant:         "#0550ae",
    tokMdHeading:        "#0969da",
    tokMdBold:           "#cf222e",
    tokMdCode:           "#0a3069",
    tokMdItalic:         "#8250df",
    tokMdLink:           "#0969da",
  },
};

const oneDarkPro: Theme = {
  id: "one-dark-pro",
  label: "One Dark Pro",
  isDark: true,
  tokens: {
    bgEditor:            "#282c34",
    bgSidebar:           "#21252b",
    bgActivity:          "#181a1f",
    bgTitlebar:          "#21252b",
    bgTabActive:         "#282c34",
    bgTabInactive:       "#21252b",
    bgStatusbar:         "#21252b",
    bgHover:             "#2c313c",
    bgSelected:          "#3e4451",
    bgExplorerH:         "#2c313c",
    bgTooltip:           "#21252b",
    bgModalBackdrop:     "rgba(0,0,0,0.6)",
    bgInput:             "#2c313c",
    border:              "#3e4451",
    borderLight:         "#2c313c",
    borderFocus:         "#61afef",
    textPrimary:         "#abb2bf",
    textSecondary:       "#5c6370",
    textMuted:           "#3e4451",
    textActive:          "#ffffff",
    textStatusbar:       "#abb2bf",
    textTooltip:         "#abb2bf",
    accent:              "#61afef",
    accentLight:         "#4d9ddc",
    statusSuccess:       "#98c379",
    statusWarning:       "#e5c07b",
    statusError:         "#e06c75",
    statusInfo:          "#56b6c2",
    scrollbarThumb:      "#3e4451",
    scrollbarThumbHover: "#5c6370",
    selectionBg:         "#3e4451",
    tokKeyword:          "#c678dd",
    tokType:             "#e5c07b",
    tokString:           "#98c379",
    tokNumber:           "#d19a66",
    tokComment:          "#5c6370",
    tokFunction:         "#61afef",
    tokVariable:         "#e06c75",
    tokParameter:        "#e06c75",
    tokProperty:         "#e5c07b",
    tokOperator:         "#56b6c2",
    tokPunctuation:      "#abb2bf",
    tokTag:              "#e06c75",
    tokAttr:             "#d19a66",
    tokRegex:            "#56b6c2",
    tokConstant:         "#d19a66",
    tokMdHeading:        "#e06c75",
    tokMdBold:           "#e5c07b",
    tokMdCode:           "#98c379",
    tokMdItalic:         "#c678dd",
    tokMdLink:           "#56b6c2",
  },
};

const solarizedDark: Theme = {
  id: "solarized-dark",
  label: "Solarized Dark",
  isDark: true,
  tokens: {
    bgEditor:            "#002b36",
    bgSidebar:           "#073642",
    bgActivity:          "#00212b",
    bgTitlebar:          "#073642",
    bgTabActive:         "#002b36",
    bgTabInactive:       "#073642",
    bgStatusbar:         "#268bd2",
    bgHover:             "#073642",
    bgSelected:          "#073642",
    bgExplorerH:         "#073642",
    bgTooltip:           "#073642",
    bgModalBackdrop:     "rgba(0,0,0,0.6)",
    bgInput:             "#073642",
    border:              "#586e75",
    borderLight:         "#073642",
    borderFocus:         "#268bd2",
    textPrimary:         "#839496",
    textSecondary:       "#657b83",
    textMuted:           "#586e75",
    textActive:          "#fdf6e3",
    textStatusbar:       "#fdf6e3",
    textTooltip:         "#93a1a1",
    accent:              "#268bd2",
    accentLight:         "#2aa198",
    statusSuccess:       "#859900",
    statusWarning:       "#b58900",
    statusError:         "#dc322f",
    statusInfo:          "#268bd2",
    scrollbarThumb:      "#586e75",
    scrollbarThumbHover: "#657b83",
    selectionBg:         "#073642",
    tokKeyword:          "#859900",
    tokType:             "#b58900",
    tokString:           "#2aa198",
    tokNumber:           "#d33682",
    tokComment:          "#586e75",
    tokFunction:         "#268bd2",
    tokVariable:         "#268bd2",
    tokParameter:        "#cb4b16",
    tokProperty:         "#2aa198",
    tokOperator:         "#859900",
    tokPunctuation:      "#839496",
    tokTag:              "#268bd2",
    tokAttr:             "#2aa198",
    tokRegex:            "#2aa198",
    tokConstant:         "#d33682",
    tokMdHeading:        "#268bd2",
    tokMdBold:           "#cb4b16",
    tokMdCode:           "#2aa198",
    tokMdItalic:         "#d33682",
    tokMdLink:           "#2aa198",
  },
};

const solarizedLight: Theme = {
  id: "solarized-light",
  label: "Solarized Light",
  isDark: false,
  tokens: {
    bgEditor:            "#fdf6e3",
    bgSidebar:           "#eee8d5",
    bgActivity:          "#e8e0cc",
    bgTitlebar:          "#eee8d5",
    bgTabActive:         "#fdf6e3",
    bgTabInactive:       "#eee8d5",
    bgStatusbar:         "#268bd2",
    bgHover:             "#eee8d5",
    bgSelected:          "#ddd6c1",
    bgExplorerH:         "#eee8d5",
    bgTooltip:           "#eee8d5",
    bgModalBackdrop:     "rgba(0,0,0,0.3)",
    bgInput:             "#fdf6e3",
    border:              "#93a1a1",
    borderLight:         "#d4cebe",
    borderFocus:         "#268bd2",
    textPrimary:         "#657b83",
    textSecondary:       "#839496",
    textMuted:           "#93a1a1",
    textActive:          "#002b36",
    textStatusbar:       "#fdf6e3",
    textTooltip:         "#657b83",
    accent:              "#268bd2",
    accentLight:         "#2aa198",
    statusSuccess:       "#859900",
    statusWarning:       "#b58900",
    statusError:         "#dc322f",
    statusInfo:          "#268bd2",
    scrollbarThumb:      "#93a1a1",
    scrollbarThumbHover: "#839496",
    selectionBg:         "#ddd6c1",
    tokKeyword:          "#859900",
    tokType:             "#b58900",
    tokString:           "#2aa198",
    tokNumber:           "#d33682",
    tokComment:          "#93a1a1",
    tokFunction:         "#268bd2",
    tokVariable:         "#268bd2",
    tokParameter:        "#cb4b16",
    tokProperty:         "#2aa198",
    tokOperator:         "#859900",
    tokPunctuation:      "#657b83",
    tokTag:              "#268bd2",
    tokAttr:             "#2aa198",
    tokRegex:            "#2aa198",
    tokConstant:         "#d33682",
    tokMdHeading:        "#268bd2",
    tokMdBold:           "#cb4b16",
    tokMdCode:           "#2aa198",
    tokMdItalic:         "#d33682",
    tokMdLink:           "#2aa198",
  },
};

const nord: Theme = {
  id: "nord",
  label: "Nord",
  isDark: true,
  tokens: {
    bgEditor:            "#2e3440",
    bgSidebar:           "#272c36",
    bgActivity:          "#1e2229",
    bgTitlebar:          "#272c36",
    bgTabActive:         "#2e3440",
    bgTabInactive:       "#272c36",
    bgStatusbar:         "#5e81ac",
    bgHover:             "#3b4252",
    bgSelected:          "#3b4252",
    bgExplorerH:         "#3b4252",
    bgTooltip:           "#272c36",
    bgModalBackdrop:     "rgba(0,0,0,0.55)",
    bgInput:             "#3b4252",
    border:              "#4c566a",
    borderLight:         "#3b4252",
    borderFocus:         "#88c0d0",
    textPrimary:         "#d8dee9",
    textSecondary:       "#4c566a",
    textMuted:           "#3b4252",
    textActive:          "#eceff4",
    textStatusbar:       "#eceff4",
    textTooltip:         "#d8dee9",
    accent:              "#88c0d0",
    accentLight:         "#81a1c1",
    statusSuccess:       "#a3be8c",
    statusWarning:       "#ebcb8b",
    statusError:         "#bf616a",
    statusInfo:          "#88c0d0",
    scrollbarThumb:      "#4c566a",
    scrollbarThumbHover: "#616e88",
    selectionBg:         "#434c5e",
    tokKeyword:          "#81a1c1",
    tokType:             "#8fbcbb",
    tokString:           "#a3be8c",
    tokNumber:           "#b48ead",
    tokComment:          "#616e88",
    tokFunction:         "#88c0d0",
    tokVariable:         "#d8dee9",
    tokParameter:        "#d8dee9",
    tokProperty:         "#8fbcbb",
    tokOperator:         "#81a1c1",
    tokPunctuation:      "#eceff4",
    tokTag:              "#81a1c1",
    tokAttr:             "#8fbcbb",
    tokRegex:            "#ebcb8b",
    tokConstant:         "#b48ead",
    tokMdHeading:        "#88c0d0",
    tokMdBold:           "#ebcb8b",
    tokMdCode:           "#a3be8c",
    tokMdItalic:         "#b48ead",
    tokMdLink:           "#88c0d0",
  },
};

const tokyoNight: Theme = {
  id: "tokyo-night",
  label: "Tokyo Night",
  isDark: true,
  tokens: {
    bgEditor:            "#1a1b26",
    bgSidebar:           "#16161e",
    bgActivity:          "#13131a",
    bgTitlebar:          "#16161e",
    bgTabActive:         "#1a1b26",
    bgTabInactive:       "#16161e",
    bgStatusbar:         "#7aa2f7",
    bgHover:             "#1f2335",
    bgSelected:          "#283457",
    bgExplorerH:         "#1f2335",
    bgTooltip:           "#16161e",
    bgModalBackdrop:     "rgba(0,0,0,0.65)",
    bgInput:             "#1f2335",
    border:              "#3b4261",
    borderLight:         "#1f2335",
    borderFocus:         "#7aa2f7",
    textPrimary:         "#a9b1d6",
    textSecondary:       "#565f89",
    textMuted:           "#3b4261",
    textActive:          "#c0caf5",
    textStatusbar:       "#1a1b26",
    textTooltip:         "#a9b1d6",
    accent:              "#7aa2f7",
    accentLight:         "#5d85f5",
    statusSuccess:       "#9ece6a",
    statusWarning:       "#e0af68",
    statusError:         "#f7768e",
    statusInfo:          "#7dcfff",
    scrollbarThumb:      "#3b4261",
    scrollbarThumbHover: "#565f89",
    selectionBg:         "#283457",
    tokKeyword:          "#bb9af7",
    tokType:             "#2ac3de",
    tokString:           "#9ece6a",
    tokNumber:           "#ff9e64",
    tokComment:          "#565f89",
    tokFunction:         "#7aa2f7",
    tokVariable:         "#c0caf5",
    tokParameter:        "#e0af68",
    tokProperty:         "#73daca",
    tokOperator:         "#89ddff",
    tokPunctuation:      "#c0caf5",
    tokTag:              "#f7768e",
    tokAttr:             "#7dcfff",
    tokRegex:            "#b4f9f8",
    tokConstant:         "#ff9e64",
    tokMdHeading:        "#7aa2f7",
    tokMdBold:           "#f7768e",
    tokMdCode:           "#9ece6a",
    tokMdItalic:         "#bb9af7",
    tokMdLink:           "#7dcfff",
  },
};

// ── Registry ──────────────────────────────────────────────────────────────────
export const THEMES: Record<string, Theme> = {
  "vscode-dark":    vscodeDark,
  "monokai":        monokai,
  "dracula":        dracula,
  "github-dark":    githubDark,
  "github-light":   githubLight,
  "one-dark-pro":   oneDarkPro,
  "solarized-dark": solarizedDark,
  "solarized-light":solarizedLight,
  "nord":           nord,
  "tokyo-night":    tokyoNight,
};

export const THEME_LIST = Object.values(THEMES);
export const DEFAULT_THEME_ID = "vscode-dark";

/** Apply a theme's tokens as CSS variables on a given element (default: documentElement). */
export function applyTheme(theme: Theme, el: HTMLElement = document.documentElement): void {
  const { tokens } = theme;
  (Object.keys(tokens) as (keyof ThemeTokens)[]).forEach((key) => {
    el.style.setProperty(TOKEN_TO_CSS_VAR[key], tokens[key]);
  });
}

/**
 * Minimal token map for the FOUC-prevention inline script.
 * Only the vars needed to prevent visible flash (backgrounds + accent).
 */
export function buildFoucScript(): string {
  const minimalKeys: (keyof ThemeTokens)[] = [
    "bgEditor", "bgSidebar", "bgActivity", "bgTitlebar",
    "bgTabActive", "bgTabInactive", "bgStatusbar",
    "textPrimary", "textActive", "accent",
  ];

  const themeMap: Record<string, Record<string, string>> = {};
  Object.entries(THEMES).forEach(([id, theme]) => {
    themeMap[id] = {};
    minimalKeys.forEach((key) => {
      themeMap[id][TOKEN_TO_CSS_VAR[key]] = theme.tokens[key];
    });
  });

  return `(function(){try{
    var t=localStorage.getItem('portfolio-theme')||'${DEFAULT_THEME_ID}';
    var c=localStorage.getItem('portfolio-compact')==='true';
    var m=${JSON.stringify(themeMap)};
    var vars=m[t]||m['${DEFAULT_THEME_ID}'];
    var r=document.documentElement;
    Object.keys(vars).forEach(function(k){r.style.setProperty(k,vars[k]);});
    if(c)r.classList.add('compact-mode');
  }catch(e){}})();`;
}
