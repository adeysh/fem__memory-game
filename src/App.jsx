import { useEffect } from "react";
import { useGame } from "./hooks/useGame";
import { PHASES } from "./game/constants";

import SetupScreen from "./components/Setup/SetupScreen";
import GameScreen from "./components/Game/GameScreen";
import ResultsScreen from "./components/Results/ResultsScreen";
import Footer from "./components/Footer";

function App() {
  const {
    state,
    setSettings,
    startGame,
    restartGame,
    newGame,
    flipCard,
    clearRecentMatch,
  } = useGame();

  // Update body class based on phase
  useEffect(() => {
    document.body.className = state.phase;
  }, [state.phase]);

  let content = null;

  // Render by phase
  switch (state.phase) {
    case PHASES.SETUP:
      content = (
        <SetupScreen
          state={state}
          setSettings={setSettings}
          startGame={startGame}
        />
      );
      break;

    case PHASES.PLAYING:
      content = (
        <GameScreen
          state={state}
          flipCard={flipCard}
          restartGame={restartGame}
          newGame={newGame}
          clearRecentMatch={clearRecentMatch}
        />
      );
      break;

    case PHASES.FINISHED:
      content = (
        <ResultsScreen
          state={state}
          restartGame={restartGame}
          newGame={newGame}
        />
      );
      break;

    default:
      return null;
  }

  return (
    <div className="flex w-full flex-col">
      <main className="flex min-h-screen flex-1 flex-col justify-center">
        {content}
      </main>
      <Footer />
    </div>
  );
}

export default App;
