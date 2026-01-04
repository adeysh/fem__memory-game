import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ICON_MAP } from "../../assets/icons";
import { THEMES, GRID_SIZES } from "../../game/constants";

const FlipCard = ({ card, onFlip, gridSize, recentlyMatchedIds, theme }) => {
  const isFaceUp = card.isFlipped || card.isMatched;
  const isRecentlyMatched =
    card.isMatched && recentlyMatchedIds.includes(card.id);

  const isSmallGrid = gridSize === GRID_SIZES.SMALL;

  const bgClass = isRecentlyMatched
    ? "bg-orange" // flash if they're correct match
    : card.isMatched
      ? "bg-blue-100" // permanent match
      : card.isFlipped
        ? "bg-blue-200" // comparison state
        : "bg-blue-400 hover:bg-blue-300"; // default

  const sizeClass = isSmallGrid
    ? "w-flip-card-4x4 h-flip-card-4x4"
    : "w-flip-card-6x6 h-flip-card-6x6";

  const iconSizeClass = isSmallGrid
    ? "text-2xl md:text-4xl xl:text-5xl"
    : "text-xl md:text-2xl xl:text-3xl";

  return (
    <button
      type="button"
      onClick={() => onFlip(card.id)}
      disabled={card.isFlipped || card.isMatched}
      aria-disabled={card.isFlipped || card.isMatched}
      className={`${sizeClass} text-white-100 ${bgClass} flex cursor-pointer items-center justify-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400`}
    >
      {isFaceUp &&
        (theme === THEMES.ICONS ? (
          <FontAwesomeIcon
            icon={ICON_MAP[card.value]}
            className={`text-white-100 ${iconSizeClass}`}
          />
        ) : (
          <span className={isSmallGrid ? "text-number-4x4" : "text-number-6x6"}>
            {card.value}
          </span>
        ))}
    </button>
  );
};
export default FlipCard;
