import { PHASES, THEMES, GRID_SIZES, PLAYER_LIMITS } from "./constants";

export const initialGameState = Object.freeze({
  // App phase
  phase: PHASES.SETUP, // "setup" | "playing" | "finished"

  // Game settings
  settings: {
    theme: THEMES.NUMBERS, // "numbers" | "icons"
    players: PLAYER_LIMITS.MIN, // 1 - 4
    gridSize: GRID_SIZES.SMALL, // 4 | 6
  },

  // Gameplay
  cards: [], // generated on start
  selectedCards: [], // max 2
  recentlyMatchedIds: [], // for match animation
  isBoardLocked: false,

  // Players
  players: [], // generated on start
  currentPlayerIndex: 0,
  moves: 0,

  // Timer (single player only)
  timer: {
    elapsed: 0,
    isRunning: false,
  },

  // Results (set on finish)
  results: null,
});
