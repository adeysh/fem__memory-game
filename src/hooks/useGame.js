import { useReducer, useEffect } from "react";
import { gameReducer } from "../game/gameReducer";
import { ACTIONS } from "../game/actionTypes";
import { PHASES, PLAYER_LIMITS, ANIMATION_TIMINGS } from "../game/constants";
import { saveGameState } from "../utils/persistGame";
import { createInitialGameState } from "../game/createInitialState";

export function useGame() {
  const [state, dispatch] = useReducer(
    gameReducer,
    undefined,
    createInitialGameState,
  );

  useEffect(() => {
    saveGameState(state);
  }, [
    state,
    state.phase,
    state.cards,
    state.players,
    state.currentPlayerIndex,
    state.moves,
    state.timer.elapsed,
  ]);

  useEffect(() => {
    // Timer (single player only)
    if (
      state.settings.players !== PLAYER_LIMITS.MIN ||
      !state.timer.isRunning ||
      state.phase !== PHASES.PLAYING
    ) {
      return;
    }

    const interval = setInterval(() => {
      dispatch({ type: ACTIONS.TICK_TIMER });
    }, 1000);

    return () => clearInterval(interval);
  }, [state.settings.players, state.timer.isRunning, state.phase]);

  // Trigger CHECK_MATCH after second card
  useEffect(() => {
    if (state.phase !== PHASES.PLAYING) return;
    if (!state.isBoardLocked) return;

    const timeout = setTimeout(() => {
      dispatch({ type: ACTIONS.CHECK_MATCH });
    }, ANIMATION_TIMINGS.CHECK_MATCH_DELAY);

    return () => clearTimeout(timeout);
  }, [state.phase, state.isBoardLocked, dispatch]);

  const setSettings = (settings) => {
    dispatch({
      type: ACTIONS.SET_SETTINGS,
      payload: settings,
    });
  };

  const startGame = () => {
    dispatch({
      type: ACTIONS.START_GAME,
    });
  };

  const restartGame = () => {
    dispatch({
      type: ACTIONS.RESTART_GAME,
    });
  };

  const newGame = () => {
    dispatch({
      type: ACTIONS.NEW_GAME,
    });
  };

  const flipCard = (cardId) => {
    dispatch({
      type: ACTIONS.FLIP_CARD,
      payload: { cardId },
    });
  };

  const clearRecentMatch = () => {
    dispatch({ type: "CLEAR_RECENT_MATCH" });
  };

  return {
    state,
    setSettings,
    startGame,
    restartGame,
    newGame,
    flipCard,
    clearRecentMatch,
  };
}
