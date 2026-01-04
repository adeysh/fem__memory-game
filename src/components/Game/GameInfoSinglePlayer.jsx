import formatTime from "../../utils/formatTime";

const GameInfoSinglePlayer = ({ state }) => {
  return (
    <div className="flex w-full justify-center gap-6 rounded-xs md:justify-between xl:justify-center">
      <div className="bg-blue-light rounded-[5px] px-8 py-2.5 text-center md:flex-1 xl:flex-0">
        <p className="text-info-label flex flex-col gap-0.5 font-bold text-blue-300">
          Time{" "}
          <span className="text-info-detail px-4 font-bold text-blue-400 tabular-nums">
            {formatTime(state.timer.elapsed)}
          </span>
        </p>
      </div>

      <div className="bg-blue-light rounded-[5px] px-8 py-2.5 text-center md:flex-1 xl:flex-0">
        <p className="text-info-label flex flex-col gap-0.5 font-bold text-blue-300">
          Moves{" "}
          <span className="text-info-detail px-4 font-bold text-blue-400">
            {state.moves}
          </span>
        </p>
      </div>
    </div>
  );
};
export default GameInfoSinglePlayer;
