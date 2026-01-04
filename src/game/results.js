import { RESULT_MODES, PLAYER_LIMITS } from "./constants";

export function calculateResults({ settings, players, moves, timer }) {
  // Single player
  if (settings.players === PLAYER_LIMITS.MIN) {
    return {
      mode: RESULT_MODES.SINGLE,
      time: timer.elapsed,
      moves,
    };
  }

  // Multiplayer
  const maxScore = Math.max(...players.map((p) => p.score));

  const winnerIds = players
    .filter((p) => p.score === maxScore)
    .map((p) => p.id);

  return {
    mode: RESULT_MODES.MULTI,
    players,
    winnerIds,
  };
}
