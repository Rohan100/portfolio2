"use client";

// ── lib/AppStateContext.tsx ───────────────────────────────────────────────────
// Memoized global state via useReducer. Single source of truth for all UI state.
// Persists theme, compactMode, animationsEnabled, sidebarDefaultOpen to localStorage.
// ─────────────────────────────────────────────────────────────────────────────

import {
  createContext,
  useContext,
  useReducer,
  useMemo,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import { DEFAULT_THEME_ID } from "./themes";

// ── Types ─────────────────────────────────────────────────────────────────────

export type ActivePanelId = "copilot" | "search" | "settings" | null;

export interface AppState {
  // Panel visibility
  sidebarOpen: boolean;
  activePanelId: ActivePanelId;      // only one right-side panel at a time
  commandPaletteOpen: boolean;
  themeSelectorOpen: boolean;
  toastVisible: boolean;

  // Persisted preferences
  activeTheme: string;
  animationsEnabled: boolean;
  compactMode: boolean;
  sidebarDefaultOpen: boolean;
}

export type AppAction =
  | { type: "SET_SIDEBAR"; payload: boolean }
  | { type: "TOGGLE_SIDEBAR" }
  | { type: "SET_ACTIVE_PANEL"; payload: ActivePanelId }
  | { type: "TOGGLE_PANEL"; payload: "copilot" | "search" | "settings" }
  | { type: "SET_COMMAND_PALETTE"; payload: boolean }
  | { type: "SET_THEME_SELECTOR"; payload: boolean }
  | { type: "SET_TOAST"; payload: boolean }
  | { type: "SET_THEME"; payload: string }
  | { type: "SET_ANIMATIONS"; payload: boolean }
  | { type: "SET_COMPACT"; payload: boolean }
  | { type: "SET_SIDEBAR_DEFAULT"; payload: boolean }
  | { type: "CLOSE_ALL_OVERLAYS" };

export interface AppStateContextValue extends AppState {
  dispatch: React.Dispatch<AppAction>;
}

// ── localStorage keys ─────────────────────────────────────────────────────────
const LS_THEME         = "portfolio-theme";
const LS_COMPACT       = "portfolio-compact";
const LS_ANIMATIONS    = "portfolio-animations";
const LS_SIDEBAR_DEF   = "portfolio-sidebar-default";

function readLS<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const v = localStorage.getItem(key);
    if (v === null) return fallback;
    return JSON.parse(v) as T;
  } catch {
    return fallback;
  }
}

// ── Initial state ─────────────────────────────────────────────────────────────
function buildInitialState(): AppState {
  const sidebarDefault = readLS(LS_SIDEBAR_DEF, true);
  return {
    sidebarOpen:        sidebarDefault,
    activePanelId:      null,
    commandPaletteOpen: false,
    themeSelectorOpen:  false,
    toastVisible:       false,
    activeTheme:        readLS(LS_THEME, DEFAULT_THEME_ID),
    animationsEnabled:  readLS(LS_ANIMATIONS, true),
    compactMode:        readLS(LS_COMPACT, false),
    sidebarDefaultOpen: sidebarDefault,
  };
}

// ── Reducer ───────────────────────────────────────────────────────────────────
function reducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case "SET_SIDEBAR":
      return { ...state, sidebarOpen: action.payload };
    case "TOGGLE_SIDEBAR":
      return { ...state, sidebarOpen: !state.sidebarOpen };
    case "SET_ACTIVE_PANEL":
      return { ...state, activePanelId: action.payload };
    case "TOGGLE_PANEL":
      return {
        ...state,
        activePanelId: state.activePanelId === action.payload ? null : action.payload,
      };
    case "SET_COMMAND_PALETTE":
      return { ...state, commandPaletteOpen: action.payload };
    case "SET_THEME_SELECTOR":
      return { ...state, themeSelectorOpen: action.payload };
    case "SET_TOAST":
      return { ...state, toastVisible: action.payload };
    case "SET_THEME":
      return { ...state, activeTheme: action.payload };
    case "SET_ANIMATIONS":
      return { ...state, animationsEnabled: action.payload };
    case "SET_COMPACT":
      return { ...state, compactMode: action.payload };
    case "SET_SIDEBAR_DEFAULT":
      return { ...state, sidebarDefaultOpen: action.payload };
    case "CLOSE_ALL_OVERLAYS":
      return {
        ...state,
        activePanelId:      null,
        commandPaletteOpen: false,
        themeSelectorOpen:  false,
        toastVisible:       false,
      };
    default:
      return state;
  }
}

