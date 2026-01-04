import { initialGameState } from "./gameState";
import { loadGameState } from "../utils/persistGame";
import { PHASES } from "./constants";

export function createInitialGameState() {
  const saved = loadGameState();

  // No saved game → fresh start
  if (!saved) {
    return initialGameState;
  }

  // Only resume mid-game
  if (saved.phase !== PHASES.PLAYING) {
    return initialGameState;
  }

  return {
    ...initialGameState,

    // restore safe persisted state
    phase: PHASES.PLAYING,
    settings: saved.settings ?? initialGameState.settings,
    cards: saved.cards ?? [],
    players: saved.players ?? [],
    currentPlayerIndex: saved.currentPlayerIndex ?? 0,
    moves: saved.moves ?? 0,

    timer: {
      elapsed: saved.timer?.elapsed ?? 0,
      isRunning: saved.timer?.isRunning ?? false,
    },

    // reset unsafe / transient state
    selectedCards: [],
    recentlyMatchedIds: [],
    isBoardLocked: false,
    results: null,
  };
}
