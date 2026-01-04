import { ACTIONS } from "./actionTypes";
import { initialGameState } from "./gameState";
import { generateCards } from "./cardFactory";
import { calculateResults } from "./results";
import { PHASES, PLAYER_LIMITS } from "./constants";
import { clearSavedGame } from "../utils/persistGame";

function createPlayers(count) {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    score: 0,
  }));
}

function startNewPlayState(state) {
  const { settings } = state;

  return {
    phase: PHASES.PLAYING,
    cards: generateCards({
      gridSize: settings.gridSize,
      theme: settings.theme,
    }),
    players: createPlayers(settings.players),
    selectedCards: [],
    currentPlayerIndex: 0,
    moves: 0,
    isBoardLocked: false,
    recentlyMatchedIds: [],
    results: null,
    timer:
      settings.players === PLAYER_LIMITS.MIN
        ? { elapsed: 0, isRunning: true }
        : { elapsed: 0, isRunning: false },
  };
}

export function gameReducer(state, action) {
  switch (action.type) {
    case ACTIONS.SET_SETTINGS:
      return {
        ...state,
        settings: {
          ...state.settings,
          ...action.payload,
        },
      };

    case ACTIONS.START_GAME:
    case ACTIONS.RESTART_GAME:
      return {
        ...state,
        ...startNewPlayState(state),
      };

    case ACTIONS.NEW_GAME:
      clearSavedGame();
      return initialGameState;

    case ACTIONS.FLIP_CARD: {
      if (state.isBoardLocked) return state;

      const { cardId } = action.payload;
      const card = state.cards.find((c) => c.id === cardId);

      // Ignore invalid clicks
      if (!card || card.isFlipped || card.isMatched) return state;
      // Prevent selecting more than 2 cards
      if (state.selectedCards.length === 2) return state;

      const updatedCards = state.cards.map((c) =>
        c.id === cardId ? { ...c, isFlipped: true } : c,
      );

      const selectedCards = [...state.selectedCards, cardId];
      const isSecondCard = selectedCards.length === 2;

      return {
        ...state,
        cards: updatedCards,
        selectedCards,
        moves: isSecondCard ? state.moves + 1 : state.moves,
        isBoardLocked: isSecondCard,
      };
    }

    case ACTIONS.CLEAR_RECENT_MATCH:
      return {
        ...state,
        recentlyMatchedIds: [],
      };

    case ACTIONS.CHECK_MATCH: {
      if (!state.isBoardLocked) return state;
      if (state.selectedCards.length !== 2) return state;

      const [firstId, secondId] = state.selectedCards;
      const firstCard = state.cards.find((c) => c.id === firstId);
      const secondCard = state.cards.find((c) => c.id === secondId);

      if (!firstCard || !secondCard) return state;

      const isMatch = firstCard.value === secondCard.value;

      let updatedCards;
      let updatedPlayers = [...state.players];
      let nextPlayerIndex = state.currentPlayerIndex;

      if (isMatch) {
        // Mark both cards as matched
        updatedCards = state.cards.map((card) =>
          card.id === firstId || card.id === secondId
            ? { ...card, isMatched: true }
            : card,
        );

        // Multiplayer: increase score
        if (state.settings.players > PLAYER_LIMITS.MIN) {
          updatedPlayers = state.players.map((player, index) =>
            index === state.currentPlayerIndex
              ? { ...player, score: player.score + 1 }
              : player,
          );
        }
      } else {
        // Flip cards back
        updatedCards = state.cards.map((card) =>
          card.id === firstId || card.id === secondId
            ? { ...card, isFlipped: false }
            : card,
        );

        // Multiplayer: move to next player
        if (state.settings.players > PLAYER_LIMITS.MIN) {
          nextPlayerIndex =
            (state.currentPlayerIndex + 1) % state.players.length;
        }
      }

      // Check if all cards are matched
      const isGameFinished = updatedCards.every((card) => card.isMatched);

      const results = isGameFinished
        ? calculateResults({
            ...state,
            cards: updatedCards,
            players: updatedPlayers,
          })
        : null;

      return {
        ...state,
        cards: updatedCards,
        recentlyMatchedIds: [firstId, secondId],
        players: updatedPlayers,
        currentPlayerIndex: nextPlayerIndex,

        selectedCards: [],
        isBoardLocked: false,

        phase: isGameFinished ? PHASES.FINISHED : state.phase,
        results,
        timer: isGameFinished
          ? { ...state.timer, isRunning: false }
          : state.timer,
      };
    }

    case ACTIONS.TICK_TIMER: {
      // Timer should only tick if running
      if (!state.timer.isRunning) return state;

      return {
        ...state,
        timer: {
          ...state.timer,
          elapsed: state.timer.elapsed + 1,
        },
      };
    }

    default:
      return state;
  }
}
