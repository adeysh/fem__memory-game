import { useEffect, useState } from "react";
import GameHeader from "./GameHeader";
import GameGrid from "./GameGrid";
import GameInfoSinglePlayer from "./GameInfoSinglePlayer";
import GameInfoMultiPlayer from "./GameInfoMultiPlayer";
import GameMenuModal from "./GameMenuModal";
import { PLAYER_LIMITS, ANIMATION_TIMINGS } from "../../game/constants";
import { useLockBodyScroll } from "../../hooks/useLockBodyScroll";

const GameScreen = ({
  state,
  flipCard,
  restartGame,
  newGame,
  clearRecentMatch,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (state.recentlyMatchedIds.length === 2) {
      const timeout = setTimeout(() => {
        clearRecentMatch();
      }, ANIMATION_TIMINGS.MATCH_FLASH_DURATION); // brief orange flash

      return () => clearTimeout(timeout);
    }
  }, [state.recentlyMatchedIds, clearRecentMatch]);

  useLockBodyScroll(isMenuOpen);

  if (!state.cards || state.cards.length === 0) {
    return <p>Loading cards...</p>;
  }

  return (
    <div className="md:flex md:w-full md:flex-col md:px-20 md:py-11 xl:py-16">
      {/* game header */}
      <GameHeader
        onMenu={() => setIsMenuOpen(true)}
        onRestart={restartGame}
        onNewGame={newGame}
      />

      {/* game grid */}
      <div className="flex flex-col items-center justify-center p-6 md:p-0">
        <GameGrid
          cards={state.cards}
          gridSize={state.settings.gridSize}
          onFlip={flipCard}
          recentlyMatchedIds={state.recentlyMatchedIds}
          theme={state.settings.theme}
        />
      </div>

      {/* game info */}
      {state.settings.players === PLAYER_LIMITS.MIN && (
        <GameInfoSinglePlayer state={state} />
      )}

      {state.settings.players > PLAYER_LIMITS.MIN && (
        <GameInfoMultiPlayer state={state} />
      )}

      {/* game menu */}
      {isMenuOpen && (
        <GameMenuModal
          onClose={() => setIsMenuOpen(false)}
          onRestart={() => {
            restartGame();
            setIsMenuOpen(false);
          }}
          onNewGame={() => {
            newGame();
            setIsMenuOpen(false);
          }}
        />
      )}
    </div>
  );
};
export default GameScreen;
