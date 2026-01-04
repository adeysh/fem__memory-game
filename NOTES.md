## Initial game state:

```js
gameState = {
  phase: "setup", // "setup" | "playing" | "finished"

  settings: {
    theme: "numbers", // "numbers" | "icons"
    players: 1, // 1 - 4
    gridSize: 4, // 4 or 6
  },

  cards: [
    {
      id: 1,
      value: "A",
      isFlipped: false,
      isMatched: false,
    },
  ],

  selectedCards: [], // max length 2

  players: [
    {
      id: 1,
      score: 0,
    },
  ],

  currentPlayerIndex: 0,

  moves: 0,

  timer: {
    elapsed: 0,
    isRunning: false,
  },
};
```

UI will reflect this state.

## Game flow:

1. **setup**:

- game menu will pop up with default settings.
- it will ask for:
  - theme (numbers/icons).
  - players (1,2,3,4).
  - grid size (4*4, 6*6).
- start game button which will start the game.

2. **playing**

- game board will render with specified settings.
- game board will have a grid of chosen setting (4*4, 6*6)
- game will have UI according to single player, multiplayer
- game board will display cards which can be flipped.
- game shows two buttons (restart and new game)
- the cards will show the chosen theme (numbers/icons)

- For a single player:
  - Timer starts as soon as game starts. Moves are set to 0.
  - User clicks a card.
  - If card is already flipped or matched → ignore
  - Flip card
  - Add to `selectedCards`
  - If 2 cards selected:
    - Increase moves
    - If values match → mark both as matched
    - Else → flip both back after delay
    - Clear `selectedCards`
  - If all cards matched → game finished
- For multiplayer:
  - game shows all the players with their scores set to 0.
  - it will show player with current turn.
  - player selects 2 cards:
    - if values match -> mark both as marked
    - increase score of the player.
    - else -> flip both back after delay
  - if all cards matched -> game finished.
- If User clicks on:
  - restart -> the game starts again with the same settings from the start.
  - setup new game -> the UI shows the setup menu again with default settings set.

3. **finished**

- results overlay appears.
- For a single player:
  - time elapsed shows, moves taken shows.
- For a multiplayer:
  - if game is tied:
    - overlay shows its a tie
    - all the players with their scores are shown.
    - the players having same score is highlighted.
  - if a player wins:
    - overlay shows the player which has won.
    - all the players with their scores are shown.
    - the player who won is highlighted.
- overlay has two buttons (restart and setup new game)
- User clicks on:
  - restart -> the game starts again with the same settings from the start.
  - setup new game -> the UI shows the setup menu again with default settings set.