// ── Context ───────────────────────────────────────────────────────────────────
const AppStateContext = createContext<AppStateContextValue | null>(null);

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, undefined, buildInitialState);

  // Persist preferences to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(LS_THEME, JSON.stringify(state.activeTheme));
  }, [state.activeTheme]);

  useEffect(() => {
    localStorage.setItem(LS_COMPACT, JSON.stringify(state.compactMode));
  }, [state.compactMode]);

  useEffect(() => {
    localStorage.setItem(LS_ANIMATIONS, JSON.stringify(state.animationsEnabled));
  }, [state.animationsEnabled]);

  useEffect(() => {
    localStorage.setItem(LS_SIDEBAR_DEF, JSON.stringify(state.sidebarDefaultOpen));
  }, [state.sidebarDefaultOpen]);

  // Apply compact-mode / no-animations classes to <html>
  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("compact-mode", state.compactMode);
  }, [state.compactMode]);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("no-animations", !state.animationsEnabled);
  }, [state.animationsEnabled]);

  // Memoize context value — only re-renders consumers when state actually changes
  const value = useMemo<AppStateContextValue>(
    () => ({ ...state, dispatch }),
    [state]
  );

  return (
    <AppStateContext.Provider value={value}>
      {children}
    </AppStateContext.Provider>
  );
}

// ── Hooks ─────────────────────────────────────────────────────────────────────

export function useAppState(): AppStateContextValue {
  const ctx = useContext(AppStateContext);
  if (!ctx) throw new Error("useAppState must be used within AppStateProvider");
  return ctx;
}

/** Convenience hook returning stable dispatch callbacks */
export function useAppActions() {
  const { dispatch } = useAppState();

  return useMemo(() => ({
    toggleSidebar:       () => dispatch({ type: "TOGGLE_SIDEBAR" }),
    setSidebar:          (v: boolean) => dispatch({ type: "SET_SIDEBAR", payload: v }),
    togglePanel:         (id: "copilot" | "search" | "settings") =>
                           dispatch({ type: "TOGGLE_PANEL", payload: id }),
    setActivePanel:      (id: ActivePanelId) => dispatch({ type: "SET_ACTIVE_PANEL", payload: id }),
    openCommandPalette:  () => dispatch({ type: "SET_COMMAND_PALETTE", payload: true }),
    closeCommandPalette: () => dispatch({ type: "SET_COMMAND_PALETTE", payload: false }),
    openThemeSelector:   () => dispatch({ type: "SET_THEME_SELECTOR", payload: true }),
    closeThemeSelector:  () => dispatch({ type: "SET_THEME_SELECTOR", payload: false }),
    showToast:           () => dispatch({ type: "SET_TOAST", payload: true }),
    hideToast:           () => dispatch({ type: "SET_TOAST", payload: false }),
    setTheme:            (id: string) => dispatch({ type: "SET_THEME", payload: id }),
    setAnimations:       (v: boolean) => dispatch({ type: "SET_ANIMATIONS", payload: v }),
    setCompact:          (v: boolean) => dispatch({ type: "SET_COMPACT", payload: v }),
    setSidebarDefault:   (v: boolean) => dispatch({ type: "SET_SIDEBAR_DEFAULT", payload: v }),
    closeAllOverlays:    () => dispatch({ type: "CLOSE_ALL_OVERLAYS" }),
  }), [dispatch]);
}
