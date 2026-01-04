import PrimaryButton from "../UI/PrimaryButton";
import SecondaryButton from "../UI/SecondaryButton";
import ResultRow from "./ResultRow";
import { RESULT_MODES } from "../../game/constants";
import formatTime from "../../utils/formatTime";

const ResultsScreen = ({ state, restartGame, newGame }) => {
  const { results, timer, moves } = state;
  const { mode, players = [], winnerIds = [] } = results;

  const isSingle = mode === RESULT_MODES.SINGLE;
  const isMulti = mode === RESULT_MODES.MULTI;
  const isTie = isMulti && winnerIds.length > 1;

  // Heading text
  const heading = isSingle
    ? "You did it!"
    : isTie
      ? "It's a tie!"
      : `Player ${winnerIds[0]} Wins!`;

  // Subheading text
  const subheading = isSingle
    ? "Game over! Here's how you got on…"
    : "Game over! Here are the results…";

  return (
    <div className="flex min-h-screen flex-col items-center justify-center md:w-full md:px-14">
      <div className="bg-white-200 flex max-w-2xl flex-col items-center gap-6 rounded-xs p-6 font-bold md:w-full md:p-12 xl:gap-10 xl:p-14">
        {/* Heading */}
        <div className="text-center">
          <h1 className="text-h1 text-blue-500">{heading}</h1>
          <p className="text-results-menu-subheading text-blue-300">
            {subheading}
          </p>
        </div>

        {/* Results body */}
        <div className="flex w-full flex-col items-center justify-between gap-2 md:gap-4">
          {isSingle && (
            <>
              <ResultRow
                label="Time Elapsed"
                value={`${formatTime(timer.elapsed)}s`}
              />
              <ResultRow label="Moves Taken" value={`${moves} Moves`} />
            </>
          )}

          {isMulti &&
            players.map((player) => {
              const isWinner = winnerIds.includes(player.id);

              return (
                <ResultRow
                  key={player.id}
                  label={`Player ${player.id} ${isWinner ? "(Winner)" : ""}`}
                  value={`${player.score} Pairs`}
                  highlight={isWinner}
                />
              );
            })}
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center">
          <PrimaryButton
            label="Restart"
            variant="primary"
            onClick={restartGame}
          />

          <SecondaryButton
            label="Setup New Game"
            variant="menu"
            onClick={newGame}
          />
        </div>
      </div>
    </div>
  );
};
export default ResultsScreen;
