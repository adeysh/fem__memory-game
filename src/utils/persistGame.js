const STORAGE_KEY = "memory-game-state";

export function saveGameState(state) {
  if (state.phase !== "playing") return;

  const persistableState = {
    phase: state.phase,
    settings: state.settings,
    cards: state.cards,
    players: state.players,
    currentPlayerIndex: state.currentPlayerIndex,
    moves: state.moves,
    timer: {
      elapsed: state.timer.elapsed,
      isRunning: state.timer.isRunning,
    },
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(persistableState));
}

export function loadGameState() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function clearSavedGame() {
  localStorage.removeItem(STORAGE_KEY);
}
