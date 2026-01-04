import { ICON_KEYS } from "../assets/icons";
import shuffle from "../utils/shuffle";
import { THEMES } from "./constants";

function generateValues(theme, pairs) {
  switch (theme) {
    case THEMES.NUMBERS:
      return Array.from({ length: pairs }, (_, i) => i + 1);

    case THEMES.ICONS:
      return shuffle(ICON_KEYS).slice(0, pairs);

    default:
      throw new Error(`Unknown theme: ${theme}`);
  }
}

export function generateCards({ gridSize, theme }) {
  const totalCards = gridSize * gridSize;

  if (totalCards % 2 !== 0) {
    throw new Error("Grid size must produce an even number of cards");
  }

  const pairs = totalCards / 2;
  const values = generateValues(theme, pairs);

  // Duplicate values to create card objects
  const cards = shuffle(
    values.flatMap((value, index) => [
      {
        id: `${theme}-${value}-${index}-a`,
        value,
        isFlipped: false,
        isMatched: false,
      },
      {
        id: `${theme}-${value}-${index}-b`,
        value,
        isFlipped: false,
        isMatched: false,
      },
    ]),
  );

  return cards;
}
