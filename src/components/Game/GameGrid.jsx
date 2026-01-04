import FlipCard from "./FlipCard";

const GameGrid = ({ cards, gridSize, onFlip, recentlyMatchedIds, theme }) => {
  return (
    <div
      className="mb-24 grid w-full max-w-lg place-items-center gap-3 md:mb-28 md:gap-5"
      style={{
        gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))`,
      }}
    >
      {cards.map((card) => (
        <FlipCard
          key={card.id}
          card={card}
          onFlip={onFlip}
          gridSize={gridSize}
          recentlyMatchedIds={recentlyMatchedIds}
          theme={theme}
        />
      ))}
    </div>
  );
};

export default GameGrid;
