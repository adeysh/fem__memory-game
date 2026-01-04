const GameInfoMultiPlayer = ({ state }) => {
  return (
    <div className="flex w-full justify-center gap-6 text-center md:text-left">
      {state.players.map((player, index) => {
        const isActive = index === state.currentPlayerIndex;

        return (
          <div
            key={player.id}
            className={`relative rounded-xs px-4.5 py-2.5 md:flex-1 ${
              isActive ? "bg-orange active-player" : "bg-blue-light"
            }`}
          >
            <p
              className={`text-info-label flex flex-col gap-0.5 font-bold xl:flex-row xl:items-center xl:justify-between ${
                isActive ? "text-white-100" : "text-blue-300"
              }`}
            >
              {/* Mobile */}
              <span className="md:hidden">P{player.id}</span>

              {/* Tablet & Desktop */}
              <span className="hidden md:inline">Player {player.id}</span>

              <span
                className={`text-info-detail px-1.5 font-bold ${
                  isActive ? "text-white-100" : "text-blue-400"
                }`}
              >
                {player.score}
              </span>
            </p>

            {/* Current turn label */}
            {isActive && (
              <span className="absolute -bottom-8 left-1/2 hidden -translate-x-1/2 text-xs font-bold tracking-[5px] whitespace-nowrap text-blue-500 uppercase xl:block">
                Current Turn
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
};
export default GameInfoMultiPlayer;
